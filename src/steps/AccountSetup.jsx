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

export default function AccountSetup({ onAccountTypeChange }) {
  const [accountType, setAccountType] = useState(""); // individual | business
  const [goal, setGoal] = useState(""); // spend | save | invest
  const [volume, setVolume] = useState(40);

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
            }}
          />
          <SelectCard
            title="Business"
            selected={accountType === "business"}
            onClick={() => {
              setAccountType("business");
              if (onAccountTypeChange) onAccountTypeChange("business");
            }}
          />
        </div>
      </div>

      <div>
        <div className="text-sm font-normal text-slate-900">Product goal</div>
        <div className="mt-3 space-y-2">
          <Chip
            label="Spend"
            selected={goal === "spend"}
            onClick={() => setGoal("spend")}
          />
          <Chip
            label="Save"
            selected={goal === "save"}
            onClick={() => setGoal("save")}
          />
          <Chip
            label="Invest"
            selected={goal === "invest"}
            onClick={() => setGoal("invest")}
          />
        </div>
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

