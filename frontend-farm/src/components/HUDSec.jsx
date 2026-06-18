/**
 * @fileoverview HUD secundario de Farm Tycoon.
 * Agrupa el indicador de racha, el botón de misiones y el botón de reinicio.
 * Se posiciona en la esquina inferior derecha para no solaparse con el HUD
 * principal (centrado) ni con las notificaciones (top-center).
 *
 * @author Farm Tycoon
 * @version 1.0.0
 */

import { useContext } from "react"
import { useGameStore, multiplicadorRacha } from "../store/UseGameStore"
import { AuthContext } from "../context/AuthContext"
import RestartButton from "./RestartButton"

export default function HUDSecundario() {
  const abrirMisiones = useGameStore((s) => s.abrirMisiones)
  const abrirPerfil = useGameStore((s) => s.abrirPerfil)
  const misiones = useGameStore((s) => s.misiones)
  const racha = useGameStore((s) => s.racha)
  const { user } = useContext(AuthContext)

  const mult = multiplicadorRacha(racha)
  const pendientes = misiones.filter((m) => m.completada && !m.reclamada).length

  const colorRacha = 
    racha >= 10 ? "#c24133" :
    racha >= 6  ? "#c36a1d" :
    racha >= 3  ? "#daae36" :
                  "#a07830"

  return (
    <div style={{
      position: "fixed",
      top: 20,
      right: 50,
      zIndex: 5,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      gap: 8,
      fontFamily: "monospace",
    }}>
 
      {/* Fila: botón misiones + restart */}
      <div style={{
        display: "flex",
        gap: 8,
        alignItems: "center",
        background: "rgb(53, 37, 23)",
        border: "2px solid #5a440c",
        borderRadius: 12,
        padding: "8px 12px",
      }}>
 
        {/* Botón perfil (avatar) */}
        <button
          onClick={abrirPerfil}
          title="Mi perfil"
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            border: "2px solid #5a440c",
            background: user?.profilePicture
              ? `url(${user.profilePicture}) center / cover no-repeat`
              : "rgb(71, 58, 21)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#deac21",
            fontSize: 16,
            cursor: "pointer",
            padding: 0,
            flexShrink: 0,
          }}
        >
          {!user?.profilePicture && "𑣲"}
        </button>

        {/* Botón misiones con badge */}
        <div style={{ position: "relative", display: "inline-flex" }}>
          <button
            onClick={abrirMisiones}
            title="Ver misiones"
            style={{
              background: "rgb(71, 58, 21)",
              border: "none",
              borderRadius: 8,
              padding: "6px 12px",
              color: "#deac21",
              fontSize: 15,
              cursor: "pointer",
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "rgba(120, 97, 34, 0.7)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "rgb(71, 58, 21)"}
          >
            🗒 Tasks
          </button>
 
          {pendientes > 0 && (
            <span style={{
              position: "absolute",
              top: -6,
              right: -4,
              background: "#1f6a36",
              color: "#fff",
              borderRadius: "50%",
              width: 17,
              height: 17,
              fontSize: 10,
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}>
              {pendientes}
            </span>
          )}
        </div>
 
        <RestartButton />
        
      </div>

      
      {/* Cartelito de racha — solo visible si racha >= 1 */}
      {racha >= 1 && (
        <div style={{
          background: "rgb(53, 37, 23)",
          border: `2px solid ${colorRacha}`,
          borderRadius: 12,
          padding: "6px 14px",
          display: "flex",
          alignItems: "center",
          gap: 5,
          marginRight: "2px"
        }}>
          <span style={{ color: colorRacha, fontSize: 18, lineHeight: 1 }}>
            {racha}🔥
          </span>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: colorRacha, fontWeight: "bold", fontSize: 13, lineHeight: 1.2 }}>
              ×{mult} oro
            </span>
            <span style={{ color: "#6c5210", fontSize: 10, lineHeight: 1.2 }}>
              racha
            </span>
          </div>
        </div>
      )}
      
    </div>
  )
}