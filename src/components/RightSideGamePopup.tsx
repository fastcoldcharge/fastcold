"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Vec = { x: number; y: number };

function manhattan(a: Vec, b: Vec) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

function keyToDir(key: string): Vec | null {
  if (key === "ArrowUp" || key === "w" || key === "W") return { x: 0, y: -1 };
  if (key === "ArrowDown" || key === "s" || key === "S") return { x: 0, y: 1 };
  if (key === "ArrowLeft" || key === "a" || key === "A") return { x: -1, y: 0 };
  if (key === "ArrowRight" || key === "d" || key === "D") return { x: 1, y: 0 };
  return null;
}

const TILE = 20;
const COLS = 21; // impar para “feeling” pacman
const ROWS = 21;
const CANVAS_W = COLS * TILE;
const CANVAS_H = ROWS * TILE;

const TARGET_SCORE = 1000;
const POINTS_PER_ICE = 2;

type Enemy = {
  pos: Vec;
  dir: Vec;
  speed: number; // tiles per second-ish (we’ll step by tick)
  color: string;
};

function makeWalls(): boolean[][] {
  // true = wall
  const w: boolean[][] = Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => false));

  // outer border
  for (let x = 0; x < COLS; x++) {
    w[0][x] = true;
    w[ROWS - 1][x] = true;
  }
  for (let y = 0; y < ROWS; y++) {
    w[y][0] = true;
    w[y][COLS - 1] = true;
  }

  // simple internal maze (simétrico-ish)
  const addRect = (x1: number, y1: number, x2: number, y2: number) => {
    for (let y = y1; y <= y2; y++) {
      for (let x = x1; x <= x2; x++) w[y][x] = true;
    }
  };

  addRect(2, 2, 4, 4);
  addRect(COLS - 5, 2, COLS - 3, 4);

  addRect(2, ROWS - 5, 4, ROWS - 3);
  addRect(COLS - 5, ROWS - 5, COLS - 3, ROWS - 3);

  addRect(8, 2, 12, 2);
  addRect(8, ROWS - 3, 12, ROWS - 3);

  addRect(2, 8, 2, 12);
  addRect(COLS - 3, 8, COLS - 3, 12);

  addRect(9, 9, 11, 11); // “caja” central

  // caminos
  addRect(6, 6, 6, 14);
  addRect(COLS - 7, 6, COLS - 7, 14);
  addRect(6, 6, COLS - 7, 6);
  addRect(6, 14, COLS - 7, 14);

  // abre huecos en la caja central
  w[9][10] = false;
  w[11][10] = false;
  w[10][9] = false;
  w[10][11] = false;

  return w;
}

function makeIce(walls: boolean[][]): boolean[][] {
  // true = ice cube present
  const ice: boolean[][] = Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => false));
  for (let y = 1; y < ROWS - 1; y++) {
    for (let x = 1; x < COLS - 1; x++) {
      if (!walls[y][x]) ice[y][x] = true;
    }
  }
  return ice;
}

function samePos(a: Vec, b: Vec) {
  return a.x === b.x && a.y === b.y;
}

function isWall(walls: boolean[][], p: Vec) {
  return walls[p.y]?.[p.x] ?? true;
}

function neighbors(p: Vec): Vec[] {
  return [
    { x: p.x + 1, y: p.y },
    { x: p.x - 1, y: p.y },
    { x: p.x, y: p.y + 1 },
    { x: p.x, y: p.y - 1 },
  ];
}

function chooseChaseStep(walls: boolean[][], from: Vec, to: Vec, prevDir: Vec): Vec {
  // Greedy: choose neighbor that reduces Manhattan distance, avoid walls, avoid reversing if possible.
  const opts = neighbors(from).filter((n) => !isWall(walls, n));

  // avoid immediate reverse when there are other choices
  const reverse = { x: -prevDir.x, y: -prevDir.y };
  const filtered = opts.filter((n) => !(n.x === from.x + reverse.x && n.y === from.y + reverse.y));
  const finalOpts = filtered.length > 0 ? filtered : opts;

  let best = finalOpts[0] ?? from;
  let bestD = manhattan(best, to);

  for (const n of finalOpts) {
    const d = manhattan(n, to);
    if (d < bestD) {
      best = n;
      bestD = d;
    }
  }

  return best;
}

export default function RightSideGamePopup() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const walls = useMemo(() => makeWalls(), []);
  const [open, setOpen] = useState(true);

  const [score, setScore] = useState(0);
  const [won, setWon] = useState(false);

  // world state (refs for smooth loop)
  const truckRef = useRef<Vec>({ x: 1, y: 1 });
  const dirRef = useRef<Vec>({ x: 1, y: 0 });
  const nextDirRef = useRef<Vec>({ x: 1, y: 0 });

  const iceRef = useRef<boolean[][]>(makeIce(walls));

  const enemiesRef = useRef<Enemy[]>([
    { pos: { x: 10, y: 10 }, dir: { x: 0, y: -1 }, speed: 6, color: "#111827" }, // pingüino 1
    { pos: { x: 9, y: 10 }, dir: { x: 0, y: 1 }, speed: 5, color: "#1F2937" },  // pingüino 2
    { pos: { x: 11, y: 10 }, dir: { x: 1, y: 0 }, speed: 5, color: "#0F172A" }, // pingüino 3
  ]);

  const [status, setStatus] = useState<"ready" | "playing" | "gameover">("ready");

  const resetGame = useCallback(() => {
  truckRef.current = { x: 1, y: 1 };
  dirRef.current = { x: 1, y: 0 };
  nextDirRef.current = { x: 1, y: 0 };
  iceRef.current = makeIce(walls);
  enemiesRef.current = [
    { pos: { x: 10, y: 10 }, dir: { x: 0, y: -1 }, speed: 6, color: "#111827" },
    { pos: { x: 9, y: 10 }, dir: { x: 0, y: 1 }, speed: 5, color: "#1F2937" },
    { pos: { x: 11, y: 10 }, dir: { x: 1, y: 0 }, speed: 5, color: "#0F172A" },
  ];
  setScore(0);
  setWon(false);
  setStatus("ready");
}, [walls]);

  // keyboard
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const d = keyToDir(e.key);
      if (d) {
        e.preventDefault();
        nextDirRef.current = d;
        if (status === "ready") setStatus("playing");
        return;
      }
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Enter" && (status === "gameover" || won)) resetGame();
    };
    window.addEventListener("keydown", onKeyDown, { passive: false });
    return () => window.removeEventListener("keydown", onKeyDown as any);
  }, [status, won]);

  // game loop
  useEffect(() => {
    if (!open) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // fixed update tick (ms)
    let last = performance.now();
    
    // timers to move enemies / truck in tile steps
    let truckStepTimer = 0;
    const truckStepEvery = 100; // ms per tile step (10 tiles/sec)

    const enemyTimers = enemiesRef.current.map(() => 0);

    const draw = () => {
      // background
      ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
      ctx.fillStyle = "#F8FAFC";
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

      // walls
      for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          if (walls[y][x]) {
            ctx.fillStyle = "#111827";
            ctx.fillRect(x * TILE, y * TILE, TILE, TILE);
          }
        }
      }

      // ice cubes
      const ice = iceRef.current;
      for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          if (!walls[y][x] && ice[y][x]) {
            const cx = x * TILE + TILE / 2;
            const cy = y * TILE + TILE / 2;
            // cubito (cuadradito)
            ctx.fillStyle = "#38BDF8";
            ctx.fillRect(cx - 4, cy - 4, 8, 8);
            // brillo
            ctx.fillStyle = "#E0F2FE";
            ctx.fillRect(cx - 3, cy - 3, 3, 3);
          }
        }
      }

      // truck (camioncito)
      const t = truckRef.current;
      const tx = t.x * TILE;
      const ty = t.y * TILE;

      // cuerpo
      ctx.fillStyle = "#2563EB";
      ctx.fillRect(tx + 2, ty + 6, TILE - 4, TILE - 10);
      // cabina
      ctx.fillStyle = "#1D4ED8";
      ctx.fillRect(tx + 2, ty + 2, 9, 8);
      // ventana
      ctx.fillStyle = "#E0F2FE";
      ctx.fillRect(tx + 4, ty + 4, 5, 4);
      // ruedas
      ctx.fillStyle = "#0F172A";
      ctx.fillRect(tx + 4, ty + TILE - 6, 5, 4);
      ctx.fillRect(tx + TILE - 9, ty + TILE - 6, 5, 4);

      // penguins (enemigos)
      for (const e of enemiesRef.current) {
        const ex = e.pos.x * TILE;
        const ey = e.pos.y * TILE;

        // cuerpo pingüino
        ctx.fillStyle = e.color;
        ctx.beginPath();
        ctx.roundRect(ex + 3, ey + 2, TILE - 6, TILE - 4, 6);
        ctx.fill();

        // pancita
        ctx.fillStyle = "#F1F5F9";
        ctx.beginPath();
        ctx.roundRect(ex + 6, ey + 6, TILE - 12, TILE - 9, 6);
        ctx.fill();

        // ojitos
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.arc(ex + 7, ey + 8, 2, 0, Math.PI * 2);
        ctx.arc(ex + TILE - 7, ey + 8, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#111827";
        ctx.beginPath();
        ctx.arc(ex + 7, ey + 8, 1, 0, Math.PI * 2);
        ctx.arc(ex + TILE - 7, ey + 8, 1, 0, Math.PI * 2);
        ctx.fill();

        // pico
        ctx.fillStyle = "#F59E0B";
        ctx.fillRect(ex + TILE / 2 - 2, ey + 10, 4, 2);
      }

      // HUD overlay inside canvas
      ctx.fillStyle = "rgba(15, 23, 42, 0.75)";
      ctx.fillRect(0, 0, CANVAS_W, 26);
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "12px system-ui, -apple-system, Segoe UI, Roboto, Arial";
      ctx.fillText(`Puntos: ${score}  |  Meta: ${TARGET_SCORE}`, 8, 17);

      if (status === "ready") {
        ctx.fillStyle = "rgba(0,0,0,0.45)";
        ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "14px system-ui, -apple-system, Segoe UI, Roboto, Arial";
        ctx.fillText("Usa Flechas o WASD para mover el camioncito.", 18, CANVAS_H / 2 - 10);
        ctx.fillText("Recolecta 🧊 (+2) y evita 🐧. Presiona una tecla para iniciar.", 18, CANVAS_H / 2 + 14);
      }

      if (status === "gameover") {
        ctx.fillStyle = "rgba(0,0,0,0.55)";
        ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "16px system-ui, -apple-system, Segoe UI, Roboto, Arial";
        ctx.fillText("Game Over 😵", CANVAS_W / 2 - 54, CANVAS_H / 2 - 10);
        ctx.font = "13px system-ui, -apple-system, Segoe UI, Roboto, Arial";
        ctx.fillText("Presiona ENTER para reiniciar.", CANVAS_W / 2 - 86, CANVAS_H / 2 + 16);
      }

      if (won) {
        ctx.fillStyle = "rgba(0,0,0,0.6)";
        ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "14px system-ui, -apple-system, Segoe UI, Roboto, Arial";
        const msg1 = "🎉 Felicidades!";
        const msg2 = "Ganaste un descuento de 10 soles";
        const msg3 = "en tu próximo servicio.";
        ctx.fillText(msg1, CANVAS_W / 2 - 48, CANVAS_H / 2 - 18);
        ctx.fillText(msg2, CANVAS_W / 2 - 116, CANVAS_H / 2 + 4);
        ctx.fillText(msg3, CANVAS_W / 2 - 86, CANVAS_H / 2 + 24);
        ctx.font = "12px system-ui, -apple-system, Segoe UI, Roboto, Arial";
        ctx.fillText("Presiona ENTER para jugar otra vez.", CANVAS_W / 2 - 108, CANVAS_H / 2 + 46);
      }
    };

    const stepTruck = () => {
      const truck = truckRef.current;

      // attempt switch direction to nextDir if possible
      const nd = nextDirRef.current;
      const nextPosTry = { x: truck.x + nd.x, y: truck.y + nd.y };
      if (!isWall(walls, nextPosTry)) {
        dirRef.current = nd;
      }

      const d = dirRef.current;
      const nextPos = { x: truck.x + d.x, y: truck.y + d.y };

      // allow wrap tunnel (optional): wrap horizontally if not wall
      // Here we keep it simple: no wrap, just block.
      if (!isWall(walls, nextPos)) {
        truckRef.current = nextPos;
      }

      // pickup ice
      const ice = iceRef.current;
      const t = truckRef.current;
      if (ice[t.y]?.[t.x]) {
        ice[t.y][t.x] = false;
        setScore((s) => {
          const ns = s + POINTS_PER_ICE;
          if (ns >= TARGET_SCORE) setWon(true);
          return ns;
        });
      }
    };

    const stepEnemies = (dtMs: number) => {
      const truck = truckRef.current;
      const enemies = enemiesRef.current;

      for (let i = 0; i < enemies.length; i++) {
        const e = enemies[i];
        enemyTimers[i] += dtMs;

        const every = 1000 / e.speed; // ms per tile step
        while (enemyTimers[i] >= every) {
          enemyTimers[i] -= every;

          // chase step
          const next = chooseChaseStep(walls, e.pos, truck, e.dir);
          const newDir = { x: next.x - e.pos.x, y: next.y - e.pos.y };
          e.pos = next;
          e.dir = newDir.x === 0 && newDir.y === 0 ? e.dir : newDir;

          // collision?
          if (samePos(e.pos, truckRef.current)) {
            setStatus("gameover");
            return;
          }
        }
      }
    };

    const checkCollision = () => {
      const truck = truckRef.current;
      for (const e of enemiesRef.current) {
        if (samePos(e.pos, truck)) return true;
      }
      return false;
    };

    let raf = 0;
    const loop = (now: number) => {
      const dt = now - last;
      last = now;
      

      // Update
      if (status === "playing" && !won) {
  let dead = false;

  truckStepTimer += dt;
  while (truckStepTimer >= truckStepEvery) {
    truckStepTimer -= truckStepEvery;
    stepTruck();

    if (checkCollision()) {
      setStatus("gameover");
      dead = true;
      break;
    }
  }

  if (!dead) {
    stepEnemies(dt);
  }
}
      // Draw
      draw();

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [open, score, status, walls, won]);

  // UI (popup)
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
          borderRadius: 12,
          border: "1px solid rgba(15,23,42,0.2)",
          background: "white",
          boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial",
          cursor: "pointer",
        }}
        aria-label="Abrir juego"
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
        width: 380,
        maxWidth: "calc(100vw - 32px)",
        borderRadius: 16,
        border: "1px solid rgba(15,23,42,0.15)",
        background: "white",
        boxShadow: "0 18px 60px rgba(0,0,0,0.18)",
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
          borderBottom: "1px solid rgba(15,23,42,0.08)",
          background: "rgba(241,245,249,0.7)",
        }}
      >
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{ fontSize: 16, fontWeight: 700 }}>🚚 Juego del Hielo</div>
          <div style={{ fontSize: 12, opacity: 0.75 }}>
            {won ? "¡Ganaste!" : status === "gameover" ? "Perdiste" : status === "playing" ? "Jugando" : "Listo"}
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={resetGame}
            style={{
              padding: "6px 10px",
              borderRadius: 10,
              border: "1px solid rgba(15,23,42,0.15)",
              background: "white",
              cursor: "pointer",
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            Reiniciar
          </button>
          <button
            onClick={() => setOpen(false)}
            style={{
              padding: "6px 10px",
              borderRadius: 10,
              border: "1px solid rgba(15,23,42,0.15)",
              background: "white",
              cursor: "pointer",
              fontSize: 12,
              fontWeight: 700,
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
          width={CANVAS_W}
          height={CANVAS_H}
          style={{
            width: "100%",
            height: "auto",
            borderRadius: 12,
            border: "1px solid rgba(15,23,42,0.12)",
            background: "#F8FAFC",
            display: "block",
          }}
        />

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, gap: 8 }}>
          <div style={{ fontSize: 12, opacity: 0.85, lineHeight: 1.35 }}>
            <div><b>Controles:</b> Flechas o WASD</div>
            <div><b>Puntos:</b> 🧊 +{POINTS_PER_ICE} | <b>Meta:</b> {TARGET_SCORE}</div>
          </div>

          <div style={{ textAlign: "right", fontSize: 12 }}>
            <div style={{ fontWeight: 800 }}>Puntos: {score}</div>
            <div style={{ opacity: 0.7 }}>
              {won ? "🎉 Descuento listo" : `Faltan ${Math.max(0, TARGET_SCORE - score)} pts`}
            </div>
          </div>
        </div>

        {won && (
          <div
            style={{
              marginTop: 10,
              padding: 10,
              borderRadius: 12,
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