import { cn } from "../../lib/cn";

export default function Button({ className, ...props }) {
  return (
    <button
      {...props}
      className={cn(
        "h-11 w-full rounded bg-slate-900 text-[14px] font-medium text-white",
        "hover:bg-slate-800 transition",
        className
      )}
    />
  );
}
