export default function PaintToolsBarLayout({dropdowncontainerstyle, children }) {
    return (
        <div className={`${dropdowncontainerstyle} rounded-b-lg}`}>{children}</div>
    );
  }