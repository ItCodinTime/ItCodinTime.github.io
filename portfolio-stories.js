"use strict";

// Editorial context and genuine artifacts. See assets/CONTENT-SOURCES.md.
(() => {
  const link = (url, label) =>
    `<a href="${url}" target="_blank" rel="noreferrer">${label} <span aria-hidden="true">↗</span></a>`;
  const sources = (items) =>
    `<div class="story-sources"><span class="mono">SOURCES</span>${items.map(([url, label]) => link(url, label)).join("")}</div>`;
  const figure = (file, alt, caption, url, label, kind = "") => {
    const [width, height] = {
      "evidence/koov-live.png": [472, 1024],
      "evidence/collegewiz.jpg": [640, 1385],
      "evidence/missing-amps.jpg": [1152, 1536],
      "evidence/rocketry.jpg": [800, 600],
      "evidence/promptshield.jpg": [800, 181],
      "evidence/sh1p-program.png": [1200, 800],
      "evidence/builddallas-page.png": [785, 600],
      "evidence/venn-community.webp": [1200, 792],
      "evidence/504found-impact.jpg": [1280, 787],
      "evidence/neat-manuscript.png": [1530, 1980],
      "evidence/berkeley-haas.jpg": [800, 478],
      "evidence/federated-architecture.svg": [900, 600],
      "social/bpa-post.jpg": [1152, 1536],
      "social/award-post.jpg": [1022, 1536],
    }[file];
    return `<figure class="artifact ${kind}"><a href="${url}" target="_blank" rel="noreferrer" aria-label="${label}"><img src="assets/${file}" alt="${alt}" loading="lazy" decoding="async" width="${width}" height="${height}" /></a><figcaption>${caption} ${link(url, label)}</figcaption></figure>`;
  };
  const context = (title, text) =>
    `<div class="story-context"><h4>${title}</h4><p>${text}</p></div>`;
  const profile = "https://www.linkedin.com/in/goutham-ronanki/";
  const workStories = [
    {
      title: "The work behind the conversation",
      text: "A useful meeting agent needs more than a transcript. It needs to recognize speakers, remember earlier context, and keep track of who owns the next step. My work connects those pieces into a live response pipeline.",
      sources: [
        ["https://koovai.com", "Product"],
        [
          "https://www.linkedin.com/posts/khandakerwasi_john-ternus-might-sue-us-for-this-we-got-activity-7453102922340528128-TkXk",
          "Team demo & credit",
        ],
      ],
      media: figure(
        "evidence/koov-live.png",
        "Koov’s FaceTime live meeting interface",
        "The live-call interface from Koov’s product website.",
        "https://www.koovai.com",
        "See Koov",
        "phone-artifact",
      ),
    },
    {
      title: "From attention to applications",
      media: figure(
        "evidence/sh1p-program.png",
        "SH1P’s Cohort 1 program website with its compass-themed design",
        "The Cohort 1 program website.",
        "https://www.ship-studio.co/",
        "SH1P program",
        "editorial-artifact",
      ),
      text: "I joined at the beginning to build the content and growth operation. The goal was to turn a founder community’s ideas into a consistent public presence, then help interested builders find their way into the program.",
      sources: [
        ["https://www.ship-studio.co/", "Program"],
        [
          "https://www.linkedin.com/posts/krishna-naresh_im-gonna-be-investing-in-founders-this-summer-activity-7428213608599257088-14XS",
          "Content-team credit",
        ],
      ],
    },
    {
      title: "Making the local network useful",
      media: figure(
        "evidence/builddallas-page.png",
        "Build Dallas’ public company page and its founder-community mission",
        "Build Dallas’ public organization page.",
        "https://www.linkedin.com/company/build-dallas",
        "Company page",
        "editorial-artifact",
      ),
      text: "Builder communities become useful when people actually meet and work together. As a director, my focus is the programming and partnerships that connect North Texas founders, students, and technical teams.",
      sources: [
        [
          "https://www.linkedin.com/company/build-dallas",
          "Organization & events",
        ],
      ],
    },
    {
      title: "A shorter path to collaborators",
      media: figure(
        "evidence/venn-community.webp",
        "A group at a Minorities in STEM community event featured by Venn",
        "A Minorities in STEM community event featured in Venn’s Fall 2026 program gallery.",
        "https://joinvenn.org/#seasons",
        "Venn’s gallery",
        "editorial-artifact",
      ),
      text: "Venn helps student builders find clubs, companies, and people to build with. I helped establish the partner network and now mentor student founders as they move from an idea toward a working project.",
      sources: [
        ["https://joinvenn.org/", "Venn’s program"],
        ["https://www.linkedin.com/company/koovai/", "Koov partnership repost"],
      ],
    },
    {
      title: "Accessibility that reaches the assignment",
      media: figure(
        "evidence/504found-impact.jpg",
        "504Found’s published graphic showing its membership, mentorship, and chapter reach",
        "The organization’s published impact graphic. Organization-wide figures, rather than individual project results.",
        "https://www.504found.org/",
        "504Found",
        "editorial-artifact",
      ),
      text: "A 504 Plan or IEP describes accommodations a student needs. Alongside chapter operations and advocacy, I led development of Alloquly to help translate those needs into adapted assignments.",
      sources: [
        ["https://www.504found.org/our-team", "Team & role"],
        ["https://www.504found.org/", "Organization"],
        [
          "https://www.universityunlocked.in/18-under-18-2026-awards",
          "18 Under 18 recognition",
        ],
      ],
    },
  ];
  document.querySelectorAll(".work-detail").forEach((detail, index) => {
    const story = workStories[index];
    detail
      .querySelector("p")
      .insertAdjacentHTML(
        "afterend",
        `<div class="work-story ${story.media ? "with-artifact" : ""} ${index === 0 ? "has-phone" : ""}">${context(story.title, story.text)}${story.media || ""}</div>`,
      );
    detail.insertAdjacentHTML("beforeend", sources(story.sources));
  });

  const research = [
    {
      title: "Why gradient conflict matters",
      media: figure(
        "evidence/neat-manuscript.png",
        "Title page of Goutham Ronanki’s NEAT research manuscript",
        "The original research manuscript in the NEAT repository.",
        "https://github.com/ItCodinTime/NEAT/blob/main/TJAS%20%283%29%20%281%29.pdf",
        "Open manuscript",
        "research-image manuscript-image",
      ),
      text: "Different training objectives can push model parameters in opposing directions. NEAT detects conflict with an opponent signal and adjusts the update when conflict crosses a threshold. The repository includes a NumPy reference engine, tests, and benchmarks so the update rule can be inspected directly.",
      sources: [
        ["https://github.com/ItCodinTime/NEAT", "Code & benchmarks"],
        ["https://neat-cylu.vercel.app", "Documentation"],
        [
          "https://keras.io/getting_started/ecosystem/#neat",
          "Official Keras listing",
        ],
      ],
      artifact: `<pre class="research-code" aria-label="NEAT usage example"><code><span>from</span> neat_optim <span>import</span> NEAT\n\noptimizer = NEAT(learning_rate=1e-3)</code></pre>`,
    },
    {
      title: "The research question",
      media: figure(
        "evidence/berkeley-haas.jpg",
        "The eastern entrance to UC Berkeley’s Haas School of Business",
        "Haas School of Business, shown for campus context. Photo: Minesweeper, public domain, via Wikimedia Commons.",
        "https://commons.wikimedia.org/wiki/File:Haas_School_of_Business.jpg",
        "Photo source",
        "research-image",
      ),
      text: "How do changes at a company, and events beyond it, affect the way a market behaves? My role involved building analysis frameworks in Python and R, then using them to investigate fintech and trading questions under Soham Jariwala. The workflow connects those observations to analysis and a research question.",
      sources: [
        [profile, "Role & background"],
        ["https://haas.berkeley.edu/", "Institution"],
      ],
    },
    {
      title: "The approach in plain language",
      media: figure(
        "evidence/federated-architecture.svg",
        "Conceptual diagram of local CNN–Transformer training feeding a shared model through model updates",
        "A conceptual guide to the paper’s hybrid model and federated training approach.",
        "https://doi.org/10.5281/zenodo.15849882",
        "Read the paper",
        "research-image",
      ),
      text: "CNNs extract local features, while Transformers model broader relationships. The paper examines combining both in a federated setting, where participating devices train locally and contribute model updates. Smart-city use cases include traffic, air quality, and energy systems.",
      sources: [
        ["https://doi.org/10.5281/zenodo.15849882", "Paper & DOI"],
        [
          "https://api.datacite.org/dois/10.5281/zenodo.15849882",
          "Publication metadata",
        ],
      ],
    },
  ];
  document.querySelectorAll(".research-copy").forEach((copy, index) => {
    const story = research[index];
    copy.insertAdjacentHTML(
      "beforeend",
      `<details class="research-notes"><summary>Approach & sources <span aria-hidden="true">+</span></summary><div>${context(story.title, story.text)}${story.media}${story.artifact || ""}${sources(story.sources)}</div></details>`,
    );
  });

  document
    .querySelector(".rooted-copy")
    .insertAdjacentHTML(
      "beforeend",
      `<p class="project-explanation">The control problem is practical: coordinate pump timing across a vertical growing system so water reaches the plants consistently. I contributed to the Arduino timing algorithm as part of the team.</p>${sources([["https://www.gurujayaprakash.com/projects/project-rtshs", "Founder’s project breakdown"]])}`,
    );
  const engineering = document.querySelectorAll(".engineering-body");
  engineering[0]
    .querySelector(".robotics-seasons")
    .insertAdjacentHTML(
      "beforebegin",
      figure(
        "evidence/missing-amps.jpg",
        "Missing Amps’ competition robot beside its Winning Alliance and Design Award trophies",
        "The team’s robot with its FiT-North F&T League Tournament awards, from the official team recap.",
        "https://www.linkedin.com/posts/missingamps_ft-league-tourney-recap-tldr-texas-state-activity-7423567823664504832-KrwB",
        "Team recap",
        "hardware-artifact",
      ),
    );
  engineering[1].insertAdjacentHTML(
    "beforeend",
    figure(
      "evidence/rocketry.jpg",
      "The bidirectional rocket landing-system research poster and teammates at DRSEF",
      "The rocket project at Dallas Regional Science and Engineering Fair, shared in my research recap.",
      "https://www.linkedin.com/posts/goutham-ronanki_dallas-sciencefair-drsef-activity-7296978257713766401-XvgT",
      "Research recap",
      "hardware-artifact landscape-artifact",
    ),
  );
  engineering[0]
    .querySelector("p")
    .insertAdjacentHTML(
      "afterend",
      `<p>Robotics brings the software into a real feedback loop: write the control logic, test it on a physical machine, and iterate with the team. The season-by-season record below links to FIRST’s official results.</p>`,
    );
  engineering[1].insertAdjacentHTML(
    "beforeend",
    `${context("Software with a physical consequence", "This project brought programming into a landing system with two thrust directions. I led the coding work and helped present the project to aerospace and university representatives.")}${sources([[profile, "Project background"]])}`,
  );
  engineering[2].querySelector("p").textContent =
    "Built and shipped CollegeWiz for iOS using Swift and SwiftUI. The app helps students organize their college search around the factors that matter to them.";
  engineering[2].insertAdjacentHTML(
    "beforeend",
    figure(
      "evidence/collegewiz.jpg",
      "CollegeWiz App Store screenshot showing the college-search interface",
      "An actual screenshot from the published App Store listing.",
      "https://apps.apple.com/us/app/collegewiz/id6739757340",
      "App Store",
      "app-artifact",
    ),
  );

  document
    .querySelector(".hackathon-entry .hackathon-copy")
    .insertAdjacentHTML(
      "beforeend",
      figure(
        "evidence/promptshield.jpg",
        "PromptShield project page and its MongoDB prize badge",
        "Project and prize screenshots shared in my competition recap.",
        "https://www.linkedin.com/posts/goutham-ronanki_we-just-beat-anthropics-claude-activity-7452776015174516736-03vW",
        "Read the recap",
        "wide-artifact",
      ),
    );
  document.querySelector("#hackathon-list").insertAdjacentHTML(
    "afterend",
    `<article class="hackathon-project reveal"><p class="eyebrow mono">TEAM PROJECT / PANACEA</p><h3>The memory behind the demo.</h3><p>For Panacea, a network-security hackathon prototype, I built the document-ingestion pipeline: chunking device manuals, organizing vector-store collections, and grounding retrieval in vulnerability information. The team’s public repository credits each person’s contribution.</p>${sources(
      [
        [
          "https://github.com/brian-mwirigi/Panecea",
          "Team repository & credits",
        ],
        ["https://panecea.vercel.app", "Project demo"],
      ],
    )}</article>`,
  );

  document.querySelector(
    "#honors .section-heading > p:last-child",
  ).textContent =
    "Academic results, research awards, builder selections, and team competition records. Each entry keeps its issuer and context attached.";
  document.querySelector(
    "#mentions .section-heading > p:last-child",
  ).textContent =
    "The work in other people’s words, plus a few updates of my own. Company and team credits are labeled separately from personal posts.";
  const nowLinks = [
    ["https://koovai.com", "Follow Koov"],
    ["https://github.com/ItCodinTime/NEAT", "Current NEAT implementation"],
    ["https://joinvenn.org/", "Explore Venn"],
  ];
  document
    .querySelectorAll(".now-list li > div")
    .forEach((item, index) =>
      item.insertAdjacentHTML("beforeend", sources([nowLinks[index]])),
    );
  document
    .querySelector("#now .section-heading")
    .insertAdjacentHTML(
      "beforeend",
      "<p>Current priorities, still in progress. The next step is to make each system more useful in the hands of real people.</p>",
    );
  document
    .querySelector("#experience")
    .insertAdjacentHTML(
      "beforeend",
      `<p class="section-footnote">Select a logo to explore the role. Research contributions, founding roles, and community work are identified individually. ${link(profile, "Full background")}</p>`,
    );

  document
    .querySelector(".journey")
    .insertAdjacentHTML(
      "beforeend",
      `<div class="journey-gallery">${figure("evidence/rocketry.jpg", "The rocket research project at the Dallas science fair", "Rocket research at DRSEF.", "https://www.linkedin.com/posts/goutham-ronanki_dallas-sciencefair-drsef-activity-7296978257713766401-XvgT", "2025 recap")}${figure("evidence/missing-amps.jpg", "The Missing Amps robot with its league awards", "Missing Amps at the league tournament.", "https://www.linkedin.com/posts/missingamps_ft-league-tourney-recap-tldr-texas-state-activity-7423567823664504832-KrwB", "2026 recap")}${figure("social/award-post.jpg", "University Unlocked’s 18 Under 18 announcement for Goutham", "18 Under 18 recognition.", "https://www.linkedin.com/posts/goutham-ronanki_18u18-recognition-award-activity-7488663875819773952-SgYs", "2026 update")}</div>`,
    );

  function register(root = document) {
    root
      .querySelectorAll(".section-heading, .experience-layout, .footer-top")
      .forEach((item) => item.classList.add("reveal"));
    window.revealPortfolio(root);
  }
  register();
  document.querySelectorAll("details").forEach((item) =>
    item.addEventListener("toggle", () => {
      if (
        !item.open ||
        matchMedia("(prefers-reduced-motion: reduce)").matches ||
        document.body.classList.contains("motion-paused")
      )
        return;
      const body = item.querySelector(
        ".work-detail, .engineering-body, .research-notes > div, .timeline",
      );
      body?.animate(
        [
          { opacity: 0, transform: "translateY(5px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        { duration: 340, easing: "cubic-bezier(.2,.7,.2,1)" },
      );
    }),
  );
})();
