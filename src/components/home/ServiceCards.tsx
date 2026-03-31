import type { Messages } from "@/lib/i18n/get-messages";
import {
  BuildSectionServiceCardRow,
  BuildSectionServiceCardsAccordion,
} from "./ServiceCardsAccordion";
import { ServiceCardExpandedBody } from "./ServiceCardExpandedBody";

type BuildSectionServiceBlock =
  | Messages["services"]["primary"][number]
  | Messages["services"]["supporting"][number];

export default function ServiceCards({
  scenarios,
  serviceDetails,
  buildLead,
  buildCta,
  servicesHref,
}: {
  scenarios: string[];
  serviceDetails: BuildSectionServiceBlock[];
  buildLead: string;
  buildCta: string;
  servicesHref: string;
}) {
  return (
    <BuildSectionServiceCardsAccordion>
      {scenarios.map((label, index) => {
        const detail = serviceDetails.find((item) => item.title === label);
        return (
          <BuildSectionServiceCardRow key={label} label={label} index={index}>
            <ServiceCardExpandedBody
              detail={detail}
              buildLead={buildLead}
              buildCta={buildCta}
              servicesHref={servicesHref}
              label={label}
            />
          </BuildSectionServiceCardRow>
        );
      })}
    </BuildSectionServiceCardsAccordion>
  );
}
