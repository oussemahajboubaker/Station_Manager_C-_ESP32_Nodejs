// models/ConsommationType.js
// ══════════════════════════════════════════════════════════════
// Équivalent de l'enum C# ConsommationType
//
// C# :                          Node.js :
// ──────────────────────────    ──────────────────────────────
// public enum ConsommationType  const ConsommationType = { ... }
// { eau, electricite }          Object.freeze() = valeurs fixes
// ══════════════════════════════════════════════════════════════

const ConsommationType = Object.freeze({
    EAU:          "eau",
    ELECTRICITE:  "electricite"
});

// Valeurs valides acceptées dans les requêtes
const TYPES_VALIDES = Object.values(ConsommationType);

module.exports = { ConsommationType, TYPES_VALIDES };
