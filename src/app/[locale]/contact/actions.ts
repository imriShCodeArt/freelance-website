"use server";

/**
 * Email delivery (optional): set RESEND_API_KEY, CONTACT_TO_EMAIL, and optionally
 * CONTACT_FROM_EMAIL (defaults to onboarding@resend.dev for Resend trials).
 * If unset, the form shows a mailto fallback using NEXT_PUBLIC_CONTACT_EMAIL in site-config.
 */
import { Resend } from "resend";
import { defaultLocale, hasLocale, type Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/get-messages";
export type ContactFieldErrors = {
  name?: string;
  email?: string;
  message?: string;
};

export type ContactState = {
  submitted?: boolean;
  message?: string;
  error?: string;
  notConfigured?: boolean;
  fieldErrors?: ContactFieldErrors;
};

function logPrefix() {
  return "[contact-form]";
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Permissive check: one @, non-empty local and domain, dotted hostname (multi-part TLDs OK). */
function isProbablyValidEmail(email: string): boolean {
  if (email.length > 254) return false;
  const parts = email.split("@");
  if (parts.length !== 2) return false;
  const [local, domain] = parts;
  if (!local || !domain) return false;
  if (!domain.includes(".")) return false;
  const labels = domain.split(".");
  if (labels.some((label) => label.length === 0)) return false;
  const tld = labels[labels.length - 1];
  return tld != null && tld.length >= 2;
}

function localeFromForm(formData: FormData): Locale {
  const raw = String(formData.get("locale") ?? "");
  return hasLocale(raw) ? raw : defaultLocale;
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const locale = localeFromForm(formData);
  const t = getMessages(locale).contact;

  const trap = formData.get("website_confirm");
  if (trap != null && String(trap).trim() !== "") {
    console.warn(
      `${logPrefix()} spam trap filled`,
      JSON.stringify({
        value: String(trap).trim(),
        env: process.env.VERCEL_ENV ?? "local",
      }),
    );
    return { submitted: true, message: t.actionThanksSpam };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const timeline = String(formData.get("timeline") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return {
      fieldErrors: {
        ...(!name ? { name: t.fieldRequired } : {}),
        ...(!email ? { email: t.fieldRequired } : {}),
        ...(!message ? { message: t.fieldRequired } : {}),
      },
    };
  }

  if (!isProbablyValidEmail(email)) {
    return { fieldErrors: { email: t.errorEmail } };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

  if (!apiKey || !to) {
    console.error(
      `${logPrefix()} email not configured`,
      JSON.stringify({
        hasApiKey: Boolean(apiKey),
        hasTo: Boolean(to),
        from,
        env: process.env.VERCEL_ENV ?? "local",
      }),
    );
    return {
      notConfigured: true,
      error: t.errorNotConfigured,
    };
  }

  const resend = new Resend(apiKey);
  const { data, error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: email,
    subject: `Inquiry from ${name}`,
    html: `<p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
${company ? `<p><strong>Company:</strong> ${escapeHtml(company)}</p>` : ""}
${timeline ? `<p><strong>Timeline / budget:</strong> ${escapeHtml(timeline)}</p>` : ""}
<p><strong>Message:</strong></p><p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>`,
    text: `From: ${name} <${email}>
${company ? `Company: ${company}\n` : ""}${timeline ? `Timeline / budget: ${timeline}\n` : ""}
Message:
${message}`,
  });

  if (error) {
    console.error(
      `${logPrefix()} resend send failed`,
      JSON.stringify({
        name,
        email,
        to,
        from,
        error,
        env: process.env.VERCEL_ENV ?? "local",
      }),
    );
    return {
      error: t.errorSendFailed,
    };
  }

  console.info(
    `${logPrefix()} resend send succeeded`,
    JSON.stringify({
      id: data?.id ?? null,
      to,
      from,
      replyTo: email,
      env: process.env.VERCEL_ENV ?? "local",
    }),
  );

  return {
    submitted: true,
    message: t.successMessage,
  };
}
