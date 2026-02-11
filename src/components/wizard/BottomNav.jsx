import Button from "../ui/Button";

export default function BottomNav({
  step,
  totalSteps = 4,
  showBack,
  onBack,
  onNext,
  nextLabel = "Next",
}) {
  return (
    <div className="border-t border-slate-200 bg-white">
      <div className="mx-auto w-full max-w-md px-4 py-3">
        <div className="pb-2 text-center text-xs text-slate-600">
          Step {step} of {totalSteps}
        </div>

        <div className="flex gap-3">
          {showBack ? (
            <button
              type="button"
              onClick={onBack}
              className="h-11 flex-1 rounded border-2 border-slate-700 bg-white text-[14px] font-medium text-slate-900 hover:bg-slate-50 transition"
            >
              Back
            </button>
          ) : null}

          <Button
            type="button"
            onClick={onNext}
            className={showBack ? "w-auto flex-1" : "w-full"}
          >
            {nextLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}

