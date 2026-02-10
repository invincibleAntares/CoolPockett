import AccountBasic from "./steps/AccountBasic";
import Button from "./components/ui/Button";

export default function App() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top header bar */}
      <header className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-2.5 text-center">
          <div className="text-[13px] font-medium text-gray-900">
            Account basics
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-6 pt-3 pb-7">
          {/* Progress dots */}
          <div className="flex justify-center gap-1 mb-5">
            <span className="w-1.25 h-1.25 rounded-full bg-black" />
            <span className="w-1.25 h-1.25 rounded-full bg-gray-300" />
            <span className="w-1.25 h-1.25 rounded-full bg-gray-300" />
            <span className="w-1.25 h-1.25 rounded-full bg-gray-300" />
          </div>

          {/* Brand section */}
          <section className="mt-2 text-center">
            <div className="text-[15px] font-semibold text-gray-900">
              CoolPockett
            </div>
            <p className="mt-0.5 text-[12px] text-gray-600">
              Let&apos;s get started
            </p>
          </section>

          {/* Form */}
          <section className="mt-3 max-w-md mx-auto">
            <AccountBasic />
          </section>
        </div>
      </main>

      {/* Bottom footer bar */}
      <footer className="border-t border-gray-200">
        <div className="max-w-md mx-auto px-6 py-3 text-center">
          <p className="text-[12px] text-gray-600 mb-2">Step 1 of 4</p>
          <Button>Next</Button>
        </div>
      </footer>
    </div>
  );
}