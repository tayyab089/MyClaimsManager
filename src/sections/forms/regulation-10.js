export const Regulation10 = () => {
  return (
    <div
      id="claimFormPrintContainer"
      data-bind="template: { name: activeFormTmpl, data: form().data()}"
    >
      <div className="formContainer" style={{ padding: ".8in" }}>
        {/* ************************************************************************************************* */}
        {/* NOTE: Input fields do not render in the print layout since the content is not in the DOM */}
        {/* Hence there is a span for every input. In the @media print css inputs are hidden and spans shown */}
        {/* ************************************************************************************************* */}
        {/* **** Company header **** */}
        <div className="formRow" style={{ justifyContent: "center", fontSize: "1.1em" }}>
          <div style={{ order: 1, alignContent: "center" }}>PAUL GUTTMAN &amp; CO., INC</div>
        </div>
        <div className="formRow" style={{ justifyContent: "center", fontSize: "1.1em" }}>
          <div style={{ order: 1, alignContent: "center" }}>203 RACKAWAY AVE.</div>
        </div>
        <div className="formRow" style={{ justifyContent: "center", fontSize: "1.1em" }}>
          <div style={{ order: 1, alignContent: "center" }}>VALLEY STREAM, NY 11580</div>
        </div>
        <div className="formRow" style={{ justifyContent: "center", fontSize: "1.1em" }}>
          <div style={{ order: 1, alignContent: "center" }}>516-825-4800 FAX 516-825-4037</div>
        </div>
        <div className="formRow" />
        {/* **** Text block **** */}
        <div className="formRow topMargin15">
          <div style={{ order: 1, flexBasis: "5em" }}>INSURED:</div>
          <div style={{ flexGrow: 1, order: 2 }}>
            <input data-bind="value: a" />
            <span data-bind="text: a">BR Affordable Housing, LLP</span>
          </div>
        </div>
        <div className="formRow topMargin15">
          <div style={{ order: 1, flexBasis: "5em" }}>FILE #</div>
          <div style={{ flexGrow: 1, order: 2 }}>
            <input data-bind="value: b" />
            <span data-bind="text: b">Co Claim # P13 2602</span>
          </div>
        </div>
        <div className="formRow topMargin15">
          <div style={{ order: 1, flexBasis: "5em" }}>POLICY #</div>
          <div style={{ flexGrow: 1, order: 2 }}>
            <input data-bind="value: c" />
            <span data-bind="text: c">NYP2005065-11</span>
          </div>
        </div>
        <div className="formRow topMargin15 bottomMargin15">
          <div style={{ order: 1 }}>DATE OF LOSS:</div>
          <div style={{ flexGrow: 1, order: 2 }}>
            <input data-bind="value: d" />
            <span data-bind="text: d">03-08-2013</span>
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
            &quot;25.12 PAYMENT OF LOSSES. WHEN A CLAIM IS SETTLED WHERE THE INSURED IS REPRESENTED
            BY A PUBLIC ADJUSTER, UPON THE REQUEST OF THE INSURED, THE INSURER&apos;S CHECK MAY BE
            MADE PAYABLE TO BOTH THE PUBLIC ADJUSTER NAMED AS PAYEE, BUT NOT IN EXCESS OF THE AMOUNT
            OF THE PUBLIC ADJUSTER&apos;S FEE, AS INDICATED IN THE WRITTEN COMPENSATION AGREEMENT
            SIGNED BY THE INSURED AND FILED WITH THE INSURER. THE BALANCE OF THE PROCEEDS SHALL BE
            MADE PAYABLE TO THE INSURED OR THE LOSS PAYEE, OR BOTH WHICHEVER IS APPROPRIATE.&quot;
          </div>
        </div>
        <div className="formRow topMargin1pc">
          <div style={{ order: 1 }}>
            IN ACCORDANCE WITH THE LAW, PLEASE CHECK THE LINE OF YOUR CHOICE AND SIGN THIS LETTER
            WHERE
          </div>
        </div>
        <div className="formRow">
          <div style={{ order: 1 }}>INDICATED.</div>
        </div>
        <div className="topMargin5pc" />
        {/* **** Signing panel **** */}
        <div className="formRow">
          <div style={{ flexBasis: "5em", flexGrow: 0, order: 1 }}>
            <input data-bind="value: e" />
            <span data-bind="text: e" />
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
        {/* **** Signing panel 2 **** */}
        <div className="formRow">
          <div style={{ flexBasis: "5em", order: 1 }}>
            <input data-bind="value: f" />
            <span data-bind="text: f">X</span>
          </div>
          <div style={{ order: 2, flexGrow: 0 }}>A CHECK MADE PAYABLE TO:</div>
          <div style={{ flexBasis: "10em", flexGrow: 1, order: 3 }}>
            <input data-bind="value: g" />
            <span data-bind="text: g">Paul Guttman &amp; Co., Inc. No Fee Being Charge</span>
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
            <input data-bind="value: h" />
            <span data-bind="text: h">0.00</span>
          </div>
        </div>
        <div className="topMargin1pc" />
        {/* **** Signing panel 3 **** */}
        <div className="formRow">
          <div style={{ flexBasis: "5em", order: 1 }}>
            <input data-bind="value: i" />
            <span data-bind="text: i">X</span>
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
            <input data-bind="value: j" />
            <span data-bind="text: j">3,020.88</span>
          </div>
        </div>
        <div className="topMargin1pc" />
        {/* **** Date signed 1 **** */}
        <div className="topMargin5pc" />
        <div className="topMargin5pc" />
        <div className="formRow">
          <div style={{ order: 1, flexBasis: "10em", flexGrow: 0 }}>
            <input data-bind="value: k" />
            <span data-bind="text: k">X</span>
          </div>
          <div style={{ order: 2, flexBasis: "10em", flexGrow: 0 }} />
          <div style={{ order: 3, flexBasis: "20em", flexGrow: 0 }}>
            <input data-bind="value: l" />
            <span data-bind="text: l">X</span>
          </div>
        </div>
        <div className="formRow">
          <div style={{ order: 1, flexBasis: "10em", flexGrow: 0 }}>DATE SIGNED</div>
          <div style={{ order: 2, flexBasis: "10em", flexGrow: 0 }} />
          <div style={{ order: 3, flexBasis: "20em", flexGrow: 0 }}>INSUREDS SIGNATURE</div>
        </div>
        {/* **** Date signed 2 **** */}
        <div className="topMargin5pc" />
        <div className="topMargin5pc" />
        <div className="formRow">
          <div style={{ order: 1, flexBasis: "10em", flexGrow: 0 }}>
            <input data-bind="value: m" />
            <span data-bind="text: m" />
          </div>
          <div style={{ order: 2, flexBasis: "10em", flexGrow: 0 }} />
          <div style={{ order: 3, flexBasis: "20em", flexGrow: 0 }}>
            <input data-bind="value: n" />
            <span data-bind="text: n" />
          </div>
        </div>
        <div className="formRow">
          <div style={{ order: 1, flexBasis: "10em", flexGrow: 0 }}>DATE SIGNED</div>
          <div style={{ order: 2, flexBasis: "10em", flexGrow: 0 }} />
          <div style={{ order: 3, flexBasis: "20em", flexGrow: 0 }}>INSUREDS SIGNATURE</div>
        </div>
        {/* **** Date signed 3 **** */}
        <div className="topMargin5pc" />
        <div className="topMargin5pc" />
        <div className="formRow">
          <div style={{ order: 1, flexBasis: "10em", flexGrow: 0 }}>
            <input data-bind="value: o" />
            <span data-bind="text: o" />
          </div>
          <div style={{ order: 2, flexBasis: "10em", flexGrow: 0 }} />
          <div style={{ order: 3, flexBasis: "20em", flexGrow: 0 }}>
            <input data-bind="value: p" />
            <span data-bind="text: p" />
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
            AN UNALTERED COPY OF THE COMPENSATION AGREEMENT MUST BE ATTACHED TO THIS COMPLETED FORM
          </div>
        </div>
      </div>
    </div>
  );
};
