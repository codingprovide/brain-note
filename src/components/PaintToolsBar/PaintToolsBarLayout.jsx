export default function PaintToolsBarLayout({containerstyle, children }) {
    return (
        <div className={`h-full ${containerstyle}`}>{children}</div>
    );
  }
  