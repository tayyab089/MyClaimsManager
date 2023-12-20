export const SubrogationReceipt = () => {
  return (
    <div
      id="claimFormPrintContainer"
      data-bind="template: { name: activeFormTmpl, data: form().data()}"
    >
      <div className="formContainer" style={{ padding: ".3in .3in" }}>
        {/* ************************************************************************************************* */}
        {/* NOTE: Input fields do not render in the print layout since the content is not in the DOM */}
        {/* Hence there is a span for every input. In the @media print css inputs are hidden and spans shown */}
        {/* ************************************************************************************************* */}
        <div className="formRowCentered">
          <h3 style={{ order: 1 }}>SUBROGATION RECEIPT</h3>
        </div>
        <div className="formRow topMargin10">
          <div style={{ order: 1 }}>Received of the</div>
          <div style={{ flexGrow: 1, order: 2 }}>
            <input data-bind="value: a" />
            <span data-bind="text: a">Fireman&apos;s Fund Insurance</span>
          </div>
          <div style={{ order: 3 }}>company the sum of</div>
        </div>
        <div className="formRow topMargin10">
          <div style={{ flexGrow: 1, order: 1 }}>
            <input data-bind="value: b" />
            <span data-bind="text: b">Three Thousand Twenty and 88/100</span>
          </div>
          <div style={{ order: 2 }}>Dollars ($</div>
          <div style={{ flexGrow: 0, flexBasis: "10em", order: 3 }}>
            <input data-bind="value: c" />
            <span data-bind="text: c">3,020.88</span>
          </div>
          <div style={{ order: 4 }}>) in full satisfaction of all</div>
        </div>
        <div className="formRow topMargin10">
          <div style={{ order: 1 }}>
            claims and demands of the undersigned against the said company under its policy No.
          </div>
          <div style={{ flexGrow: 0, flexBasis: "10em", order: 2 }}>
            <input data-bind="value: d" />
            <span data-bind="text: d">NYP2005065-11</span>
          </div>
        </div>
        <div className="formRow topMargin10">
          <div style={{ order: 1 }}>
            arising from or connected with any loss or damage by reason of
          </div>
          <div style={{ flexGrow: 1, order: 2 }}>
            <input data-bind="value: e" />
            <span data-bind="text: e">Fire</span>
          </div>
        </div>
        <div className="formRow topMargin10">
          <div style={{ flexGrow: 1, order: 1 }}>
            <input data-bind="value: f" />
            <span data-bind="text: f" />
          </div>
        </div>
        <div className="formRow topMargin10">
          <div style={{ order: 1 }}>which loss or damage occurred on or about the</div>
          <div style={{ flexGrow: 1, flexBasis: "5em", order: 2 }}>
            <input data-bind="value: g" />
            <span data-bind="text: g">8th</span>
          </div>
          <div style={{ order: 3 }}>day of</div>
          <div style={{ flexGrow: 1, order: 4 }}>
            <input data-bind="value: h" />
            <span data-bind="text: h">March</span>
          </div>
          <div style={{ order: 5 }}>20</div>
          <div style={{ flexGrow: 0, flexBasis: "5em", order: 6 }}>
            <input data-bind="value: i" />
            <span data-bind="text: i">13</span>
          </div>
        </div>
        <div className="formRow bottomMargin15" />
        <div className="formRow bottomMargin15">
          In consideration of and to the extent of said payment, the undersigned hereby surrogates.
          assigns and transfers to the said company all of the rights, claims, demands and interest
          which the undersigned has or may have against any parties for said loss or damage, and
          said company is hereby authorized and empowered to sue, compromise or settle same in the
          name of the undersigned or otherwise, but for the sole use of said company and at its ownn
          cost, and it is further authorized to collect and receipt for any moneys which may be paid
          upon said claims; to endorse in the name of the undersigned in his interest and behalf,
          any check or drafts given in payment of said claims: to cash such checks or drafts, and to
          retain the proceeds thereof; and said, company is hereby constituted the attorney-in-fact
          for the undersigned for said purposes and to sign releases, and to execute any and all
          contracts, documents or releases, in the name of the undersigned, that may be necessary in
          the prosecution. litigation or settlement of said claims, subject to the foregoing, said
          insurance company shall thereupon be subrogated to all rights of the undersigned against
          any such parties for such loss and damage, the undersigned has not released and will not
          release any portion of said claims, except as hereinafter indicated.
        </div>
        <div className="formRow bottomMargin10" />
        {/* **** Exceptions **** */}
        <div className="formRow">
          <div className="formRow rightMargin5" style={{ flexBasis: "50%", flexGrow: 0, order: 1 }}>
            Exceptions:
          </div>
          <div
            className="formRow finePrint leftMargin2pc"
            style={{ flexBasis: "50%", flexGrow: 0, order: 1 }}
          >
            &quot;Any person who knowingly and with intent to defraud any insurance company or other
            person files an application for insurance or statement of claim containing any
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
              <input data-bind="value: j" />
              <span data-bind="text: j" />
            </div>
            <div style={{ order: 3 }}>20</div>
            <div style={{ flexGrow: 0, flexBasis: "5em", order: 4 }}>
              <input data-bind="value: k" />
              <span data-bind="text: k" />
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
              <input data-bind="value: l" />
              <span data-bind="text: l">BR Affordable Housing, LLP</span>
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
              <input data-bind="value: m" />
              <span data-bind="text: m" />
            </div>
          </div>
          <div
            className="formRow leftMargin2pc"
            style={{ flexBasis: "50%", flexGrow: 0, order: 1 }}
          >
            <div style={{ flexGrow: 1, flexBasis: "5em", order: 4 }}>
              <input data-bind="value: n" />
              <span data-bind="text: n" />
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
              <input data-bind="value: o" />
              <span data-bind="text: o" />
            </div>
          </div>
          <div
            className="formRow leftMargin2pc"
            style={{ flexBasis: "50%", flexGrow: 0, order: 1 }}
          >
            <div style={{ order: 1 }}>By</div>
            <div style={{ flexGrow: 1, flexBasis: "5em", order: 1 }}>
              <input data-bind="value: p" />
              <span data-bind="text: p" />
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
                <input data-bind="value: q" />
                <span data-bind="text: q" />
              </div>
              <div>day of</div>
              <div style={{ flexGrow: 1, flexBasis: "5em" }}>
                <input data-bind="value: r" />
                <span data-bind="text: r" />
              </div>
              <div>20</div>
              <div style={{ flexGrow: 0, flexBasis: "3em" }}>
                <input data-bind="value: s" />
                <span data-bind="text: s" />
              </div>
            </div>
            {/* Before he came ... */}
            <div className="formRow">
              <div>Before he came</div>
              <div style={{ flexGrow: 1, flexBasis: "4em" }}>
                <input data-bind="value: t" />
                <span data-bind="text: t" />
              </div>
            </div>
            <div className="formRow">
              <div>to me known to be the individual described in,</div>
            </div>
            <div className="formRow">
              <div>and who executed, the foregoing instrument, and</div>
            </div>
            {/* acknowledged that ... */}
            <div className="formRow">
              <div>acknowledged that</div>
              <div style={{ flexGrow: 0, flexBasis: "4em" }}>
                <input data-bind="value: u" />
                <span data-bind="text: u" />
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
                  <input data-bind="value: v" />
                  <span data-bind="text: v" />
                </div>
                <div>day of</div>
                <div style={{ flexGrow: 1, flexBasis: "5em" }}>
                  <input data-bind="value: w" />
                  <span data-bind="text: w" />
                </div>
                <div>20</div>
                <div style={{ flexGrow: 0, flexBasis: "3em" }}>
                  <input data-bind="value: x" />
                  <span data-bind="text: x" />
                </div>
              </div>
              {/* Before he came ... */}
              <div className="formRow">
                <div>Before he came</div>
                <div style={{ flexGrow: 1, flexBasis: "4em" }}>
                  <input data-bind="value: y" />
                  <span data-bind="text: y" />
                </div>
              </div>
              <div className="formRow">
                <div>to me known, who, being by me duly sworn, did</div>
              </div>
              <div className="formRow">
                <div>depose and say that he resides in</div>
                <div style={{ flexGrow: 1, flexBasis: "6em" }}>
                  <input data-bind="value: z" />
                  <span data-bind="text: z" />
                </div>
              </div>
              {/* that he is the ... */}
              <div className="formRow">
                <div>that he is the</div>
                <div style={{ flexGrow: 1, flexBasis: "5em" }}>
                  <input data-bind="value: aa" />
                  <span data-bind="text: aa" />
                </div>
              </div>
              <div className="formRow">
                <div style={{ flexGrow: 1, flexBasis: "10em" }}>
                  <input data-bind="value: ab" />
                  <span data-bind="text: ab" />
                </div>
                <div>the corporation</div>
              </div>
              <div className="formRow">
                <div>
                  described in, and which executed, the foregoing instrument; that he knows the seal
                  of said corporation; that the seal affixed to the said instrument is such
                  corporate seal; that it was so affixed by order of the board of directors of the
                  said corporation; and that he signed his name thereto by like order.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
