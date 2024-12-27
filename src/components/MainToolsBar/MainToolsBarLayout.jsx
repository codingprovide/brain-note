export default function MainToolsBarLayout({ children }) {
  return (
    <div
      className={
        "bottom-5 fixed z-50 w-42 h-14 -translate-x-1/2 left-1/2 bg-white border border-white rounded-full shadow-xl"
      }
    >
      <div className="h-full grid max-w-lg grid-cols-4 mx-auto">{children}</div>
    </div>
  );
}
