export const ORB_PARTICLES = Array.from({ length: 28 }, (_, i) => {
  const size = 3.8 + (i % 5) * 0.9;
  const left = 14 + ((i * 31) % 380);
  const top = 148 + ((i * 19) % 240);
  const dx = -34 + ((i * 13) % 68);
  const duration = 13.6 + (i % 6) * 0.6;
  const delay = (i % 7) * 0.7;
  const colors = [
    "rgba(138,180,248,0.82)",
    "rgba(184,208,251,0.78)",
    "rgba(123,207,159,0.74)",
    "rgba(170,184,203,0.6)",
  ];
  return {
    size,
    left,
    top,
    dx,
    duration,
    delay,
    color: colors[i % colors.length],
  };
});
