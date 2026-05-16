export function SiteBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10"
      aria-hidden
      style={{
        backgroundColor: "var(--background)",
        backgroundImage: "url(/images/pattern.png)",
        backgroundRepeat: "repeat",
        backgroundSize: "220px auto",
        backgroundPosition: "center top",
      }}
    />
  );
}
