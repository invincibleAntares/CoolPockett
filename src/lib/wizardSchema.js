import { z } from "zod";

/** Basic account info: name, email, phone (e.g. 10 digits), country. */
const basicSchema = z.object({
  fullName: z.string(),
  email: z.string(),
  phone: z.string(),
  country: z.string(),
  password: z.string().optional(),
});

/** Account setup: type, goal, volume (number). */
const setupSchema = z.object({
  accountType: z.string(),
  goal: z.string(),
  volume: z.number(),
});

/** KYC/details: individual (dob, address, ids) + optional business fields. */
const detailsSchema = z.object({
  dob: z.string(),
  address1: z.string(),
  city: z.string(),
  postal: z.string(),
  state: z.string(),
  ssn: z.string(),
  pan: z.string(),
  nationalId: z.string(),
  documentFileName: z.string().optional().default(""),
  businessLegalName: z.string().optional().default(""),
  registrationCountry: z.string().optional().default(""),
  role: z.string().optional().default(""),
});

/** Full wizard state: step 1–4, basic, setup, details. */
export const wizardStateSchema = z.object({
  step: z.number().min(1).max(4),
  basic: basicSchema,
  setup: setupSchema,
  details: detailsSchema,
});

/** Default/initial wizard state matching the schema. */
export function getInitialWizardState() {
  return {
    step: 1,
    basic: {
      fullName: "",
      email: "",
      phone: "",
      country: "US",
    },
    setup: {
      accountType: "individual",
      goal: "",
      volume: 0,
    },
    details: {
      dob: "",
      address1: "",
      city: "",
      postal: "",
      state: "",
      ssn: "",
      pan: "",
      nationalId: "",
      documentFileName: "",
      businessLegalName: "",
      registrationCountry: "",
      role: "",
    },
  };
}

export function parseWizardState(plain) {
  const result = wizardStateSchema.safeParse(plain);
  return result.success ? result.data : getInitialWizardState();
}
