export default function ProgressDots({ current = 1, total = 4 }) {
  return (
    <div className="flex items-center justify-center gap-1 mb-3 pt-3">
      {Array.from({ length: total }).map((_, i) => {
        const step = i + 1;
        const active = step === current;
        return (
          <span
            key={step}
            className={[
              "h-1.5 w-1.5 rounded-full",
              active ? "bg-slate-900" : "bg-slate-300",
            ].join(" ")}
          />
        );
      })}
    </div>
  );
}

