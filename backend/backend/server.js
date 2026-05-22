// server.js
// ══════════════════════════════════════════════════════════════
// Équivalent de Program.cs / Startup.cs en C#
//
// C#                                  Node.js
// ──────────────────────────────────  ──────────────────────────────────
// builder.Services.AddControllers()   express()
// builder.Services.AddHttpClient()    fetch() est natif (Node 18+)
// app.MapControllers()                app.use("/api/consommation", ...)
// app.Run()                           app.listen(3000, ...)
// ══════════════════════════════════════════════════════════════

const express              = require("express");
const cors                 = require("cors");
const consommationRouter   = require("./controllers/ConsommationController");

const app  = express();
const PORT = 3000;

// ── Middlewares ───────────────────────────────────────────────
app.use(cors());            // Autorise le frontend à appeler ce backend
app.use(express.json());    // Parse le JSON entrant

// ── Routes ────────────────────────────────────────────────────
// C# : [Route("api/[controller]")] sur ConsommationController
// Node: app.use("/api/consommation", router)
app.use("/api/consommation", consommationRouter);

// ── Route santé ───────────────────────────────────────────────
app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
});

// ── Démarrage ─────────────────────────────────────────────────
app.listen(PORT, () => {
    console.log("╔══════════════════════════════════════════╗");
    console.log("║  Backend Node.js — Gestion Energie        ║");
    console.log(`║  http://localhost:${PORT}                  ║`);
    console.log("╠══════════════════════════════════════════╣");
    console.log("║  GET /api/consommation?type=eau           ║");
    console.log("║  GET /api/consommation?type=electricite   ║");
    console.log("╚══════════════════════════════════════════╝");
});
