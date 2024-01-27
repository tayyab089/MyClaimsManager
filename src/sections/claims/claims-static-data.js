export const emptyValues = {
  userId: "fe5daa66-05c0-4e48-9235-95ae370ded9d",
  fileNo: "",
  insured: [],
  lossLocation: "",
  lossType: "",
  lossDate: new Date(),
  insurance: {
    company: "",
    fileNo: "",
    policyNo: "",
    claimNo: "",
    issueDate: new Date(),
    expiryDate: new Date(),
  },
  policyCoverage: [],
  contacts: [],
  docs: [],
  tasks: [],
  forms: [],
};

export const policyCoverageCategories = [
  {
    value: "Property Damage",
    label: "Property Damage",
  },
  {
    value: "Location Limit",
    label: "Location Limit",
  },
];

export const contactCategories = [
  {
    value: "Adjuster",
    label: "Adjuster",
  },
  {
    value: "Managing Agent",
    label: "Managing Agent",
  },
];

export const policyCoverageObject = { category: "", amount: "" };
export const contactsObject = { category: "", contact: { name: "", id: "" } };
export const insuredObject = { name: "", id: "" };
