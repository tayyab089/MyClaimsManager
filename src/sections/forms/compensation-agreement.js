import React, { useEffect, useState, Fragment } from "react";
import { Formik, Field, Form } from "formik";
import { FormsHeader } from "./forms-header";

import { saveFormApi, updateFormApi } from "src/network/forms-api";

import { useDispatch } from "react-redux";
import { setAlertData } from "src/store/reducers/alert/thunks";
import { addFormToStore, updateFormInStore } from "src/store/reducers/forms/thunks";
import { styles } from "./style";

// const { format } = require("date-fns");

export const CompensationAgreement = ({
  formRef,
  claim,
  form,
  formName,
  setSavingForm,
  setForm,
}) => {
  const dispatch = useDispatch();
  const [initialValues, setInitialValues] = useState({
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
  });

  const onSubmit = async (values) => {
    setSavingForm(true);
    try {
      let response;
      if (form) {
        response = await updateFormApi({
          form: { ...form, formData: values, name: formName },
        });
      } else {
        response = await saveFormApi({
          form: {
            formData: values,
            type: "CompensationAgreement",
            claimfileNo: claim?.fileNo,
            name: formName,
          },
        });
      }

      if (response && response.data.type !== "error") {
        dispatch(
          setAlertData({ open: true, message: response.data.message, type: response.data.type })
        );
        if (form) {
          dispatch(updateFormInStore({ ...form, formData: values, name: formName }));
        } else {
          dispatch(addFormToStore(response.data.value));
          setForm(response.data.value);
        }
      } else {
        dispatch(
          setAlertData({ open: true, message: response?.data?.message, type: response?.data?.type })
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
          <div id="CompensationAgreement">
            <FormsHeader />
            <div className="formContainer">
              {/* Header===================================================== */}
              <div className="formRow" style={{ justifyContent: "center" }}>
                <div style={styles.cbB13}>PUBLIC ADJUSTER COMPENSATION AGREEMENT</div>
              </div>

              {/* Section 1===================================================== */}
              <div className="topMargin5pc" />
              <div className="formRow topMargin5">
                <div style={{ order: 1, ...styles.cbR1218 }}>
                  Date and Time of Initial Contact:{" "}
                </div>
                <div style={{ flexGrow: 1, order: 2, ...styles.cbR1218 }}>
                  <Field type="text" name="a" />
                  <span>{values?.a}</span>
                </div>
              </div>

              <div className="formRow topMargin5">
                <div style={{ flexGrow: 1, order: 2, ...styles.cbR1218 }}>
                  <Field type="text" name="b" />
                  <span>{values?.b}</span>
                </div>
              </div>

              <div className="formRow topMargin5">
                <div style={{ order: 1, flexBasis: "10em", ...styles.cbR1218 }}>
                  residing/located at
                </div>
                <div style={{ flexGrow: 1, order: 2, ...styles.cbR1218 }}>
                  <Field type="text" name="c" />
                  <span>{values?.c}</span>
                </div>
              </div>

              <div className="formRow topMargin5">
                <div style={{ order: 1, flexGrow: 1, ...styles.cbR1218 }}>
                  hereby retains Paul Guttman & Co., Inc. to act or aid in preparation,
                  presentation, adjustment, and negotiation,
                </div>
              </div>

              <div className="formRow topMargin5">
                <div style={{ order: 1, ...styles.cbR1218 }}>
                  or effecting the settlement, of the claim for the loss or damage by
                </div>
                <div style={{ flexGrow: 1, order: 2, ...styles.cbR1218 }}>
                  <Field type="text" name="d" />
                  <span>{values?.d}</span>
                </div>
              </div>

              <div className="formRow topMargin5">
                <div style={{ ...styles.cbR1218 }}>sustained at</div>
                <div style={{ flexGrow: 1, ...styles.cbR1218 }}>
                  <Field type="text" name="e" />
                  <span>{values?.e}</span>
                </div>
              </div>

              <div className="formRow topMargin5">
                <div style={{ order: 1, ...styles.cbR1218 }}>on</div>
                <div style={{ order: 2, flexBasis: "5em", ...styles.cbR1218 }}>
                  <Field type="text" name="f" />
                  <span>{values?.f}</span>
                </div>
                <div style={{ order: 3, ...styles.cbR1218 }}>20</div>
                <div style={{ order: 4, flexBasis: "2em", ...styles.cbR1218 }}>
                  <Field type="text" name="g" />
                  <span>{values?.g}</span>
                </div>
                <div style={{ order: 5, ...styles.cbR1218 }}>
                  , and agrees to pay the Adjuster for such service a fee of
                </div>
                <div style={{ order: 6, flexGrow: 1, flexBasis: "5em", ...styles.cbR1218 }}>
                  <Field type="text" name="h" />
                  <span>{values?.h}</span>
                </div>
                <div style={{ order: 7, ...styles.cbR1218 }}>percent </div>
                <div
                  style={{
                    order: 8,
                    color: "#aaaaaa",
                    fontWeight: "lighter",
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                    marginLeft: 3,
                    borderBottom: "1px solid #999",
                    ...styles.cbR1218,
                  }}
                >
                  ( INITIAL HERE )
                </div>
              </div>

              <div className="formRow topMargin5">
                <div style={{ ...styles.cbR1218 }}>
                  of the amount of the loss, including salvage, when adjusted or otherwise recovered
                  from the insurance companies.
                </div>
              </div>

              <div className="formRow topMargin5">
                <div style={{ order: 0, flexBasis: "10em", ...styles.cbR1218 }}>
                  <Field type="text" name="i" />
                  <span>{values?.i}</span>
                </div>
                <div style={{ ...styles.cbR1218 }}>disclosure statements are attached hereto.</div>
              </div>

              <div className="formRow topMargin10 bottomMargin10" style={{ borderTop: "1.5px dashed #000" }}></div>

              {/* Section 2===================================================== */}
              <div className="formRow" style={{ justifyContent: "center" }}>
                <div
                  style={{
                    order: 1,
                    alignContent: "center",
                    ...styles.cbB1214,
                  }}
                >
                  NOTICE TO INSURED
                </div>
              </div>
              <div>
                <ol className="formList1">
                  <li style={styles.cbR1112}>
                    The Adjuster may not receive any compensation unless the Adjuster discloses the
                    compensation to you.
                  </li>
                  <li style={styles.cbR1112}>
                    The Adjuster may not charge you any fees that total more than 12.5% of the
                    recovery for services rendered by the Adjuster, except that the Adjuster may
                    charge a fee of up to 20% on a supplemental claim if the aggregate fee charged
                    is less than or equal to 12.5% of the full claim payment. A supplemental claim
                    is a claim made to an insurer in a situation in which you did not retain a
                    public adjuster when you made an initial claim, the insurer made a payment to
                    you, and then you retained a public adjuster to prove the amount of the loss and
                    extent of the loss and not the cause of the loss.
                    <ol className="formList2  style={styles.cbR1112}">
                      <li style={styles.cbR1112}>
                        The limit on the total fees that may be charged includes services rendered
                        by an outside expert or consultant retained or employed by the Adjuster that
                        directly relate to the adjusting function of the Adjuster.
                      </li>
                      <li style={styles.cbR1112}>
                        The limit on total fees also includes any referral of an individual or
                        entity for services, work, or repairs relating to any insurance claim for
                        which the Adjuster represents or represented you or has negotiated or
                        effected a settlement.
                      </li>
                      <li style={styles.cbR1112}>
                        If the Adjuster refers you to an individual or entity, including after you
                        sign this compensation agreement, then the Adjuster must obtain an
                        acknowledged disclosure statement from you at the time of the referral.{" "}
                      </li>
                      <li style={styles.cbR1112}>
                        YOU ARE NOT REQUIRED TO USE ANY INDIVIDUAL OR ENTITY TO WHOM OR WHICH THE
                        ADJUSTER REFERS YOU.
                      </li>
                    </ol>
                  </li>
                  <li style={styles.cbR1112}>
                    The Adjuster must compute the fee based upon any monies paid by the insurer for
                    any insurance claim for which the public adjuster represents or represented you
                    or has negotiated or effected a settlement, after you have retained the
                    Adjuster&apos;s services.
                  </li>
                  <li style={styles.cbR1112}>
                    The fee to be charged under this compensation agreement may be negotiated
                    between the parties for less than 12.5%, or with regard to a supplemental claim,
                    for less than 20%. You should discuss the amount of the fee with the Adjuster
                    before signing any compensation agreement. You must initial the amount upon
                    which you have agreed.
                  </li>
                  <li style={styles.cbR1112}>
                    This compensation agreement is valid only if both this agreement and the
                    attached notice of cancellation are written in the same language as that
                    principally used in the oral negotiations and presentation.
                  </li>
                  <li style={styles.cbR1112}>
                    You may cancel this compensation agreement at any time prior to midnight of the
                    third business day after you signed this compensation agreement. Please read the
                    attached &quot;Notice of Cancellation&quot; form for an explanation of this
                    right.
                  </li>
                </ol>
              </div>

              {/* Section 3===================================================== */}
              <div className="topMargin5pc" />
              <div className="formRow formHeadContainer">
                <div className="formColumn" style={{ width: "40%" }}>
                  <div style={{ order: 0 }}>
                    <Field type="text" name="j" />
                    <span>{values?.j}</span>
                  </div>
                  <div style={{ order: 1, ...styles.cbR1012 }}>Signature of Public Adjuster</div>
                  <div style={{ order: 2, ...styles.cbR1012 }}>
                    or Licensed Representative Thereof
                  </div>
                  <div style={{ order: 3, marginTop: 10, ...styles.cbR1012 }}>
                    <Field type="text" name="k" />
                    <span>{values?.k}</span>
                  </div>
                  <div style={{ order: 4, ...styles.cbR1012 }}>Date and Time of Signing</div>
                </div>
                <div className="formColumn" style={{ width: "40%", ...styles.cbR1012 }}>
                  <div style={{ order: 0 }}>
                    <Field type="text" name="l" />
                    <span>{values?.l}</span>
                  </div>
                  <div style={{ order: 1, ...styles.cbR1012 }}>Signature of Insured</div>
                  <div style={{ order: 2, marginTop: 20 }}>
                    <Field type="text" name="m" />
                    <span>{values?.m}</span>
                  </div>
                  <div style={{ order: 3, ...styles.cbR1012 }}>Signature of Insured</div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
