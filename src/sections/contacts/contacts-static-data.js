export const emptyValues = {
  id: "",
  category: "Contact",
  address: [
    {
      type: "",
      city: "",
      state: "",
      zip: "",
      street: "",
    },
  ],
  avatar: "",
  email: [{ type: "", email: "" }],
  name: "",
  businessName: "",
  jobTitle: "",
  phNo: [{ type: "", no: "", ext: "" }],
};

export const addressTypes = [
  {
    value: "Work",
    label: "Work",
  },
  {
    value: "Residence",
    label: "Residence",
  },
];

export const phEmailTypes = [
  {
    value: "Work",
    label: "Work",
  },
  {
    value: "Personal",
    label: "Personal",
  },
];

export const addressObject = {
  type: "",
  city: "",
  code: "",
  zip: "",
  street: "",
};

export const phNoObject = { type: "", no: "", ext: "" };
export const emailObject = { type: "", email: "" };
