/**
 * @fileoverview Escena principal del juego Farm Tycoon.
 * Compone todos los elementos visuales del mapa usando sprites de spritesheets,
 * posicionados de forma absoluta sobre un fondo verde.
 *
 * @author Farm Tycoon
 * @version 1.0.0
 */

import GrillaParcelas from "./GrillaParcelas";
import HUD from "./HUD";

// ─── Rutas a los spritesheets ─────────────────────────────────────────────────
const FARM  = "src/assets/farm.png";
const CROPS = "src/assets/crops.png";

// ─────────────────────────────────────────────────────────────────────────────

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
function At({ x, y, children, z = 1 }) {
  return <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>{children}</div>;
}

// ─────────────────────────────────────────────────────────────────────────────

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
  return (
    <div style={{
      position: "relative",
      width: "100vw",
      height: "100vh",
      backgroundColor: "#2a7741",
      overflow: "hidden"
    }}>

      {/* 🏠 Casa principal */}
      <At x="45.77vw" y="1.25vh" z={2}>
        <F sx={240} sy={400} sw={64} sh={80} scale={3} />
      </At>

      {/* Casita de madera */}
      <At x="33.10vw" y="10.00vh" z={2}>
        <F sx={210} sy={16} sw={56} sh={48} scale={3} />
      </At>

      {/* Granero grande */}
      <At x="71.13vw" y="5.00vh" z={2}>
        <F sx={320} sy={400} sw={80} sh={80} scale={3} />
      </At>

      {/* Cerca de madera — lateral izquierda */}
      <At x="37.8vw" y="35.50vh" z={2}>
        <F sx={0} sy={0} sw={4} sh={50} scale={4.5} />
      </At>
      <At x="37.8vw" y="51.50vh" z={2}>
        <F sx={0} sy={0} sw={4} sh={50} scale={4.5} />
      </At>

      {/* Cerca de madera — lateral derecha */}
      <At x="61.35vw" y="35.50vh" z={2}>
        <F sx={0} sy={0} sw={4} sh={50} scale={4.5} />
      </At>
      <At x="61.35vw" y="51.50vh" z={2}>
        <F sx={0} sy={0} sw={4} sh={50} scale={4.5} />
      </At>

      {/* Cerca de madera — puerta (inferior) */}
      <At x="51.7vw" y="69vh" z={2}>
        <F sx={14} sy={0} sw={44.7} sh={17} scale={4.5} />
      </At>
      <At x="47.1vw" y="69vh" z={2}>
        <F sx={14} sy={0} sw={20} sh={17} scale={4.5} />
      </At>
      <At x="42.4vw" y="69vh" z={2}>
        <F sx={14} sy={0} sw={20} sh={17} scale={4.5} />
      </At>
      <At x="37.8vw" y="69vh" z={2}>
        <F sx={14} sy={0} sw={20} sh={17} scale={4.5} />
      </At>

      {/* Cerca de madera — arriba */}
      <At x="52vw" y="34.3vh" z={2}>
        <F sx={14} sy={0} sw={41.1} sh={17} scale={4.5} />
      </At>
      <At x="47.4vw" y="34.3vh" z={2}>
        <F sx={14} sy={0} sw={20} sh={17} scale={4.5} />
      </At>
      <At x="42.7vw" y="34.3vh" z={2}>
        <F sx={14} sy={0} sw={20} sh={17} scale={4.5} />
      </At>
      <At x="38.9vw" y="34.3vh" z={2}>
        <F sx={14} sy={0} sw={18} sh={17} scale={4.5} />
      </At>

      {/* Árboles decorativos (borde derecho) */}
      <At x="99.30vw" y="7.50vh" z={2}>
        <F sx={64} sy={5} sw={33} sh={45} scale={3} />
      </At>
      <At x="93.66vw" y="15.00vh" z={2}>
        <F sx={128} sy={5} sw={30} sh={45} scale={3} />
      </At>
      <At x="100.00vw" y="25.00vh" z={2}>
        <F sx={95} sy={5} sw={33} sh={45} scale={3} />
      </At>
      <At x="95.07vw" y="37.50vh" z={2}>
        <F sx={160} sy={5} sw={33} sh={45} scale={3} />
      </At>

      {/* Granjero Brown (personaje estático) */}
      <At x="49.30vw" y="20.00vh" z={3}>
        <F sx={272} sy={0} sw={30} sh={35} scale={3} />
      </At>

      {/* Pasto decorativo */}
      <At x="24.65vw" y="46.25vh" z={3}>
        <F sx={16} sy={336} sw={20} sh={22} scale={2.7} />
      </At>
      <At x="27.46vw" y="50.00vh" z={3}>
        <F sx={16} sy={336} sw={20} sh={22} scale={2.7} />
      </At>
      <At x="0.70vw" y="7.50vh" z={3}>
        <F sx={16} sy={336} sw={20} sh={22} scale={2.7} />
      </At>
      <At x="73.94vw" y="46.25vh" z={3}>
        <F sx={16} sy={336} sw={20} sh={22} scale={2.7} />
      </At>
      <At x="88.03vw" y="71.25vh" z={3}>
        <F sx={16} sy={336} sw={20} sh={22} scale={2.7} />
      </At>
      <At x="90.85vw" y="67.50vh" z={3}>
        <F sx={16} sy={336} sw={20} sh={22} scale={2.7} />
      </At>
      <At x="52.82vw" y="53.75vh" z={3}>
        <F sx={16} sy={336} sw={20} sh={22} scale={2.7} />
      </At>

      {/* Mesas exteriores */}
      <At x="77.46vw" y="58.75vh" z={3}>
        <F sx={445} sy={272} sw={70} sh={24} scale={2.7} />
      </At>
      <At x="70.42vw" y="68.75vh" z={3}>
        <F sx={445} sy={300} sw={70} sh={24} scale={2.7} />
      </At>

      {/* Troncos cortados */}
      <At x="59.15vw" y="16.25vh" z={2}>
        <F sx={208} sy={112} sw={32} sh={48} scale={2.5} />
      </At>

      {/* Grilla de parcelas de cultivos (interactiva) */}
      <At x="38.73vw" y="36.25vh" z={5}>
        <GrillaParcelas />
      </At>

      {/* HUD con oro, selector de cultivo y botón de tienda */}
      <HUD />

    </div>
  );
}