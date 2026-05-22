// controllers/ConsommationController.js
// ══════════════════════════════════════════════════════════════
// Traduction EXACTE du C# ConsommationController en Node.js
//
// C#                                  Node.js
// ──────────────────────────────────  ──────────────────────────────────
// [ApiController]                     express.Router()
// [Route("api/[controller]")]         router.get("/api/consommation", ...)
// HttpClient _httpClient              fetch() natif (Node 18+)
// [HttpGet]                           router.get(...)
// [FromQuery] ConsommationType type   req.query.type
// return Ok(result)                   res.status(200).json(result)
// return StatusCode(500, "...")       res.status(500).json({erreur:"..."})
// ══════════════════════════════════════════════════════════════

const express          = require("express");
const router           = express.Router();
const { TYPES_VALIDES } = require("../models/ConsommationType");

// ── IP de l'ESP32 ─────────────────────────────────────────────
// 👉 Changer cette valeur avec l'IP affichée dans le moniteur série
const ESP32_IP = "10.104.159.23";

// ══════════════════════════════════════════════════════════════
//  GET /api/consommation?type=eau|electricite
//
//  Équivalent C# :
//  public async Task<IActionResult> GetConsommation(
//      [FromQuery] ConsommationType type)
// ══════════════════════════════════════════════════════════════
router.get("/", async (req, res) => {

    // ── 1. Lire le paramètre ?type= ───────────────────────────
    // C# : [FromQuery] ConsommationType type
    // Node: req.query.type
    const type = req.query.type;

    // ── 2. Validation ─────────────────────────────────────────
    // C# : le binding de l'enum fait ça automatiquement
    // Node: on le fait manuellement
    if (!type || !TYPES_VALIDES.includes(type.toLowerCase())) {
        return res.status(400).json({
            erreur: `Type invalide. Utiliser : ${TYPES_VALIDES.join(" ou ")}`
        });
    }

    try {
        // ── 3. Appel HTTP vers l'ESP32 ────────────────────────
        // C# : await _httpClient.GetAsync(esp32Url)
        // Node: await fetch(url)
        const esp32Url = `http://${ESP32_IP}/consommation?type=${type.toLowerCase()}`;

        const response = await fetch(esp32Url, {
            signal: AbortSignal.timeout(5000)   // timeout 5 secondes
        });

        // ── 4. Vérifier la réponse ESP32 ─────────────────────
        // C# : if (!response.IsSuccessStatusCode)
        // Node: if (!response.ok)
        if (!response.ok) {
            return res.status(500).json({ erreur: "Erreur ESP32" });
        }

        // ── 5. Lire le corps de la réponse ───────────────────
        // C# : await response.Content.ReadAsStringAsync()
        // Node: await response.json()  (si ESP32 renvoie du JSON)
        const result = await response.json();

        // ── 6. Renvoyer au frontend ───────────────────────────
        // C# : return Ok(result)
        // Node: return res.status(200).json(result)
        return res.status(200).json(result);

    } catch (err) {
        // ── 7. Gestion d'erreur ───────────────────────────────
        // C# : catch { return StatusCode(500, "Erreur serveur") }
        // Node: catch(err) { return res.status(500).json(...) }
        console.error("[ConsommationController] Erreur :", err.message);
        return res.status(500).json({ erreur: "Erreur serveur" });
    }
});

module.exports = router;
