export const emptyValues = {
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
  docs: ["", "", ""],
  tasks: ["", "", ""],
  forms: ["", "", ""],
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

export const policyCoverageObject = { category: "Property Damage", amount: "" };
export const contactsObject = { category: "Adjuster", contact: { name: "", id: "" } };
export const insuredObject = { name: "", id: "" };
