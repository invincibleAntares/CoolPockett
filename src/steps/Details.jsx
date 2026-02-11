import { useState, useEffect } from "react";
import Field from "../components/ui/Field";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";

const defaultDetails = {
  dob: "",
  address1: "",
  city: "",
  postal: "",
  state: "",
  ssn: "",
  pan: "",
  nationalId: "",
  businessLegalName: "",
  registrationCountry: "",
  role: "",
};

export default function Details({
  accountType = "individual",
  country = "US",
  initialDetails,
  onChangeDetails,
  onValidChange,
  showErrors,
}) {
  const typeLabel = accountType === "business" ? "Business" : "Individual";
  const countryLabel =
    country === "US" ? "United States" : country === "IN" ? "India" : "Other";

  const [values, setValues] = useState(() => ({
    ...defaultDetails,
    ...(initialDetails || {}),
  }));
  const [errors, setErrors] = useState({});

  function validate(next = values) {
    const e = {};
    if (accountType === "business") {
      if (!next.businessLegalName?.trim()) e.businessLegalName = "Business legal name is required.";
      if (!next.registrationCountry?.trim()) e.registrationCountry = "Registration country is required.";
      if (!next.role?.trim()) e.role = "Role is required.";
    } else {
      if (!next.dob) e.dob = "Date of birth is required.";
      if (!next.address1?.trim()) e.address1 = "Address is required.";
      if (!next.city?.trim()) e.city = "City is required.";
      if (!next.postal?.trim()) e.postal = "Postal code is required.";
      if (country === "US") {
        if (!next.state?.trim()) e.state = "State is required.";
        if (!/^[0-9]{4}$/.test(next.ssn || "")) e.ssn = "Enter last 4 digits.";
      } else if (country === "IN") {
        if (!next.pan?.trim()) e.pan = "PAN is required.";
      } else {
        if (!next.nationalId?.trim()) e.nationalId = "National ID is required.";
      }
    }
    setErrors(e);
    const ok = Object.keys(e).length === 0;
    if (onValidChange) onValidChange(ok);
    return ok;
  }

  useEffect(() => {
    if (showErrors) {
      validate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showErrors, country, accountType]);

  return (
    <div className="space-y-6">
      {/* Summary row matching input style */}
      <Input
        value={`Based on: ${typeLabel} + ${countryLabel}`}
        disabled
        className="bg-slate-50 text-[13px] text-slate-700"
      />

      {accountType === "business" ? (
        <div className="space-y-4">
          <Field label="Business legal name">
            <Input
              placeholder="Enter business legal name"
              value={values.businessLegalName ?? ""}
              onChange={(e) => {
                const next = { ...values, businessLegalName: e.target.value };
                setValues(next);
                if (onChangeDetails) onChangeDetails(next);
                validate(next);
              }}
            />
            {showErrors && errors.businessLegalName && (
              <p className="mt-1 text-xs text-red-600">{errors.businessLegalName}</p>
            )}
          </Field>
          <Field label="Registration country">
            <Select
              value={values.registrationCountry ?? ""}
              onChange={(e) => {
                const next = { ...values, registrationCountry: e.target.value };
                setValues(next);
                if (onChangeDetails) onChangeDetails(next);
                validate(next);
              }}
            >
              <option value="" disabled>
                Select country
              </option>
              <option value="US">United States</option>
              <option value="IN">India</option>
              <option value="OTHER">Other</option>
            </Select>
            {showErrors && errors.registrationCountry && (
              <p className="mt-1 text-xs text-red-600">{errors.registrationCountry}</p>
            )}
          </Field>
          <Field label="Your role">
            <Select
              value={values.role ?? ""}
              onChange={(e) => {
                const next = { ...values, role: e.target.value };
                setValues(next);
                if (onChangeDetails) onChangeDetails(next);
                validate(next);
              }}
            >
              <option value="" disabled>
                Select role
              </option>
              <option value="Owner">Owner</option>
              <option value="Director">Director</option>
              <option value="Authorized signatory">Authorized signatory</option>
            </Select>
            {showErrors && errors.role && (
              <p className="mt-1 text-xs text-red-600">{errors.role}</p>
            )}
          </Field>
        </div>
      ) : (
        <>
      <Field label="Date of birth">
        <Input
          placeholder="MM/DD/YYYY"
          value={values.dob}
          onChange={(e) => {
            const next = { ...values, dob: e.target.value };
            setValues(next);
            if (onChangeDetails) onChangeDetails(next);
            validate(next);
          }}
        />
        {showErrors && errors.dob && (
          <p className="mt-1 text-xs text-red-600">{errors.dob}</p>
        )}
      </Field>

      <Field label="Address line 1">
        <Input
          placeholder="Enter address"
          value={values.address1}
          onChange={(e) => {
            const next = { ...values, address1: e.target.value };
            setValues(next);
            if (onChangeDetails) onChangeDetails(next);
            validate(next);
          }}
        />
        {showErrors && errors.address1 && (
          <p className="mt-1 text-xs text-red-600">{errors.address1}</p>
        )}
      </Field>

      <Field label="City">
        <Input
          placeholder="Enter city"
          value={values.city}
          onChange={(e) => {
            const next = { ...values, city: e.target.value };
            setValues(next);
            if (onChangeDetails) onChangeDetails(next);
            validate(next);
          }}
        />
        {showErrors && errors.city && (
          <p className="mt-1 text-xs text-red-600">{errors.city}</p>
        )}
      </Field>

      <Field label="Postal code">
        <Input
          placeholder="Enter ZIP"
          value={values.postal}
          onChange={(e) => {
            const next = { ...values, postal: e.target.value };
            setValues(next);
            if (onChangeDetails) onChangeDetails(next);
            validate(next);
          }}
        />
        {showErrors && errors.postal && (
          <p className="mt-1 text-xs text-red-600">{errors.postal}</p>
        )}
      </Field>

      {/* Country-specific block after divider */}
      <div className="border-t border-slate-300 pt-4 space-y-4">
        {country === "US" && (
          <>
            <div className="text-sm font-normal text-slate-900">US-specific</div>

            <Field label="State">
              <Select
                value={values.state}
                onChange={(e) => {
                  const next = { ...values, state: e.target.value };
                  setValues(next);
                  if (onChangeDetails) onChangeDetails(next);
                  validate(next);
                }}
              >
                <option value="" disabled>
                  Select state
                </option>
                <option value="CA">California</option>
                <option value="NY">New York</option>
                <option value="TX">Texas</option>
              </Select>
              {showErrors && errors.state && (
                <p className="mt-1 text-xs text-red-600">{errors.state}</p>
              )}
            </Field>

            <Field label="SSN last 4">
              <Input
                placeholder="••••"
                maxLength={4}
                value={values.ssn}
                onChange={(e) => {
                  const next = { ...values, ssn: e.target.value };
                  setValues(next);
                  if (onChangeDetails) onChangeDetails(next);
                  validate(next);
                }}
              />
              {showErrors && errors.ssn && (
                <p className="mt-1 text-xs text-red-600">{errors.ssn}</p>
              )}
            </Field>
          </>
        )}

        {country === "IN" && (
          <>
            <div className="text-sm font-normal text-slate-900">IN-specific</div>
            <Field label="PAN">
              <Input
                placeholder="ABCDE1234F"
                value={values.pan}
                onChange={(e) => {
                  const next = { ...values, pan: e.target.value };
                  setValues(next);
                  if (onChangeDetails) onChangeDetails(next);
                  validate(next);
                }}
              />
              {showErrors && errors.pan && (
                <p className="mt-1 text-xs text-red-600">{errors.pan}</p>
              )}
            </Field>
          </>
        )}

        {country !== "US" && country !== "IN" && (
          <>
            <div className="text-sm font-normal text-slate-900">
              Country-specific
            </div>
            <Field label="National ID">
              <Input
                placeholder="Enter national ID"
                value={values.nationalId}
                onChange={(e) => {
                  const next = { ...values, nationalId: e.target.value };
                  setValues(next);
                  if (onChangeDetails) onChangeDetails(next);
                  validate(next);
                }}
              />
              {showErrors && errors.nationalId && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.nationalId}
                </p>
              )}
            </Field>
          </>
        )}
      </div>
        </>
      )}
    </div>
  );
}

