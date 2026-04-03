import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import Eyebrow from "@/components/layout/Eyebrow";
import PageContainer from "@/components/layout/PageContainer";
import Section from "@/components/layout/Section";
import { withLocale } from "@/lib/i18n/paths";
import type { Locale } from "@/lib/i18n/config";

import { WhySectionStarsBackground } from "../WhySectionStarsBackground";
import type { HomeCopy } from "./section-types";

import { PackageAddOnsBlock } from "../packages/PackageAddOnsBlock";
import { PackageOfferCard } from "../packages/PackageOfferCard";

const SEQUENTIAL_PHASE_COUNT = 3;

export function PackagesSection({
  home,
  locale,
}: {
  home: HomeCopy;
  locale: Locale;
}) {
  const contactHref = withLocale(locale, "/contact");
  const p = home.packagesSection;
  const sequentialPackages = p.packages.slice(0, SEQUENTIAL_PHASE_COUNT);
  const followingPackages = p.packages.slice(SEQUENTIAL_PHASE_COUNT);

  return (
    <Section spacing="lg" sx={{ position: "relative", overflow: "hidden" }}>
      <WhySectionStarsBackground />
      <PageContainer sx={{ position: "relative", zIndex: 1 }}>
        <Stack spacing={1} sx={{ mb: 4 }}>
          <Eyebrow>{p.eyebrow}</Eyebrow>
          <Typography variant="h4" component="h2" fontWeight={700}>
            {p.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" maxWidth="56ch">
            {p.lead}
          </Typography>
        </Stack>

        <Stack spacing={1} sx={{ mb: 3 }}>
          <Eyebrow sx={{ mb: 0 }}>{p.sequentialPathEyebrow}</Eyebrow>
          <Typography variant="body2" color="text.secondary" maxWidth="62ch">
            {p.sequentialPathLead}
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          {sequentialPackages.map((pkg, index) => (
            <Grid key={pkg.title} size={{ xs: 12, md: 4 }}>
              <PackageOfferCard
                offer={pkg}
                labels={p}
                contactHref={contactHref}
                phaseStep={index + 1}
              />
            </Grid>
          ))}
        </Grid>

        {followingPackages.length ? (
          <Stack spacing={2} sx={{ mt: 4 }}>
            <Eyebrow sx={{ mb: 0 }}>{p.ongoingSectionEyebrow}</Eyebrow>
            <Grid container spacing={3}>
              {followingPackages.map((pkg) => (
                <Grid key={pkg.title} size={{ xs: 12 }}>
                  <PackageOfferCard offer={pkg} labels={p} contactHref={contactHref} />
                </Grid>
              ))}
            </Grid>
          </Stack>
        ) : null}

        <Divider sx={{ my: 5 }} />

        <PackageAddOnsBlock addOns={p.addOns} addOnsTitle={p.addOnsTitle} />
      </PageContainer>
    </Section>
  );
}
