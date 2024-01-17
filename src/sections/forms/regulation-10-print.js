import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    fontFamily: "Helvetica",
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 50,
    paddingRight: 50,
    lineHeight: 1.5,
    flexDirection: "column",
  },
  logo: {
    width: 84,
    height: 70,
    marginLeft: "auto",
    marginRight: "auto",
  },
});

const values = {
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
};

export const Regulation10Print = () => {
  return (
    <Document>
      <Page size="A4">
        <View>
          <Text>Hello World</Text>
          <div id="regulation10">
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
                  <span>{values?.a}</span>
                </div>
              </div>
              <div className="formRow topMargin15">
                <div style={{ order: 1, flexBasis: "5em" }}>FILE #</div>
                <div style={{ flexGrow: 1, order: 2 }}>
                  <span>{values?.b}</span>
                </div>
              </div>
              <div className="formRow topMargin15">
                <div style={{ order: 1, flexBasis: "5em" }}>POLICY #</div>
                <div style={{ flexGrow: 1, order: 2 }}>
                  <span>{values?.c}</span>
                </div>
              </div>
              <div className="formRow topMargin15 bottomMargin15">
                <div style={{ order: 1 }}>DATE OF LOSS:</div>
                <div style={{ flexGrow: 1, order: 2 }}>
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
                  <span>{values?.f}</span>
                </div>
                <div style={{ order: 2, flexGrow: 0 }}>A CHECK MADE PAYABLE TO:</div>
                <div style={{ flexBasis: "10em", flexGrow: 1, order: 3 }}>
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
                  <span>{values?.h}</span>
                </div>
              </div>
              <div className="topMargin1pc" />
              <div className="formRow">
                <div style={{ flexBasis: "5em", order: 1 }}>
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
                  <span>{values?.j}</span>
                </div>
              </div>
              <div className="topMargin1pc" />
              <div className="topMargin5pc" />
              <div className="topMargin5pc" />
              <div className="formRow">
                <div style={{ order: 1, flexBasis: "10em", flexGrow: 0 }}>
                  <span>{values?.k}</span>
                </div>
                <div style={{ order: 2, flexBasis: "10em", flexGrow: 0 }} />
                <div style={{ order: 3, flexBasis: "20em", flexGrow: 0 }}>
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
                  <span />
                </div>
                <div style={{ order: 2, flexBasis: "10em", flexGrow: 0 }} />
                <div style={{ order: 3, flexBasis: "20em", flexGrow: 0 }}>
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
                  <span />
                </div>
                <div style={{ order: 2, flexBasis: "10em", flexGrow: 0 }} />
                <div style={{ order: 3, flexBasis: "20em", flexGrow: 0 }}>
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
          <Text>Hello There</Text>
        </View>
      </Page>
    </Document>
  );
};
