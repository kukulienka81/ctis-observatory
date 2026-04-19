// Option C — "Story Cards"
// Minimal, friendly, card-stack navigation. One insight per view.
// Swipe/click through bite-sized story cards. For the casual reader.

const OptionC = () => {
  const { useState } = React;
  const cz = window.CTIS.countries["Czechia"];
  const all = Object.entries(window.CTIS.countries);
  
  const [idx, setIdx] = useState(0);

  const rankPC = [...all].sort((a,b) => b[1].pc - a[1].pc);
  const czRank = rankPC.findIndex(([n]) => n === "Czechia") + 1;

  const cards = [
    {
      kicker: "01 / 06",
      label: "Welcome",
      title: "Clinical trials in Czechia",
      body: `Between ${window.CTIS.meta.dateRange}, ${cz.tr} clinical trials were conducted in Czechia. This is a short, visual guide to what that means — and how Czechia compares to its European peers.`,
      visual: (
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 180, fontWeight: 200, color: "#2B7A5C", lineHeight: 1, fontFamily: "'Fraunces', serif", letterSpacing: "-0.04em" }}>
            {cz.tr}
          </div>
          <div style={{ fontSize: 18, color: "#5A6B63", marginTop: 8 }}>trials</div>
        </div>
      )
    },
    {
      kicker: "02 / 06",
      label: "Per capita",
      title: "For a country of 11 million, that's a lot.",
      body: `Czechia runs ${cz.pc} trials per million inhabitants — ranking #${czRank} of 12 peer countries. That's ${(cz.pc / window.CTIS.countries["Germany"].pc).toFixed(1)}× Germany's rate.`,
      visual: (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {rankPC.slice(0, 8).map(([n, d]) => {
            const isCz = n === "Czechia";
            const w = (d.pc / rankPC[0][1].pc) * 100;
            return (
              <div key={n} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 110, fontSize: 14, color: isCz ? "#2B7A5C" : "#5A6B63", fontWeight: isCz ? 600 : 400 }}>{n}</div>
                <div style={{ flex: 1, height: 10, background: "#E8E5DE", borderRadius: 5, overflow: "hidden" }}>
                  <div style={{ width: w+"%", height: "100%", background: isCz ? "#2B7A5C" : "#C4BFB5", borderRadius: 5 }} />
                </div>
                <div style={{ width: 40, fontSize: 14, textAlign: "right", color: isCz ? "#2B7A5C" : "#5A6B63", fontVariantNumeric: "tabular-nums", fontWeight: isCz ? 600 : 400 }}>{d.pc}</div>
              </div>
            );
          })}
        </div>
      )
    },
    {
      kicker: "03 / 06",
      label: "Speed",
      title: `${cz.tl.eval_to_decision} days.`,
      body: "That's how long sponsors wait for a regulatory decision after applying. Czechia is right on the EU median — within a day or two of Germany, France, and Spain. EU harmonisation in action.",
      visual: (
        <div style={{ padding: "20px 0" }}>
          {[
            { label: "Application submitted", v: 0, main: false },
            { label: "Evaluation complete", v: cz.tl.eval_to_decision, main: true },
            { label: "First patient enrolled", v: cz.tl.eval_to_decision + cz.tl.auth_to_recruitment, main: false },
            { label: "Recruitment done", v: cz.tl.eval_to_decision + cz.tl.auth_to_recruitment + cz.tl.recruitment_duration, main: false }
          ].map((step, i, arr) => (
            <div key={i} style={{ display: "flex", gap: 20, position: "relative", paddingBottom: i < arr.length - 1 ? 32 : 0 }}>
              {i < arr.length - 1 && (
                <div style={{ position: "absolute", left: 14, top: 28, bottom: 0, width: 2, background: "#D4CFC2" }} />
              )}
              <div style={{ 
                width: 30, height: 30, borderRadius: "50%", 
                background: step.main ? "#2B7A5C" : "#FFF",
                border: step.main ? "none" : "2px solid #C4BFB5",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 700, color: step.main ? "#FFF" : "#5A6B63",
                flexShrink: 0, zIndex: 1
              }}>{i+1}</div>
              <div>
                <div style={{ fontSize: 15, color: "#1A2A24", fontWeight: step.main ? 600 : 400 }}>{step.label}</div>
                <div style={{ fontSize: 13, color: step.main ? "#2B7A5C" : "#7A8B83", fontFamily: "'Fraunces', serif", marginTop: 2 }}>
                  {step.v === 0 ? "Day 0" : `Day ${step.v}`}
                </div>
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      kicker: "04 / 06",
      label: "What's studied",
      title: "Cancer leads. Then the immune system.",
      body: "Of 35 disease areas active in Czechia, cancer trials form the largest group — though Czechia's oncology share (19%) is lower than Spain's or Italy's (37%). The Czech pipeline is notably broad rather than deep.",
      visual: (
        <div>
          {window.CTIS.czechiaTA.slice(0, 8).map((d, i) => {
            const max = window.CTIS.czechiaTA[0].count;
            const colors = ["#2B7A5C", "#4B8F76", "#6BA390", "#8AB7AA", "#A9CCC3", "#C9E0DC", "#C4BFB5", "#B8B2A5"];
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "8px 0", borderBottom: i < 7 ? "1px solid #E8E5DE" : "none" }}>
                <div style={{ flex: 1, fontSize: 14, color: "#1A2A24" }}>{d.name}</div>
                <div style={{ width: 140, height: 6, background: "#F0EDE5", borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ width: (d.count/max*100)+"%", height: "100%", background: colors[i], borderRadius: 3 }} />
                </div>
                <div style={{ width: 32, fontSize: 14, textAlign: "right", color: "#5A6B63", fontVariantNumeric: "tabular-nums", fontWeight: 500 }}>{d.count}</div>
              </div>
            );
          })}
        </div>
      )
    },
    {
      kicker: "05 / 06",
      label: "Growth",
      title: `A +${cz.gr}% surge since 2023.`,
      body: "Czechia's trial volume has grown steeply since the EU's new clinical-trial regulation took effect. From a single registered trial in 2022 to over 260 in 2025 — sustained, not a one-year spike.",
      visual: (
        <div style={{ display: "flex", alignItems: "flex-end", gap: 32, height: 260, padding: "0 20px" }}>
          {Object.entries(window.CTIS.czechiaYears).map(([y, v]) => {
            const max = Math.max(...Object.values(window.CTIS.czechiaYears));
            const h = (v/max) * 220;
            return (
              <div key={y} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                <div style={{ fontSize: 26, color: "#2B7A5C", fontFamily: "'Fraunces', serif", fontWeight: 400 }}>{v}</div>
                <div style={{ width: "100%", height: h, background: "#2B7A5C", borderRadius: "6px 6px 0 0", minHeight: 6 }} />
                <div style={{ fontSize: 14, color: "#5A6B63", fontVariantNumeric: "tabular-nums" }}>{y}</div>
              </div>
            );
          })}
        </div>
      )
    },
    {
      kicker: "06 / 06",
      label: "In summary",
      title: "A dense, fast-growing research hub.",
      body: "Czechia may be small, but it plays a role disproportionate to its size in European clinical research. Strong commercial mix, broad disease coverage, fast activation — all reasons why international sponsors keep choosing it.",
      visual: (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {[
            { n: `#${czRank}`, l: "per-capita rank among 12 peers", c: "#2B7A5C" },
            { n: `+${cz.gr}%`, l: "growth from 2023 to 2025", c: "#D4845A" },
            { n: cz.nSp, l: "different sponsors active", c: "#6B8FA8" },
            { n: `${cz.taC}`, l: "disease areas covered", c: "#A88668" }
          ].map((d, i) => (
            <div key={i} style={{ 
              background: "#FFF", border: "1px solid #E8E5DE", borderRadius: 10, padding: "22px 20px"
            }}>
              <div style={{ fontSize: 42, fontWeight: 300, color: d.c, fontFamily: "'Fraunces', serif", lineHeight: 1, letterSpacing: "-0.02em" }}>{d.n}</div>
              <div style={{ fontSize: 13, color: "#5A6B63", marginTop: 8, lineHeight: 1.4 }}>{d.l}</div>
            </div>
          ))}
        </div>
      )
    }
  ];

  const card = cards[idx];

  return (
    <div style={{ 
      background: "#FAF7F0", color: "#1A2A24", fontFamily: "'Inter', system-ui, sans-serif",
      minHeight: "100vh", padding: "40px 48px", display: "flex", flexDirection: "column"
    }}>
      {/* Header */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "#2B7A5C", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFF", fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 600 }}>Č</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Czech Trials, in Brief</div>
            <div style={{ fontSize: 11, color: "#7A8B83" }}>A visual guide · {window.CTIS.meta.dateRange}</div>
          </div>
        </div>
        {/* Progress dots */}
        <div style={{ display: "flex", gap: 6 }}>
          {cards.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} style={{
              width: i === idx ? 28 : 8, height: 8, borderRadius: 4,
              background: i === idx ? "#2B7A5C" : "#D4CFC2",
              border: "none", cursor: "pointer", padding: 0,
              transition: "all 0.3s"
            }} />
          ))}
        </div>
      </header>

      {/* Card content */}
      <main style={{ 
        flex: 1, background: "#FFF", border: "1px solid #E8E5DE", borderRadius: 16,
        padding: "48px 56px", display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 56,
        alignItems: "center", minHeight: 500
      }}>
        <div>
          <div style={{ fontSize: 11, color: "#2B7A5C", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 700, marginBottom: 14 }}>
            {card.kicker} · {card.label}
          </div>
          <h1 style={{ 
            fontSize: 44, fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em",
            margin: 0, marginBottom: 20, fontFamily: "'Fraunces', Georgia, serif"
          }}>{card.title}</h1>
          <p style={{ fontSize: 16, lineHeight: 1.65, color: "#4A5A52", margin: 0 }}>
            {card.body}
          </p>
        </div>
        <div style={{ 
          background: "#FAF7F0", borderRadius: 12, padding: 32, minHeight: 380,
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <div style={{ width: "100%" }}>{card.visual}</div>
        </div>
      </main>

      {/* Nav */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 24 }}>
        <button onClick={() => setIdx(Math.max(0, idx - 1))} disabled={idx === 0} style={{
          padding: "10px 20px", borderRadius: 8, border: "1px solid #D4CFC2",
          background: idx === 0 ? "transparent" : "#FFF",
          color: idx === 0 ? "#C4BFB5" : "#1A2A24",
          cursor: idx === 0 ? "default" : "pointer", fontSize: 14, fontWeight: 500
        }}>← Previous</button>
        <div style={{ fontSize: 12, color: "#7A8B83" }}>Source: CTIS / EMA</div>
        <button onClick={() => setIdx(Math.min(cards.length - 1, idx + 1))} disabled={idx === cards.length - 1} style={{
          padding: "10px 20px", borderRadius: 8, border: "none",
          background: idx === cards.length - 1 ? "#D4CFC2" : "#2B7A5C",
          color: "#FFF",
          cursor: idx === cards.length - 1 ? "default" : "pointer", fontSize: 14, fontWeight: 500
        }}>Next →</button>
      </div>
    </div>
  );
};

window.OptionC = OptionC;
