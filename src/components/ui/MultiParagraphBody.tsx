import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { TypographyProps } from "@mui/material/Typography";

/**
 * Split Sanity `text` / plain CMS copy on blank lines into separate paragraphs.
 * Each segment still uses `white-space: pre-line` so single line breaks inside a paragraph render.
 */
export function splitCmsBodyParagraphs(body: string): string[] {
  const normalized = body.replace(/\r\n/g, "\n").trim();
  if (!normalized) return [];
  return normalized
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export type MultiParagraphBodyProps = {
  body: string;
  variant?: TypographyProps["variant"];
  color?: TypographyProps["color"];
  /** MUI Stack spacing between paragraphs */
  spacing?: number;
};

export function MultiParagraphBody({
  body,
  variant = "body2",
  color = "text.secondary",
  spacing = 2,
}: MultiParagraphBodyProps) {
  const parts = splitCmsBodyParagraphs(body);
  if (parts.length === 0) return null;
  return (
    <Stack component="div" spacing={spacing}>
      {parts.map((paragraph, index) => (
        <Typography
          key={`cms-body-${index}`}
          component="p"
          variant={variant}
          color={color}
          sx={{ m: 0, whiteSpace: "pre-line" }}
        >
          {paragraph}
        </Typography>
      ))}
    </Stack>
  );
}
