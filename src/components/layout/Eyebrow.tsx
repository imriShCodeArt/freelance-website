import Typography, { type TypographyProps } from "@mui/material/Typography";

export default function Eyebrow({ children, sx, ...rest }: TypographyProps) {
  return (
    <Typography
      component="p"
      variant="overline"
      sx={{
        color: "secondary.main",
        fontWeight: 600,
        letterSpacing: "0.12em",
        fontSize: "0.7rem",
        mb: 1,
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Typography>
  );
}
