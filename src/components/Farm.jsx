// Farm.jsx — static pixel scene matching the reference image
// Place farm.png and crops.png in your /public folder

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
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      background: "#111",
    }}>
      {/* Scene canvas: ~510×270 tiles × 2 = 1020×540px */}
      <div style={{
        position: "relative",
        width: 1020,
        height: 540,
        background: "#32681c",
        overflow: "hidden",
        imageRendering: "pixelated",
      }}>

        {/* ══ DARK TREE WALL — right edge (2 columns) ══ */}
        {Array.from({ length: 24 }, (_, i) => (
          <At key={`rw${i}`} x={820 + (i % 2) * 38} y={-20 + Math.floor(i / 2) * 46}>
            <F sx={0} sy={26} sw={26} sh={26} scale={3.5} />
          </At>
        ))}
        {Array.from({ length: 12 }, (_, i) => (
          <At key={`rw2${i}`} x={896 + (i % 1) * 38} y={-20 + i * 46}>
            <F sx={0} sy={26} sw={26} sh={26} scale={3.5} />
          </At>
        ))}

        {/* ══ TREE CANOPY — top band ══ */}
        {Array.from({ length: 26 }, (_, i) => (
          <At key={`tt${i}`} x={-10 + i * 42} y={-18}>
            <F sx={0} sy={0} sw={26} sh={26} scale={3.2} />
          </At>
        ))}
        {/* Second row of top trees, offset */}
        {Array.from({ length: 14 }, (_, i) => (
          <At key={`tt2${i}`} x={350 + i * 42} y={8}>
            <F sx={0} sy={0} sw={26} sh={26} scale={3} />
          </At>
        ))}

        {/* ══ FENCE ENCLOSURE — top-left ══
            Box from roughly (28,52) to (270,250) */}
        {/* Top horizontal */}
        {Array.from({ length: 11 }, (_, i) => (
          <At key={`fht${i}`} x={28 + i * 22} y={52}>
            <F sx={0} sy={52} sw={22} sh={10} scale={2} />
          </At>
        ))}
        {/* Bottom horizontal */}
        {Array.from({ length: 11 }, (_, i) => (
          <At key={`fhb${i}`} x={28 + i * 22} y={248}>
            <F sx={0} sy={52} sw={22} sh={10} scale={2} />
          </At>
        ))}
        {/* Left vertical */}
        {Array.from({ length: 9 }, (_, i) => (
          <At key={`fvl${i}`} x={28} y={62 + i * 21}>
            <F sx={22} sy={52} sw={10} sh={21} scale={2} />
          </At>
        ))}
        {/* Right vertical */}
        {Array.from({ length: 9 }, (_, i) => (
          <At key={`fvr${i}`} x={258} y={62 + i * 21}>
            <F sx={22} sy={52} sw={10} sh={21} scale={2} />
          </At>
        ))}

        {/* ══ PLANTS inside fence — left cluster ══ */}
        {/* Big leafy green plants */}
        <At x={40} y={100}><C sx={0} sy={80} sw={16} sh={16} scale={3.5} /></At>
        <At x={74} y={88}><C sx={16} sy={80} sw={16} sh={16} scale={3.5} /></At>
        <At x={44} y={148}><C sx={32} sy={80} sw={16} sh={16} scale={3} /></At>

        {/* ══ CROP ROWS — inside fence, right side ══ */}
        {/* Row 1 */}
        {[0,1,2,3].map(i => (
          <At key={`cr1${i}`} x={115 + i * 34} y={96}>
            <C sx={i * 16} sy={0} sw={16} sh={16} scale={2.5} />
          </At>
        ))}
        {/* Row 2 */}
        {[0,1,2,3].map(i => (
          <At key={`cr2${i}`} x={115 + i * 34} y={134}>
            <C sx={i * 16} sy={16} sw={16} sh={16} scale={2.5} />
          </At>
        ))}
        {/* Row 3 */}
        {[0,1,2,3].map(i => (
          <At key={`cr3${i}`} x={115 + i * 34} y={172}>
            <C sx={i * 16} sy={32} sw={16} sh={16} scale={2.5} />
          </At>
        ))}
        {/* Row 4 */}
        {[0,1,2,3].map(i => (
          <At key={`cr4${i}`} x={115 + i * 34} y={210}>
            <C sx={i * 16} sy={48} sw={16} sh={16} scale={2.5} />
          </At>
        ))}

        {/* ══ HUD PROGRESS BARS (blue floating bars) ══ */}
        <At x={75} y={106} z={10}>
          <div style={{
            width: 88, height: 16,
            background: "#0d1f3c",
            border: "2px solid #2255aa",
            borderRadius: 2,
            display: "flex", alignItems: "center",
            padding: "0 4px", gap: 3,
          }}>
            <div style={{ width: 44, height: 6, background: "#1144cc", borderRadius: 1 }} />
            <div style={{ width: 20, height: 6, background: "#1144cc", borderRadius: 1 }} />
          </div>
        </At>
        <At x={636} y={106} z={10}>
          <div style={{
            width: 88, height: 16,
            background: "#0d1f3c",
            border: "2px solid #2255aa",
            borderRadius: 2,
            display: "flex", alignItems: "center",
            padding: "0 4px", gap: 3,
          }}>
            <div style={{ width: 44, height: 6, background: "#1144cc", borderRadius: 1 }} />
            <div style={{ width: 20, height: 6, background: "#1144cc", borderRadius: 1 }} />
          </div>
        </At>

        {/* ══ SMALL CRITTERS inside fence ══ */}
        {/* Grey bird */}
        <At x={145} y={116}><F sx={195} sy={158} sw={16} sh={16} scale={2.5} /></At>
        {/* Brown round item (seed/egg) */}
        <At x={175} y={124}><F sx={90} sy={116} sw={10} sh={10} scale={2.5} /></At>
        {/* Red bird inside fence */}
        <At x={118} y={152}><F sx={211} sy={142} sw={16} sh={16} scale={2.5} /></At>

        {/* ══ GOLDEN HAYSTACK / BUSH — bottom-left corner ══ */}
        <At x={2} y={360} z={5}>
          <F sx={26} sy={0} sw={26} sh={26} scale={6} />
        </At>

        {/* ══ MAILBOX / SIGN above house ══ */}
        <At x={438} y={90}>
          <F sx={196} sy={52} sw={16} sh={24} scale={3} />
        </At>

        {/* ══ HOUSE — center top ══ */}
        <At x={480} y={28} z={5}>
          <F sx={196} sy={0} sw={52} sh={52} scale={5.5} />
        </At>

        {/* ══ WHITE DAISY FLOWERS — scattered center ground ══ */}
        {[
          [310,230],[338,248],[366,226],[394,244],[422,228],
          [450,246],[478,226],[348,280],[376,294],[406,278],
          [434,292],[462,276],[490,290],[300,260],[520,260],
        ].map(([x, y], i) => (
          <At key={`df${i}`} x={x} y={y}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
              {[0,1,2,3].map(j => (
                <div key={j} style={{ width: 5, height: 5, background: "#dde8a0", borderRadius: "50%" }} />
              ))}
            </div>
          </At>
        ))}

        {/* ══ RED CARDINAL — center of scene ══ */}
        <At x={368} y={306} z={5}>
          <F sx={211} sy={142} sw={16} sh={16} scale={3.2} />
        </At>

        {/* ══ WHITE CHICKEN — bottom left ══ */}
        <At x={212} y={374} z={5}>
          <F sx={195} sy={142} sw={16} sh={16} scale={3.2} />
        </At>

        {/* ══ PLAYER CHARACTER (red-haired boy) — center-right ══ */}
        <At x={590} y={268} z={6}>
          {/* front-facing brown farmer */}
          <F sx={272} sy={0} sw={16} sh={24} scale={4.5} />
        </At>

        {/* ══ STONE STEPS — bottom-right ══ */}
        {[0,1,2,3,4].map(i => (
          <At key={`ss${i}`} x={618 + i * 58} y={390} z={4}>
            <div style={{
              width: 52,
              height: 42,
              background: "linear-gradient(160deg, #8fa8be 0%, #6c8a9e 40%, #56737f 100%)",
              border: "2px solid #445a68",
              borderRadius: 5,
              boxShadow: "inset 0 -3px 0 rgba(0,0,0,0.3)",
            }} />
          </At>
        ))}

        {/* ══ ROCK — to right of path ══ */}
        <At x={770} y={376} z={4}>
          <div style={{
            width: 46,
            height: 32,
            background: "linear-gradient(135deg, #7a8e9c 0%, #58707e 60%, #445a68 100%)",
            border: "2px solid #3a5060",
            borderRadius: "45% 55% 50% 50% / 55% 55% 45% 45%",
            boxShadow: "inset 0 -2px 0 rgba(0,0,0,0.3)",
          }} />
        </At>

        {/* ══ GLOWING EYES in darkness — bottom center ══ */}
        <At x={402} y={504} z={10}>
          <div style={{ display: "flex", gap: 12 }}>
            <div style={{
              width: 10, height: 6,
              background: "#cc1100",
              borderRadius: "50% 50% 40% 40%",
              boxShadow: "0 0 4px #ff3300",
            }} />
            <div style={{
              width: 10, height: 6,
              background: "#cc1100",
              borderRadius: "50% 50% 40% 40%",
              boxShadow: "0 0 4px #ff3300",
            }} />
          </div>
        </At>

        {/* ══ GROUND SHADOW / DEPTH — bottom fade ══ */}
        <div style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          height: 80,
          background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.35))",
          pointerEvents: "none",
          zIndex: 20,
        }} />

      </div>
    </div>
  );
}