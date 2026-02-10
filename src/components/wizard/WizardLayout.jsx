import Header from "./Header";
import ProgressDots from "./ProgressDots";
import BottomNav from "./BottomNav";

export default function WizardLayout({
  title,
  step,
  totalSteps = 4,
  showBack,
  onBack,
  onNext,
  nextLabel,
  children,
}) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header title={title} showBack={showBack} onBack={onBack} />

      <main className="flex-1 overflow-y-auto pb-24">
        <div className="mx-auto w-full max-w-5xl px-6 pt-1">
          <ProgressDots current={step} total={totalSteps} />

          <div className="mx-auto w-full max-w-md px-4">{children}</div>
        </div>
      </main>

      <div className="fixed inset-x-0 bottom-0">
        <BottomNav
          step={step}
          totalSteps={totalSteps}
          showBack={showBack}
          onBack={onBack}
          onNext={onNext}
          nextLabel={nextLabel}
        />
      </div>
    </div>
  );
}

