"use client";

import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { usePathname, useRouter } from "next/navigation";
import { hasLocale, type Locale } from "@/lib/i18n/config";
import type { Messages } from "@/messages/en";
import { swapLocaleInPathname } from "@/lib/i18n/path-utils";

type Props = {
  locale: Locale;
  copy: Messages["localeSwitcher"];
};

export default function LocaleSwitcher({ locale, copy }: Props) {
  const pathname = usePathname() ?? "/";
  const router = useRouter();

  const onChange = React.useCallback(
    (_: React.MouseEvent<HTMLElement>, value: string | null) => {
      if (!value || value === locale) return;
      if (!hasLocale(value)) return;
      router.push(swapLocaleInPathname(pathname, value as Locale));
    },
    [locale, pathname, router],
  );

  return (
    <ToggleButtonGroup
      value={locale}
      exclusive
      size="small"
      onChange={onChange}
      aria-label={copy.ariaLabel}
      sx={{ ml: { xs: 0, md: 1 }, direction: "ltr" }}
    >
      <ToggleButton
        value="en"
        aria-label={copy.english}
        sx={{ minWidth: 44, minHeight: 44, px: 1.5 }}
      >
        EN
      </ToggleButton>
      <ToggleButton
        value="he"
        aria-label={copy.hebrew}
        sx={{ minWidth: 44, minHeight: 44, px: 1.5 }}
      >
        עב׳
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
