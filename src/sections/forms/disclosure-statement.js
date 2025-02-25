import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import { FormsHeader } from "./forms-header";

import { saveFormApi, updateFormApi } from "src/network/forms-api";

import { useDispatch } from "react-redux";
import { setAlertData } from "src/store/reducers/alert/thunks";
import { addFormToStore, updateFormInStore } from "src/store/reducers/forms/thunks";
import { styles } from "./style";

// const { format } = require("date-fns");

export const DisclosureStatement = ({ formRef, claim, form, formName, setSavingForm, setForm }) => {
  const dispatch = useDispatch();
  const [initialValues, setInitialValues] = useState({
    a: "",
    b: "",
    c: "",
    d: "",
    e: "",
    f: "X",
    g: "",
    h: "",
    i: "",
    j: "",
    k: "",
    l: "",
    m: "",
  });

  const onSubmit = async (values) => {
    setSavingForm(true); // Set saving form to true before the API call starts (indicating loading)

    try {
      let response;

      if (form) {
        // If form exists, update it
        response = await updateFormApi({
          form: { ...form, formData: values, name: formName },
        });
      } else {
        // If form doesn't exist, save it as a new form
        response = await saveFormApi({
          form: {
            formData: values,
            type: "CompensationAgreement",
            claimfileNo: claim?.fileNo,
            name: formName,
          },
        });
      }

      // Handle response and update state
      if (response && response.data.type !== "error") {
        dispatch(
          setAlertData({
            open: true,
            message: response.data.message,
            type: response.data.type,
          })
        );
        if (form) {
          dispatch(updateFormInStore({ ...form, formData: values, name: formName }));
        } else {
          dispatch(addFormToStore(response.data.value));
          setForm(response.data.value);
        }
      } else {
        dispatch(
          setAlertData({
            open: true,
            message: response?.data?.message,
            type: response?.data?.type,
          })
        );
      }
    } catch (error) {
      // Handle any errors that occur during the request
      dispatch(setAlertData({ open: true, message: error.message, type: "error" }));
    } finally {
      // Set saving form to false after the API call finishes (either success or failure)
      setSavingForm(false);
    }
  };

  // useEffect Hooks
  useEffect(() => {
    if (form) {
      setInitialValues(form?.formData);
    } else {
      setInitialValues({
        a: "",
        b: "",
        c: "",
        d: "",
        e: "",
        f: "",
        g: "",
        h: "",
        i: "",
        j: "",
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
          <div id="DisclosureStatement">
            <FormsHeader />
            <div className="formContainer" style={{ padding: "0 12pt" }}>
              {/* Header===================================================== */}

              <div className="formRow topMargin35" style={{ justifyContent: "center" }}>
                <div style={styles.cbB13} className="topMargin5">
                  DISCLOSURE STATEMENT
                </div>
              </div>

              {/* Section 1===================================================== */}

              <div className="formRow topMargin40" style={styles.cbR1227}>
                <div style={{ order: 1 }}>Paul Guttman & Co., Inc. referred</div>
                <div style={{ flexGrow: 1, order: 2 }}>
                  <Field type="text" name="a" />
                  <span>{values?.a}</span>
                </div>
                <div style={{ order: 3 }}>residing and/</div>
              </div>
              <div className="formRow" style={styles.cbR1227}>
                <div style={{ order: 1, flexBasis: "7em" }}>or loss location</div>
                <div style={{ flexGrow: 1, order: 2 }}>
                  <Field type="text" name="b" />
                  <span>{values?.b}</span>
                </div>
              </div>
              <div className="formRow" style={styles.cbR1227}>
                <div style={{ order: 1, flexBasis: "1em" }}>to </div>
                <div style={{ flexGrow: 1, order: 2 }}>
                  <Field type="text" name="c" />
                  <span>{values?.c}</span>
                </div>
                <div style={{ order: 3 }}>for services,</div>
              </div>
              <div className="formRow" style={{ ...styles.cbR1216, marginTop: 5 }}>
                <div style={{ order: 1 }}>
                  work, or repairs, relating to an insurance claim for which the Adjuster represents
                  or represented the Insured or has negotiated or effected a settlement.
                </div>
              </div>
              <div className="formRow" style={styles.cbR1216}>
                <div style={{ order: 1 }}>
                  The Adjuster shall check off any and all applicable boxes:
                </div>
              </div>
              {/* Section 2===================================================== */}
              <div className="topMargin5pc" />
              <div className="formRow">
                <div style={{ flexGrow: 0, order: 1, paddingRight: 10 }}>
                  <Field type="checkbox" name="d" />
                  {values?.d ? (
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
                <div style={{ order: 2, flexGrow: 1, ...styles.cbR1227 }}>
                  The Adjuster has received or will receive the following compensation for the
                  referral:
                </div>
              </div>
              <div className="formRow">
                <div style={{ flexGrow: 1 }}>
                  <Field type="text" name="e" />
                  <span>{values?.e}</span>
                </div>
              </div>
              <div className="topMargin15" />
              <div className="formRow">
                <div style={{ flexGrow: 1 }}>
                  <Field type="text" name="f" />
                  <span>{values?.f}</span>
                </div>
              </div>
              <div className="formRow" style={styles.cbR1216}>
                (Specify the dollar amount or percentage. If compensation is in the form of anything
                other than money, then state the nature of the compensation and its approximate fair
                market value.)
              </div>
              <div className="formRow">
                <div style={{ flexGrow: 0, order: 1, paddingRight: 15 }}>
                  <Field type="checkbox" name="g" />
                  {values?.g ? (
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
                <div style={{ order: 2, flexGrow: 1, marginTop: 5, ...styles.cbR1214 }}>
                  The Adjuster and/or his or her spouse has a financial or ownership interest,
                  directly or indirectly, in the individual or entity listed above.
                </div>
              </div>
              <div className="formRow">
                <div style={{ flexGrow: 0, order: 1, paddingRight: 10 }}>
                  <Field type="checkbox" name="h" />
                  {values?.h ? (
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
                <div style={{ order: 2, flexGrow: 1, marginTop: 10, ...styles.cbR1214 }}>
                  The Adjuster is related to the individual listed above by blood or affinity within
                  the second degree of consanguinity (which includes an individual&apos;s parents,
                  grandparents, children, grandchildren, siblings, and any spouse thereof).
                </div>
              </div>
              <div className="formRow">
                <div style={{ flexGrow: 0, order: 1, paddingRight: 10 }}>
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
                <div style={{ order: 2, flexGrow: 1, marginTop: 10, ...styles.cbR1214 }}>
                  The entity listed above is owned or controlled by an individual who is related to
                  the Adjuster by blood or affinity within the second degree of consanguinity (which
                  includes an individual&apos;s parents, grandparents, children, grandchildren,
                  siblings, and any spouse thereof).
                </div>
              </div>
              <div className="formRow" style={{ ...styles.cbR1214, marginTop: 30 }}>
                NOTICE TO INSURED(S): YOU ARE NOT REQUIRED TO USE ANY INDIVIDUAL OR ENTITY TO WHOM
                OR WHICH THE PUBLIC ADJUSTER REFERS YOU.
              </div>
              <div className="formRow" style={{ ...styles.cbR1214, marginTop: 10 }}>
                This disclosure statement must be written in the same language as that principally
                used in the oral negotiations and presentation.
              </div>

              {/* Section 3===================================================== */}

              <div className="formRow topMargin30" style={{ justifyContent: "space-between" }}>
                <div className="formColumn" style={{ width: "40%" }}>
                  <div style={{ order: 0 }}>
                    <Field type="text" name="j" />
                    <span>{values?.j}</span>
                  </div>
                  <div style={{ order: 1, ...styles.cbR1214 }}>Signature of Public Adjuster or</div>
                  <div style={{ order: 2, ...styles.cbR1214 }}>or Licensed Representative</div>
                  <div style={{ order: 3, marginTop: 10 }}>
                    <Field type="text" name="k" />
                    <span>{values?.k}</span>
                  </div>
                  <div style={{ order: 4, ...styles.cbR1214 }}>Date and Time of Signing</div>
                </div>
                <div className="formColumn" style={{ width: "40%" }}>
                  <div style={{ order: 0 }}>
                    <Field type="text" name="l" />
                    <span>{values?.l}</span>
                  </div>
                  <div style={{ order: 1, marginTop: 20 }}>
                    <Field type="text" name="m" />
                    <span>{values?.m}</span>
                  </div>
                  <div style={{ order: 2, ...styles.cbR1214 }}>Signature of Insured(s)</div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
