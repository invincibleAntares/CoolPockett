import { cn } from "../../lib/cn";

export default function IconButton({ className, ...props }) {
  return (
    <button
      {...props}
      className={cn(
        "grid h-10 w-10 place-items-center rounded-lg",
        "hover:bg-slate-100 active:bg-slate-200 transition",
        className
      )}
    />
  );
}

