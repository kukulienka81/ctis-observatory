// Option D — "Interactive Comparison"
// User picks metrics, compares Czechia against any subset of peers,
// cross-filters, and explores. Czechia is always the anchor/benchmark.

const OptionD = () => {
  const { useState, useMemo } = React;
  const C = window.CTIS.countries;
  const all = Object.keys(C);
  const peers = all.filter(n => n !== "Czechia");

  // Metrics available for comparison
  const METRICS = [
    { k: "tr",  name: "Total trials",        hint: "Absolute count of trials", fmt: v => v.toLocaleString(), hi: true },
    { k: "pc",  name: "Trials per million",  hint: "Trials / population", fmt: v => v.toFixed(1), hi: true },
    { k: "gr",  name: "Growth 2023→25",      hint: "% increase in annual trials", fmt: v => "+"+v+"%", hi: true },
    { k: "nSp", name: "Unique sponsors",     hint: "Distinct organisations running trials", fmt: v => v, hi: true },
    { k: "taC", name: "Disease areas",       hint: "Breadth of therapeutic coverage", fmt: v => v, hi: true },
    { k: "com", name: "Commercial share",    hint: "% of trials run by industry", fmt: v => v.toFixed(1)+"%", hi: true },
    { k: "onc", name: "Oncology share",      hint: "% of trials in cancer", fmt: v => v.toFixed(1)+"%", hi: true },
    { k: "ped", name: "Paediatric share",    hint: "% of trials including children", fmt: v => v.toFixed(1)+"%", hi: true },
    { k: "p1",  name: "Phase I share",       hint: "% of trials in Phase I (earliest)", fmt: v => v.toFixed(1)+"%", hi: true },
    { k: "cmp", name: "Completed share",     hint: "% of trials already completed", fmt: v => v.toFixed(1)+"%", hi: true },
    { k: "rcr", name: "Recruiting share",    hint: "% actively enrolling patients", fmt: v => v.toFixed(1)+"%", hi: true },
    { k: "ed",  name: "Decision time (days)",hint: "Median days from submission to regulatory decision", fmt: v => v+" d", hi: false, path: "tl.eval_to_decision" },
    { k: "ar",  name: "Activation (days)",   hint: "Days from decision to first patient", fmt: v => v+" d", hi: false, path: "tl.auth_to_recruitment" },
    { k: "rd",  name: "Recruitment (days)",  hint: "Duration of the recruitment period", fmt: v => v+" d", hi: false, path: "tl.recruitment_duration" },
    { k: "td",  name: "Trial length (days)", hint: "Overall conduct duration", fmt: v => v+" d", hi: false, path: "tl.trial_duration" }
  ];

  const getVal = (country, m) => {
    const d = C[country];
    if (!m.path) return d[m.k];
    return m.path.split(".").reduce((o,k)=>o[k], d);
  };

  // State
  const [metricKey, setMetricKey] = useState("pc");
  const [selected, setSelected] = useState(["Germany", "Poland", "Hungary", "Austria", "Spain"]);
  const [mode, setMode] = useState("bar"); // bar | scatter | radar | table

  const metric = METRICS.find(m => m.k === metricKey);

  // Ranks
  const ranked = useMemo(() => {
    const arr = all.map(n => ({ name: n, v: getVal(n, metric) }));
    arr.sort((a,b) => metric.hi ? b.v - a.v : a.v - b.v);
    return arr;
  }, [metricKey]);
  const czRank = ranked.findIndex(r => r.name === "Czechia") + 1;

  const toggle = (country) => {
    setSelected(s => s.includes(country) ? s.filter(x => x !== country) : [...s, country]);
  };

  const visibleSet = ["Czechia", ...selected];
  const cz = C["Czechia"];

  return (
    <div style={{ background: "#0F1419", color: "#E8ECEF", fontFamily: "'Inter', system-ui, sans-serif", minHeight: "100vh", padding: "32px 40px" }}>
      
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, paddingBottom: 20, borderBottom: "1px solid #1E2831" }}>
        <div>
          <div style={{ fontSize: 11, color: "#5B6F7A", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600 }}>Interactive Comparison</div>
          <div style={{ fontSize: 26, fontWeight: 700, marginTop: 4, letterSpacing: "-0.02em" }}>
            How does Czechia compare?
          </div>
          <div style={{ fontSize: 13, color: "#8FA4B0", marginTop: 4 }}>
            Pick a metric, choose peer countries, explore. Czechia stays anchored as the reference point.
          </div>
        </div>
        <div style={{ display: "flex", gap: 4, background: "#151C22", padding: 4, borderRadius: 8, border: "1px solid #1E2831" }}>
          {[
            { k: "bar", label: "Ranked" },
            { k: "scatter", label: "Scatter" },
            { k: "radar", label: "Profile" },
            { k: "table", label: "Table" }
          ].map(m => (
            <button key={m.k} onClick={() => setMode(m.k)} style={{
              padding: "7px 14px", fontSize: 12, fontWeight: 500, borderRadius: 6,
              background: mode === m.k ? "#B4542C" : "transparent",
              color: mode === m.k ? "#FFF" : "#8FA4B0",
              border: "none", cursor: "pointer"
            }}>{m.label}</button>
          ))}
        </div>
      </div>

      {/* Controls row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 16, marginBottom: 20 }}>
        {/* Metric picker */}
        <div style={{ background: "#151C22", border: "1px solid #1E2831", borderRadius: 10, padding: 18 }}>
          <div style={{ fontSize: 11, color: "#5B6F7A", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, marginBottom: 12 }}>
            Compare on
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {METRICS.map(m => (
              <button key={m.k} onClick={() => setMetricKey(m.k)} title={m.hint} style={{
                padding: "6px 11px", fontSize: 12, borderRadius: 6,
                background: metricKey === m.k ? "#B4542C" : "#0F1419",
                color: metricKey === m.k ? "#FFF" : "#B9CAD3",
                border: "1px solid " + (metricKey === m.k ? "#B4542C" : "#1E2831"),
                cursor: "pointer", fontWeight: metricKey === m.k ? 600 : 400
              }}>{m.name}</button>
            ))}
          </div>
          <div style={{ fontSize: 11, color: "#5B6F7A", marginTop: 12, fontStyle: "italic" }}>{metric.hint} · {metric.hi ? "higher is better" : "lower is better"}</div>
        </div>

        {/* Country picker */}
        <div style={{ background: "#151C22", border: "1px solid #1E2831", borderRadius: 10, padding: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: "#5B6F7A", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>
              Peers to compare · <span style={{ color: "#E8A876" }}>Czechia always shown</span>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setSelected(peers)} style={{ fontSize: 11, color: "#8FA4B0", background: "transparent", border: "1px solid #1E2831", borderRadius: 4, padding: "3px 8px", cursor: "pointer" }}>All</button>
              <button onClick={() => setSelected([])} style={{ fontSize: 11, color: "#8FA4B0", background: "transparent", border: "1px solid #1E2831", borderRadius: 4, padding: "3px 8px", cursor: "pointer" }}>None</button>
              <button onClick={() => setSelected(["Poland", "Hungary", "Austria", "Slovakia"].filter(x => peers.includes(x)))} style={{ fontSize: 11, color: "#8FA4B0", background: "transparent", border: "1px solid #1E2831", borderRadius: 4, padding: "3px 8px", cursor: "pointer" }}>Neighbours</button>
              <button onClick={() => setSelected(["Germany", "France", "Spain", "Italy"])} style={{ fontSize: 11, color: "#8FA4B0", background: "transparent", border: "1px solid #1E2831", borderRadius: 4, padding: "3px 8px", cursor: "pointer" }}>Big 4</button>
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {peers.map(n => {
              const on = selected.includes(n);
              return (
                <button key={n} onClick={() => toggle(n)} style={{
                  padding: "6px 11px", fontSize: 12, borderRadius: 6,
                  background: on ? "#1B3A4A" : "#0F1419",
                  color: on ? "#8FD1E8" : "#6B7A82",
                  border: "1px solid " + (on ? "#2C5870" : "#1E2831"),
                  cursor: "pointer", fontWeight: on ? 600 : 400
                }}>{on ? "✓ " : ""}{n}</button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Key callout: Czechia's position on this metric */}
      <div style={{ 
        background: "linear-gradient(90deg, rgba(180,84,44,0.18) 0%, rgba(180,84,44,0.02) 100%)",
        border: "1px solid rgba(180,84,44,0.4)", borderRadius: 10, padding: "18px 24px", marginBottom: 20,
        display: "flex", alignItems: "center", gap: 28
      }}>
        <div>
          <div style={{ fontSize: 11, color: "#E8A876", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>Czechia · {metric.name}</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginTop: 4 }}>
            <div style={{ fontSize: 40, fontWeight: 700, color: "#FFF", fontFamily: "'Fraunces', serif", letterSpacing: "-0.02em", lineHeight: 1 }}>
              {metric.fmt(getVal("Czechia", metric))}
            </div>
            <div style={{ fontSize: 14, color: "#E8A876" }}>#{czRank} of {all.length}</div>
          </div>
        </div>
        <div style={{ flex: 1, fontSize: 13, color: "#B9CAD3", lineHeight: 1.55 }}>
          {czRank === 1 && "Czechia leads the peer group on this measure."}
          {czRank === 2 && "Czechia sits second — only one country ahead."}
          {czRank >= 3 && czRank <= all.length/2 && `Czechia is in the top half — ${ranked[0].name} leads with ${metric.fmt(ranked[0].v)}.`}
          {czRank > all.length/2 && `Czechia is in the lower half on this metric — ${ranked[0].name} leads with ${metric.fmt(ranked[0].v)}.`}
        </div>
      </div>

      {/* Main visual */}
      <div style={{ background: "#151C22", border: "1px solid #1E2831", borderRadius: 10, padding: 24, minHeight: 420 }}>
        {mode === "bar" && <BarView visible={visibleSet} metric={metric} getVal={getVal} C={C} />}
        {mode === "scatter" && <ScatterView visible={visibleSet} metricY={metric} getVal={getVal} C={C} />}
        {mode === "radar" && <RadarView visible={visibleSet} METRICS={METRICS} getVal={getVal} C={C} />}
        {mode === "table" && <TableView visible={visibleSet} METRICS={METRICS} getVal={getVal} C={C} />}
      </div>

      <div style={{ marginTop: 20, fontSize: 11, color: "#3D4F58", textAlign: "center" }}>
        Source: CTIS / EMA · Click any metric or country to refocus
      </div>
    </div>
  );
};

// --- Bar chart view: ranked, Czechia highlighted ---
const BarView = ({ visible, metric, getVal, C }) => {
  const all = Object.keys(C);
  const data = all.map(n => ({ name: n, v: getVal(n, metric) }));
  data.sort((a,b) => metric.hi ? b.v - a.v : a.v - b.v);
  const max = Math.max(...data.map(d => d.v));
  
  return (
    <div>
      <div style={{ fontSize: 12, color: "#5B6F7A", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>
        Ranked · {metric.name}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {data.map((d, i) => {
          const isCz = d.name === "Czechia";
          const isSel = visible.includes(d.name);
          const w = (d.v / max) * 100;
          return (
            <div key={d.name} style={{ 
              display: "grid", gridTemplateColumns: "32px 130px 1fr 80px", gap: 14, alignItems: "center",
              opacity: isSel ? 1 : 0.3, transition: "opacity 0.2s"
            }}>
              <div style={{ fontSize: 12, color: "#5B6F7A", fontVariantNumeric: "tabular-nums", textAlign: "right" }}>#{i+1}</div>
              <div style={{ fontSize: 14, color: isCz ? "#E8A876" : "#E8ECEF", fontWeight: isCz ? 600 : 400 }}>{d.name}</div>
              <div style={{ height: 22, background: "#0F1419", borderRadius: 4, overflow: "hidden", position: "relative" }}>
                <div style={{ 
                  width: w+"%", height: "100%", 
                  background: isCz ? "linear-gradient(90deg, #E8A876, #B4542C)" : "#3D5564",
                  borderRadius: 4
                }} />
              </div>
              <div style={{ fontSize: 14, color: isCz ? "#E8A876" : "#B9CAD3", fontVariantNumeric: "tabular-nums", fontWeight: isCz ? 600 : 400, textAlign: "right" }}>{metric.fmt(d.v)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// --- Scatter: metric Y vs population (size = trial count) ---
const ScatterView = ({ visible, metricY, getVal, C }) => {
  const all = Object.keys(C);
  const xVals = all.map(n => C[n].pop);
  const yVals = all.map(n => getVal(n, metricY));
  const xMax = Math.max(...xVals) * 1.05;
  const yMax = Math.max(...yVals) * 1.05;
  const yMin = metricY.hi ? 0 : Math.min(...yVals) * 0.95;
  const trMax = Math.max(...all.map(n => C[n].tr));

  const W = 800, H = 380, pad = 50;
  const xScale = v => pad + (v / xMax) * (W - pad * 2);
  const yScale = v => H - pad - ((v - yMin) / (yMax - yMin)) * (H - pad * 2);
  const rScale = v => 6 + (v / trMax) * 22;

  return (
    <div>
      <div style={{ fontSize: 12, color: "#5B6F7A", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>
        {metricY.name} vs Population · bubble size = total trials
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block" }}>
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map(t => {
          const y = pad + t * (H - pad * 2);
          const yv = yMax - t * (yMax - yMin);
          return (
            <g key={t}>
              <line x1={pad} x2={W-pad} y1={y} y2={y} stroke="#1E2831" strokeWidth="1" />
              <text x={pad-8} y={y+4} fill="#5B6F7A" fontSize="10" textAnchor="end" fontFamily="Inter">{metricY.fmt(yv).split(' ')[0]}</text>
            </g>
          );
        })}
        {[0, 0.25, 0.5, 0.75, 1].map(t => {
          const x = pad + t * (W - pad * 2);
          const xv = t * xMax;
          return (
            <g key={t}>
              <line x1={x} x2={x} y1={pad} y2={H-pad} stroke="#1E2831" strokeWidth="1" />
              <text x={x} y={H-pad+16} fill="#5B6F7A" fontSize="10" textAnchor="middle" fontFamily="Inter">{xv.toFixed(0)}M</text>
            </g>
          );
        })}
        <text x={W/2} y={H-10} fill="#8FA4B0" fontSize="11" textAnchor="middle" fontFamily="Inter">Population (millions) →</text>
        <text x={14} y={H/2} fill="#8FA4B0" fontSize="11" textAnchor="middle" fontFamily="Inter" transform={`rotate(-90 14 ${H/2})`}>{metricY.name}</text>

        {/* Bubbles */}
        {all.map(n => {
          const isCz = n === "Czechia";
          const isSel = visible.includes(n);
          const cx = xScale(C[n].pop);
          const cy = yScale(getVal(n, metricY));
          const r = rScale(C[n].tr);
          return (
            <g key={n} style={{ opacity: isSel ? 1 : 0.18 }}>
              <circle cx={cx} cy={cy} r={r}
                fill={isCz ? "rgba(232,168,118,0.35)" : "rgba(143,164,176,0.15)"}
                stroke={isCz ? "#E8A876" : "#5B6F7A"}
                strokeWidth={isCz ? 2 : 1} />
              <text x={cx} y={cy - r - 6} fill={isCz ? "#E8A876" : "#B9CAD3"} fontSize={isCz ? 13 : 11} textAnchor="middle" fontFamily="Inter" fontWeight={isCz ? 600 : 400}>{n}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

// --- Radar: multi-metric profile ---
const RadarView = ({ visible, METRICS, getVal, C }) => {
  // Use 8 key percentage/ratio metrics, normalized 0-1
  const axes = METRICS.filter(m => ["pc","gr","com","nSp","taC","cmp","rcr","ed"].includes(m.k));
  const maxes = {};
  axes.forEach(a => {
    maxes[a.k] = Math.max(...Object.keys(C).map(n => getVal(n, a)));
  });
  const mins = {};
  axes.forEach(a => {
    mins[a.k] = Math.min(...Object.keys(C).map(n => getVal(n, a)));
  });

  const W = 520, H = 440, cx = W/2, cy = H/2, R = 150;
  const angle = i => (i / axes.length) * Math.PI * 2 - Math.PI/2;
  
  const normalize = (a, v) => {
    const range = maxes[a.k] - mins[a.k];
    let n = range > 0 ? (v - mins[a.k]) / range : 0.5;
    return a.hi ? n : 1 - n;
  };

  const pointsFor = country => axes.map((a, i) => {
    const v = getVal(country, a);
    const r = normalize(a, v) * R;
    const ang = angle(i);
    return [cx + Math.cos(ang) * r, cy + Math.sin(ang) * r];
  });

  const colors = ["#6B9AD1", "#9C6BD1", "#D16B9C", "#D1A26B", "#6BD1A2", "#D1D16B", "#6BD1D1", "#B4A8A8", "#8FB4D1", "#D18F8F", "#B4D18F"];

  const vis = visible.filter(n => n !== "Czechia");

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 200px", gap: 20 }}>
      <div>
        <div style={{ fontSize: 12, color: "#5B6F7A", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>
          Multi-metric profile · normalized 0–1
        </div>
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto" }}>
          {/* Grid circles */}
          {[0.25, 0.5, 0.75, 1].map(t => (
            <circle key={t} cx={cx} cy={cy} r={R*t} fill="none" stroke="#1E2831" strokeWidth="1" />
          ))}
          {/* Axes */}
          {axes.map((a, i) => {
            const ang = angle(i);
            const ex = cx + Math.cos(ang) * R;
            const ey = cy + Math.sin(ang) * R;
            const lx = cx + Math.cos(ang) * (R + 22);
            const ly = cy + Math.sin(ang) * (R + 22);
            return (
              <g key={a.k}>
                <line x1={cx} y1={cy} x2={ex} y2={ey} stroke="#1E2831" strokeWidth="1" />
                <text x={lx} y={ly} fill="#8FA4B0" fontSize="10" textAnchor="middle" dominantBaseline="middle" fontFamily="Inter">{a.name}</text>
              </g>
            );
          })}
          {/* Peer polygons */}
          {vis.map((country, idx) => {
            const pts = pointsFor(country).map(p => p.join(",")).join(" ");
            const col = colors[idx % colors.length];
            return (
              <polygon key={country} points={pts} fill={col + "22"} stroke={col} strokeWidth="1.5" />
            );
          })}
          {/* Czechia on top */}
          {(() => {
            const pts = pointsFor("Czechia").map(p => p.join(",")).join(" ");
            return (
              <g>
                <polygon points={pts} fill="rgba(232,168,118,0.28)" stroke="#E8A876" strokeWidth="2.5" />
                {pointsFor("Czechia").map((p, i) => (
                  <circle key={i} cx={p[0]} cy={p[1]} r={3} fill="#E8A876" />
                ))}
              </g>
            );
          })()}
        </svg>
      </div>
      <div>
        <div style={{ fontSize: 11, color: "#5B6F7A", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Legend</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          <div style={{ width: 16, height: 3, background: "#E8A876" }} />
          <div style={{ fontSize: 13, color: "#E8A876", fontWeight: 600 }}>Czechia</div>
        </div>
        {vis.map((n, i) => (
          <div key={n} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <div style={{ width: 16, height: 3, background: colors[i % colors.length] }} />
            <div style={{ fontSize: 12, color: "#B9CAD3" }}>{n}</div>
          </div>
        ))}
        <div style={{ fontSize: 11, color: "#5B6F7A", marginTop: 14, fontStyle: "italic", lineHeight: 1.5 }}>
          Each axis is normalized 0–1 across all countries. Outward = stronger performance.
        </div>
      </div>
    </div>
  );
};

// --- Table: full matrix ---
const TableView = ({ visible, METRICS, getVal, C }) => {
  const all = Object.keys(C);
  const rows = visible;

  const rankFor = (m) => {
    const arr = all.map(n => ({ name: n, v: getVal(n, m) }));
    arr.sort((a,b) => m.hi ? b.v - a.v : a.v - b.v);
    return Object.fromEntries(arr.map((r, i) => [r.name, i+1]));
  };

  return (
    <div>
      <div style={{ fontSize: 12, color: "#5B6F7A", marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>
        Full comparison matrix · rank shown inline
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 12 }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: "10px 8px", color: "#5B6F7A", borderBottom: "1px solid #1E2831", fontWeight: 600, position: "sticky", left: 0, background: "#151C22" }}>Country</th>
              {METRICS.map(m => (
                <th key={m.k} title={m.hint} style={{ textAlign: "right", padding: "10px 8px", color: "#5B6F7A", borderBottom: "1px solid #1E2831", fontWeight: 600, whiteSpace: "nowrap" }}>{m.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(n => {
              const isCz = n === "Czechia";
              return (
                <tr key={n} style={{ background: isCz ? "rgba(180,84,44,0.08)" : "transparent" }}>
                  <td style={{ padding: "10px 8px", color: isCz ? "#E8A876" : "#E8ECEF", fontWeight: isCz ? 600 : 400, borderBottom: "1px solid #1E2831", position: "sticky", left: 0, background: isCz ? "#2A1E18" : "#151C22" }}>{n}</td>
                  {METRICS.map(m => {
                    const v = getVal(n, m);
                    const ranks = rankFor(m);
                    const r = ranks[n];
                    return (
                      <td key={m.k} style={{ padding: "10px 8px", textAlign: "right", color: isCz ? "#E8A876" : "#B9CAD3", borderBottom: "1px solid #1E2831", fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>
                        {m.fmt(v)}
                        <span style={{ fontSize: 10, color: r <= 3 ? "#7FD19C" : r <= 6 ? "#D1B87F" : "#6B7A82", marginLeft: 6 }}>#{r}</span>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

window.OptionD = OptionD;
