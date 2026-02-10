import { cn } from "../../lib/cn";

export default function Input({ className, ...props }) {
  return (
    <input
      {...props}
      className={cn(
        "h-10 w-full rounded border border-slate-300 px-3 text-[14px] outline-none",
        "focus:border-slate-900",
        className
      )}
    />
  );
}
