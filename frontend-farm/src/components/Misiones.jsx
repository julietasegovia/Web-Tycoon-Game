/**
 * @fileoverview Modal de misiones diarias para Farm Tycoon.
 * Muestra las 3 misiones activas, su progreso y permite reclamar recompensas.
 *
 * @author Farm Tycoon
 * @version 1.0.0
 */

import { useGameStore, describeMision, multiplicadorRacha } from "../store/UseGameStore";

// ─── Helpers ─────────────────────────────────────────────────────────────────

const BOOSTER_EMOJIS = {
    X5oro:       "💵",
    sembradoAut: "👨‍🌾",
    X2All:       "💰",
    X10All:      "💰",
};

const BOOSTER_NOMBRES = {
    X5oro:       "Booster x5",
    sembradoAut: "Cosechar Todo",
    X2All:       "Booster x2",
    X10All:      "Booster x10",
};

// ─── Subcomponente: tarjeta de misión ────────────────────────────────────────

function TarjetaMision({ mision, onReclamar }) {
    const porcentaje = Math.min((mision.progreso / mision.objetivo) * 100, 100);

    const colorBarra =
        mision.completada  ? "#2d8046" :
        porcentaje > 50    ? "#614e1a" :
                             "#a07830";

    return (
        <div style={{
            background: mision.completada && !mision.reclamada
                ? "rgba(62, 177, 96, 0.08)"
                : "rgba(0,0,0,0.18)",
            border: `1.5px solid ${
                mision.reclamada   ? "#3a3010" :
                mision.completada  ? "#2e8548" :
                                     "#604601"
            }`,
            borderRadius: 12,
            padding: "14px 16px",
            display: "flex",
            flexDirection: "column",
            gap: 10,
            opacity: mision.reclamada ? 0.45 : 1,
            transition: "opacity 0.3s",
        }}>
            {/* Fila superior: descripción + badge reclamada */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                <span style={{ color: "#cba029", fontSize: 15, fontWeight: "bold", lineHeight: 1.3 }}>
                    {describeMision(mision)}
                </span>
                {mision.reclamada && (
                    <span style={{ fontSize: 11, color: "#32944f", whiteSpace: "nowrap", marginTop: 2 }}>
                        ✓ Reclamada
                    </span>
                )}
            </div>

            {/* Barra de progreso */}
            <div>
                <div style={{
                    height: 6,
                    background: "rgba(255,255,255,0.08)",
                    borderRadius: 6,
                    overflow: "hidden",
                }}>
                    <div style={{
                        width: `${porcentaje}%`,
                        height: "100%",
                        background: colorBarra,
                        borderRadius: 6,
                        transition: "width 0.4s ease",
                    }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                    <span style={{ fontSize: 11, color: "#a07830" }}>
                        {mision.progreso} / {mision.objetivo}
                    </span>
                    <span style={{ fontSize: 11, color: "#a07830" }}>
                        {Math.round(porcentaje)}%
                    </span>
                </div>
            </div>

            {/* Recompensa + botón reclamar */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <span style={{ fontSize: 12, color: "#cfa42e" }}>
                        🪙 +{mision.recompensaOro}
                    </span>
                    <span style={{ fontSize: 12, color: "#c9a240" }}>
                        {BOOSTER_EMOJIS[mision.recompensaBooster]} {BOOSTER_NOMBRES[mision.recompensaBooster]}
                    </span>
                </div>

                {mision.completada && !mision.reclamada && (
                    <button
                        onClick={() => onReclamar(mision.id)}
                        style={{
                            background: "#30894b",
                            border: "none",
                            borderRadius: 8,
                            color: "#ffd9ad",
                            fontSize: 12,
                            fontWeight: "bold",
                            padding: "5px 14px",
                            cursor: "pointer",
                            fontFamily: "monospace",
                            transition: "opacity 0.15s",
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.opacity = "0.82"}
                        onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
                    >
                        Reclamar ✔
                    </button>
                )}
            </div>
        </div>
    );
}

// ─── Subcomponente: indicador de racha ───────────────────────────────────────

function PanelRacha({ racha }) {
    const mult = multiplicadorRacha(racha);
    const siguiente = racha < 3 ? 3 : racha < 6 ? 6 : racha < 10 ? 10 : null;

    const colorRacha =
        racha >= 10 ? "#c23f30" :
        racha >= 6  ? "#de7d28" :
        racha >= 3  ? "#d5ab37" :
                      "#a07830";

    return (
        <div style={{
            background: "rgba(0,0,0,0.18)",
            border: "1.5px solid #604601",
            borderRadius: 12,
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
        }}>
            <div>
                <div style={{ color: "#d5ab39", fontSize: 13, fontWeight: "bold", marginBottom: 2 }}>
                    ᯓ★ Racha de cosecha
                </div>
                <div style={{ color: "#a07830", fontSize: 11 }}>
                    {siguiente
                        ? `Llegá a ${siguiente} cosechas seguidas para subir`
                        : "Racha máxima alcanzada!"}
                </div>
            </div>
            <div style={{ textAlign: "right" }}>
                <div style={{ color: colorRacha, fontSize: 22, fontWeight: "bold", lineHeight: 1 }}>
                    {racha}🔥
                </div>
                <div style={{ color: colorRacha, fontSize: 12, fontWeight: "bold", marginTop: 2 }}>
                    ×{mult} oro
                </div>
            </div>
        </div>
    );
}

// ─── Componente principal ─────────────────────────────────────────────────────

/**
 * Modal de misiones diarias.
 * Se renderiza solo cuando `misionesAbiertas` es true en el store.
 *
 * @component
 * @returns {JSX.Element|null}
 */
export default function Misiones() {
    const misionesAbiertas  = useGameStore((s) => s.misionesAbiertas);
    const cerrarMisiones    = useGameStore((s) => s.cerrarMisiones);
    const misiones          = useGameStore((s) => s.misiones);
    const reclamarMision    = useGameStore((s) => s.reclamarMision);
    const racha             = useGameStore((s) => s.racha);
    const refrescarMisiones = useGameStore((s) => s.refrescarMisiones);

    if (!misionesAbiertas) return null;

    const todasReclamadas = misiones.every((m) => m.reclamada);

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.52)",
                zIndex: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
            onClick={cerrarMisiones}
        >
            <div
                style={{
                    background: "rgb(53, 37, 23)",
                    border: "2px solid #5a440c",
                    borderRadius: 20,
                    padding: "24px 28px",
                    width: 400,
                    fontFamily: "monospace",
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    gap: 14,
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <p style={{ color: "#d8ad36", fontSize: 20, fontWeight: "bold", margin: 0 }}>
                        📋 Misiones
                    </p>
                    <button
                        onClick={cerrarMisiones}
                        style={{
                            background: "transparent",
                            border: "none",
                            color: "#a07830",
                            fontSize: 22,
                            cursor: "pointer",
                            lineHeight: 1,
                            padding: "0 4px",
                        }}
                    >
                        ✕
                    </button>
                </div>

                <div style={{ height: 1, background: "#6c5210" }} />

                {/* Panel de racha */}
                <PanelRacha racha={racha} />

                <div style={{ height: 1, background: "#6c5210" }} />

                {/* Lista de misiones */}
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {misiones.map((mision) => (
                        <TarjetaMision
                            key={mision.id}
                            mision={mision}
                            onReclamar={reclamarMision}
                        />
                    ))}
                </div>

                {/* Botón refrescar si todas reclamadas */}
                {todasReclamadas && (
                    <button
                        onClick={refrescarMisiones}
                        style={{
                            marginTop: 4,
                            background: "transparent",
                            border: "1.5px solid #604601",
                            borderRadius: 10,
                            color: "#f5c542",
                            fontFamily: "monospace",
                            fontSize: 14,
                            padding: "8px 0",
                            cursor: "pointer",
                            transition: "background 0.15s",
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = "rgba(120,97,34,0.25)"}
                        onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                    >
                        🔄 Nuevas misiones
                    </button>
                )}
            </div>
        </div>
    );
}