import IconButton from "../ui/IconButton";

export default function Header({ title, showBack, onBack }) {
  return (
    <div className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center px-4">
        <div className="w-12">
          {showBack ? (
            <IconButton onClick={onBack} aria-label="Back">
              <span className="text-lg leading-none">←</span>
            </IconButton>
          ) : null}
        </div>

        <div className="flex-1 text-center text-sm font-medium text-slate-900">
          {title}
        </div>

        <div className="w-12" />
      </div>
    </div>
  );
}

