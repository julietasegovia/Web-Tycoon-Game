/**
 * @fileoverview HUD (Heads-Up Display) del juego Farm Tycoon.
 * Muestra el oro del jugador, los botones de selección de cultivo
 * y el acceso a la tienda de boosters.
 *
 * @author Farm Tycoon
 * @version 1.1.0
 */

import { useGameStore } from "../store/UseGameStore"

// ─────────────────────────────────────────────────────────────────────────────

const INFO_CULTIVOS = {
  trigo:     { emoji: "🌾", nombre: "Trigo",     precio: 10, tiempo: 60  },
  zanahoria: { emoji: "🥕", nombre: "Zanahoria", precio: 15, tiempo: 120 },
  tomate:    { emoji: "🍅", nombre: "Tomate",    precio: 20, tiempo: 180 },
}

// ─────────────────────────────────────────────────────────────────────────────

export default function HUD() {
  const oro                 = useGameStore((s) => s.oro)
  const cultivoSeleccionado = useGameStore((s) => s.cultivoSeleccionado)
  const seleccionarCultivo  = useGameStore((s) => s.seleccionarCultivo)
  const abrirTienda         = useGameStore((s) => s.abrirTienda)

  return (
    <div className="fixed bottom-[20px] left-1/2 -translate-x-1/2 z-[5] flex items-center gap-[15px] bg-[rgba(66,41,19,0.79)] backdrop-blur-[10px] border-2 border-transparent rounded-[10px] px-[18px] py-[10px] font-mono max-w-[80%]">

      {/* Saldo de oro */}
      <div className="flex items-center text-[#f5c542] text-[18px] font-bold min-w-[65px] ml-[3px]">
        🪙 {oro}
      </div>

      {/* Selector de cultivo */}
      {Object.entries(INFO_CULTIVOS).map(([clave, info]) => {
        const seleccionado = cultivoSeleccionado === clave
        return (
          <button
            key={clave}
            onClick={() => seleccionarCultivo(clave)}
            title={`${info.nombre} — precio: ${info.precio} 🪙`}
            className={`flex flex-col items-center rounded-[8px] w-[70px] py-[4px] px-0 cursor-pointer text-[#cda538] text-[20px] border border-dashed border-[#cda538c0] ${
              seleccionado ? "bg-[rgba(120,97,34,0.46)]" : "bg-transparent"
            }`}
          >
            <span>{info.emoji}</span>
            <span className="text-[10px] flex">
              ◴{info.tiempo}s ${info.precio}
            </span>
          </button>
        )
      })}

      {/* Botón tienda */}
      <button
        onClick={abrirTienda}
        title="Abrir tienda"
        className="bg-[rgb(71,58,21)] hover:bg-[rgba(120,97,34,0.7)] rounded-[8px] px-[14px] py-[6px] text-[#deac21] text-[15px] cursor-pointer ml-[15px] mr-[5px] border-none transition-colors"
      >
        Shop
      </button>

    </div>
  )
}