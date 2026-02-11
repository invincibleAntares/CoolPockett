# CoolPockett — Account Opening Wizard

Mobile-first, 4-step account opening wizard for a fictional fintech app called **CoolPockett**.

- **Deployed:** [cool-pockett-zeta.vercel.app](https://cool-pockett-zeta.vercel.app/)

---

## What this includes (mapped to the assignment)

- **Exactly 4 steps** with **Next / Back**
- **Progress indicator** (carousel dots)
- **Step-level validation** (errors shown; you can’t move forward until valid)
- **Resume after reload** (refresh brings you back to the same step with data)
- **Mobile-first + responsive** layout

### Step breakdown

- **Step 1 — Account basics**
  - Full name, email, phone, country of residency, password
  - Password show/hide + simple strength indicator
- **Step 2 — Account setup**
  - Account type (Individual | Business)
  - Product goal (Spend | Save | Invest)
  - Touch-friendly cards/chips + monthly volume slider
- **Step 3 — Details (conditional)**
  - **Account-type conditional**
    - Individual: DOB + address + country-driven identity fields
    - Business: business legal name + registration country + role
  - **Country-driven conditional** (Individual path)
    - US → State + SSN last 4
    - IN → PAN
    - Else → National ID
  - **Mock document upload** that shows selected filename (stored as filename only)
- **Step 4 — Review & submit**
  - Review summary of entered data (includes document filename if chosen)
  - “Account preview” widget changes based on Step 2 selections
  - Submit → confirmation screen with an animated glow checkmark

---

## Tech stack

- **React + Vite**
- **Tailwind CSS** for styling
- **Zod** for defining/validating the wizard data model

---

## How to run locally

```bash
npm install
npm run dev
```

---

## Data model + persistence (why Zod + localStorage)

The wizard is modeled as one object (`wizardState`) and is validated/normalized with a single Zod schema:

- **Schema:** `src/lib/wizardSchema.js`
- **Persistence helpers:** `src/lib/wizardStorage.js`

### Why Zod

Zod is used as a single source of truth for the wizard payload:

- It documents the full shape of what we store (step + all form data).
- It safely parses data coming back from `localStorage` so bad/old payloads don’t break the UI.
- It’s small and focused (fits the “light utility” requirement).

### Why localStorage

`localStorage` is used to satisfy **resume-after-reload** with minimal complexity:

- On first render: we load and validate `wizardState`.
- On changes: we persist the model (not UI-only state like `showErrors` / `stepValid`).

Trade-off: localStorage is simple and fast, but it’s not encrypted and shouldn’t be used for sensitive production data. This project treats the wizard as a UI demo.

---

## UI notes / decisions

- The wizard layout is composed from small UI primitives (`Input`, `Field`, `Button`) and wizard scaffolding (`WizardLayout`, `ProgressDots`, `BottomNav`).
- The Select control is implemented as a custom dropdown to keep the menu width consistent with inputs and to match the desired UI.
- The confirmation screen is a dedicated component with a subtle “glow” animation on the checkmark.

---

## Trade-offs

- The custom Select is optimized for consistent visuals and simple mouse/touch use; fully robust keyboard navigation (arrow keys, typeahead) can be improved.
- File upload is intentionally a **mock**: it persists only the **filename**, not the file contents.
- For speed, the project stays in JavaScript (not TypeScript). Zod helps keep the data shape explicit.

---

## One improvement I would do next

Add a **“Save draft + resume link”** feature.

Account opening often gets interrupted. A resume link would let someone start on mobile, then continue later (or on another device) without losing progress.

High level:

- The wizard already has a validated `wizardState`. On “Save draft”, we’d send that to an API.
- The API stores the draft and returns a short token (or one-time link).
- Opening the link restores the wizard to the exact step with the saved data.

---

## If I had more time

- **Smoother step transitions**: add a subtle slide/fade animation between steps (and for the progress dots) to make the wizard feel more polished, while respecting `prefers-reduced-motion`.
- **Accessibility polish**: improve keyboard navigation for the custom Select (arrow keys + typeahead) and wire up `aria-invalid` / `aria-describedby` for error text.
- **Performance tidy-up**: debounce localStorage writes and memoize step components where useful to reduce unnecessary re-renders.


