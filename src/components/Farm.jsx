// Farm.jsx — static pixel scene matching the reference image
// Place farm.png and crops.png in your /public folder

//LA GRANJA MIDE 1420PX
const FARM = "src/assets/farm.png";
const CROPS = "src/assets/crops.png";

// Clips a region from a sprite sheet
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
      backgroundColor: "#2a7741", // Color césped
      overflow: "hidden"
    }}>

      {/* 🏠 LA CASA: 240 x 400*/}
      <At x={650} y={40} z={2}>
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
        <At x={700} y={200} z={3}>
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
      <At x={890} y={470} z={3}>
        <F sx={445} sy={272} sw={70} sh={24} scale={2.7} />
      </At>
      <At x={690} y={550} z={3}>
        <F sx={445} sy={300} sw={70} sh={24} scale={2.7} />
      </At>

        {/* Troncos Cortados (sx=208, sy=112, 32x32) */}
        <At x={840} y={160} z={2}>
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

        {/* ══ INTERFAZ FLOTANTE (HUD) ══ */}
        <At x={20} y={20} z={10}>
          <div style={{
            padding: "8px 12px", background: "rgba(0,0,0,0.5)", 
            color: "#fff", fontFamily: "monospace", borderRadius: 4
          }}>
            Coins : 1500
          </div>
        </At>
    </div>
  );
}