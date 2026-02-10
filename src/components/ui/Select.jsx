import { cn } from "../../lib/cn";

export default function Select({ className, children, ...props }) {
  return (
    <select
      {...props}
      className={cn(
        "h-10 w-full rounded border border-slate-300 bg-white px-3 text-[14px] outline-none appearance-none",
        "focus:border-slate-900",
        className
      )}
    >
      {children}
    </select>
  );
}
