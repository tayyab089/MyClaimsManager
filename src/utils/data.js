const Contacts = [
  {
    id: STRING,
    name: STRING,
    businessName: STRING,
    jobTitle: STRING,
    address: [
      {
        type: STRING,
        street: STRING,
        city: STRING,
        code: STRING,
        zip: STRING,
      },
    ],
    phNo: [{ type: STRING, no: STRING }],
    email: [{ type: STRING, email: STRING }],
    notes: STRING,
  },
];

const Claims = [
  {
    fileNo: STRING,
    insured: [CONTACT1, CONTACT2],
    lossLocation: STRING,
    lossType: STRING,
    lossDate: DATE,
    insurance: {
      company: STRING,
      fileNo: STRING,
      plicyNo: STRING,
      claimNo: STRING,
      issueDate: DATE,
      expiryDate: DATE,
    },
    policyCOverage: [{ category: STRING, amount: NUMBER }],
    contacts: [{ category: STRING, contact: CONTACT }],
    docs: [],
    tasks: [],
    forms: [],
  },
];
