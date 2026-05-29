import { useGameStore } from "../store/UseGameStore";

const INFO_CULTIVOS = {
    trigo: { emoji: "🌾", nombre: "Trigo", precio: 10, tiempo: 60 },
    zanahoria: { emoji: "🥕", nombre: "Zanahoria", precio: 15, tiempo: 120 },
    tomate: { emoji: "🍅", nombre: "Tomate", precio: 20, tiempo: 180 },
}

export default function HUD() {
    const oro = useGameStore((s) => s.oro)
    const cultivoSeleccionado = useGameStore((s) => s.cultivoSeleccionado)
    const seleccionarCultivo = useGameStore((s) => s.seleccionarCultivo)
    const abrirTienda = useGameStore((s) => s.abrirTienda)

    return (
        <div 
            style={{
                position: "fixed",         
                bottom: 20,
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 5,
                display: "flex",
                alignItems: "center",
                gap: 15,
                background: "rgb(53, 37, 23)",
                border: "2px solid #5a440c",
                borderRadius: 15,
                padding: "10px 18px",
                fontFamily: "monospace",
                maxWidth: "80%"
            }}
        >
        
            {/* oro */}
            <div 
                style={{
                    display: "flex",
                    alignItems: "center",
                    color: "#f5c542",
                    fontSize: 18,
                    fontWeight: "bold",
                    minWidth: 65,
                    marginLeft: 3
                }}
            >
                🪙 {oro}
            </div>
        
            {/* selector de cultivo */}
            {Object.entries(INFO_CULTIVOS).map(([clave, info]) => {
                const seleccionado = cultivoSeleccionado === clave;
                return (
                    <button
                        key={clave}
                        onClick={() => seleccionarCultivo(clave)}
                        title={`${info.nombre} — precio: ${info.precio} 🪙`}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            background: seleccionado ? "rgba(120, 97, 34, 0.46)" : "transparent",
                            borderRadius: 8,
                            width: 70,
                            padding: "4px 0",
                            cursor: "pointer",
                            color: "#cda538",
                            fontSize: 20, 
                            border: "1px dashed #cda538c0"
                        }}
                    >
                        <span>{info.emoji}</span>
                        
                        {/* tiempo y precio abajo del emoji */}
                        <span 
                            style={{ 
                                fontSize: 10, 
                                display: "flex"
                            }}
                        >
                            ◴{info.tiempo}s ${info.precio}
                        </span>


                    </button>
                );
            })}
        
        
            {/* boton de la tienda*/}
            <button
                onClick={abrirTienda}
                title="Abrir tienda"
                style={{
                    background: "rgb(95, 76, 23)",
                    borderRadius: 8,
                    padding: "6px 14px",
                    color: "#ffe291",
                    fontSize: 15,
                    cursor: "pointer",
                    marginLeft: 15,
                    marginRight: 5
                }}
                onMouseEnter={(e) => e.target.style.background = "rgba(120, 97, 34, 0.7)"}
                onMouseLeave={(e) => e.target.style.background = "rgb(71, 58, 21)"}
            >
                Shop
            </button>
        
        </div>
    )
}