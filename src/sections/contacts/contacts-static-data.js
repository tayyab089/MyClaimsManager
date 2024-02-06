export const emptyValues = {
  id: "",
  userId: "fe5daa66-05c0-4e48-9235-95ae370ded9d",
  category: "Contact",
  address: [
    {
      type: "work",
      city: "",
      state: "",
      zip: "",
      street: "",
    },
  ],
  avatar: "",
  email: [{ type: "work", email: "" }],
  name: "",
  businessName: "",
  jobTitle: "",
  phNo: [{ type: "work", no: "", ext: "" }],
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
  type: "work",
  city: "",
  code: "",
  zip: "",
  street: "",
};

export const phNoObject = { type: "work", no: "", ext: "" };
export const emailObject = { type: "work", email: "" };
