"use strict";
document.documentElement.classList.add("js");

const companies = [
  {
    name: "Koov",
    logo: "koov.svg",
    logoLabel: "Koov",
    className: "mark-logo",
    category: "AI PRODUCT",
    role: "First founding engineer · Jan 2026 → now",
    description:
      "Building a live AI teammate that joins calls, remembers context, and turns conversations into completed work.",
    outcomes: [
      ["350+", "SIGNUPS"],
      ["1–5s", "LIVE RESPONSE"],
    ],
    url: "https://koovai.com",
  },
  {
    name: "Keras",
    logo: "keras.png",
    className: "keras-logo",
    category: "OPEN SOURCE",
    role: "NEAT creator · Keras ecosystem listing",
    description:
      "Bringing game-theoretic multi-task optimization into the Keras ecosystem, with Google DeepMind Optax integration in progress.",
    outcomes: [
      ["Keras 3", "OPTIMIZER API"],
      ["NumPy", "REFERENCE ENGINE"],
    ],
    url: "https://keras.io/getting_started/ecosystem/",
  },
  {
    name: "Berkeley Haas",
    logo: "berkeley.svg",
    className: "haas-logo",
    category: "RESEARCH",
    role: "Research assistant · May → Sep 2025",
    description:
      "Built Python and R frameworks to study how fintech firms and geopolitical changes move global markets.",
    outcomes: [
      ["Python", "ANALYSIS"],
      ["R", "MODELING"],
    ],
    url: "https://haas.berkeley.edu/",
  },
  {
    name: "UNT Engineering",
    logo: "unt.svg",
    className: "unt-logo",
    category: "RESEARCH",
    role: "Student researcher · May → Jun 2025",
    description:
      "Published machine learning research with Dr. Pottathorumbil, including a federated CNN-Transformer architecture.",
    outcomes: [
      ["2", "PUBLISHED PAPERS"],
      ["234+", "ZENODO DOWNLOADS"],
    ],
    url: "https://engineering.unt.edu/",
  },
  {
    name: "SH1P",
    logo: "sh1p.jpg",
    className: "mark-logo matte-logo",
    logoLabel: "SH1P",
    category: "GROWTH",
    role: "Founding head of content & growth · Jan 2026 → now",
    description:
      "Built the content engine for a global, zero-equity startup incubator backed by Anthropic, Deel, and Antler.",
    outcomes: [
      ["1M+", "IMPRESSIONS"],
      ["8,000+", "APPLICATIONS"],
    ],
    url: "https://www.ship-studio.co/",
  },
  {
    name: "BuildDallas",
    logo: "builddallas.jpg",
    className: "mark-logo matte-logo build-logo",
    logoLabel: "BuildDallas",
    category: "ECOSYSTEM",
    role: "Director · Aug 2026 → now",
    description:
      "Connecting North Texas founders with technical talent through university partnerships, events, and hackathons.",
    outcomes: [
      ["10K+", "PEOPLE REACHED"],
      ["DFW", "FOUNDER ECOSYSTEM"],
    ],
    url: "https://www.linkedin.com/company/build-dallas",
  },
  {
    name: "Venn",
    logo: "venn.webp",
    className: "venn-logo",
    category: "COMMUNITY",
    role: "Founding partner & camp mentor · Apr 2026 → now",
    description:
      "Helping student builders find their people. Scaled partnerships and now mentor student founders at Venn camp.",
    outcomes: [
      ["33", "PARTNER ORGANIZATIONS"],
      ["240K+", "STUDENTS REACHED"],
    ],
    url: "https://joinvenn.org",
  },
  {
    name: "504Found",
    logo: "504found.png",
    className: "mark-logo",
    logoLabel: "504Found",
    category: "ACCESSIBILITY",
    role: "President · Jun 2024 → now",
    description:
      "Leading disability advocacy and building AI tools that adapt school assignments to students’ accommodation plans.",
    outcomes: [
      ["19.7K+", "STUDENTS"],
      ["50", "US STATES"],
    ],
    url: "https://504found.org",
  },
  {
    name: "FIRST Tech Challenge",
    logo: "first.png",
    className: "first-logo",
    category: "ROBOTICS",
    role: "Programmer & outreach lead · 2023–26",
    description:
      "UIL 6A state champions with Jasper Wolves Blue. Design Award and a league-winning alliance with Missing Amps.",
    outcomes: [
      ["16", "TEAM AWARD RESULTS"],
      ["6A", "STATE CHAMPIONS"],
    ],
    url: "https://ftc-events.firstinspires.org/2025/team/30801#awards",
  },
];

const work = [
  {
    name: "Koov",
    role: "First founding engineer",
    date: "JAN 2026 → NOW",
    line: "A live AI teammate, built for the conversation.",
    metric: "350+",
    label: "SIGNUPS",
    description:
      "An AI teammate that joins Zoom, Meet, Teams, and Discord calls as a participant. Answers questions mid-call and turns conversation into tracked action.",
    bullets: [
      "Built speaker diarization and CRM systems so the agent knows who said what and who owns each follow-up.",
      "Engineered the persistent-memory response pipeline, answering mid-call in 1 to 5 seconds.",
      "Supported four pilots, including YC-backed teams, Cornell, and Georgia Tech, with two enterprise deals in progress.",
      "Integrated Slack, Linear, HubSpot, and Notion. Now building autonomous follow-up execution.",
    ],
    tags: "VOICE AI · DIARIZATION · CRM · MEMORY",
    url: "https://koovai.com",
    plot: "retention",
  },
  {
    name: "SH1P",
    role: "Founding head of content & growth",
    date: "JAN 2026 → NOW",
    line: "Content strategy that drove 8,000+ founder applications.",
    metric: "1M+",
    label: "IMPRESSIONS IN 2 MONTHS",
    description:
      "A global, zero-equity startup incubator backed by Anthropic, Deel, and Antler.",
    bullets: [
      "Built the content strategy from zero to more than one million impressions in two months.",
      "Content drove 8,000+ founder applications across 152 chapters worldwide.",
    ],
    tags: "GROWTH · CONTENT · COMMUNITY",
    url: "https://www.ship-studio.co/",
    plot: "chapters",
  },
  {
    name: "BuildDallas",
    role: "Director",
    date: "AUG 2026 → NOW",
    line: "Connecting the North Texas builder ecosystem.",
    metric: "10K+",
    label: "PEOPLE REACHED",
    description:
      "A North Texas organization connecting founders with technical talent.",
    bullets: [
      "Hosts mixers, seminars, and hackathon partnerships, including HackUTA and HackUTD.",
      "Partners include UT Dallas, AITX, Anthropic, Cursor, Stripe, Plug and Play, and CEBOS.",
      "Programming has reached 10,000+ founders, students, and operators.",
    ],
    tags: "ECOSYSTEM · EVENTS · PARTNERSHIPS",
    url: "https://www.linkedin.com/company/build-dallas",
    plot: "reach",
  },
  {
    name: "Venn",
    role: "Founding partner & camp mentor",
    date: "APR 2026 → NOW",
    line: "Grew a student-builder network to 33 partner organizations.",
    metric: "240K+",
    label: "STUDENTS REACHED",
    description:
      "A free program connecting student builders with college clubs and companies.",
    bullets: [
      "Joined as the first partner and helped scale to 33 partner organizations reaching 240K+ students.",
      "Core partners include Yale and Microsoft. Now mentoring student founders at Venn camp.",
    ],
    tags: "PARTNERSHIPS · MENTORSHIP · COMMUNITY",
    url: "https://joinvenn.org",
    plot: "partners",
  },
  {
    name: "504Found",
    role: "President",
    date: "JUN 2024 → NOW",
    line: "Building AI tools for students with learning accommodations.",
    metric: "19.7K+",
    label: "STUDENTS LED",
    description:
      "A student-led disability advocacy organization for neurodivergent students with 504 Plans and IEPs.",
    bullets: [
      "Leads 19,700+ students across all 50 states and international chapters.",
      "Restructured into a regional chapter model and built partnerships with the UN, WHO, and CanChild.",
      "Led development of Alloquly, an AI tool adapting assignments to each student’s accommodation plan.",
      "Named to the UK’s 18 Under 18 for this work.",
    ],
    tags: "AI ACCESSIBILITY · OPERATIONS · ADVOCACY",
    url: "https://504found.org",
    plot: "states",
  },
];

function evidence(type) {
  if (type === "retention")
    return '<div class="evidence-plot"><div class="evidence-top mono"><span>KOOV · WEEKLY RETENTION</span><span>26%</span></div><div class="retention-bar" role="img" aria-label="26 percent weekly retention"><span></span></div><div class="retention-key"><span>~90 weekly active users</span><span>350+ signups</span></div></div>';
  const values = {
    chapters: [
      ["152", "CHAPTERS WORLDWIDE"],
      ["8,000+", "FOUNDER APPLICATIONS"],
    ],
    reach: [["10,000+", "FOUNDERS, STUDENTS & OPERATORS"]],
    partners: [
      ["33", "PARTNER ORGANIZATIONS"],
      ["240K+", "COMBINED STUDENT REACH"],
    ],
    states: [
      ["50", "US STATES"],
      ["19,700+", "STUDENTS LED"],
    ],
  };
  const count = { chapters: 152, partners: 33, states: 50 }[type];
  return `<div class="evidence-plot"><div class="evidence-metrics">${values[type].map(([n, l]) => `<span><strong>${n}</strong><small>${l}</small></span>`).join("")}</div>${count ? `<div class="pixel-application" role="img" aria-label="${count} binary digits, one per ${type === "chapters" ? "chapter" : type === "states" ? "state" : "partner organization"}">${Array.from({ length: count }, (_, i) => `<i aria-hidden="true">${(i * 7 + Math.floor(i / 3)) % 2}</i>`).join("")}</div>` : ""}</div>`;
}

document.querySelector("#work-list").innerHTML = work
  .map(
    (w, i) =>
      `<details class="work-item reveal"><summary class="work-summary"><span class="work-number mono">0${i + 1}</span><div class="work-identity"><h3>${w.name}</h3><span>${w.role}</span><p>${w.line}</p></div><div class="work-measure"><strong>${w.metric}</strong><span class="mono">${w.label}</span></div><span class="disclosure" aria-hidden="true">+</span></summary><div class="work-detail"><p>${w.description}</p>${evidence(w.plot)}<ul>${w.bullets.map((b) => `<li>${b}</li>`).join("")}</ul><div class="work-detail-footer"><span class="work-tags">${w.tags}</span><a class="text-action" href="${w.url}" target="_blank" rel="noreferrer">Explore ${w.name} <span>↗</span></a></div></div></details>`,
  )
  .join("");

const scrollAnimations = new Set();
const researchControllers = [];
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
let motionPaused = reducedMotion.matches;
let userPaused = false;
let appliedMotionPreference = reducedMotion.matches;
const toggle = document.querySelector("#motion-toggle");
function updateMotion() {
  appliedMotionPreference = reducedMotion.matches;
  motionPaused = userPaused || reducedMotion.matches;
  document.body.classList.toggle("motion-paused", motionPaused);
  toggle.setAttribute("aria-pressed", String(motionPaused));
  toggle.disabled = reducedMotion.matches;
  toggle.setAttribute(
    "aria-label",
    reducedMotion.matches
      ? "Animations paused by your reduced-motion preference"
      : motionPaused
        ? "Resume animations"
        : "Pause animations",
  );
  toggle.querySelector(".motion-glyph").textContent = motionPaused ? "▷" : "Ⅱ";
  document.querySelector("#motion-label").textContent = reducedMotion.matches
    ? "REDUCED MOTION"
    : motionPaused
      ? "PLAY"
      : "PAUSE";
  researchControllers.forEach((controller) => controller.sync());
  if (motionPaused) scrollAnimations.forEach((animation) => animation.finish());
}
toggle.addEventListener("click", () => {
  userPaused = !motionPaused;
  updateMotion();
});
reducedMotion.addEventListener("change", updateMotion);
updateMotion();

// A vertical wheel with one stable selection and a consistent, measured pitch.
const wheel = document.querySelector("#company-wheel");
const wheelItems = document.querySelector("#company-items");
const wheelDots = document.querySelector("#wheel-dots");
let activeCompany = 0,
  wheelAccumulation = 0,
  lastWheelMove = 0;
let drag = null,
  suppressClick = false;
const wheelButtons = companies.map((c, index) => {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "company-button";
  button.setAttribute("aria-label", `Show ${c.name}`);
  button.innerHTML = `<span class="logo-lockup"><img src="assets/logos/${c.logo}" alt="${c.name}" class="${c.className || ""}" draggable="false">${c.logoLabel ? `<span aria-hidden="true">${c.logoLabel}</span>` : ""}</span>`;
  button.addEventListener("click", () => {
    if (!suppressClick) selectCompany(index, true);
  });
  wheelItems.append(button);
  const dot = document.createElement("i");
  wheelDots.append(dot);
  return button;
});
const detail = document.querySelector("#company-detail");
function selectCompany(index, manual = false) {
  const next = (index + companies.length) % companies.length;
  const changed = next !== activeCompany;
  activeCompany = next;
  wheelButtons.forEach((button, i) => {
    let offset = i - activeCompany;
    if (offset > companies.length / 2) offset -= companies.length;
    if (offset < -companies.length / 2) offset += companies.length;
    button.style.setProperty("--offset", offset);
    button.style.visibility = Math.abs(offset) > 2 ? "hidden" : "visible";
    button.classList.toggle("is-active", offset === 0);
    button.tabIndex = offset === 0 ? 0 : -1;
    button.setAttribute("aria-pressed", String(offset === 0));
    wheelDots.children[i].classList.toggle("is-active", offset === 0);
  });
  const c = companies[activeCompany];
  document.querySelector("#company-position").textContent =
    `${String(activeCompany + 1).padStart(2, "0")} / 09`;
  document.querySelector("#company-category").textContent = c.category;
  document.querySelector("#company-name").textContent = c.name;
  document.querySelector("#company-role").textContent = c.role;
  document.querySelector("#company-description").textContent = c.description;
  document.querySelector("#company-outcomes").innerHTML = c.outcomes
    .map(([n, l]) => `<span><strong>${n}</strong><small>${l}</small></span>`)
    .join("");
  const link = document.querySelector("#company-link");
  link.href = c.url;
  link.innerHTML = `Explore ${c.name} <span>↗</span>`;
  if (changed && !motionPaused)
    detail.animate(
      [
        { opacity: 0.35, transform: "translateY(5px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      { duration: 450, easing: "cubic-bezier(.22,1,.36,1)" },
    );
  if (manual)
    document.querySelector("#company-announcement").textContent =
      `${c.name}. ${c.role}`;
}
selectCompany(0);
wheel.addEventListener(
  "wheel",
  (event) => {
    if (Math.abs(event.deltaY) < Math.abs(event.deltaX)) return;
    event.preventDefault();
    if (performance.now() - lastWheelMove < 480) return;
    wheelAccumulation += event.deltaY;
    if (Math.abs(wheelAccumulation) > 28) {
      selectCompany(activeCompany + Math.sign(wheelAccumulation), true);
      wheelAccumulation = 0;
      lastWheelMove = performance.now();
    }
  },
  { passive: false },
);
wheel.addEventListener("keydown", (event) => {
  const offsets = { ArrowDown: 1, ArrowUp: -1, PageDown: 1, PageUp: -1 };
  if (event.key in offsets) {
    event.preventDefault();
    selectCompany(activeCompany + offsets[event.key], true);
  }
  if (event.key === "Home") {
    event.preventDefault();
    selectCompany(0, true);
  }
  if (event.key === "End") {
    event.preventDefault();
    selectCompany(companies.length - 1, true);
  }
});
wheel.addEventListener("pointerdown", (event) => {
  if (event.button !== 0) return;
  drag = { id: event.pointerId, y: event.clientY, moved: false };
});
wheel.addEventListener("pointermove", (event) => {
  if (!drag || event.pointerId !== drag.id) return;
  const distance = event.clientY - drag.y;
  if (Math.abs(distance) > 10 && !drag.moved) {
    drag.moved = true;
    wheel.setPointerCapture(event.pointerId);
  }
  if (Math.abs(distance) > 46) {
    selectCompany(activeCompany + (distance < 0 ? 1 : -1), true);
    drag.y = event.clientY;
  }
});
function endDrag() {
  if (drag?.moved) {
    suppressClick = true;
    setTimeout(() => (suppressClick = false), 60);
  }
  drag = null;
}
wheel.addEventListener("pointerup", endDrag);
wheel.addEventListener("pointercancel", endDrag);
document
  .querySelector("#company-prev")
  .addEventListener("click", () => selectCompany(activeCompany - 1, true));
document
  .querySelector("#company-next")
  .addEventListener("click", () => selectCompany(activeCompany + 1, true));

// Reveal once, with content always available when scripting or motion is disabled.
const revealObserver = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    }),
  { threshold: 0, rootMargin: "0px 0px -28px 0px" },
);
window.revealPortfolio = (root = document) => {
  root.querySelectorAll(".reveal").forEach((el) => {
    if (el.dataset.revealReady) return;
    el.dataset.revealReady = "true";
    el.classList.add("is-pending");
    revealObserver.observe(el);
  });
};
window.revealPortfolio();
// Animate evidence only when it is actually in view, once per page.
const evidenceObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const plot = entry.target;
      plot.classList.add("evidence-entered");
      evidenceObserver.unobserve(plot);
      if (motionPaused) return;
      const bar = plot.querySelector(".retention-bar > span");
      const marks = plot.querySelector(".pixel-application");
      const target = bar || marks;
      if (!target) return;
      const animation = target.animate(
        bar
          ? [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }]
          : [
              { opacity: 0, transform: "translateY(3px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
        { duration: bar ? 650 : 360, easing: "cubic-bezier(.22,1,.36,1)" },
      );
      scrollAnimations.add(animation);
      animation.finished.then(
        () => scrollAnimations.delete(animation),
        () => scrollAnimations.delete(animation),
      );
    });
  },
  { threshold: 0.25 },
);
document.querySelectorAll(".evidence-plot").forEach((plot) => {
  plot.classList.add("evidence-observed");
  evidenceObserver.observe(plot);
});
const sectionIds = [
  "overview",
  "experience",
  "work",
  "research",
  "beyond",
  "hackathons",
  "honors",
  "mentions",
  "now",
];
const navLinks = [...document.querySelectorAll(".main-nav a,.page-nav a")];
let scrollTick = false;
let lastNavigationSection = "";
function updateNavigation() {
  const target = innerWidth < 901 ? 135 : innerHeight * 0.22;
  let selected = sectionIds[0];
  sectionIds.forEach((id) => {
    if (document.getElementById(id).getBoundingClientRect().top <= target)
      selected = id;
  });
  navLinks.forEach((link) => {
    const current = link.hash === `#${selected}`;
    link.classList.toggle("is-current", current);
    if (current) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
  if (innerWidth < 901 && selected !== lastNavigationSection) {
    const nav = document.querySelector(".main-nav");
    const active = nav.querySelector(".is-current");
    const bounds = nav.getBoundingClientRect();
    const item = active.getBoundingClientRect();
    let offset = 0;
    if (item.left < bounds.left + 10) offset = item.left - bounds.left - 10;
    else if (item.right > bounds.right - 10)
      offset = item.right - bounds.right + 10;
    if (offset)
      nav.scrollTo({
        left: nav.scrollLeft + offset,
        behavior: motionPaused ? "auto" : "smooth",
      });
  }
  lastNavigationSection = selected;
  const length = document.documentElement.scrollHeight - innerHeight;
  document.documentElement.style.setProperty(
    "--scroll-progress",
    length ? Math.min(1, scrollY / length) : 0,
  );
  scrollTick = false;
}
addEventListener(
  "scroll",
  () => {
    if (!scrollTick) {
      scrollTick = true;
      requestAnimationFrame(updateNavigation);
    }
  },
  { passive: true },
);
addEventListener("resize", updateNavigation, { passive: true });
updateNavigation();

// All canvas scenes share a single, visibility-aware animation loop.
const scenes = [];
const researchSteps = {
  "optimization-field": {
    name: "NEAT",
    labels: ["Gradients", "Correction", "Update"],
    captions: [
      "Compare gradient directions before choosing the next parameter update.",
      "When directions conflict, NEAT corrects the conflicting component.",
      "Apply the corrected update, then repeat with the next training step.",
    ],
  },
  "quant-field": {
    name: "Market research",
    labels: ["Observe", "Analyze", "Question"],
    captions: [
      "Start with company-level developments and geopolitical context.",
      "Use Python and R frameworks to structure the analysis.",
      "Turn the analysis into research questions to test and refine.",
    ],
  },
  "signal-field": {
    name: "Federated learning",
    labels: ["Train", "Aggregate", "Synchronize"],
    captions: [
      "Each device trains locally. Raw data stays with its source.",
      "Devices contribute model updates to the shared model.",
      "The shared model returns to the devices for the next training round.",
    ],
  },
};
function setupResearch(state) {
  const config = researchSteps[state.canvas.id];
  if (!config) return null;
  const art = state.canvas.parentElement;
  const figure = document.createElement("div");
  figure.className = "research-figure";
  art.before(figure);
  figure.append(art);
  const controls = document.createElement("div");
  controls.className = "research-controls";
  controls.setAttribute("role", "group");
  controls.setAttribute("aria-label", `${config.name} explanation steps`);
  const copy = document.createElement("p");
  copy.className = "research-step-copy";
  copy.id = `${state.canvas.id}-explanation`;
  state.canvas.setAttribute("aria-describedby", copy.id);
  const replay = document.createElement("button");
  replay.type = "button";
  replay.className = "research-replay mono";
  replay.setAttribute("aria-label", `Replay ${config.name} explanation`);
  const status = document.createElement("div");
  status.className = "research-sequence-status";
  status.innerHTML = '<span class="mono">CONCEPT / 3 STEPS</span>';
  status.append(replay);
  const controller = {
    phase: 0,
    manualStage: null,
    startedAt: 0,
    sync() {
      buttons.forEach((button, index) => {
        button.setAttribute("aria-pressed", String(index === controller.phase));
      });
      copy.textContent = config.captions[controller.phase];
      replay.disabled = motionPaused;
      replay.textContent = motionPaused ? "PAUSED" : "↻ REPLAY";
      figure.dataset.stage = String(controller.phase);
    },
  };
  const buttons = config.labels.map((text, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "research-step";
    button.innerHTML = `<span class="mono">0${index + 1}</span>${text}`;
    button.addEventListener("click", () => {
      controller.manualStage = index;
      controller.phase = index;
      controller.sync();
      paintScene(state, state.time);
    });
    controls.append(button);
    return button;
  });
  replay.addEventListener("click", () => {
    controller.manualStage = null;
    controller.startedAt = state.time;
    paintScene(state, state.time);
  });
  figure.append(status, controls, copy);
  controller.sync();
  researchControllers.push(controller);
  return controller;
}
function scene(id, draw, animated = true) {
  const canvas = document.getElementById(id),
    ctx = canvas.getContext("2d");
  const state = {
    canvas,
    ctx,
    draw,
    animated,
    width: 0,
    height: 0,
    visible: false,
    drawn: false,
    time: 0,
    pixelRatio: 0,
    pointer: { x: 0, y: 0 },
    targetPointer: { x: 0, y: 0 },
  };
  state.study = setupResearch(state);
  const resize = () => {
    const r = canvas.getBoundingClientRect();
    const dpr = Math.min(devicePixelRatio || 1, 2);
    if (
      state.width === r.width &&
      state.height === r.height &&
      state.pixelRatio === dpr
    )
      return;
    state.width = r.width;
    state.height = r.height;
    state.pixelRatio = dpr;
    canvas.width = Math.round(r.width * dpr);
    canvas.height = Math.round(r.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    state.drawn = false;
    paintScene(state, state.time);
  };
  new ResizeObserver(resize).observe(canvas);
  new IntersectionObserver(
    (entries) => {
      state.visible = entries[0].isIntersecting;
    },
    { rootMargin: "60px" },
  ).observe(canvas);
  canvas.addEventListener("pointermove", (event) => {
    const r = canvas.getBoundingClientRect();
    state.targetPointer.x = (event.clientX - r.left) / r.width - 0.5;
    state.targetPointer.y = (event.clientY - r.top) / r.height - 0.5;
  });
  canvas.addEventListener("pointerleave", () => {
    state.targetPointer.x = state.targetPointer.y = 0;
  });
  scenes.push(state);
  resize();
}

const visuals = window.PortfolioVisuals;
function paintScene(state, time) {
  if (!state.width || !state.height) return;
  const ctx = state.ctx;
  ctx.save();
  ctx.clearRect(0, 0, state.width, state.height);
  visuals.background(ctx, state.width, state.height);
  let phase = 0;
  if (state.study) {
    phase =
      state.study.manualStage ??
      Math.floor(((time - state.study.startedAt) % 14400) / 4800);
    if (state.study.phase !== phase) {
      state.study.phase = phase;
      state.study.sync();
    }
  }
  state.draw(ctx, state.width, state.height, time, state.pointer, phase);
  ctx.restore();
  state.time = time;
  state.drawn = true;
}
scene("hero-field", visuals.hero);
scene("optimization-field", visuals.optimization);
scene("signal-field", visuals.signal);
scene("quant-field", visuals.quant);

let previousFrame = 0;
function frame(now) {
  requestAnimationFrame(frame);
  if (document.hidden) return;
  // Also reconcile on a visible frame when a browser defers media change events.
  if (appliedMotionPreference !== reducedMotion.matches) updateMotion();
  const frameInterval = innerWidth < 700 ? 1000 / 30 : 1000 / 60;
  if (now - previousFrame < frameInterval - 1) return;
  const delta = Math.min(60, now - previousFrame);
  previousFrame = now;
  scenes.forEach((s) => {
    if (!s.visible || !s.width || !s.height) return;
    if (s.drawn && (motionPaused || !s.animated)) return;
    s.pointer.x += (s.targetPointer.x - s.pointer.x) * 0.09;
    s.pointer.y += (s.targetPointer.y - s.pointer.y) * 0.09;
    const time = s.animated ? s.time + delta : 0;
    paintScene(s, time);
  });
}
requestAnimationFrame(frame);
document.fonts.ready.then(() =>
  scenes.forEach((s) => {
    paintScene(s, s.time);
  }),
);
