// Option E — "Sponsor Deep-Dive"
// Who actually runs the trials in Czechia? Interactive explorer.
// Commercial vs academic; sponsor-level detail; Czech anchor.

const OptionE = () => {
  const { useState, useMemo } = React;
  const S = window.CTIS.sponsors;
  const cz = window.CTIS.countries["Czechia"];
  const conc = window.CTIS.sponsorConcentration;

  const [filter, setFilter] = useState("all"); // all | commercial | academic
  const [sortKey, setSortKey] = useState("tr"); // tr | share | trEU
  const [selected, setSelected] = useState(S[0].name);

  const filtered = useMemo(() => {
    let arr = S.filter(s => filter === "all" || (filter === "commercial" && s.type === "C") || (filter === "academic" && s.type === "A"));
    arr = [...arr].sort((a,b) => b[sortKey] - a[sortKey]);
    return arr;
  }, [filter, sortKey]);

  const sel = S.find(s => s.name === selected) || S[0];
  const totalTrials = S.reduce((a,s) => a+s.tr, 0);
  const commercialTrials = S.filter(s=>s.type==="C").reduce((a,s)=>a+s.tr,0);
  const academicTrials = S.filter(s=>s.type==="A").reduce((a,s)=>a+s.tr,0);

  const concSorted = Object.entries(conc).sort((a,b) => a[1]-b[1]);
  const czConcRank = concSorted.findIndex(([n]) => n === "Czechia") + 1;

  return (
    <div style={{ background: "#0F1419", color: "#E8ECEF", fontFamily: "'Inter', system-ui, sans-serif", minHeight: "100vh", padding: "32px 40px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 24, paddingBottom: 20, borderBottom: "1px solid #1E2831" }}>
        <div>
          <div style={{ fontSize: 11, color: "#5B6F7A", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600 }}>Sponsor Deep-Dive</div>
          <div style={{ fontSize: 26, fontWeight: 700, marginTop: 4, letterSpacing: "-0.02em" }}>Who runs clinical trials in Czechia?</div>
          <div style={{ fontSize: 13, color: "#8FA4B0", marginTop: 4 }}>
            {cz.nSp} distinct sponsors · {S.length} shown · top-5 concentration: <strong style={{color:"#E8A876"}}>{conc["Czechia"]}%</strong> (rank #{czConcRank} of 12 — lower means more diverse)
          </div>
        </div>
      </div>

      {/* Summary strip */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 16, marginBottom: 20 }}>
        <div style={{ background: "#151C22", border: "1px solid #1E2831", borderRadius: 10, padding: 18 }}>
          <div style={{ fontSize: 11, color: "#5B6F7A", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, marginBottom: 10 }}>Commercial vs Academic · share of trials</div>
          <div style={{ display: "flex", height: 28, borderRadius: 4, overflow: "hidden" }}>
            <div style={{ width: (commercialTrials/totalTrials*100)+"%", background: "linear-gradient(90deg,#B4542C,#E8A876)", display: "flex", alignItems: "center", paddingLeft: 10, fontSize: 12, fontWeight: 600, color: "#FFF" }}>
              Commercial · {(commercialTrials/totalTrials*100).toFixed(0)}%
            </div>
            <div style={{ width: (academicTrials/totalTrials*100)+"%", background: "#3D5564", display: "flex", alignItems: "center", paddingLeft: 10, fontSize: 12, fontWeight: 600, color: "#E8ECEF" }}>
              Academic · {(academicTrials/totalTrials*100).toFixed(0)}%
            </div>
          </div>
          <div style={{ fontSize: 11, color: "#5B6F7A", marginTop: 10, fontStyle: "italic" }}>Across all Czech trials, {cz.com}% are commercially sponsored — among the highest in the EU.</div>
        </div>
        {[
          { n: S.filter(s=>s.type==="C").length, l: "Commercial sponsors shown", c: "#E8A876" },
          { n: S.filter(s=>s.type==="A").length, l: "Academic sponsors shown", c: "#8FA4B0" },
          { n: S[0].tr, l: "Trials by top sponsor", c: "#E8A876" }
        ].map((d,i) => (
          <div key={i} style={{ background: "#151C22", border: "1px solid #1E2831", borderRadius: 10, padding: 18 }}>
            <div style={{ fontSize: 11, color: "#5B6F7A", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>{d.l}</div>
            <div style={{ fontSize: 32, fontWeight: 700, color: d.c, fontFamily: "'Fraunces', serif", letterSpacing: "-0.02em", marginTop: 6 }}>{d.n}</div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: 16, marginBottom: 16, alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: 4, background: "#151C22", padding: 4, borderRadius: 8, border: "1px solid #1E2831" }}>
          {[{k:"all",l:"All sponsors"},{k:"commercial",l:"Commercial only"},{k:"academic",l:"Academic only"}].map(f => (
            <button key={f.k} onClick={() => setFilter(f.k)} style={{
              padding: "7px 14px", fontSize: 12, fontWeight: 500, borderRadius: 6,
              background: filter === f.k ? "#B4542C" : "transparent",
              color: filter === f.k ? "#FFF" : "#8FA4B0",
              border: "none", cursor: "pointer"
            }}>{f.l}</button>
          ))}
        </div>
        <div style={{ fontSize: 11, color: "#5B6F7A", textTransform: "uppercase", letterSpacing: "0.08em" }}>Sort by</div>
        <div style={{ display: "flex", gap: 4, background: "#151C22", padding: 4, borderRadius: 8, border: "1px solid #1E2831" }}>
          {[{k:"tr",l:"Trials in Czechia"},{k:"share",l:"Czech share %"},{k:"trEU",l:"EU total"}].map(f => (
            <button key={f.k} onClick={() => setSortKey(f.k)} style={{
              padding: "7px 14px", fontSize: 12, fontWeight: 500, borderRadius: 6,
              background: sortKey === f.k ? "#1B3A4A" : "transparent",
              color: sortKey === f.k ? "#8FD1E8" : "#8FA4B0",
              border: "none", cursor: "pointer"
            }}>{f.l}</button>
          ))}
        </div>
      </div>

      {/* Main grid: list + detail */}
      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 16 }}>
        {/* Sponsor list */}
        <div style={{ background: "#151C22", border: "1px solid #1E2831", borderRadius: 10, padding: 18 }}>
          <div style={{ display: "grid", gridTemplateColumns: "20px 1fr 60px 60px 80px", gap: 10, padding: "0 6px 10px", fontSize: 10, color: "#5B6F7A", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600, borderBottom: "1px solid #1E2831" }}>
            <div></div>
            <div>Sponsor</div>
            <div style={{ textAlign: "right" }}>CZ trials</div>
            <div style={{ textAlign: "right" }}>EU total</div>
            <div style={{ textAlign: "right" }}>CZ share</div>
          </div>
          <div style={{ maxHeight: 480, overflowY: "auto" }}>
            {filtered.map((s, i) => {
              const isSel = s.name === selected;
              const max = Math.max(...filtered.map(x => x[sortKey]));
              const w = (s[sortKey] / max) * 100;
              return (
                <button key={s.name} onClick={() => setSelected(s.name)} style={{
                  display: "grid", gridTemplateColumns: "20px 1fr 60px 60px 80px", gap: 10, padding: "12px 6px",
                  alignItems: "center", width: "100%", textAlign: "left",
                  background: isSel ? "rgba(180,84,44,0.14)" : "transparent",
                  border: "none", borderBottom: "1px solid #1E2831", cursor: "pointer",
                  color: "inherit", fontFamily: "inherit", position: "relative"
                }}>
                  <div style={{ 
                    width: 6, height: 6, borderRadius: 3,
                    background: s.type === "C" ? "#E8A876" : "#8FA4B0"
                  }} />
                  <div>
                    <div style={{ fontSize: 13, color: isSel ? "#E8A876" : "#E8ECEF", fontWeight: isSel ? 600 : 500 }}>{s.name}</div>
                    <div style={{ height: 3, background: "#0F1419", borderRadius: 2, marginTop: 4, overflow: "hidden" }}>
                      <div style={{ width: w+"%", height: "100%", background: s.type === "C" ? "#B4542C" : "#5B6F7A" }} />
                    </div>
                  </div>
                  <div style={{ fontSize: 13, textAlign: "right", color: isSel ? "#E8A876" : "#B9CAD3", fontVariantNumeric: "tabular-nums", fontWeight: sortKey === "tr" ? 600 : 400 }}>{s.tr}</div>
                  <div style={{ fontSize: 13, textAlign: "right", color: "#8FA4B0", fontVariantNumeric: "tabular-nums", fontWeight: sortKey === "trEU" ? 600 : 400 }}>{s.trEU}</div>
                  <div style={{ fontSize: 13, textAlign: "right", color: "#8FA4B0", fontVariantNumeric: "tabular-nums", fontWeight: sortKey === "share" ? 600 : 400 }}>{s.share.toFixed(1)}%</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detail panel */}
        <div style={{ background: "#151C22", border: "1px solid #1E2831", borderRadius: 10, padding: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <div style={{ 
              fontSize: 10, padding: "3px 8px", borderRadius: 4, fontWeight: 700,
              background: sel.type === "C" ? "#3A2F1B" : "#1E2831",
              color: sel.type === "C" ? "#E8A876" : "#8FA4B0"
            }}>{sel.type === "C" ? "COMMERCIAL" : "ACADEMIC"}</div>
            <div style={{ fontSize: 11, color: "#5B6F7A" }}>HQ · {sel.country}</div>
          </div>
          <h3 style={{ fontSize: 22, fontWeight: 700, margin: "8px 0 20px", letterSpacing: "-0.01em", lineHeight: 1.2 }}>{sel.name}</h3>

          {/* Big numbers */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 20 }}>
            <div style={{ background: "#0F1419", border: "1px solid #1E2831", borderRadius: 8, padding: "12px 14px" }}>
              <div style={{ fontSize: 10, color: "#5B6F7A", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>Trials in CZ</div>
              <div style={{ fontSize: 28, color: "#E8A876", fontFamily: "'Fraunces', serif", fontWeight: 400, lineHeight: 1, marginTop: 4 }}>{sel.tr}</div>
            </div>
            <div style={{ background: "#0F1419", border: "1px solid #1E2831", borderRadius: 8, padding: "12px 14px" }}>
              <div style={{ fontSize: 10, color: "#5B6F7A", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>EU total</div>
              <div style={{ fontSize: 28, color: "#E8ECEF", fontFamily: "'Fraunces', serif", fontWeight: 400, lineHeight: 1, marginTop: 4 }}>{sel.trEU}</div>
            </div>
            <div style={{ background: "#0F1419", border: "1px solid #1E2831", borderRadius: 8, padding: "12px 14px" }}>
              <div style={{ fontSize: 10, color: "#5B6F7A", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>CZ share</div>
              <div style={{ fontSize: 28, color: "#E8ECEF", fontFamily: "'Fraunces', serif", fontWeight: 400, lineHeight: 1, marginTop: 4 }}>{sel.share.toFixed(1)}%</div>
            </div>
          </div>

          {/* CZ / EU bar */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 11, color: "#5B6F7A", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600, marginBottom: 8 }}>Where this sponsor's EU trials run</div>
            <div style={{ display: "flex", height: 10, borderRadius: 3, overflow: "hidden", background: "#0F1419" }}>
              <div style={{ width: sel.share+"%", background: "#E8A876" }} title={`Czechia · ${sel.share.toFixed(1)}%`} />
              <div style={{ width: (100-sel.share)+"%", background: "#3D5564" }} title={`Rest of EU · ${(100-sel.share).toFixed(1)}%`} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#8FA4B0", marginTop: 4 }}>
              <span>🇨🇿 Czechia · {sel.tr}</span>
              <span>Rest of EU · {sel.trEU - sel.tr}</span>
            </div>
          </div>

          {/* Phase distribution */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 11, color: "#5B6F7A", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600, marginBottom: 8 }}>Phase mix · CZ trials</div>
            <div style={{ display: "flex", height: 24, borderRadius: 4, overflow: "hidden" }}>
              {Object.entries(sel.phases).map(([p, n], i) => {
                const w = (n / sel.tr) * 100;
                const cols = ["#6B9AD1","#9C6BD1","#B4542C","#D1A26B"];
                if (w === 0) return null;
                return (
                  <div key={p} style={{ width: w+"%", background: cols[i], display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, color: "#FFF", minWidth: 30 }} title={`Phase ${p}: ${n} trials`}>
                    {w > 10 ? `P${p}·${n}` : n}
                  </div>
                );
              })}
            </div>
          </div>

          {/* TAs */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 11, color: "#5B6F7A", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600, marginBottom: 8 }}>Top disease areas</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {sel.TAs.map(ta => (
                <div key={ta} style={{ fontSize: 12, padding: "5px 10px", background: "#0F1419", border: "1px solid #1E2831", borderRadius: 4, color: "#B9CAD3" }}>{ta}</div>
              ))}
            </div>
          </div>

          {/* Conditions */}
          <div>
            <div style={{ fontSize: 11, color: "#5B6F7A", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600, marginBottom: 8 }}>Notable conditions studied</div>
            {sel.conditions.map((c, i) => (
              <div key={c} style={{ fontSize: 13, color: "#E8ECEF", padding: "6px 0", borderBottom: i < sel.conditions.length-1 ? "1px solid #1E2831" : "none" }}>
                {c}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Concentration bar */}
      <div style={{ background: "#151C22", border: "1px solid #1E2831", borderRadius: 10, padding: 20, marginTop: 16 }}>
        <div style={{ fontSize: 11, color: "#5B6F7A", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, marginBottom: 4 }}>Sponsor concentration · top-5 share across peers</div>
        <div style={{ fontSize: 12, color: "#8FA4B0", marginBottom: 14 }}>Lower = more diverse research ecosystem. Czechia sits in the middle — healthier diversity than Hungary or Poland, more concentrated than Germany or Spain.</div>
        {concSorted.map(([n, v]) => {
          const isCz = n === "Czechia";
          const w = (v / 30) * 100;
          return (
            <div key={n} style={{ display: "grid", gridTemplateColumns: "110px 1fr 50px", gap: 12, alignItems: "center", marginBottom: 6 }}>
              <div style={{ fontSize: 12, color: isCz ? "#E8A876" : "#B9CAD3", fontWeight: isCz ? 600 : 400 }}>{n}</div>
              <div style={{ height: 8, background: "#0F1419", borderRadius: 2, overflow: "hidden" }}>
                <div style={{ width: w+"%", height: "100%", background: isCz ? "linear-gradient(90deg,#E8A876,#B4542C)" : "#3D5564", borderRadius: 2 }} />
              </div>
              <div style={{ fontSize: 12, textAlign: "right", color: isCz ? "#E8A876" : "#8FA4B0", fontVariantNumeric: "tabular-nums", fontWeight: isCz ? 600 : 400 }}>{v}%</div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 20, fontSize: 11, color: "#3D4F58", textAlign: "center" }}>
        Source: CTIS / EMA · Sponsor details are representative placeholders pending dataset refresh
      </div>
    </div>
  );
};

window.OptionE = OptionE;
