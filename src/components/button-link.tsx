type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  /** opens in a new tab; used for links that leave the site */
  external?: boolean;
  className?: string;
};

const base =
  "inline-flex h-11 items-center gap-2 rounded-[10px] border px-[18px] text-[15px] font-medium transition-[transform,border-color] duration-200 hover:-translate-y-px";

const variants = {
  primary: "border-accent bg-accent text-accent-ink",
  secondary: "border-line bg-surface text-foreground hover:border-accent",
};

// A link styled as a button. It stays an <a>, not a <button>, because it
// navigates somewhere; that keeps it correct for screen readers and middle-clicks.
export function ButtonLink({
  href,
  children,
  variant = "secondary",
  external = false,
  className = "",
}: ButtonLinkProps) {
  return (
    <a
      href={href}
      className={`${base} ${variants[variant]} ${className}`}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
    >
      {children}
    </a>
  );
}
