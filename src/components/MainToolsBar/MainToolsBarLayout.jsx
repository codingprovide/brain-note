export default function MainToolsBarLayout({toolsbarstyle, children }) {
    return (
      <div className={`bottom-5 ${toolsbarstyle}`}>
        <div className="h-full grid max-w-lg grid-cols-4 mx-auto">{children}</div>
      </div>
    );
  }
  