import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";

import { saveFormApi, updateFormApi } from "src/network/forms-api";

import { useDispatch } from "react-redux";
import { setAlertData } from "src/store/reducers/alert/thunks";
import { addFormToStore, updateFormInStore } from "src/store/reducers/forms/thunks";

const { format } = require("date-fns");
import { formatDate } from "src/utils/format-date";
import { styles } from "./style";

export const ProofOfLoss = ({ formRef, claim, form, formName, setSavingForm, setForm }) => {
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
    ae: "",
    af: "",
    ag: "",
    eg: "", // eSeries
    ah: "",
    eh: "", // eSeries
    ai: "",
    ei: "", // eSeries
    aj: "",
    ej: "", // eSeries
    ak: "",
    al: "",
    am: "",
    an: "",
    ao: "",
    ap: "",
    aq: "",
    ar: "",
    as: "",
    at: "",
    au: "",
    av: "",
    aw: "",
    ax: "",
    ay: "",
    az: "",
    ba: "",
    bb: "",
    ef: "", // eSeries
    bc: "",
    bd: "",
    be: "",
    bf: "",
    bg: "",
    bh: "",
    bi: "",
    bj: "",
    bk: "",
    bl: "",
    bm: "",
    bn: "",
    bo: "",
    bp: "",
    bq: "",
    br: "",
    bs: "",
    bt: "",
    bu: "",
    bv: "",
    bw: "",
    bx: "",
    by: "",
    bz: "",
    ca: "",
    cb: "",
    cc: "",
    cd: "",
    ce: "",
    cf: "",
    cg: "", // Was used twice
    ed: "", // First cg Replaced with this
    dx: "", // dSeries
    dy: "", // dSeries
    ch: "",
    ci: "",
    cj: "",
    ck: "",
    cl: "",
    cm: "",
    cn: "",
    co: "",
    cp: "",
    cq: "",
    cr: "",
    cs: "",
    ct: "",
    cu: "",
    cv: "",
    cw: "",
    cx: "",
    cy: "",
    cz: "",
    da: "",
    db: "",
    dc: "",
    dd: "",
    de: "",
    df: "",
    dg: "",
    dh: "",
    di: "",
    dj: "",
    dz: "", //dSeries
    ea: "", //eSeries
    eb: "", //eSeries
    ec: "", //eSeries
    dk: "",
    dl: "",
    dm: "",
    dn: "",
    do: "",
    dp: "",
    dq: "",
    dr: "",
    ds: "",
    dt: "",
    du: "",
    dv: "",
    dw: "",
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
            type: "ProofOfLoss",
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

  // Function to format currency
  const formatCurrencyWithDollarSign = (value) => {
    const numericValue = value.replace(/\D/g, "");
    let integerPart = numericValue.substring(0, numericValue.length - 2) || "0";
    const decimalPart = numericValue.substring(numericValue.length - 2);
    integerPart = integerPart.replace(/^0+/, "");
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const formattedValue = `$${integerPart}.${decimalPart}`;

    return formattedValue;
  };

  // Function to parse currency value for form submission
  const parseCurrency = (value) => {
    return value.replace(/,/g, "");
  };

  // useEffect Hooks
  useEffect(() => {
    if (form) {
      setInitialValues(form?.formData);
    } else {
      // const ploicyCoverage = claim?.policyCoverage?.filter(
      //   (item) => item.category.toLowerCase() != "deductible"
      // );
      var policyCoverage = claim?.policyCoverage?.reduce(
        (acc, item) => {
          if (item.category.toLowerCase() === "deductible") {
            acc.deductibleItems.push(item);
          } else {
            acc.nonDeductibleItems.push(item);
          }
          return acc;
        },
        { deductibleItems: [], nonDeductibleItems: [] }
      );

      setInitialValues({
        a: claim?.insurance?.policyNo,
        b: 'See Schedule "A"',
        c: formatDate(claim?.insurance?.issueDate),
        d: formatDate(claim?.insurance?.expiryDate),
        e: claim?.fileNo,
        f: claim?.insurance?.claimNo,
        g: "",
        h: "",
        i: claim?.insurance?.company,
        j: "",
        k: claim?.insured?.map((insured) => insured?.name).join(", "),
        ek: "",
        l: claim?.lossType,
        m: claim?.lossType,
        n: "",
        o: "",
        p: claim?.lossDate ? format(new Date(claim?.lossDate), "do") : "",
        q: claim?.lossDate ? format(new Date(claim?.lossDate), "MMM") : "",
        r: claim?.lossDate ? format(new Date(claim?.lossDate), "yy") : "",
        s: claim?.lossType,
        t: "",
        u: "",
        v: "As Permitted",
        w: "",
        x: "",
        y: "Owner",
        z: "",
        aa: "As Per Policy",
        ab: "",
        ac: "As Per Policy",
        ad: "",
        ae: "",
        af: 'See Schedule "A"',
        ag: "",
        eg: "", // eSeries
        ah: "",
        eh: "", // eSeries
        ai: "",
        ei: "", // eSeries
        aj: "",
        ej: "", // eSeries
        ak: "",
        al: claim?.insured?.map((insured) => insured?.name).join(", "),
        am: "",
        an: "X",
        ao: "",
        ap: "",
        aq: "",
        ar: "",
        as: "",
        at: "",
        au: policyCoverage?.nonDeductibleItems[0]?.amount,
        av: policyCoverage?.nonDeductibleItems[0]?.category,
        aw: policyCoverage?.nonDeductibleItems[1]?.amount,
        ax: policyCoverage?.nonDeductibleItems[1]?.category,
        ay: policyCoverage?.nonDeductibleItems[2]?.amount,
        az: policyCoverage?.nonDeductibleItems[2]?.category,
        ba: policyCoverage?.nonDeductibleItems[3]?.amount,
        bb: policyCoverage?.nonDeductibleItems[3]?.category,
        ef: claim?.lossLocation, // eSeries
        bc: policyCoverage?.deductibleItems?.map((item) => item.amount).join(", "),
        bd: "",
        be: "",
        bf: "",
        bg: "$",
        bh: "$",
        bi: "",
        bj: "",
        bk: "$",
        bl: "$",
        bm: "",
        bn: "",
        bo: "$",
        bp: "$",
        bq: "",
        br: "",
        bs: "$",
        bt: "$",
        bu: "",
        bv: "",
        bw: "$",
        bx: "$",
        by: "",
        bz: "",
        ca: "$",
        cb: "$",
        cc: "",
        cd: "",
        ce: "$",
        cf: "$",
        cg: "", // Was used twice
        ed: "", // First cg Replaced with this
        dx: "$", // dSeries
        dy: "$", // dSeries
        ch: "",
        ci: "",
        cj: "",
        ck: "",
        cl: "",
        cm: "",
        cn: "",
        co: "",
        cp: "",
        cq: "",
        cr: "",
        cs: "",
        ct: "",
        cu: "",
        cv: "",
        cw: "",
        cx: "",
        cy: "",
        cz: "",
        da: "",
        db: "",
        dc: "",
        dd: "",
        de: "",
        df: "",
        dg: "",
        dh: "",
        di: "",
        dj: "",
        dz: "", //dSeries
        ea: "", //eSeries
        eb: "", //eSeries
        ec: "", //eSeries
        dk: "",
        dl: "",
        dm: "",
        dn: "",
        do: "",
        dp: "",
        dq: "",
        dr: "",
        ds: "",
        dt: "",
        du: "",
        dv: "",
        dw: "",
      });
    }
  }, [form]);
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        innerRef={formRef}
        enableReinitialize={true}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div id="ProofOfLoss">
              <div className="formContainer">
                {/* ************************************************************************************************* */}
                {/* NOTE: Input fields do not render in the print layout since the content is not in the DOM */}
                {/* Hence there is a span for every input. In the @media print css inputs are hidden and spans shown */}
                {/* ************************************************************************************************* */}
                {/* **** SWORN STATEMENT IN PROOF OF LOSS **** */}
                <div className="formRowCentered">
                  <div style={{ order: 1, ...styles.cbB16 }}>SWORN STATEMENT IN PROOF OF LOSS</div>
                </div>
                {/* **** Top section **** */}
                <div className="formRow">
                  <div
                    className="formColumn"
                    style={{ flexBasis: "25%", flexGrow: 0, alignContent: "flex-start" }}
                  >
                    <div className="formRow">
                      <Field
                        type="text"
                        name="a"
                        style={{ textAlign: "center", ...styles.cbR1010 }}
                      />
                      <span style={{ ...styles.cbR1010 }}>{values?.a}</span>
                    </div>
                    <div className="formRowCentered" style={{ ...styles.cbR1010 }}>
                      POLICY NUMBER
                    </div>
                    <div className="formRow">
                      <Field
                        type="text"
                        name="b"
                        style={{ textAlign: "center", ...styles.cbR1010 }}
                      />
                      <span style={{ ...styles.cbR1010 }}>{values?.b}</span>
                    </div>
                    <div className="formRowCentered" style={{ ...styles.cbR0608 }}>
                      AMOUNT OF POLICY AT TIME OF LOSS
                    </div>
                    <div className="formRow">
                      <Field
                        type="text"
                        name="c"
                        style={{ textAlign: "center", ...styles.cbR1010 }}
                      />
                      <span style={{ ...styles.cbR1010 }}>{values?.c}</span>
                    </div>
                    <div className="formRowCentered" style={{ ...styles.cbR1010 }}>
                      DATE ISSUED
                    </div>
                    <div className="formRow">
                      <Field
                        type="text"
                        name="d"
                        style={{ textAlign: "center", ...styles.cbR1010 }}
                      />
                      <span style={{ ...styles.cbR1010 }}>{values?.d}</span>
                    </div>
                    <div className="formRowCentered" style={{ ...styles.cbR1010 }}>
                      DATE EXPIRES
                    </div>
                  </div>
                  <div className="formTextBox" style={{ ...styles.cbB1010 }}>
                    ANY PERSON WHO KNOWINGLY AND WITH INTENT TO DEFRAUD ANY INSURANCE COMPANY OR
                    OTHER PERSON FILES A STATMENT OF CLAIM CONTAINING ANY MATERIALLY FALSE
                    INFORMATION, OR CONCEALS FOR THE PURPOSE OF MISLEADING, INFORMATION CONCERNING
                    ANY FACT MATERIAL THERETO, COMMITS A FRAUDULENT INSURANCE ACT, WHICH IS A CRIME.
                  </div>
                  <div
                    className="formColumn"
                    style={{ flexBasis: "25%", flexGrow: 0, alignContent: "flex-end" }}
                  >
                    <div className="formRow">
                      <Field
                        type="text"
                        name="e"
                        style={{ textAlign: "center", ...styles.cbR1010 }}
                      />
                      <span style={{ ...styles.cbR1010 }}>{values?.e}</span>
                    </div>
                    <div className="formRowCentered" style={{ ...styles.cbR1010 }}>
                      OUR FILE No.
                    </div>
                    <div className="formRow">
                      <Field
                        type="text"
                        name="f"
                        style={{ textAlign: "center", ...styles.cbR1010 }}
                      />
                      <span style={{ ...styles.cbR1010 }}>{values?.f}</span>
                    </div>
                    <div className="formRowCentered" style={{ ...styles.cbR1010 }}>
                      COMPANY CLAIM NO.
                    </div>
                    <div className="formRow">
                      <Field
                        type="text"
                        name="g"
                        style={{ textAlign: "center", ...styles.cbR1010 }}
                      />
                      <span style={{ ...styles.cbR1010 }}>{values?.g}</span>
                    </div>
                    <div className="formRowCentered" style={{ ...styles.cbR1010 }}>
                      AGENCY AT
                    </div>
                    <div className="formRow">
                      <Field
                        type="text"
                        name="h"
                        style={{ textAlign: "center", ...styles.cbR1010 }}
                      />
                      <span style={{ ...styles.cbR1010 }}>{values?.h}</span>
                    </div>
                    <div className="formRowCentered" style={{ ...styles.cbR1010 }}>
                      AGENT
                    </div>
                  </div>
                </div>
                {/* **** Text start **** */}
                <div className="formRow" style={{ ...styles.cbR0909, marginTop: 8 }}>
                  <div style={{ order: 1, ...styles.cbR0909 }}>To the</div>
                  <div style={{ flexGrow: 1, order: 2 }}>
                    <Field type="text" name="i" style={{ ...styles.cbR0909 }} />
                    <span style={{ ...styles.cbR0909 }}>{values?.i}</span>
                  </div>
                </div>
                <div className="formRow" style={{ ...styles.cbR0909, marginTop: 3 }}>
                  <div style={{ order: 1, ...styles.cbR0909 }}>of</div>
                  <div style={{ flexGrow: 1, order: 2 }}>
                    <Field type="text" name="j" style={{ ...styles.cbR0909 }} />
                    <span style={{ ...styles.cbR0909 }}>{values?.j}</span>
                  </div>
                </div>
                {/* At the time of loss */}
                <div className="formRow" style={{ ...styles.cbR0909 }}>
                  <div style={{ order: 1, ...styles.cbR0909 }}>
                    At the time of loss, by the above indicated policy of insurance you insured
                  </div>
                  <div style={{ flexGrow: 1, order: 2 }}>
                    <Field type="text" name="k" style={{ ...styles.cbR0909 }} />
                    <span style={{ ...styles.cbR0909 }}>{values?.k}</span>
                  </div>
                </div>
                <div className="formRow" style={{ ...styles.cbR0909 }}>
                  <div style={{ order: 1, flexGrow: 1 }}>
                    <Field type="text" name="ek" style={{ ...styles.cbR0909 }} />
                    <span style={{ ...styles.cbR0909 }}>{values?.ek}</span>
                  </div>
                </div>
                <div className="formRow" style={{ ...styles.cbR0909 }}>
                  <div style={{ order: 1, ...styles.cbR0909 }}>against loss by</div>
                  <div style={{ flexGrow: 1, order: 2 }}>
                    <Field type="text" name="l" style={{ ...styles.cbR0909 }} />
                    <span style={{ ...styles.cbR0909 }}>{values?.l}</span>
                  </div>
                  <div style={{ order: 3, ...styles.cbR0909 }}>
                    to the property described under schedule &quot;A&quot; according to
                  </div>
                </div>
                <div className="formRow" style={{ ...styles.cbR0909 }}>
                  <div style={{ order: 1, ...styles.cbR0909 }}>
                    the terms and conditions of the said policy and all forms, endorsements,
                    transfers and assignments attached thereto
                  </div>
                </div>
                {/* **** 1. Time and origin **** */}
                <div className="formRow topMargin10" style={{ ...styles.cbR0909 }}>
                  <div style={{ order: 1, ...styles.cbR0909 }}>
                    <strong>1. Time and Origin:</strong> A
                  </div>
                  <div style={{ flexGrow: 1, order: 2 }}>
                    <Field type="text" name="m" style={{ ...styles.cbR0909 }} />
                    <span style={{ ...styles.cbR0909 }}>{values?.m}</span>
                  </div>
                  <div style={{ order: 3, ...styles.cbR0909 }}>loss occured about the hour of</div>
                  <div style={{ flexGrow: 1, order: 4, flexBasis: "3em" }}>
                    <Field type="text" name="n" />
                    <span>{values?.n}</span>
                  </div>
                  <div style={{ order: 5 }}>o&apos; clock</div>
                  <div style={{ flexGrow: 1, order: 6, flexBasis: "3em" }}>
                    <Field type="text" name="o" />
                    <span>{values?.o}</span>
                  </div>
                  <div style={{ order: 7 }}>M.</div>
                </div>
                <div className="formRow" style={{ ...styles.cbR0909 }}>
                  <div style={{ order: 1, ...styles.cbR0909 }}>on the</div>
                  <div style={{ order: 2, flexGrow: 1, flexBasis: "1em" }}>
                    <Field type="text" name="p" style={{ ...styles.cbR0909 }} />
                    <span>{values?.p}</span>
                  </div>
                  <div style={{ order: 3 }}>day of</div>
                  <div style={{ order: 4, flexGrow: 1, flexBasis: "1em" }}>
                    <Field type="text" name="q" />
                    <span>{values?.q}</span>
                  </div>
                  <div style={{ order: 5 }}>20</div>
                  <div style={{ order: 6, flexGrow: 1, flexBasis: "1em" }}>
                    <Field type="text" name="r" />
                    <span>{values?.r}</span>
                  </div>
                  <div style={{ order: 7 }}>. The cause and origin of the said loss were:</div>
                  <div style={{ order: 8, flexGrow: 1, flexBasis: "5em" }}>
                    <Field type="text" name="s" />
                    <span>{values?.s}</span>
                  </div>
                </div>
                <div className="formRow">
                  <div style={{ order: 1, flexGrow: 1 }}>
                    <Field type="text" name="t" />
                    <span>{values?.t}</span>
                  </div>
                </div>
                <div className="formRow">
                  <div style={{ order: 1, flexGrow: 1 }}>
                    <Field type="text" name="u" />
                    <span>{values?.u}</span>
                  </div>
                </div>
                {/* **** 2. Occupancy **** */}
                <div className="formRow" style={{ ...styles.cbR0909 }}>
                  <div style={{ order: 1, ...styles.cbR0909 }}>
                    <strong>2. Occupancy:</strong> The building described, or containing the
                    property described, was occupied at the time of the loss as follows,
                  </div>
                </div>
                <div className="formRow" style={{ ...styles.cbR0909 }}>
                  <div style={{ order: 1 }}>and for no other purpose whatever:</div>
                  <div style={{ order: 2, flexGrow: 1 }}>
                    <Field type="text" name="v" />
                    <span>{values?.v}</span>
                  </div>
                </div>
                <div className="formRow" style={{ ...styles.cbR0909 }}>
                  <div style={{ order: 1, flexGrow: 1 }}>
                    <Field type="text" name="w" />
                    <span>{values?.w}</span>
                  </div>
                </div>
                <div className="formRow" style={{ ...styles.cbR0909 }}>
                  <div style={{ order: 1, flexGrow: 1 }}>
                    <Field type="text" name="x" />
                    <span>{values?.x}</span>
                  </div>
                </div>
                {/* **** 3. Title and interest **** */}
                <div className="formRow" style={{ ...styles.cbR0909 }}>
                  <div style={{ order: 1 }}>
                    <strong>3. Title and Interest:</strong> At the time of the loss the interest of
                    your insured in the property described therin was
                  </div>
                  <div style={{ order: 2, flexGrow: 1, flexBasis: "2em" }}>
                    <Field type="text" name="y" style={{ ...styles.cbR0909 }} />
                    <span style={{ ...styles.cbR0909 }}>{values?.y}</span>
                  </div>
                </div>
                <div className="formRow" style={{ ...styles.cbR0909 }}>
                  <div style={{ order: 1, flexGrow: 1, flexBasis: "5em" }}>
                    <Field type="text" name="z" style={{ ...styles.cbR0909 }} />
                    <span style={{ ...styles.cbR0909 }}>{values?.z}</span>
                  </div>
                  <div style={{ order: 2 }}>
                    No other person or persons had any interest therein or
                  </div>
                </div>
                <div className="formRow" style={{ ...styles.cbR0909 }}>
                  <div style={{ order: 1 }}>incumbrance thereon, except:</div>
                  <div style={{ order: 2, flexGrow: 1 }}>
                    <Field type="text" name="aa" style={{ ...styles.cbR0909 }} />
                    <span style={{ ...styles.cbR0909 }}>{values?.aa}</span>
                  </div>
                </div>
                <div className="formRow" style={{ ...styles.cbR0909 }}>
                  <div style={{ order: 1, flexGrow: 1 }}>
                    <Field type="text" name="ab" />
                    <span>{values?.ab}</span>
                  </div>
                </div>
                {/* **** 4. Changes **** */}
                <div className="formRow" style={{ ...styles.cbR0909 }}>
                  <div style={{ order: 1, ...styles.cbR0909 }}>
                    <strong>3. Changes:</strong> Since the said policy was issued there has been no
                    assignment thereof, or change of interest, use, occupancy
                  </div>
                </div>
                <div className="formRow" style={{ ...styles.cbR0909 }}>
                  <div style={{ order: 1, ...styles.cbR0909 }}>
                    possession, location or exposure of the property described, except:
                  </div>
                  <div style={{ order: 2, flexGrow: 1 }}>
                    <Field type="text" name="ac" />
                    <span>{values?.ac}</span>
                  </div>
                </div>
                <div className="formRow" style={{ ...styles.cbR0909 }}>
                  <div style={{ order: 1, flexGrow: 1 }}>
                    <Field type="text" name="ad" />
                    <span>{values?.ad}</span>
                  </div>
                </div>
                <div className="formRow" style={{ ...styles.cbR0909 }}>
                  <div style={{ order: 1, flexGrow: 1 }}>
                    <Field type="text" name="ae" />
                    <span>{values?.ae}</span>
                  </div>
                </div>
                {/* **** 5. Total insurance **** */}
                <div className="formRow" style={{ ...styles.cbR0909 }}>
                  <div style={{ order: 1, ...styles.cbR0909 }}>
                    <strong>5. Total Insurance:</strong> The total amount of insurance upon the
                    property descrobed by this policy was, at the time of the loss,
                  </div>
                </div>
                <div className="formRow" style={{ ...styles.cbR0909 }}>
                  <div style={{ order: 2 }}>$</div>
                  <div style={{ order: 3, flexGrow: 1, flexBasis: "3em" }}>
                    <Field type="text" name="af" style={{ ...styles.cbR0909 }} />
                    <span>{values?.af}</span>
                  </div>
                  <div style={{ order: 4 }}>
                    , as more particularly specified in the apportionment attached under Schedule
                    &quot;C&quot;, besides which
                  </div>
                </div>
                <div className="formRow" style={{ ...styles.cbR0909 }}>
                  <div style={{ order: 5 }}>
                    there was no policy or other contract of insurance, written or oral, valid or
                    invalid.
                  </div>
                </div>
                {/* **** 6. Actual Cash Value **** */}
                <div className="formRow topMargin15" style={{ ...styles.cbR0909 }}>
                  <div style={{ order: 1, ...styles.cbR0909 }}>
                    <strong>6. The Actual Cash Value</strong> of the said property at the time of
                    the loss was
                  </div>
                  <div style={{ order: 2, flexGrow: 1 }}>
                    <Field type="text" className="bottomBorderDashed" name="eg" />
                    <span className="bottomBorderDashed">{values?.eg}</span>
                  </div>
                  <div style={{ order: 3 }}>$</div>
                  <div style={{ order: 4, flexGrow: 0, flexBasis: "10em" }}>
                    <Field
                      type="text"
                      className="numeric"
                      style={{ textAlign: "right" }}
                      name="ag"
                      onChange={(e) => setFieldValue("ag", formatCurrency(e.target.value))}
                      value={values?.ag}
                    />
                    <div className="printOnly numeric">{values?.ag}</div>
                  </div>
                </div>
                {/* **** 7. Whole loss and damage **** */}
                <div className="formRow topMargin15" style={{ ...styles.cbR0909 }}>
                  <div style={{ order: 1, ...styles.cbR0909 }}>
                    <strong>7. The Whole Loss and Damage </strong> was
                  </div>
                  <div style={{ order: 2, flexGrow: 1 }}>
                    <Field type="text" className="bottomBorderDashed" name="eh" />
                    <span className="bottomBorderDashed">{values?.eh}</span>
                  </div>
                  <div style={{ order: 3 }}>$</div>
                  <div style={{ order: 4, flexGrow: 0, flexBasis: "10em" }}>
                    <Field
                      type="text"
                      className="numeric"
                      name="ah"
                      onChange={(e) => setFieldValue("ah", formatCurrency(e.target.value))}
                      value={values?.ah}
                    />
                    <div className="printOnly numeric">{values?.ah}</div>
                  </div>
                </div>
                {/* **** 8. Less amt **** */}
                <div className="formRow topMargin15" style={{ ...styles.cbR0909 }}>
                  <div style={{ order: 1, ...styles.cbR0909 }}>
                    <strong>8. Less Amount of Deductible </strong>
                  </div>
                  <div style={{ order: 2, flexGrow: 1 }}>
                    <Field type="text" className="bottomBorderDashed" name="ei" />
                    <span className="bottomBorderDashed">{values?.ei}</span>
                  </div>
                  <div style={{ order: 3 }}>$</div>
                  <div style={{ order: 4, flexGrow: 0, flexBasis: "10em" }}>
                    <Field
                      type="text"
                      className="numeric"
                      name="ai"
                      onChange={(e) => setFieldValue("ai", formatCurrency(e.target.value))}
                      value={values?.ai}
                    />
                    <div className="printOnly numeric">{values?.ai}</div>
                  </div>
                </div>
                {/* **** 9. Amt claimed **** */}
                <div className="formRow topMargin15" style={{ ...styles.cbR0909 }}>
                  <div style={{ order: 1, ...styles.cbR0909 }}>
                    <strong>9. The Amount Claimed </strong> under the above numbered policy is
                  </div>
                  <div style={{ order: 2, flexGrow: 1 }}>
                    <Field type="text" className="bottomBorderDashed" name="ej" />
                    <span className="bottomBorderDashed">{values?.ej}</span>
                  </div>
                  <div style={{ order: 3 }}>$</div>
                  <div style={{ order: 4, flexGrow: 0, flexBasis: "10em" }}>
                    <Field
                      type="text"
                      className="numeric"
                      name="aj"
                      onChange={(e) => setFieldValue("aj", formatCurrency(e.target.value))}
                      value={values?.aj}
                    />
                    <div className="printOnly numeric">{values?.aj}</div>
                  </div>
                </div>
                {/* **** Disclaimer **** */}
                <div className="formRow topMargin10">
                  <span
                    style={{
                      ...styles.cbB0909,
                      order: 1,
                      marginLeft: "1em",
                      display: "block",
                      borderBottom: "none",
                    }}
                  >
                    The said loss did not originate by any act, design or procurement on the part of
                    your insured, or this affiant; nothing has been done by or with the privity or
                    consent of your insured or this affiant, to violate the conditions of the
                    policy, or render it void; no articles are mentioned herein or in annexed
                    schedules but such as were destroyed or damaged at the time of the said loss; no
                    property saved has in any manner been concealed, and no attempt to deceive the
                    said company, as to the extent of said loss, has in any manner been made. Any
                    other information that may be required will be furnished and considered a part
                    of this proof. The furnishing of this blank or the preparation of proofs by a
                    representative of the above insurance company is not a waiver of any of its
                    rights.
                  </span>
                </div>
                <div className="formRow finePrint topMargin10">
                  <div style={{ order: 1, marginLeft: "1em", ...styles.cbB0909 }}>
                    The furnishing of this blank or the preparation of proofs by a representative of
                    the above insurance company is not a waiver of any of its rights.
                  </div>
                </div>
                {/* **** State of **** */}
                <div className="formRow" style={{ paddingBottom: 10, ...styles.cbB0909 }} />
                <div className="formRow" style={{ ...styles.cbB0909 }}>
                  <div style={{ order: 1 }}>State of</div>
                  <div style={{ order: 2, flexGrow: 0, flexBasis: "15em" }}>
                    <Field type="text" name="ak" />
                    <span>{values?.ak}</span>
                  </div>
                  <div style={{ order: 3, flexGrow: 0, flexBasis: "2em", ...styles.cbB0909 }} />
                  <div style={{ order: 4, flexGrow: 1, flexBasis: "25em", ...styles.cbB0909 }}>
                    <Field type="text" name="al" />
                    <span>{values?.al}</span>
                  </div>
                  <div style={{ order: 5, flexGrow: 0, flexBasis: "2em", ...styles.cbB0909 }}>
                    Insured
                  </div>
                </div>
                {/* **** County of **** */}
                <div className="formRow" style={{ paddingBottom: 10, ...styles.cbB0909 }} />
                <div className="formRow" style={{ ...styles.cbB0909 }}>
                  <div style={{ order: 1 }}>County of</div>
                  <div style={{ order: 2, flexGrow: 0, flexBasis: "15em" }}>
                    <Field type="text" name="am" />
                    <span>{values?.am}</span>
                  </div>
                  <div style={{ order: 3, flexGrow: 0, flexBasis: "2em" }} />
                  <div style={{ order: 4, flexGrow: 1, flexBasis: "22em" }}>
                    <Field type="text" name="an" style={{ ...styles.cbR0909 }} />
                    <span style={{ ...styles.cbR0909 }}>{values?.an}</span>
                  </div>
                  <div style={{ order: 5, flexGrow: 0, flexBasis: "2em" }}>Insured</div>
                </div>
                {/* **** Subscribed and sworn **** */}
                <div className="formRow topMargin10" style={{ ...styles.cbR0909 }}>
                  <div style={{ order: 1 }}>Subscribed and sworn to before me this</div>
                  <div style={{ order: 2, flexGrow: 0, flexBasis: "5em" }}>
                    <Field type="text" name="ao" style={{ ...styles.cbR0909 }} />
                    <span style={{ ...styles.cbR0909 }}>{values?.ao}</span>
                  </div>
                  <div style={{ order: 3 }}>day of</div>
                  <div style={{ order: 4, flexGrow: 0, flexBasis: "10em" }}>
                    <Field type="text" name="ap" style={{ ...styles.cbR0909 }} />
                    <span style={{ ...styles.cbR0909 }}>{values?.ap}</span>
                  </div>
                  <div style={{ order: 5 }}>20</div>
                  <div style={{ order: 6, flexGrow: 0, flexBasis: "5em" }}>
                    <Field type="text" name="aq" style={{ ...styles.cbR0909 }} />
                    <span style={{ ...styles.cbR0909 }}>{values?.aq}</span>
                  </div>
                  <div style={{ order: 7, flexGrow: 1 }} />
                </div>
                {/* **** Notary public **** */}
                <div className="formRow topMargin5" style={{ pageBreakAfter: "always" }}>
                  <div style={{ order: 1, flexGrow: 0, flexBasis: "20em" }}>
                    <Field type="text" name="ar" />
                    <span>{values?.ar}</span>
                  </div>
                  <div style={{ order: 2, ...styles.cbB0909 }}>Notary Public</div>
                  <div style={{ order: 3, flexGrow: 1 }} />
                </div>
                {/* ************************************************** */}
                {/* **** Schedule A - Policy form **** */}
                {/* ************************************************** */}
                <div className="formRow topMargin5pc bottomMargin5">
                  <div style={{ order: 1, textAlign: "center", flexGrow: 1, ...styles.cbB11 }}>
                    <>SCHEDULE &quot;A&quot; - POLICY FORM</>
                  </div>
                </div>
                <div className="formRow" style={{ ...styles.cbR0909 }}>
                  <div style={{ order: 1, ...styles.cbR0909 }}>Policy Form No.</div>
                  <div style={{ order: 2, flexGrow: 0, flexBasis: "10em" }}>
                    <Field type="text" name="as" style={{ ...styles.cbR0909 }} />
                    <span style={{ ...styles.cbR0909 }}>{values?.as}</span>
                  </div>
                  <div style={{ order: 3, ...styles.cbR0909 }}>Dated</div>
                  <div style={{ order: 4, flexGrow: 1 }}>
                    <Field type="text" name="at" style={{ ...styles.cbR0909 }} />
                    <span style={{ ...styles.cbR0909 }}>{values?.at}</span>
                  </div>
                </div>
                {/* **** Item 1 **** */}
                <div className="formRow" style={{ ...styles.cbR0909 }}>
                  <div style={{ order: 1, ...styles.cbR0909 }}>Item 1. $</div>
                  <div style={{ order: 2, flexGrow: 0, flexBasis: "10em", ...styles.cbR0909 }}>
                    <Field
                      type="text"
                      name="au"
                      onChange={(e) => setFieldValue("au", formatCurrency(e.target.value))}
                      value={values?.au}
                      style={{ ...styles.cbR0909 }}
                    />
                    <span style={{ ...styles.cbR0909 }}>{values?.au}</span>
                  </div>
                  <div style={{ order: 3, ...styles.cbR0909 }}>on</div>
                  <div style={{ order: 4, flexGrow: 1 }}>
                    <Field type="text" name="av" style={{ ...styles.cbR0909 }} />
                    <span style={{ ...styles.cbR0909 }}>{values?.av}</span>
                  </div>
                </div>
                {/* **** Item 2 **** */}
                <div className="formRow" style={{ ...styles.cbR0909 }}>
                  <div style={{ order: 1, ...styles.cbR0909 }}>Item 2. $</div>
                  <div style={{ order: 2, flexGrow: 0, flexBasis: "10em", ...styles.cbR0909 }}>
                    <Field
                      type="text"
                      name="aw"
                      onChange={(e) => setFieldValue("aw", formatCurrency(e.target.value))}
                      value={values?.aw}
                    />
                    <span>{values?.aw}</span>
                  </div>
                  <div style={{ order: 3 }}>on</div>
                  <div style={{ order: 4, flexGrow: 1 }}>
                    <Field type="text" name="ax" style={{ ...styles.cbR0909 }} />
                    <span style={{ ...styles.cbR0909 }}>{values?.ax}</span>
                  </div>
                </div>
                {/* **** Item 3 **** */}
                <div className="formRow" style={{ ...styles.cbR0909 }}>
                  <div style={{ order: 1, ...styles.cbR0909 }}>Item 3. $</div>
                  <div style={{ order: 2, flexGrow: 0, flexBasis: "10em", ...styles.cbR0909 }}>
                    <Field
                      type="text"
                      name="ay"
                      onChange={(e) => setFieldValue("ay", formatCurrency(e.target.value))}
                      value={values?.ay}
                    />
                    <span>{values?.ay}</span>
                  </div>
                  <div style={{ order: 3, ...styles.cbR0909 }}>on</div>
                  <div style={{ order: 4, flexGrow: 1 }}>
                    <Field type="text" name="az" style={{ ...styles.cbR0909 }} />
                    <span style={{ ...styles.cbR0909 }}>{values?.az}</span>
                  </div>
                </div>
                {/* **** Item 4 **** */}
                <div className="formRow" style={{ ...styles.cbR0909 }}>
                  <div style={{ order: 1, ...styles.cbR0909 }}>Item 4. $</div>
                  <div style={{ order: 2, flexGrow: 0, flexBasis: "10em", ...styles.cbR0909 }}>
                    <Field
                      type="text"
                      name="ba"
                      onChange={(e) => setFieldValue("ba", formatCurrency(e.target.value))}
                      value={values?.ba}
                    />
                    <span>{values?.ba}</span>
                  </div>
                  <div style={{ order: 3, ...styles.cbR0909 }}>on</div>
                  <div style={{ order: 4, flexGrow: 1 }}>
                    <Field type="text" name="bb" style={{ ...styles.cbR0909 }} />
                    <span style={{ ...styles.cbR0909 }}>{values?.bb}</span>
                  </div>
                </div>
                {/* **** Situated **** */}
                <div className="formRow" style={{ ...styles.cbR0909 }}>
                  <div style={{ order: 1, ...styles.cbR0909 }}>Situated</div>
                  <div style={{ order: 2, flexGrow: 1 }}>
                    {/* 
                  ============================================================================
                  ============================================================================
                  */}
                    <Field type="text" name="ef" style={{ ...styles.cbR0909 }} />
                    <span style={{ ...styles.cbR0909 }}>{values?.ef}</span>
                  </div>
                </div>
                {/* **** Coinsurance, Average, Distribution or Deductible Clauses, if any **** */}
                <div className="formRow" style={{ ...styles.cbR0909 }}>
                  <div style={{ order: 1, ...styles.cbR0909 }}>
                    Coinsurance, Average, Distribution or Deductible Clauses, if any
                  </div>
                  <div style={{ order: 2, flexGrow: 1 }}>
                    <Field type="text" name="bc" style={{ ...styles.cbR0909 }} />
                    <span style={{ ...styles.cbR0909 }}>{values?.bc}</span>
                  </div>
                </div>
                {/* **** Loss, if any, payable to **** */}
                <div className="formRow" style={{ ...styles.cbR0909 }}>
                  <div style={{ order: 1, ...styles.cbR0909 }}>Loss, if any, payable to</div>
                  <div style={{ order: 2, flexGrow: 1 }}>
                    <Field type="text" name="bd" style={{ ...styles.cbR0909 }} />
                    <span style={{ ...styles.cbR0909 }}>{values?.bd}</span>
                  </div>
                </div>
                <div className="clear" />
                {/* **** SCHEDULE "B" **** */}
                <div className="formRow topMargin20 bottomMargin5">
                  <div style={{ order: 1, textAlign: "center", flexGrow: 1, ...styles.cbB11 }}>
                    <>SCHEDULE &quot;B&quot;</>
                  </div>
                </div>
                <div className="formRow bottomMargin5">
                  <div style={{ order: 1, textAlign: "center", flexGrow: 1, ...styles.cbB11 }}>
                    <>STATEMENT OF ACTUAL CASH VALUE AND LOSS AND DAMAGE</>
                  </div>
                </div>
                <div className="formRow">
                  <table style={{ border: "1px solid black", width: "100%" }}>
                    <tbody>
                      <tr style={{ borderTopStyle: "double", height: "2.5em", ...styles.cbR0909 }}>
                        <td className="formTableHeaderCell" />
                        <td className="formTableHeaderCell" />
                        <td className="formTableHeaderCell text-center" style={{ ...styles.cbB11 }}>
                          ACTUAL CASH VALUE
                        </td>
                        <td className="formTableHeaderCell text-center" style={{ ...styles.cbB11 }}>
                          LOSS AND DAMAGE
                        </td>
                      </tr>
                    </tbody>
                    <tbody>
                      <tr>
                        <td className="formTableCell width10pc" style={{ ...styles.cbR0909 }}>
                          <Field type="text" className="width100pc" name="be" />
                          <span style={{ ...styles.cbR0909 }}>{values?.be}</span>
                        </td>
                        <td className="formTableCell width60pc">
                          <Field
                            type="text"
                            className="width100pc"
                            name="bf"
                            style={{ ...styles.cbR0909 }}
                          />
                          <span style={{ ...styles.cbR0909 }} className="printNumeric">
                            {values?.bf}
                          </span>
                        </td>
                        <td className="formTableCell width15pc" style={{ ...styles.cbR0909 }}>
                          <Field
                            type="text"
                            className="width100pc"
                            name="bg"
                            style={{ ...styles.cbR0909 }}
                            // onChange={(e) => setFieldValue("bg", formatCurrency(e.target.value))}
                            // value={values?.bg}
                          />
                          <div className=" printNumeric numeric" style={{ ...styles.cbR0909 }}>
                            {values?.bg}
                          </div>
                        </td>
                        <td className="formTableCell width15pc" style={{ ...styles.cbR0909 }}>
                          <Field
                            type="text"
                            className="width100pc numeric"
                            name="bh"
                            style={{ ...styles.cbR0909 }}
                            onChange={(e) =>
                              setFieldValue("bh", formatCurrencyWithDollarSign(e.target.value))
                            }
                            value={values?.bh}
                          />
                          <div className="numeric printNumeric" style={{ ...styles.cbR0909 }}>
                            {values?.bh}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="formTableCell width10pc" style={{ ...styles.cbR0909 }}>
                          <Field
                            type="text"
                            className="width100pc"
                            name="bi"
                            style={{ ...styles.cbR0909 }}
                          />
                          <span style={{ ...styles.cbR0909 }}>{values?.bi}</span>
                        </td>
                        <td className="formTableCell width60pc" style={{ ...styles.cbR0909 }}>
                          <Field
                            type="text"
                            className="width100pc"
                            name="bj"
                            style={{ ...styles.cbR0909 }}
                          />
                          <span style={{ ...styles.cbR0909 }}>{values?.bj}</span>
                        </td>
                        <td className="formTableCell width15pc" style={{ ...styles.cbR0909 }}>
                          <Field
                            type="text"
                            className="width100pc"
                            style={{ ...styles.cbR0909 }}
                            name="bk"
                            // onChange={(e) => setFieldValue("bk", formatCurrency(e.target.value))}
                            // value={values?.bk}
                          />
                          <div className="numeric printNumeric" style={{ ...styles.cbR0909 }}>
                            {values?.bk}
                          </div>
                        </td>
                        <td className="formTableCell width15pc" style={{ ...styles.cbR0909 }}>
                          <Field
                            type="text"
                            className="width100pc numeric"
                            style={{ ...styles.cbR0909 }}
                            name="bl"
                            onChange={(e) =>
                              setFieldValue("bl", formatCurrencyWithDollarSign(e.target.value))
                            }
                            value={values?.bl}
                          />
                          <div className="numeric printNumeric" style={{ ...styles.cbR0909 }}>
                            {values?.bl}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="formTableCell width10pc" style={{ ...styles.cbR0909 }}>
                          <Field
                            type="text"
                            className="width100pc"
                            name="bm"
                            style={{ ...styles.cbR0909 }}
                          />
                          <span style={{ ...styles.cbR0909 }}>{values?.bm}</span>
                        </td>
                        <td className="formTableCell width60pc" style={{ ...styles.cbR0909 }}>
                          <Field
                            type="text"
                            className="width100pc"
                            name="bn"
                            style={{ ...styles.cbR0909 }}
                          />
                          <span style={{ ...styles.cbR0909 }}>{values?.bn}</span>
                        </td>
                        <td className="formTableCell width15pc" style={{ ...styles.cbR0909 }}>
                          <Field
                            type="text"
                            className="width100pc"
                            name="bo"
                            style={{ ...styles.cbR0909 }}
                            // onChange={(e) => setFieldValue("bo", formatCurrency(e.target.value))}
                            // value={values?.bo}
                          />
                          <div className="numeric printNumeric" style={{ ...styles.cbR0909 }}>
                            {values?.bo}
                          </div>
                        </td>
                        <td className="formTableCell width15pc" style={{ ...styles.cbR0909 }}>
                          <Field
                            type="text"
                            className="width100pc numeric"
                            name="bp"
                            style={{ ...styles.cbR0909 }}
                            onChange={(e) =>
                              setFieldValue("bp", formatCurrencyWithDollarSign(e.target.value))
                            }
                            value={values?.bp}
                          />
                          <div className="numeric printNumeric" style={{ ...styles.cbR0909 }}>
                            {values?.bp}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="formTableCell width10pc" style={{ ...styles.cbR0909 }}>
                          <Field
                            type="text"
                            className="width100pc"
                            name="bq"
                            style={{ ...styles.cbR0909 }}
                          />
                          <span style={{ ...styles.cbR0909 }}>{values?.bq}</span>
                        </td>
                        <td className="formTableCell width60pc" style={{ ...styles.cbR0909 }}>
                          <Field
                            type="text"
                            className="width100pc"
                            name="br"
                            style={{ ...styles.cbR0909 }}
                          />
                          <span style={{ ...styles.cbR0909 }}>{values?.br}</span>
                        </td>
                        <td className="formTableCell width15pc" style={{ ...styles.cbR0909 }}>
                          <Field
                            type="text"
                            className="width100pc "
                            name="bs"
                            style={{ ...styles.cbR0909 }}
                            // onChange={(e) => setFieldValue("bs", formatCurrency(e.target.value))}
                            // value={values?.bs}
                          />
                          <div className="numeric printNumeric" style={{ ...styles.cbR0909 }}>
                            {values?.bs}
                          </div>
                        </td>
                        <td className="formTableCell width15pc" style={{ ...styles.cbR0909 }}>
                          <Field
                            type="text"
                            className="width100pc numeric"
                            name="bt"
                            style={{ ...styles.cbR0909 }}
                            onChange={(e) =>
                              setFieldValue("bt", formatCurrencyWithDollarSign(e.target.value))
                            }
                            value={values?.bt}
                          />
                          <div className="numeric printNumeric" style={{ ...styles.cbR0909 }}>
                            {values?.bt}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="formTableCell width10pc" style={{ ...styles.cbR0909 }}>
                          <Field
                            type="text"
                            className="width100pc"
                            name="bu"
                            style={{ ...styles.cbR0909 }}
                          />
                          <span style={{ ...styles.cbR0909 }}>{values?.bu}</span>
                        </td>
                        <td className="formTableCell width60pc" style={{ ...styles.cbR0909 }}>
                          <Field
                            type="text"
                            className="width100pc"
                            name="bv"
                            style={{ ...styles.cbR0909 }}
                          />
                          <span style={{ ...styles.cbR0909 }}>{values?.bv}</span>
                        </td>
                        <td className="formTableCell width15pc" style={{ ...styles.cbR0909 }}>
                          <Field
                            type="text"
                            className="width100pc"
                            name="bw"
                            style={{ ...styles.cbR0909 }}
                            // onChange={(e) => setFieldValue("bw", formatCurrency(e.target.value))}
                            // value={values?.bw}
                          />
                          <div className="printNumeric numeric" style={{ ...styles.cbR0909 }}>
                            {values?.bw}
                          </div>
                        </td>
                        <td className="formTableCell width15pc" style={{ ...styles.cbR0909 }}>
                          <Field
                            type="text"
                            className="width100pc numeric"
                            name="bx"
                            style={{ ...styles.cbR0909 }}
                            onChange={(e) =>
                              setFieldValue("bx", formatCurrencyWithDollarSign(e.target.value))
                            }
                            value={values?.bx}
                          />
                          <div className="numeric printNumeric" style={{ ...styles.cbR0909 }}>
                            {values?.bx}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="formTableCell width10pc" style={{ ...styles.cbR0909 }}>
                          <Field
                            type="text"
                            className="width100pc"
                            name="by"
                            style={{ ...styles.cbR0909 }}
                          />
                          <span style={{ ...styles.cbR0909 }}>{values?.by}</span>
                        </td>
                        <td className="formTableCell width60pc" style={{ ...styles.cbR0909 }}>
                          <Field
                            type="text"
                            className="width100pc"
                            name="bz"
                            style={{ ...styles.cbR0909 }}
                          />
                          <span style={{ ...styles.cbR0909 }}>{values?.bz}</span>
                        </td>
                        <td className="formTableCell width15pc" style={{ ...styles.cbR0909 }}>
                          <Field
                            type="text"
                            className="width100pc"
                            name="ca"
                            style={{ ...styles.cbR0909 }}
                            // onChange={(e) => setFieldValue("ca", formatCurrency(e.target.value))}
                            // value={values?.ca}
                          />
                          <div className="numeric printNumeric" style={{ ...styles.cbR0909 }}>
                            {values?.ca}
                          </div>
                        </td>
                        <td className="formTableCell width15pc" style={{ ...styles.cbR0909 }}>
                          <Field
                            type="text"
                            className="width100pc numeric"
                            style={{ ...styles.cbR0909 }}
                            name="cb"
                            onChange={(e) =>
                              setFieldValue("cb", formatCurrencyWithDollarSign(e.target.value))
                            }
                            value={values?.cb}
                          />
                          <div className="numeric printNumeric" style={{ ...styles.cbR0909 }}>
                            {values?.cb}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="formTableCell width10pc" style={{ ...styles.cbR0909 }}>
                          <Field
                            type="text"
                            className="width100pc"
                            name="cc"
                            style={{ ...styles.cbR0909 }}
                          />
                          <span style={{ ...styles.cbR0909 }}>{values?.cc}</span>
                        </td>
                        <td className="formTableCell width60pc" style={{ ...styles.cbR0909 }}>
                          <Field
                            type="text"
                            className="width100pc"
                            name="cd"
                            style={{ ...styles.cbR0909 }}
                          />
                          <span style={{ ...styles.cbR0909 }}>{values?.cd}</span>
                        </td>
                        <td className="formTableCell width15pc" style={{ ...styles.cbR0909 }}>
                          <Field
                            type="text"
                            className="width100pc"
                            name="ce"
                            style={{ ...styles.cbR0909 }}
                            // onChange={(e) => setFieldValue("ce", formatCurrency(e.target.value))}
                            // value={values?.ce}
                          />
                          <div className="numeric printNumeric" style={{ ...styles.cbR0909 }}>
                            {values?.ce}
                          </div>
                        </td>
                        <td className="formTableCell width15pc" style={{ ...styles.cbR0909 }}>
                          <Field
                            type="text"
                            className="width100pc numeric"
                            name="cf"
                            style={{ ...styles.cbR0909 }}
                            onChange={(e) =>
                              setFieldValue("cf", formatCurrencyWithDollarSign(e.target.value))
                            }
                            value={values?.cf}
                          />
                          <div className="numeric printNumeric" style={{ ...styles.cbR0909 }}>
                            {values?.cf}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                    <tfoot style={{ borderBottomStyle: "double", height: "2em" }}>
                      <tr>
                        <td className="formTableFooterCell width10pc" style={{ ...styles.cbB16 }}>
                          <>Totals</>
                        </td>
                        <td className="formTableFooterCell width60pc" style={{ ...styles.cbR0909 }}>
                          <Field
                            type="text"
                            className="width100pc"
                            name="cg"
                            style={{ ...styles.cbR0909 }}
                          />
                          <span style={{ ...styles.cbR0909 }}>{values?.cg}</span>
                        </td>
                        {/* 
                  ============================================================================
                  ============================================================================
                  */}
                        <td className="formTableFooterCell width15pc" style={{ ...styles.cbR0909 }}>
                          <Field
                            type="text"
                            className="width100pc"
                            style={{ ...styles.cbR0909 }}
                            name="dx"
                            // onChange={(e) => setFieldValue("dx", formatCurrency(e.target.value))}
                            // value={values?.dx}
                          />
                          <div className="numeric printNumeric" style={{ ...styles.cbR0909 }}>
                            {values?.dx}
                          </div>
                        </td>
                        <td className="formTableFooterCell width15pc" style={{ ...styles.cbR0909 }}>
                          <Field
                            type="text"
                            className="width100pc numeric"
                            name="dy"
                            style={{ ...styles.cbR0909 }}
                            onChange={(e) =>
                              setFieldValue("dy", formatCurrencyWithDollarSign(e.target.value))
                            }
                            value={values?.dy}
                          />
                          <div className="numeric printNumeric" style={{ ...styles.cbR0909 }}>
                            {values?.dy}
                          </div>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                {/* **** SCHEDULE "C" - APPORTIONMENT **** */}
                <div className="formRow topMargin20 bottomMargin5">
                  <div style={{ order: 1, textAlign: "center", flexGrow: 1, ...styles.cbB11 }}>
                    <>SCHEDULE &quot;C&quot; - APPORTIONMENT</>
                  </div>
                </div>
                <div className="formRow " style={{ ...styles.cbR0909 }}>
                  <table style={{ border: "1px solid black", width: "100%" }}>
                    <tbody style={{ ...styles.cbR0909 }}>
                      <tr style={{ borderTopStyle: "double", height: "2.5em" }}>
                        <th className="formTableHeaderCell text-center" style={{ ...styles.cbB11 }}>
                          POLICY NO.
                        </th>
                        <th className="formTableHeaderCell text-center" style={{ ...styles.cbB11 }}>
                          EXPIRES
                        </th>
                        <th className="formTableHeaderCell text-center" style={{ ...styles.cbB11 }}>
                          NAME OF COMPANY
                        </th>
                        <th
                          className="formTableHeaderCell text-center"
                          colSpan={2}
                          style={{ ...styles.cbB11 }}
                        >
                          ITEM NO.
                        </th>
                        <th
                          className="formTableHeaderCell text-center"
                          colSpan={2}
                          style={{ ...styles.cbB11 }}
                        >
                          ITEM NO.
                        </th>
                      </tr>
                      <tr style={{ height: "1.5em" }}>
                        <th
                          className="formTableHeaderCell"
                          style={{ borderTop: "none", ...styles.cbR0909 }}
                        />
                        <th
                          className="formTableHeaderCell"
                          style={{ borderTop: "none", ...styles.cbR0909 }}
                        />
                        <th
                          className="formTableHeaderCell"
                          style={{ borderTop: "none", ...styles.cbR0909 }}
                        />
                        <th className="formTableHeaderCell text-center" style={{ ...styles.cbB11 }}>
                          INSURES
                        </th>
                        <th className="formTableHeaderCell text-center" style={{ ...styles.cbB11 }}>
                          PAYS
                        </th>
                        <th className="formTableHeaderCell text-center" style={{ ...styles.cbB11 }}>
                          INSURES
                        </th>
                        <th className="formTableHeaderCell text-center" style={{ ...styles.cbB11 }}>
                          PAYS
                        </th>
                      </tr>
                    </tbody>
                    <tbody>
                      {/* 
                  ============================================================================
                  ============================================================================
                  */}
                      <tr style={{ ...styles.cbR0909 }}>
                        <td className="formTableCell width10pc" style={{ ...styles.cbR0909 }}>
                          <Field
                            type="text"
                            className="width100pc"
                            name="ed"
                            style={{ ...styles.cbR0909 }}
                          />
                          <span style={{ ...styles.cbR0909 }}>{values?.ed}</span>
                        </td>
                        <td className="formTableCell width10pc" style={{ ...styles.cbR0909 }}>
                          <Field
                            type="text"
                            className="width100pc"
                            name="ch"
                            style={{ ...styles.cbR0909 }}
                          />
                          <span style={{ ...styles.cbR0909 }}>{values?.ch}</span>
                        </td>
                        <td className="formTableCell width40pc" style={{ ...styles.cbR0909 }}>
                          <Field
                            type="text"
                            className="width100pc"
                            name="ci"
                            style={{ ...styles.cbR0909 }}
                          />
                          <span style={{ ...styles.cbR0909 }}>{values?.ci}</span>
                        </td>
                        <td className="formTableCell width10pc" style={{ ...styles.cbR0909 }}>
                          <Field
                            type="text"
                            className="width100pc numeric-left"
                            name="cj"
                            style={{ ...styles.cbR0909 }}
                            onChange={(e) => setFieldValue("cj", formatCurrency(e.target.value))}
                            value={values?.cj}
                          />
                          <div className="numeric printNumeric" style={{ ...styles.cbR0909 }}>
                            {values?.cj}
                          </div>
                        </td>
                        <td className="formTableCell width10pc" style={{ ...styles.cbR0909 }}>
                          <Field
                            type="text"
                            className="width100pc numeric-left"
                            name="ck"
                            style={{ ...styles.cbR0909 }}
                            onChange={(e) => setFieldValue("ck", formatCurrency(e.target.value))}
                            value={values?.ck}
                          />
                          <div className="numeric printNumeric" style={{ ...styles.cbR0909 }}>
                            {values?.ck}
                          </div>
                        </td>
                        <td className="formTableCell width10pc" style={{ ...styles.cbR0909 }}>
                          <Field
                            type="text"
                            className="width100pc numeric-left"
                            name="cl"
                            style={{ ...styles.cbR0909 }}
                            onChange={(e) => setFieldValue("cl", formatCurrency(e.target.value))}
                            value={values?.cl}
                          />
                          <div className="numeric printNumeric" style={{ ...styles.cbR0909 }}>
                            {values?.cl}
                          </div>
                        </td>
                        <td className="formTableCell width10pc" style={{ ...styles.cbR0909 }}>
                          <Field
                            type="text"
                            className="width100pc numeric-left"
                            name="cm"
                            style={{ ...styles.cbR0909 }}
                            onChange={(e) => setFieldValue("cm", formatCurrency(e.target.value))}
                            value={values?.cm}
                          />
                          <div className="numeric printNumeric" style={{ ...styles.cbR0909 }}>
                            {values?.cm}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="formTableCell width10pc" style={{ ...styles.cbR0909 }}>
                          <Field
                            type="text"
                            className="width100pc"
                            name="cn"
                            style={{ ...styles.cbR0909 }}
                          />
                          <span style={{ ...styles.cbR0909 }}>{values?.cn}</span>
                        </td>
                        <td className="formTableCell width10pc" style={{ ...styles.cbR0909 }}>
                          <Field
                            type="text"
                            className="width100pc"
                            name="co"
                            style={{ ...styles.cbR0909 }}
                          />
                          <span style={{ ...styles.cbR0909 }}>{values?.co}</span>
                        </td>
                        <td className="formTableCell width40pc" style={{ ...styles.cbR0909 }}>
                          <Field
                            type="text"
                            className="width100pc"
                            name="cp"
                            style={{ ...styles.cbR0909 }}
                          />
                          <span style={{ ...styles.cbR0909 }}>{values?.cp}</span>
                        </td>
                        <td className="formTableCell width10pc" style={{ ...styles.cbR0909 }}>
                          <Field
                            type="text"
                            className="width100pc numeric-left"
                            name="cq"
                            style={{ ...styles.cbR0909 }}
                            onChange={(e) => setFieldValue("cq", formatCurrency(e.target.value))}
                            value={values?.cq}
                          />
                          <div className="numeric printNumeric" style={{ ...styles.cbR0909 }}>
                            {values?.cq}
                          </div>
                        </td>
                        <td className="formTableCell width10pc" style={{ ...styles.cbR0909 }}>
                          <Field
                            type="text"
                            className="width100pc numeric-left"
                            name="cr"
                            style={{ ...styles.cbR0909 }}
                            onChange={(e) => setFieldValue("cr", formatCurrency(e.target.value))}
                            value={values?.cr}
                          />
                          <div className="numeric printNumeric" style={{ ...styles.cbR0909 }}>
                            {values?.cr}
                          </div>
                        </td>
                        <td className="formTableCell width10pc" style={{ ...styles.cbR0909 }}>
                          <Field
                            type="text"
                            className="width100pc numeric-left"
                            name="cs"
                            style={{ ...styles.cbR0909 }}
                            onChange={(e) => setFieldValue("cs", formatCurrency(e.target.value))}
                            value={values?.cs}
                          />
                          <div className="numeric printNumeric" style={{ ...styles.cbR0909 }}>
                            {values?.cs}
                          </div>
                        </td>
                        <td className="formTableCell width10pc" style={{ ...styles.cbR0909 }}>
                          <Field
                            type="text"
                            className="width100pc numeric-left"
                            name="ct"
                            style={{ ...styles.cbR0909 }}
                            onChange={(e) => setFieldValue("ct", formatCurrency(e.target.value))}
                            value={values?.ct}
                          />
                          <div className="numeric printNumeric" style={{ ...styles.cbR0909 }}>
                            {values?.ct}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="formTableCell width10pc" style={{ ...styles.cbR0909 }}>
                          <Field
                            type="text"
                            className="width100pc"
                            name="cu"
                            style={{ ...styles.cbR0909 }}
                          />
                          <span style={{ ...styles.cbR0909 }}>{values?.cu}</span>
                        </td>
                        <td className="formTableCell width10pc">
                          <Field
                            type="text"
                            className="width100pc"
                            name="cv"
                            style={{ ...styles.cbR0909 }}
                          />
                          <span style={{ ...styles.cbR0909 }}>{values?.cv}</span>
                        </td>
                        <td className="formTableCell width40pc" style={{ ...styles.cbR0909 }}>
                          <Field
                            type="text"
                            className="width100pc"
                            name="cw"
                            style={{ ...styles.cbR0909 }}
                          />
                          <span>{values?.cw}</span>
                        </td>
                        <td className="formTableCell width10pc" style={{ ...styles.cbR0909 }}>
                          <Field
                            type="text"
                            className="width100pc numeric-left"
                            name="cx"
                            style={{ ...styles.cbR0909 }}
                            onChange={(e) => setFieldValue("cx", formatCurrency(e.target.value))}
                            value={values?.cx}
                          />
                          <div className="numeric printNumeric" style={{ ...styles.cbR0909 }}>
                            {values?.cx}
                          </div>
                        </td>
                        <td className="formTableCell width10pc" style={{ ...styles.cbR0909 }}>
                          <Field
                            type="text"
                            className="width100pc numeric-left"
                            name="cy"
                            style={{ ...styles.cbR0909 }}
                            onChange={(e) => setFieldValue("cy", formatCurrency(e.target.value))}
                            value={values?.cy}
                          />
                          <div className="numeric printNumeric" style={{ ...styles.cbR0909 }}>
                            {values?.cy}
                          </div>
                        </td>
                        <td className="formTableCell width10pc" style={{ ...styles.cbR0909 }}>
                          <Field
                            type="text"
                            className="width100pc numeric-left"
                            name="cz"
                            style={{ ...styles.cbR0909 }}
                            onChange={(e) => setFieldValue("cz", formatCurrency(e.target.value))}
                            value={values?.cz}
                          />
                          <div className="numeric printNumeric" style={{ ...styles.cbR0909 }}>
                            {values?.cz}
                          </div>
                        </td>
                        <td className="formTableCell width10pc" style={{ ...styles.cbR0909 }}>
                          <Field
                            type="text"
                            className="width100pc numeric-left"
                            name="da"
                            style={{ ...styles.cbR0909 }}
                            onChange={(e) => setFieldValue("da", formatCurrency(e.target.value))}
                            value={values?.da}
                          />
                          <div className="numeric printNumeric" style={{ ...styles.cbR0909 }}>
                            {values?.da}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="formTableCell width10pc" style={{ ...styles.cbR0909 }}>
                          <Field
                            type="text"
                            className="width100pc"
                            name="db"
                            style={{ ...styles.cbR0909 }}
                          />
                          <span style={{ ...styles.cbR0909 }}>{values?.db}</span>
                        </td>
                        <td className="formTableCell width10pc" style={{ ...styles.cbR0909 }}>
                          <Field
                            type="text"
                            className="width100pc"
                            name="dc"
                            style={{ ...styles.cbR0909 }}
                          />
                          <span style={{ ...styles.cbR0909 }}>{values?.dc}</span>
                        </td>
                        <td className="formTableCell width40pc" style={{ ...styles.cbR0909 }}>
                          <Field
                            type="text"
                            className="width100pc"
                            name="dd"
                            style={{ ...styles.cbR0909 }}
                          />
                          <span style={{ ...styles.cbR0909 }}>{values?.dd}</span>
                        </td>
                        <td className="formTableCell width10pc" style={{ ...styles.cbR0909 }}>
                          <Field
                            type="text"
                            className="width100pc numeric-left"
                            name="de"
                            style={{ ...styles.cbR0909 }}
                            onChange={(e) => setFieldValue("de", formatCurrency(e.target.value))}
                            value={values?.de}
                          />
                          <div className="numeric printNumeric" style={{ ...styles.cbR0909 }}>
                            {values?.de}
                          </div>
                        </td>
                        <td className="formTableCell width10pc" style={{ ...styles.cbR0909 }}>
                          <Field
                            type="text"
                            className="width100pc numeric-left"
                            name="df"
                            style={{ ...styles.cbR0909 }}
                            onChange={(e) => setFieldValue("df", formatCurrency(e.target.value))}
                            value={values?.df}
                          />
                          <div className="numeric printNumeric" style={{ ...styles.cbR0909 }}>
                            {values?.df}
                          </div>
                        </td>
                        <td className="formTableCell width10pc" style={{ ...styles.cbR0909 }}>
                          <Field
                            type="text"
                            className="width100pc numeric-left"
                            name="dg"
                            style={{ ...styles.cbR0909 }}
                            onChange={(e) => setFieldValue("dg", formatCurrency(e.target.value))}
                            value={values?.dg}
                          />
                          <div className="numeric printNumeric">{values?.dg}</div>
                        </td>
                        <td className="formTableCell width10pc">
                          <Field
                            type="text"
                            className="width100pc numeric-left"
                            name="dh"
                            style={{ ...styles.cbR0909 }}
                            onChange={(e) => setFieldValue("dh", formatCurrency(e.target.value))}
                            value={values?.dh}
                          />
                          <div className="numeric printNumeric" style={{ ...styles.cbR0909 }}>
                            {values?.dh}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                    <tfoot style={{ borderBottomStyle: "double", height: "2em" }}>
                      <tr>
                        <td className="formTableFooterCell width10pc" style={{ ...styles.cbB16 }}>
                          <>Totals</>
                        </td>
                        <td className="formTableFooterCell width10pc" style={{ ...styles.cbR0909 }}>
                          <Field
                            type="text"
                            className="width100pc"
                            name="di"
                            style={{ ...styles.cbR0909 }}
                          />
                          <span style={{ ...styles.cbR0909 }}>{values?.di}</span>
                        </td>
                        <td className="formTableFooterCell width40pc" style={{ ...styles.cbR0909 }}>
                          <Field
                            type="text"
                            className="width100pc"
                            name="dj"
                            style={{ ...styles.cbR0909 }}
                          />
                          <span style={{ ...styles.cbR0909 }}>{values?.dj}</span>
                        </td>
                        {/* 
                  ============================================================================
                  ============================================================================
                  */}
                        <td className="formTableFooterCell width10pc" style={{ ...styles.cbR0909 }}>
                          <Field
                            type="text"
                            className="width100pc numeric-left"
                            name="dz"
                            onChange={(e) => setFieldValue("dz", formatCurrency(e.target.value))}
                            value={values?.dz}
                            style={{ ...styles.cbR0909 }}
                          />
                          <div className="numeric printNumeric" style={{ ...styles.cbR0909 }}>
                            {values?.dz}
                          </div>
                        </td>
                        <td className="formTableFooterCell width10pc" style={{ ...styles.cbR0909 }}>
                          <Field
                            type="text"
                            style={{ ...styles.cbR0909 }}
                            className="width100pc numeric-left"
                            name="ea"
                            onChange={(e) => setFieldValue("ea", formatCurrency(e.target.value))}
                            value={values?.ea}
                          />
                          <div className="numeric printNumeric" style={{ ...styles.cbR0909 }}>
                            {values?.ea}
                          </div>
                        </td>
                        <td className="formTableFooterCell width10pc" style={{ ...styles.cbR0909 }}>
                          <Field
                            type="text"
                            className="width100pc numeric-left"
                            style={{ ...styles.cbR0909 }}
                            name="eb"
                            onChange={(e) => setFieldValue("eb", formatCurrency(e.target.value))}
                            value={values?.eb}
                          />
                          <div className="numeric printNumeric" style={{ ...styles.cbR0909 }}>
                            {values?.eb}
                          </div>
                        </td>
                        <td className="formTableFooterCell width10pc" style={{ ...styles.cbR0909 }}>
                          <Field
                            type="text"
                            className="width100pc numeric-left"
                            name="ec"
                            onChange={(e) => setFieldValue("ec", formatCurrency(e.target.value))}
                            value={values?.ec}
                            style={{ ...styles.cbR0909 }}
                          />
                          <div className="numeric printNumeric" style={{ ...styles.cbR0909 }}>
                            {values?.ec}
                          </div>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                {/* **** Adjuster **** */}
                <div
                  className="formRow topMargin15"
                  style={{ width: "50%", float: "right", ...styles.cbR0909 }}
                >
                  <div style={{ order: 1, flexGrow: 1 }}>
                    <Field type="text" name="dk" style={{ ...styles.cbR0909 }} />
                    <span style={{ ...styles.cbR0909 }}>{values?.dk}</span>
                  </div>
                  <div style={{ order: 2, ...styles.cbR0909 }}> Adjuster</div>
                </div>
                <div className="clear" />
                {/* **** RECEIPT FOR PAYMENT **** */}
                <div className="formRow topMargin15 bottomMargin10">
                  <div style={{ order: 1, textAlign: "center", flexGrow: 1, ...styles.cbB11 }}>
                    <>RECEIPT FOR PAYMENT</>
                  </div>
                </div>
                <div className="formRow" style={{ ...styles.cbR0909 }}>
                  <div style={{ order: 1, ...styles.cbR0909 }}>Received of</div>
                  <div style={{ order: 2, flexGrow: 1, flexBasis: "10em", ...styles.cbR0909 }}>
                    <Field type="text" name="dl" style={{ ...styles.cbR0909 }} />
                    <span style={{ ...styles.cbR0909 }}>{values?.dl}</span>
                  </div>
                  <div style={{ order: 3, ...styles.cbR0909 }}>(insurer) of</div>
                  <div style={{ order: 4, flexGrow: 0, flexBasis: "20em", ...styles.cbR0909 }}>
                    <Field type="text" name="dm" style={{ ...styles.cbR0909 }} />
                    <span style={{ ...styles.cbR0909 }}>{values?.dm}</span>
                  </div>
                </div>
                <div className="formRow" style={{ ...styles.cbR0909 }}>
                  <div style={{ order: 1, flexGrow: 1, flexBasis: "10em", ...styles.cbR0909 }}>
                    <Field type="text" name="dn" style={{ ...styles.cbR0909 }} />
                    <span style={{ ...styles.cbR0909 }}>{values?.dn}</span>
                  </div>
                  <div style={{ order: 2, ...styles.cbR0909 }}>Dollars ($</div>
                  <div style={{ order: 3, flexGrow: 0, flexBasis: "10em", ...styles.cbR0909 }}>
                    <Field
                      type="text"
                      name="dp"
                      onChange={(e) => setFieldValue("dp", formatCurrency(e.target.value))}
                      value={values?.dp}
                      style={{ ...styles.cbR0909 }}
                    />
                    <span style={{ ...styles.cbR0909 }}>{values?.dp}</span>
                  </div>
                  <div style={{ order: 4, ...styles.cbR0909 }}>)</div>
                </div>
                <div className="formRow" style={{ ...styles.cbR0909 }}>
                  <div style={{ order: 1, flexGrow: 1, ...styles.cbR0909 }}>
                    in full satisfaction and indemnity for all claims and demands upon said company
                    on account of said loss and damage and the
                  </div>
                </div>
                <div className="formRow" style={{ ...styles.cbR0909 }}>
                  <div style={{ order: 1, ...styles.cbR0909 }}>said policy is hereby</div>
                  <div style={{ order: 2, flexGrow: 1, flexBasis: "10em", ...styles.cbR0909 }}>
                    <Field type="text" name="dq" style={{ ...styles.cbR0909 }} />
                    <span style={{ ...styles.cbR0909 }}>{values?.dq}</span>
                  </div>
                  <div style={{ order: 3, ...styles.cbR0909 }}>
                    (State whether <strong>Reduced, Reduced and Reinstated</strong> or
                    <strong>Canceled</strong> by payment.)
                  </div>
                </div>
                <div className="formRow topMargin" style={{ ...styles.cbR0909 }} />
                {/* The insured */}
                <div className="formRow" style={{ ...styles.cbR0909 }}>
                  <div style={{ order: 1, ...styles.cbR0909 }}>Dated</div>
                  <div style={{ order: 2, flexGrow: 1, flexBasis: "15em", ...styles.cbR0909 }}>
                    <Field type="text" name="dr" style={{ ...styles.cbR0909 }} />
                    <span style={{ ...styles.cbR0909 }}>{values?.dr}</span>
                  </div>
                  <div style={{ order: 3, ...styles.cbR0909 }}>20</div>
                  <div style={{ order: 4, flexGrow: 1, flexBasis: "5em", ...styles.cbR0909 }}>
                    <Field type="text" name="ds" style={{ ...styles.cbR0909 }} />
                    <span style={{ ...styles.cbR0909 }}>{values?.ds}</span>
                  </div>
                  <div style={{ order: 5, flexGrow: 0, flexBasis: "10em", ...styles.cbR0909 }} />
                  <div style={{ order: 6, flexGrow: 1, flexBasis: "20em", ...styles.cbR0909 }}>
                    <Field type="text" name="dt" style={{ ...styles.cbR0909 }} />
                    <span style={{ ...styles.cbR0909 }}>{values?.dt}</span>
                  </div>
                </div>
                <div className="formRow" style={{ justifyContent: "flex-end", ...styles.cbR0909 }}>
                  The Insured
                </div>
                {/* The Mortgagee */}
                <div className="formRow" style={{ ...styles.cbR0909 }}>
                  <div style={{ order: 1, ...styles.cbR0909 }}>Dated</div>
                  <div style={{ order: 2, flexGrow: 1, flexBasis: "15em", ...styles.cbR0909 }}>
                    <Field type="text" name="du" style={{ ...styles.cbR0909 }} />
                    <span style={{ ...styles.cbR0909 }}>{values?.du}</span>
                  </div>
                  <div style={{ order: 3, ...styles.cbR0909 }}>20</div>
                  <div style={{ order: 4, flexGrow: 1, flexBasis: "5em", ...styles.cbR0909 }}>
                    <Field type="text" name="dv" style={{ ...styles.cbR0909 }} />
                    <span style={{ ...styles.cbR0909 }}>{values?.dv}</span>
                  </div>
                  <div style={{ order: 5, flexGrow: 0, flexBasis: "10em", ...styles.cbR0909 }} />
                  <div style={{ order: 6, flexGrow: 1, flexBasis: "20em", ...styles.cbR0909 }}>
                    <Field type="text" name="dw" style={{ ...styles.cbR0909 }} />
                    <span style={{ ...styles.cbR0909 }}>{values?.dw}</span>
                  </div>
                </div>
                <div className="formRow" style={{ justifyContent: "flex-end", ...styles.cbR0909 }}>
                  The Mortgagee
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};
