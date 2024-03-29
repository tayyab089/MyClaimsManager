import React, { useEffect, useState, Fragment } from "react";
import { Formik, Field, Form } from "formik";
import { FormsHeader } from "./forms-header";

import { saveFormApi, updateFormApi } from "src/network/forms-api";

import { useDispatch } from "react-redux";
import { setAlertData } from "src/store/reducers/alert/thunks";
import { addFormToStore, updateFormInStore } from "src/store/reducers/forms/thunks";

// const { format } = require("date-fns");

export const CompensationAgreement = ({ formRef, claim, form, formName }) => {
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
    console.log(values);
    if (form) {
      const response = await updateFormApi({
        form: { ...form, formData: values, name: formName },
      });
      if (response && response.data.type !== "error") {
        dispatch(
          setAlertData({ open: true, message: response.data.message, type: response.data.type })
        );
        dispatch(updateFormInStore({ ...form, formData: values, name: formName }));
      } else {
        dispatch(
          setAlertData({ open: true, message: response?.data?.message, type: response?.data?.type })
        );
      }
    } else {
      const response = await saveFormApi({
        form: {
          formData: values,
          type: "CompensationAgreement",
          claimfileNo: claim?.fileNo,
          name: formName,
        },
      });
      if (response && response.data.type !== "error") {
        dispatch(
          setAlertData({ open: true, message: response.data.message, type: response.data.type })
        );
        dispatch(addFormToStore(response.data.value));
        setForm(response.data.value);
      } else {
        dispatch(
          setAlertData({ open: true, message: response?.data?.message, type: response?.data?.type })
        );
      }
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
            <div className="formContainer" style={{ padding: "0 .5in 0 .5in" }}>
              {/* Header===================================================== */}
              <div className="formRow" style={{ justifyContent: "center", fontSize: "1.1em" }}>
                <div style={{ order: 1, alignContent: "center", fontWeight: "bold" }}>
                  PUBLIC ADJUSTER COMPENSATION AGREEMENT
                </div>
              </div>

              {/* Section 1===================================================== */}
              <div className="topMargin5pc" />
              <div className="formRow topMargin5">
                <div style={{ order: 1 }}>Date and Time of Initial Contact: </div>
                <div style={{ flexGrow: 1, order: 2 }}>
                  <Field type="text" name="a" />
                  <span>{values?.a}</span>
                </div>
              </div>
              <div className="formRow topMargin5">
                <div style={{ flexGrow: 1, order: 2 }}>
                  <Field type="text" name="b" />
                  <span>{values?.b}</span>
                </div>
              </div>
              <div className="formRow topMargin5">
                <div style={{ order: 1, flexBasis: "10em" }}>residing/located at</div>
                <div style={{ flexGrow: 1, order: 2 }}>
                  <Field type="text" name="c" />
                  <span>{values?.c}</span>
                </div>
              </div>
              <div className="formRow topMargin5">
                <div style={{ order: 1, flexGrow: 1 }}>
                  hereby retains Paul Guttman & Co., Inc. to act or aid in preparation,
                  presentation, adjustment, and negotiation,
                </div>
              </div>
              <div className="formRow topMargin5">
                <div style={{ order: 1 }}>
                  or effecting the settlement, of the claim for the loss or damage by
                </div>
                <div style={{ flexGrow: 1, order: 2 }}>
                  <Field type="text" name="d" />
                  <span>{values?.d}</span>
                </div>
              </div>
              <div className="formRow topMargin5">
                <div>sustained at</div>
                <div style={{ flexGrow: 1 }}>
                  <Field type="text" name="e" />
                  <span>{values?.e}</span>
                </div>
              </div>

              <div className="formRow topMargin5">
                <div style={{ order: 1 }}>on</div>
                <div style={{ order: 2, flexBasis: "5em" }}>
                  <Field type="text" name="f" />
                  <span>{values?.f}</span>
                </div>
                <div style={{ order: 3 }}>20</div>
                <div style={{ order: 4, flexBasis: "2em" }}>
                  <Field type="text" name="g" />
                  <span>{values?.g}</span>
                </div>
                <div style={{ order: 5 }}>
                  , and agrees to pay the Adjuster for such service a fee of
                </div>
                <div style={{ order: 6, flexGrow: 1, flexBasis: "5em" }}>
                  <Field type="text" name="h" />
                  <span>{values?.h}</span>
                </div>
                <div style={{ order: 7 }}>percent </div>
                <div
                  style={{
                    order: 8,
                    color: "#aaaaaa",
                    fontWeight: "lighter",
                    fontSize: 11,
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                    marginLeft: 3,
                    borderBottom: "1px solid #999",
                  }}
                >
                  ( INITIAL HERE )
                </div>
              </div>

              <div className="formRow topMargin5">
                <div>
                  of the amount of the loss, including salvage, when adjusted or otherwise recovered
                  from the insurance companies.
                </div>
              </div>

              <div className="formRow topMargin5">
                <div style={{ order: 0, flexBasis: "10em" }}>
                  <Field type="text" name="i" />
                  <span>{values?.i}</span>
                </div>
                <div>disclosure statements are attached hereto.</div>
              </div>

              <div className="formRow topMargin10" style={{ borderTop: "1.5px dashed #000" }}></div>

              {/* Section 2===================================================== */}
              <div className="formRow" style={{ justifyContent: "center", fontSize: "1.1em" }}>
                <div style={{ order: 1, alignContent: "center", fontWeight: "bold" }}>
                  NOTICE TO INSURED
                </div>
              </div>
              <div>
                <ol className="formList1">
                  <li>
                    The Adjuster may not receive any compensation unless the Adjuster discloses the
                    compensation to you.
                  </li>
                  <li>
                    The Adjuster may not charge you any fees that total more than 12.5% of the
                    recovery for services rendered by the Adjuster, except that the Adjuster may
                    charge a fee of up to 20% on a supplemental claim if the aggregate fee charged
                    is less than or equal to 12.5% of the full claim payment. A supplemental claim
                    is a claim made to an insurer in a situation in which you did not retain a
                    public adjuster when you made an initial claim, the insurer made a payment to
                    you, and then you retained a public adjuster to prove the amount of the loss and
                    extent of the loss and not the cause of the loss.
                    <ol className="formList2">
                      <li>
                        The limit on the total fees that may be charged includes services rendered
                        by an outside expert or consultant retained or employed by the Adjuster that
                        directly relate to the adjusting function of the Adjuster.
                      </li>
                      <li>
                        The limit on total fees also includes any referral of an individual or
                        entity for services, work, or repairs relating to any insurance claim for
                        which the Adjuster represents or represented you or has negotiated or
                        effected a settlement.
                      </li>
                      <li>
                        If the Adjuster refers you to an individual or entity, including after you
                        sign this compensation agreement, then the Adjuster must obtain an
                        acknowledged disclosure statement from you at the time of the referral.{" "}
                      </li>
                      <li>
                        YOU ARE NOT REQUIRED TO USE ANY INDIVIDUAL OR ENTITY TO WHOM OR WHICH THE
                        ADJUSTER REFERS YOU.
                      </li>
                    </ol>
                  </li>
                  <li>
                    The Adjuster must compute the fee based upon any monies paid by the insurer for
                    any insurance claim for which the public adjuster represents or represented you
                    or has negotiated or effected a settlement, after you have retained the
                    Adjuster&apos;s services.
                  </li>
                  <li>
                    The fee to be charged under this compensation agreement may be negotiated
                    between the parties for less than 12.5%, or with regard to a supplemental claim,
                    for less than 20%. You should discuss the amount of the fee with the Adjuster
                    before signing any compensation agreement. You must initial the amount upon
                    which you have agreed.
                  </li>
                  <li>
                    This compensation agreement is valid only if both this agreement and the
                    attached notice of cancellation are written in the same language as that
                    principally used in the oral negotiations and presentation.
                  </li>
                  <li>
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
                  <div style={{ order: 1 }}>Signature of Public Adjuster</div>
                  <div style={{ order: 2 }}>or Licensed Representative Thereof</div>
                  <div style={{ order: 3, marginTop: 10 }}>
                    <Field type="text" name="k" />
                    <span>{values?.k}</span>
                  </div>
                  <div style={{ order: 4 }}>Date and Time of Signing</div>
                </div>
                <div className="formColumn" style={{ width: "40%" }}>
                  <div style={{ order: 0 }}>
                    <Field type="text" name="l" />
                    <span>{values?.l}</span>
                  </div>
                  <div style={{ order: 1 }}>Signature of Insured</div>
                  <div style={{ order: 2, marginTop: 20 }}>
                    <Field type="text" name="m" />
                    <span>{values?.m}</span>
                  </div>
                  <div style={{ order: 3 }}>Signature of Insured</div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
