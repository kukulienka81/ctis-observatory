// Option B — "Scoreboard"
// Card-based, at-a-glance ranking dashboard. Czechia as the home team.
// Feels like a sports/data scoreboard — bold, scannable, confident.

const OptionB = () => {
  const C = window.CTIS.countries;
  const cz = C["Czechia"];
  const all = Object.entries(C);
  
  const metrics = [
    { key: "pc",  label: "Trials per million", hint: "more is better", fmt: v => v.toFixed(1), higherBetter: true },
    { key: "gr",  label: "Growth 2023→2025",  hint: "% change",         fmt: v => "+"+v+"%", higherBetter: true },
    { key: "nSp", label: "Unique sponsors",    hint: "organizations",    fmt: v => v, higherBetter: true },
    { key: "taC", label: "Disease areas",      hint: "breadth",          fmt: v => v, higherBetter: true },
    { key: "cmp", label: "Completion rate",    hint: "% finished",       fmt: v => v+"%", higherBetter: true },
    { key: "rcr", label: "Recruiting rate",    hint: "% actively enrolling", fmt: v => v+"%", higherBetter: true }
  ];
  
  const speedMetric = { key: "eval_to_decision", label: "Decision speed", fmt: v => v+"d", higherBetter: false };

  const rankOf = (key, higherBetter) => {
    const sorted = [...all].sort((a,b) => higherBetter ? b[1][key] - a[1][key] : a[1][key] - b[1][key]);
    return sorted.findIndex(([n]) => n === "Czechia") + 1;
  };
  const rankSpeed = [...all].sort((a,b) => a[1].tl.eval_to_decision - b[1].tl.eval_to_decision).findIndex(([n]) => n === "Czechia") + 1;

  return (
    <div style={{ 
      background: "#0F1419", color: "#E8ECEF", fontFamily: "'Inter', system-ui, sans-serif",
      minHeight: "100vh", padding: "40px 48px"
    }}>
      {/* Header */}
      <header style={{ 
        display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32,
        paddingBottom: 20, borderBottom: "1px solid #1E2831"
      }}>
        <div>
          <div style={{ fontSize: 11, color: "#5B6F7A", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600 }}>
            EU Clinical Trials Scoreboard
          </div>
          <div style={{ fontSize: 28, fontWeight: 700, marginTop: 4, letterSpacing: "-0.02em" }}>
            How Czechia compares
          </div>
        </div>
        <div style={{ 
          fontSize: 11, color: "#5B6F7A", letterSpacing: "0.06em", textAlign: "right"
        }}>
          <div>{window.CTIS.meta.dateRange} · 12 peer countries</div>
          <div style={{ marginTop: 4, color: "#8FA4B0" }}>{window.CTIS.meta.totalTrials.toLocaleString()} EU trials tracked</div>
        </div>
      </header>

      {/* Czechia hero card */}
      <div style={{
        background: "linear-gradient(135deg, #C65B2E 0%, #8B3F1C 100%)",
        borderRadius: 12, padding: "32px 40px", marginBottom: 24,
        display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 48, alignItems: "center"
      }}>
        <div style={{ 
          fontSize: 72, fontFamily: "'Fraunces', serif", lineHeight: 1, fontWeight: 400, color: "#FFF4E8"
        }}>🇨🇿</div>
        <div>
          <div style={{ fontSize: 13, color: "#FFE1C4", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600, marginBottom: 4 }}>
            Home team
          </div>
          <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1, color: "#FFF" }}>
            Czechia
          </div>
          <div style={{ fontSize: 14, color: "#FFD9B5", marginTop: 8 }}>
            {cz.tr.toLocaleString()} trials · {cz.pop}M inhabitants · {cz.nSp} sponsors
          </div>
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 10, color: "#FFD9B5", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>Per capita</div>
            <div style={{ fontSize: 44, fontWeight: 300, color: "#FFF", lineHeight: 1, fontFamily: "'Fraunces', serif" }}>{cz.pc}</div>
            <div style={{ fontSize: 11, color: "#FFD9B5" }}>rank #{rankOf("pc", true)} of 12</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 10, color: "#FFD9B5", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>Growth</div>
            <div style={{ fontSize: 44, fontWeight: 300, color: "#FFF", lineHeight: 1, fontFamily: "'Fraunces', serif" }}>+{cz.gr}%</div>
            <div style={{ fontSize: 11, color: "#FFD9B5" }}>rank #{rankOf("gr", true)} of 12</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 10, color: "#FFD9B5", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>Decision</div>
            <div style={{ fontSize: 44, fontWeight: 300, color: "#FFF", lineHeight: 1, fontFamily: "'Fraunces', serif" }}>{cz.tl.eval_to_decision}d</div>
            <div style={{ fontSize: 11, color: "#FFD9B5" }}>rank #{rankSpeed} of 12</div>
          </div>
        </div>
      </div>

      {/* Metric cards grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
        {metrics.map(m => {
          const czVal = cz[m.key];
          const rank = rankOf(m.key, m.higherBetter);
          const sorted = [...all].sort((a,b) => m.higherBetter ? b[1][m.key] - a[1][m.key] : a[1][m.key] - b[1][m.key]);
          const max = Math.max(...all.map(([,d]) => d[m.key]));
          
          return (
            <div key={m.key} style={{
              background: "#151C22", borderRadius: 10, padding: 20,
              border: "1px solid #1E2831"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 12 }}>
                <div>
                  <div style={{ fontSize: 11, color: "#5B6F7A", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>{m.label}</div>
                  <div style={{ fontSize: 10, color: "#3D4F58", marginTop: 2 }}>{m.hint}</div>
                </div>
                <div style={{ 
                  fontSize: 11, padding: "3px 8px", borderRadius: 4, fontWeight: 700,
                  background: rank <= 3 ? "#1B3A2A" : rank <= 6 ? "#3A2F1B" : "#2A1E1E",
                  color: rank <= 3 ? "#7FD19C" : rank <= 6 ? "#D1B87F" : "#D18F7F"
                }}>#{rank} / 12</div>
              </div>
              <div style={{ 
                fontSize: 36, fontWeight: 700, color: "#E8ECEF", letterSpacing: "-0.02em", lineHeight: 1,
                marginBottom: 12
              }}>{m.fmt(czVal)}</div>
              
              {/* Mini bars of top 5 */}
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {sorted.slice(0, 5).map(([n, d]) => {
                  const isCz = n === "Czechia";
                  const w = (d[m.key] / max) * 100;
                  return (
                    <div key={n} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 70, fontSize: 11, color: isCz ? "#E8A876" : "#8FA4B0", fontWeight: isCz ? 600 : 400 }}>{n}</div>
                      <div style={{ flex: 1, height: 4, background: "#1E2831", borderRadius: 2, overflow: "hidden" }}>
                        <div style={{ width: w+"%", height: "100%", background: isCz ? "#E8A876" : "#3D5564" }} />
                      </div>
                      <div style={{ width: 40, fontSize: 11, textAlign: "right", color: isCz ? "#E8A876" : "#8FA4B0", fontVariantNumeric: "tabular-nums" }}>{m.fmt(d[m.key])}</div>
                    </div>
                  );
                })}
                {/* Show Czechia if not in top 5 */}
                {!sorted.slice(0,5).some(([n]) => n === "Czechia") && (
                  <div style={{ display: "flex", alignItems: "center", gap: 8, paddingTop: 4, borderTop: "1px dashed #1E2831", marginTop: 2 }}>
                    <div style={{ width: 70, fontSize: 11, color: "#E8A876", fontWeight: 600 }}>Czechia</div>
                    <div style={{ flex: 1, height: 4, background: "#1E2831", borderRadius: 2, overflow: "hidden" }}>
                      <div style={{ width: (czVal/max*100)+"%", height: "100%", background: "#E8A876" }} />
                    </div>
                    <div style={{ width: 40, fontSize: 11, textAlign: "right", color: "#E8A876", fontVariantNumeric: "tabular-nums", fontWeight: 600 }}>{m.fmt(czVal)}</div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom section — timeline + research focus */}
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 16 }}>
        <div style={{
          background: "#151C22", borderRadius: 10, padding: 24, border: "1px solid #1E2831"
        }}>
          <div style={{ fontSize: 11, color: "#5B6F7A", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, marginBottom: 16 }}>
            Annual trial authorizations · Czechia
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 20, height: 200 }}>
            {Object.entries(window.CTIS.czechiaYears).map(([y, v]) => {
              const max = Math.max(...Object.values(window.CTIS.czechiaYears));
              const h = (v/max) * 170;
              return (
                <div key={y} style={{ flex: 1, textAlign: "center" }}>
                  <div style={{ fontSize: 18, fontWeight: 600, color: "#E8A876", marginBottom: 8 }}>{v}</div>
                  <div style={{ height: h, background: "linear-gradient(180deg, #E8A876 0%, #C65B2E 100%)", borderRadius: "4px 4px 0 0", minHeight: 4 }} />
                  <div style={{ fontSize: 12, color: "#5B6F7A", marginTop: 8, fontVariantNumeric: "tabular-nums" }}>{y}</div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div style={{
          background: "#151C22", borderRadius: 10, padding: 24, border: "1px solid #1E2831"
        }}>
          <div style={{ fontSize: 11, color: "#5B6F7A", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, marginBottom: 16 }}>
            Top disease areas studied
          </div>
          {window.CTIS.czechiaTA.slice(0, 6).map((d, i) => {
            const max = window.CTIS.czechiaTA[0].count;
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <div style={{ flex: 1, fontSize: 12, color: "#E8ECEF" }}>{d.name}</div>
                <div style={{ width: 100, height: 4, background: "#1E2831", borderRadius: 2, overflow: "hidden" }}>
                  <div style={{ width: (d.count/max*100)+"%", height: "100%", background: "#E8A876" }} />
                </div>
                <div style={{ width: 30, fontSize: 12, textAlign: "right", color: "#8FA4B0", fontVariantNumeric: "tabular-nums" }}>{d.count}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div style={{ marginTop: 32, fontSize: 11, color: "#3D4F58", textAlign: "center" }}>
        Source: CTIS / European Medicines Agency · Updated {window.CTIS.meta.lastUpdated}
      </div>
    </div>
  );
};

window.OptionB = OptionB;
