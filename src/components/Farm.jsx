import GrillaParcelas from "./GrillaParcelas";
<<<<<<< HEAD
import HUD from "./HUD"

//LA GRANJA MIDE 1420PX
const FARM = "src/assets/farm.png";
const CROPS = "src/assets/crops.png";

// Clips a region from a sprite sheet
=======
import HUD from "./HUD";

const FARM = "src/assets/farm.png";
const CROPS = "src/assets/crops.png";

>>>>>>> juli
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
<<<<<<< HEAD
=======

// Modified to accept direct vw and vh string percentages
>>>>>>> juli
function At({ x, y, children, z = 1 }) {
  return <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>{children}</div>;
}

export default function Farm() {
  return (
    <div style={{
      position: "relative",
      width: "100vw",
      height: "100vh",
<<<<<<< HEAD
      backgroundColor: "#2a7741", // Color césped
      overflow: "hidden"
    }}>

      {/* 🏠 LA CASA: 240 x 400*/}
      <At x={650} y={10} z={2}>
          <F sx={240} sy={400} sw={64} sh={80} scale={3} />
      </At>

      {/* ══ LA CASITA DE MADERA (Edificio Pequeño) ══ */}
        {/* Mide 48x48, está en sx=208, sy=16 */}
        <At x={470} y={80} z={2}>
          <F sx={210} sy={16} sw={56} sh={48} scale={3} />
        </At>

        {/* Granero grande, sx=320 sy=400, 80x80 */}
        <At x={1010} y={40} z={2}>
          <F sx={320} sy={400} sw={80} sh={80} scale={3} />
        </At>
      
      {/* ══ CERCA DE MADERA */}
        <At x={70} y={100} z={2}>
          <F sx={0} sy={0} sw={65} sh={50} scale={4.5} />
        </At>

      {/* ARBOLES */}
      {/*verde claro x: 64 y: 5*/}
        <At x={1410} y={60} z={2}>
          <F sx={64} sy={5} sw={33} sh={45} scale={3} />
        </At>
      {/*amarillo x: 128 y: 5*/}
        <At x={1330} y={120} z={2}>
          <F sx={128} sy={5} sw={30} sh={45} scale={3} />
        </At>
      {/*verde oscuro x: 95 y: 5*/}
        <At x={1420} y={200} z={2}>
          <F sx={95} sy={5} sw={33} sh={45} scale={3} />
        </At>
      {/*rosa x: 160 y: 5*/}
        <At x={1350} y={300} z={2}>
          <F sx={160} sy={5} sw={33} sh={45} scale={3} />
        </At>

      {/* Granjero Brown (sx=272, sy=0, 16x24) */}
        <At x={700} y={160} z={3}>
          <F sx={272} sy={0} sw={30} sh={35} scale={3} />
        </At>

      {/* huevos*/}
      <At x={100} y={350} z={3}>
        <F sx={0} sy={144} sw={80} sh={18} scale={3} />
      </At>
      
      {/*gallinas bebe*/}
      <At x={100} y={400} z={3}>
        <F sx={0} sy={160} sw={80} sh={18} scale={3} />
      </At>

      {/*gallinas bebe*/}
      <At x={100} y={440} z={3}>
        <F sx={0} sy={175} sw={80} sh={18} scale={3} />
      </At>

      {/*gallinas */}
      <At x={100} y={500} z={3}>
        <F sx={0} sy={190} sw={80} sh={18} scale={3} />
      </At>
      
      {/*gallinas saltando*/}
      <At x={100} y={555} z={3}>
        <F sx={0} sy={208} sw={80} sh={18} scale={3} />
      </At>

      {/*gallinas sentadas*/}
      <At x={100} y={605} z={3}>
        <F sx={0} sy={225} sw={80} sh={18} scale={3} />
      </At>

      {/*pasto */}
      <At x={350} y={370} z={3}>
          <F sx={16} sy={336} sw={20} sh={22} scale={2.7} />
      </At>
      <At x={390} y={400} z={3}>
          <F sx={16} sy={336} sw={20} sh={22} scale={2.7} />
      </At>
      <At x={550} y={270} z={3}>
          <F sx={16} sy={336} sw={20} sh={22} scale={2.7} />
      </At>
      <At x={10} y={60} z={3}>
          <F sx={16} sy={336} sw={20} sh={22} scale={2.7} />
      </At>
      <At x={1050} y={370} z={3}>
          <F sx={16} sy={336} sw={20} sh={22} scale={2.7} />
      </At>
      <At x={1250} y={570} z={3}>
          <F sx={16} sy={336} sw={20} sh={22} scale={2.7} />
      </At>
      <At x={1290} y={540} z={3}>
          <F sx={16} sy={336} sw={20} sh={22} scale={2.7} />
      </At>
      <At x={800} y={530} z={3}>
          <F sx={16} sy={336} sw={20} sh={22} scale={2.7} />
      </At>
      <At x={750} y={430} z={3}>
          <F sx={16} sy={336} sw={20} sh={22} scale={2.7} />
      </At>

    {/*mesas */}
      <At x={1100} y={470} z={3}>
        <F sx={445} sy={272} sw={70} sh={24} scale={2.7} />
      </At>
      <At x={1000} y={550} z={3}>
        <F sx={445} sy={300} sw={70} sh={24} scale={2.7} />
      </At>

        {/* Troncos Cortados (sx=208, sy=112, 32x32) */}
        <At x={840} y={130} z={2}>
          <F sx={208} sy={112} sw={32} sh={48} scale={2.5} />
        </At>

        {/* Vaca Marrón (sx=416, sy=40, 32x24) */}
        <At x={190} y={170} z={3}>
          <F sx={416} sy={40} sw={32} sh={24} scale={2.7} />
        </At>

        {/* Gallina Amarilla (sx=65, sy=193, 13x15) */}
        <At x={150} y={170} z={3}>
          <F sx={65} sy={193} sw={13} sh={15} scale={2.7} />
        </At>

        {/* Heno (sx=85, sy=390, 22x20) */}
        <At x={280} y={170} z={3}>
          <F sx={85} sy={390} sw={22} sh={20} scale={2} />
        </At>

        {/*Grilla de parcelas */}
        <At x={550} y={290} z={5}>
          <GrillaParcelas/>
        </At>

        {/*HUD */}
        <HUD />

        {/*Shop */}
=======
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
>>>>>>> juli
        
    </div>
  );
}