import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";

import { saveFormApi, updateFormApi } from "src/network/forms-api";

import { useDispatch } from "react-redux";
import { setAlertData } from "src/store/reducers/alert/thunks";

const { format } = require("date-fns");

export const Regulation10 = ({ formRef, claim, form, formName }) => {
  const dispatch = useDispatch();
  const [initialValues, setInitialValues] = useState({
    a: "",
    b: "",
    c: "",
    d: "",
    e: "",
    f: "X",
    g: "Paul Guttman & Co., Inc. No Fee Being Charged",
    h: "0.00",
    i: "X",
    j: "3,020.88",
    k: "X",
    l: "",
    m: "",
    n: "",
    o: "",
    p: "",
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
      } else {
        dispatch(
          setAlertData({ open: true, message: response.data.message, type: response.data.type })
        );
      }
    } else {
      const response = await saveFormApi({
        form: {
          formData: values,
          type: "Regulation10",
          claimfileNo: claim?.fileNo,
          name: formName,
        },
      });
      if (response && response.data.type !== "error") {
        dispatch(
          setAlertData({ open: true, message: response.data.message, type: response.data.type })
        );
      } else {
        dispatch(
          setAlertData({ open: true, message: response.data.message, type: response.data.type })
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
        a: claim?.insured?.map((insured) => insured.name).join(", "),
        b: claim?.fileNo,
        c: claim?.insurance?.policyNo,
        d: claim?.lossDate ? format(new Date(claim?.lossDate), "dd-MM-yyyy") : "",
        e: "",
        f: "",
        g: "Paul Guttman & Co., Inc. No Fee Being Charged",
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
  }, [claim]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      innerRef={formRef}
      enableReinitialize={true}
    >
      {({ values }) => (
        <Form>
          <div id="claimFormPrintContainer">
            <div className="formContainer" style={{ padding: ".8in" }}>
              <div className="formRow" style={{ justifyContent: "center", fontSize: "1.1em" }}>
                <div style={{ order: 1, alignContent: "center" }}>PAUL GUTTMAN & CO., INC</div>
              </div>
              <div className="formRow" style={{ justifyContent: "center", fontSize: "1.1em" }}>
                <div style={{ order: 1, alignContent: "center" }}>203 RACKAWAY AVE.</div>
              </div>
              <div className="formRow" style={{ justifyContent: "center", fontSize: "1.1em" }}>
                <div style={{ order: 1, alignContent: "center" }}>VALLEY STREAM, NY 11580</div>
              </div>
              <div className="formRow" style={{ justifyContent: "center", fontSize: "1.1em" }}>
                <div style={{ order: 1, alignContent: "center" }}>
                  516-825-4800 FAX 516-825-4037
                </div>
              </div>
              <div className="formRow" />
              <div className="formRow topMargin15">
                <div style={{ order: 1, flexBasis: "5em" }}>INSURED:</div>
                <div style={{ flexGrow: 1, order: 2 }}>
                  <Field type="text" name="a" />
                  <span>{values?.a}</span>
                </div>
              </div>
              <div className="formRow topMargin15">
                <div style={{ order: 1, flexBasis: "5em" }}>FILE #</div>
                <div style={{ flexGrow: 1, order: 2 }}>
                  <Field type="text" name="b" />
                  <span>{values?.b}</span>
                </div>
              </div>
              <div className="formRow topMargin15">
                <div style={{ order: 1, flexBasis: "5em" }}>POLICY #</div>
                <div style={{ flexGrow: 1, order: 2 }}>
                  <Field type="text" name="c" />
                  <span>{values?.c}</span>
                </div>
              </div>
              <div className="formRow topMargin15 bottomMargin15">
                <div style={{ order: 1 }}>DATE OF LOSS:</div>
                <div style={{ flexGrow: 1, order: 2 }}>
                  <Field type="text" name="d" />
                  <span>{values?.d}</span>
                </div>
              </div>
              <div className="topMargin1pc" />
              <div className="formRow">
                <div style={{ order: 1 }}>
                  THE NEW YORK STATE INSURANCE LAW REGULATION 10, 3RD AMENDMENT (11 NYC RR 25.12)
                </div>
              </div>
              <div className="topMargin5pc" />
              <div className="formRow">
                <div style={{ order: 1 }}>
                  &quot;25.12 PAYMENT OF LOSSES. WHEN A CLAIM IS SETTLED WHERE THE INSURED IS
                  REPRESENTED BY A PUBLIC ADJUSTER, UPON THE REQUEST OF THE INSURED, THE
                  INSURER&apos;S CHECK MAY BE MADE PAYABLE TO BOTH THE PUBLIC ADJUSTER NAMED AS
                  PAYEE, BUT NOT IN EXCESS OF THE AMOUNT OF THE PUBLIC ADJUSTER&apos;S FEE, AS
                  INDICATED IN THE WRITTEN COMPENSATION AGREEMENT SIGNED BY THE INSURED AND FILED
                  WITH THE INSURER. THE BALANCE OF THE PROCEEDS SHALL BE MADE PAYABLE TO THE INSURED
                  OR THE LOSS PAYEE, OR BOTH WHICHEVER IS APPROPRIATE.&quot;
                </div>
              </div>
              <div className="formRow topMargin1pc">
                <div style={{ order: 1 }}>
                  IN ACCORDANCE WITH THE LAW, PLEASE CHECK THE LINE OF YOUR CHOICE AND SIGN THIS
                  LETTER WHERE
                </div>
              </div>
              <div className="formRow">
                <div style={{ order: 1 }}>INDICATED.</div>
              </div>
              <div className="topMargin5pc" />
              <div className="formRow">
                <div style={{ flexBasis: "5em", flexGrow: 0, order: 1 }}>
                  <Field type="text" name="e" />
                  <span>{values?.e}</span>
                </div>
                <div style={{ order: 2, flexGrow: 1 }}>
                  A CHECK MADE PAYABLE TO BOTH THE PUBLIC ADJUSTER AND THE NAMED
                </div>
              </div>
              <div className="formRow">
                <div style={{ flexBasis: "5em", flexGrow: 0, order: 1 }} />
                <div style={{ order: 2 }}>
                  INSURED. (FOR THE AMOUNT NO GREATER THAN THE PUBLIC ADJUSTER&apos;S FEE)
                </div>
              </div>
              <div className="topMargin1pc" />
              <div className="formRow">
                <div style={{ flexBasis: "5em", order: 1 }}>
                  <Field type="text" name="f" />
                  <span>{values?.f}</span>
                </div>
                <div style={{ order: 2, flexGrow: 0 }}>A CHECK MADE PAYABLE TO:</div>
                <div style={{ flexBasis: "10em", flexGrow: 1, order: 3 }}>
                  <Field type="text" name="g" />
                  <span>{values?.g}</span>
                </div>
              </div>
              <div className="formRow">
                <div style={{ flexBasis: "5em", flexGrow: 0, order: 1 }} />
                <div style={{ order: 1 }}>PUBLIC ADJUSTING FIRM IN THE AMOUNT OF THE FEE OF</div>
              </div>
              <div className="formRow">
                <div style={{ order: 1, flexBasis: "5em", flexGrow: 0 }}></div>
                <div style={{ order: 2, flexGrow: 0 }}>$</div>
                <div style={{ order: 3, flexBasis: "10em", flexGrow: 0 }}>
                  <Field type="text" name="h" />
                  <span>{values?.h}</span>
                </div>
              </div>
              <div className="topMargin1pc" />
              <div className="formRow">
                <div style={{ flexBasis: "5em", order: 1 }}>
                  <Field type="text" name="i" />
                  <span>{values?.i}</span>
                </div>
                <div style={{ order: 2, flexGrow: 0 }}>
                  A CHECK MADE PAYABLE TO THE INSURED IN THE AMOUNT OF THE BALANCE
                </div>
              </div>
              <div className="formRow">
                <div style={{ flexBasis: "5em", flexGrow: 0, order: 1 }} />
                <div style={{ order: 1 }}>PAYABLE.</div>
              </div>
              <div className="formRow">
                <div style={{ order: 1, flexBasis: "5em", flexGrow: 0 }}></div>
                <div style={{ order: 2, flexGrow: 0 }}>$</div>
                <div style={{ order: 3, flexBasis: "10em", flexGrow: 0 }}>
                  <Field type="text" name="j" />
                  <span>{values?.j}</span>
                </div>
              </div>
              <div className="topMargin1pc" />
              <div className="topMargin5pc" />
              <div className="topMargin5pc" />
              <div className="formRow">
                <div style={{ order: 1, flexBasis: "10em", flexGrow: 0 }}>
                  <Field type="text" name="k" />
                  <span>{values?.k}</span>
                </div>
                <div style={{ order: 2, flexBasis: "10em", flexGrow: 0 }} />
                <div style={{ order: 3, flexBasis: "20em", flexGrow: 0 }}>
                  <Field type="text" name="l" />
                  <span>{values?.l}</span>
                </div>
              </div>
              <div className="formRow">
                <div style={{ order: 1, flexBasis: "10em", flexGrow: 0 }}>DATE SIGNED</div>
                <div style={{ order: 2, flexBasis: "10em", flexGrow: 0 }} />
                <div style={{ order: 3, flexBasis: "20em", flexGrow: 0 }}>INSUREDS SIGNATURE</div>
              </div>
              <div className="topMargin5pc" />
              <div className="topMargin5pc" />
              <div className="formRow">
                <div style={{ order: 1, flexBasis: "10em", flexGrow: 0 }}>
                  <Field type="text" name="m" />
                  <span />
                </div>
                <div style={{ order: 2, flexBasis: "10em", flexGrow: 0 }} />
                <div style={{ order: 3, flexBasis: "20em", flexGrow: 0 }}>
                  <Field type="text" name="n" />
                  <span />
                </div>
              </div>
              <div className="formRow">
                <div style={{ order: 1, flexBasis: "10em", flexGrow: 0 }}>DATE SIGNED</div>
                <div style={{ order: 2, flexBasis: "10em", flexGrow: 0 }} />
                <div style={{ order: 3, flexBasis: "20em", flexGrow: 0 }}>INSUREDS SIGNATURE</div>
              </div>
              <div className="topMargin5pc" />
              <div className="topMargin5pc" />
              <div className="formRow">
                <div style={{ order: 1, flexBasis: "10em", flexGrow: 0 }}>
                  <Field type="text" name="o" />
                  <span />
                </div>
                <div style={{ order: 2, flexBasis: "10em", flexGrow: 0 }} />
                <div style={{ order: 3, flexBasis: "20em", flexGrow: 0 }}>
                  <Field type="text" name="p" />
                  <span />
                </div>
              </div>
              <div className="formRow">
                <div style={{ order: 1, flexBasis: "10em", flexGrow: 0 }}>DATE SIGNED</div>
                <div style={{ order: 2, flexBasis: "10em", flexGrow: 0 }} />
                <div style={{ order: 3, flexBasis: "20em", flexGrow: 0 }}>INSUREDS SIGNATURE</div>
              </div>
              <div className="topMargin5pc" />
              <div className="formRow">
                <div style={{ order: 1 }}>
                  AN UNALTERED COPY OF THE COMPENSATION AGREEMENT MUST BE ATTACHED TO THIS COMPLETED
                  FORM
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
