"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Vec = { x: number; y: number };
type Enemy = { pos: Vec; vel: Vec; speed: number; seed: number; home: Vec };

const TILE = 22;
const COLS = 21;
const ROWS = 21;

const TARGET_SCORE = 1000;
const POINTS_PER_ICE = 2;

const POWER_SECONDS = 8; // tiempo “modo hielo grande”
const PENGUIN_EAT_POINTS = 60; // puntos por comerse un pingüino en modo power

function manhattan(a: Vec, b: Vec) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

function len(v: Vec) {
  return Math.hypot(v.x, v.y);
}
function norm(v: Vec): Vec {
  const l = len(v) || 1;
  return { x: v.x / l, y: v.y / l };
}
function add(a: Vec, b: Vec): Vec {
  return { x: a.x + b.x, y: a.y + b.y };
}
function sub(a: Vec, b: Vec): Vec {
  return { x: a.x - b.x, y: a.y - b.y };
}
function mul(v: Vec, k: number): Vec {
  return { x: v.x * k, y: v.y * k };
}
function clamp01(x: number) {
  return Math.max(0, Math.min(1, x));
}
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function keyToDir(key: string): Vec | null {
  if (key === "ArrowUp" || key === "w" || key === "W") return { x: 0, y: -1 };
  if (key === "ArrowDown" || key === "s" || key === "S") return { x: 0, y: 1 };
  if (key === "ArrowLeft" || key === "a" || key === "A") return { x: -1, y: 0 };
  if (key === "ArrowRight" || key === "d" || key === "D") return { x: 1, y: 0 };
  return null;
}

function makeWalls(): boolean[][] {
  const w: boolean[][] = Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => false));

  // borde
  for (let x = 0; x < COLS; x++) {
    w[0][x] = true;
    w[ROWS - 1][x] = true;
  }
  for (let y = 0; y < ROWS; y++) {
    w[y][0] = true;
    w[y][COLS - 1] = true;
  }

  const addRect = (x1: number, y1: number, x2: number, y2: number) => {
    for (let y = y1; y <= y2; y++) for (let x = x1; x <= x2; x++) w[y][x] = true;
  };

  // Bloques decorativos (esquinas)
  addRect(2, 2, 4, 4);
  addRect(COLS - 5, 2, COLS - 3, 4);
  addRect(2, ROWS - 5, 4, ROWS - 3);
  addRect(COLS - 5, ROWS - 5, COLS - 3, ROWS - 3);

  // Pasillos (marco interno)
  addRect(6, 6, 6, 14);
  addRect(COLS - 7, 6, COLS - 7, 14);
  addRect(6, 6, COLS - 7, 6);
  addRect(6, 14, COLS - 7, 14);

  // ✅ Puertas para que los pingüinos salgan del marco interno
  w[6][10] = false;   // puerta arriba
  w[14][10] = false;  // puerta abajo
  w[10][6] = false;   // puerta izquierda
  w[10][14] = false;  // puerta derecha

  // (opcional) puertas un poquito más anchas:
  w[6][9] = false;  w[6][11] = false;
  w[14][9] = false; w[14][11] = false;
  w[9][6] = false;  w[11][6] = false;
  w[9][14] = false; w[11][14] = false;

  // Barritas extra
  addRect(8, 2, 12, 2);
  addRect(8, ROWS - 3, 12, ROWS - 3);
  addRect(2, 8, 2, 12);
  addRect(COLS - 3, 8, COLS - 3, 12);

  // ✅ Importante: quitamos la “caja central” que los encerraba
  // (antes había un bloque 9..11,9..11)

  return w;
}

function makeIce(walls: boolean[][]): boolean[][] {
  const ice: boolean[][] = Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => false));
  for (let y = 1; y < ROWS - 1; y++) {
    for (let x = 1; x < COLS - 1; x++) {
      if (!walls[y][x]) ice[y][x] = true;
    }
  }
  return ice;
}

function isWall(walls: boolean[][], tile: Vec) {
  return walls[tile.y]?.[tile.x] ?? true;
}

function worldToTile(posPx: Vec): Vec {
  return { x: Math.floor(posPx.x / TILE), y: Math.floor(posPx.y / TILE) };
}

function tileCenterPx(t: Vec): Vec {
  return { x: t.x * TILE + TILE / 2, y: t.y * TILE + TILE / 2 };
}

function canMoveTo(walls: boolean[][], posPx: Vec, radius: number) {
  const pts: Vec[] = [
    { x: posPx.x + radius, y: posPx.y },
    { x: posPx.x - radius, y: posPx.y },
    { x: posPx.x, y: posPx.y + radius },
    { x: posPx.x, y: posPx.y - radius },
  ];
  for (const p of pts) {
    const t = worldToTile(p);
    if (isWall(walls, t)) return false;
  }
  return true;
}

function pickEnemyDir(walls: boolean[][], enemyTile: Vec, targetTile: Vec, currentVel: Vec, mode: "chase" | "flee"): Vec {
  const options: Vec[] = [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: -1 },
  ];

  // Evita reversa si hay alternativas
  const reverse = len(currentVel) > 0.001 ? mul(norm(currentVel), -1) : { x: 0, y: 0 };

  const candidates = options
    .map((d) => ({ d, next: { x: enemyTile.x + d.x, y: enemyTile.y + d.y } }))
    .filter((o) => !isWall(walls, o.next));

  const nonReverse = candidates.filter((o) => !(o.d.x === Math.sign(reverse.x) && o.d.y === Math.sign(reverse.y)));
  const final = nonReverse.length ? nonReverse : candidates;

  let best = final[0]?.d ?? { x: 0, y: 0 };
  let bestScore = mode === "chase" ? Infinity : -Infinity;

  for (const o of final) {
    const dist = manhattan(o.next, targetTile);
    if (mode === "chase") {
      if (dist < bestScore) {
        bestScore = dist;
        best = o.d;
      }
    } else {
      if (dist > bestScore) {
        bestScore = dist;
        best = o.d;
      }
    }
  }

  return best;
}

function mkKey(t: Vec) {
  return `${t.x},${t.y}`;
}

export default function RightSideGamePopup() {
  const walls = useMemo(() => makeWalls(), []);
  const [open, setOpen] = useState(true);

  const [score, setScore] = useState(0);
  const [won, setWon] = useState(false);
  const [status, setStatus] = useState<"ready" | "playing" | "gameover">("ready");

  const [powerLeft, setPowerLeft] = useState(0); // para UI

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Estado del juego (refs)
  const truckPosRef = useRef<Vec>(tileCenterPx({ x: 1, y: 1 }));
  const truckVelRef = useRef<Vec>({ x: 0, y: 0 });
  const desiredDirRef = useRef<Vec>({ x: 1, y: 0 });
  const lastDirRef = useRef<Vec>({ x: 1, y: 0 });

  const iceRef = useRef<boolean[][]>(makeIce(walls));
  const pickupPulseRef = useRef<number>(0);

  // ✅ Cubos grandes (power) — ahora 8 posiciones
  const powerPellets = useMemo(() => {
    const pts: Vec[] = [
      // 3 izquierda
      { x: 1, y: 3 },
      { x: 1, y: Math.floor(ROWS / 2) },
      { x: 1, y: ROWS - 4 },

      // 3 derecha
      { x: COLS - 2, y: 3 },
      { x: COLS - 2, y: Math.floor(ROWS / 2) },
      { x: COLS - 2, y: ROWS - 4 },

      // 2 arriba/abajo al centro
      { x: Math.floor(COLS / 2), y: 1 },
      { x: Math.floor(COLS / 2), y: ROWS - 2 },
    ];

    // Si alguno cae en pared por tu diseño, lo movemos 1 tile hacia adentro
    const safe = pts.map((p) => {
      if (!isWall(walls, p)) return p;

      const moved = { x: Math.max(1, Math.min(COLS - 2, p.x + (p.x <= 1 ? 1 : -1))), y: p.y };
      if (!isWall(walls, moved)) return moved;

      const moved2 = { x: p.x, y: Math.max(1, Math.min(ROWS - 2, p.y + (p.y <= 1 ? 1 : -1))) };
      if (!isWall(walls, moved2)) return moved2;

      // último recurso: devolver tal cual (pero normalmente no pasa)
      return p;
    });

    return new Set<string>(safe.map(mkKey));
  }, [walls]);

  const powerTimerRef = useRef<number>(0);

  const enemiesRef = useRef<Enemy[]>([
    {
      pos: tileCenterPx({ x: 10, y: 9 }),
      vel: { x: 0, y: -1 },
      speed: 120,
      seed: 1,
      home: tileCenterPx({ x: 10, y: 9 }),
    },
    {
      pos: tileCenterPx({ x: 9, y: 10 }),
      vel: { x: 0, y: 1 },
      speed: 112,
      seed: 2,
      home: tileCenterPx({ x: 9, y: 10 }),
    },
    {
      pos: tileCenterPx({ x: 11, y: 10 }),
      vel: { x: 1, y: 0 },
      speed: 116,
      seed: 3,
      home: tileCenterPx({ x: 11, y: 10 }),
    },
  ]);

  const resetGame = useCallback(() => {
    truckPosRef.current = tileCenterPx({ x: 1, y: 1 });
    truckVelRef.current = { x: 0, y: 0 };
    desiredDirRef.current = { x: 1, y: 0 };
    lastDirRef.current = { x: 1, y: 0 };

    iceRef.current = makeIce(walls);
    pickupPulseRef.current = 0;

    powerTimerRef.current = 0;
    setPowerLeft(0);

    enemiesRef.current = [
      { pos: tileCenterPx({ x: 10, y: 9 }), vel: { x: 0, y: -1 }, speed: 120, seed: 1, home: tileCenterPx({ x: 10, y: 9 }) },
      { pos: tileCenterPx({ x: 9, y: 10 }), vel: { x: 0, y: 1 }, speed: 112, seed: 2, home: tileCenterPx({ x: 9, y: 10 }) },
      { pos: tileCenterPx({ x: 11, y: 10 }), vel: { x: 1, y: 0 }, speed: 116, seed: 3, home: tileCenterPx({ x: 11, y: 10 }) },
    ];

    setScore(0);
    setWon(false);
    setStatus("ready");
  }, [walls]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const d = keyToDir(e.key);
      if (d) {
        e.preventDefault();
        desiredDirRef.current = d;
        if (status === "ready") setStatus("playing");
      }
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Enter" && (status === "gameover" || won)) resetGame();
    };
    window.addEventListener("keydown", onKeyDown, { passive: false });
    return () => window.removeEventListener("keydown", onKeyDown as any);
  }, [status, won, resetGame]);

  useEffect(() => {
    if (!open) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    const cssW = COLS * TILE;
    const cssH = ROWS * TILE;

    canvas.style.width = `${cssW}px`;
    canvas.style.height = `${cssH}px`;
    canvas.width = Math.floor(cssW * dpr);
    canvas.height = Math.floor(cssH * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    let raf = 0;
    let last = performance.now();

    const truckRadius = 7.5;
    const truckMaxSpeed = 165;
    const truckAccel = 920;
    const truckFriction = 12;

    const enemyRadius = 7.2;

    const drawRounded = (x: number, y: number, w: number, h: number, r: number) => {
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, r);
      ctx.fill();
    };

    const draw = () => {
      // background
      const grad = ctx.createLinearGradient(0, 0, cssW, cssH);
      grad.addColorStop(0, "#F8FAFC");
      grad.addColorStop(1, "#EEF2FF");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, cssW, cssH);

      // walls
      ctx.save();
      ctx.shadowColor = "rgba(2, 6, 23, 0.22)";
      ctx.shadowBlur = 10;
      ctx.shadowOffsetY = 2;
      for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          if (walls[y][x]) {
            const px = x * TILE;
            const py = y * TILE;
            ctx.fillStyle = "#0F172A";
            drawRounded(px + 1, py + 1, TILE - 2, TILE - 2, 6);
          }
        }
      }
      ctx.restore();

      // ice (normal + power big)
      const ice = iceRef.current;
      const pulse = pickupPulseRef.current;

      for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          if (!walls[y][x] && ice[y][x]) {
            const cx = x * TILE + TILE / 2;
            const cy = y * TILE + TILE / 2;

            const isPower = powerPellets.has(`${x},${y}`);
            const base = isPower ? 11.5 : 7.5;

            const wobble = 1 + 0.08 * Math.sin((x * 13 + y * 7 + pulse * 18));
            const s = base * wobble;

            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(0.15 * Math.sin((x * 9 + y * 5 + pulse * 10)));
            ctx.fillStyle = isPower ? "#22C55E" : "#38BDF8"; // power: verde
            drawRounded(-s, -s, s * 2, s * 2, isPower ? 4 : 3);
            ctx.globalAlpha = 0.55;
            ctx.fillStyle = "#E0F2FE";
            drawRounded(-s + 1.5, -s + 1.5, s * 1.0, s * 1.0, 2);
            ctx.restore();
          }
        }
      }

      // truck
      const tp = truckPosRef.current;
      const dir = lastDirRef.current;
      const tilt = 0.07 * Math.sin(pickupPulseRef.current * 14);

      ctx.save();
      ctx.translate(tp.x, tp.y);
      ctx.rotate(tilt);

      ctx.globalAlpha = 0.25;
      ctx.fillStyle = "#0F172A";
      drawRounded(-10, 3, 20, 10, 6);
      ctx.globalAlpha = 1;

      ctx.fillStyle = "#2563EB";
      drawRounded(-10, -4, 20, 12, 6);

      ctx.fillStyle = "#1D4ED8";
      drawRounded(-10, -10, 9, 8, 4);

      ctx.fillStyle = "#E0F2FE";
      drawRounded(-8.5, -8.5, 5.5, 4.5, 2);

      ctx.fillStyle = "#0B1220";
      drawRounded(-8, 6, 6, 4, 2);
      drawRounded(2, 6, 6, 4, 2);

      ctx.save();
      ctx.globalAlpha = 0.85;
      ctx.fillStyle = "#FBBF24";
      drawRounded(lerp(-2, 6, (dir.x + 1) / 2), lerp(-2, 6, (dir.y + 1) / 2), 4, 4, 2);
      ctx.restore();

      ctx.restore();

      // enemies (asustados si power)
      const enemies = enemiesRef.current;
      const power = powerTimerRef.current > 0;

      for (const e of enemies) {
        const bounce = 1 + 0.07 * Math.sin(pickupPulseRef.current * 10 + e.seed * 2.2);
        ctx.save();
        ctx.translate(e.pos.x, e.pos.y);
        ctx.scale(1, bounce);

        ctx.globalAlpha = 0.2;
        ctx.fillStyle = "#0F172A";
        drawRounded(-9, 6, 18, 6, 6);
        ctx.globalAlpha = 1;

        // color de asustado (azul) y parpadea al final
        let body = "#111827";
        if (power) {
          const flash = powerTimerRef.current < 2 ? (Math.floor(pickupPulseRef.current * 8) % 2 === 0) : false;
          body = flash ? "#60A5FA" : "#1D4ED8";
        }
        ctx.fillStyle = body;
        drawRounded(-9, -12, 18, 22, 8);

        ctx.fillStyle = "#F1F5F9";
        drawRounded(-6.5, -4, 13, 14, 7);

        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.arc(-4, -7, 2.2, 0, Math.PI * 2);
        ctx.arc(4, -7, 2.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#0B1220";
        ctx.beginPath();
        ctx.arc(-4, -7, 1.1, 0, Math.PI * 2);
        ctx.arc(4, -7, 1.1, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#F59E0B";
        drawRounded(-2, -3, 4, 2.6, 2);

        ctx.restore();
      }

      // HUD
      ctx.save();
      ctx.fillStyle = "rgba(15, 23, 42, 0.75)";
      drawRounded(8, 8, cssW - 16, 28, 12);
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "12px system-ui, -apple-system, Segoe UI, Roboto, Arial";
      const powerTxt = powerLeft > 0 ? ` | Modo hielo: ${powerLeft.toFixed(1)}s` : "";
      ctx.fillText(`Puntos: ${score} | Meta: ${TARGET_SCORE}${powerTxt}`, 18, 27);
      ctx.restore();

      if (status === "ready") {
        ctx.save();
        ctx.fillStyle = "rgba(2, 6, 23, 0.55)";
        ctx.fillRect(0, 0, cssW, cssH);
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "14px system-ui, -apple-system, Segoe UI, Roboto, Arial";
        ctx.fillText("Usa Flechas o WASD para mover el camioncito.", 18, cssH / 2 - 10);
        ctx.fillText("🧊 +2 | 🟩 cubo grande: asusta pingüinos y puedes comértelos.", 18, cssH / 2 + 14);
        ctx.restore();
      }

      if (status === "gameover") {
        ctx.save();
        ctx.fillStyle = "rgba(2, 6, 23, 0.65)";
        ctx.fillRect(0, 0, cssW, cssH);
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "18px system-ui, -apple-system, Segoe UI, Roboto, Arial";
        ctx.fillText("Game Over 😵", cssW / 2 - 62, cssH / 2 - 8);
        ctx.font = "13px system-ui, -apple-system, Segoe UI, Roboto, Arial";
        ctx.fillText("Presiona ENTER para reiniciar.", cssW / 2 - 92, cssH / 2 + 18);
        ctx.restore();
      }

      if (won) {
        ctx.save();
        ctx.fillStyle = "rgba(2, 6, 23, 0.70)";
        ctx.fillRect(0, 0, cssW, cssH);
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "14px system-ui, -apple-system, Segoe UI, Roboto, Arial";
        ctx.fillText("🎉 Felicidades!", cssW / 2 - 52, cssH / 2 - 18);
        ctx.fillText("Ganaste un descuento de 10 soles", cssW / 2 - 128, cssH / 2 + 6);
        ctx.fillText("en tu próximo servicio.", cssW / 2 - 92, cssH / 2 + 26);
        ctx.font = "12px system-ui, -apple-system, Segoe UI, Roboto, Arial";
        ctx.fillText("Presiona ENTER para jugar otra vez.", cssW / 2 - 112, cssH / 2 + 48);
        ctx.restore();
      }
    };

    const activatePower = () => {
      powerTimerRef.current = POWER_SECONDS;
      setPowerLeft(POWER_SECONDS);
    };

    const tryPickup = () => {
      const ice = iceRef.current;
      const t = worldToTile(truckPosRef.current);

      if (ice[t.y]?.[t.x]) {
        ice[t.y][t.x] = false;
        pickupPulseRef.current = 0;

        const isPower = powerPellets.has(mkKey(t));
        if (isPower) activatePower();

        setScore((s) => {
          const ns = s + POINTS_PER_ICE;
          if (ns >= TARGET_SCORE) setWon(true);
          return ns;
        });
      }
    };

    const eatEnemyIfPowered = (): boolean => {
      if (powerTimerRef.current <= 0) return false;
      const tp = truckPosRef.current;

      let ate = false;
      for (const e of enemiesRef.current) {
        const d = len(sub(e.pos, tp));
        if (d < (enemyRadius + 7.5) * 0.85) {
          // ✅ lo comiste: vuelve a “home”
          e.pos = { ...e.home };
          e.vel = { x: 0, y: 0 };
          ate = true;
        }
      }
      if (ate) {
        setScore((s) => {
          const ns = s + PENGUIN_EAT_POINTS;
          if (ns >= TARGET_SCORE) setWon(true);
          return ns;
        });
      }
      return ate;
    };

    const checkEnemyCollisionNormal = (): boolean => {
      if (powerTimerRef.current > 0) return false; // si hay power, no mueres por choque
      const tp = truckPosRef.current;
      for (const e of enemiesRef.current) {
        const d = len(sub(e.pos, tp));
        if (d < (enemyRadius + 7.5) * 0.85) return true;
      }
      return false;
    };

    const updateTruck = (dt: number) => {
      const tp = truckPosRef.current;
      const vel = truckVelRef.current;
      const desired = desiredDirRef.current;

      const targetVel = mul(desired, truckMaxSpeed);
      const ax = (targetVel.x - vel.x) * truckFriction;
      const ay = (targetVel.y - vel.y) * truckFriction;

      const newVel = {
        x: vel.x + clamp01(dt * 8) * ax + desired.x * truckAccel * dt * 0.06,
        y: vel.y + clamp01(dt * 8) * ay + desired.y * truckAccel * dt * 0.06,
      };

      const sp = len(newVel);
      const capped = sp > truckMaxSpeed ? mul(norm(newVel), truckMaxSpeed) : newVel;

      let nextPos = { x: tp.x, y: tp.y };

      const stepX = { x: tp.x + capped.x * dt, y: tp.y };
      if (canMoveTo(walls, stepX, truckRadius)) nextPos = { ...nextPos, x: stepX.x };

      const stepY = { x: nextPos.x, y: tp.y + capped.y * dt };
      if (canMoveTo(walls, stepY, truckRadius)) nextPos = { ...nextPos, y: stepY.y };

      truckPosRef.current = nextPos;
      truckVelRef.current = capped;

      if (Math.abs(desired.x) + Math.abs(desired.y) > 0) lastDirRef.current = desired;

      tryPickup();
    };

    const updateEnemies = (dt: number) => {
      const truckTile = worldToTile(truckPosRef.current);
      const power = powerTimerRef.current > 0;

      for (const e of enemiesRef.current) {
        const enemyTile = worldToTile(e.pos);

        // ✅ chase o flee
        const mode: "chase" | "flee" = power ? "flee" : "chase";
        const dTile = pickEnemyDir(walls, enemyTile, truckTile, e.vel, mode);

        const desiredVel = mul(dTile, power ? e.speed * 0.9 : e.speed);
        const vel = e.vel;

        const follow = 1 - Math.pow(0.001, dt);
        const newVel = {
          x: lerp(vel.x, desiredVel.x, follow),
          y: lerp(vel.y, desiredVel.y, follow),
        };

        const next = add(e.pos, mul(newVel, dt));
        if (canMoveTo(walls, next, enemyRadius)) {
          e.pos = next;
          e.vel = newVel;
        } else {
          const c = tileCenterPx(enemyTile);
          e.pos = add(e.pos, mul(sub(c, e.pos), clamp01(dt * 8)));
          e.vel = mul(newVel, 0.2);
        }
      }
    };

    const loop = (now: number) => {
      const dtMs = now - last;
      last = now;
      const dt = Math.min(0.033, Math.max(0.0, dtMs / 1000));

      pickupPulseRef.current += dt;

      // power timer
      if (powerTimerRef.current > 0) {
        powerTimerRef.current = Math.max(0, powerTimerRef.current - dt);
        setPowerLeft(powerTimerRef.current);
      } else if (powerLeft !== 0) {
        setPowerLeft(0);
      }

      if (status === "playing" && !won) {
        updateTruck(dt);

        // si hay power, puedes comer pingüinos
        eatEnemyIfPowered();

        // si no hay power y chocas, mueres
        if (checkEnemyCollisionNormal()) {
          setStatus("gameover");
        } else {
          updateEnemies(dt);

          eatEnemyIfPowered();

          if (checkEnemyCollisionNormal()) setStatus("gameover");
        }
      }

      draw();
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [open, powerLeft, score, status, walls, won, resetGame, powerPellets]);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        style={{
          position: "fixed",
          right: 12,
          bottom: 12,
          zIndex: 9999,
          padding: "10px 12px",
          borderRadius: 14,
          border: "1px solid rgba(15,23,42,0.18)",
          background: "white",
          boxShadow: "0 14px 45px rgba(0,0,0,0.16)",
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial",
          cursor: "pointer",
          fontWeight: 800,
        }}
      >
        🚚 Jugar
      </button>
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 96,
        right: 16,
        zIndex: 9999,
        width: 420,
        maxWidth: "calc(100vw - 32px)",
        borderRadius: 18,
        border: "1px solid rgba(15,23,42,0.14)",
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(10px)",
        boxShadow: "0 22px 70px rgba(0,0,0,0.20)",
        overflow: "hidden",
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial",
      }}
      role="dialog"
      aria-label="Juego de Camioncito"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 12px",
          borderBottom: "1px solid rgba(15,23,42,0.10)",
          background: "linear-gradient(135deg, rgba(224,242,254,0.55), rgba(238,242,255,0.55))",
        }}
      >
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{ fontSize: 16, fontWeight: 900 }}>🚚 Juego del Hielo</div>
          <div style={{ fontSize: 12, opacity: 0.75 }}>
            {won ? "¡Ganaste!" : status === "gameover" ? "Perdiste" : status === "playing" ? "Jugando" : "Listo"}
          </div>
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={resetGame}
            style={{
              padding: "6px 10px",
              borderRadius: 12,
              border: "1px solid rgba(15,23,42,0.16)",
              background: "white",
              cursor: "pointer",
              fontSize: 12,
              fontWeight: 800,
            }}
          >
            Reiniciar
          </button>
          <button
            onClick={() => setOpen(false)}
            style={{
              padding: "6px 10px",
              borderRadius: 12,
              border: "1px solid rgba(15,23,42,0.16)",
              background: "white",
              cursor: "pointer",
              fontSize: 12,
              fontWeight: 900,
            }}
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>
      </div>

      <div style={{ padding: 12 }}>
        <canvas
          ref={canvasRef}
          style={{
            width: "100%",
            height: "auto",
            borderRadius: 14,
            border: "1px solid rgba(15,23,42,0.12)",
            display: "block",
          }}
        />

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, gap: 10 }}>
          <div style={{ fontSize: 12, opacity: 0.9, lineHeight: 1.35 }}>
            <div>
              <b>Controles:</b> Flechas o WASD
            </div>
            <div>
              <b>🧊</b> +{POINTS_PER_ICE} | <b>🟩 cubo grande</b>: puedes comer 🐧 (+{PENGUIN_EAT_POINTS})
            </div>
          </div>

          <div style={{ textAlign: "right", fontSize: 12 }}>
            <div style={{ fontWeight: 900 }}>Puntos: {score}</div>
            <div style={{ opacity: 0.75 }}>
              {won ? "🎉 Descuento listo" : `Faltan ${Math.max(0, TARGET_SCORE - score)} pts`}
              {powerLeft > 0 ? ` | ${powerLeft.toFixed(1)}s` : ""}
            </div>
          </div>
        </div>

        {won && (
          <div
            style={{
              marginTop: 10,
              padding: 10,
              borderRadius: 14,
              border: "1px solid rgba(34,197,94,0.35)",
              background: "rgba(34,197,94,0.08)",
              fontSize: 12,
              lineHeight: 1.4,
            }}
          >
            <b>Felicidades ganaste un descuento de 10 soles</b> en tu próximo servicio.
            <div style={{ marginTop: 6, opacity: 0.8 }}>
              (Presiona <b>ENTER</b> o “Reiniciar” para volver a jugar)
            </div>
          </div>
        )}
      </div>
    </div>
  );
}