"use client";

import Grid from "@mui/material/Grid";
import {
  createContext,
  useContext,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

import { ExpandableOutlineCard } from "./ExpandableOutlineCard";

type AccordionContextValue = {
  openLabel: string | null;
  setOpenLabel: Dispatch<SetStateAction<string | null>>;
};

const BuildSectionServiceAccordionContext = createContext<AccordionContextValue | null>(null);

export function BuildSectionServiceCardsAccordion({ children }: { children: ReactNode }) {
  const [openLabel, setOpenLabel] = useState<string | null>(null);
  const value = useMemo(() => ({ openLabel, setOpenLabel }), [openLabel]);

  return (
    <BuildSectionServiceAccordionContext.Provider value={value}>
      <Grid container spacing={1.5}>
        {children}
      </Grid>
    </BuildSectionServiceAccordionContext.Provider>
  );
}

export function BuildSectionServiceCardRow({
  label,
  index,
  children,
}: {
  label: string;
  index: number;
  children: ReactNode;
}) {
  const ctx = useContext(BuildSectionServiceAccordionContext);
  if (!ctx) {
    throw new Error("BuildSectionServiceCardRow must be used inside BuildSectionServiceCardsAccordion");
  }
  const { openLabel, setOpenLabel } = ctx;
  const isOpen = openLabel === label;
  const panelId = `home-service-panel-${index}`;
  const triggerId = `home-service-trigger-${index}`;

  const toggleItem = () => {
    setOpenLabel((cur) => (cur === label ? null : label));
  };

  return (
    <Grid size={{ xs: 12 }}>
      <ExpandableOutlineCard
        title={label}
        isOpen={isOpen}
        onToggle={toggleItem}
        triggerId={triggerId}
        panelId={panelId}
        staggerIndex={index}
      >
        {children}
      </ExpandableOutlineCard>
    </Grid>
  );
}
