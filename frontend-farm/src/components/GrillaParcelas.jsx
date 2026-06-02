/**
 * @fileoverview Grilla interactiva de parcelas de cultivo para Farm Tycoon.
 * Muestra una cuadrícula 4×3 donde el jugador puede sembrar y cosechar cultivos.
 * El crecimiento se actualiza cada segundo mediante un intervalo.
 *
 * @author Farm Tycoon
 * @version 1.0.0
 */

import { useEffect } from "react";
import { useGameStore } from "../store/UseGameStore";

const FARM  = "src/assets/farm.png";
const CROPS = "src/assets/crops.png";

/**
 * Mapa de sprites por cultivo y estado de crecimiento.
 * Cada entrada contiene las coordenadas de recorte del spritesheet `crops.png`.
 *
 * @type {Object.<string, Object.<string, { sx: number, sy: number, sw: number, sh: number }>>}
 *
 * @example
 * // Obtener el sprite del trigo listo para cosechar:
 * const sprite = CROP_SPRITES.trigo.listo
 * // { sx: 44, sy: 0, sw: 10, sh: 12 }
 */

const CROP_SPRITES = {
  trigo: {
    sembrada:  { sx: 53, sy: 12, sw: 10, sh: 12 },
    brotando:  { sx: 44, sy: 12, sw: 10, sh: 12 },
    creciendo: { sx: 53, sy: 1,  sw: 10, sh: 12 },
    listo:     { sx: 44, sy: 0,  sw: 10, sh: 12 },
  },
  zanahoria: {
    sembrada:  { sx: 8,  sy: 12, sw: 10, sh: 12 },
    brotando:  { sx: 17, sy: 12, sw: 10, sh: 12 },
    creciendo: { sx: 25, sy: 12, sw: 10, sh: 12 },
    listo:     { sx: 34, sy: 12, sw: 10, sh: 10 },
  },
  tomate: {
    sembrada:  { sx: 8,  sy: 1,  sw: 10, sh: 12 },
    brotando:  { sx: 17, sy: 1,  sw: 10, sh: 12 },
    creciendo: { sx: 26, sy: 0,  sw: 10, sh: 14 },
    listo:     { sx: 35, sy: 0,  sw: 10, sh: 12 },
  },
};

/**
 * Renderiza un recorte de un spritesheet usando `background-position`.
 *
 * @param {Object} props
 * @param {string} props.src   - URL del spritesheet.
 * @param {number} props.sx    - Posición X del recorte (px, sin escalar).
 * @param {number} props.sy    - Posición Y del recorte (px, sin escalar).
 * @param {number} props.sw    - Ancho del recorte (px, sin escalar).
 * @param {number} props.sh    - Alto del recorte (px, sin escalar).
 * @param {number} props.nw    - Ancho total del spritesheet (px, sin escalar).
 * @param {number} props.nh    - Alto total del spritesheet (px, sin escalar).
 * @param {number} props.scale - Factor de escala.
 * @param {Object} [props.style] - Estilos inline adicionales.
 * @returns {JSX.Element}
 */

function Spr({ src, sx, sy, sw, sh, nw, nh, scale, style = {} }) {
  return (
    <div
      style={{
        width:  sw * scale,
        height: sh * scale,
        imageRendering: "pixelated",
        backgroundImage: `url(${src})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: `-${sx * scale}px -${sy * scale}px`,
        backgroundSize: `${nw * scale}px ${nh * scale}px`,
        ...style,
      }}
    />
  );
}

/** Sprite del spritesheet de granja (`farm.png`, 512×512 px). */
function F(props) { return <Spr src={FARM}  nw={512} nh={512} {...props} />; }

/** Sprite del spritesheet de cultivos (`crops.png`, 80×176 px). */
function C(props) { return <Spr src={CROPS} nw={80}  nh={176} {...props} />; }

// ─────────────────────────────────────────────────────────────────────────────

/**
 * Barra de progreso de crecimiento del cultivo.
 * El color cambia según el porcentaje: verde → amarillo → naranja.
 *
 * @param {Object} props
 * @param {number} props.progreso - Porcentaje de crecimiento (0–100).
 * @returns {JSX.Element}
 */

function BarraProgreso({ progreso }) {
  const color =
    progreso < 40 ? "#a3d977" :
    progreso < 80 ? "#f5c542" :
                    "#e67e22";

  return (
    <div
      style={{
        position: "absolute",
        bottom: 5,
        left: "10%",
        width: "80%",
        height: 5,
        background: "rgba(0,0,0,0.4)",
        borderRadius: 5,
      }}
    >
      <div
        style={{
          width: `${progreso}%`,
          height: "100%",
          background: color,
          borderRadius: 5,
        }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

/**
 * @typedef {Object} ParcelaData
 * @property {string}      id       - Identificador único de la parcela.
 * @property {string}      estado   - Estado actual: `"vacia"` | `"sembrada"` | `"brotando"` | `"creciendo"` | `"listo"`.
 * @property {string|null} cultivo  - Clave del cultivo plantado (`"trigo"`, `"zanahoria"`, `"tomate"`) o `null`.
 * @property {number}      progreso - Porcentaje de crecimiento (0–100).
 */

/**
 * Parcela individual dentro de la grilla.
 *
 * - **Vacía:** clic siembra el cultivo seleccionado en el HUD.
 * - **En crecimiento:** solo muestra sprite y barra de progreso, no es clickeable.
 * - **Lista:** clic cosecha y acredita oro al jugador.
 *
 * @param {Object}      props
 * @param {ParcelaData} props.parcela - Datos de estado de la parcela.
 * @returns {JSX.Element}
 */


function Parcela({ parcela }) {
  const sembrar       = useGameStore((s) => s.sembrar);
  const cosechar      = useGameStore((s) => s.cosechar);
  const cultivoSelec  = useGameStore((s) => s.cultivoSeleccionado);

  const spriteData =
    parcela.cultivo && parcela.estado !== "vacia"
      ? CROP_SPRITES[parcela.cultivo]?.[parcela.estado]
      : null;

  /**
   * Maneja el click sobre la parcela:
   * - Si está vacía, intenta sembrar el cultivo seleccionado.
   * - Si está lista, cosecha el cultivo.
   */
  function handleClick() {
    if (parcela.estado === "vacia") {
      const res = sembrar(parcela.id);
      if (!res.ok) alert(res.msg);
    } else if (parcela.estado === "listo") {
      cosechar(parcela.id);
    }
  }

  const cursorStyle =
    parcela.estado === "vacia" || parcela.estado === "listo"
      ? "pointer"
      : "default";

  const borderColor =
    parcela.estado === "listo" ? "#93711b" :
    parcela.estado === "vacia" ? "#675119" : "#587c20";

  return (
    <div
      onClick={handleClick}
      title={
        parcela.estado === "vacia" ? `Sembrar ${cultivoSelec}` :
        parcela.estado === "listo" ? "Cosechar" :
        `${parcela.cultivo} - ${Math.round(parcela.progreso)}%`
      }
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        cursor: cursorStyle,
        borderRadius: 10,
        border: `2px solid ${borderColor}`,
        background: "rgba(85, 67, 27, 0.81)",
      }}
    >
      {/* Sprite del cultivo centrado en la parcela */}
      {spriteData && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <C
            sx={spriteData.sx} sy={spriteData.sy}
            sw={spriteData.sw} sh={spriteData.sh}
            scale={5}
          />
        </div>
      )}

      {/* Indicador de listo para cosechar */}
      {parcela.estado === "listo" && (
        <div style={{
          position: "absolute",
          top: 5,
          right: 5,
          fontSize: 15,
          animation: "pulse 1s infinite alternate",
        }}>
          ✨
        </div>
      )}

      {/* Barra de progreso durante el crecimiento */}
      {parcela.estado !== "vacia" && parcela.estado !== "listo" && (
        <BarraProgreso progreso={parcela.progreso} />
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

/**
 * Grilla de 4 columnas × 3 filas de parcelas de cultivo.
 *
 * Registra un intervalo de 1 segundo al montarse para llamar a
 * `actualizarCrecimiento` del store y avanzar el progreso de los cultivos.
 * El intervalo se limpia automáticamente al desmontarse.
 *
 * @component
 * @returns {JSX.Element}
 *
 * @example
 * // Se usa dentro de Farm.jsx, con las posiciones responsive definidas aca
 *   <GrillaParcelas />
 */

export default function GrillaParcelas() {
  const parcelas             = useGameStore((s) => s.parcelas);
  const actualizarCrecimiento = useGameStore((s) => s.actualizarCrecimiento);

  // Intervalo de 1 segundo para avanzar el crecimiento de los cultivos.
  // El cleanup evita memory leaks al desmontar el componente.
  useEffect(() => {
    const intervalo = setInterval(() => {
      actualizarCrecimiento();
    }, 1000);

    return () => clearInterval(intervalo);
  }, [actualizarCrecimiento]);

  return (
    <>
      {/* Keyframe de la animación de la estrellita de "listo" */}
      <style>
        {`
          @keyframes pulse {
            from { opacity: 0.6; transform: scale(0.9); }
            to   { opacity: 1.0; transform: scale(1.1); }
          }
        `}
      </style>

      {/* Panel centrado que contiene la grilla, aca se define la posicion: fixed para que no se mueva*/}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 4,
          width: "min(450px, 80vw)",
          padding: 10,
          background: "rgb(108, 83, 25)",
          borderRadius: 15,
          boxSizing: "border-box",
        }}
      >
        {/* Grilla 4×3 fluida */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridTemplateRows: "repeat(3, 1fr)",
            gap: 10,
            aspectRatio: "4 / 3", 
          }}
        >
          {parcelas.map((parcela) => (
            <Parcela key={parcela.id} parcela={parcela} />
          ))}
        </div>
      </div>
    </>
  );
}