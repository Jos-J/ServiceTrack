export default function TestBuildBadge() {
  const isTestBuild = import.meta.env.VITE_APP_ENV !== "production";

  if (!isTestBuild) return null;

  return (
    <div className="fixed top-3 right-3 z-50">
      <div className="bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded shadow-md tracking-wider">
        TEST BUILD
      </div>
    </div>
  );
}
