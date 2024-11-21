export const FormsHeader = () => (
  <div className="formContainer">
   
    <div className="formRow formHeadContainer">
      <div
        className="formColumn"
        style={{
          fontFamily: "Arial, sans-serif",
          fontSize: "12pt",
        }}
      >
        <div>140 ATLANTIC AVENUE</div>
        <div>UNIT 406</div>
        <div>OCEANSIDE, NY 11572</div>
      </div>
      <div className="formColumnCentered">
      <div className="formRow" style={{ justifyContent: "center" }}>
      <div
        style={{
          fontFamily: "Times New Roman, serif",
          fontWeight: "900",
          fontSize: "14pt",
        }}
      >
        PAUL GUTTMAN & CO., INC
      </div>
    </div>
        <div style={{ fontFamily: "cursive", fontSize: "12pt" }}>
          Licensed Adjusters For The Insured
        </div>
        <div
          style={{
            marginTop: "5pt",
            fontFamily: "Arial, sans-serif",
            fontWeight: "700",
            fontSize: "12pt",
            textTransform: "uppercase",
          }}
        >
          HOWARD GUTTMAN - SUBLICENSEE
        </div>
      </div>
      <div
        className="formColumn"
        style={{
          alignItems: "flex-end",
          fontFamily: "Arial, sans-serif",
          fontSize: "12pt",
        }}
      >
        <div>BUS: 516-825-4800</div>
        <div>FAX: 516-825-4037</div>
        <div>CELL: 516-524-5353</div>
        <div>hugttmanpa@gmail.com</div>
      </div>
    </div>
  </div>
);
