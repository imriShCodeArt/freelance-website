import type { BuildSectionServiceBlock } from "./buildSectionServiceTypes";
import {
  BuildSectionServiceCardRow,
  BuildSectionServiceCardsAccordion,
} from "./BuildSectionServiceCardsAccordion";
import { ServiceCardExpandedBody } from "./ServiceCardExpandedBody";

export function BuildSectionServiceCards({
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
