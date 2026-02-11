function capitalize(s) {
  if (!s) return "";
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

const STATE_LABELS = { CA: "California", NY: "New York", TX: "Texas" };

export default function Review({
  basic = {},
  accountType = "individual",
  goal = "",
  country = "US",
  details = {},
}) {
  const countryLabel =
    country === "US" ? "United States" : country === "IN" ? "India" : "Other";
  const typeLabel = capitalize(accountType);
  const goalLabel = capitalize(goal);

  return (
    <div className="space-y-4">
      {/* Account basics card */}
      <section className="rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm">
        <div className="mb-2 font-medium text-slate-900">Account basics</div>
        <div className="space-y-1 text-[13px] text-slate-800">
          {basic.fullName && (
            <div className="flex justify-between">
              <span>Name:</span>
              <span>{basic.fullName}</span>
            </div>
          )}
          {basic.email && (
            <div className="flex justify-between">
              <span>Email:</span>
              <span>{basic.email}</span>
            </div>
          )}
          {basic.phone && (
            <div className="flex justify-between">
              <span>Phone:</span>
              <span>{basic.phone}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Country:</span>
            <span>{countryLabel}</span>
          </div>
        </div>
      </section>

      {/* Account setup card */}
      <section className="rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm">
        <div className="mb-2 font-medium text-slate-900">Account setup</div>
        <div className="space-y-1 text-[13px] text-slate-800">
          {typeLabel && (
            <div className="flex justify-between">
              <span>Type:</span>
              <span>{typeLabel}</span>
            </div>
          )}
          {goalLabel && (
            <div className="flex justify-between">
              <span>Goal:</span>
              <span>{goalLabel}</span>
            </div>
          )}
        </div>
      </section>

      {/* Details card */}
      <section className="rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm">
        <div className="mb-2 font-medium text-slate-900">Details</div>
        <div className="space-y-1 text-[13px] text-slate-800">
          {details.dob && (
            <div className="flex justify-between">
              <span>DOB:</span>
              <span>{details.dob}</span>
            </div>
          )}
          {details.address1 && (
            <div className="flex justify-between">
              <span>Address:</span>
              <span>{details.address1}</span>
            </div>
          )}
          {details.city && (
            <div className="flex justify-between">
              <span>City:</span>
              <span>{details.city}</span>
            </div>
          )}
          {details.postal && (
            <div className="flex justify-between">
              <span>Postal code:</span>
              <span>{details.postal}</span>
            </div>
          )}
          {country === "US" && details.state && (
            <div className="flex justify-between">
              <span>State:</span>
              <span>{STATE_LABELS[details.state] || details.state}</span>
            </div>
          )}
          {country === "US" && details.ssn && (
            <div className="flex justify-between">
              <span>SSN last 4:</span>
              <span>{details.ssn}</span>
            </div>
          )}
          {country === "IN" && details.pan && (
            <div className="flex justify-between">
              <span>PAN:</span>
              <span>{details.pan}</span>
            </div>
          )}
          {country !== "US" && country !== "IN" && details.nationalId && (
            <div className="flex justify-between">
              <span>National ID:</span>
              <span>{details.nationalId}</span>
            </div>
          )}
        </div>
      </section>

      {/* Account preview card */}
      <section className="rounded-md border border-slate-900 bg-white px-4 py-3 text-sm">
        <div className="mb-2 font-medium text-slate-900">
          Account preview
        </div>
        <div className="text-[13px] text-slate-800">
          <div className="mb-2">
            CoolPockett {goalLabel || "Spend"} ({typeLabel || "Individual"})
          </div>
          <ul className="list-disc space-y-1 pl-5">
            <li>Instant spending notifications</li>
            <li>Budgeting tools included</li>
            <li>No monthly fees</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

