export default function Review({ basic = {}, accountType = "individual", country = "US" }) {
  const countryLabel =
    country === "US" ? "United States" : country === "IN" ? "India" : "Other";
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
          <div className="flex justify-between">
            <span>Type:</span>
            <span>Individual</span>
          </div>
          <div className="flex justify-between">
            <span>Goal:</span>
            <span>Spend</span>
          </div>
        </div>
      </section>

      {/* Details card */}
      <section className="rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm">
        <div className="mb-2 font-medium text-slate-900">Details</div>
        <div className="space-y-1 text-[13px] text-slate-800">
          <div className="flex justify-between">
            <span>DOB:</span>
            <span>01/15/1990</span>
          </div>
          <div className="flex justify-between">
            <span>City:</span>
            <span>San Francisco</span>
          </div>
          <div className="flex justify-between">
            <span>State:</span>
            <span>California</span>
          </div>
        </div>
      </section>

      {/* Account preview card */}
      <section className="rounded-md border border-slate-900 bg-white px-4 py-3 text-sm">
        <div className="mb-2 font-medium text-slate-900">
          Account preview
        </div>
        <div className="text-[13px] text-slate-800">
          <div className="mb-2">CoolPockett Spend (Individual)</div>
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

