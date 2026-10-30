"use strict";

// Code-native illustrations. All surfaces and trajectories are conceptual.
window.PortfolioVisuals = (() => {
  const styles = getComputedStyle(document.documentElement);
  const ink = styles.getPropertyValue("--accent").trim();
  const rgb = styles.getPropertyValue("--accent-rgb").trim();
  const muted = styles.getPropertyValue("--faint").trim();
  const mono = '"Geist Mono", monospace';
  const color = (alpha) => `rgba(${rgb},${alpha})`;
  const clamp = (n, a = 0, b = 1) => Math.min(b, Math.max(a, n));
  const tau = Math.PI * 2;
  let atlas;

  // Rasterize two glyphs once instead of laying out thousands of text runs/frame.
  function buildAtlas() {
    atlas = document.createElement("canvas");
    atlas.width = 96;
    atlas.height = 56;
    const ctx = atlas.getContext("2d");
    ctx.scale(2, 2);
    ctx.font = `500 22px ${mono}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = ink;
    ctx.fillText("0", 12, 14);
    ctx.fillText("1", 36, 14);
  }
  buildAtlas();
  document.fonts.ready.then(buildAtlas);

  function bit(ctx, x, y, size, alpha, seed) {
    const digit = ((seed * 13 + Math.floor(seed / 3)) % 7) % 2;
    ctx.globalAlpha = clamp(alpha);
    ctx.drawImage(
      atlas,
      digit * 48,
      0,
      48,
      56,
      x - size * 0.53,
      y - size * 0.63,
      size * 1.06,
      size * 1.26,
    );
    ctx.globalAlpha = 1;
  }
  function label(ctx, text, x, y, align = "left", size = 8, accent = false) {
    ctx.font = `450 ${size}px ${mono}`;
    ctx.textAlign = align;
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = accent ? ink : muted;
    ctx.fillText(text, x, y);
  }
  function project(p, camera) {
    const cy = Math.cos(camera.yaw),
      sy = Math.sin(camera.yaw);
    const cp = Math.cos(camera.pitch),
      sp = Math.sin(camera.pitch);
    const x = p[0] * cy - p[2] * sy;
    const z = p[0] * sy + p[2] * cy;
    const y = p[1] * cp - z * sp;
    const depth = p[1] * sp + z * cp;
    const k = camera.distance / (camera.distance + depth);
    return {
      x: camera.x + x * camera.sx * k,
      y: camera.y + y * camera.sy * k,
      z: depth,
      k,
    };
  }
  function line(ctx, points, alpha = 0.14, width = 0.7) {
    ctx.beginPath();
    points.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
    ctx.strokeStyle = color(alpha);
    ctx.lineWidth = width;
    ctx.stroke();
  }
  function cubic(points, q) {
    const r = 1 - q;
    const weights = [r * r * r, 3 * r * r * q, 3 * r * q * q, q * q * q];
    return [0, 1].map((axis) =>
      points.reduce((sum, p, i) => sum + p[axis] * weights[i], 0),
    );
  }
  function curve(ctx, points, alpha = 0.2, width = 0.8) {
    ctx.beginPath();
    ctx.moveTo(...points[0]);
    ctx.bezierCurveTo(...points[1], ...points[2], ...points[3]);
    ctx.strokeStyle = color(alpha);
    ctx.lineWidth = width;
    ctx.stroke();
  }
  function plate(ctx, w, h) {
    const m = 13,
      length = 6,
      bottom = h - 35;
    ctx.beginPath();
    for (const [x, y, dx, dy] of [
      [m, m, 1, 1],
      [w - m, m, -1, 1],
      [m, bottom, 1, -1],
      [w - m, bottom, -1, -1],
    ]) {
      ctx.moveTo(x, y + length * dy);
      ctx.lineTo(x, y);
      ctx.lineTo(x + length * dx, y);
    }
    ctx.strokeStyle = color(0.13);
    ctx.lineWidth = 0.7;
    ctx.stroke();
  }
  function background(ctx, w, h) {
    const light = ctx.createRadialGradient(
      w * 0.77,
      h * 0.12,
      0,
      w * 0.77,
      h * 0.12,
      w * 0.9,
    );
    light.addColorStop(0, "rgba(255,255,255,.6)");
    light.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = light;
    ctx.fillRect(0, 0, w, h);
  }

  function hero(ctx, w, h, t, pointer) {
    const phase = t * 0.00011;
    const camera = {
      x: w * 0.5,
      y: h * 0.48,
      sx: w * 0.142,
      sy: h * 0.36,
      yaw: -0.055 + pointer.x * 0.11,
      pitch: -0.27 + pointer.y * 0.1,
      distance: 5.5,
    };
    const columns = w < 500 ? 54 : 100;
    const rows = w < 500 ? 15 : 21;
    function surface(u, v) {
      const twist = u * 2.15 + Math.sin(phase * 0.35) * 0.22;
      return project(
        [
          u * 2.9,
          Math.sin(u * Math.PI + phase * 0.3) * 0.17 +
            v * 0.9 * Math.cos(twist),
          Math.cos(u * 2 - phase * 0.2) * 0.16 + v * 0.9 * Math.sin(twist),
        ],
        camera,
      );
    }
    // Fine silhouette lines keep the folded surface legible at any pixel density.
    for (const v of [-1, 0, 1]) {
      const outline = [];
      for (let i = 0; i <= 120; i++) outline.push(surface(i / 60 - 1, v));
      line(ctx, outline, v === 0 ? 0.045 : 0.12, 0.65);
    }
    const points = [];
    const pulse = (t / 10500) % 1;
    for (let row = 0; row < rows; row++) {
      const v = (row / (rows - 1)) * 2 - 1;
      for (let col = 0; col < columns; col++) {
        const progress = col / (columns - 1),
          u = progress * 2 - 1;
        const p = surface(u, v);
        const facing = Math.abs(Math.cos(u * 2.15 - 0.27));
        const edge = Math.pow(Math.sin(progress * Math.PI), 0.4);
        const distance = Math.min(
          Math.abs(progress - pulse),
          1 - Math.abs(progress - pulse),
        );
        const signal = Math.exp((-distance * distance) / 0.0025);
        const cursor = Math.exp(
          -(
            (p.x / w - 0.5 - pointer.x) ** 2 * 24 +
            (p.y / h - 0.5 - pointer.y) ** 2 * 9
          ),
        );
        p.alpha = edge * (0.15 + facing * 0.46 + signal * 0.3 + cursor * 0.1);
        p.size = (w < 500 ? 6.6 : 7.5) * p.k;
        p.seed = row * columns + col;
        points.push(p);
      }
    }
    points.sort((a, b) => b.z - a.z);
    for (const p of points) bit(ctx, p.x, p.y, p.size, p.alpha, p.seed);
  }

  // Research diagrams use a stable composition and a three-stage explanation.
  // Animation carries model updates or highlights a workflow, never a measured result.
  function arrow(ctx, from, to, alpha = 0.7, dashed = false) {
    ctx.save();
    ctx.strokeStyle = color(alpha);
    ctx.lineWidth = 1.1;
    if (dashed) ctx.setLineDash([3, 4]);
    ctx.beginPath();
    ctx.moveTo(...from);
    ctx.lineTo(...to);
    ctx.stroke();
    ctx.setLineDash([]);
    const a = Math.atan2(to[1] - from[1], to[0] - from[0]);
    ctx.beginPath();
    ctx.moveTo(to[0] - 6 * Math.cos(a - 0.5), to[1] - 6 * Math.sin(a - 0.5));
    ctx.lineTo(...to);
    ctx.lineTo(to[0] - 6 * Math.cos(a + 0.5), to[1] - 6 * Math.sin(a + 0.5));
    ctx.stroke();
    ctx.restore();
  }
  function packet(ctx, path, time, alpha = 0.8, offset = 0) {
    for (let i = 0; i < 3; i++) {
      const q = (time / 5500 + i / 3 + offset) % 1;
      const p = cubic(path, q);
      bit(ctx, p[0], p[1], 8.5, Math.sin(q * Math.PI) * alpha, i + offset * 7);
    }
  }
  function dot(ctx, x, y, r, alpha) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, tau);
    ctx.fillStyle = color(alpha);
    ctx.fill();
  }
  function optimization(ctx, w, h, t, pointer, phase = 0) {
    plate(ctx, w, h);
    const cx = w * 0.49,
      cy = h * 0.53;
    const rx = w * 0.36,
      ry = h * 0.22;
    // An explicit vector plane replaces the abstract moving landscape.
    for (let ring = 1; ring <= 6; ring++) {
      ctx.beginPath();
      ctx.ellipse(cx, cy, (rx * ring) / 6, (ry * ring) / 6, -0.22, 0, tau);
      ctx.strokeStyle = color(0.055 + ring * 0.009);
      ctx.lineWidth = 0.7;
      ctx.stroke();
    }
    for (let row = -4; row <= 4; row++)
      for (let col = -8; col <= 8; col++) {
        const x = cx + col * w * 0.039,
          y = cy + row * h * 0.043 - col * h * 0.008;
        if ((col / 9) ** 2 + (row / 5) ** 2 > 1) continue;
        bit(
          ctx,
          x,
          y,
          5.9,
          0.1 +
            (phase === 1 ? 0.1 : 0) * Math.exp(-(row * row + col * col) / 16),
          row * 19 + col + 200,
        );
      }
    const origin = [cx, cy];
    const a = [w * 0.2, h * 0.25],
      b = [w * 0.77, h * 0.71],
      update = [w * 0.83, h * 0.34];
    const incomingA = [a, [w * 0.29, h * 0.33], [w * 0.37, h * 0.43], origin];
    const incomingB = [b, [w * 0.69, h * 0.65], [w * 0.59, h * 0.57], origin];
    arrow(ctx, origin, a, phase === 0 ? 0.8 : 0.28);
    arrow(ctx, origin, b, phase === 0 ? 0.6 : 0.24, phase > 0);
    if (phase === 0) {
      packet(ctx, incomingA, t, 0.85);
      packet(ctx, incomingB, t, 0.6, 0.18);
    }
    if (phase === 1) {
      ctx.beginPath();
      ctx.moveTo(...origin);
      ctx.lineTo(...b);
      ctx.lineTo(update[0], b[1]);
      ctx.closePath();
      ctx.fillStyle = color(0.035);
      ctx.fill();
      arrow(ctx, b, [update[0], b[1]], 0.36, true);
      arrow(ctx, [update[0], b[1]], update, 0.65, true);
      const scan = (Math.sin(t * 0.001) + 1) / 2;
      ctx.strokeStyle = color(0.35);
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.arc(cx, cy, 14 + scan * 8, 0, tau);
      ctx.stroke();
    }
    arrow(ctx, origin, update, phase === 2 ? 0.95 : 0.18, phase !== 2);
    if (phase === 2) {
      const path = [origin, [w * 0.59, h * 0.48], [w * 0.73, h * 0.39], update];
      curve(ctx, path, 0.06, 7);
      packet(ctx, path, t, 0.95);
    }
    dot(ctx, cx, cy, 11, 0.08);
    dot(ctx, cx, cy, 3, 0.85);
    label(ctx, "GRADIENT A", w * 0.12, h * 0.14, "left", 7.5, phase === 0);
    label(ctx, "GRADIENT B", w * 0.9, h * 0.8, "right", 7.5, phase === 0);
    label(
      ctx,
      "CORRECTED UPDATE",
      w * 0.9,
      h * 0.24,
      "right",
      7.5,
      phase === 2,
    );
    label(
      ctx,
      phase === 0
        ? "COMPARE DIRECTIONS"
        : phase === 1
          ? "REDUCE CONFLICT"
          : "APPLY THE UPDATE",
      w * 0.5,
      h * 0.86,
      "center",
      7.5,
      true,
    );
  }

  function quant(ctx, w, h, t, pointer, phase = 0) {
    plate(ctx, w, h);
    const left = w * 0.17,
      center = w * 0.51,
      right = w * 0.84;
    const top = h * 0.33,
      bottom = h * 0.65,
      middle = h * 0.49;
    label(ctx, "INPUTS", left, h * 0.15, "center", 7.5, phase === 0);
    label(ctx, "ANALYSIS", center, h * 0.15, "center", 7.5, phase === 1);
    label(ctx, "RESEARCH", right, h * 0.15, "center", 7.5, phase === 2);
    // Two distinct research inputs. No fabricated prices, returns, or forecasts.
    for (let i = 0; i < 3; i++) {
      ctx.fillStyle = color(phase === 0 ? 0.5 + i * 0.15 : 0.22);
      ctx.fillRect(left - 10 + i * 7, top + 8 - i * 4, 4, 9 + i * 4);
    }
    label(ctx, "FINTECH", left, top + 28, "center", 6.5);
    ctx.beginPath();
    ctx.arc(left, bottom - 5, 11, 0, tau);
    ctx.ellipse(left, bottom - 5, 4, 11, 0, 0, tau);
    ctx.moveTo(left - 11, bottom - 5);
    ctx.lineTo(left + 11, bottom - 5);
    ctx.strokeStyle = color(phase === 0 ? 0.65 : 0.25);
    ctx.lineWidth = 0.8;
    ctx.stroke();
    label(ctx, "WORLD EVENTS", left, bottom + 21, "center", 6.2);
    const half = Math.min(42, w * 0.12);
    const paths = [
      [
        [left + 17, top],
        [w * 0.32, top],
        [w * 0.31, middle],
        [center - half - 5, middle],
      ],
      [
        [left + 17, bottom - 5],
        [w * 0.32, bottom - 5],
        [w * 0.31, middle],
        [center - half - 5, middle],
      ],
    ];
    paths.forEach((path, i) => {
      curve(ctx, path, 0.2, 0.8);
      if (phase === 0) packet(ctx, path, t, 0.9, i * 0.23);
    });
    const matrixTop = middle - 30,
      step = half / 4;
    for (let row = 0; row < 7; row++)
      for (let col = 0; col < 9; col++) {
        const scan =
          phase === 1 ? Math.exp(-Math.pow(col - ((t / 800) % 9), 2) / 3) : 0;
        bit(
          ctx,
          center + (col - 4) * step,
          matrixTop + row * 9,
          6,
          0.18 + scan * 0.65,
          row * 13 + col,
        );
      }
    ctx.strokeStyle = color(0.22);
    ctx.lineWidth = 0.8;
    for (const sign of [-1, 1]) {
      ctx.beginPath();
      ctx.moveTo(center + sign * (half + 4), matrixTop - 6);
      ctx.lineTo(center + sign * (half + 9), matrixTop - 6);
      ctx.lineTo(center + sign * (half + 9), matrixTop + 60);
      ctx.lineTo(center + sign * (half + 4), matrixTop + 60);
      ctx.stroke();
    }
    label(ctx, "PYTHON / R", center, bottom + 30, "center", 8, phase === 1);
    const out = [
      [center + half + 11, middle],
      [w * 0.71, middle],
      [w * 0.73, middle],
      [right - 16, middle],
    ];
    curve(ctx, out, 0.2, 0.8);
    if (phase === 2) packet(ctx, out, t, 0.9);
    ctx.fillStyle = "rgba(255,252,253,.95)";
    ctx.fillRect(right - 15, middle - 24, 30, 45);
    ctx.strokeStyle = color(phase === 2 ? 0.75 : 0.3);
    ctx.strokeRect(right - 15, middle - 24, 30, 45);
    for (let row = 0; row < 5; row++) {
      const active = phase === 2 && row === Math.floor((t / 700) % 5);
      line(
        ctx,
        [
          { x: right - 9, y: middle - 15 + row * 7 },
          { x: right + (row % 2 ? 5 : 9), y: middle - 15 + row * 7 },
        ],
        active ? 0.9 : 0.25,
        active ? 1.6 : 0.7,
      );
    }
    label(ctx, "ASK · TEST · REFINE", w * 0.5, h * 0.86, "center", 7.5, true);
  }

  const sphere = Array.from({ length: 180 }, (_, i) => {
    const y = 1 - ((i + 0.5) / 180) * 2,
      r = Math.sqrt(1 - y * y),
      a = i * Math.PI * (3 - Math.sqrt(5));
    return [Math.cos(a) * r, y, Math.sin(a) * r];
  });
  function signal(ctx, w, h, t, pointer, phase = 0) {
    plate(ctx, w, h);
    const sx = w * 0.18,
      tx = w * 0.76,
      ty = h * 0.49,
      radius = Math.min(45, w * 0.13);
    label(ctx, "LOCAL TRAINING", w * 0.08, h * 0.14, "left", 7.5, phase === 0);
    label(ctx, "SHARED MODEL", w * 0.92, h * 0.14, "right", 7.5, phase === 2);
    for (let branch = 0; branch < 3; branch++) {
      const y = h * (0.3 + branch * 0.21),
        size = 29;
      ctx.fillStyle = phase === 0 ? color(0.055) : "rgba(255,252,253,.9)";
      ctx.fillRect(sx - size / 2, y - size / 2, size, size);
      ctx.strokeStyle = color(phase === 0 ? 0.48 : 0.22);
      ctx.lineWidth = 0.8;
      ctx.strokeRect(sx - size / 2, y - size / 2, size, size);
      for (let row = 0; row < 3; row++)
        for (let col = 0; col < 3; col++) {
          const pulse =
            phase === 0
              ? (Math.sin(t * 0.0015 + branch + row + col) + 1) / 2
              : 0;
          bit(
            ctx,
            sx + (col - 1) * 7,
            y + (row - 1) * 7,
            5.8,
            0.28 + pulse * 0.55,
            branch * 17 + row * 3 + col,
          );
        }
      label(ctx, `0${branch + 1}`, sx - 24, y + 3, "right", 6.5);
      const path = [
        [sx + size / 2 + 3, y],
        [w * 0.43, y],
        [w * 0.45, ty],
        [tx - radius - 5, ty],
      ];
      curve(ctx, path, 0.17, 0.8);
      if (phase === 1) packet(ctx, path, t, 0.9, branch * 0.12);
      if (phase === 2) packet(ctx, [...path].reverse(), t, 0.7, branch * 0.12);
    }
    const camera = {
      x: tx,
      y: ty,
      sx: radius,
      sy: radius,
      yaw: t * 0.00004 + pointer.x * 0.1,
      pitch: 0.12,
      distance: 5,
    };
    const points = sphere
      .map((p, i) => ({ ...project(p, camera), seed: i }))
      .sort((a, b) => b.z - a.z);
    for (const p of points)
      bit(
        ctx,
        p.x,
        p.y,
        5.9 * p.k,
        p.z > 0 ? 0.11 : 0.35 + clamp(-p.z) * 0.5,
        p.seed,
      );
    ctx.beginPath();
    ctx.arc(tx, ty, radius + 5, 0, tau);
    ctx.strokeStyle = color(phase === 2 ? 0.4 : 0.1);
    ctx.lineWidth = 0.8;
    ctx.stroke();
    label(
      ctx,
      phase === 0
        ? "DATA STAYS LOCAL"
        : phase === 1
          ? "SEND MODEL UPDATES"
          : "SYNCHRONIZE MODELS",
      w * 0.5,
      h * 0.86,
      "center",
      7.5,
      true,
    );
  }
  return { background, hero, optimization, signal, quant };
})();
