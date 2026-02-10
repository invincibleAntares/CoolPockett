import { useState } from "react";
import WizardLayout from "../components/wizard/WizardLayout";
import AccountBasic from "../steps/AccountBasic";
import AccountSetup from "../steps/AccountSetup";
import Details from "../steps/Details";

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

  const next = () => setStep((s) => Math.min(4, s + 1));
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
            onCountryChange={(value) => setCountry(value || "US")}
          />
        )}
        {step === 2 && (
          <AccountSetup
            onAccountTypeChange={(value) =>
              setAccountType(value || "individual")
            }
          />
        )}
        {step === 3 && (
          <Details accountType={accountType} country={country} />
        )}
      </div>
    </WizardLayout>
  );
}


