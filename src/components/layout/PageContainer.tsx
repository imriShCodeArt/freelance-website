import Container, { type ContainerProps } from "@mui/material/Container";
import { layoutTokens } from "@/lib/layout-tokens";

type PageContainerProps = ContainerProps & {
  /** Narrow column for long-form reading */
  variant?: "default" | "prose";
};

export default function PageContainer({
  variant = "default",
  children,
  sx,
  ...rest
}: PageContainerProps) {
  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth:
          variant === "prose"
            ? layoutTokens.proseMaxCh
            : layoutTokens.contentMaxPx,
        mx: "auto",
        px: { xs: 2, sm: 3 },
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Container>
  );
}
