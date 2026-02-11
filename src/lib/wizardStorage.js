import { getInitialWizardState, parseWizardState } from "./wizardSchema.js";

export const STORAGE_KEY = "coolpockett_wizard";

/**
 * Load wizard state from localStorage. Parses and validates with schema;
 * returns getInitialWizardState() on missing/invalid data.
 */
export function loadWizardState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw == null) return getInitialWizardState();
    const parsed = JSON.parse(raw);
    return parseWizardState(parsed);
  } catch {
    return getInitialWizardState();
  }
}

/**
 * Persist wizard state to localStorage. Only the model (step, basic, setup, details)
 * is persisted; UI-only fields (stepValid, showErrors) are not stored.
 */
export function saveWizardState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
