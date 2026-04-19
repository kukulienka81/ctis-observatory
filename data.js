// Lightweight subset of CTIS data — focused on public-facing comparisons
// Czechia vs peer countries. Data source: user's original dataset (2022–2025).

window.CTIS = {
  meta: {
    totalTrials: 4640,
    totalRecords: 15742,
    totalCountries: 28,
    totalSponsors: 1628,
    totalConditions: 3372,
    totalProducts: 3185,
    dateRange: "2022–2025",
    lastUpdated: "April 2026"
  },
  // Countries focused on for comparison — a curated peer group
  countries: {
    "Czechia":     { pop: 10.9, tr: 689,  pc: 63.2, onc: 19.4, com: 95.1, gr: 65.6, ped: 10.4, cmp: 29.2, rcr: 81.4, p1: 11.5, nSp: 291, taC: 35, hhi: 886,  tl: { eval_to_decision: 115, auth_to_recruitment: 89,  recruitment_duration: 188, trial_duration: 293 } },
    "Germany":     { pop: 83.2, tr: 1737, pc: 20.9, onc: 27.1, com: 88.3, gr: 35.5, ped: 13.1, cmp: 27.5, rcr: 84.2, p1: 24.4, nSp: 627, taC: 40, hhi: 1062, tl: { eval_to_decision: 113, auth_to_recruitment: 99,  recruitment_duration: 207, trial_duration: 350 } },
    "Spain":       { pop: 47.4, tr: 2004, pc: 42.3, onc: 36.3, com: 86.6, gr: 40.8, ped: 14.2, cmp: 21.3, rcr: 88.0, p1: 25.2, nSp: 730, taC: 39, hhi: 1464, tl: { eval_to_decision: 114, auth_to_recruitment: 84,  recruitment_duration: 227, trial_duration: 369 } },
    "France":      { pop: 67.8, tr: 1635, pc: 24.1, onc: 36.1, com: 75.5, gr: 30.2, ped: 12.8, cmp: 18.2, rcr: 85.9, p1: 22.1, nSp: 561, taC: 43, hhi: 1394, tl: { eval_to_decision: 114, auth_to_recruitment: 121, recruitment_duration: 241, trial_duration: 393 } },
    "Italy":       { pop: 59.0, tr: 1406, pc: 23.8, onc: 36.8, com: 88.1, gr: 51.2, ped: 16.4, cmp: 18.3, rcr: 80.7, p1: 16.3, nSp: 512, taC: 38, hhi: 1456, tl: { eval_to_decision: 116, auth_to_recruitment: 128, recruitment_duration: 229, trial_duration: 434 } },
    "Poland":      { pop: 37.7, tr: 1145, pc: 30.4, onc: 25.1, com: 95.5, gr: 55.3, ped: 15.0, cmp: 22.5, rcr: 87.2, p1: 9.3,  nSp: 423, taC: 40, hhi: 1028, tl: { eval_to_decision: 119, auth_to_recruitment: 72,  recruitment_duration: 224, trial_duration: 430 } },
    "Belgium":     { pop: 11.6, tr: 1038, pc: 89.5, onc: 31.2, com: 85.5, gr: 24.5, ped: 12.1, cmp: 28.7, rcr: 83.2, p1: 26.4, nSp: 369, taC: 42, hhi: 1174, tl: { eval_to_decision: 112, auth_to_recruitment: 102, recruitment_duration: 158, trial_duration: 238 } },
    "Netherlands": { pop: 17.6, tr: 1034, pc: 58.7, onc: 26.7, com: 73.3, gr: 43.2, ped: 12.2, cmp: 27.2, rcr: 78.8, p1: 28.6, nSp: 388, taC: 42, hhi: 965,  tl: { eval_to_decision: 112, auth_to_recruitment: 106, recruitment_duration: 174, trial_duration: 250 } },
    "Denmark":     { pop: 5.9,  tr: 616,  pc: 104.4,onc: 25.2, com: 65.3, gr: 37.7, ped: 13.8, cmp: 21.3, rcr: 80.7, p1: 11.7, nSp: 228, taC: 37, hhi: 867,  tl: { eval_to_decision: 110, auth_to_recruitment: 119, recruitment_duration: 257, trial_duration: 416 } },
    "Hungary":     { pop: 9.7,  tr: 567,  pc: 58.5, onc: 22.8, com: 98.8, gr: 33.8, ped: 11.1, cmp: 26.8, rcr: 76.9, p1: 7.6,  nSp: 211, taC: 26, hhi: 1049, tl: { eval_to_decision: 117, auth_to_recruitment: 91,  recruitment_duration: 205, trial_duration: 391 } },
    "Austria":     { pop: 9.1,  tr: 446,  pc: 49.0, onc: 32.5, com: 83.9, gr: 45.8, ped: 11.9, cmp: 21.3, rcr: 74.7, p1: 9.4,  nSp: 187, taC: 33, hhi: 1250, tl: { eval_to_decision: 119, auth_to_recruitment: 129, recruitment_duration: 213, trial_duration: 358 } },
    "Sweden":      { pop: 10.5, tr: 434,  pc: 41.3, onc: 31.1, com: 75.3, gr: 43.1, ped: 13.4, cmp: 24.4, rcr: 77.6, p1: 15.9, nSp: 198, taC: 34, hhi: 1136, tl: { eval_to_decision: 112, auth_to_recruitment: 122, recruitment_duration: 198, trial_duration: 320 } }
  },
  // Yearly trial counts for Czechia (for trend visual)
  czechiaYears: { "2022": 1, "2023": 157, "2024": 264, "2025": 260 },
  // Top therapeutic areas for Czechia
  czechiaTA: [
    { name: "Cancer (Neoplasms)", count: 134 },
    { name: "Immune system", count: 94 },
    { name: "Heart & vascular", count: 84 },
    { name: "Brain & nervous system", count: 62 },
    { name: "Digestive system", count: 53 },
    { name: "Skin & connective tissue", count: 51 },
    { name: "Respiratory", count: 45 },
    { name: "Metabolic & nutritional", count: 33 }
  ],
  // Most studied conditions in Czechia
  czechiaConditions: [
    { name: "Atopic Dermatitis", count: 9 },
    { name: "Major Depressive Disorder", count: 6 },
    { name: "Plaque Psoriasis", count: 6 },
    { name: "Asthma", count: 6 },
    { name: "Myasthenia Gravis", count: 5 },
    { name: "Ulcerative Colitis", count: 5 }
  ],
  // Phase distribution
  czechiaPhases: { "Phase I": 79, "Phase II": 210, "Phase III": 386, "Phase IV": 14 },

  // Top sponsors running trials in Czechia (representative placeholder data)
  // tr = trials in Czechia; trEU = same sponsor's EU total; type = C (commercial) / A (academic)
  // TAs = top therapeutic areas for that sponsor; share = % of sponsor's EU trials that include Czechia
  sponsors: [
    { name: "Hoffmann-La Roche",   type: "C", tr: 38, trEU: 142, share: 26.8, country: "CH", phases: {1:6, 2:10, 3:21, 4:1}, TAs: ["Cancer", "Immune system", "Brain & nervous"], conditions: ["NSCLC", "Breast Cancer", "Multiple Sclerosis"] },
    { name: "Novartis",            type: "C", tr: 34, trEU: 138, share: 24.6, country: "CH", phases: {1:4, 2:9,  3:19, 4:2}, TAs: ["Cancer", "Heart & vascular", "Immune system"], conditions: ["Heart Failure", "CML", "Psoriasis"] },
    { name: "AstraZeneca",         type: "C", tr: 31, trEU: 128, share: 24.2, country: "UK", phases: {1:3, 2:8,  3:19, 4:1}, TAs: ["Cancer", "Respiratory", "Heart & vascular"], conditions: ["NSCLC", "Asthma", "Diabetes"] },
    { name: "Pfizer",              type: "C", tr: 29, trEU: 131, share: 22.1, country: "US", phases: {1:5, 2:7,  3:16, 4:1}, TAs: ["Cancer", "Immune system", "Infectious"], conditions: ["Breast Cancer", "Atopic Dermatitis", "RSV"] },
    { name: "Merck Sharp & Dohme", type: "C", tr: 27, trEU: 118, share: 22.9, country: "US", phases: {1:3, 2:6,  3:17, 4:1}, TAs: ["Cancer", "Infectious", "Immune system"], conditions: ["Melanoma", "NSCLC", "HIV"] },
    { name: "Janssen-Cilag",       type: "C", tr: 24, trEU: 109, share: 22.0, country: "BE", phases: {1:2, 2:6,  3:15, 4:1}, TAs: ["Immune system", "Cancer", "Brain & nervous"], conditions: ["Psoriasis", "Multiple Myeloma", "Depression"] },
    { name: "Eli Lilly",           type: "C", tr: 22, trEU: 94,  share: 23.4, country: "US", phases: {1:2, 2:5,  3:14, 4:1}, TAs: ["Metabolic", "Brain & nervous", "Cancer"], conditions: ["Obesity", "Alzheimer's", "Breast Cancer"] },
    { name: "Bristol-Myers Squibb",type: "C", tr: 19, trEU: 87,  share: 21.8, country: "US", phases: {1:2, 2:4,  3:12, 4:1}, TAs: ["Cancer", "Immune system", "Heart & vascular"], conditions: ["Lymphoma", "Rheumatoid Arthritis", "Atrial Fibrillation"] },
    { name: "Sanofi",              type: "C", tr: 18, trEU: 98,  share: 18.4, country: "FR", phases: {1:2, 2:5,  3:10, 4:1}, TAs: ["Immune system", "Cancer", "Metabolic"], conditions: ["Atopic Dermatitis", "Multiple Sclerosis", "Diabetes"] },
    { name: "GlaxoSmithKline",     type: "C", tr: 17, trEU: 89,  share: 19.1, country: "UK", phases: {1:2, 2:4,  3:10, 4:1}, TAs: ["Respiratory", "Cancer", "Infectious"], conditions: ["Asthma", "Ovarian Cancer", "HIV"] },
    { name: "AbbVie",              type: "C", tr: 16, trEU: 81,  share: 19.8, country: "US", phases: {1:1, 2:3,  3:11, 4:1}, TAs: ["Immune system", "Cancer", "Brain & nervous"], conditions: ["Crohn's", "Psoriasis", "Parkinson's"] },
    { name: "Boehringer Ingelheim",type: "C", tr: 14, trEU: 73,  share: 19.2, country: "DE", phases: {1:1, 2:3,  3:9,  4:1}, TAs: ["Heart & vascular", "Respiratory", "Cancer"], conditions: ["Heart Failure", "COPD", "IPF"] },
    { name: "Bayer",               type: "C", tr: 13, trEU: 71,  share: 18.3, country: "DE", phases: {1:1, 2:3,  3:8,  4:1}, TAs: ["Heart & vascular", "Cancer", "Reproductive"], conditions: ["Prostate Cancer", "Atrial Fibrillation", "Endometriosis"] },
    { name: "Takeda",              type: "C", tr: 11, trEU: 62,  share: 17.7, country: "JP", phases: {1:1, 2:2,  3:7,  4:1}, TAs: ["Cancer", "Digestive", "Immune system"], conditions: ["Multiple Myeloma", "IBD", "HAE"] },
    { name: "IKEM (Institute for Clinical & Experimental Medicine)", type: "A", tr: 8, trEU: 12, share: 66.7, country: "CZ", phases: {1:0, 2:2, 3:5, 4:1}, TAs: ["Heart & vascular", "Digestive", "Immune system"], conditions: ["Heart Failure", "Liver Transplant", "Diabetes"] },
    { name: "Charles University, Prague", type: "A", tr: 7, trEU: 9, share: 77.8, country: "CZ", phases: {1:1, 2:3, 3:2, 4:1}, TAs: ["Brain & nervous", "Cancer", "Paediatric"], conditions: ["Multiple Sclerosis", "Pediatric Leukemia", "Epilepsy"] },
    { name: "Masaryk Memorial Cancer Institute", type: "A", tr: 5, trEU: 6, share: 83.3, country: "CZ", phases: {1:1, 2:2, 3:2, 4:0}, TAs: ["Cancer"], conditions: ["Breast Cancer", "Colorectal Cancer", "Melanoma"] },
    { name: "Motol University Hospital", type: "A", tr: 4, trEU: 5, share: 80.0, country: "CZ", phases: {1:1, 2:1, 3:2, 4:0}, TAs: ["Paediatric", "Cancer", "Respiratory"], conditions: ["Pediatric Leukemia", "Cystic Fibrosis", "SMA"] }
  ],

  // Sponsor concentration per country (top-5 sponsors' share of all trials)
  sponsorConcentration: {
    "Czechia": 22.4, "Germany": 18.7, "Spain": 16.2, "France": 19.5, "Italy": 21.3,
    "Poland": 25.8, "Belgium": 19.1, "Netherlands": 20.4, "Denmark": 23.6,
    "Hungary": 28.2, "Austria": 24.1, "Sweden": 22.8
  }
};
