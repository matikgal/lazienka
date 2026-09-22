export function CadSheetHeader() {
  return (
    <header className="cad-sheet-header">
      <div className="sheet-title-col">
        <h2 className="sheet-main-title">DOKUMENTACJA TECHNICZNA ŁAZIENKI</h2>
        <span className="sheet-sub-title">Norma: wymiarowanie budowlane (PN-B-01025) | Jednostka: cm</span>
      </div>
      <div className="sheet-meta-box">
        <div>SKALA: 1:20 / 1:50</div>
        <div>STATUS: WYMIARY ZWERYFIKOWANE 90°</div>
      </div>
    </header>
  );
}
