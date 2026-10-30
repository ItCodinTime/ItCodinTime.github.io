"use strict";

// User-supplied results and public primary sources. See assets/CONTENT-SOURCES.md.
(() => {
  const profile = "https://www.linkedin.com/in/goutham-ronanki/";
  const board =
    "https://www.pisd.edu/p/~board/plano-isd-headlines-news-4433/post/board-recognition-recap-may-19-2026";
  const uu = "https://www.universityunlocked.in/18-under-18-2026-awards";
  const escape = (value) =>
    String(value).replace(
      /[&<>"']/g,
      (character) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[character],
    );
  const external = (url, text, className = "") =>
    `<a class="${className}" href="${escape(url)}" target="_blank" rel="noreferrer">${escape(text)} <span aria-hidden="true">↗</span></a>`;

  const hackathons = [
    {
      name: "Hook ’Em Hacks",
      context: "UT Austin · PromptShield",
      result: "Best use of MongoDB",
      description:
        "Built PromptShield with a team, earning the MongoDB sponsor prize.",
      link: "https://www.linkedin.com/posts/goutham-ronanki_we-just-beat-anthropics-claude-activity-7452776015174516736-03vW",
      label: "Project recap",
    },
    {
      name: "RAISE Summit",
      context: "International · NVIDIA track",
      result: "Top 5",
      description:
        "Placed in the top five of the NVIDIA track at the international competition.",
    },
    {
      name: "UNity Hacks",
      context: "Hackathon",
      result: "2nd place",
      description: "Second place at UNity Hacks.",
    },
    {
      name: "NextQuake",
      context: "100+ participants",
      result: "2nd place",
      description: "Second place in a field of more than 100 participants.",
    },
  ];
  document.getElementById("hackathon-list").innerHTML = hackathons
    .map(
      (item, index) => `
    <article class="hackathon-entry reveal">
      <span class="hackathon-number mono">0${index + 1}</span>
      <div class="hackathon-copy"><h3>${escape(item.name)}</h3><p class="hackathon-context">${escape(item.context)}</p><p>${escape(item.description)}</p>${item.link ? external(item.link, item.label, "text-action") : ""}</div>
      <p class="hackathon-result">${escape(item.result)}</p>
    </article>`,
    )
    .join("");

  const issuers = [
    {
      name: "University Unlocked",
      logo: "university-unlocked.png",
      className: "uu-issuer",
      detail: "18 UNDER 18 · 2026",
      url: uu,
    },
    {
      name: "1517 Fund",
      logo: "1517.svg",
      className: "fund-issuer",
      detail: "2E RECOGNITION",
      url: "https://www.1517fund.com/",
    },
    {
      name: "EWOR",
      logo: "ewor.svg",
      className: "ewor-issuer",
      detail: "OPERATORS DAY",
      url: "https://www.ewor.com/",
    },
  ];
  document.getElementById("issuer-highlights").innerHTML = issuers
    .map(
      (issuer) => `
    <a class="issuer ${issuer.className}" href="${issuer.url}" target="_blank" rel="noreferrer" aria-label="${issuer.name}: ${issuer.detail}">
      <div class="issuer-logo"><img src="assets/logos/${issuer.logo}" alt="${issuer.name}" loading="lazy" decoding="async"/>${issuer.className === "uu-issuer" ? "<span>University<br>Unlocked</span>" : ""}</div>
      <span class="mono issuer-detail">${issuer.detail}<span aria-hidden="true">↗</span></span>
    </a>`,
    )
    .join("");

  // FIRST uses the season's starting year in its URLs, e.g. 2025 means 2025–26.
  const ftcSeasons = [
    {
      season: "2025–26",
      year: 2025,
      team: 30801,
      awards: [
        ["Design Award", "FiT-North F&T League Tournament", "USTXNFTLT"],
        [
          "Winning Alliance · 1st Team Selected",
          "FiT-North F&T League Tournament",
          "USTXNFTLT",
        ],
      ],
    },
    {
      season: "2024–25",
      year: 2024,
      team: 11419,
      awards: [
        ["Motivate Award", "FiT-North Regional Championship", "USTXFMSQ"],
        [
          "Sapphire Division Finalist Alliance · Captain",
          "FiT-North Regional Championship",
          "USTXFMSQ",
        ],
        [
          "Winning Alliance · 1st Team Selected",
          "FiT-North Semi-Area · Lago Lewisville",
          "USTXFMQ",
        ],
        [
          "Inspire Award · 3rd Place",
          "FiT-North Semi-Area · Lago Lewisville",
          "USTXFMQ",
        ],
        [
          "Finalist Alliance · 1st Team Selected",
          "FiT-North F&T Tournament",
          "USTXNFTLT",
        ],
        ["Think Award · 2nd Place", "FiT-North F&T Tournament", "USTXNFTLT"],
      ],
    },
    {
      season: "2023–24",
      year: 2023,
      team: 11419,
      awards: [
        [
          "UIL 6A State Champions",
          "Texas FTC UIL 6A · Winning Alliance, 2nd Team Selected",
          "USTXBES1",
        ],
        ["Control Award", "FiT-North E&F Tournament", "USTXNEFLT"],
        ["Inspire Award · 3rd Place", "FiT-North E&F Tournament", "USTXNEFLT"],
        [
          "Finalist Alliance · Captain",
          "FiT-North Last Call Qualifier",
          "USTXFMQ",
        ],
        [
          "Innovate Award sponsored by RTX · 3rd Place",
          "FiT-North Last Call Qualifier",
          "USTXFMQ",
        ],
        [
          "Design Award · 3rd Place",
          "FiT-North Last Call Qualifier",
          "USTXFMQ",
        ],
        [
          "Connect Award · 3rd Place",
          "FiT-North Semi-Area · Stage Right",
          "USTXDTQ",
        ],
        [
          "Control Award · 3rd Place",
          "FiT-North Area Championship",
          "USTXFTSQ",
        ],
      ],
    },
  ];
  const roboticsHonors = ftcSeasons.flatMap((season) =>
    season.awards.map(([title, event, code]) => ({
      category: "Robotics",
      title,
      issuer: `FTC ${season.team}`,
      detail: `${season.season} · ${event}`,
      url: `https://ftc-events.firstinspires.org/${season.year}/${code}/awards`,
    })),
  );

  const honors = [
    {
      category: "Research",
      title: "2nd place · Mathematics",
      issuer: "Dallas Regional Science & Engineering Fair",
      detail: "Senior Division · 2026.",
      url: "https://www.pisd.edu/p/~board/plano-isd-headlines-news-4433/post/2026-dallas-regional-science-and-engineering-fair-results",
    },
    {
      category: "Builders",
      title: "18 Under 18",
      issuer: "University Unlocked",
      detail: "2026 Future Global Leaders award recipient.",
      url: uu,
    },
    {
      category: "Builders",
      title: "2E",
      issuer: "1517 Fund",
      detail: "2E recognition.",
      url: "https://www.1517fund.com/",
    },
    {
      category: "Builders",
      title: "Operators Day",
      issuer: "EWOR",
      detail: "Builder community participation.",
      url: "https://www.ewor.com/",
    },
    {
      category: "Builders",
      title: "Best Capstone in AI / Tech",
      issuer: "Whitestone Fellowship",
      detail: "Capstone award · 1 of 500+ · Fall 2025.",
      url: profile,
    },
    {
      category: "Builders",
      title: "1st place pitch",
      issuer: "Legacy Creators",
      detail: "Pitched Koov to first place.",
    },
    {
      category: "Research",
      title: "2nd place",
      issuer: "Texas Junior Academy of Science",
      detail: "Computer Science / Mathematics I · 2026.",
      url: board,
    },
    {
      category: "Research",
      title: "Special Award",
      issuer: "Texas Science & Engineering Fair",
      detail: "Recognition for NEAT optimizer research.",
    },
    {
      category: "Research",
      title: "Honorable Mention",
      issuer: "Dallas Regional Science & Engineering Fair",
      detail: "Engineering Dynamics · Bidirectional thrust research.",
      url: "https://www.linkedin.com/posts/goutham-ronanki_dallas-sciencefair-drsef-activity-7296978257713766401-XvgT",
    },
    {
      category: "Competition",
      title: "4th nationally",
      issuer: "Business Professionals of America",
      detail: "Interview Skills · 4th of 69 · 2026.",
      url: board,
    },
    {
      category: "Competition",
      title: "Texas State Champion",
      issuer: "Business Professionals of America",
      detail: "Interview Skills · 2026.",
      url: "https://www.linkedin.com/posts/goutham-ronanki_locked-nats-employable-activity-7437324088999559168-t7-I",
    },
    {
      category: "Competition",
      title: "Top 64 internationally",
      issuer: "International Public Policy Forum",
      detail: "Global debate competition · 2025.",
    },
    {
      category: "Competition",
      title: "Texas Top 5",
      issuer: "NSD · Public Forum Debate",
      detail: "Public Forum debate ranking.",
    },
    {
      category: "Competition",
      title: "3rd Speaker",
      issuer: "Texas Forensic Association",
      detail: "State championship · Public Forum.",
    },
    ...roboticsHonors,
    {
      category: "Academic",
      title: "National Recognition Award",
      issuer: "College Board",
      detail: "2025.",
      url: profile,
    },
    {
      category: "Academic",
      title: "AP Scholar with Distinction",
      issuer: "College Board",
      detail: "Seven AP scores of 5.",
      url: profile,
    },
    {
      category: "Academic",
      title: "35 composite · 36 Math",
      issuer: "ACT",
      detail: "2026.",
      url: profile,
    },
  ];
  const honorList = document.getElementById("honor-list");
  const honorCount = document.getElementById("honor-count");
  const honorFooter = document.createElement("div");
  honorFooter.className = "honor-footer";
  const honorMore = document.createElement("button");
  honorMore.type = "button";
  honorMore.className = "text-action";
  honorMore.setAttribute("aria-controls", "honor-list");
  const honorStatus = document.createElement("span");
  honorStatus.className = "mono";
  honorFooter.append(honorMore, honorStatus);
  honorList.after(honorFooter);
  const featuredHonors = [
    honors.find((item) => item.title === "18 Under 18"),
    honors.find((item) => item.title === "2E"),
    honors.find((item) => item.issuer === "Texas Junior Academy of Science"),
    honors.find((item) => item.title === "4th nationally"),
    honors.find((item) => item.title === "UIL 6A State Champions"),
    honors.find((item) => item.title === "AP Scholar with Distinction"),
  ];
  let honorCategory = "All";
  let honorsExpanded = false;
  function renderHonors(category) {
    if (honorCategory !== category) honorsExpanded = false;
    honorCategory = category;
    const results = honors.filter(
      (item) => category === "All" || category === item.category,
    );
    const visible =
      category === "All" && !honorsExpanded ? featuredHonors : results;
    honorList.innerHTML = visible
      .map(
        (item) => `
      <article class="honor-entry"><p class="mono honor-category">${escape(item.category)}</p><div><h3>${escape(item.title)}</h3><p>${escape(item.detail)}</p></div><div class="honor-issuer">${item.url ? external(item.url, item.issuer) : escape(item.issuer)}</div></article>`,
      )
      .join("");
    honorCount.textContent = `${visible.length} of ${results.length} honors and recognition entries shown`;
    honorStatus.textContent =
      category === "All" && !honorsExpanded
        ? `${visible.length} SELECTED / ${results.length} TOTAL`
        : `${results.length} ${category === "Robotics" ? "TEAM AWARD RESULTS" : "ENTRIES"}`;
    honorMore.hidden = category !== "All";
    honorMore.setAttribute("aria-expanded", String(honorsExpanded));
    honorMore.innerHTML = honorsExpanded
      ? "Show highlights <span>↑</span>"
      : `View all ${results.length} entries <span>↓</span>`;
  }
  honorMore.addEventListener("click", () => {
    honorsExpanded = !honorsExpanded;
    renderHonors(honorCategory);
    if (!honorsExpanded)
      document
        .getElementById("honor-filters")
        .scrollIntoView({ block: "start" });
  });

  // A team mention must name Goutham in the post itself. Commenting is not a feature.
  const mentions = [
    {
      category: "Team mentions",
      source: "Missing Amps · Official team post",
      title: "The robot, the team, and two league awards",
      description:
        "The F&T tournament recap names Goutham in the team credit and shares the robot’s Design Award and winning-alliance result.",
      url: "https://www.linkedin.com/posts/missingamps_ft-league-tourney-recap-tldr-texas-state-activity-7423567823664504832-KrwB",
    },
    {
      category: "Team mentions",
      source: "Panacea · Team repository",
      title: "The document-ingestion and memory pipeline",
      description:
        "The project’s contribution table credits Goutham with document chunking, vector-store collections, and vulnerability grounding.",
      url: "https://github.com/brian-mwirigi/Panecea",
    },
    {
      category: "Features",
      source: "University Unlocked",
      title: "18 Under 18, Class of 2026",
      description:
        "Named in the official Future Global Leaders award announcement.",
      url: uu,
    },
    {
      category: "Team mentions",
      source: "Koov · Khandaker Wasi",
      title: "Building a live voice teammate",
      description:
        "Credited on the development team behind Koov’s FaceTime demo.",
      url: "https://www.linkedin.com/posts/khandakerwasi_john-ternus-might-sue-us-for-this-we-got-activity-7453102922340528128-TkXk",
    },
    {
      category: "Team mentions",
      source: "SH1P · Krishna Naresh",
      title: "The content team behind 1M views",
      description:
        "Named in the content-team credit as SH1P passed one million UGC views.",
      url: "https://www.linkedin.com/posts/krishna-naresh_im-gonna-be-investing-in-founders-this-summer-activity-7428213608599257088-14XS",
    },
    {
      category: "Team mentions",
      source: "SH1P · Krishna Naresh",
      title: "A new research community partnership",
      description:
        "Team shout-out in the SH1P and NSRI partnership announcement.",
      url: "https://www.linkedin.com/posts/krishna-naresh_sh1ps-crew-just-grew-by-4000-members-activity-7431079244895645696-gKMa",
    },
    {
      category: "Features",
      source: "Plano ISD",
      title: "Recognized by the school board",
      description:
        "District recognition for national BPA and state research results.",
      url: board,
    },
    {
      category: "Team mentions",
      source: "Venn · Joshua Hwang",
      title: "Koov joins the Venn network",
      description:
        "Partnership announcement naming Goutham, reposted on Koov’s company page.",
      url: "https://www.linkedin.com/company/koovai/",
    },
    {
      category: "Team mentions",
      source: "SH1P · Shreyash M.",
      title: "SH1P, cohort one",
      description: "Mentioned alongside the team in a cohort update.",
      url: "https://www.linkedin.com/posts/shreyash-mahanty-657935386_ship-cohort-1-activity-7421175433808932865-RfkY",
    },
    {
      category: "Team mentions",
      source: "SH1P · Shreyash M.",
      title: "Turning attention into execution",
      description:
        "Team mention in a post about SH1P’s work with early-stage founders.",
      url: "https://www.linkedin.com/posts/shreyash-mahanty-657935386_sh1p-shipstudio-attentioneconomy-activity-7424044476312010752-4wBV",
    },
    {
      category: "Team mentions",
      source: "SH1P · Tiyasha Giri",
      title: "Meet the people building SH1P",
      description: "Named among the team in a new colleague’s introduction.",
      url: "https://www.linkedin.com/posts/tiyasha-giri-821055377_sh1p-executionoverideas-earlystagefounders-activity-7428764141810569216-K6j_",
    },
    {
      category: "Features",
      source: "Plano ISD",
      title: "Texas Junior Academy of Science",
      description:
        "Listed in the district’s state research competition results.",
      url: "https://www.pisd.edu/p/~board/plano-isd-headlines-news-4433/post/tjas-science-competition-results",
    },
    {
      category: "Features",
      source: "Plano ISD",
      title: "TFA State Championship",
      description:
        "Public Forum and speaker recognition in the district recap.",
      url: "https://www.pisd.edu/p/~board/plano-isd-headlines-news-4433/post/plano-isd-excels-at-tfa-state-championship",
    },
    {
      category: "Features",
      source: "Plano ISD",
      title: "Chapel Hill / Lindale debate results",
      description:
        "Named with debate partner Albert Luo in tournament coverage.",
      url: "https://www.pisd.edu/p/~board/plano-isd-headlines-news-4433/post/plano-isd-speech-debate-chapel-hilllindale-tournament-results",
    },
    {
      category: "Features",
      source: "504Found",
      title: "The people behind 504Found",
      description:
        "Listed as acting president on the organization’s team page.",
      url: "https://www.504found.org/our-team",
    },
    {
      category: "Features",
      source: "University Unlocked · Puneet Jain",
      title: "Announcing the 2026 award winners",
      description:
        "The organizer’s public announcement of the 18 Under 18 class.",
      url: "https://www.linkedin.com/posts/puneetkj_futuregloballeaders-18under18-studentleadership-activity-7488601199282139138-yMwC",
    },
    {
      category: "My updates",
      source: "Light & Shadow · My writing",
      title: "The Ghost in the Machine",
      description:
        "My essay on authorship in the age of algorithms, published in Light & Shadow.",
      url: "https://cdnc.heyzine.com/files/uploaded/ef81b0fa00348794241117755374e868a50013d2.pdf",
    },
    {
      category: "My updates",
      source: "LinkedIn · My post",
      title: "A closer look at the Koov demo",
      description: "Sharing the live voice agent our team built.",
      preview: {
        image: "koov-post.jpg",
        alt: "Koov joining a FaceTime call in the demo shared on LinkedIn",
        position: "center",
      },
      url: "https://www.linkedin.com/posts/goutham-ronanki_startup-ai-agentic-activity-7455448984589897728-5ByT",
    },
    {
      category: "My updates",
      source: "LinkedIn · My post",
      title: "Building the SH1P community",
      description:
        "An update on the founders, team, and partners behind the program.",
      url: "https://www.linkedin.com/posts/goutham-ronanki_sh1p-building-founder-activity-7426760683041542144-2CfK",
    },
    {
      category: "My updates",
      source: "LinkedIn · My post",
      title: "PromptShield at Hook ’Em Hacks",
      description:
        "The team project that won Best Use of MongoDB at UT Austin.",
      url: "https://www.linkedin.com/posts/goutham-ronanki_we-just-beat-anthropics-claude-activity-7452776015174516736-03vW",
    },
    {
      category: "My updates",
      source: "LinkedIn · My post",
      title: "BPA Texas State Champion",
      description: "A competition update before heading to nationals.",
      preview: {
        image: "bpa-post.jpg",
        alt: "The BPA award ceremony photo shared in the Texas State Champion update",
        position: "50% 38%",
      },
      url: "https://www.linkedin.com/posts/goutham-ronanki_locked-nats-employable-activity-7437324088999559168-t7-I",
    },
    {
      category: "My updates",
      source: "LinkedIn · My post",
      title: "18 Under 18",
      description: "A personal update on the University Unlocked recognition.",
      preview: {
        image: "award-post.jpg",
        alt: "University Unlocked’s 2026 18 Under 18 award announcement",
        position: "50% 0%",
      },
      url: "https://www.linkedin.com/posts/goutham-ronanki_18u18-recognition-award-activity-7488663875819773952-SgYs",
    },
    {
      category: "My updates",
      source: "LinkedIn · My post",
      title: "Bidirectional thrust at DRSEF",
      description:
        "Sharing the rocket research project and its regional science-fair recognition.",
      url: "https://www.linkedin.com/posts/goutham-ronanki_dallas-sciencefair-drsef-activity-7296978257713766401-XvgT",
    },
  ];
  document.getElementById("linkedin-posts").innerHTML = mentions
    .filter((item) => item.preview)
    .map(
      (item) => `
      <article class="social-post">
        <a class="social-post-link" href="${escape(item.url)}" target="_blank" rel="noreferrer">
          <div class="social-post-media"><img src="assets/social/${escape(item.preview.image)}"
            alt="${escape(item.preview.alt)}" style="object-position:${escape(item.preview.position)}"
            width="520" height="320" loading="eager" fetchpriority="low" decoding="sync" /></div>
          <div class="social-post-author"><img src="assets/social/profile.jpg" width="24" height="24"
            alt="" loading="lazy" decoding="async" /><span>Goutham Ronanki</span><span class="social-platform">LinkedIn</span></div>
          <h3>${escape(item.title)}</h3>
          <p>${escape(item.description)}</p>
          <span class="social-post-action">Read post <span aria-hidden="true">↗</span></span>
        </a>
      </article>`,
    )
    .join("");
  let mentionCategory = "All",
    expanded = false;
  const mentionList = document.getElementById("mention-list");
  const more = document.getElementById("mentions-more");
  function renderMentions() {
    const results = mentions.filter(
      (item) => mentionCategory === "All" || mentionCategory === item.category,
    );
    const visible = expanded ? results : results.slice(0, 6);
    mentionList.innerHTML = visible
      .map(
        (item) => `
      <a class="mention-entry" href="${escape(item.url)}" target="_blank" rel="noreferrer">
        <div class="mention-source"><span class="mono">${escape(item.source)}</span><span class="mention-kind">${escape(item.category === "Team mentions" ? "Team mention" : item.category === "Features" ? "Feature" : "My update")}</span></div>
        <div class="mention-copy"><h3>${escape(item.title)}</h3><p>${escape(item.description)}</p></div><span class="mention-arrow" aria-hidden="true">↗</span>
      </a>`,
      )
      .join("");
    more.hidden = results.length <= 6;
    more.setAttribute("aria-expanded", String(expanded));
    more.innerHTML = expanded
      ? "Show fewer posts <span>↑</span>"
      : `Show all ${results.length} links <span>↓</span>`;
    document.getElementById("mention-count").textContent =
      `${visible.length} / ${results.length} LINKS`;
  }
  function filters(id, categories, onChange) {
    const container = document.getElementById(id);
    categories.forEach((category, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = category;
      button.setAttribute("aria-pressed", String(index === 0));
      button.addEventListener("click", () => {
        container
          .querySelectorAll("button")
          .forEach((item) =>
            item.setAttribute("aria-pressed", String(item === button)),
          );
        onChange(category);
      });
      container.append(button);
    });
  }
  filters(
    "honor-filters",
    ["All", "Builders", "Research", "Competition", "Robotics", "Academic"],
    renderHonors,
  );
  document
    .getElementById("robotics-awards-link")
    .addEventListener("click", () => {
      [...document.querySelectorAll("#honor-filters button")]
        .find((button) => button.textContent === "Robotics")
        .click();
    });
  filters(
    "mention-filters",
    ["All", "Features", "Team mentions", "My updates"],
    (category) => {
      mentionCategory = category;
      expanded = false;
      renderMentions();
    },
  );
  more.addEventListener("click", () => {
    expanded = !expanded;
    renderMentions();
    if (!expanded)
      document
        .getElementById("mention-filters")
        .scrollIntoView({ block: "start" });
  });
  renderHonors("All");
  renderMentions();
})();
