// import "./proof-of-loss.css";

export const ProofOfLoss = () => {
  return (
    <div
      id="claimFormPrintContainer"
      data-bind="template: { name: activeFormTmpl, data: form().data()}"
    >
      <div className="formContainer">
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
              <input data-bind="value: _id" />
              <span data-bind="text: _id" />
            </div>
            <div className="formRowCentered">POLICY NUMBER</div>
            <div className="formRow">
              <input data-bind="value: b" />
              <span data-bind="text: b">See Schedule &quot;A&quot;</span>
            </div>
            <div className="formRowCentered" style={{ fontSize: "0.75em" }}>
              AMOUNT OF POLICY AT TIME OF LOSS
            </div>
            <div className="formRow">
              <input data-bind="value: c" />
              <span data-bind="text: c">None</span>
            </div>
            <div className="formRowCentered">DATE ISSUED</div>
            <div className="formRow">
              <input data-bind="value: d" />
              <span data-bind="text: d">None</span>
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
              <input data-bind="value: e" />
              <span data-bind="text: e">02-88767AC</span>
            </div>
            <div className="formRowCentered">OUR FILE No.</div>
            <div className="formRow">
              <input data-bind="value: f" />
              <span data-bind="text: f" />
            </div>
            <div className="formRowCentered">COMPANY CLAIM NO.</div>
            <div className="formRow">
              <input data-bind="value: g" />
              <span data-bind="text: g" />
            </div>
            <div className="formRowCentered">AGENCY AT</div>
            <div className="formRow">
              <input data-bind="value: h" />
              <span data-bind="text: h" />
            </div>
            <div className="formRowCentered">AGENT</div>
          </div>
        </div>
        {/* **** Text start **** */}
        <div className="formRow">
          <div style={{ order: 1 }}>To the</div>
          <div style={{ flexGrow: 1, order: 2 }}>
            <input data-bind="value: i" />
            <span data-bind="text: i">Gieco</span>
          </div>
        </div>
        <div className="formRow">
          <div style={{ order: 1 }}>of</div>
          <div style={{ flexGrow: 1, order: 2 }}>
            <input data-bind="value: j" />
            <span data-bind="text: j" />
          </div>
        </div>
        {/* At the time of loss */}
        <div className="formRow">
          <div style={{ order: 1 }}>
            At the time of loss, by the above indicated policy of insurance you insured
          </div>
          <div style={{ flexGrow: 1, order: 2 }}>
            <input data-bind="value: k" />
            <span data-bind="text: k">Sample Insured</span>
          </div>
        </div>
        <div className="formRow">
          <div style={{ order: 1, flexGrow: 1 }}>
            <input data-bind="value: ed" />
            <span data-bind="text:ed" />
          </div>
        </div>
        <div className="formRow">
          <div style={{ order: 1 }}>against loss by</div>
          <div style={{ flexGrow: 1, order: 2 }}>
            <input data-bind="value: l" />
            <span data-bind="text: l" />
          </div>
          <div style={{ order: 3 }}>
            to the property described under schedule &quot;A&quot; according to
          </div>
        </div>
        <div className="formRow">
          <div style={{ order: 1 }}>
            the terms and conditions of the said policy and all forms, endorsements, transfers and
            assignments attached thereto
          </div>
        </div>
        {/* **** 1. Time and origin **** */}
        <div className="formRow topMargin10">
          <div style={{ order: 1 }}>
            <strong>1. Time and Origin:</strong> A
          </div>
          <div style={{ flexGrow: 1, order: 2 }}>
            <input data-bind="value: m" />
            <span data-bind="text: m" />
          </div>
          <div style={{ order: 3 }}>loss occured about the hour of</div>
          <div style={{ flexGrow: 1, order: 4, flexBasis: "3em" }}>
            <input data-bind="value: n" />
            <span data-bind="text: n" />
          </div>
          <div style={{ order: 5 }}>o&apos; clock</div>
          <div style={{ flexGrow: 1, order: 6, flexBasis: "3em" }}>
            <input data-bind="value: o" />
            <span data-bind="text: o" />
          </div>
          <div style={{ order: 7 }}>M.</div>
        </div>
        <div className="formRow">
          <div style={{ order: 1 }}>on the</div>
          <div style={{ order: 2, flexGrow: 1, flexBasis: "1em" }}>
            <input data-bind="value: p" />
            <span data-bind="text: p">3rd</span>
          </div>
          <div style={{ order: 3 }}>day of</div>
          <div style={{ order: 4, flexGrow: 1, flexBasis: "1em" }}>
            <input data-bind="value: q" />
            <span data-bind="text: q">May</span>
          </div>
          <div style={{ order: 5 }}>20</div>
          <div style={{ order: 6, flexGrow: 1, flexBasis: "1em" }}>
            <input data-bind="value: r" />
            <span data-bind="text: r">23</span>
          </div>
          <div style={{ order: 7 }}>. The cause and origin of the said loss were:</div>
          <div style={{ order: 8, flexGrow: 1, flexBasis: "5em" }}>
            <input data-bind="value: s" />
            <span data-bind="text: s" />
          </div>
        </div>
        <div className="formRow">
          <div style={{ order: 1, flexGrow: 1 }}>
            <input data-bind="value: t" />
            <span data-bind="text: t" />
          </div>
        </div>
        <div className="formRow">
          <div style={{ order: 1, flexGrow: 1 }}>
            <input data-bind="value: u" />
            <span data-bind="text: u" />
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
            <input data-bind="value: v" />
            <span data-bind="text: v">As Permitted</span>
          </div>
        </div>
        <div className="formRow">
          <div style={{ order: 1, flexGrow: 1 }}>
            <input data-bind="value: w" />
            <span data-bind="text: w" />
          </div>
        </div>
        <div className="formRow">
          <div style={{ order: 1, flexGrow: 1 }}>
            <input data-bind="value: x" />
            <span data-bind="text: x" />
          </div>
        </div>
        {/* **** 3. Title and interest **** */}
        <div className="formRow">
          <div style={{ order: 1 }}>
            <strong>3. Title and Interest:</strong> At the time of the loss the interest of your
            insured in the property described therin was
          </div>
          <div style={{ order: 2, flexGrow: 1, flexBasis: "2em" }}>
            <input data-bind="value: y" />
            <span data-bind="text: y">Owner</span>
          </div>
        </div>
        <div className="formRow">
          <div style={{ order: 1, flexGrow: 1, flexBasis: "5em" }}>
            <input data-bind="value: z" />
            <span data-bind="text: z" />
          </div>
          <div style={{ order: 2 }}>No other person or persons had any interest therein or</div>
        </div>
        <div className="formRow">
          <div style={{ order: 1 }}>incumbrance thereon, except:</div>
          <div style={{ order: 2, flexGrow: 1 }}>
            <input data-bind="value: aa" />
            <span data-bind="text: aa" />
          </div>
        </div>
        <div className="formRow">
          <div style={{ order: 1, flexGrow: 1 }}>
            <input data-bind="value: ab" />
            <span data-bind="text: ab" />
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
            <input data-bind="value: ac" />
            <span data-bind="text: ac">As Per Policy</span>
          </div>
        </div>
        <div className="formRow">
          <div style={{ order: 1, flexGrow: 1 }}>
            <input data-bind="value: ad" />
            <span data-bind="text: ad" />
          </div>
        </div>
        <div className="formRow">
          <div style={{ order: 1, flexGrow: 1 }}>
            <input data-bind="value: ae" />
            <span data-bind="text: ae" />
          </div>
        </div>
        {/* **** 5. Total insurance **** */}
        <div className="formRow">
          <div style={{ order: 1 }}>
            <strong>5. Total Insurance:</strong> The total amount of insurance upon the property
            descrobed by this policy was, at the time of the loss,
          </div>
        </div>
        <div className="formRow">
          <div style={{ order: 2 }}>$</div>
          <div style={{ order: 3, flexGrow: 1, flexBasis: "3em" }}>
            <input data-bind="value: af" />
            <span data-bind="text: af">See Schedule &quot;A&quot;</span>
          </div>
          <div style={{ order: 4 }}>
            , as more particularly specified in the apportionment attached under Schedule
            &quot;C&quot;, besides which
          </div>
        </div>
        <div className="formRow">
          <div style={{ order: 5 }}>
            there was no policy or other contract of insurance, written or oral, valid or invalid.
          </div>
        </div>
        {/* **** 6. Actual Cash Value **** */}
        <div className="formRow topMargin15">
          <div style={{ order: 1 }}>
            <strong>6. The Actual Cash Value</strong> of the said property at the time of the loss
            was
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
              The said loss did not originate by any act, design or procurement on the part of your
              insured, or this affiant; nothing has been done by or with the privity or consent of
              your insured or this affiant, to violate the conditions of the policy, or render it
              void; no articles are mentioned herein or in annexed schedules but such as were
              destroyed or damaged at the time of the said loss; no property saved has in any manner
              been concealed, and no attempt to deceive the said company, as to the extent of said
              loss, has in any manner been made. Any other information that may be required will be
              furnished and considered a part of this proof. The furnishing of this blank or the
              preparation of proofs by a representative of the above insurance company is not a
              waiver of any of its rights.
            </strong>
          </div>
        </div>
        <div className="formRow finePrint topMargin10">
          <div style={{ order: 1, marginLeft: "1em" }}>
            <strong>
              The furnishing of this blank or the preparation of proofs by a representative of the
              above insurance company is not a waiver of any of its rights.
            </strong>
          </div>
        </div>
        {/* **** State of **** */}
        <div className="formRow" style={{ paddingBottom: 10 }} />
        <div className="formRow">
          <div style={{ order: 1 }}>State of</div>
          <div style={{ order: 2, flexGrow: 0, flexBasis: "15em" }}>
            <input data-bind="value: ak" />
            <span data-bind="text: ak" />
          </div>
          <div style={{ order: 3, flexGrow: 0, flexBasis: "2em" }} />
          <div style={{ order: 4, flexGrow: 1, flexBasis: "25em" }}>
            <input data-bind="value: al" />
            <span data-bind="text: al">Sample Insured</span>
          </div>
        </div>
        {/* **** County of **** */}
        <div className="formRow" style={{ paddingBottom: 10 }} />
        <div className="formRow">
          <div style={{ order: 1 }}>County of</div>
          <div style={{ order: 2, flexGrow: 0, flexBasis: "15em" }}>
            <input data-bind="value: am" />
            <span data-bind="text: am" />
          </div>
          <div style={{ order: 3, flexGrow: 0, flexBasis: "2em" }} />
          <div style={{ order: 4, flexGrow: 1, flexBasis: "22em" }}>
            <input data-bind="value: an" />
            <span data-bind="text: an">X</span>
          </div>
          <div style={{ order: 5, flexGrow: 0, flexBasis: "2em" }}>Insured</div>
        </div>
        {/* **** Subscribed and sworn **** */}
        <div className="formRow topMargin10">
          <div style={{ order: 1 }}>Subscribed and sworn to before me this</div>
          <div style={{ order: 2, flexGrow: 0, flexBasis: "5em" }}>
            <input data-bind="value: ao" />
            <span data-bind="text: ao" />
          </div>
          <div style={{ order: 3 }}>day of</div>
          <div style={{ order: 4, flexGrow: 0, flexBasis: "10em" }}>
            <input data-bind="value: ap" />
            <span data-bind="text: ap" />
          </div>
          <div style={{ order: 5 }}>20</div>
          <div style={{ order: 6, flexGrow: 0, flexBasis: "5em" }}>
            <input data-bind="value: aq" />
            <span data-bind="text: aq" />
          </div>
          <div style={{ order: 7, flexGrow: 1 }} />
        </div>
        {/* **** Notary public **** */}
        <div className="formRow topMargin15" style={{ pageBreakAfter: "always" }}>
          <div style={{ order: 1, flexGrow: 0, flexBasis: "20em" }}>
            <input data-bind="value: ar" />
            <span data-bind="text: ar" />
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
            <input data-bind="value: as" />
            <span data-bind="text: as" />
          </div>
          <div style={{ order: 3 }}>Dated</div>
          <div style={{ order: 4, flexGrow: 1 }}>
            <input data-bind="value: at" />
            <span data-bind="text: at" />
          </div>
        </div>
        {/* **** Item 1 **** */}
        <div className="formRow">
          <div style={{ order: 1 }}>Item 1. $</div>
          <div style={{ order: 2, flexGrow: 0, flexBasis: "10em" }}>
            <input data-bind="value: au" />
            <span data-bind="text: au" />
          </div>
          <div style={{ order: 3 }}>on</div>
          <div style={{ order: 4, flexGrow: 1 }}>
            <input data-bind="value: av" />
            <span data-bind="text: av" />
          </div>
        </div>
        {/* **** Item 2 **** */}
        <div className="formRow">
          <div style={{ order: 1 }}>Item 2. $</div>
          <div style={{ order: 2, flexGrow: 0, flexBasis: "10em" }}>
            <input data-bind="value: aw" />
            <span data-bind="text: aw" />
          </div>
          <div style={{ order: 3 }}>on</div>
          <div style={{ order: 4, flexGrow: 1 }}>
            <input data-bind="value: ax" />
            <span data-bind="text: ax" />
          </div>
        </div>
        {/* **** Item 3 **** */}
        <div className="formRow">
          <div style={{ order: 1 }}>Item 3. $</div>
          <div style={{ order: 2, flexGrow: 0, flexBasis: "10em" }}>
            <input data-bind="value: ay" />
            <span data-bind="text: ay" />
          </div>
          <div style={{ order: 3 }}>on</div>
          <div style={{ order: 4, flexGrow: 1 }}>
            <input data-bind="value: az" />
            <span data-bind="text: az" />
          </div>
        </div>
        {/* **** Item 4 **** */}
        <div className="formRow">
          <div style={{ order: 1 }}>Item 4. $</div>
          <div style={{ order: 2, flexGrow: 0, flexBasis: "10em" }}>
            <input data-bind="value: ba" />
            <span data-bind="text: ba" />
          </div>
          <div style={{ order: 3 }}>on</div>
          <div style={{ order: 4, flexGrow: 1 }}>
            <input data-bind="value: bb" />
            <span data-bind="text: bb" />
          </div>
        </div>
        {/* **** Situated **** */}
        <div className="formRow">
          <div style={{ order: 1 }}>Situated</div>
          <div style={{ order: 2, flexGrow: 1 }}>
            <input data-bind="value: ef" />
            <span data-bind="text: ef" />
          </div>
        </div>
        {/* **** Coinsurance, Average, Distribution or Deductible Clauses, if any **** */}
        <div className="formRow">
          <div style={{ order: 1 }}>
            Coinsurance, Average, Distribution or Deductible Clauses, if any
          </div>
          <div style={{ order: 2, flexGrow: 1 }}>
            <input data-bind="value: bc" />
            <span data-bind="text: bc" />
          </div>
        </div>
        {/* **** Loss, if any, payable to **** */}
        <div className="formRow">
          <div style={{ order: 1 }}>Loss, if any, payable to</div>
          <div style={{ order: 2, flexGrow: 1 }}>
            <input data-bind="value: bd" />
            <span data-bind="text: bd" />
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
                  <span data-bind="text: be" />
                </td>
                <td className="formTableCell width60pc">
                  <input className="width100pc" data-bind="value: bf" />
                  <span data-bind="text: bf" />
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
                  <span data-bind="text: bi" />
                </td>
                <td className="formTableCell width60pc">
                  <input className="width100pc" data-bind="value: bj" />
                  <span data-bind="text: bj" />
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
                  <span data-bind="text: bm" />
                </td>
                <td className="formTableCell width60pc">
                  <input className="width100pc" data-bind="value: bn" />
                  <span data-bind="text: bn" />
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
                  <span data-bind="text: bq" />
                </td>
                <td className="formTableCell width60pc">
                  <input className="width100pc" data-bind="value: br" />
                  <span data-bind="text: br" />
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
                  <span data-bind="text: bu" />
                </td>
                <td className="formTableCell width60pc">
                  <input className="width100pc" data-bind="value: bv" />
                  <span data-bind="text: bv" />
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
                  <span data-bind="text: by" />
                </td>
                <td className="formTableCell width60pc">
                  <input className="width100pc" data-bind="value: bx" />
                  <span data-bind="text: bz" />
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
                  <span data-bind="text: cc" />
                </td>
                <td className="formTableCell width60pc">
                  <input className="width100pc" data-bind="value: cd" />
                  <span data-bind="text: cd" />
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
                  <span data-bind="text: cg" />
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
                  <span data-bind="text: cg" />
                </td>
                <td className="formTableCell width10pc">
                  <input className="width100pc" data-bind="value: ch" />
                  <span data-bind="text: ch" />
                </td>
                <td className="formTableCell width40pc">
                  <input className="width100pc" data-bind="value: ci" />
                  <span data-bind="text: ci" />
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
                  <span data-bind="text: cn" />
                </td>
                <td className="formTableCell width10pc">
                  <input className="width100pc" data-bind="value: co" />
                  <span data-bind="text: co" />
                </td>
                <td className="formTableCell width40pc">
                  <input className="width100pc" data-bind="value: cp" />
                  <span data-bind="text: cp" />
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
                  <span data-bind="text: cu" />
                </td>
                <td className="formTableCell width10pc">
                  <input className="width100pc" data-bind="value: cv" />
                  <span data-bind="text: cv" />
                </td>
                <td className="formTableCell width40pc">
                  <input className="width100pc" data-bind="value: cw" />
                  <span data-bind="text: cw" />
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
                  <span data-bind="text: db" />
                </td>
                <td className="formTableCell width10pc">
                  <input className="width100pc" data-bind="value: dc" />
                  <span data-bind="text: dc" />
                </td>
                <td className="formTableCell width40pc">
                  <input className="width100pc" data-bind="value: dd" />
                  <span data-bind="text: dd" />
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
                  <span data-bind="text: di" />
                </td>
                <td className="formTableFooterCell width40pc">
                  <input className="width100pc" data-bind="value: dj" />
                  <span data-bind="text: dj" />
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
            <input data-bind="value: dk" />
            <span data-bind="text: dk" />
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
            <input data-bind="value: dl" />
            <span data-bind="text: dl" />
          </div>
          <div style={{ order: 3 }}>(insurer) of</div>
          <div style={{ order: 4, flexGrow: 0, flexBasis: "20em" }}>
            <input data-bind="value: dm" />
            <span data-bind="text: dm" />
          </div>
        </div>
        <div className="formRow">
          <div style={{ order: 1, flexGrow: 1, flexBasis: "10em" }}>
            <input data-bind="value: dn" />
            <span data-bind="text: dn" />
          </div>
          <div style={{ order: 2 }}>Dollars ($</div>
          <div style={{ order: 3, flexGrow: 0, flexBasis: "10em" }}>
            <input data-bind="value: dp" />
            <span data-bind="text: dp" />
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
            <input data-bind="value: dq" />
            <span data-bind="text: dq" />
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
            <input data-bind="value: dr" />
            <span data-bind="text: dr" />
          </div>
          <div style={{ order: 3 }}>20</div>
          <div style={{ order: 4, flexGrow: 1, flexBasis: "5em" }}>
            <input data-bind="value: ds" />
            <span data-bind="text: ds" />
          </div>
          <div style={{ order: 5, flexGrow: 0, flexBasis: "10em" }} />
          <div style={{ order: 6, flexGrow: 1, flexBasis: "20em" }}>
            <input data-bind="value: dt" />
            <span data-bind="text: dt" />
          </div>
        </div>
        <div className="formRow" style={{ justifyContent: "flex-end" }}>
          The Insured
        </div>
        {/* The Mortgagee */}
        <div className="formRow">
          <div style={{ order: 1 }}>Dated</div>
          <div style={{ order: 2, flexGrow: 1, flexBasis: "15em" }}>
            <input data-bind="value: du" />
            <span data-bind="text: du" />
          </div>
          <div style={{ order: 3 }}>20</div>
          <div style={{ order: 4, flexGrow: 1, flexBasis: "5em" }}>
            <input data-bind="value: dv" />
            <span data-bind="text: dv" />
          </div>
          <div style={{ order: 5, flexGrow: 0, flexBasis: "10em" }} />
          <div style={{ order: 6, flexGrow: 1, flexBasis: "20em" }}>
            <input data-bind="value: dw" />
            <span data-bind="text: dw" />
          </div>
        </div>
        <div className="formRow" style={{ justifyContent: "flex-end" }}>
          The Mortgagee
        </div>
      </div>
    </div>
  );
};
