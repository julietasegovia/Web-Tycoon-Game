import { useGameStore } from "../store/UseGameStore";

const INFO_CULTIVOS = {
    trigo: { emoji: "🌾", nombre: "Trigo", precio: 10 },
    zanahoria: { emoji: "🥕", nombre: "Zanahoria", precio: 15 },
    tomate: { emoji: "🍅", nombre: "Tomate", precio: 20 },
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
                zIndex: 100,
                display: "flex",
                alignItems: "center",
                gap: 15,
                background: "rgb(53, 37, 23)",
                border: "2px solid #755811",
                borderRadius: 15,
                padding: "10px 18px",
                fontFamily: "monospace",
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
                    minWidth: 90,
                }}
            >
                🪙 {oro}
            </div>
        
            {/* barrita divisora */}
            <div 
                style={{
                    width: 1, 
                    height: 40, 
                    background: "#6c5210", 
                }} 
            />
        
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
                            background: seleccionado ? "rgb(120, 97, 34)" : "transparent",
                            borderRadius: 10,
                            padding: "4px 10px",
                            cursor: "pointer",
                            color: "#cda538",
                            fontSize: 20,
                        }}
                    >
                        <span>{info.emoji}</span>
                        
                        {/* precio abajo del emoji */}
                        <span 
                            style={{ 
                                fontSize: 10, 
                            }}
                        >
                            {info.precio}🪙
                        </span>
                    </button>
                );
            })}
        
            {/* barrita divisora */}
            <div 
                style={{ 
                    width: 1, 
                    height: 40, 
                    background: "#6c5210", 
                }} 
            />
        
            {/* boton de la tienda*/}
            <button
                onClick={abrirTienda}
                title="Abrir tienda"
                style={{
                    background: "rgb(95, 76, 23)",
                    borderRadius: 8,
                    padding: "6px 14px",
                    color: "#f5c542",
                    fontSize: 15,
                    cursor: "pointer",
                }}
                onMouseEnter={(e) => e.target.style.background = "rgb(120, 97, 34)"}
                onMouseLeave={(e) => e.target.style.background = "rgb(71, 58, 21)"}
            >
                Shop
            </button>
        
        </div>
    )
}