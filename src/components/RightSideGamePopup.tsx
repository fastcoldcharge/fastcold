"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Vec = { x: number; y: number };
type Enemy = { pos: Vec; vel: Vec; speed: number; seed: number };

const TILE = 22;
const COLS = 21;
const ROWS = 21;

const TARGET_SCORE = 1000;
const POINTS_PER_ICE = 2;

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
  ...
}
  if (key === "ArrowUp" || key === "w" || key === "W") return { x: 0, y: -1 };
  if (key === "ArrowDown" || key === "s" || key === "S") return { x: 0, y: 1 };
  if (key === "ArrowLeft" || key === "a" || key === "A") return { x: -1, y: 0 };
  if (key === "ArrowRight" || key === "d" || key === "D") return { x: 1, y: 0 };
  return null;
}

function makeWalls(): boolean[][] {
  const w: boolean[][] = Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => false));

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

  // Bloques decorativos
  addRect(2, 2, 4, 4);
  addRect(COLS - 5, 2, COLS - 3, 4);
  addRect(2, ROWS - 5, 4, ROWS - 3);
  addRect(COLS - 5, ROWS - 5, COLS - 3, ROWS - 3);

  // Pasillos
  addRect(6, 6, 6, 14);
  addRect(COLS - 7, 6, COLS - 7, 14);
  addRect(6, 6, COLS - 7, 6);
  addRect(6, 14, COLS - 7, 14);

  // Caja central
  addRect(9, 9, 11, 11);
  w[9][10] = false;
  w[11][10] = false;
  w[10][9] = false;
  w[10][11] = false;

  // Barritas
  addRect(8, 2, 12, 2);
  addRect(8, ROWS - 3, 12, ROWS - 3);
  addRect(2, 8, 2, 12);
  addRect(COLS - 3, 8, COLS - 3, 12);

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
  // Chequeo simple por 4 puntos alrededor del círculo del jugador
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

function pickBestEnemyDir(walls: boolean[][], enemyTile: Vec, truckTile: Vec, currentVel: Vec): Vec {
  const options: Vec[] = [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: -1 },
  ];

  // Evita reversa si hay otras opciones
  const reverse = len(currentVel) > 0.001 ? mul(norm(currentVel), -1) : { x: 0, y: 0 };

  const candidates = options
    .map((d) => ({ d, next: { x: enemyTile.x + d.x, y: enemyTile.y + d.y } }))
    .filter((o) => !isWall(walls, o.next));

  const nonReverse = candidates.filter((o) => !(o.d.x === Math.sign(reverse.x) && o.d.y === Math.sign(reverse.y)));
  const final = nonReverse.length ? nonReverse : candidates;

  let best = final[0]?.d ?? { x: 0, y: 0 };
  let bestDist = Infinity;
  for (const o of final) {
    const dist = manhattan(o.next, truckTile);
    if (dist < bestDist) {
      bestDist = dist;
      best = o.d;
    }
  }
  return best;
}

export default function RightSideGamePopup() {
  const walls = useMemo(() => makeWalls(), []);
  const [open, setOpen] = useState(true);

  const [score, setScore] = useState(0);
  const [won, setWon] = useState(false);
  const [status, setStatus] = useState<"ready" | "playing" | "gameover">("ready");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // --- Game state (refs for smooth loop) ---
  const dprRef = useRef(1);

  const truckPosRef = useRef<Vec>(tileCenterPx({ x: 1, y: 1 })); // pixel position
  const truckVelRef = useRef<Vec>({ x: 0, y: 0 });
  const desiredDirRef = useRef<Vec>({ x: 1, y: 0 }); // input direction
  const lastDirRef = useRef<Vec>({ x: 1, y: 0 }); // for drawing

  const iceRef = useRef<boolean[][]>(makeIce(walls));
  const pickupPulseRef = useRef<number>(0); // small animation

  const enemiesRef = useRef<Enemy[]>([
    { pos: tileCenterPx({ x: 10, y: 10 }), vel: { x: 0, y: -1 }, speed: 120, seed: 1 },
    { pos: tileCenterPx({ x: 9, y: 10 }), vel: { x: 0, y: 1 }, speed: 110, seed: 2 },
    { pos: tileCenterPx({ x: 11, y: 10 }), vel: { x: 1, y: 0 }, speed: 115, seed: 3 },
  ]);

  const resetGame = useCallback(() => {
    truckPosRef.current = tileCenterPx({ x: 1, y: 1 });
    truckVelRef.current = { x: 0, y: 0 };
    desiredDirRef.current = { x: 1, y: 0 };
    lastDirRef.current = { x: 1, y: 0 };

    iceRef.current = makeIce(walls);
    pickupPulseRef.current = 0;

    enemiesRef.current = [
      { pos: tileCenterPx({ x: 10, y: 10 }), vel: { x: 0, y: -1 }, speed: 120, seed: 1 },
      { pos: tileCenterPx({ x: 9, y: 10 }), vel: { x: 0, y: 1 }, speed: 110, seed: 2 },
      { pos: tileCenterPx({ x: 11, y: 10 }), vel: { x: 1, y: 0 }, speed: 115, seed: 3 },
    ];

    setScore(0);
    setWon(false);
    setStatus("ready");
  }, [walls]);

  // Aparece solo al inicio: ya está open=true. Si quieres delay, aquí:
  // useEffect(() => { setOpen(false); const t = setTimeout(() => setOpen(true), 1200); return () => clearTimeout(t); }, []);

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

    // Setup DPI scaling
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    dprRef.current = dpr;

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
    const truckMaxSpeed = 160; // px/s
    const truckAccel = 900; // px/s^2
    const truckFriction = 12; // higher = more “tight”

    const enemyRadius = 7.2;

    const drawRounded = (x: number, y: number, w: number, h: number, r: number) => {
      ctx.beginPath();
      // @ts-expect-error: roundRect existe en navegadores modernos
      ctx.roundRect(x, y, w, h, r);
      ctx.fill();
    };

    const draw = () => {
      // Background gradient
      const grad = ctx.createLinearGradient(0, 0, cssW, cssH);
      grad.addColorStop(0, "#F8FAFC");
      grad.addColorStop(1, "#EEF2FF");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, cssW, cssH);

      // Soft grid glow
      ctx.save();
      ctx.globalAlpha = 0.08;
      ctx.strokeStyle = "#0F172A";
      for (let x = 0; x <= cssW; x += TILE) {
        ctx.beginPath();
        ctx.moveTo(x + 0.5, 0);
        ctx.lineTo(x + 0.5, cssH);
        ctx.stroke();
      }
      for (let y = 0; y <= cssH; y += TILE) {
        ctx.beginPath();
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(cssW, y + 0.5);
        ctx.stroke();
      }
      ctx.restore();

      // Walls (with soft shadow)
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

      // Ice cubes (nicer)
      const ice = iceRef.current;
      const pulse = pickupPulseRef.current;
      for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          if (!walls[y][x] && ice[y][x]) {
            const cx = x * TILE + TILE / 2;
            const cy = y * TILE + TILE / 2;

            const wobble = 1 + 0.08 * Math.sin((x * 13 + y * 7 + pulse * 18));
            const s = 7.5 * wobble;

            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(0.15 * Math.sin((x * 9 + y * 5 + pulse * 10)));
            ctx.fillStyle = "#38BDF8";
            drawRounded(-s, -s, s * 2, s * 2, 3);
            ctx.globalAlpha = 0.55;
            ctx.fillStyle = "#E0F2FE";
            drawRounded(-s + 1.5, -s + 1.5, s * 1.0, s * 1.0, 2);
            ctx.restore();
          }
        }
      }

      // Truck (camioncito) - cleaner + slight tilt
      const tp = truckPosRef.current;
      const dir = lastDirRef.current;
      const tilt = 0.07 * Math.sin(pickupPulseRef.current * 14);

      ctx.save();
      ctx.translate(tp.x, tp.y);
      ctx.rotate(tilt);

      // body shadow
      ctx.globalAlpha = 0.25;
      ctx.fillStyle = "#0F172A";
      drawRounded(-10, 3, 20, 10, 6);
      ctx.globalAlpha = 1;

      // body
      ctx.fillStyle = "#2563EB";
      drawRounded(-10, -4, 20, 12, 6);

      // cabin
      ctx.fillStyle = "#1D4ED8";
      drawRounded(-10, -10, 9, 8, 4);

      // window
      ctx.fillStyle = "#E0F2FE";
      drawRounded(-8.5, -8.5, 5.5, 4.5, 2);

      // wheels
      ctx.fillStyle = "#0B1220";
      drawRounded(-8, 6, 6, 4, 2);
      drawRounded(2, 6, 6, 4, 2);

      // tiny “direction marker”
      ctx.save();
      ctx.globalAlpha = 0.85;
      ctx.fillStyle = "#FBBF24";
      drawRounded(lerp(-2, 6, (dir.x + 1) / 2), lerp(-2, 6, (dir.y + 1) / 2), 4, 4, 2);
      ctx.restore();

      ctx.restore();

      // Penguins (enemies) with bounce
      const enemies = enemiesRef.current;
      for (const e of enemies) {
        const bounce = 1 + 0.07 * Math.sin(pickupPulseRef.current * 10 + e.seed * 2.2);
        ctx.save();
        ctx.translate(e.pos.x, e.pos.y);
        ctx.scale(1, bounce);

        // shadow
        ctx.globalAlpha = 0.2;
        ctx.fillStyle = "#0F172A";
        drawRounded(-9, 6, 18, 6, 6);
        ctx.globalAlpha = 1;

        // body
        ctx.fillStyle = "#111827";
        drawRounded(-9, -12, 18, 22, 8);

        // belly
        ctx.fillStyle = "#F1F5F9";
        drawRounded(-6.5, -4, 13, 14, 7);

        // eyes
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

        // beak
        ctx.fillStyle = "#F59E0B";
        drawRounded(-2, -3, 4, 2.6, 2);

        ctx.restore();
      }

      // HUD bar
      ctx.save();
      ctx.fillStyle = "rgba(15, 23, 42, 0.75)";
      drawRounded(8, 8, cssW - 16, 28, 12);
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "12px system-ui, -apple-system, Segoe UI, Roboto, Arial";
      ctx.fillText(`Puntos: ${score}   |   Meta: ${TARGET_SCORE}`, 18, 27);
      ctx.restore();

      if (status === "ready") {
        ctx.save();
        ctx.fillStyle = "rgba(2, 6, 23, 0.55)";
        ctx.fillRect(0, 0, cssW, cssH);
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "14px system-ui, -apple-system, Segoe UI, Roboto, Arial";
        ctx.fillText("Usa Flechas o WASD para mover el camioncito.", 18, cssH / 2 - 10);
        ctx.fillText("Recolecta 🧊 (+2) y evita 🐧. Presiona una tecla para iniciar.", 18, cssH / 2 + 14);
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

    const tryPickupIce = () => {
      const ice = iceRef.current;
      const t = worldToTile(truckPosRef.current);
      if (ice[t.y]?.[t.x]) {
        ice[t.y][t.x] = false;
        pickupPulseRef.current = 0; // reset pulse so it “pops”
        setScore((s) => {
          const ns = s + POINTS_PER_ICE;
          if (ns >= TARGET_SCORE) setWon(true);
          return ns;
        });
      }
    };

    const checkEnemyCollision = () => {
      const tp = truckPosRef.current;
      for (const e of enemiesRef.current) {
        const d = len(sub(e.pos, tp));
        if (d < (enemyRadius + 7.5) * 0.85) return true;
      }
      return false;
    };

    const updateTruck = (dt: number) => {
      // dt in seconds
      const tp = truckPosRef.current;
      const vel = truckVelRef.current;
      const desired = desiredDirRef.current;

      // accelerate toward desired direction
      const targetVel = mul(desired, truckMaxSpeed);
      const ax = (targetVel.x - vel.x) * (truckFriction);
      const ay = (targetVel.y - vel.y) * (truckFriction);

      const newVel = {
        x: vel.x + clamp01(dt * 8) * ax + desired.x * truckAccel * dt * 0.06,
        y: vel.y + clamp01(dt * 8) * ay + desired.y * truckAccel * dt * 0.06,
      };

      // clamp speed
      const sp = len(newVel);
      const capped = sp > truckMaxSpeed ? mul(norm(newVel), truckMaxSpeed) : newVel;

      // integrate with collision (axis-separated for smooth sliding)
      const next = { x: tp.x, y: tp.y };
      const stepX = { x: tp.x + capped.x * dt, y: tp.y };
      if (canMoveTo(walls, stepX, truckRadius)) next.x = stepX.x;
      else capped.x = 0;

      const stepY = { x: next.x, y: tp.y + capped.y * dt };
      if (canMoveTo(walls, stepY, truckRadius)) next.y = stepY.y;
      else capped.y = 0;

      truckPosRef.current = next;
      truckVelRef.current = capped;

      if (Math.abs(desired.x) + Math.abs(desired.y) > 0) lastDirRef.current = desired;

      tryPickupIce();
    };

    const updateEnemies = (dt: number) => {
      const truckTile = worldToTile(truckPosRef.current);
      for (const e of enemiesRef.current) {
        const enemyTile = worldToTile(e.pos);

        // pick a tile direction greedily, then move smoothly
        const dTile = pickBestEnemyDir(walls, enemyTile, truckTile, e.vel);

        const desiredVel = mul(dTile, e.speed);
        const vel = e.vel;

        // smooth follow (easing)
        const follow = 1 - Math.pow(0.001, dt); // dt-based smoothing
        const newVel = {
          x: lerp(vel.x, desiredVel.x, follow),
          y: lerp(vel.y, desiredVel.y, follow),
        };

        // integrate (simple collision by checking next position)
        const next = add(e.pos, mul(newVel, dt));
        // smaller radius for enemies
        if (canMoveTo(walls, next, enemyRadius)) {
          e.pos = next;
          e.vel = newVel;
        } else {
          // if blocked, nudge toward center of current tile
          const c = tileCenterPx(enemyTile);
          e.pos = add(e.pos, mul(sub(c, e.pos), clamp01(dt * 8)));
          e.vel = mul(newVel, 0.2);
        }
      }
    };

    const loop = (now: number) => {
      const dtMs = now - last;
      last = now;

      // clamp big tab-switch jumps
      const dt = Math.min(0.033, Math.max(0.0, dtMs / 1000));

      // animate pulses
      pickupPulseRef.current += dt;

      if (status === "playing" && !won) {
        updateTruck(dt);

        if (checkEnemyCollision()) {
          setStatus("gameover");
        } else {
          updateEnemies(dt);

          if (checkEnemyCollision()) {
            setStatus("gameover");
          }
        }
      }

      draw();
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [open, score, status, walls, won, resetGame]);

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
        width: 400,
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
              <b>Puntos:</b> 🧊 +{POINTS_PER_ICE} | <b>Meta:</b> {TARGET_SCORE}
            </div>
          </div>

          <div style={{ textAlign: "right", fontSize: 12 }}>
            <div style={{ fontWeight: 900 }}>Puntos: {score}</div>
            <div style={{ opacity: 0.75 }}>{won ? "🎉 Descuento listo" : `Faltan ${Math.max(0, TARGET_SCORE - score)} pts`}</div>
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