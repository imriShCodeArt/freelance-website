"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n/config";
import type { Messages } from "@/messages/en";
import type { NavItem } from "@/lib/navigation";
import { layoutTokens } from "@/lib/layout-tokens";
import { withLocale } from "@/lib/i18n/paths";
import LocaleSwitcher from "./LocaleSwitcher";

const drawerWidth = 280;

function MenuIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M18.3 5.71L12 12.01l6.3 6.29-1.42 1.42-6.29-6.3-6.29 6.3-1.42-1.42L10.59 12 4.3 5.71 5.71 4.3 12 10.59l6.29-6.29z"
      />
    </svg>
  );
}

type Props = {
  locale: Locale;
  brandName: string;
  nav: NavItem[];
  header: Messages["header"];
  localeSwitcher: Messages["localeSwitcher"];
};

export default function SiteHeader({
  locale,
  brandName,
  nav,
  header,
  localeSwitcher,
}: Props) {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  const closeDrawer = () => setOpen(false);

  const homeHref = withLocale(locale, "/");
  const contactHref = withLocale(locale, "/contact");

  const drawer = (
    <Box onClick={closeDrawer} sx={{ textAlign: "center", pt: 2, pb: 2 }}>
      <IconButton
        onClick={closeDrawer}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          minWidth: 44,
          minHeight: 44,
        }}
        aria-label={header.closeMenu}
      >
        <CloseIcon />
      </IconButton>
      <Typography variant="h6" sx={{ my: 2, fontWeight: 700 }}>
        {brandName}
      </Typography>
      <Divider />
      <List>
        {nav.map((item) => (
          <ListItem key={item.href} disablePadding>
            <ListItemButton
              component={NextLink}
              href={item.href}
              selected={pathname === item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              sx={{ textAlign: "center" }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        component="header"
        position="sticky"
        color="inherit"
        elevation={0}
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          backgroundColor: "rgba(13, 17, 23, 0.9)",
          backdropFilter: "blur(10px)",
          "@media (prefers-reduced-transparency: reduce)": {
            backgroundColor: "rgba(13, 17, 23, 0.98)",
            backdropFilter: "none",
          },
        }}
      >
        <Toolbar
          sx={{
            maxWidth: layoutTokens.contentMaxPx,
            width: "100%",
            mx: "auto",
            px: { xs: 2, sm: 3 },
            minHeight: { xs: 56, sm: 64 },
          }}
        >
          <Box
            component={NextLink}
            href={homeHref}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1.25,
              flexGrow: { xs: 1, md: 0 },
              mr: { md: 4 },
              color: "text.primary",
              textDecoration: "none",
            }}
          >
            <Image
              src="/Logo.png"
              alt={`${brandName} logo`}
              width={28}
              height={28}
              priority
            />
            <Typography
              variant="h6"
              component="span"
              sx={{ fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1 }}
            >
              {brandName}
            </Typography>
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 0.5, flexGrow: 1 }}>
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Button
                  key={item.href}
                  component={NextLink}
                  href={item.href}
                  color="inherit"
                  aria-current={active ? "page" : undefined}
                  sx={{
                    fontWeight: active ? 700 : 500,
                    color: active ? "primary.main" : "text.secondary",
                  }}
                >
                  {item.label}
                </Button>
              );
            })}
          </Box>
          <LocaleSwitcher locale={locale} copy={localeSwitcher} />
          <Button
            component={NextLink}
            href={contactHref}
            variant="contained"
            color="primary"
            size="medium"
            sx={{
              display: { xs: "none", sm: "inline-flex" },
              ml: { xs: 0, md: 1 },
            }}
          >
            {header.getInTouch}
          </Button>
          <IconButton
            color="inherit"
            aria-label={header.openMenu}
            edge="end"
            onClick={() => setOpen(true)}
            sx={{
              display: { xs: "inline-flex", md: "none" },
              ml: 1,
              minWidth: 44,
              minHeight: 44,
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        open={open}
        onClose={closeDrawer}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}
