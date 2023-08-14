const uer = [
  {
    id: STRING,
    firstName: STRING,
    lastName: STRING,
    email: STRING,
    phoneNo: STRING,
    address: {
      type: STRING,
      street: STRING,
      city: STRING,
      code: STRING,
      zip: STRING,
    },
  },
];

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

const tasks = [
  {
    type: STRING,
    dueDate: STRING,
    summary: STRING,
    description: STRING,
    location: STRING,
    attachements: [STRING1, STRING2, STRING3],
  },
];

const Claims = [
  {
    fileNo: STRING,
    insured: [CONTACT.ID, CONTACT.ID],
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
    contacts: [{ category: STRING, contact: CONTACT.ID }],
    docs: [STRING, STRING, STRING],
    tasks: [STRING, STRING, STRING],
    forms: [STRING, STRING, STRING],
  },
];
