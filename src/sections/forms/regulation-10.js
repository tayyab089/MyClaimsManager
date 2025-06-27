import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import { FormsHeader } from "./forms-header";

import { saveFormApi, updateFormApi } from "src/network/forms-api";

import { useDispatch } from "react-redux";
import { setAlertData } from "src/store/reducers/alert/thunks";
import { addFormToStore, updateFormInStore } from "src/store/reducers/forms/thunks";
import { styles } from "./style";

// const { format } = require("date-fns");

export const Regulation10 = ({ formRef, claim, form, setForm, formName, setSavingForm }) => {
  const dispatch = useDispatch();
  const [initialValues, setInitialValues] = useState({
    a: "",
    b: "",
    c: "",
    d: "",
    e: "",
    f: false,
    g: "",
    g_explanation: "",
    h: "",
    i: false,
    j: "",
    j_explanation: "",
    k: "",
    l: "",
    m: "",
    n: "",
    o: "",
  });

  const onSubmit = async (values) => {
    setSavingForm(true); // Start loading state

    try {
      let response;

      if (form) {
        // Update form scenario
        response = await updateFormApi({
          form: { ...form, formData: values, name: formName },
        });

        if (response && response.data.type !== "error") {
          dispatch(
            setAlertData({
              open: true,
              message: response.data.message,
              type: response.data.type,
            })
          );
          dispatch(updateFormInStore({ ...form, formData: values, name: formName }));
        } else {
          dispatch(
            setAlertData({
              open: true,
              message: response?.data?.message,
              type: response?.data?.type,
            })
          );
        }
      } else {
        // Save new form scenario
        response = await saveFormApi({
          form: {
            formData: values,
            type: "Regulation10",
            claimfileNo: claim?.fileNo,
            name: formName,
          },
        });

        if (response && response.data.type !== "error") {
          dispatch(
            setAlertData({
              open: true,
              message: response.data.message,
              type: response.data.type,
            })
          );
          dispatch(addFormToStore(response.data.value));
          setForm(response.data.value); // Set the new form data
        } else {
          dispatch(
            setAlertData({
              open: true,
              message: response?.data?.message,
              type: response?.data?.type,
            })
          );
        }
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      dispatch(
        setAlertData({
          open: true,
          message: "An unexpected error occurred during form submission.",
          type: "error",
        })
      );
    } finally {
      setSavingForm(false); // End loading state
    }
  };

  // useEffect Hooks
  useEffect(() => {
    if (form) {
      setInitialValues(form?.formData);
    } else {
      setInitialValues({
        a: claim?.insured?.map((insured) => insured?.name).join(", "),
        b: claim?.insurance?.policyNo,
        c: claim?.insurance?.claimNo,
        // d: claim?.lossDate ? format(new Date(claim?.lossDate), "dd-MM-yyyy") : "",
        d: "Paul Guttman & Co., Inc.",
        e: claim?.insurance?.company,
        f: "",
        g: "",
        g_explanation: "",
        h: "",
        i: "",
        j: "",
        j_explanation: "",
        k: "",
        l: "",
        m: "",
        n: "",
        o: "",
        p: "",
      });
    }
  }, [form]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      innerRef={formRef}
      enableReinitialize={true}
    >
      {({ values }) => (
        <Form>
          <div id="Regulation10">
            <FormsHeader />
            <div className="formContainer" style={{ paddingLeft: "15pt", paddingRight: "15pt" }}>
              {/* Header===================================================== */}
              <div
                className="formRow topMargin10"
                style={{
                  ...styles.cbB11,
                  justifyContent: "center",
                }}
              >
                DIRECTION TO PAY LETTER
              </div>

              <div className="formRow" style={{ justifyContent: "center" }}>
                <div style={styles.cbR1112}>REGULATION 10</div>
              </div>
              {/* Section 1===================================================== */}
              <div className="formRow topMargin10" style={styles.cbR1218}>
                <div style={{ order: 1 }}>Name(s) of Named Insured(s)</div>
                <div style={{ flexGrow: 1, order: 2 }}>
                  <Field type="text" name="a" />
                  <span>{values?.a}</span>
                </div>
              </div>
              <div className="formRow topMargin10" style={styles.cbR1218}>
                <div style={{ order: 1, flexBasis: "5em" }}>Policy No:</div>
                <div style={{ flexGrow: 1, order: 2 }}>
                  <Field type="text" name="b" />
                  <span>{values?.b}</span>
                </div>
              </div>
              <div className="formRow topMargin10" style={styles.cbR1218}>
                <div style={{ order: 1, flexBasis: "5em" }}>Claim No:</div>
                <div style={{ flexGrow: 1, order: 2 }}>
                  <Field type="text" name="c" />
                  <span>{values?.c}</span>
                </div>
              </div>
              <div className="formRow topMargin10 bottomMargin15" style={styles.cbR1218}>
                <div style={{ order: 1 }}>Public Adjuster&apos;s Name</div>
                <div style={{ flexGrow: 1, order: 2 }}>
                  <Field type="text" name="d" />
                  <span>{values?.d}</span>
                </div>
              </div>
              {/* Section 2===================================================== */}
              <div className="topMargin1pc" />
              <div className="formRow" style={styles.cbR1218}>
                <div>I hereby direct</div>
                <div style={{ flexGrow: 1 }}>
                  <Field type="text" name="e" />
                  <span>{values?.e}</span>
                </div>
                <div>to issue a check or checks</div>
              </div>
              <div className="formRow" style={styles.cbR1218}>
                <div>as follows:</div>
              </div>
              <div className="topMargin5pc" />
              <div className="formRow" style={styles.cbR1218}>
                <div style={{ flexGrow: 0, order: 1, paddingRight: 15 }}>
                  <Field type="checkbox" name="f" />
                  {values?.f ? (
                    <span
                      style={{
                        border: "1px solid #808080",
                        textAlign: "center",
                        width: 17,
                        height: 15,
                      }}
                    >
                      &#10004;
                    </span>
                  ) : (
                    <span
                      style={{
                        border: "1px solid #808080",
                        textAlign: "center",
                        width: 17,
                        height: 15,
                        lineHeight: 15,
                      }}
                    ></span>
                  )}
                </div>
                <div style={{ order: 2, flexGrow: 1 }}>
                  one check payable to the public adjuster for the public adjuster&apos;s fee
                  indicated in the written compensation agreement signed by the named insured(s) and
                  filed with the insurer, less any referral fee set forth in a disclosure statement,
                  if applicable, and a separate check payable to the named insured(s) or any loss
                  payee or mortgagee, or both, whichever is appropriate, for the balance
                </div>
              </div>
              <div className="topMargin1pc" />
              <div className="formRow" style={styles.cbR1218}>
                <div style={{ order: 1, flexBasis: "3em", flexGrow: 0 }}></div>
                <div style={{ order: 2, flexGrow: 0 }}>$</div>
                <div style={{ order: 3, flexBasis: "10em", flexGrow: 0 }}>
                  <Field type="text" name="g" className="numeric" />
                  <div className="printOnly numeric">{values?.g}</div>
                </div>
                <div style={{ order: 4, flexGrow: 0 }}>Public Adjuster&apos;s Fee</div>
                <div style={{ order: 5, flexBasis: "20em", flexGrow: 0 }}>
                  <Field type="text" name="g_explanation" />
                  <span>{values?.g_explanation}</span>
                </div>
              </div>
              <div className="topMargin1pc" />
              <div className="formRow" style={styles.cbR1218}>
                <div style={{ order: 1, flexBasis: "3em", flexGrow: 0 }}></div>
                <div style={{ order: 2, flexGrow: 0 }}>$</div>
                <div style={{ order: 3, flexBasis: "10em", flexGrow: 0 }}>
                  <Field type="text" name="h" className="numeric" />
                  <div className="printOnly numeric">{values?.h}</div>
                </div>
                <div style={{ order: 4, flexGrow: 0 }}> Insured(s)</div>
              </div>
              <div className="topMargin5pc" />
              <div className="formRow" style={styles.cbR1218}>
                <div style={{ flexGrow: 0, order: 1, marginRight: 15 }}>
                  <Field type="checkbox" name="i" />
                  {values?.i ? (
                    <span
                      style={{
                        border: "1px solid #808080",
                        textAlign: "center",
                        width: 17,
                        height: 15,
                      }}
                    >
                      &#10004;
                    </span>
                  ) : (
                    <span
                      style={{
                        border: "1px solid #808080",
                        textAlign: "center",
                        width: 17,
                        height: 15,
                        lineHeight: 15,
                      }}
                    ></span>
                  )}
                </div>
                <div style={{ order: 2, flexGrow: 1 }}>
                  one check payable to both the public adjuster and named insured(s) for the public
                  adjuster&apos;s fee indicated in the written compensation agreement signed by the
                  named insured(s) and filed with the insurer, less any referral fee set forth in a
                  disclosure statement, if applicable, and a separate check payable to the named
                  insured(s) or any loss payee or mortgagee, or both, whichever is appropriate for
                  the balance
                </div>
              </div>
              {/* Section 3===================================================== */}
              <div className="topMargin1pc" />
              <div className="formRow" style={styles.cbR1218}>
                <div style={{ order: 1, flexBasis: "3em", flexGrow: 0 }}></div>
                <div style={{ order: 2, flexGrow: 0 }}>$</div>
                <div style={{ order: 3, flexBasis: "10em", flexGrow: 0 }}>
                  <Field type="text" name="j" className="numeric" />
                  <div className="printOnly numeric">{values?.j}</div>
                </div>
                <div style={{ order: 4, flexGrow: 0 }}>Public Adjuster&apos;s Fee</div>
                <div style={{ order: 5, flexBasis: "20em", flexGrow: 0 }}>
                  <Field type="text" name="j_explanation" />
                  <span>{values?.j_explanation}</span>
                </div>
              </div>
              <div className="topMargin1pc" />
              <div className="formRow" style={styles.cbR1218}>
                <div style={{ order: 1, flexBasis: "3em", flexGrow: 0 }}></div>
                <div style={{ order: 2, flexGrow: 0 }}>$</div>
                <div style={{ order: 3, flexBasis: "10em", flexGrow: 0 }}>
                  <Field type="text" name="k" className="numeric" />
                  <div className="printOnly numeric">{values?.k}</div>
                </div>
                <div style={{ order: 4, flexGrow: 0 }}> Insured(s)</div>
              </div>
              <div className="formRow topMargin15" style={styles.cbR1218}>
                NOTICE TO NAMED INSURED(S): You may revoke this direction to pay letter at any time
                prior to the insurer issuing a check. Your revocation must be in writing and signed
                by you. You must submit the revocation to the insurer and provide the public
                adjuster with a copy.
              </div>
              <div className="formRow formHeadContainer topMargin40" style={styles.cbR1218}>
                <div className="formColumn" style={{ width: "40%" }}>
                  <div>Signature of Insured(s)</div>
                  <div className="topMargin5pc" />
                  <div className="topMargin5pc" />
                  <div style={{ order: 3, flexBasis: "3em", flexGrow: 0 }}>
                    <Field type="text" name="l" />
                    <span>{values?.l}</span>
                  </div>
                  <div style={{ order: 3, flexBasis: "3em", flexGrow: 0 }}>
                    <Field type="text" name="m" />
                    <span>{values?.m}</span>
                  </div>
                </div>
                <div className="formColumn" style={{ width: "40%" }}>
                  <div>Date of Signing</div>
                  <div className="topMargin5pc" />
                  <div className="topMargin5pc" />
                  <div style={{ order: 3, flexBasis: "3em", flexGrow: 0 }}>
                    <Field type="text" name="n" />
                    <span>{values?.n}</span>
                  </div>
                  <div style={{ order: 3, flexBasis: "3em", flexGrow: 0 }}>
                    <Field type="text" name="o" />
                    <span>{values?.o}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
