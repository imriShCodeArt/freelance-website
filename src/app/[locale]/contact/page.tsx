import type { Metadata } from "next";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { notFound } from "next/navigation";
import ContactForm from "@/components/contact";
import Eyebrow from "@/components/layout/Eyebrow";
import PageContainer from "@/components/layout/PageContainer";
import RouterLink from "@/components/layout/RouterLink";
import Section from "@/components/layout/Section";
import {
  CopyEmailField,
  DownloadLinkIcon,
  OpenInNewLinkIcon,
} from "@/components/ui";
import { hasLocale, type Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/get-messages";
import { localeAlternates } from "@/lib/i18n/metadata-helpers";
import { withLocale } from "@/lib/i18n/paths";
import { siteConfig } from "@/lib/site-config";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!hasLocale(raw)) return {};
  const m = await getMessages(raw as Locale);
  return {
    title: m.meta.contactTitle,
    description: m.meta.contactDescription,
    alternates: localeAlternates(raw as Locale, "/contact"),
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!hasLocale(raw)) notFound();
  const locale = raw as Locale;
  const messages = await getMessages(locale);
  const c = messages.contact;
  const experienceHref = withLocale(locale, "/experience");
  const workHref = withLocale(locale, "/projects");

  return (
    <>
      <Section spacing="lg" sx={{ pt: { xs: 4, md: 6 } }}>
        <PageContainer>
          <Eyebrow>{c.eyebrow}</Eyebrow>
          <Typography variant="h2" component="h1" fontWeight={700} gutterBottom>
            {c.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" maxWidth="55ch" sx={{ mb: 3 }}>
            {c.introP1}
          </Typography>
          <Typography variant="body2" color="text.secondary" maxWidth="55ch" sx={{ mb: 4 }}>
            {c.introP2Before}{" "}
            <RouterLink href={experienceHref} fontWeight={600}>
              {c.introExperience}
            </RouterLink>{" "}
            {c.introAnd}{" "}
            <RouterLink href={workHref} fontWeight={600}>
              {c.introWork}
            </RouterLink>
            {c.introP2After}
          </Typography>
          <ContactForm
            locale={locale}
            contact={c}
            emailCopy={{
              copiedToast: messages.common.emailCopiedToast,
              copyFailedToast: messages.common.emailCopyFailedToast,
              ariaLabel: messages.common.copyEmailAriaLabel,
            }}
          />
          <Stack spacing={2} sx={{ mt: 5, maxWidth: 560 }}>
            <Typography component="h2" variant="subtitle1" fontWeight={700}>
              {c.directHeading}
            </Typography>
            <Stack spacing={1}>
              <Typography variant="body2" color="text.secondary">
                <Link
                  href={siteConfig.publicGithubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.75,
                  }}
                >
                  <span>{messages.footer.github}</span>
                  <OpenInNewLinkIcon />
                </Link>
              </Typography>
              {siteConfig.publicLinkedInUrl ? (
                <Typography variant="body2" color="text.secondary">
                  <Link
                    href={siteConfig.publicLinkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 0.75,
                    }}
                  >
                    <span>{messages.footer.linkedin}</span>
                    <OpenInNewLinkIcon />
                  </Link>
                </Typography>
              ) : null}
              <Typography variant="body2" color="text.secondary">
                <Link
                  href={siteConfig.resumePath}
                  download
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.75,
                  }}
                >
                  <span>{messages.footer.resume}</span>
                  <DownloadLinkIcon />
                </Link>
              </Typography>
            </Stack>
            <Typography component="p" variant="subtitle2" color="text.secondary" sx={{ pt: 1 }}>
              {c.preferEmail}
            </Typography>
            <Typography
              id="contact-email-reach"
              component="p"
              variant="body2"
              color="text.secondary"
              sx={{ mb: 1 }}
            >
              {c.reachAt}
            </Typography>
            <CopyEmailField
              email={siteConfig.publicContactEmail}
              copiedToast={messages.common.emailCopiedToast}
              copyFailedToast={messages.common.emailCopyFailedToast}
              ariaLabel={messages.common.copyEmailAriaLabel}
              ariaDescribedBy="contact-email-reach"
            />
          </Stack>
        </PageContainer>
      </Section>
    </>
  );
}
