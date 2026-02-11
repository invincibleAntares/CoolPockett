export default function SubmitConfirmation({ onDone }) {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-12">
      <div className="flex flex-col items-center max-w-sm w-full text-center">
        {/* Tick with glow animation */}
        <div className="submit-confirmation-icon mb-6">
          <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-900">
            <svg
              className="w-10 h-10 text-white relative z-10"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-black mb-2">
          Details submitted
        </h2>
        <p className="text-sm text-slate-600 mb-8">
          We&apos;ve received your information and will be in touch shortly.
        </p>

        <button
          type="button"
          onClick={onDone}
          className="w-full max-w-[200px] h-11 rounded-md bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition"
        >
          Done
        </button>
      </div>
    </div>
  );
}
