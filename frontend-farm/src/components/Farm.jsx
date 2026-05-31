import GrillaParcelas from "./GrillaParcelas";

import HUD from "./HUD";

const FARM = "src/assets/farm.png";
const CROPS = "src/assets/crops.png";

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

function F(props) { return <Spr src={FARM} nw={512} nh={512} {...props} />; }
function C(props) { return <Spr src={CROPS} nw={80} nh={176} {...props} />; }



function At({ x, y, children, z = 1 }) {
  return <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>{children}</div>;
}

export default function Farm() {
  return (
    <div style={{
      position: "relative",
      width: "100vw",
      height: "100vh",

      backgroundColor: "#2a7741", 
      overflow: "hidden"
    }}>

      {/* 🏠 LA CASA */}
      <At x="45.77vw" y="1.25vh" z={2}>
          <F sx={240} sy={400} sw={64} sh={80} scale={3} />
      </At>

      {/* ══ LA CASITA DE MADERA */}
      <At x="33.10vw" y="10.00vh" z={2}>
        <F sx={210} sy={16} sw={56} sh={48} scale={3} />
      </At>

      {/* Granero grande */}
      <At x="71.13vw" y="5.00vh" z={2}>
        <F sx={320} sy={400} sw={80} sh={80} scale={3} />
      </At>
      
      {/* ══ CERCA DE MADERA lateral izq */}
      <At x="37.8vw" y="35.50vh" z={2}>
        <F sx={0} sy={0} sw={4} sh={50} scale={4.5} />
      </At>
      <At x="37.8vw" y="51.50vh" z={2}>
        <F sx={0} sy={0} sw={4} sh={50} scale={4.5} />
      </At>

      {/* ══ CERCA DE MADERA lateral der */}
      <At x="61.35vw" y="35.50vh" z={2}>
        <F sx={0} sy={0} sw={4} sh={50} scale={4.5} />
      </At>
      <At x="61.35vw" y="51.50vh" z={2}>
        <F sx={0} sy={0} sw={4} sh={50} scale={4.5} />
      </At>


      {/* ══ CERCA DE MADERA puerta */}
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

      {/* ══ CERCA DE MADERA arriba */}
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

      {/* ARBOLES */}
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

      {/* Granjero Brown */}
      <At x="49.30vw" y="20.00vh" z={3}>
        <F sx={272} sy={0} sw={30} sh={35} scale={3} />
      </At>

      {/* Huevos y Gallinas 
      <At x="7.04vw" y="43.75vh" z={3}>
        <F sx={0} sy={144} sw={80} sh={18} scale={3} />
      </At>
      <At x="7.04vw" y="50.00vh" z={3}>
        <F sx={0} sy={160} sw={80} sh={18} scale={3} />
      </At>
      <At x="7.04vw" y="55.00vh" z={3}>
        <F sx={0} sy={175} sw={80} sh={18} scale={3} />
      </At>
      <At x="7.04vw" y="62.50vh" z={3}>
        <F sx={0} sy={190} sw={80} sh={18} scale={3} />
      </At>
      <At x="7.04vw" y="69.38vh" z={3}>
        <F sx={0} sy={208} sw={80} sh={18} scale={3} />
      </At>
      <At x="7.04vw" y="75.63vh" z={3}>
        <F sx={0} sy={225} sw={80} sh={18} scale={3} />
      </At>*/}

      {/* Pasto */}
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

      {/* Mesas */}
      <At x="77.46vw" y="58.75vh" z={3}>
        <F sx={445} sy={272} sw={70} sh={24} scale={2.7} />
      </At>
      <At x="70.42vw" y="68.75vh" z={3}>
        <F sx={445} sy={300} sw={70} sh={24} scale={2.7} />
      </At>

      {/* Troncos Cortados */}
      <At x="59.15vw" y="16.25vh" z={2}>
        <F sx={208} sy={112} sw={32} sh={48} scale={2.5} />
      </At>

      {/* Vaca Marrón 
      <At x="13.38vw" y="21.25vh" z={3}>
        <F sx={416} sy={40} sw={32} sh={24} scale={2.7} />
      </At>*/}

      {/* Gallina Amarilla 
      <At x="10.56vw" y="21.25vh" z={3}>
        <F sx={65} sy={193} sw={13} sh={15} scale={2.7} />
      </At>*/}

      {/* Heno 
      <At x="19.72vw" y="21.25vh" z={3}>
        <F sx={85} sy={390} sw={22} sh={20} scale={2} />
      </At>*/}

      {/* Grilla de parcelas cultivos */}
      <At x="38.73vw" y="36.25vh" z={5}>
        <GrillaParcelas/>
      </At>

      {/* HUD */}
      <HUD />
        
    </div>
  );
}