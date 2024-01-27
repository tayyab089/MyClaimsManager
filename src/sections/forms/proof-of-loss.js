import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";

import { saveFormApi, updateFormApi } from "src/network/forms-api";

import { useDispatch } from "react-redux";
import { setAlertData } from "src/store/reducers/alert/thunks";
import { addFormToStore, updateFormInStore } from "src/store/reducers/forms/thunks";

export const ProofOfLoss = ({ formRef, claim, form, formName }) => {
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
    ah: "",
    ai: "",
    aj: "",
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
    cg: "",
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
          type: "ProofOfLoss",
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
        ah: "",
        ai: "",
        aj: "",
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
        cg: "",
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
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      innerRef={formRef}
      enableReinitialize={true}
    >
      {({ values }) => (
        <Form>
          <div id="ProofOfLoss">
            <div className="formContainer" style={{ padding: "0 .2in .2in .2in" }}>
              {/* ************************************************************************************************* */}
              {/* NOTE: Input fields do not render in the print layout since the content is not in the DOM */}
              {/* Hence there is a span for every input. In the @media print css inputs are hidden and spans shown */}
              {/* ************************************************************************************************* */}
              {/* **** SWORN STATEMENT IN PROOF OF LOSS **** */}
              <div className="formRowCentered">
                <div className="header">
                  <div style={{ order: 1 }}>SWORN STATEMENT IN PROOF OF LOSS</div>
                </div>
              </div>
              {/* **** Top section **** */}
              <div className="formRow">
                <div
                  className="formColumn"
                  style={{ flexBasis: "25%", flexGrow: 0, alignContent: "flex-start" }}
                >
                  <div className="formRow">
                    <Field type="text" name="a" />
                    <span>{values?.a}</span>
                  </div>
                  <div className="formRowCentered">POLICY NUMBER</div>
                  <div className="formRow">
                    <Field type="text" name="b" />
                    <span>{values?.b}</span>
                  </div>
                  <div className="formRowCentered" style={{ fontSize: "0.75em" }}>
                    AMOUNT OF POLICY AT TIME OF LOSS
                  </div>
                  <div className="formRow">
                    <Field type="text" name="c" />
                    <span>{values?.c}</span>
                  </div>
                  <div className="formRowCentered">DATE ISSUED</div>
                  <div className="formRow">
                    <Field type="text" name="d" />
                    <span>{values?.d}</span>
                  </div>
                  <div className="formRowCentered">DATE EXPIRES</div>
                </div>
                <div className="formTextBox">
                  ANY PERSON WHO KNOWINGLY AND WITH INTENT TO DEFRAUD ANY INSURANCE COMPANY OR OTHER
                  PERSON FILES A STATMENT OF CLAIM CONTAINING ANY MATERIALLY FALSE INFORMATION, OR
                  CONCEALS FOR THE PURPOSE OF MISLEADING, INFORMATION CONCERNING ANY FACT MATERIAL
                  THERETO, COMMITS A FRAUDULENT INSURANCE ACT, WHICH IS A CRIME.
                </div>
                <div
                  className="formColumn"
                  style={{ flexBasis: "25%", flexGrow: 0, alignContent: "flex-end" }}
                >
                  <div className="formRow">
                    <Field type="text" name="e" />
                    <span>{values?.e}</span>
                  </div>
                  <div className="formRowCentered">OUR FILE No.</div>
                  <div className="formRow">
                    <Field type="text" name="f" />
                    <span>{values?.f}</span>
                  </div>
                  <div className="formRowCentered">COMPANY CLAIM NO.</div>
                  <div className="formRow">
                    <Field type="text" name="g" />
                    <span>{values?.g}</span>
                  </div>
                  <div className="formRowCentered">AGENCY AT</div>
                  <div className="formRow">
                    <Field type="text" name="h" />
                    <span>{values?.h}</span>
                  </div>
                  <div className="formRowCentered">AGENT</div>
                </div>
              </div>
              {/* **** Text start **** */}
              <div className="formRow">
                <div style={{ order: 1 }}>To the</div>
                <div style={{ flexGrow: 1, order: 2 }}>
                  <Field type="text" name="i" />
                  <span>{values?.i}</span>
                </div>
              </div>
              <div className="formRow">
                <div style={{ order: 1 }}>of</div>
                <div style={{ flexGrow: 1, order: 2 }}>
                  <Field type="text" name="j" />
                  <span>{values?.j}</span>
                </div>
              </div>
              {/* At the time of loss */}
              <div className="formRow">
                <div style={{ order: 1 }}>
                  At the time of loss, by the above indicated policy of insurance you insured
                </div>
                <div style={{ flexGrow: 1, order: 2 }}>
                  <Field type="text" name="k" />
                  <span>{values?.k}</span>
                </div>
              </div>
              <div className="formRow">
                <div style={{ order: 1, flexGrow: 1 }}>
                  <Field type="text" name="ed" />
                  <span>{values?.d}</span>
                </div>
              </div>
              <div className="formRow">
                <div style={{ order: 1 }}>against loss by</div>
                <div style={{ flexGrow: 1, order: 2 }}>
                  <Field type="text" name="l" />
                  <span>{values?.l}</span>
                </div>
                <div style={{ order: 3 }}>
                  to the property described under schedule &quot;A&quot; according to
                </div>
              </div>
              <div className="formRow">
                <div style={{ order: 1 }}>
                  the terms and conditions of the said policy and all forms, endorsements, transfers
                  and assignments attached thereto
                </div>
              </div>
              {/* **** 1. Time and origin **** */}
              <div className="formRow topMargin10">
                <div style={{ order: 1 }}>
                  <strong>1. Time and Origin:</strong> A
                </div>
                <div style={{ flexGrow: 1, order: 2 }}>
                  <Field type="text" name="m" />
                  <span>{values?.m}</span>
                </div>
                <div style={{ order: 3 }}>loss occured about the hour of</div>
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
              <div className="formRow">
                <div style={{ order: 1 }}>on the</div>
                <div style={{ order: 2, flexGrow: 1, flexBasis: "1em" }}>
                  <Field type="text" name="p" />
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
              <div className="formRow">
                <div style={{ order: 1 }}>
                  <strong>2. Occupancy:</strong> The building described, or containing the property
                  described, was occupied at the time of the loss as follows,
                </div>
              </div>
              <div className="formRow">
                <div style={{ order: 1 }}>and for no other purpose whatever:</div>
                <div style={{ order: 2, flexGrow: 1 }}>
                  <Field type="text" name="v" />
                  <span>{values?.v}</span>
                </div>
              </div>
              <div className="formRow">
                <div style={{ order: 1, flexGrow: 1 }}>
                  <Field type="text" name="w" />
                  <span>{values?.w}</span>
                </div>
              </div>
              <div className="formRow">
                <div style={{ order: 1, flexGrow: 1 }}>
                  <Field type="text" name="x" />
                  <span>{values?.x}</span>
                </div>
              </div>
              {/* **** 3. Title and interest **** */}
              <div className="formRow">
                <div style={{ order: 1 }}>
                  <strong>3. Title and Interest:</strong> At the time of the loss the interest of
                  your insured in the property described therin was
                </div>
                <div style={{ order: 2, flexGrow: 1, flexBasis: "2em" }}>
                  <Field type="text" name="y" />
                  <span>{values?.y}</span>
                </div>
              </div>
              <div className="formRow">
                <div style={{ order: 1, flexGrow: 1, flexBasis: "5em" }}>
                  <Field type="text" name="z" />
                  <span>{values?.z}</span>
                </div>
                <div style={{ order: 2 }}>
                  No other person or persons had any interest therein or
                </div>
              </div>
              <div className="formRow">
                <div style={{ order: 1 }}>incumbrance thereon, except:</div>
                <div style={{ order: 2, flexGrow: 1 }}>
                  <Field type="text" name="aa" />
                  <span>{values?.aa}</span>
                </div>
              </div>
              <div className="formRow">
                <div style={{ order: 1, flexGrow: 1 }}>
                  <Field type="text" name="ab" />
                  <span>{values?.ab}</span>
                </div>
              </div>
              {/* **** 4. Changes **** */}
              <div className="formRow">
                <div style={{ order: 1 }}>
                  <strong>3. Changes:</strong> Since the said policy was issued there has been no
                  assignment thereof, or change of interest, use, occupancy
                </div>
              </div>
              <div className="formRow">
                <div style={{ order: 1 }}>
                  possession, location or exposure of the property described, except:
                </div>
                <div style={{ order: 2, flexGrow: 1 }}>
                  <Field type="text" name="ac" />
                  <span>{values?.ac}</span>
                </div>
              </div>
              <div className="formRow">
                <div style={{ order: 1, flexGrow: 1 }}>
                  <Field type="text" name="ad" />
                  <span>{values?.ad}</span>
                </div>
              </div>
              <div className="formRow">
                <div style={{ order: 1, flexGrow: 1 }}>
                  <Field type="text" name="ae" />
                  <span>{values?.ae}</span>
                </div>
              </div>
              {/* **** 5. Total insurance **** */}
              <div className="formRow">
                <div style={{ order: 1 }}>
                  <strong>5. Total Insurance:</strong> The total amount of insurance upon the
                  property descrobed by this policy was, at the time of the loss,
                </div>
              </div>
              <div className="formRow">
                <div style={{ order: 2 }}>$</div>
                <div style={{ order: 3, flexGrow: 1, flexBasis: "3em" }}>
                  <Field type="text" name="af" />
                  <span>{values?.af}</span>
                </div>
                <div style={{ order: 4 }}>
                  , as more particularly specified in the apportionment attached under Schedule
                  &quot;C&quot;, besides which
                </div>
              </div>
              <div className="formRow">
                <div style={{ order: 5 }}>
                  there was no policy or other contract of insurance, written or oral, valid or
                  invalid.
                </div>
              </div>
              {/* **** 6. Actual Cash Value **** */}
              <div className="formRow topMargin15">
                <div style={{ order: 1 }}>
                  <strong>6. The Actual Cash Value</strong> of the said property at the time of the
                  loss was
                </div>
                <div style={{ order: 2, flexGrow: 1 }}>
                  <input className="bottomBorderDashed" data-bind="value: eg" />
                  <span className="bottomBorderDashed" data-bind="text: eg" />
                </div>
                <div style={{ order: 3 }}>$</div>
                <div style={{ order: 4, flexGrow: 0, flexBasis: "10em" }}>
                  <input className="numeric" data-bind="value: ag" />
                  <div className="printOnly numeric" data-bind="text: ag" />
                </div>
              </div>
              {/* **** 7. Whole loss and damage **** */}
              <div className="formRow topMargin15">
                <div style={{ order: 1 }}>
                  <strong>7. The Whole Loss and Damage </strong> was
                </div>
                <div style={{ order: 2, flexGrow: 1 }}>
                  <input className="bottomBorderDashed" data-bind="value: eh" />
                  <span className="bottomBorderDashed" data-bind="text: eh" />
                </div>
                <div style={{ order: 3 }}>$</div>
                <div style={{ order: 4, flexGrow: 0, flexBasis: "10em" }}>
                  <input className="numeric" data-bind="value: ah" />
                  <div className="printOnly numeric" data-bind="text: ah" />
                </div>
              </div>
              {/* **** 8. Less amt **** */}
              <div className="formRow topMargin15">
                <div style={{ order: 1 }}>
                  <strong>8. Less Amount of Deductible </strong>
                </div>
                <div style={{ order: 2, flexGrow: 1 }}>
                  <input className="bottomBorderDashed" data-bind="value: ei" />
                  <span className="bottomBorderDashed" data-bind="text: ei" />
                </div>
                <div style={{ order: 3 }}>$</div>
                <div style={{ order: 4, flexGrow: 0, flexBasis: "10em" }}>
                  <input className="numeric" data-bind="value: ai" />
                  <div className="printOnly numeric" data-bind="text: ai" />
                </div>
              </div>
              {/* **** 9. Amt claimed **** */}
              <div className="formRow topMargin15">
                <div style={{ order: 1 }}>
                  <strong>9. The Amount Claimed </strong> under the above numbered policy is
                </div>
                <div style={{ order: 2, flexGrow: 1 }}>
                  <input className="bottomBorderDashed" data-bind="value: ej" />
                  <span className="bottomBorderDashed" data-bind="text: ej" />
                </div>
                <div style={{ order: 3 }}>$</div>
                <div style={{ order: 4, flexGrow: 0, flexBasis: "10em" }}>
                  <input className="numeric" data-bind="value: aj" />
                  <div className="printOnly numeric" data-bind="text: aj" />
                </div>
              </div>
              {/* **** Disclaimer **** */}
              <div className="formRow finePrint topMargin10">
                <div style={{ order: 1, marginLeft: "1em" }}>
                  <strong>
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
                  </strong>
                </div>
              </div>
              <div className="formRow finePrint topMargin10">
                <div style={{ order: 1, marginLeft: "1em" }}>
                  <strong>
                    The furnishing of this blank or the preparation of proofs by a representative of
                    the above insurance company is not a waiver of any of its rights.
                  </strong>
                </div>
              </div>
              {/* **** State of **** */}
              <div className="formRow" style={{ paddingBottom: 10 }} />
              <div className="formRow">
                <div style={{ order: 1 }}>State of</div>
                <div style={{ order: 2, flexGrow: 0, flexBasis: "15em" }}>
                  <Field type="text" name="ak" />
                  <span>{values?.ak}</span>
                </div>
                <div style={{ order: 3, flexGrow: 0, flexBasis: "2em" }} />
                <div style={{ order: 4, flexGrow: 1, flexBasis: "25em" }}>
                  <Field type="text" name="al" />
                  <span>{values?.al}</span>
                </div>
              </div>
              {/* **** County of **** */}
              <div className="formRow" style={{ paddingBottom: 10 }} />
              <div className="formRow">
                <div style={{ order: 1 }}>County of</div>
                <div style={{ order: 2, flexGrow: 0, flexBasis: "15em" }}>
                  <Field type="text" name="am" />
                  <span>{values?.am}</span>
                </div>
                <div style={{ order: 3, flexGrow: 0, flexBasis: "2em" }} />
                <div style={{ order: 4, flexGrow: 1, flexBasis: "22em" }}>
                  <Field type="text" name="an" />
                  <span>{values?.an}</span>
                </div>
                <div style={{ order: 5, flexGrow: 0, flexBasis: "2em" }}>Insured</div>
              </div>
              {/* **** Subscribed and sworn **** */}
              <div className="formRow topMargin10">
                <div style={{ order: 1 }}>Subscribed and sworn to before me this</div>
                <div style={{ order: 2, flexGrow: 0, flexBasis: "5em" }}>
                  <Field type="text" name="ao" />
                  <span>{values?.ao}</span>
                </div>
                <div style={{ order: 3 }}>day of</div>
                <div style={{ order: 4, flexGrow: 0, flexBasis: "10em" }}>
                  <Field type="text" name="ap" />
                  <span>{values?.ap}</span>
                </div>
                <div style={{ order: 5 }}>20</div>
                <div style={{ order: 6, flexGrow: 0, flexBasis: "5em" }}>
                  <Field type="text" name="aq" />
                  <span>{values?.aq}</span>
                </div>
                <div style={{ order: 7, flexGrow: 1 }} />
              </div>
              {/* **** Notary public **** */}
              <div className="formRow topMargin15" style={{ pageBreakAfter: "always" }}>
                <div style={{ order: 1, flexGrow: 0, flexBasis: "20em" }}>
                  <Field type="text" name="ar" />
                  <span>{values?.ar}</span>
                </div>
                <div style={{ order: 2 }}>Notary Public</div>
                <div style={{ order: 3, flexGrow: 1 }} />
              </div>
              {/* ************************************************** */}
              {/* **** Schedule A - Policy form **** */}
              {/* ************************************************** */}
              <div className="formRow topMargin5pc bottomMargin10">
                <div style={{ order: 1, textAlign: "center", flexGrow: 1 }}>
                  <strong>SCHEDULE &quot;A&quot; - POLICY FORM</strong>
                </div>
              </div>
              <div className="formRow">
                <div style={{ order: 1 }}>Policy Form No.</div>
                <div style={{ order: 2, flexGrow: 0, flexBasis: "10em" }}>
                  <Field type="text" name="as" />
                  <span>{values?.as}</span>
                </div>
                <div style={{ order: 3 }}>Dated</div>
                <div style={{ order: 4, flexGrow: 1 }}>
                  <Field type="text" name="at" />
                  <span>{values?.at}</span>
                </div>
              </div>
              {/* **** Item 1 **** */}
              <div className="formRow">
                <div style={{ order: 1 }}>Item 1. $</div>
                <div style={{ order: 2, flexGrow: 0, flexBasis: "10em" }}>
                  <Field type="text" name="au" />
                  <span>{values?.au}</span>
                </div>
                <div style={{ order: 3 }}>on</div>
                <div style={{ order: 4, flexGrow: 1 }}>
                  <Field type="text" name="av" />
                  <span>{values?.av}</span>
                </div>
              </div>
              {/* **** Item 2 **** */}
              <div className="formRow">
                <div style={{ order: 1 }}>Item 2. $</div>
                <div style={{ order: 2, flexGrow: 0, flexBasis: "10em" }}>
                  <Field type="text" name="aw" />
                  <span>{values?.aw}</span>
                </div>
                <div style={{ order: 3 }}>on</div>
                <div style={{ order: 4, flexGrow: 1 }}>
                  <Field type="text" name="ax" />
                  <span>{values?.ax}</span>
                </div>
              </div>
              {/* **** Item 3 **** */}
              <div className="formRow">
                <div style={{ order: 1 }}>Item 3. $</div>
                <div style={{ order: 2, flexGrow: 0, flexBasis: "10em" }}>
                  <Field type="text" name="ay" />
                  <span>{values?.ay}</span>
                </div>
                <div style={{ order: 3 }}>on</div>
                <div style={{ order: 4, flexGrow: 1 }}>
                  <Field type="text" name="az" />
                  <span>{values?.az}</span>
                </div>
              </div>
              {/* **** Item 4 **** */}
              <div className="formRow">
                <div style={{ order: 1 }}>Item 4. $</div>
                <div style={{ order: 2, flexGrow: 0, flexBasis: "10em" }}>
                  <Field type="text" name="ba" />
                  <span>{values?.ba}</span>
                </div>
                <div style={{ order: 3 }}>on</div>
                <div style={{ order: 4, flexGrow: 1 }}>
                  <Field type="text" name="bb" />
                  <span>{values?.bb}</span>
                </div>
              </div>
              {/* **** Situated **** */}
              <div className="formRow">
                <div style={{ order: 1 }}>Situated</div>
                <div style={{ order: 2, flexGrow: 1 }}>
                  <Field type="text" name="ef" />
                  <span>{values?.ef}</span>
                </div>
              </div>
              {/* **** Coinsurance, Average, Distribution or Deductible Clauses, if any **** */}
              <div className="formRow">
                <div style={{ order: 1 }}>
                  Coinsurance, Average, Distribution or Deductible Clauses, if any
                </div>
                <div style={{ order: 2, flexGrow: 1 }}>
                  <Field type="text" name="bc" />
                  <span>{values?.bc}</span>
                </div>
              </div>
              {/* **** Loss, if any, payable to **** */}
              <div className="formRow">
                <div style={{ order: 1 }}>Loss, if any, payable to</div>
                <div style={{ order: 2, flexGrow: 1 }}>
                  <Field type="text" name="bd" />
                  <span>{values?.bd}</span>
                </div>
              </div>
              <div className="clear" />
              {/* **** SCHEDULE "B" **** */}
              <div className="formRow topMargin5pc bottomMargin10">
                <div style={{ order: 1, textAlign: "center", flexGrow: 1 }}>
                  <strong>SCHEDULE &quot;B&quot;</strong>
                </div>
              </div>
              <div className="formRow bottomMargin10">
                <div style={{ order: 1, textAlign: "center", flexGrow: 1 }}>
                  <strong>STATEMENT OF ACTUAL CASH VALUE AND LOSS AND DAMAGE</strong>
                </div>
              </div>
              <div className="formRow">
                <table style={{ border: "1px solid black", width: "100%" }}>
                  <tbody>
                    <tr style={{ borderTopStyle: "double", height: "2.5em" }}>
                      <td className="formTableHeaderCell" />
                      <td className="formTableHeaderCell" />
                      <td className="formTableHeaderCell text-center">ACTUAL CASH VALUE</td>
                      <td className="formTableHeaderCell text-center">LOSS AND DAMAGE</td>
                    </tr>
                  </tbody>
                  <tbody>
                    <tr>
                      <td className="formTableCell width10pc">
                        <input className="width100pc" data-bind="value: be" />
                        <span>{values?.be}</span>
                      </td>
                      <td className="formTableCell width60pc">
                        <input className="width100pc" data-bind="value: bf" />
                        <span>{values?.bf}</span>
                      </td>
                      <td className="formTableCell width15pc">
                        <input className="width100pc numeric" data-bind="value: bg" />
                        <div className="numeric printNumeric" data-bind="text: bg" />
                      </td>
                      <td className="formTableCell width15pc">
                        <input className="width100pc numeric" data-bind="value: bh" />
                        <div className="numeric printNumeric" data-bind="text: bh" />
                      </td>
                    </tr>
                    <tr>
                      <td className="formTableCell width10pc">
                        <input className="width100pc" data-bind="value: bi" />
                        <span>{values?.bi}</span>
                      </td>
                      <td className="formTableCell width60pc">
                        <input className="width100pc" data-bind="value: bj" />
                        <span>{values?.bj}</span>
                      </td>
                      <td className="formTableCell width15pc">
                        <input className="width100pc numeric" data-bind="value: bk" />
                        <div className="numeric printNumeric" data-bind="text: bk" />
                      </td>
                      <td className="formTableCell width15pc">
                        <input className="width100pc numeric" data-bind="value: bl" />
                        <div className="numeric printNumeric" data-bind="text: bl" />
                      </td>
                    </tr>
                    <tr>
                      <td className="formTableCell width10pc">
                        <input className="width100pc" data-bind="value: bm" />
                        <span>{values?.bm}</span>
                      </td>
                      <td className="formTableCell width60pc">
                        <input className="width100pc" data-bind="value: bn" />
                        <span>{values?.bn}</span>
                      </td>
                      <td className="formTableCell width15pc">
                        <input className="width100pc numeric" data-bind="value: bo" />
                        <div className="numeric printNumeric" data-bind="text: bo" />
                      </td>
                      <td className="formTableCell width15pc">
                        <input className="width100pc numeric" data-bind="value: bp" />
                        <div className="numeric printNumeric" data-bind="text: bp" />
                      </td>
                    </tr>
                    <tr>
                      <td className="formTableCell width10pc">
                        <input className="width100pc" data-bind="value: bq" />
                        <span>{values?.bq}</span>
                      </td>
                      <td className="formTableCell width60pc">
                        <input className="width100pc" data-bind="value: br" />
                        <span>{values?.br}</span>
                      </td>
                      <td className="formTableCell width15pc">
                        <input className="width100pc numeric" data-bind="value: bs" />
                        <div className="numeric printNumeric" data-bind="text: bs" />
                      </td>
                      <td className="formTableCell width15pc">
                        <input className="width100pc numeric" data-bind="value: bt" />
                        <div className="numeric printNumeric" data-bind="text: bt" />
                      </td>
                    </tr>
                    <tr>
                      <td className="formTableCell width10pc">
                        <input className="width100pc" data-bind="value: bu" />
                        <span>{values?.bu}</span>
                      </td>
                      <td className="formTableCell width60pc">
                        <input className="width100pc" data-bind="value: bv" />
                        <span>{values?.bv}</span>
                      </td>
                      <td className="formTableCell width15pc">
                        <input className="width100pc numeric" data-bind="value: bw" />
                        <div className="numeric printNumeric" data-bind="text: bw" />
                      </td>
                      <td className="formTableCell width15pc">
                        <input className="width100pc numeric" data-bind="value: bx" />
                        <div className="numeric printNumeric" data-bind="text: bx" />
                      </td>
                    </tr>
                    <tr>
                      <td className="formTableCell width10pc">
                        <input className="width100pc" data-bind="value: by" />
                        <span>{values?.by}</span>
                      </td>
                      <td className="formTableCell width60pc">
                        <input className="width100pc" data-bind="value: bx" />
                        <span>{values?.bz}</span>
                      </td>
                      <td className="formTableCell width15pc">
                        <input className="width100pc numeric" data-bind="value: ca" />
                        <div className="numeric printNumeric" data-bind="text: ca" />
                      </td>
                      <td className="formTableCell width15pc">
                        <input className="width100pc numeric" data-bind="value: cb" />
                        <div className="numeric printNumeric" data-bind="text: cb" />
                      </td>
                    </tr>
                    <tr>
                      <td className="formTableCell width10pc">
                        <input className="width100pc" data-bind="value: cc" />
                        <span>{values?.cc}</span>
                      </td>
                      <td className="formTableCell width60pc">
                        <input className="width100pc" data-bind="value: cd" />
                        <span>{values?.cd}</span>
                      </td>
                      <td className="formTableCell width15pc">
                        <input className="width100pc numeric" data-bind="value: ce" />
                        <div className="numeric printNumeric" data-bind="text: ce" />
                      </td>
                      <td className="formTableCell width15pc">
                        <input className="width100pc numeric" data-bind="value: cf" />
                        <div className="numeric printNumeric" data-bind="text: cf" />
                      </td>
                    </tr>
                  </tbody>
                  <tfoot style={{ borderBottomStyle: "double", height: "2em" }}>
                    <tr>
                      <td className="formTableFooterCell width10pc">
                        <strong>Totals</strong>
                      </td>
                      <td className="formTableFooterCell width60pc">
                        <input className="width100pc" data-bind="value: cg" />
                        <span>{values?.cg}</span>
                      </td>
                      <td className="formTableFooterCell width15pc">
                        <input className="width100pc numeric" data-bind="value: dx" />
                        <div className="numeric printNumeric" data-bind="text: dx" />
                      </td>
                      <td className="formTableFooterCell width15pc">
                        <input className="width100pc numeric" data-bind="value: dy" />
                        <div className="numeric printNumeric" data-bind="text: dy" />
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              {/* **** SCHEDULE "C" - APPORTIONMENT **** */}
              <div className="formRow topMargin5pc bottomMargin10">
                <div style={{ order: 1, textAlign: "center", flexGrow: 1 }}>
                  <strong>SCHEDULE &quot;C&quot; - APPORTIONMENT</strong>
                </div>
              </div>
              <div className="formRow">
                <table style={{ border: "1px solid black", width: "100%" }}>
                  <tbody>
                    <tr style={{ borderTopStyle: "double", height: "2.5em" }}>
                      <th className="formTableHeaderCell text-center">POLICY NO.</th>
                      <th className="formTableHeaderCell text-center">EXPIRES</th>
                      <th className="formTableHeaderCell text-center">NAME OF COMPANY</th>
                      <th className="formTableHeaderCell text-center" colSpan={2}>
                        ITEM NO.
                      </th>
                      <th className="formTableHeaderCell text-center" colSpan={2}>
                        ITEM NO.
                      </th>
                    </tr>
                    <tr style={{ height: "1.5em" }}>
                      <th className="formTableHeaderCell" style={{ borderTop: "none" }} />
                      <th className="formTableHeaderCell" style={{ borderTop: "none" }} />
                      <th className="formTableHeaderCell" style={{ borderTop: "none" }} />
                      <th className="formTableHeaderCell text-center">INSURES</th>
                      <th className="formTableHeaderCell text-center">PAYS</th>
                      <th className="formTableHeaderCell text-center">INSURES</th>
                      <th className="formTableHeaderCell text-center">PAYS</th>
                    </tr>
                  </tbody>
                  <tbody>
                    <tr>
                      <td className="formTableCell width10pc">
                        <input className="width100pc" data-bind="value: cg" />
                        <span>{values?.cg}</span>
                      </td>
                      <td className="formTableCell width10pc">
                        <input className="width100pc" data-bind="value: ch" />
                        <span>{values?.ch}</span>
                      </td>
                      <td className="formTableCell width40pc">
                        <input className="width100pc" data-bind="value: ci" />
                        <span>{values?.ci}</span>
                      </td>
                      <td className="formTableCell width10pc">
                        <input className="width100pc numeric" data-bind="value: cj" />
                        <div className="numeric printNumeric" data-bind="text: cj" />
                      </td>
                      <td className="formTableCell width10pc">
                        <input className="width100pc numeric" data-bind="value: ck" />
                        <div className="numeric printNumeric" data-bind="text: ck" />
                      </td>
                      <td className="formTableCell width10pc">
                        <input className="width100pc numeric" data-bind="value: cl" />
                        <div className="numeric printNumeric" data-bind="text: cl" />
                      </td>
                      <td className="formTableCell width10pc">
                        <input className="width100pc numeric" data-bind="value: cm" />
                        <div className="numeric printNumeric" data-bind="text: cm" />
                      </td>
                    </tr>
                    <tr>
                      <td className="formTableCell width10pc">
                        <input className="width100pc" data-bind="value: cn" />
                        <span>{values?.cn}</span>
                      </td>
                      <td className="formTableCell width10pc">
                        <input className="width100pc" data-bind="value: co" />
                        <span>{values?.co}</span>
                      </td>
                      <td className="formTableCell width40pc">
                        <input className="width100pc" data-bind="value: cp" />
                        <span>{values?.cp}</span>
                      </td>
                      <td className="formTableCell width10pc">
                        <input className="width100pc numeric" data-bind="value: cq" />
                        <div className="numeric printNumeric" data-bind="text: cq" />
                      </td>
                      <td className="formTableCell width10pc">
                        <input className="width100pc numeric" data-bind="value: cr" />
                        <div className="numeric printNumeric" data-bind="text: cr" />
                      </td>
                      <td className="formTableCell width10pc">
                        <input className="width100pc numeric" data-bind="value: cs" />
                        <div className="numeric printNumeric" data-bind="text: cs" />
                      </td>
                      <td className="formTableCell width10pc">
                        <input className="width100pc numeric" data-bind="value: ct" />
                        <div className="numeric printNumeric" data-bind="text: ct" />
                      </td>
                    </tr>
                    <tr>
                      <td className="formTableCell width10pc">
                        <input className="width100pc" data-bind="value: cu" />
                        <span>{values?.cu}</span>
                      </td>
                      <td className="formTableCell width10pc">
                        <input className="width100pc" data-bind="value: cv" />
                        <span>{values?.cv}</span>
                      </td>
                      <td className="formTableCell width40pc">
                        <input className="width100pc" data-bind="value: cw" />
                        <span>{values?.cw}</span>
                      </td>
                      <td className="formTableCell width10pc">
                        <input className="width100pc numeric" data-bind="value: cx" />
                        <div className="numeric printNumeric" data-bind="text: cx" />
                      </td>
                      <td className="formTableCell width10pc">
                        <input className="width100pc numeric" data-bind="value: cy" />
                        <div className="numeric printNumeric" data-bind="text: cy" />
                      </td>
                      <td className="formTableCell width10pc">
                        <input className="width100pc numeric" data-bind="value: cz" />
                        <div className="numeric printNumeric" data-bind="text: cz" />
                      </td>
                      <td className="formTableCell width10pc">
                        <input className="width100pc numeric" data-bind="value: da" />
                        <div className="numeric printNumeric" data-bind="text: da" />
                      </td>
                    </tr>
                    <tr>
                      <td className="formTableCell width10pc">
                        <input className="width100pc" data-bind="value: db" />
                        <span>{values?.db}</span>
                      </td>
                      <td className="formTableCell width10pc">
                        <input className="width100pc" data-bind="value: dc" />
                        <span>{values?.dc}</span>
                      </td>
                      <td className="formTableCell width40pc">
                        <input className="width100pc" data-bind="value: dd" />
                        <span>{values?.dd}</span>
                      </td>
                      <td className="formTableCell width10pc">
                        <input className="width100pc numeric" data-bind="value: de" />
                        <div className="numeric printNumeric" data-bind="text: de" />
                      </td>
                      <td className="formTableCell width10pc">
                        <input className="width100pc numeric" data-bind="value: df" />
                        <div className="numeric printNumeric" data-bind="text: df" />
                      </td>
                      <td className="formTableCell width10pc">
                        <input className="width100pc numeric" data-bind="value: dg" />
                        <div className="numeric printNumeric" data-bind="text: dg" />
                      </td>
                      <td className="formTableCell width10pc">
                        <input className="width100pc numeric" data-bind="value: dh" />
                        <div className="numeric printNumeric" data-bind="text: dh" />
                      </td>
                    </tr>
                  </tbody>
                  <tfoot style={{ borderBottomStyle: "double", height: "2em" }}>
                    <tr>
                      <td className="formTableFooterCell width10pc">
                        <strong>Totals</strong>
                      </td>
                      <td className="formTableFooterCell width10pc">
                        <input className="width100pc" data-bind="value: di" />
                        <span>{values?.di}</span>
                      </td>
                      <td className="formTableFooterCell width40pc">
                        <input className="width100pc" data-bind="value: dj" />
                        <span>{values?.dj}</span>
                      </td>
                      <td className="formTableFooterCell width10pc">
                        <input className="width100pc numeric" data-bind="value: dz" />
                        <div className="numeric printNumeric" data-bind="text: dz" />
                      </td>
                      <td className="formTableFooterCell width10pc">
                        <input className="width100pc numeric" data-bind="value: ea" />
                        <div className="numeric printNumeric" data-bind="text: ea" />
                      </td>
                      <td className="formTableFooterCell width10pc">
                        <input className="width100pc numeric" data-bind="value: eb" />
                        <div className="numeric printNumeric" data-bind="text: eb" />
                      </td>
                      <td className="formTableFooterCell width10pc">
                        <input className="width100pc numeric" data-bind="value: ec" />
                        <div className="numeric printNumeric" data-bind="text: ec" />
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              {/* **** Adjuster **** */}
              <div className="formRow topMargin15" style={{ width: "50%", float: "right" }}>
                <div style={{ order: 1, flexGrow: 1 }}>
                  <Field type="text" name="dk" />
                  <span>{values?.dk}</span>
                </div>
                <div style={{ order: 2 }}>Adjuster</div>
              </div>
              <div className="clear" />
              {/* **** RECEIPT FOR PAYMENT **** */}
              <div className="formRow topMargin15 bottomMargin10">
                <div style={{ order: 1, textAlign: "center", flexGrow: 1 }}>
                  <strong>RECEIPT FOR PAYMENT</strong>
                </div>
              </div>
              <div className="formRow">
                <div style={{ order: 1 }}>Received of</div>
                <div style={{ order: 2, flexGrow: 1, flexBasis: "10em" }}>
                  <Field type="text" name="dl" />
                  <span>{values?.dl}</span>
                </div>
                <div style={{ order: 3 }}>(insurer) of</div>
                <div style={{ order: 4, flexGrow: 0, flexBasis: "20em" }}>
                  <Field type="text" name="dm" />
                  <span>{values?.dm}</span>
                </div>
              </div>
              <div className="formRow">
                <div style={{ order: 1, flexGrow: 1, flexBasis: "10em" }}>
                  <Field type="text" name="dn" />
                  <span>{values?.dn}</span>
                </div>
                <div style={{ order: 2 }}>Dollars ($</div>
                <div style={{ order: 3, flexGrow: 0, flexBasis: "10em" }}>
                  <Field type="text" name="dp" />
                  <span>{values?.dp}</span>
                </div>
                <div style={{ order: 4 }}>)</div>
              </div>
              <div className="formRow">
                <div style={{ order: 1, flexGrow: 1 }}>
                  in full satisfaction and indemnity for all claims and demands upon said company on
                  account of said loss and damage and the
                </div>
              </div>
              <div className="formRow">
                <div style={{ order: 1 }}>said policy is hereby</div>
                <div style={{ order: 2, flexGrow: 1, flexBasis: "10em" }}>
                  <Field type="text" name="dq" />
                  <span>{values?.dq}</span>
                </div>
                <div style={{ order: 3 }}>
                  (State whether <strong>Reduced, Reduced and Reinstated</strong> or
                  <strong>Canceled</strong> by payment.)
                </div>
              </div>
              <div className="formRow topMargin" />
              {/* The insured */}
              <div className="formRow">
                <div style={{ order: 1 }}>Dated</div>
                <div style={{ order: 2, flexGrow: 1, flexBasis: "15em" }}>
                  <Field type="text" name="dr" />
                  <span>{values?.dr}</span>
                </div>
                <div style={{ order: 3 }}>20</div>
                <div style={{ order: 4, flexGrow: 1, flexBasis: "5em" }}>
                  <Field type="text" name="ds" />
                  <span>{values?.ds}</span>
                </div>
                <div style={{ order: 5, flexGrow: 0, flexBasis: "10em" }} />
                <div style={{ order: 6, flexGrow: 1, flexBasis: "20em" }}>
                  <Field type="text" name="dt" />
                  <span>{values?.dt}</span>
                </div>
              </div>
              <div className="formRow" style={{ justifyContent: "flex-end" }}>
                The Insured
              </div>
              {/* The Mortgagee */}
              <div className="formRow">
                <div style={{ order: 1 }}>Dated</div>
                <div style={{ order: 2, flexGrow: 1, flexBasis: "15em" }}>
                  <Field type="text" name="du" />
                  <span>{values?.du}</span>
                </div>
                <div style={{ order: 3 }}>20</div>
                <div style={{ order: 4, flexGrow: 1, flexBasis: "5em" }}>
                  <Field type="text" name="dv" />
                  <span>{values?.dv}</span>
                </div>
                <div style={{ order: 5, flexGrow: 0, flexBasis: "10em" }} />
                <div style={{ order: 6, flexGrow: 1, flexBasis: "20em" }}>
                  <Field type="text" name="dw" />
                  <span>{values?.dw}</span>
                </div>
              </div>
              <div className="formRow" style={{ justifyContent: "flex-end" }}>
                The Mortgagee
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
