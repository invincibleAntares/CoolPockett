export default function Header({ title }) {
  return (
    <div className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center px-4">
        <div className="w-12" />

        <div className="flex-1 text-center text-sm font-medium text-slate-900">
          {title}
        </div>

        <div className="w-12" />
      </div>
    </div>
  );
}

