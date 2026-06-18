/**
 * @fileoverview Botón de reinicio del juego Farm Tycoon.
 * Permite al jugador reiniciar el juego borrando todos los cultivos
 * y restableciendo el oro a su valor inicial.
 *
 * @author Farm Tycoon
 * @version 1.0.0
 */

import { useGameStore } from "../store/UseGameStore";
import { useState } from "react";

/**
 * Botón de reinicio que muestra un diálogo de confirmación antes de reiniciar.
 * 
 * @component
 * @returns {JSX.Element}
 * 
 * @example
 * // Colocar junto al HUD o en una posición accesible
 * <RestartButton />
 */
export default function RestartButton() {
  const restartGame = useGameStore((s) => s.restartGame);
  const [showConfirm, setShowConfirm] = useState(false);

  /**
   * Confirma el reinicio y ejecuta la acción
   */
  const handleRestart = () => {
    restartGame();
    setShowConfirm(false);
  };

  /**
   * Cancela el reinicio y cierra el diálogo
   */
  const handleCancel = () => {
    setShowConfirm(false);
  };

  return (
    <>
      {/* Botón principal de reinicio */}
      <button
        onClick={() => setShowConfirm(true)}
        title="Reiniciar juego"
        style={{
          background: "rgb(71, 58, 21)",
          borderRadius: 8,
          padding: "6px 14px",
          color: "#deac21",
          fontSize: 15,
          cursor: "pointer",
          marginLeft: 15,
          marginRight: 5,
        }}
        onMouseEnter={(e) => e.target.style.background = "rgba(120, 97, 34, 0.7)"}
        onMouseLeave={(e) => e.target.style.background = "rgb(71, 58, 21)"}
      >
        Reiniciar
      </button>

      {/* Diálogo de confirmación */}
      {showConfirm && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.55)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)", 
          }}
          onClick={handleCancel}
        >
          <div
            style={{
              background: "rgb(53, 37, 23)",
              border: "2px solid #5a440c",
              borderRadius: 20,
              padding: "24px 28px",
              fontFamily: "monospace",
              textAlign: "center",
              maxWidth: "330px",
              minHeight: "220px"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h1 
              style={{ 
                color: "#ad3320", 
                marginBottom: 12, 
                fontSize: 16 

              }}
            > Cuidado!</h1>
            <p 
              style={{ 
                color: "#a07830", 
                marginBottom: 12, 
                fontSize: 14,
                marginBottom: "20px"

              }}
            >
              Si reinicias se perderán todos los cultivos actuales y el oro volverá a 60 (no hay vuelta atras!).
            </p>
            <div
              style={{
                display: "flex",
                gap: 12,
                justifyContent: "center",
              }}
            >
              <button
                onClick={handleRestart}
                style={{
                    background: "rgb(95, 76, 23)",
                    borderRadius: 8,
                    color: "#ffe291",
                    fontSize: 15,
                    cursor: "pointer",
                    marginLeft: 15,
                    marginRight: 5,
                    padding: "0px 10px",
                    }}
                onMouseEnter={(e) => e.target.style.background = "rgb(160, 80, 30)"}
                onMouseLeave={(e) => e.target.style.background = "rgb(139, 69, 19)"}
              >
                Reiniciar
              </button>
              <button
                onClick={handleCancel}
                style={{
                  background: "transparent",
                  border: "1px solid #a07830",
                  borderRadius: 8,
                  padding: "8px 16px",
                  color: "#a07830",
                  cursor: "pointer",
                  fontSize: 14,
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "rgba(160, 120, 48, 0.2)";
                  e.target.style.color = "#f5c542";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "transparent";
                  e.target.style.color = "#a07830";
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}