import * as Yup from "yup";

const schema = Yup.object().shape({
  id: Yup.string().notRequired(),
  category: Yup.string().notRequired(),
  userId: Yup.string().notRequired(),
  address: Yup.array().of(
    Yup.object().shape({
      type: Yup.string().notRequired(),
      city: Yup.string().notRequired(),
      code: Yup.string().notRequired(),
      zip: Yup.string().notRequired(),
      street: Yup.string().notRequired(),
    })
  ),
  avatar: Yup.string().notRequired(),
  email: Yup.array().of(
    Yup.object().shape({
      type: Yup.string().notRequired(),
      email: Yup.string().email("Invalid email format").required("Email is required"),
    })
  ),
  name: Yup.string().required("Name is required"),
  businessName: Yup.string().notRequired(),
  jobTitle: Yup.string().notRequired(),
  phNo: Yup.array().of(
    Yup.object().shape({
      type: Yup.string().notRequired(),
      no: Yup.string().required("Phone number is required"),
      ext: Yup.string(),
    })
  ),
});

export default schema;
