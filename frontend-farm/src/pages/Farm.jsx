/**
 * @fileoverview Escena principal del juego Farm Tycoon.
 * Compone todos los elementos visuales del mapa usando sprites de spritesheets,
 * posicionados de forma absoluta sobre un fondo verde.
 *
 *  Responsive:
 *   - mobile  (<768px):  solo casa, granjero, parcelas y HUD
 *   - tablet+ (≥768px):  escena completa (árboles, animales, granero, etc.)
 *
 * @author Farm Tycoon
 * @version 1.0.0
 */

import { useState, useEffect } from "react";
import GrillaParcelas from "../components/GrillaParcelas";
import HUD from "../components/HUD";
import Shop from "../components/Shop";

// ─── Rutas a los spritesheets ─────────────────────────────────────────────────
const FARM  = "src/assets/farm.png";
const CROPS = "src/assets/crops.png";
const BG = "src/assets/fondo1.png";
const ARB = "src/assets/arbol1.png";

/**
 * Wrapper para el spritesheet de árboles (arbol.png)
 */
function T(props) { 
  return <Spr src={ARB} nw={512} nh={512} {...props} />; 
}

// ─── Breakpoint ──────────────────────────────────────────────────────────────
const TABLET_SIZE = 768;

/**
 * Hook que devuelve `true` cuando el viewport es de escritorio/tablet (≥768px).
 * Se actualiza en tiempo real al redimensionar la ventana.
 */

function useIfDesktop() {
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= TABLET_SIZE )


  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${TABLET_SIZE}px)`)
    const handler = (e) => setIsDesktop(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  return isDesktop

}

/**
 * Renderiza un recorte de un spritesheet usando `background-position`.
 * Escala el sprite mediante CSS sin perder la nitidez píxel a píxel.
 *
 * @param {Object} props
 * @param {string} props.src   - URL del spritesheet.
 * @param {number} props.sx    - Posición X del recorte en el spritesheet (px, sin escalar).
 * @param {number} props.sy    - Posición Y del recorte en el spritesheet (px, sin escalar).
 * @param {number} props.sw    - Ancho del recorte en el spritesheet (px, sin escalar).
 * @param {number} props.sh    - Alto del recorte en el spritesheet (px, sin escalar).
 * @param {number} props.nw    - Ancho total del spritesheet (px, sin escalar).
 * @param {number} props.nh    - Alto total del spritesheet (px, sin escalar).
 * @param {number} [props.scale=3] - Factor de escala aplicado al sprite.
 * @param {Object} [props.style]   - Estilos inline adicionales.
 * @returns {JSX.Element}
 */

function Spr({ src, sx, sy, sw, sh, nw, nh, scale = 3, style = {} }) {
  return (
    <div style={{
      width: sw * scale,
      height: sh * scale,
      imageRendering: "pixelated",
      backgroundImage: `url(${src})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: `-${sx * scale}px -${sy * scale}px`,
      backgroundSize: `${nw * scale}px ${nh * scale}px`,
      flexShrink: 0,
      ...style,
    }} />
  );
}

/**
 * Wrapper de `Spr` preconfigurado para el spritesheet principal de la granja
 * (`farm.png`, 512×512 px).
 *
 * @param {Omit<Parameters<typeof Spr>[0], 'src'|'nw'|'nh'>} props
 * @returns {JSX.Element}
 */

function F(props) { return <Spr src={FARM} nw={512} nh={512} {...props} />; }

/**
 * Wrapper de `Spr` preconfigurado para el spritesheet de cultivos
 * (`crops.png`, 80×176 px).
 *
 * @param {Omit<Parameters<typeof Spr>[0], 'src'|'nw'|'nh'>} props
 * @returns {JSX.Element}
 */

function C(props) { return <Spr src={CROPS} nw={80} nh={176} {...props} />; }

// ─────────────────────────────────────────────────────────────────────────────

/**
 * Contenedor de posicionamiento absoluto para ubicar elementos en el mapa.
 *
 * @param {Object}      props
 * @param {string}      props.x        - Valor CSS para `left` (px, vw, etc.).
 * @param {string}      props.y        - Valor CSS para `top` (px, vh, etc.).
 * @param {JSX.Element} props.children - Elemento a posicionar.
 * @param {number}      [props.z=1]    - Valor de `z-index`.
 * @returns {JSX.Element}
 */

function At({ x, y, children, z = 1, desktopOnly = false, isDesktop }) {
  if (desktopOnly && !isDesktop) return null

  return (
    <div 
      style={{ 
        position: "absolute", 
        left: x, 
        top: y, 
        zIndex: z }}
    >
      {children}
    </div>
  )
}


/**
 * Escena principal de la granja.
 *
 * Renderiza todos los elementos estáticos del mapa (edificios, cercas, árboles,
 * decoración) más los componentes dinámicos `<GrillaParcelas>` y `<HUD>`.
 *
 * Los elementos están posicionados con coordenadas `vw`/`vh` para mantener
 * las proporciones en distintas resoluciones.
 *
 * @component
 * @returns {JSX.Element}
 *
 * @example
 * // Se usa como ruta principal del juego, luego de autenticarse
 * <Route path="/farm" element={<Farm />} />
 */
export default function Farm() {
  const isDesktop = useIfDesktop()

  const D = { desktopOnly: true, isDesktop }
  const A = { isDesktop }

  return (
    <div style={{
      position: "relative",
      width: "100vw",
      height: "100vh",
      backgroundImage: `url(${BG})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      imageRendering: "pixelated",
      overflow: "hidden"
    }}>

      {/* ── Siempre visible ─────────────────────────────────────────── */}

      {/* 🏠 Casa principal */}
      <At x="12vw" y="5vh" z={2} {...A}>
        <F sx={240} sy={400} sw={64} sh={80} scale={4} />
      </At>

      {/* Granjero Brown (personaje estático) */}
      <At x="12vw" y="40vh" z={3} {...A}>
        <F sx={272} sy={0} sw={30} sh={35} scale={3} />
      </At>

      {/* Troncos cortados */}
      <At x="6.5vw" y="32vh" z={2} {...D}>
        <F sx={208} sy={112} sw={32} sh={48} scale={2.5} />
      </At>

      {/* Grilla de parcelas de cultivos (interactiva) */}
      <GrillaParcelas />

      {/* HUD con oro, selector de cultivo y botón de tienda */}
      <HUD />

      <Shop/>


      {/* granero? */}
      <At x="80vw" y="30vh" z={2} {...D}>
        <F sx={210} sy={16} sw={56} sh={48} scale={3.5} />
      </At>

      {/* Árboles*/}
      <At x="70vw" y="62vh" z={2} {...D}>
        <T sx={0} sy={0} sw={200} sh={300} scale={1.2} />
      </At>
      <At x="77vw" y="72vh" z={2} {...D}>
        <T sx={0} sy={0} sw={200} sh={300} scale={1} />
      </At>

      {/* Granero grande 
      <At x="10vw" y="30vh" z={3} {...D}>
        <F sx={320} sy={400} sw={80} sh={80} scale={3} />
      </At>
      */}

        {/* cerca
      {/* Cerca de madera — lateral izquierda 
      <At x="34.45vw" y="22vh" z={5} {...D}>
        <F sx={0} sy={0} sw={4} sh={50} scale={4.5} />
      </At>
      <At x="34.45vw" y="47vh" z={5} {...D}>
        <F sx={0} sy={0} sw={4} sh={50} scale={4.5} />
      </At>

      {/* Cerca de madera — lateral derecha 
      <At x="64.4vw" y="21vh" z={5} {...D}>
        <F sx={0} sy={0} sw={4} sh={50} scale={4.5} />
      </At>
      <At x="64.4vw" y="48vh" z={5} {...D}>
        <F sx={0} sy={0} sw={4} sh={50} scale={4.5} />
      </At>

      {/* Cerca de madera — puerta (inferior) 
      <At x="52.1vw" y="70vh" z={5} {...D}>
        <F sx={14} sy={0} sw={44.7} sh={17} scale={4.5} />
      </At>
      <At x="46.2vw" y="70vh" z={5} {...D}>
        <F sx={14} sy={0} sw={20} sh={17} scale={4.5} />
      </At>
      <At x="40.4vw" y="70vh" z={5} {...D}>
        <F sx={14} sy={0} sw={20} sh={17} scale={4.5} />
      </At>
      <At x="34.6vw" y="70vh" z={5} {...D}>
        <F sx={14} sy={0} sw={20} sh={17} scale={4.5} />
      </At>

      {/* Cerca de madera — arriba 
      <At x="52.4vw" y="20vh" z={3} {...D}>
        <F sx={14} sy={0} sw={41.1} sh={17} scale={4.5} />
      </At>
      <At x="46.6vw" y="20vh" z={3} {...D}>
        <F sx={14} sy={0} sw={20} sh={17} scale={4.5} />
      </At>
      <At x="40.8vw" y="20vh" z={3} {...D}>
        <F sx={14} sy={0} sw={20} sh={17} scale={4.5} />
      </At>
      <At x="35.6vw" y="20vh" z={3} {...D}>
        <F sx={14} sy={0} sw={18} sh={17} scale={4.5} />
      </At>

      */}

      {/* Árboles decorativos (borde derecho) 
      <At x="90vw" y="7.50vh" z={2} {...D}>
        <F sx={64} sy={5} sw={33} sh={45} scale={3} />
      </At>
      <At x="95vw" y="15.00vh" z={2} {...D}>
        <F sx={128} sy={5} sw={30} sh={45} scale={3} />
      </At>
      <At x="85vw" y="25.00vh" z={2} {...D}>
        <F sx={95} sy={5} sw={33} sh={45} scale={3} />
      </At>
      <At x="90vw" y="37.50vh" z={2} {...D}>
        <F sx={160} sy={5} sw={33} sh={45} scale={3} />
      </At>
    */}

      {/* Mesas exteriores 
      <At x="77.46vw" y="58.75vh" z={3} {...D}>
        <F sx={445} sy={272} sw={70} sh={24} scale={2.7} />
      </At>
      <At x="70.42vw" y="68.75vh" z={3} {...D}>
        <F sx={445} sy={300} sw={70} sh={24} scale={2.7} />
      </At>
      */}


    </div>
  );
}