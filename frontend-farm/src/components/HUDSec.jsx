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

  // Clases de color según el tramo de racha (border y texto comparten el mismo tono)
  const colorBorderClass =
    racha >= 10 ? "border-[#c24133]" :
    racha >= 6  ? "border-[#c36a1d]" :
    racha >= 3  ? "border-[#daae36]" :
                  "border-[#a07830]"

  const colorTextClass =
    racha >= 10 ? "text-[#c24133]" :
    racha >= 6  ? "text-[#c36a1d]" :
    racha >= 3  ? "text-[#daae36]" :
                  "text-[#a07830]"

  return (
    <div className="fixed top-[20px] right-[50px] z-[5] flex flex-row items-end gap-[370px] font-mono">
      {/* Cartelito de racha — solo visible si racha >= 1 */}
      {racha >= 1 && (
        <div className={`bg-[rgb(53,37,23)] border-2 ${colorBorderClass} rounded-[12px] px-[14px] py-[6px] flex items-center gap-[5px] mr-[2px]`}>
          <span className={`${colorTextClass} text-[18px] leading-none`}>
            {racha}🔥
          </span>
          <div className="flex flex-col">
            <span className={`${colorTextClass} font-bold text-[13px] leading-[1.2]`}>
              ×{mult} oro
            </span>
            <span className="text-[#6c5210] text-[10px] leading-[1.2]">
              racha
            </span>
          </div>
        </div>
      )}
      
      {/* Fila: botón misiones + restart */}
      <div className="flex gap-[10px] items-center bg-[rgb(53,37,23)] border-2 border-[#5a440c] rounded-[12px] px-[12px] py-[8px]">

        {/* Botón perfil (avatar) */}
        <button
          onClick={abrirPerfil}
          title="Mi perfil"
          className="w-[34px] h-[34px] rounded-full border-2 border-[#5a440c] flex items-center justify-center text-[#deac21] text-[16px] cursor-pointer p-0 flex-shrink-0"
          style={{
            background: user?.profilePicture
              ? `url(${user.profilePicture}) center / cover no-repeat`
              : "rgb(71, 58, 21)",
          }}
        >
          {!user?.profilePicture && "𑣲"}
        </button>

        {/* Botón misiones con badge */}
        <div className="relative inline-flex">
          <button
            onClick={abrirMisiones}
            title="Ver misiones"
            className="bg-[rgb(71,58,21)] hover:bg-[rgba(120,97,34,0.7)] border-none rounded-[8px] px-[12px] py-[6px] text-[#deac21] text-[15px] cursor-pointer transition-colors"
          >
            🗒 Tasks
          </button>

          {pendientes > 0 && (
            <span className="absolute top-[-6px] right-[-4px] bg-[#1f6a36] text-white rounded-full w-[17px] h-[17px] text-[10px] font-bold flex items-center justify-center pointer-events-none">
              {pendientes}
            </span>
          )}
        </div>

        <RestartButton />

      </div>

    </div>
  )
}