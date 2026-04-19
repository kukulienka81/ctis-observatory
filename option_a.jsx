// Option A — "Czechia at a Glance"
// Narrative, scroll-based, plain-language. Big numbers first, context second.
// Feels like a well-designed policy briefing / public-interest publication.

const OptionA = () => {
  const cz = window.CTIS.countries["Czechia"];
  const peers = Object.entries(window.CTIS.countries).filter(([n]) => n !== "Czechia");

  // Ranking helpers
  const rankPC = [...Object.entries(window.CTIS.countries)].sort((a,b) => b[1].pc - a[1].pc);
  const czPCRank = rankPC.findIndex(([n]) => n === "Czechia") + 1;
  const rankSpeed = [...Object.entries(window.CTIS.countries)].sort((a,b) => a[1].tl.eval_to_decision - b[1].tl.eval_to_decision);
  const czSpeedRank = rankSpeed.findIndex(([n]) => n === "Czechia") + 1;

  const yearData = Object.entries(window.CTIS.czechiaYears);
  const maxYear = Math.max(...yearData.map(([,v]) => v));

  return (
    <div style={{ 
      background: "#F7F4ED", color: "#1A1815", fontFamily: "'Fraunces', Georgia, serif",
      minHeight: "100vh", padding: "0"
    }}>
      {/* Masthead */}
      <header style={{ 
        borderBottom: "1px solid #1A1815", padding: "16px 48px", 
        display: "flex", justifyContent: "space-between", alignItems: "baseline",
        background: "#F7F4ED", position: "sticky", top: 0, zIndex: 10
      }}>
        <div style={{ fontWeight: 600, fontSize: 14, letterSpacing: "-0.01em" }}>
          The Czech Trials Observer
        </div>
        <div style={{ fontSize: 11, fontFamily: "'Inter', sans-serif", color: "#6B6560", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          Issue 01 · {window.CTIS.meta.dateRange}
        </div>
      </header>

      {/* Hero */}
      <section style={{ padding: "80px 48px 64px", maxWidth: 980, margin: "0 auto" }}>
        <div style={{ 
          fontSize: 11, fontFamily: "'Inter', sans-serif", color: "#B4542C",
          textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 600, marginBottom: 20
        }}>
          A reader's guide to clinical trials in Czechia
        </div>
        <h1 style={{ 
          fontSize: 76, fontWeight: 400, lineHeight: 1.02, letterSpacing: "-0.02em",
          margin: 0, marginBottom: 24
        }}>
          Where does Czechia stand in European{" "}
          <em style={{ color: "#B4542C", fontStyle: "italic" }}>clinical research</em>?
        </h1>
        <p style={{ 
          fontSize: 20, lineHeight: 1.5, color: "#3A3530", fontFamily: "'Fraunces', Georgia, serif",
          maxWidth: 720, margin: 0, fontWeight: 300
        }}>
          Across the European Economic Area, <strong style={{fontWeight: 500}}>{window.CTIS.meta.totalTrials.toLocaleString()}</strong> clinical trials were registered between 2022 and 2025. This is what {window.CTIS.meta.totalRecords.toLocaleString()} country records tell us about Czechia — and the 11 neighbours we compare it to.
        </p>
      </section>

      {/* Big stat block */}
      <section style={{ background: "#1A1815", color: "#F7F4ED", padding: "64px 48px" }}>
        <div style={{ maxWidth: 980, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 48 }}>
          {[
            { n: cz.tr.toLocaleString(), l: "trials conducted in Czechia" },
            { n: cz.pc, l: "per million inhabitants" },
            { n: "+" + cz.gr + "%", l: "growth, 2023 → 2025" },
            { n: cz.nSp, l: "different sponsors" }
          ].map((d, i) => (
            <div key={i}>
              <div style={{ 
                fontSize: 72, fontWeight: 300, lineHeight: 1, letterSpacing: "-0.03em",
                color: i === 0 ? "#E8A876" : "#F7F4ED", marginBottom: 8,
                fontFamily: "'Fraunces', Georgia, serif"
              }}>{d.n}</div>
              <div style={{ 
                fontSize: 13, color: "#A8A39E", fontFamily: "'Inter', sans-serif", lineHeight: 1.5
              }}>{d.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How Czechia ranks */}
      <section style={{ padding: "80px 48px", maxWidth: 980, margin: "0 auto" }}>
        <div style={{ 
          fontSize: 11, fontFamily: "'Inter', sans-serif", color: "#6B6560",
          textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 600, marginBottom: 16
        }}>Chapter One · By the numbers</div>
        <h2 style={{ 
          fontSize: 42, fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em",
          margin: 0, marginBottom: 40, maxWidth: 720
        }}>
          Small country, <em style={{ color: "#B4542C" }}>busy</em> research pipeline.
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
          <div>
            <p style={{ fontSize: 17, lineHeight: 1.65, color: "#3A3530", marginTop: 0 }}>
              Czechia runs <strong>{cz.pc} clinical trials per million people</strong> — roughly three times Germany's rate and comparable to Austria and Sweden. Densely populated research hubs like Denmark and Belgium run more per capita, but few countries match Czechia's <strong>95% commercial trial share</strong> and <strong>65% growth</strong> over the last two years.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.65, color: "#3A3530" }}>
              Put differently: Czechia ranks <strong style={{color:"#B4542C"}}>#{czPCRank} of 12</strong> peer countries on trials per capita, but punches above its weight on regulatory speed, sponsor diversity, and pipeline growth.
            </p>
          </div>

          {/* Per-capita ranking visual */}
          <div style={{ borderLeft: "1px solid #D8D2C8", paddingLeft: 32 }}>
            <div style={{ 
              fontSize: 11, fontFamily: "'Inter', sans-serif", color: "#6B6560",
              textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16
            }}>Trials per million inhabitants</div>
            {rankPC.map(([name, d], i) => {
              const isCz = name === "Czechia";
              const w = (d.pc / rankPC[0][1].pc) * 100;
              return (
                <div key={name} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                  <div style={{ 
                    width: 20, fontSize: 11, color: "#9A948F", fontFamily: "'Inter', sans-serif",
                    fontVariantNumeric: "tabular-nums"
                  }}>{i+1}</div>
                  <div style={{ 
                    width: 96, fontSize: 13, fontWeight: isCz ? 600 : 400,
                    color: isCz ? "#B4542C" : "#1A1815", fontFamily: "'Inter', sans-serif"
                  }}>{name}</div>
                  <div style={{ flex: 1, height: 6, background: "#E8E2D4", borderRadius: 3, overflow: "hidden" }}>
                    <div style={{ 
                      width: w + "%", height: "100%", 
                      background: isCz ? "#B4542C" : "#1A1815"
                    }} />
                  </div>
                  <div style={{ 
                    width: 36, fontSize: 12, textAlign: "right",
                    color: isCz ? "#B4542C" : "#3A3530", fontFamily: "'Inter', sans-serif",
                    fontVariantNumeric: "tabular-nums", fontWeight: isCz ? 600 : 400
                  }}>{d.pc}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pull quote / regulatory speed */}
      <section style={{ background: "#EDE6D6", padding: "80px 48px" }}>
        <div style={{ maxWidth: 980, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 64, alignItems: "center" }}>
          <div>
            <div style={{ 
              fontSize: 11, fontFamily: "'Inter', sans-serif", color: "#6B6560",
              textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 600, marginBottom: 12
            }}>Chapter Two · Speed</div>
            <h2 style={{ 
              fontSize: 48, fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.02em",
              margin: "0 0 24px"
            }}>
              From application to green light: <em style={{color:"#B4542C"}}>{cz.tl.eval_to_decision} days</em>.
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: "#3A3530", marginTop: 0 }}>
              The median time a sponsor waits for a regulatory decision in Czechia sits at <strong>{cz.tl.eval_to_decision} days</strong> — within two days of Germany, France and Spain. Across our peer group, this number ranges only from 110 to 119 days: EU harmonisation is real, and it is working.
            </p>
            <p style={{ fontSize: 14, fontFamily: "'Inter', sans-serif", color: "#6B6560", lineHeight: 1.6 }}>
              Where Czechia pulls ahead: time from authorization to first patient enrolled — just <strong style={{color:"#B4542C"}}>{cz.tl.auth_to_recruitment} days</strong>, one of the fastest in Europe.
            </p>
          </div>

          {/* Horizontal timeline */}
          <div>
            <div style={{ fontSize: 11, fontFamily: "'Inter', sans-serif", color: "#6B6560", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 24 }}>
              The Czech clinical trial journey · median days
            </div>
            {[
              { label: "Evaluation → Decision", v: cz.tl.eval_to_decision, color: "#B4542C" },
              { label: "Decision → First patient", v: cz.tl.auth_to_recruitment, color: "#7A8F6B" },
              { label: "Recruitment period", v: cz.tl.recruitment_duration, color: "#C4A265" },
              { label: "Trial conduct", v: cz.tl.trial_duration, color: "#6B7A8F" }
            ].map((d, i) => {
              const max = 450;
              return (
                <div key={i} style={{ marginBottom: 18 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
                    <span style={{ fontSize: 13, fontFamily: "'Inter', sans-serif", color: "#1A1815" }}>{d.label}</span>
                    <span style={{ fontSize: 20, fontWeight: 400, color: d.color, fontFamily: "'Fraunces', serif" }}>
                      {d.v} <span style={{fontSize:12, color:"#6B6560"}}>days</span>
                    </span>
                  </div>
                  <div style={{ height: 4, background: "#DCD4C2", borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ width: (d.v/max*100)+"%", height: "100%", background: d.color }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What trials are run */}
      <section style={{ padding: "80px 48px", maxWidth: 980, margin: "0 auto" }}>
        <div style={{ 
          fontSize: 11, fontFamily: "'Inter', sans-serif", color: "#6B6560",
          textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 600, marginBottom: 16
        }}>Chapter Three · What's being studied</div>
        <h2 style={{ 
          fontSize: 42, fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em",
          margin: 0, marginBottom: 48, maxWidth: 720
        }}>
          A broad research base — <em style={{color:"#B4542C"}}>35 disease areas</em>.
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 64 }}>
          <div>
            <div style={{ fontSize: 11, fontFamily: "'Inter', sans-serif", color: "#6B6560", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>
              Most-studied disease areas
            </div>
            {window.CTIS.czechiaTA.map((d, i) => {
              const max = window.CTIS.czechiaTA[0].count;
              return (
                <div key={i} style={{ 
                  display: "grid", gridTemplateColumns: "1fr 2fr 40px", gap: 16, alignItems: "center",
                  padding: "12px 0", borderBottom: i < 7 ? "1px solid #E8E2D4" : "none"
                }}>
                  <div style={{ fontSize: 14, fontFamily: "'Inter', sans-serif", color: "#1A1815" }}>{d.name}</div>
                  <div style={{ height: 3, background: "#E8E2D4", borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ width: (d.count/max*100)+"%", height: "100%", background: "#1A1815" }} />
                  </div>
                  <div style={{ 
                    fontSize: 14, textAlign: "right", color: "#1A1815", fontFamily: "'Inter', sans-serif",
                    fontVariantNumeric: "tabular-nums", fontWeight: 500
                  }}>{d.count}</div>
                </div>
              );
            })}
          </div>

          <div>
            <div style={{ fontSize: 11, fontFamily: "'Inter', sans-serif", color: "#6B6560", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>
              Trials by phase
            </div>
            <div style={{ marginBottom: 40 }}>
              {Object.entries(window.CTIS.czechiaPhases).map(([phase, n]) => {
                const total = Object.values(window.CTIS.czechiaPhases).reduce((a,b)=>a+b,0);
                const p = (n/total*100);
                return (
                  <div key={phase} style={{ marginBottom: 14 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, fontFamily: "'Inter', sans-serif", marginBottom: 4 }}>
                      <span>{phase} <span style={{color:"#6B6560", fontSize: 11}}>
                        {phase === "Phase I" ? "— first-in-human" : 
                         phase === "Phase II" ? "— early efficacy" : 
                         phase === "Phase III" ? "— pivotal" : "— post-approval"}
                      </span></span>
                      <span style={{ fontWeight: 500 }}>{n} <span style={{color:"#9A948F"}}>({p.toFixed(0)}%)</span></span>
                    </div>
                    <div style={{ height: 6, background: "#E8E2D4", borderRadius: 3, overflow: "hidden" }}>
                      <div style={{ width: p+"%", height: "100%", background: "#B4542C" }} />
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ 
              background: "#1A1815", color: "#F7F4ED", padding: 24, borderRadius: 4
            }}>
              <div style={{ fontSize: 11, fontFamily: "'Inter', sans-serif", color: "#A8A39E", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>
                Most-studied conditions in Czechia
              </div>
              {window.CTIS.czechiaConditions.slice(0,5).map((c, i) => (
                <div key={i} style={{ 
                  display: "flex", justifyContent: "space-between", 
                  padding: "8px 0", borderBottom: i < 4 ? "1px solid #2A2825" : "none",
                  fontSize: 13, fontFamily: "'Inter', sans-serif"
                }}>
                  <span>{c.name}</span>
                  <span style={{ color: "#E8A876", fontVariantNumeric: "tabular-nums" }}>{c.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Growth over time */}
      <section style={{ background: "#1A1815", color: "#F7F4ED", padding: "80px 48px" }}>
        <div style={{ maxWidth: 980, margin: "0 auto" }}>
          <div style={{ fontSize: 11, fontFamily: "'Inter', sans-serif", color: "#A8A39E", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 600, marginBottom: 16 }}>
            Chapter Four · Momentum
          </div>
          <h2 style={{ fontSize: 42, fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em", margin: "0 0 40px", maxWidth: 720 }}>
            The ramp since the new EU regulation took effect.
          </h2>

          <div style={{ display: "flex", alignItems: "flex-end", gap: 24, height: 220, marginBottom: 16 }}>
            {yearData.map(([y, v]) => {
              const h = (v/maxYear) * 180;
              return (
                <div key={y} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "stretch" }}>
                  <div style={{ textAlign: "center", fontSize: 28, fontFamily: "'Fraunces', serif", marginBottom: 12, color: "#E8A876" }}>{v}</div>
                  <div style={{ height: h, background: "#E8A876", marginBottom: 12 }} />
                  <div style={{ textAlign: "center", fontSize: 14, fontFamily: "'Inter', sans-serif", color: "#A8A39E", paddingTop: 12, borderTop: "1px solid #2A2825" }}>{y}</div>
                </div>
              );
            })}
          </div>
          <p style={{ fontSize: 15, color: "#A8A39E", fontFamily: "'Inter', sans-serif", lineHeight: 1.6, maxWidth: 640 }}>
            From a single trial in 2022 — the CTR's first year — to over 260 per year by 2024 and 2025. The trajectory is steep, and it is sustained.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: "48px", borderTop: "1px solid #D8D2C8", maxWidth: 980, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontFamily: "'Inter', sans-serif", color: "#6B6560" }}>
          <span>Source: Clinical Trials Information System (CTIS), European Medicines Agency</span>
          <span>Updated {window.CTIS.meta.lastUpdated}</span>
        </div>
      </footer>
    </div>
  );
};

window.OptionA = OptionA;
