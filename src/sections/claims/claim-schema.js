import * as Yup from "yup";

const claimSchema = Yup.object().shape({
  fileNo: Yup.string().required("File No is required"),
  insured: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Insured name is required"),
      id: Yup.string(),
    })
  ),
  lossLocation: Yup.string(),
  lossType: Yup.string(),
  lossDate: Yup.date(),
  insurance: Yup.object().shape({
    company: Yup.string(),
    fileNo: Yup.string(),
    policyNo: Yup.string(),
    claimNo: Yup.string(),
    issueDate: Yup.date(),
    expiryDate: Yup.date(),
  }),
  policyCoverage: Yup.array().of(
    Yup.object().shape({
      category: Yup.string(),
      amount: Yup.string(),
    })
  ),
  contacts: Yup.array().of(
    Yup.object().shape({
      category: Yup.string(),
      contact: Yup.object().shape({
        name: Yup.string(),
        id: Yup.string(),
      }),
    })
  ),
});

export default claimSchema;
