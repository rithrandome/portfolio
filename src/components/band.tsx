// A full-width cream band behind a section. Every other section on the home page
// sits in one, so long pages read as distinct blocks. The band is translucent, so
// the faint page dots still show through.
export function Band({
  children,
  last = false,
}: {
  children: React.ReactNode;
  last?: boolean;
}) {
  // the last band skips its bottom edge, since the footer draws its own top border
  return (
    <div className={`border-t border-line bg-band ${last ? "" : "border-b"}`}>
      {children}
    </div>
  );
}
