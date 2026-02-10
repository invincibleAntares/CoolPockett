import { useState } from "react";
import Field from "../components/ui/Field";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";

function passwordStrength(pw) {
  if (!pw) return { label: "", width: "0%" };
  if (pw.length < 6) return { label: "Weak", width: "28%" };
  if (pw.length < 8) return { label: "Okay", width: "50%" };
  if (pw.length < 10) return { label: "Good", width: "75%" };
  return { label: "Strong", width: "100%" };
}

export default function AccountBasic({ onCountryChange }) {
  const [data, setData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    password: "",
    showPassword: false,
  });

  const strength = passwordStrength(data.password);

  return (
    <div className="space-y-3">
      <Field label="Full name">
        <Input
          placeholder="Enter name"
          value={data.fullName}
          onChange={(e) =>
            setData({ ...data, fullName: e.target.value })
          }
        />
      </Field>

      <Field label="Email">
        <Input
          type="email"
          placeholder="Enter email"
          value={data.email}
          onChange={(e) =>
            setData({ ...data, email: e.target.value })
          }
        />
      </Field>

      <Field label="Phone">
        <Input
          type="tel"
          placeholder="Enter phone"
          value={data.phone}
          onChange={(e) =>
            setData({ ...data, phone: e.target.value })
          }
        />
      </Field>

      <Field label="Country of residency">
        <Select
          value={data.country}
          onChange={(e) => {
            const value = e.target.value;
            setData({ ...data, country: value });
            if (onCountryChange) onCountryChange(value);
          }}
        >
          <option value="" disabled hidden>
            Select country
          </option>
          <option value="US">United States</option>
          <option value="IN">India</option>
          <option value="OTHER">Other</option>
        </Select>
      </Field>

      <Field label="Password">
        <div className="relative">
          <Input
            type={data.showPassword ? "text" : "password"}
            placeholder=""
            value={data.password}
            onChange={(e) =>
              setData({ ...data, password: e.target.value })
            }
            className="pr-10"
          />
          <button
            type="button"
            onClick={() =>
              setData({ ...data, showPassword: !data.showPassword })
            }
            className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center"
          >
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              className="text-gray-400"
            >
              {data.showPassword ? (
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
              ) : (
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              )}
              {data.showPassword && <line x1="1" y1="1" x2="23" y2="23" />}
              {!data.showPassword && <circle cx="12" cy="12" r="3" />}
            </svg>
          </button>
        </div>

        {data.password && (
          <div className="mt-1">
            <div className="h-0.5 w-full rounded bg-gray-200">
              <div
                className="h-0.5 rounded bg-gray-600"
                style={{ width: strength.width }}
              />
            </div>
            <div className="mt-1 text-[11px] font-medium text-gray-600">
              {strength.label}
            </div>
          </div>
        )}
      </Field>
    </div>
  );
}
