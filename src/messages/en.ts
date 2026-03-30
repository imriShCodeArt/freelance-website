export const en = {
  common: {
    skipToMain: "Skip to main content",
    builtWith: (name: string, year: number) =>
      `© ${year} ${name}. Built with Next.js and Material UI.`,
    projectFloor:
      "Projects typically start from a modest four-figure engagement, depending on scope.",
    typicalStackLead: "Typical stack today:",
    typicalStackTrail:
      "I choose tools that match your maintenance and hiring reality, not trends.",
    stepPrefix: "Step",
  },
  nav: {
    home: "Home",
    services: "Services",
    work: "Work",
    about: "About",
    contact: "Contact",
  },
  header: {
    getInTouch: "Get in touch",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  localeSwitcher: {
    ariaLabel: "Language",
    english: "English",
    hebrew: "עברית",
  },
  footer: {
    tagline:
      "Custom web apps, ongoing support, and technical work focused on clarity and long-term maintainability.",
    navAriaLabel: "Footer navigation",
  },
  caseStudyKind: {
    client: "Client project",
    concept: "Concept",
    "self-initiated": "Self-initiated",
  },
  caseStudies: {
    "operations-dashboard": {
      title: "Operations dashboard for a service business",
      outcome:
        "Less time reconciling spreadsheets; one place to see daily operations.",
      problem:
        "The team tracked jobs, staff, and billing across spreadsheets and messages. Nothing stayed in sync, and leadership had no single view of the week.",
      after:
        "They moved day-to-day coordination into one web app. Managers see status at a glance, and updates no longer live in three different files.",
      approach:
        "I mapped the real workflow first, then built a focused dashboard and role-based views. Performance and clarity mattered more than feature count.",
    },
    "client-portal-booking": {
      title: "Client portal with booking handoff",
      outcome: "Fewer back-and-forth emails; clients self-serve the right next step.",
      problem:
        "Clients emailed to book, change, or upload documents. Staff spent hours on thread-chasing instead of delivery work.",
      after:
        "Clients log in, book or request changes, and upload files in one flow. Staff get structured requests instead of inbox archaeology.",
      approach:
        "I kept the portal small and dependable: auth, booking rules, and notifications tied to how the business already worked.",
    },
    "workflow-approvals": {
      title: "Internal workflow and approvals",
      outcome: "Clear ownership and audit trail for requests that used to vanish in chat.",
      problem:
        "Approvals and internal requests lived in chat tools. Things got lost, and nobody could say what was approved when.",
      after:
        "Requests have states, assignees, and history. The team can trace decisions without scrolling through old channels.",
      approach:
        "I modeled the minimum viable states and built notifications around real handoffs—not a generic BPM monster.",
    },
  },
  meta: {
    defaultTitle: "Your external development team for custom web apps",
    defaultDescription:
      "I help small and medium businesses build and improve reliable, high-performance web applications with clean code, strong technical foundations, and ongoing development support.",
    servicesTitle: "Services",
    servicesDescription:
      "Custom web app development, ongoing support, performance, accessibility, and technical SEO—explained in plain language for growing businesses.",
    workTitle: "Work",
    workDescription:
      "Case studies focused on business problems and outcomes: dashboards, portals, workflows, and internal tools.",
    aboutTitle: "About",
    aboutDescription:
      "Independent freelance web developer focused on reliable custom web applications and long-term support for small and medium businesses.",
    contactTitle: "Contact",
    contactDescription:
      "Get in touch about custom web apps, dashboards, portals, and ongoing development support.",
  },
  home: {
    heroEyebrow: "Custom web apps for growing businesses",
    heroTitle: "Your external development team for custom web apps",
    heroSubtitle:
      "I help small and medium businesses build and improve reliable, high-performance web applications with clean code, strong technical foundations, and ongoing development support.",
    ctaContact: "Get in touch",
    ctaServices: "View services",
    realUseEyebrow: "Built for real business use",
    realUseTitle: "Technical work you can stake operations on",
    realUseP1:
      "I focus on products that people use every day: internal tools, portals, and workflows—not experiments that fall apart under load.",
    cardTypicalEngagements: "Typical engagements",
    cardBestFit: "Best fit",
    cardBestFitBody:
      "Businesses that need tailored software, care about maintainability, and want a developer who stays involved after launch.",
    midParagraph:
      "Whether you need a custom internal tool, client portal, dashboard, or ongoing product development, I work as a dependable technical partner focused on quality, speed, and long-term maintainability.",
    buildEyebrow: "What I build",
    buildTitle: "Services snapshot",
    buildLead:
      "I solve concrete operational needs—usually with web-based software your team and customers actually use.",
    buildCta: "How I can help",
    whyEyebrow: "Why work with me",
    whyTitle: "Quality that shows up after launch",
    whyLead:
      "I build with performance, accessibility, and maintainability in mind from the start, so your product is easier to use, easier to grow, and easier to support over time.",
    processEyebrow: "How we work",
    processTitle: "A straightforward process",
    workEyebrow: "Selected work",
    workTitle: "Case studies",
    workLead:
      "Each example starts with a business problem and ends with what changed—not a feature laundry list.",
    workViewAll: "View all work",
    fitEyebrow: "Fit",
    fitTitle: "Who I work best with",
    fitHonestyEyebrow: "Honesty",
    notFitTitle: "When I'm not the right fit",
    ctaBandTitle: "Ready to talk about your project?",
    ctaBandBody:
      "Tell me what you're trying to fix or build. I usually respond within one business day, and we'll start with a short intro call—no commitment required.",
    ctaBandButton: "Contact me",
    scenarios: [
      "Internal dashboards / admin panels",
      "Client portals",
      "Booking / workflow systems",
      "Business automation tools",
      "SaaS MVPs for small teams",
    ],
    differentiators: [
      {
        title: "Reliable delivery",
        body: "I build carefully, communicate clearly, and keep commitments realistic.",
      },
      {
        title: "High-quality codebase",
        body: "Clean, maintainable code that is easier to scale and improve over time.",
      },
      {
        title: "Performance-focused",
        body: "Fast, responsive products that feel professional and reduce friction.",
      },
      {
        title: "Accessibility-conscious",
        body: "Experiences that work better for more people and meet modern expectations.",
      },
      {
        title: "SEO-aware foundations",
        body: "Technical structure that supports discoverability and long-term growth.",
      },
      {
        title: "Long-term support",
        body: "Not just launch—I stay available as your product and business evolve.",
      },
    ],
    processSteps: [
      {
        step: "1",
        title: "Understand the problem",
        body: "We align on workflow, users, and what success looks like before writing code.",
      },
      {
        step: "2",
        title: "Design a focused build",
        body: "I propose a scope that solves the core need first, with room to grow.",
      },
      {
        step: "3",
        title: "Ship and iterate",
        body: "You get working software, clear handoff, and a path for ongoing improvements.",
      },
    ],
    stack: ["TypeScript", "React", "Next.js", "Node", "PostgreSQL", "REST & APIs"],
    fitBullets: [
      "Teams that need custom software tied to real workflows",
      "Leaders who value maintainability and honest timelines",
      "Businesses that want ongoing technical support after launch",
    ],
    notFitBullets: [
      "Pure brochure sites with no product or workflow behind them",
      "Fixed-date promises without room to understand the problem first",
      "Projects where long-term quality is explicitly not a priority",
    ],
  },
  services: {
    eyebrow: "Services",
    title: "What I do—and what it solves",
    introP1:
      "I work with businesses that need custom portals, dashboards, management systems, internal tools, booking or workflow systems, and client-facing platforms. If that sounds like you, the blocks below spell out how I help.",
    introBeforeWork: "See how this shows up in practice on the",
    introWorkLink: "work",
    introMiddle: "page, or jump straight to",
    introContactLink: "contact",
    introAfter: ".",
    primaryLabel: "Primary",
    primaryHeading: "Core engagements",
    supportingLabel: "Supporting",
    supportingHeading: "Targeted improvements",
    cardWhen: "When you need it",
    cardWhatYouGet: "What you get",
    cardExamples: "Example use cases",
    fitTitle: "Who I work best with",
    notFitTitle: "When I'm not the right fit",
    investmentTitle: "Investment expectations",
    investmentCta: "Discuss your project",
    investmentAfterQuote:
      "Final quotes depend on scope, integrations, and timeline after a short discovery conversation.",
    primary: [
      {
        title: "Custom web app development",
        what: "Tailored web software for your workflow, customers, or internal operations.",
        when:
          "Off-the-shelf tools do not match how you work, or you need one system instead of five spreadsheets.",
        get: "Discovery, scoped build, clear handoff, and documentation oriented toward whoever maintains the product next.",
        examples: [
          "Internal dashboards and admin panels",
          "Client portals",
          "Booking and workflow systems",
          "Client-facing platforms",
        ],
      },
      {
        title: "Ongoing development and technical support",
        what: "A steady partner to improve, maintain, and extend what you already run in production.",
        when:
          "You have a live product or internal tool and need reliable changes without hiring full-time engineers yet.",
        get: "Prioritized backlog work, pragmatic estimates, and communication that respects your operations.",
        examples: [
          "Feature additions and refactors",
          "Production fixes and monitoring-minded updates",
          "Business automation tied to your stack",
        ],
      },
    ],
    supporting: [
      {
        title: "Performance optimization",
        what: "Faster loads, smoother interactions, and fewer rough edges that frustrate users.",
        when: "Pages feel slow, metrics slipped after growth, or you are preparing for more traffic.",
        get: "Profiling-informed changes with before/after notes you can understand—not mystery tweaks.",
        examples: [
          "Core Web Vitals improvements",
          "Bundle and rendering hygiene",
          "Caching and API efficiency",
        ],
      },
      {
        title: "Accessibility improvements",
        what: "More people can complete tasks in your product, aligned with common expectations and standards.",
        when: "You have audit findings, legal risk, or a goal to serve a broader audience well.",
        get: "Prioritized fixes, semantic structure, and keyboard/screen-reader sensible flows.",
        examples: ["Forms and focus order", "Contrast and typography", "Component-level fixes"],
      },
      {
        title: "Technical SEO implementation",
        what: "Solid technical foundations so search engines can crawl, index, and understand your site.",
        when: "You are investing in content or local presence and need the platform to cooperate.",
        get: "Metadata, sitemaps, structured data where appropriate, and performance-aware templates.",
        examples: [
          "Metadata and sharing cards",
          "Clean URLs and internal linking patterns",
          "Renderable critical content",
        ],
      },
    ],
    fitBullets: [
      "You need custom software—not a generic template—for real operations or customers.",
      "You value maintainability and want a partner who thinks past the first release.",
      "You want ongoing support without building an in-house engineering team yet.",
    ],
    notFitBullets: [
      "You only need a static marketing site with no product logic behind it.",
      "You need a fixed ship date before the problem is understood.",
      "Long-term code quality is not a priority for this engagement.",
    ],
  },
  work: {
    eyebrow: "Case studies",
    title: "Selected work",
    intro:
      "Each project below states the business problem and what changed afterward. Some entries are labeled concept or self-initiated where that is honest positioning.",
    caseStudiesListHeading: "Case studies",
    cta: "Talk about your project",
    cardProblemLabel: "What was the business problem?",
    cardOutcomeLabel: "What changed",
  },
  workDetail: {
    back: "All work",
    eyebrowPrefix: "Case study ·",
    problemHeading: "What was the business problem?",
    afterHeading: "What changed after the solution?",
    approachHeading: "How I approached it",
    cta: "Discuss something similar",
  },
  about: {
    eyebrow: "About",
    title: "How I work—and why teams trust me with important systems",
    p1: "I am an independent freelance web developer. I focus on building reliable, high-performance custom web applications for small and medium businesses that need ongoing technical support without hiring an in-house team.",
    p2: "I act as an external development partner: I help you move beyond generic tools with software that fits how you actually operate—then I stay available as you grow.",
    styleTitle: "Working style",
    styleP1:
      "I am straightforward in estimates, careful about scope, and consistent in communication. You should always know what is shipping next and why. I prefer small, verifiable steps over big-bang surprises.",
    styleP2:
      "Technically, I care about performance, accessibility, and maintainability from day one—because that is what keeps products pleasant to use and affordable to evolve.",
    expectTitle: "What you can expect",
    expectP1:
      "Clear written updates, honest tradeoffs when requirements bump into time or budget, and code structured so the next developer (or future you) can reason about it. If I am not the right fit for a request, I will say so early.",
    ctaWork: "See work",
    ctaContact: "Get in touch",
  },
  contact: {
    eyebrow: "Contact",
    title: "Tell me about your project",
    introP1:
      "Share what you are trying to improve or build. I read every message and reply personally—usually within one business day. We start with a short intro call so I can understand fit and scope; no commitment required.",
    introP2Before: "For context on how I work, see",
    introServices: "services",
    introAnd: "and",
    introWork: "work",
    introP2After: ".",
    preferEmail: "Prefer email?",
    reachAt: "Reach me at",
    formName: "Name",
    formEmail: "Email",
    formCompany: "Company (optional)",
    formTimeline: "Timeline or budget (optional)",
    formTimelinePlaceholder: "e.g. Q2 launch, rough budget range",
    formMessage: "What are you trying to build or fix?",
    sendButton: "Send message",
    sending: "Sending…",
    emailPrefix: "Email:",
    actionThanksSpam: "Thanks — I will be in touch soon.",
    fieldRequired: "This field is required.",
    errorPleaseReview: "Please review the highlighted fields.",
    errorRequired: "Please fill in your name, email, and message.",
    errorEmail: "Please enter a valid email address.",
    errorNotConfigured:
      "Email delivery is not configured for this site yet. Use the address below to reach me directly.",
    errorSendFailed:
      "Something went wrong sending your message. Please try again or email me directly.",
    successMessage:
      "Thanks — I received your message. I usually reply within one business day.",
  },
  notFound: {
    kicker: "404",
    title: "Page not found",
    body: "That URL does not exist or has moved. Head home or contact me if you were expecting something specific.",
    home: "Back to home",
    contact: "Contact",
  },
};

export type Messages = typeof en;
