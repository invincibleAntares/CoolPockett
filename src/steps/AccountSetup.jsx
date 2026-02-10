import { useState } from "react";
import { cn } from "../lib/cn";

function SelectCard({ title, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex h-16 w-full items-center justify-center rounded-md text-sm transition",
        selected
          ? "border-2 border-slate-700 bg-slate-50"
          : "border border-slate-200 bg-slate-50/60 hover:border-slate-700"
      )}
    >
      <span className="text-sm text-slate-900">{title}</span>
    </button>
  );
}

function Chip({ label, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-10 w-full rounded-md px-4 text-sm font-normal transition text-center",
        selected
          ? "border-2 border-slate-700 bg-slate-50 text-slate-900"
          : "border border-slate-200 bg-slate-50/60 text-slate-800 hover:border-slate-700"
      )}
    >
      {label}
    </button>
  );
}

export default function AccountSetup({
  onAccountTypeChange,
  onValidChange,
  showErrors,
}) {
  const [accountType, setAccountType] = useState(""); // individual | business
  const [goal, setGoal] = useState(""); // spend | save | invest
  const [volume, setVolume] = useState(40);
  const [errors, setErrors] = useState({});

  function validate(nextAccountType = accountType, nextGoal = goal) {
    const nextErrors = {};
    if (!nextAccountType) nextErrors.accountType = "Select an account type.";
    if (!nextGoal) nextErrors.goal = "Select a product goal.";
    setErrors(nextErrors);
    const ok = Object.keys(nextErrors).length === 0;
    if (onValidChange) onValidChange(ok);
    return ok;
  }

  return (
    <div className="space-y-8">
      <div>
        <div className="text-sm font-normal text-slate-900">Account type</div>
        <div className="mt-3 flex gap-3">
          <SelectCard
            title="Individual"
            selected={accountType === "individual"}
            onClick={() => {
              setAccountType("individual");
              if (onAccountTypeChange) onAccountTypeChange("individual");
              validate("individual", goal);
            }}
          />
          <SelectCard
            title="Business"
            selected={accountType === "business"}
            onClick={() => {
              setAccountType("business");
              if (onAccountTypeChange) onAccountTypeChange("business");
              validate("business", goal);
            }}
          />
        </div>
        {showErrors && errors.accountType && (
          <p className="mt-1 text-xs text-red-600">{errors.accountType}</p>
        )}
      </div>

      <div>
        <div className="text-sm font-normal text-slate-900">Product goal</div>
        <div className="mt-3 space-y-2">
          <Chip
            label="Spend"
            selected={goal === "spend"}
            onClick={() => {
              setGoal("spend");
              validate(accountType, "spend");
            }}
          />
          <Chip
            label="Save"
            selected={goal === "save"}
            onClick={() => {
              setGoal("save");
              validate(accountType, "save");
            }}
          />
          <Chip
            label="Invest"
            selected={goal === "invest"}
            onClick={() => {
              setGoal("invest");
              validate(accountType, "invest");
            }}
          />
        </div>
        {showErrors && errors.goal && (
          <p className="mt-1 text-xs text-red-600">{errors.goal}</p>
        )}
      </div>

      <div>
        <div className="text-sm font-normal text-slate-900">Monthly volume</div>

        <div className="mt-3">
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-full"
          />
          <div className="mt-2 flex justify-between text-xs text-slate-500">
            <span>Low</span>
            <span>High</span>
          </div>
        </div>
      </div>
    </div>
  );
}

