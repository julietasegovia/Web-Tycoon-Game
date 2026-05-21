import { useEffect } from "react";
import { useGameStore } from "../store/UseGameStore";

const FARM = "src/assets/farm.png"
const CROPS = "src/assets/crops.png"

const CROP_SPRITES = {
    trigo: {
        sembrada:  { sx: 0,  sy: 0,  sw: 16, sh: 16 },
        brotando:  { sx: 16, sy: 0,  sw: 16, sh: 16 },
        creciendo: { sx: 32, sy: 0,  sw: 16, sh: 16 },
        listo:     { sx: 48, sy: 0,  sw: 16, sh: 16 },
    },
    zanahoria: {
        sembrada:  { sx: 0,  sy: 16, sw: 16, sh: 16 },
        brotando:  { sx: 16, sy: 16, sw: 16, sh: 16 },
        creciendo: { sx: 32, sy: 16, sw: 16, sh: 16 },
        listo:     { sx: 48, sy: 16, sw: 16, sh: 16 },
    },
    tomate: {
        sembrada:  { sx: 0,  sy: 32, sw: 16, sh: 16 },
        brotando:  { sx: 16, sy: 32, sw: 16, sh: 16 },
        creciendo: { sx: 32, sy: 32, sw: 16, sh: 16 },
        listo:     { sx: 48, sy: 32, sw: 16, sh: 16 },
    },
}

// ({ruta, posicion en x, pos en y, ancho, alto, ancho sprite, alto sprite, escala (3px) })
function Spr({ src, sx, sy, sw, sh, nw, nh, scale = 3, style = {}}) {
    return (
        <div
            style={{
                width:  sw * scale,                           // ancho visible
                height: sh * scale,                           // alto visible
                imageRendering: "pixelated",                  // sin blur cuando se escala
                backgroundImage: `url(${src})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: `-${sx * scale}px -${sy * scale}px`, // recorte
                backgroundSize: `${nw * scale}px ${nh * scale}px`,   // escala total
                ...style,
            }}
        />
    )
}

function F(props) { return <Spr src={FARM} nw={512} nh={512} {...props} />; }

function C(props) {return <Spr src={CROPS} nw={80} nh={176} {...props} />; }
 
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

function Parcela({ parcela }) {
    const sembrar = useGameStore((s) => s.sembrar)
    const cosechar = useGameStore((s) => s.cosechar)
    const cultivoSelec = useGameStore((s) => s.cultivoSeleccionado)

    const spriteData = 
        parcela.cultivo && parcela.estado !== "vacia"
        ? CROP_SPRITES[parcela.cultivo]?.[parcela.estado]
        : null

    function handleClick() {
        if(parcela.estado === "vacia") {
            const res = sembrar(parcela.id)
            if(!res.ok) alert(res.msg)
        } else if (parcela.estado === "listo") {
            cosechar(parcela.id)
        }
    }

    const cursorStyle = 
        parcela.estado === "vacia" || parcela.estado === "listo"
        ? "pointer"
        : "default" 

    const borderColor =
        parcela.estado === "listo"  ? "#93711b" :
        parcela.estado === "vacia"  ? "#675119" : "#587c20";

    return (
        <div
            onClick={handleClick}

            title={
                parcela.estado === "vacia"  ? `Sembrar ${cultivoSelec}` :
                parcela.estado === "listo"  ? "cosechar" :
                                            `${parcela.cultivo} - ${Math.round(parcela.progreso)}%`
            }

            style={{
                position: "relative",
                width: 96,
                height: 96,
                cursor: cursorStyle,
                borderRadius: 10,
                border: `2px solid ${borderColor}`,
                background: "rgba(85, 67, 27, 0.81)"
            }}
        >

            {/* sprite de suelo del como parcela */}
            <div 
                style={{ 
                    position: "absolute", 
                    inset: 0, 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center",
                }}
            >
                <F sx={80} sy={320} sw={16} sh={16} scale={6} />
            </div>
        
            {/* cultivo encima de la tierra */}
            {spriteData && (
                <div 
                    style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <C
                        sx={spriteData.sx} sy={spriteData.sy}
                        sw={spriteData.sw} sh={spriteData.sh}
                        scale={4}
                    />

                </div>
            )}
        
            {/* cuando esta listo se muestra con una estrellita */}
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
        
            {/* progreso cuando el cultivo crece */}
            {parcela.estado !== "vacia" && parcela.estado !== "listo" && (
                <BarraProgreso progreso={parcela.progreso} />
            )}
        </div>
    );
}

export default function GrillaParcelas() {
    const parcelas = useGameStore((s) => s.parcelas)
    const actualizarCrecimiento = useGameStore((s) => s.actualizarCrecimiento)

    // useEffect con [] se ejecuta cuando el componente aparece, crea un intervalo de 1 segundo y actualiza el crecimiento.
    // El return limpia el intervalo
    useEffect(() => {
        const intervalo = setInterval(() => {
            actualizarCrecimiento()
        }, 1000) //un segundo

        return() => clearInterval(intervalo)
    }, [actualizarCrecimiento])

    return ( 
        <>
            {/*  animación de la estrellita */}
            <style>
                {`
                    @keyframes pulse {
                        from { opacity: 0.6; transform: scale(0.9); }
                        to   { opacity: 1.0; transform: scale(1.1); }
                    }
                    .Parcela:hover {
                        transform: scale(1.04);
                    }
                `}
            </style>
        
            {/* Grilla 4×3 */}
            <div 
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 96px)", // 4 columnas de 96px
                    gridTemplateRows: "repeat(3, 96px)",    // 3 filas de 96px
                    gap: 10,                                 // separación entre parcelas
                    padding: 10,
                    background: "rgb(108, 83, 25)",
                    borderRadius: 15,
                }}
            >
                {parcelas.map((parcela) => (
                    <Parcela key={parcela.id} parcela={parcela} />
                ))}
            </div>
        </>
    )
}

