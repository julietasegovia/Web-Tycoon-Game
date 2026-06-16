/**
 * @fileoverview Notificaciones flotantes del juego.
 *
 * - NotificacionMision: aparece cuando se completa una misión.
 * - NotificacionRacha:  aparece al alcanzar hitos de racha (3, 6, 10).
 *
 * Ambas se desvanecen solas tras unos segundos.
 *
 * @author Farm Tycoon
 * @version 1.0.0
 */

import { useEffect, useState } from "react";
import { useGameStore, multiplicadorRacha } from "../store/UseGameStore";

// ─── CSS de animación (se inyecta una sola vez) ───────────────────────────────

const ANIM_CSS = `
@keyframes slideDown {
    from { opacity: 0; transform: translateX(-50%) translateY(-16px); }
    to   { opacity: 1; transform: translateX(-50%) translateY(0);     }
}
@keyframes fadeOut {
    from { opacity: 1; }
    to   { opacity: 0; }
}
`;

function InjectStyle() {
    useEffect(() => {
        if (document.getElementById("farm-notif-style")) return;
        const tag = document.createElement("style");
        tag.id = "farm-notif-style";
        tag.textContent = ANIM_CSS;
        document.head.appendChild(tag);
    }, []);
    return null;
}

// ─── Notificación de misión completada ───────────────────────────────────────

export function NotificacionMision() {
    const notif              = useGameStore((s) => s.notificacionMision);
    const misiones           = useGameStore((s) => s.misiones);
    const limpiar            = useGameStore((s) => s.limpiarNotificacionMision);
    const abrirMisiones      = useGameStore((s) => s.abrirMisiones);
    const [saliendo, setSaliendo] = useState(false);

    useEffect(() => {
        if (!notif) { setSaliendo(false); return; }
        // Empieza a desvanecerse a los 3s, desaparece a los 3.4s
        const t1 = setTimeout(() => setSaliendo(true),  3000);
        const t2 = setTimeout(() => { limpiar(); setSaliendo(false); }, 3400);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, [notif, limpiar]);

    if (!notif) return null;

    const mision = misiones.find((m) => m.id === notif.id);
    if (!mision) return null;

    return (
        <>
            <InjectStyle />
            <div
                onClick={() => { limpiar(); abrirMisiones(); }}
                style={{
                    position: "fixed",
                    top: 16,
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 50,
                    background: "rgb(53, 37, 23)",
                    border: "2px solid #3eb160",
                    borderRadius: 12,
                    padding: "10px 20px",
                    fontFamily: "monospace",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    animation: saliendo
                        ? "fadeOut 0.4s ease forwards"
                        : "slideDown 0.3s ease",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
                }}
            >
                <div style={{ color: "#3eb160", fontWeight: "bold", fontSize: 13 }}>
                    ✅ ¡Misión completada!
                </div>
                <div style={{ color: "#a07830", fontSize: 11, marginTop: 2 }}>
                    Tocá para reclamar tu recompensa →
                </div>
            </div>
        </>
    );
}

// ─── Notificación de hito de racha ───────────────────────────────────────────

const HITOS_RACHA = new Set([3, 6, 10]);

export function NotificacionRacha() {
    const racha = useGameStore((s) => s.racha);
    const [hitoMostrado, setHitoMostrado] = useState(null);
    const [saliendo, setSaliendo]         = useState(false);

    useEffect(() => {
        if (!HITOS_RACHA.has(racha)) return;
        // Evitar mostrar el mismo hito dos veces seguidas si la racha oscila
        if (hitoMostrado === racha) return;

        setHitoMostrado(racha);
        setSaliendo(false);

        const t1 = setTimeout(() => setSaliendo(true),  2400);
        const t2 = setTimeout(() => { setHitoMostrado(null); setSaliendo(false); }, 2800);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [racha]);

    if (!hitoMostrado) return null;

    const mult = multiplicadorRacha(hitoMostrado);
    const color =
        hitoMostrado >= 10 ? "#e74c3c" :
        hitoMostrado >= 6  ? "#e67e22" :
                             "#f5c542";

    return (
        <>
            <InjectStyle />
            <div style={{
                position: "fixed",
                top: 16,
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 49,
                background: "rgb(53, 37, 23)",
                border: `2px solid ${color}`,
                borderRadius: 12,
                padding: "10px 20px",
                fontFamily: "monospace",
                whiteSpace: "nowrap",
                animation: saliendo
                    ? "fadeOut 0.4s ease forwards"
                    : "slideDown 0.3s ease",
                boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
                pointerEvents: "none",
            }}>
                <div style={{ color, fontWeight: "bold", fontSize: 13 }}>
                    ⚡ ¡Racha de {hitoMostrado}! × {mult} oro
                </div>
                <div style={{ color: "#a07830", fontSize: 11, marginTop: 2 }}>
                    Cosechá rápido para mantenerla
                </div>
            </div>
        </>
    );
}