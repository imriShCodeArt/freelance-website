import Box, { type BoxProps } from "@mui/material/Box";
import { layoutTokens } from "@/lib/layout-tokens";

type SectionSpacing = keyof typeof layoutTokens.section;

type SectionProps = BoxProps & {
  /** Maps to layoutTokens.section — sm=48px, md=64px, lg=96px vertical padding */
  spacing?: SectionSpacing;
};

export default function Section({
  spacing = "md",
  children,
  sx,
  ...rest
}: SectionProps) {
  const py = layoutTokens.section[spacing];
  return (
    <Box component="section" sx={{ py, ...sx }} {...rest}>
      {children}
    </Box>
  );
}
