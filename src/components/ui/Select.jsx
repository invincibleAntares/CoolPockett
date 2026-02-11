import { useState, useRef, useEffect } from "react";
import { Children } from "react";
import { cn } from "../../lib/cn";

const Chevron = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export default function Select({ className, children, value, onChange, ...props }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  const options = [];
  let placeholder = "";
  Children.toArray(children || []).forEach((child) => {
    if (child?.type === "option") {
      const optValue = child.props.value;
      const label = typeof child.props.children === "string" ? child.props.children : (child.props.children?.toString?.() ?? "");
      const isHidden = child.props.hidden === true;
      const isDisabled = child.props.disabled === true;
      if (isHidden && optValue === "") placeholder = label;
      if (!isHidden) options.push({ value: optValue, label, disabled: isDisabled });
    }
  });

  const selectedOption = options.find((o) => String(o.value) === String(value));
  const displayLabel = selectedOption ? selectedOption.label : placeholder;

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [open]);

  const handleSelect = (optValue) => {
    if (onChange) {
      onChange({ target: { value: optValue } });
    }
    setOpen(false);
  };

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "h-10 w-full rounded border border-slate-300 bg-white pl-3 pr-10 text-left text-[14px] outline-none",
          "focus:border-slate-900",
          !displayLabel && "text-slate-500"
        )}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={props["aria-label"]}
      >
        <span className="block truncate">{displayLabel || placeholder}</span>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
          <Chevron />
        </span>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute left-0 right-0 top-full z-10 mt-1 max-h-48 overflow-auto rounded border border-slate-300 bg-white py-1 shadow-lg"
          style={{ width: "100%" }}
        >
          {options.map((opt) => (
            <li
              key={opt.value}
              role="option"
              aria-selected={String(opt.value) === String(value)}
              onClick={() => !opt.disabled && handleSelect(opt.value)}
              className={cn(
                "cursor-pointer px-3 py-2 text-[14px] text-slate-800",
                String(opt.value) === String(value) && "bg-slate-100 font-medium",
                !opt.disabled && "hover:bg-slate-50",
                opt.disabled && "cursor-not-allowed text-slate-400"
              )}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
