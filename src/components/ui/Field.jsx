export default function Field({ label, children }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[14px] font-normal text-slate-800">
        {label}
      </label>
      {children}
    </div>
  );
}
