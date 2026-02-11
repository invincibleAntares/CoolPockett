import { useState, useEffect } from "react";
import { loadWizardState, saveWizardState } from "../lib/wizardStorage.js";
import WizardLayout from "../components/wizard/WizardLayout";
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

  useEffect(() => {
    saveWizardState(wizardState);
  }, [wizardState]);

  const step = wizardState.step;
  const next = () => {
    if (step === 4) return;
    setShowErrors((prev) => ({ ...prev, [step]: true }));
    if (stepValid[step]) {
      setWizardState((prev) => ({
        ...prev,
        step: Math.min(4, prev.step + 1),
      }));
    }
  };
  const back = () => {
    setWizardState((prev) => ({
      ...prev,
      step: Math.max(1, prev.step - 1),
    }));
  };

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
