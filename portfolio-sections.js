"use strict";

// Independent section disclosures; project disclosures keep their own state.
(() => {
  const storageKey = "portfolio:open-sections:v1";
  const descriptions = {
    experience:
      "The companies, research institutions, and communities I’ve built with. Select a logo to explore my role.",
    work: "Products, growth, and accessibility work. Open a project for my contribution, outcomes, pictures, and sources.",
    research:
      "Optimization, quantitative research, and federated learning. Explore the ideas through interactive diagrams, code, and papers.",
    beyond:
      "Robotics, rocket research, hydroponics, and an iOS app, with project photos and team results.",
    hackathons:
      "Short deadlines, new teams, and working demos. Competition results and the projects behind them.",
    honors:
      "Selected recognition across research, academics, and competition. Open the full record or filter by area.",
    mentions:
      "Company posts, team credits, published features, and personal updates, each linked to its source.",
    now: "What I’m building, researching, and mentoring next, plus the path that brought me here.",
  };
  let saved = {};
  try {
    saved = JSON.parse(sessionStorage.getItem(storageKey) || "{}");
    if (!saved || typeof saved !== "object" || Array.isArray(saved)) saved = {};
  } catch {
    /* Storage is optional. */
  }

  const sections = [...document.querySelectorAll("main > .section")].map(
    (section) => {
      const header = section.querySelector(".section-heading");
      const heading = header.querySelector("h2");
      const description = header.querySelector("p:last-child");
      description.textContent = descriptions[section.id];
      description.id = `${section.id}-description`;
      const content = document.createElement("div");
      content.className = "profile-section-content";
      content.id = `${section.id}-content`;
      [...section.children]
        .filter((child) => child !== header)
        .forEach((child) => content.append(child));
      section.append(content);
      const button = document.createElement("button");
      button.type = "button";
      button.className = "section-toggle";
      button.setAttribute("aria-controls", content.id);
      button.setAttribute("aria-describedby", description.id);
      const title = document.createElement("span");
      title.textContent = heading.textContent.trim();
      const icon = document.createElement("span");
      icon.className = "section-toggle-icon";
      icon.setAttribute("aria-hidden", "true");
      icon.innerHTML =
        '<svg viewBox="0 0 20 20" width="20" height="20"><path d="M4 10h12"/><path class="section-toggle-vertical" d="M10 4v12"/></svg>';
      button.append(title, icon);
      heading.replaceChildren(button);
      const entry = {
        section,
        content,
        button,
        open: saved[section.id] !== false,
      };
      button.addEventListener("click", () => {
        setOpen(entry, !entry.open);
        remember();
      });
      setOpen(entry, entry.open);
      return entry;
    },
  );

  const toolbar = document.createElement("div");
  toolbar.className = "profile-section-toolbar";
  toolbar.setAttribute("role", "group");
  toolbar.setAttribute("aria-label", "Profile section controls");
  const count = document.createElement("span");
  count.className = "mono";
  count.setAttribute("role", "status");
  const actions = document.createElement("div");
  const expand = document.createElement("button");
  const collapse = document.createElement("button");
  expand.type = collapse.type = "button";
  expand.textContent = "Expand all";
  collapse.textContent = "Collapse all";
  actions.append(expand, collapse);
  toolbar.append(count, actions);
  sections[0].section.before(toolbar);
  expand.addEventListener("click", () => setAll(true));
  collapse.addEventListener("click", () => setAll(false));

  function setOpen(entry, open) {
    entry.open = open;
    entry.content.hidden = !open;
    entry.button.setAttribute("aria-expanded", String(open));
    entry.section.classList.toggle("is-collapsed", !open);
  }
  function refresh() {
    const openCount = sections.filter((entry) => entry.open).length;
    count.textContent = `${openCount} / ${sections.length} SECTIONS OPEN`;
    expand.disabled = openCount === sections.length;
    collapse.disabled = openCount === 0;
    requestAnimationFrame(() => updateNavigation());
  }
  function remember() {
    try {
      sessionStorage.setItem(
        storageKey,
        JSON.stringify(
          Object.fromEntries(
            sections.map((entry) => [entry.section.id, entry.open]),
          ),
        ),
      );
    } catch {
      /* Sections still work when storage is unavailable. */
    }
    refresh();
  }
  function setAll(open) {
    sections.forEach((entry) => setOpen(entry, open));
    remember();
  }
  function openTarget(hash, scroll = false) {
    if (!hash || hash === "#") return;
    let target;
    try {
      target = document.getElementById(decodeURIComponent(hash.slice(1)));
    } catch {
      return;
    }
    if (!target) return;
    const entry = sections.find((entry) => entry.section.contains(target));
    if (!entry) return;
    setOpen(entry, true);
    // Deep links can point into a nested project or its source list.
    for (
      let node = target;
      node && node !== entry.section;
      node = node.parentElement
    ) {
      if (node instanceof HTMLDetailsElement) node.open = true;
    }
    remember();
    if (scroll)
      requestAnimationFrame(() =>
        target.scrollIntoView({ block: "start", behavior: "instant" }),
      );
  }
  document.addEventListener("click", (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (
      !link ||
      event.defaultPrevented ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    )
      return;
    openTarget(link.hash);
  });
  addEventListener("hashchange", () => openTarget(location.hash, true));
  openTarget(location.hash, true);
  refresh();
})();
