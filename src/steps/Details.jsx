import Field from "../components/ui/Field";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";

export default function Details({ accountType = "individual", country = "US" }) {
  const typeLabel = accountType === "business" ? "Business" : "Individual";
  const countryLabel =
    country === "US" ? "United States" : country === "IN" ? "India" : "Other";

  return (
    <div className="space-y-6">
      {/* Summary row matching input style */}
      <Input
        value={`Based on: ${typeLabel} + ${countryLabel}`}
        disabled
        className="bg-slate-50 text-[13px] text-slate-700"
      />

      <Field label="Date of birth">
        <Input placeholder="MM/DD/YYYY" />
      </Field>

      <Field label="Address line 1">
        <Input placeholder="Enter address" />
      </Field>

      <Field label="City">
        <Input placeholder="Enter city" />
      </Field>

      <Field label="Postal code">
        <Input placeholder="Enter ZIP" />
      </Field>

      {/* Country-specific block after divider */}
      <div className="border-t border-slate-300 pt-4 space-y-4">
        {country === "US" && (
          <>
            <div className="text-sm font-normal text-slate-900">US-specific</div>

            <Field label="State">
              <Select defaultValue="">
                <option value="" disabled>
                  Select state
                </option>
                <option value="CA">California</option>
                <option value="NY">New York</option>
                <option value="TX">Texas</option>
              </Select>
            </Field>

            <Field label="SSN last 4">
              <Input placeholder="••••" maxLength={4} />
            </Field>
          </>
        )}

        {country === "IN" && (
          <>
            <div className="text-sm font-normal text-slate-900">IN-specific</div>
            <Field label="PAN">
              <Input placeholder="ABCDE1234F" />
            </Field>
          </>
        )}

        {country !== "US" && country !== "IN" && (
          <>
            <div className="text-sm font-normal text-slate-900">
              Country-specific
            </div>
            <Field label="National ID">
              <Input placeholder="Enter national ID" />
            </Field>
          </>
        )}
      </div>
    </div>
  );
}

