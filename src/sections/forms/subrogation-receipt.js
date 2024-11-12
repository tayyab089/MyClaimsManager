import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";

import { saveFormApi, updateFormApi } from "src/network/forms-api";

import { useDispatch } from "react-redux";
import { setAlertData } from "src/store/reducers/alert/thunks";
import { addFormToStore, updateFormInStore } from "src/store/reducers/forms/thunks";

const { format } = require("date-fns");

export const SubrogationReceipt = ({ formRef, claim, form, formName, setSavingForm }) => {
  const dispatch = useDispatch();
  const [initialValues, setInitialValues] = useState({
    a: "Fireman's Fund Insurance",
    b: "Three Thousand Twenty and 88/100",
    c: "3,020.88",
    d: "NYP2005065-11",
    e: "Fire",
    f: "",
    g: "8th",
    h: "March",
    i: "13",
    j: "",
    k: "20",
    l: "BR Affordable Housing, LLP",
    m: "",
    n: "",
    o: "",
    p: "",
    q: "",
    r: "",
    s: "",
    t: "",
    u: "",
    v: "",
    w: "",
    x: "",
    y: "",
    z: "",
    aa: "",
    ab: "",
    ac: "",
    ad: "",
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
            type: "SubrogationReceipt",
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
        a: claim?.insurance?.company,
        b: "",
        c: "",
        d: claim?.insurance?.policyNo,
        e: claim?.lossType,
        f: "",
        g: claim?.lossDate ? format(new Date(claim?.lossDate), "do") : "",
        h: claim?.lossDate ? format(new Date(claim?.lossDate), "MMMM") : "",
        i: claim?.lossDate ? format(new Date(claim?.lossDate), "yy") : "",
        j: "",
        k: "",
        l: "",
        m: "",
        n: "",
        o: "",
        p: "",
        q: "",
        r: "",
        s: "",
        t: "",
        u: "",
        v: "",
        w: "",
        x: "",
        y: "",
        z: "",
        aa: "",
        ab: "",
        ac: "",
        ad: "",
      });
    }
  }, [form]);

  // Function to format currency
  const formatCurrency = (value) => {
    const numericValue = value.replace(/\D/g, "");
    let integerPart = numericValue.substring(0, numericValue.length - 2) || "0";
    const decimalPart = numericValue.substring(numericValue.length - 2);
    integerPart = integerPart.replace(/^0+/, "");
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const formattedValue = `${integerPart}.${decimalPart}`;

    return formattedValue;
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      innerRef={formRef}
      enableReinitialize={true}
    >
      {({ values, setFieldValue }) => (
        <Form id="SubrogationReceipt">
          <div className="formContainer" style={{ padding: ".3in .3in" }}>
            <div className="formRowCentered">
              <h3 style={{ order: 1 }}>SUBROGATION RECEIPT</h3>
            </div>
            <div className="formRow topMargin10">
              <div style={{ order: 1 }}>Received of the</div>
              <div style={{ flexGrow: 1, order: 2 }}>
                <Field type="text" name="a" />
                <span>{values?.a}</span>
              </div>
              <div style={{ order: 3 }}>company the sum of</div>
            </div>
            <div className="formRow topMargin10">
              <div style={{ flexGrow: 1, order: 1 }}>
                <Field type="text" name="b" />
                <span>{values?.b}</span>
              </div>
              <div style={{ order: 2 }}>Dollars ($</div>
              <div style={{ flexGrow: 0, flexBasis: "10em", order: 3 }}>
                <Field
                  type="text"
                  className="numeric"
                  name="c"
                  onChange={(e) => setFieldValue("c", formatCurrency(e.target.value))}
                  value={values?.c}
                />
                {/* <Field type="text" name="c" /> */}
                <span>{values?.c}</span>
              </div>
              <div style={{ order: 4 }}>) in full satisfaction of all</div>
            </div>
            <div className="formRow topMargin10">
              <div style={{ order: 1 }}>
                claims and demands of the undersigned against the said company under its policy No.
              </div>
              <div style={{ flexGrow: 0, flexBasis: "10em", order: 2 }}>
                <Field type="text" name="d" />
                <span>{values?.d}</span>
              </div>
            </div>
            <div className="formRow topMargin10">
              <div style={{ order: 1 }}>
                arising from or connected with any loss or damage by reason of
              </div>
              <div style={{ flexGrow: 1, order: 2 }}>
                <Field type="text" name="e" />
                <span>{values?.e}</span>
              </div>
            </div>
            <div className="formRow topMargin10">
              <div style={{ flexGrow: 1, order: 1 }}>
                <Field type="text" name="f" />
                <span>{values?.f}</span>
              </div>
            </div>
            <div className="formRow topMargin10">
              <div style={{ order: 1 }}>which loss or damage occurred on or about the</div>
              <div style={{ flexGrow: 1, flexBasis: "5em", order: 2 }}>
                <Field type="text" name="g" />
                <span>{values?.g}</span>
              </div>
              <div style={{ order: 3 }}>day of</div>
              <div style={{ flexGrow: 1, order: 4 }}>
                <Field type="text" name="h" />
                <span>{values?.h}</span>
              </div>
              <div style={{ order: 5 }}>20</div>
              <div style={{ flexGrow: 0, flexBasis: "5em", order: 6 }}>
                <Field type="text" name="i" />
                <span>{values?.i}</span>
              </div>
            </div>
            <div className="formRow bottomMargin15" />
            <div className="formRow bottomMargin15">
              In consideration of and to the extent of said payment, the undersigned hereby
              surrogates. assigns and transfers to the said company all of the rights, claims,
              demands and interest which the undersigned has or may have against any parties for
              said loss or damage, and said company is hereby authorized and empowered to sue,
              compromise or settle same in the name of the undersigned or otherwise, but for the
              sole use of said company and at its ownn cost, and it is further authorized to collect
              and receipt for any moneys which may be paid upon said claims; to endorse in the name
              of the undersigned in his interest and behalf, any check or drafts given in payment of
              said claims: to cash such checks or drafts, and to retain the proceeds thereof; and
              said, company is hereby constituted the attorney-in-fact for the undersigned for said
              purposes and to sign releases, and to execute any and all contracts, documents or
              releases, in the name of the undersigned, that may be necessary in the prosecution.
              litigation or settlement of said claims, subject to the foregoing, said insurance
              company shall thereupon be subrogated to all rights of the undersigned against any
              such parties for such loss and damage, the undersigned has not released and will not
              release any portion of said claims, except as hereinafter indicated.
            </div>
            <div className="formRow bottomMargin10" />
            {/* **** Exceptions **** */}
            <div className="formRow">
              <div
                className="formRow rightMargin5"
                style={{ flexBasis: "50%", flexGrow: 0, order: 1 }}
              >
                Exceptions:
              </div>
              <div
                className="formRow finePrint leftMargin2pc"
                style={{ flexBasis: "50%", flexGrow: 0, order: 1 }}
              >
                &quot;Any person who knowingly and with intent to defraud any insurance company or
                other person files an application for insurance or statement of claim containing any
                materially false information or conceals for the purpose of misleading, information
                concerning any fact material thereto, commits a fraudulent insurance act, which is a
                crime&quot;
              </div>
            </div>
            {/* Dated */}
            <div className="formRow">
              <div
                className="formRow rightMargin2pc"
                style={{
                  flexBasis: "50%",
                  flexGrow: 0,
                  order: 1,
                  alignContent: "flex-start",
                }}
              >
                <div style={{ order: 1 }}>Dated:</div>
                <div style={{ flexGrow: 1, flexBasis: "10em", order: 2 }}>
                  <Field type="text" name="j" />
                  <span>{values?.j}</span>
                </div>
                <div style={{ order: 3 }}>20</div>
                <div style={{ flexGrow: 0, flexBasis: "5em", order: 4 }}>
                  <Field type="text" name="k" />
                  <span>{values?.k}</span>
                </div>
              </div>
            </div>
            {/* **** WITNESS **** */}
            <div className="formRow topMargin10">
              <div
                className="formRow rightMargin2pc"
                style={{
                  flexBasis: "50%",
                  flexGrow: 0,
                  order: 1,
                  alignContent: "flex-start",
                }}
              >
                <div style={{ order: 1, alignSelf: "flex-end", fontSize: "1.25em" }}>WITNESS:</div>
              </div>
              <div
                className="formRow leftMargin2pc"
                style={{ flexBasis: "50%", flexGrow: 0, order: 1 }}
              >
                <div style={{ flexGrow: 1, flexBasis: "5em", order: 4 }}>
                  <Field type="text" name="l" />
                  <span>{values?.l}</span>
                </div>
              </div>
            </div>
            {/* blank lines */}
            <div className="formRow topMargin10">
              <div
                className="formRow rightMargin2pc"
                style={{
                  flexBasis: "50%",
                  flexGrow: 0,
                  order: 1,
                  alignContent: "flex-start",
                }}
              >
                <div style={{ flexGrow: 1, flexBasis: "5em", order: 4 }}>
                  <Field type="text" name="m" />
                  <span>{values?.m}</span>
                </div>
              </div>
              <div
                className="formRow leftMargin2pc"
                style={{ flexBasis: "50%", flexGrow: 0, order: 1 }}
              >
                <div style={{ flexGrow: 1, flexBasis: "5em", order: 4 }}>
                  <Field type="text" name="n" />
                  <span>{values?.n}</span>
                </div>
              </div>
            </div>
            {/* blank lines */}
            <div className="formRow topMargin10">
              <div
                className="formRow rightMargin2pc"
                style={{
                  flexBasis: "50%",
                  flexGrow: 0,
                  order: 1,
                  alignContent: "flex-start",
                }}
              >
                <div style={{ flexGrow: 1, flexBasis: "5em", order: 1 }}>
                  <Field type="text" name="o" />
                  <span>{values?.o}</span>
                </div>
              </div>
              <div
                className="formRow leftMargin2pc"
                style={{ flexBasis: "50%", flexGrow: 0, order: 1 }}
              >
                <div style={{ order: 1 }}>By</div>
                <div style={{ flexGrow: 1, flexBasis: "5em", order: 1 }}>
                  <Field type="text" name="p" />
                  <span>{values?.p}</span>
                </div>
              </div>
            </div>
            <div className="formRow" style={{ justifyContent: "flex-end" }}>
              <div className="formRow finePrint">Officer</div>
            </div>
            <div className="formRow topMargin10">
              {/* **** FOR INDIVIDUALS **** */}
              <div
                className="rightMargin2pc"
                style={{ flexDirection: "column", flexGrow: 0, flexBasis: "50%" }}
              >
                <div className="formRow" style={{ justifyContent: "center" }}>
                  <div className="formRow">
                    <div>FOR INDIVIDUALS</div>
                  </div>
                </div>
                <div className="formRow topMargin10">State of</div>
                <div className="formRow topMargin10">County of</div>
                {/* On the ... */}
                <div className="formRow topMargin10">
                  <div>On the</div>
                  <div style={{ flexGrow: 0, flexBasis: "4em" }}>
                    <Field type="text" name="q" />
                    <span>{values?.q}</span>
                  </div>
                  <div>day of</div>
                  <div style={{ flexGrow: 1, flexBasis: "5em" }}>
                    <Field type="text" name="r" />
                    <span>{values?.r}</span>
                  </div>
                  <div>20</div>
                  <div style={{ flexGrow: 0, flexBasis: "3em" }}>
                    <Field type="text" name="s" />
                    <span>{values?.s}</span>
                  </div>
                </div>
                {/* Before he came ... */}
                <div className="formRow">
                  <div>Before me came</div>
                  <div style={{ flexGrow: 1, flexBasis: "4em" }}>
                    <Field type="text" name="t" />
                    <span>{values?.t}</span>
                  </div>
                </div>
                <div className="formRow">
                  <div>to me known to be the individual describe therein,</div>
                </div>
                <div className="formRow">
                  <div>and who executed, the foregoing instrument, and</div>
                </div>
                {/* acknowledged that ... */}
                <div className="formRow">
                  <div>acknowledged that</div>
                  <div style={{ flexGrow: 0, flexBasis: "4em" }}>
                    <Field type="text" name="u" />
                    <span>{values?.u}</span>
                  </div>
                  <div>executed the same.</div>
                </div>
              </div>
              {/* **** FOR CORPORATIONS **** */}
              <div
                className="topMargin10 leftMargin2pc"
                style={{ flexDirection: "column", flexBasis: "50%" }}
              >
                <div className="rightMargin2pc" style={{ flexDirection: "column", flexGrow: 0 }}>
                  <div className="formRow" style={{ justifyContent: "center" }}>
                    <div className="formRow">
                      <div>FOR CORPORATIONS</div>
                    </div>
                  </div>
                  <div className="formRow topMargin10">State of</div>
                  <div className="formRow topMargin10">County of</div>
                  {/* On the ... */}
                  <div className="formRow topMargin10">
                    <div>On the</div>
                    <div style={{ flexGrow: 0, flexBasis: "4em" }}>
                      <Field type="text" name="v" />
                      <span>{values?.v}</span>
                    </div>
                    <div>day of</div>
                    <div style={{ flexGrow: 1, flexBasis: "5em" }}>
                      <Field type="text" name="w" />
                      <span>{values?.w}</span>
                    </div>
                    <div>20</div>
                    <div style={{ flexGrow: 0, flexBasis: "3em" }}>
                      <Field type="text" name="x" />
                      <span>{values?.x}</span>
                    </div>
                  </div>
                  {/* Before he came ... */}
                  <div className="formRow">
                    <div>Before me came</div>
                    <div style={{ flexGrow: 1, flexBasis: "4em" }}>
                      <Field type="text" name="y" />
                      <span>{values?.y}</span>
                    </div>
                  </div>
                  <div className="formRow">
                    <div>to me known, who, being by me duly sworn, did</div>
                  </div>
                  <div className="formRow">
                    <div>depose and say that</div>
                    <div style={{ flexBasis: "6em" }}>
                      <Field type="text" name="z" />
                      <span>{values?.z}</span>
                    </div>
                    <div>resides at</div>
                    <div style={{ flexGrow: 1, flexBasis: "6em" }}>
                      <Field type="text" name="aa" />
                      <span>{values?.aa}</span>
                    </div>
                  </div>
                  {/* that he is the ... */}
                  <div className="formRow">
                    <div>that</div>
                    <div style={{ flexBasis: "6em" }}>
                      <Field type="text" name="ab" />
                      <span>{values?.ab}</span>
                    </div>
                    <div>is the</div>
                    <div style={{ flexGrow: 1, flexBasis: "5em" }}>
                      <Field type="text" name="ac" />
                      <span>{values?.ac}</span>
                    </div>
                  </div>
                  <div className="formRow">
                    <div style={{ flexGrow: 1, flexBasis: "10em" }}>
                      <Field type="text" name="ad" />
                      <span>{values?.ad}</span>
                    </div>
                    <div>the corporation</div>
                  </div>
                  <div className="formRow">
                    <div>
                      described in, and which executed, the foregoing instrument; that he knows the
                      seal of said corporation; that the seal affixed to the said instrument is such
                      corporate seal; that it was so affixed by order of the board of directors of
                      the said corporation; and that he signed his name thereto by like order.
                    </div>
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
