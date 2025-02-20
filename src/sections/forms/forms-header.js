import { styles } from "./style";

export const FormsHeader = () => (
  <div className="formContainer">
    <div className="formRow formHeadContainer">
      <div className="formColumn" style={styles.hvN1012}>
        <div>140 ATLANTIC AVENUE</div>
        <div>UNIT 406</div>
        <div>OCEANSIDE, NY 11572</div>
      </div>
      <div className="formColumnCentered">
        <div className="formRow" style={{ justifyContent: "center" }}>
          <div style={styles.tnrB16}>PAUL GUTTMAN & CO., INC.</div>
        </div>
        <div style={styles.gsBB12}>Licensed Adjusters For The Insured</div>
        <div style={styles.cbB11} className="topMargin7pt">
          HOWARD GUTTMAN - SUBLICENSEE
        </div>
      </div>
      <div className="formColumn" style={{ ...styles.hvN1012, alignItems: "flex-end" }}>
        <div>BUS: 516-825-4800</div>
        <div>FAX: 516-825-4037</div>
        <div>CELL: 516-524-5353</div>
        <div>hguttmanpa@gmail.com</div>
      </div>
    </div>
  </div>
);
