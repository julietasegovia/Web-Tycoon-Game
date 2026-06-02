/**
 * @fileoverview Modal de tienda de boosters para Farm Tycoon.
 * Permite al jugador comprar mejoras (boosters) que aceleran el crecimiento
 * o multiplican las ganancias al cosechar.
 *
 * @author Farm Tycoon
 * @version 1.0.0
 */

import { useGameStore } from "../store/UseGameStore";
import { useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────

/**
 * @typedef {Object} BoosterInfo
 * @property {string} nombre       - Nombre legible del booster.
 * @property {string} emoji        - Emoji representativo.
 * @property {string} desc         - Descripción breve del efecto.
 * @property {number} precioCompra - Costo en oro para adquirirlo.
 */

/**
 * @typedef {{ msg: string, ok: boolean }|null} FeedbackState
 * Estado del mensaje de feedback tras intentar una compra.
 * `null` cuando no hay mensaje activo.
 */

// ─────────────────────────────────────────────────────────────────────────────

/**
 * Modal de tienda de boosters.
 *
 * - Se renderiza solo cuando `tiendaAbierta` es `true` en el store.
 * - Cierra al clickear el overlay exterior o el botón ✕.
 * - Muestra el catálogo de boosters; los que el jugador no puede pagar
 *   aparecen con opacidad reducida y cursor `not-allowed`.
 * - Muestra cuántas unidades activas tiene el jugador de cada booster.
 * - Tras cada intento de compra muestra un mensaje de feedback por 2 segundos.
 *
 * No recibe props; toda la información la obtiene de `useGameStore`.
 *
 * @component
 * @returns {JSX.Element|null} El modal, o `null` si la tienda está cerrada.
 *
 * @example
 * // Se monta en el árbol principal junto a Farm y siempre está presente;
 * // su visibilidad la controla el store.
 * <Shop />
 */
export default function Shop() {
  const tiendaAbierta       = useGameStore((s) => s.tiendaAbierta);
  const cerrarTienda        = useGameStore((s) => s.cerrarTienda);
  const catalogoBoosters    = useGameStore((s) => s.catalogoBoosters);
  const oro                 = useGameStore((s) => s.oro);
  const boosterSeleccionado = useGameStore((s) => s.boosterSeleccionado);
  const seleccionarBooster  = useGameStore((s) => s.seleccionarBooster);
  const comprarBooster      = useGameStore((s) => s.comprarBooster);
  const boostersActivos     = useGameStore((s) => s.boostersActivos);

  /** @type {[boolean, Function]} Estado hover del botón "Comprar" */
  const [isHovered, setIsHovered] = useState(false);

  /** @type {[FeedbackState, Function]} Mensaje de resultado de la última compra */
  const [feedback, setFeedback] = useState(null);

  // No renderizar si la tienda está cerrada
  if (!tiendaAbierta) return null;

  /** `true` si hay un booster seleccionado y el jugador tiene oro suficiente. */
  const puedeComprarSeleccionado =
    boosterSeleccionado &&
    oro >= (catalogoBoosters[boosterSeleccionado]?.precioCompra ?? Infinity);

  /**
   * Intenta comprar el booster seleccionado y muestra feedback por 2 segundos.
   * Si no hay booster seleccionado, muestra un aviso de error.
   */
  const handleComprar = () => {
    if (!boosterSeleccionado) {
      setFeedback({ msg: "Seleccioná un booster primero", ok: false });
      setTimeout(() => setFeedback(null), 2000);
      return;
    }
    const result = comprarBooster(boosterSeleccionado);
    setFeedback(
      result.ok
        ? { msg: `✓ ${catalogoBoosters[boosterSeleccionado].nombre} comprado`, ok: true }
        : { msg: result.msg, ok: false }
    );
    setTimeout(() => setFeedback(null), 2000);
  };

  // ── Estilos inline centralizados ──────────────────────────────────────────
  const estilos = {
    overlay: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.5)",
      zIndex: 10,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    modal: {
      background: "rgb(53, 37, 23)",
      border: "2px solid #5a440c",
      borderRadius: 20,
      padding: "24px 28px",
      width: 400,
      fontFamily: "monospace",
      position: "relative",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 18,
    },
    titulo: {
      color: "#d8ad36",
      fontSize: 20,
      fontWeight: "bold",
      margin: 0,
    },
    botonCerrar: {
      background: "transparent",
      border: "none",
      color: "#a07830",
      fontSize: 22,
      cursor: "pointer",
      lineHeight: 1,
      padding: "0 4px",
    },
    oro: {
      color: "#e5b634",
      fontSize: 20,
      marginBottom: 30,
      fontWeight: "bold",
    },
    divider: {
      height: 1,
      background: "#6c5210",
      marginBottom: 35,
    },
    grid: {
      overflowY: "auto",
      scrollbarColor: "#6c5210 rgb(53, 37, 23)",
      scrollbarWidth: "thin",
      height: 300,
      display: "flex",
      flexDirection: "column",
      gap: 12,
      marginBottom: 15,
    },
    /** @param {boolean} seleccionado */
    card: (seleccionado) => ({
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: seleccionado ? "rgba(120, 97, 34, 0.32)" : "transparent",
      border: "1.5px solid #604601",
      borderRadius: 10,
      padding: "12px 15px",
      transition: "background 0.15s",
      marginRight: 5,
      marginLeft: 5,
    }),
    emoji:  { fontSize: 25, color: "#f5c542" },
    info:   { display: "flex", flexDirection: "column", alignItems: "center" },
    nombre: { color: "#f5c542", fontSize: 15, fontWeight: "bold" },
    desc:   { color: "#a07830", fontSize: 12, width: "80%" },
    precios: { display: "flex", flexDirection: "column", alignItems: "center", gap: 3 },
    precio: { fontSize: 12, color: "#3eb160", marginRight: 5 },
    footer: { display: "flex", flexDirection: "column", justifyContent: "center", gap: 10 },
    venta:  { display: "flex", justifyContent: "center", color: "#a07830", marginTop: 5 },
    comprar: {
      backgroundColor: isHovered ? "rgba(120, 97, 34, 0.32)" : "transparent",
      borderRadius: 10,
      border: "1px solid #604601",
      fontSize: 20,
      padding: "5px 20px",
      color: "#f5c542",
      fontWeight: "bold",
    },
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div style={estilos.overlay} onClick={cerrarTienda}>
      <div style={estilos.modal} onClick={(e) => e.stopPropagation()}>

        {/* Encabezado: título y botón de cierre */}
        <div style={estilos.header}>
          <p style={estilos.titulo}>Tienda</p>
          <button
            style={estilos.botonCerrar}
            onClick={cerrarTienda}
            title="Cerrar tienda"
          >
            ✕
          </button>
        </div>

        {/* Saldo actual del jugador */}
        <div style={estilos.oro}>🪙 {oro}</div>

        <div style={estilos.divider} />

        {/* Catálogo de boosters */}
        <div style={estilos.grid}>
          {Object.entries(catalogoBoosters).map(([clave, booster]) => {
            const seleccionado = boosterSeleccionado === clave;
            const puedeComprar = oro >= booster.precioCompra;

            return (
              <button
                key={clave}
                style={{
                  ...estilos.card(seleccionado),
                  opacity: puedeComprar ? 1 : 0.5,
                  cursor: puedeComprar ? "pointer" : "not-allowed",
                }}
                onClick={() => puedeComprar && seleccionarBooster(clave)}
              >
                <span style={estilos.emoji}>{booster.emoji}</span>

                <div style={estilos.info}>
                  <div style={estilos.nombre}>{booster.nombre}</div>
                  <div style={estilos.desc}>{booster.desc}</div>
                </div>

                <div style={estilos.precios}>
                  <span style={estilos.precio}>🪙 {booster.precioCompra}</span>

                  {/* Cantidad de unidades activas del booster */}
                  {(boostersActivos[clave] ?? 0) > 0 && (
                    <span style={{
                      fontSize: 11,
                      color: "#3eb160",
                      marginRight: 5,
                      fontWeight: "bold",
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "row",
                      width: "110%",
                      marginLeft: 10,
                    }}>
                      {clave === "X2All"
                        ? `${boostersActivos[clave]} cosechas`
                        : `×${boostersActivos[clave]}`
                      }
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer: precios de venta + botón de compra */}
        <div style={estilos.footer}>

          {/* Mensaje de feedback flotante (éxito o error) */}
          {feedback && (
            <div style={{
              position: "absolute",
              top: 70,
              left: "50%",
              transform: "translateX(-50%)",
              background: feedback.ok ? "rgba(62,177,96,0.15)" : "rgba(200,60,60,0.15)",
              border: `1px solid ${feedback.ok ? "#3eb160" : "#9b3232"}`,
              color: feedback.ok ? "#3eb160" : "#e07070",
              borderRadius: 8,
              padding: "6px 16px",
              fontSize: 13,
              whiteSpace: "nowrap",
            }}>
              {feedback.msg}
            </div>
          )}

          {/* Referencia rápida de precios de venta por cultivo */}
          <div style={estilos.venta}>
            Venta: 🌾$20 | 🥕$35 | 🍅$50
          </div>

          {/* Botón de confirmación de compra */}
          <button
            style={{
              ...estilos.comprar,
              opacity: puedeComprarSeleccionado ? 1 : 0.45,
              cursor: puedeComprarSeleccionado ? "pointer" : "not-allowed",
            }}
            onClick={handleComprar}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Comprar 🪙{boosterSeleccionado ? catalogoBoosters[boosterSeleccionado]?.precioCompra : ""}
          </button>
        </div>

      </div>
    </div>
  );
}