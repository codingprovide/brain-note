export default function MainToolsBarLayout({containerstyle, col, children }) {
  return (
    <div className={`h-full ${col} ${containerstyle}`}>{children}</div>
);
  }