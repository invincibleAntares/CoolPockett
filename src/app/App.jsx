import { useState, useEffect } from "react";
import { loadWizardState, saveWizardState } from "../lib/wizardStorage.js";
import { getInitialWizardState } from "../lib/wizardSchema.js";
import WizardLayout from "../components/wizard/WizardLayout";
import SubmitConfirmation from "../components/SubmitConfirmation";
import AccountBasic from "../steps/AccountBasic";
import AccountSetup from "../steps/AccountSetup";
import Details from "../steps/Details";
import Review from "../steps/Review";

const TITLES = {
  1: "Account basics",
  2: "Account setup",
  3: "Details",
  4: "Review",
};

export default function App() {
  const [wizardState, setWizardState] = useState(loadWizardState);
  const [stepValid, setStepValid] = useState({
    1: false,
    2: false,
    3: false,
  });
  const [showErrors, setShowErrors] = useState({
    1: false,
    2: false,
    3: false,
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    saveWizardState(wizardState);
  }, [wizardState]);

  const step = Number(wizardState.step) || 1;
  const next = () => {
    if (step >= 4) {
      setSubmitted(true);
      return;
    }
    setShowErrors((prev) => ({ ...prev, [step]: true }));
    if (stepValid[step]) {
      setWizardState((prev) => ({
        ...prev,
        step: Math.min(4, prev.step + 1),
      }));
    }
  };
  const handleDone = () => {
    setSubmitted(false);
    const initial = getInitialWizardState();
    setWizardState(initial);
    saveWizardState(initial);
    setShowErrors({ 1: false, 2: false, 3: false });
    setStepValid({ 1: false, 2: false, 3: false });
  };
  const back = () => {
    setWizardState((prev) => ({
      ...prev,
      step: Math.max(1, prev.step - 1),
    }));
  };

  if (submitted) {
    return <SubmitConfirmation onDone={handleDone} />;
  }

  return (
    <WizardLayout
      title={TITLES[step]}
      step={step}
      totalSteps={4}
      showBack={step !== 1}
      onBack={back}
      onNext={next}
      nextLabel={step === 4 ? "Submit" : "Next"}
    >
      {step === 1 && (
        <div className="text-center">
          <h1 className="text-xl font-semibold">CoolPockett</h1>
          <p className="mt-1 text-sm text-slate-600">Let&apos;s get started</p>
        </div>
      )}

      <div className={step === 1 ? "mt-8" : ""}>
        {step === 1 && (
          <AccountBasic
            initialBasic={wizardState.basic}
            onChange={(nextBasic) => {
              setWizardState((prev) => ({
                ...prev,
                basic: {
                  fullName: nextBasic.fullName ?? prev.basic.fullName,
                  email: nextBasic.email ?? prev.basic.email,
                  phone: nextBasic.phone ?? prev.basic.phone,
                  country: nextBasic.country ?? prev.basic.country,
                  password: nextBasic.password,
                },
              }));
            }}
            onValidChange={(isValid) =>
              setStepValid((prev) => ({ ...prev, 1: isValid }))
            }
            showErrors={showErrors[1]}
          />
        )}
        {step === 2 && (
          <AccountSetup
            initialAccountType={wizardState.setup.accountType}
            initialGoal={wizardState.setup.goal}
            initialVolume={wizardState.setup.volume}
            onAccountTypeChange={(value) => {
              setWizardState((prev) => ({
                ...prev,
                setup: {
                  ...prev.setup,
                  accountType: value ?? prev.setup.accountType,
                },
              }));
            }}
            onGoalChange={(value) => {
              setWizardState((prev) => ({
                ...prev,
                setup: { ...prev.setup, goal: value ?? prev.setup.goal },
              }));
            }}
            onVolumeChange={(value) => {
              setWizardState((prev) => ({
                ...prev,
                setup: { ...prev.setup, volume: value },
              }));
            }}
            onValidChange={(isValid) =>
              setStepValid((prev) => ({ ...prev, 2: isValid }))
            }
            showErrors={showErrors[2]}
          />
        )}
        {step === 3 && (
          <Details
            accountType={wizardState.setup.accountType}
            country={wizardState.basic.country}
            initialDetails={wizardState.details}
            onChangeDetails={(nextDetails) => {
              setWizardState((prev) => ({
                ...prev,
                details: nextDetails,
              }));
            }}
            onValidChange={(isValid) =>
              setStepValid((prev) => ({ ...prev, 3: isValid }))
            }
            showErrors={showErrors[3]}
          />
        )}
        {step === 4 && (
          <Review
            basic={wizardState.basic}
            accountType={wizardState.setup.accountType}
            goal={wizardState.setup.goal}
            country={wizardState.basic.country}
            details={wizardState.details}
          />
        )}
      </div>
    </WizardLayout>
  );
}
