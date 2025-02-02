import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import { FormsHeader } from "./forms-header";

import { saveFormApi, updateFormApi } from "src/network/forms-api";

import { useDispatch } from "react-redux";
import { setAlertData } from "src/store/reducers/alert/thunks";
import { addFormToStore, updateFormInStore } from "src/store/reducers/forms/thunks";
import { styles } from "./style";

// const { format } = require("date-fns");

export const CancellationNotice = ({ formRef, claim, form, formName, setSavingForm, setForm }) => {
  const dispatch = useDispatch();
  const [initialValues, setInitialValues] = useState({
    a: "",
    b: "",
    c: "",
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
            type: "CancellationNotice",
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
        a: "",
        b: "",
        c: "",
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
          <div id="CancellationNotice">
            <FormsHeader />
            <div className="formContainer" style={{ padding: "0 25pt" }}>
              {/* Header===================================================== */}
              <div className="formRow topMargin60" style={{ justifyContent: "center" }}>
                <div style={styles.cbB13}>NOTICE OF CANCELLATION</div>
              </div>

              {/* Section 1===================================================== */}

              <div className="formRow topMargin90" style={styles.cbR1219}>
                You may cancel the written compensation agreement, without any penalty or
                obligation, until midnight of the third business day after the date on which you
                signed the compensation agreement.
              </div>
              <div className="formRow topMargin20" style={styles.cbR1219}>
                If you cancel, then any payments made by you under the compensation agreement, and
                any negotiable instrument executed by you, will be returned within ten business days
                following receipt by the public adjuster of your cancellation notice, and any
                security interest arising out of the transaction will be cancelled.
              </div>
              <div className="formRow topMargin20" style={styles.cbR1219}>
                To cancel this transaction, mail or deliver a signed and dated copy of this
                cancellation notice, or any other written notice to PAUL GUTTMAN & CO., INC. 140
                ATLANTIC AVENUE, UNIT 406,
              </div>
              <div className="formRow" style={styles.cbR1219}>
                <div>OCEANSIDE, NY 11572, no later than midnight of</div>
                <div style={{ flexGrow: 1, order: 2 }}>
                  <Field type="text" name="a" />
                  <span>{values?.a}</span>
                </div>
              </div>

              <div
                className="formRow topMargin90"
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div style={{ order: 1, alignContent: "center", ...styles.cbB1214 }}>
                  I hereby cancel this transaction
                </div>
              </div>

              {/* Section 3===================================================== */}

              <div className="formRow formHeadContainer topMargin70">
                <div className="formColumn" style={{ width: "40%" }}>
                  <div style={{ order: 0 }}>
                    <Field type="text" name="b" />
                    <span>{values?.b}</span>
                  </div>
                  <div style={{ order: 1, ...styles.cbR1214 }}>Signature of Named Insured(s)</div>
                </div>
                <div className="formColumn" style={{ width: "40%" }}>
                  <div style={{ order: 0 }}>
                    <Field type="text" name="c" />
                    <span>{values?.c}</span>
                  </div>
                  <div style={{ order: 1, ...styles.cbR1214 }}>Date</div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
