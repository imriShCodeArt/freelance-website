import type { Locale } from "@/lib/i18n/config";

export type CaseStudyKind = "client" | "product" | "plugin" | "personal";

export type CaseStudyLocaleCopy = {
  title: string;
  summary: string;
  role: string;
  highlights: readonly string[];
  recruiterAngle: string;
  overview: string;
  engineeringChallenges: string;
  implementationNotes: string;
  outcomes: string;
};

export type CaseStudy = {
  slug: string;
  kind: CaseStudyKind;
  stack: readonly string[];
  githubUrl?: string;
  liveUrl?: string;
  en: CaseStudyLocaleCopy;
  he: CaseStudyLocaleCopy;
};

export const caseStudies: readonly CaseStudy[] = [
  {
    slug: "sushi-bayit-vegan",
    kind: "client",
    stack: ["WordPress", "React", "PHP", "WooCommerce"] as const,
    liveUrl: "https://sushibayitvegan.co.il/he/home/",
    en: {
      title: "Sushi Bayit Vegan",
      summary:
        "Restaurant website combining WordPress with a React-based store experience.",
      role: "Frontend and WordPress developer.",
      highlights: [
        "Built and integrated interactive React components for the store flow.",
        "Extended site behavior with custom PHP logic inside WordPress.",
        "Improved responsiveness and overall user experience for online ordering.",
      ] as const,
      recruiterAngle:
        "Shows practical frontend work inside a real business site, with React UI layered into a WordPress and commerce-driven environment.",
      overview:
        "This project was a restaurant website built on WordPress with a React-based store experience. The goal was to create a more interactive ordering flow while keeping the site manageable inside an existing WordPress setup.",
      engineeringChallenges:
        "The core challenge was blending React-driven interactivity into a WordPress-based site without making the experience feel disconnected. The store needed to stay responsive, clear, and reliable for customers placing real orders.",
      implementationNotes:
        "I developed and integrated custom React components for the storefront and implemented supporting backend logic in PHP to extend the site's functionality inside WordPress.",
      outcomes:
        "The result was a more interactive and polished restaurant ordering experience. It demonstrates practical React work inside an existing CMS environment, along with WordPress customization and UX improvement.",
    },
    he: {
      title: "Sushi Bayit Vegan",
      summary: "אתר מסעדה המשלב WordPress עם חוויית חנות מבוססת React.",
      role: "מפתח פרונטאנד ו-WordPress.",
      highlights: [
        "פיתחתי ושילבתי רכיבי React אינטראקטיביים עבור חוויית החנות.",
        "הרחבתי את התנהגות האתר באמצעות לוגיקת PHP מותאמת בתוך WordPress.",
        "שיפרתי את הרספונסיביות ואת חוויית המשתמש עבור תהליך ההזמנה.",
      ],
      recruiterAngle:
        "הפרויקט מדגים עבודת פרונטאנד פרקטית בתוך אתר עסקי אמיתי, עם React מעל סביבת WordPress ומסחר.",
      overview:
        "זה היה אתר מסעדה שנבנה על WordPress עם חוויית חנות מבוססת React. המטרה היתה ליצור תהליך הזמנה אינטראקטיבי יותר, תוך שמירה על ניהול נוח בתוך סביבת WordPress קיימת.",
      engineeringChallenges:
        "האתגר המרכזי היה לשלב אינטראקטיביות מבוססת React בתוך אתר WordPress בלי שהחוויה תרגיש מנותקת. החנות היתה צריכה להישאר רספונסיבית, ברורה ואמינה עבור לקוחות שמבצעים הזמנות אמיתיות.",
      implementationNotes:
        "פיתחתי ושילבתי רכיבי React מותאמים עבור חלון החנות, ומימשתי לוגיקה תומכת ב-PHP כדי להרחיב את הפונקציונליות של האתר בתוך WordPress.",
      outcomes:
        "התוצאה היתה חוויית הזמנה אינטראקטיבית ומלוטשת יותר למסעדה. זה מדגים עבודת React פרקטית בתוך סביבת CMS קיימת, יחד עם התאמות WordPress ושיפור UX.",
    },
  },
  {
    slug: "beecomm-integration",
    kind: "plugin",
    stack: ["WordPress", "WooCommerce", "PHP", "SMS"] as const,
    en: {
      title: "BeeComm Integration Plugin",
      summary:
        "Custom WooCommerce integration plugin connecting online restaurant orders to an on-site POS and SMS workflow.",
      role: "Full-stack WordPress plugin developer.",
      highlights: [
        "Integrated WooCommerce orders with an on-site restaurant POS flow.",
        "Implemented real-time SMS notifications for order status updates.",
        "Built load-calculation logic to help optimize kitchen workload and order timing.",
      ] as const,
      recruiterAngle:
        "Relevant for teams that need someone who can bridge WooCommerce, backend logic, and real operational workflows.",
      overview:
        "This project was a custom WordPress plugin for restaurant e-commerce. The goal was to connect WooCommerce orders to the restaurant's operational flow so online purchases could be handled immediately on site.",
      engineeringChallenges:
        "The core challenge was bridging e-commerce behavior with real-world restaurant operations. Orders needed to move reliably from WooCommerce into an environment where timing, printing, and communication affected the kitchen in real time.",
      implementationNotes:
        "I implemented the plugin in PHP on top of WordPress and WooCommerce, added SMS notifications for status updates, and built custom logic around order handling and kitchen load calculation.",
      outcomes:
        "The result was a more operationally useful ordering flow that connected the storefront with on-site fulfillment. It demonstrates custom plugin development, systems thinking, and comfort with integration-heavy work.",
    },
    he: {
      title: "תוסף אינטגרציית BeeComm",
      summary:
        "תוסף WooCommerce מותאם שחיבר הזמנות אונליין של מסעדה ל-POS מקומי ולזרימת SMS.",
      role: "מפתח תוספי WordPress בפול-סטאק.",
      highlights: [
        "חיברתי בין הזמנות WooCommerce לזרימת POS מקומית במסעדה.",
        "הטמעתי הודעות SMS בזמן אמת לעדכוני סטטוס הזמנה.",
        "בניתי לוגיקת חישוב עומס כדי לשפר את תזמון העבודה במטבח.",
      ],
      recruiterAngle:
        "הפרויקט הזה מראה שאני יודע להוביל אינטגרציה מותאמת מקצה לקצה, עם לוגיקה תפעולית אמיתית ולא רק עבודת WordPress שיווקית.",
      overview:
        "זה היה תוסף WordPress מותאם למסחר אלקטרוני במסעדה. המטרה היתה לחבר בין הזמנות מ-WooCommerce לבין הזרימה התפעולית במסעדה כדי שהזמנות אונליין יטופלו מידית בשטח.",
      engineeringChallenges:
        "האתגר המרכזי היה לגשר בין התנהגות של חנות דיגיטלית לבין תפעול אמיתי של מסעדה. ההזמנות היו צריכות לעבור בצורה אמינה מסביבת WooCommerce אל מערכת שבה תזמון, הדפסה ותקשורת משפיעים ישירות על עבודת המטבח.",
      implementationNotes:
        "מימשתי את התוסף ב-PHP על בסיס WordPress ו-WooCommerce, הוספתי הודעות SMS לעדכוני סטטוס, ובניתי לוגיקה מותאמת לטיפול בהזמנות וחישוב עומס למטבח.",
      outcomes:
        "התוצאה היתה זרימת הזמנות שימושית יותר תפעולית, שחיברה בין החנות לבין המימוש בשטח. זה מדגים פיתוח תוספים מותאם, חשיבה מערכתית ונוחות עם עבודת אינטגרציה.",
    },
  },
  {
    slug: "simplee-exam-platform",
    kind: "product",
    stack: ["React", "JavaScript", "GitHub", "Asana"] as const,
    en: {
      title: "Simplee Exam Platform",
      summary:
        "Remote exam and test management application with evaluator and exam-facing interfaces.",
      role: "Frontend contributor on a remote product team.",
      highlights: [
        "Contributed to a remote exam and test management system with monitoring and proctoring capabilities.",
        "Implemented frontend refinements to help move the product toward production readiness.",
        "Collaborated remotely using GitHub and Asana while improving React components across multiple interfaces.",
      ] as const,
      recruiterAngle:
        "Relevant for product teams looking for someone who can contribute inside an existing React codebase and help push features toward release readiness.",
      overview:
        "Simplee was a remote exam and test management application with dedicated product surfaces for evaluation and exam workflows. My work focused on improving the frontend experience as the product moved toward release.",
      engineeringChallenges:
        "The work involved contributing inside an existing product with multiple interfaces, where the challenge was refining components and flows without disrupting a system already heading toward production.",
      implementationNotes:
        "I worked on React components and frontend refinements across both sides of the application, collaborating as part of a remote team and aligning implementation work through GitHub and Asana.",
      outcomes:
        "The result was a more polished and production-ready frontend across key parts of the application. It demonstrates collaboration inside an active product team, component-level improvement, and the ability to contribute effectively without owning the whole system.",
    },
    he: {
      title: "Simplee Exam Platform",
      summary: "אפליקציית ניהול בחינות ומבחנים מרחוק עם ממשקי בוחנים ונבחנים.",
      role: "תורם פרונטאנד בתוך צוות מוצר מרוחק.",
      highlights: [
        "תרמתי למערכת בחינות ומבחנים מרחוק עם יכולות ניטור ו-proctoring.",
        "מימשתי שיפורי פרונטאנד שסייעו לקדם את המוצר למוכנות לפרודקשן.",
        "שיתפתי פעולה מרחוק דרך GitHub ו-Asana תוך שיפור רכיבי React במספר ממשקים.",
      ],
      recruiterAngle:
        "רלוונטי לצוותי מוצר שמחפשים מישהו שיודע להשתלב בבסיס קוד React קיים ולעזור לקדם פיצ'רים למוכנות שחרור.",
      overview:
        "Simplee היתה אפליקציית ניהול בחינות ומבחנים מרחוק עם ממשקים נפרדים לבוחנים ולנבחנים. העבודה שלי התמקדה בשיפור חוויית הפרונטאנד בזמן שהמוצר התקדם לקראת שחרור.",
      engineeringChallenges:
        "העבודה דרשה השתלבות בתוך מוצר קיים עם כמה ממשקים, כשהאתגר היה ללטש רכיבים וזרימות בלי להפריע למערכת שכבר התקדמה לכיוון פרודקשן.",
      implementationNotes:
        "עבדתי על רכיבי React ועל שיפורי פרונטאנד בשני צדי האפליקציה, תוך שיתוף פעולה כחלק מצוות מרוחק ויישור קו דרך GitHub ו-Asana.",
      outcomes:
        "התוצאה היתה פרונטאנד מלוטש ומוכן יותר לפרודקשן בחלקים מרכזיים של האפליקציה. זה מדגים עבודה כחלק מצוות מוצר פעיל, שיפור ברמת רכיב ויכולת לתרום ביעילות גם בלי בעלות על כל המערכת.",
    },
  },
  {
    slug: "woo-b2b-bulk-ordering",
    kind: "plugin",
    stack: ["WordPress", "WooCommerce", "PHP", "JavaScript"] as const,
    githubUrl: undefined,
    liveUrl: undefined,
    en: {
      title: "WooCommerce B2B Bulk Ordering",
      summary:
        "Custom plugin for a guided B2B ordering experience that differs from the standard consumer WooCommerce flow.",
      role: "Full-stack WordPress and WooCommerce plugin developer.",
      highlights: [
        "Designed a guided B2B store flow tailored to business buyers.",
        "Built a dynamic, interactive, responsive UI for product discovery and ordering.",
        "Integrated the solution through shortcode for flexible deployment across pages.",
      ] as const,
      recruiterAngle:
        "Shows that I can own custom commerce UX inside WordPress, not just content-site implementation.",
      overview:
        "This plugin was built for business customers who needed a faster and more guided purchasing experience than the default WooCommerce storefront. The goal was to make product discovery and ordering feel optimized for B2B rather than retail browsing.",
      engineeringChallenges:
        "The main challenge was balancing a custom interactive UI with WordPress and WooCommerce constraints. The flow had to be flexible enough to embed across pages while still feeling cohesive and responsive.",
      implementationNotes:
        "I implemented the solution with PHP, JavaScript, CSS, and HTML, and exposed it through shortcode so the guided experience could be deployed where it was needed inside the site.",
      outcomes:
        "The project created a clearer B2B buying path and a more efficient ordering experience. It highlights frontend/UI work, WordPress plugin architecture, and the ability to adapt e-commerce flows to specific user needs.",
    },
    he: {
      title: "WooCommerce B2B Bulk Ordering",
      summary:
        "תוסף מותאם לחוויית הזמנה מודרכת ל-B2B, שונה מזרימת WooCommerce צרכנית רגילה.",
      role: "מפתח תוספי WordPress ו-WooCommerce בפול-סטאק.",
      highlights: [
        "תכננתי זרימת חנות מודרכת המותאמת לקונים עסקיים.",
        "בניית UI דינמי, אינטראקטיבי ורספונסיבי לגילוי מוצרים והזמנה.",
        "שילוב הפתרון דרך shortcode לפריסה גמישה בעמודים שונים באתר.",
      ],
      recruiterAngle:
        "הפרויקט מדגים חשיבה מוצרית בתוך WordPress: UX מותאם, התנהגות רכישה עסקית ובעלות מלאה על מימוש התוסף.",
      overview:
        "התוסף נבנה עבור לקוחות עסקיים שנזקקו לחוויית רכישה מהירה ומודרכת יותר מהחנות הרגילה של WooCommerce. המטרה היתה להפוך את גילוי המוצרים וההזמנה למותאמים לעולם B2B ולא לגלישה קמעונאית רגילה.",
      engineeringChallenges:
        "האתגר המרכזי היה לאזן בין UI אינטראקטיבי מותאם לבין המגבלות של WordPress ו-WooCommerce. הזרימה היתה צריכה להיות גמישה מספיק כדי להשתלב בעמודים שונים, ועדיין להרגיש אחידה ורספונסיבית.",
      implementationNotes:
        "מימשתי את הפתרון עם PHP, JavaScript, CSS ו-HTML, וחשפתי אותו דרך shortcode כדי שאפשר יהיה לשלב את החוויה המודרכת היכן שצריך באתר.",
      outcomes:
        "הפרויקט יצר נתיב רכישה ברור יותר ללקוחות B2B וחוויית הזמנה יעילה יותר. הוא מדגיש עבודת UI, ארכיטקטורת תוספי WordPress והיכולת להתאים זרימות מסחר אלקטרוני לצרכים ספציפיים.",
    },
  },
  {
    slug: "woocommerce-product-composer",
    kind: "plugin",
    stack: ["WordPress", "WooCommerce", "PHP", "JavaScript"] as const,
    en: {
      title: "WooCommerce Product Composer",
      summary:
        "Custom product-bundling plugin that lets customers build bundles directly on the product page.",
      role: "WordPress and WooCommerce plugin developer focused on product UX.",
      highlights: [
        "Enabled dynamic product bundle creation directly from the product page.",
        "Improved the purchasing flow by streamlining configuration and selection.",
        "Combined backend WooCommerce logic with frontend UX improvements.",
      ] as const,
      recruiterAngle:
        "Relevant for product teams that care about conversion-sensitive UX and custom WooCommerce behavior.",
      overview:
        "This plugin was built to support dynamic product bundle creation inside WooCommerce. Instead of forcing customers through a fragmented process, the goal was to let them configure bundles directly where purchasing decisions were happening.",
      engineeringChallenges:
        "The challenge was shaping a smoother bundle-building experience inside WooCommerce's existing product architecture. The plugin needed to feel native to the storefront while still supporting custom behavior.",
      implementationNotes:
        "I developed the plugin as custom WooCommerce functionality, using WordPress and PHP for the underlying behavior and adding the UI improvements needed to make bundle composition easier to understand and use.",
      outcomes:
        "The result was a cleaner product-selection flow and a stronger user experience around bundling. It demonstrates WooCommerce customization, UX-oriented thinking, and the ability to improve conversion-sensitive flows.",
    },
    he: {
      title: "WooCommerce Product Composer",
      summary: "תוסף מותאם לבניית חבילות מוצרים ישירות מעמוד המוצר.",
      role: "מפתח WordPress ו-WooCommerce עם דגש על UX מוצרי.",
      highlights: [
        "אפשרתי יצירת חבילות מוצרים דינמיות ישירות מעמוד המוצר.",
        "שיפרתי את זרימת הרכישה באמצעות קיצור תהליך הבחירה וההגדרה.",
        "שילבתי בין לוגיקת WooCommerce בצד השרת לבין שיפורי UX בממשק.",
      ],
      recruiterAngle:
        "הפרויקט מראה בעלות מעשית גם על לוגיקת מוצר למסחר אלקטרוני וגם על חוויית משתמש, במיוחד בסביבה מוגבלת כמו WooCommerce.",
      overview:
        "התוסף נבנה כדי לתמוך ביצירת חבילות מוצרים דינמיות בתוך WooCommerce. במקום להכריח משתמשים לעבור תהליך מפורק, המטרה היתה לאפשר להם להרכיב חבילה ישירות בנקודה שבה מתקבלת החלטת הרכישה.",
      engineeringChallenges:
        "האתגר היה לעצב חוויית בניית חבילות חלקה יותר בתוך ארכיטקטורת המוצרים הקיימת של WooCommerce. התוסף היה צריך להרגיש טבעי בתוך החנות, ועדיין לתמוך בהתנהגות מותאמת.",
      implementationNotes:
        "פיתחתי את התוסף כפונקציונליות WooCommerce מותאמת, תוך שימוש ב-WordPress וב-PHP עבור ההתנהגות הבסיסית והוספת שיפורי UI שהפכו את הרכבת החבילה לברורה ונוחה יותר.",
      outcomes:
        "התוצאה היתה זרימת בחירת מוצרים נקייה יותר וחוויית משתמש טובה יותר סביב bundling. זה מדגים התאמה עמוקה ל-WooCommerce, חשיבה מבוססת UX ויכולת לשפר זרימות רגישות להמרה.",
    },
  },
] as const;

export type CaseStudyMeta = {
  slug: string;
  kind: CaseStudyKind;
  stack: readonly string[];
  githubUrl?: string;
  liveUrl?: string;
};

export function listCaseStudyMeta(): CaseStudyMeta[] {
  return caseStudies.map(({ slug, kind, stack, githubUrl, liveUrl }) => ({
    slug,
    kind,
    stack,
    githubUrl,
    liveUrl,
  }));
}

export function getCaseStudyMeta(slug: string): CaseStudyMeta | undefined {
  return listCaseStudyMeta().find((c) => c.slug === slug);
}

export function getCaseStudyLocaleCopy(
  slug: string,
  locale: Locale,
): CaseStudyLocaleCopy | undefined {
  const row = caseStudies.find((c) => c.slug === slug);
  return row ? row[locale] : undefined;
}
