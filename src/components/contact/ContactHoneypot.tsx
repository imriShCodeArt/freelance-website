"use client";

/**
 * Spam trap — hidden from assistive tech and off-screen; must not toggle layout.
 */
export function ContactHoneypot() {
  return (
    <input
      type="text"
      name="website_confirm"
      tabIndex={-1}
      autoComplete="new-password"
      aria-hidden
      style={{
        position: "absolute",
        left: "-9999px",
        width: 1,
        height: 1,
        opacity: 0,
        pointerEvents: "none",
      }}
    />
  );
}
