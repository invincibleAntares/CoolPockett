import { useState } from "react";
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
  const [step, setStep] = useState(1);
  const [country, setCountry] = useState("US");
  const [accountType, setAccountType] = useState("individual");
  const [goal, setGoal] = useState("");
  const [basic, setBasic] = useState({
    fullName: "",
    email: "",
    phone: "",
  });
  const [details, setDetails] = useState({
    dob: "",
    address1: "",
    city: "",
    postal: "",
    state: "",
    ssn: "",
    pan: "",
    nationalId: "",
  });
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

  const next = () => {
    if (step === 4) {
      setStep(4);
      return;
    }

    setShowErrors((prev) => ({ ...prev, [step]: true }));

    if (stepValid[step]) {
      setStep((s) => Math.min(4, s + 1));
    }
  };
  const back = () => setStep((s) => Math.max(1, s - 1));

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
            onChange={(next) => {
              setBasic({
                fullName: next.fullName,
                email: next.email,
                phone: next.phone,
              });
              setCountry(next.country || "US");
            }}
            onValidChange={(isValid) =>
              setStepValid((prev) => ({ ...prev, 1: isValid }))
            }
            showErrors={showErrors[1]}
          />
        )}
        {step === 2 && (
          <AccountSetup
            initialAccountType={accountType}
            initialGoal={goal}
            onAccountTypeChange={(value) =>
              setAccountType(value || "individual")
            }
            onGoalChange={setGoal}
            onValidChange={(isValid) =>
              setStepValid((prev) => ({ ...prev, 2: isValid }))
            }
            showErrors={showErrors[2]}
          />
        )}
        {step === 3 && (
          <Details
            accountType={accountType}
            country={country}
            initialDetails={details}
            onChangeDetails={setDetails}
            onValidChange={(isValid) =>
              setStepValid((prev) => ({ ...prev, 3: isValid }))
            }
            showErrors={showErrors[3]}
          />
        )}
        {step === 4 && (
          <Review
            basic={basic}
            accountType={accountType}
            goal={goal}
            country={country}
            details={details}
          />
        )}
      </div>
    </WizardLayout>
  );
}


