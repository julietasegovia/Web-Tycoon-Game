import { useGameStore } from "../store/UseGameStore";
import { useState } from "react";

export default function Shop() {
    const tiendaAbierta = useGameStore((s) => s.tiendaAbierta);
    const cerrarTienda  = useGameStore((s) => s.cerrarTienda);
    const catalogoBoosters = useGameStore((s) => s.catalogoBoosters);
    const oro           = useGameStore((s) => s.oro);
    const boosterSeleccionado = useGameStore((s) => s.boosterSeleccionado);
    const seleccionarBooster  = useGameStore((s) => s.seleccionarBooster);
    const comprarBooster = useGameStore((s) => s.comprarBooster);
    const boostersActivos = useGameStore((s) => s.boostersActivos);
    const [isHovered, setIsHovered] = useState(false);
    const [feedback, setFeedback] = useState(null);


    if (!tiendaAbierta) return null;

    const puedeComprarSeleccionado = boosterSeleccionado && 
        oro >= (catalogoBoosters[boosterSeleccionado]?.precioCompra ?? Infinity);
 
    const handleComprar = () => {
        if (!boosterSeleccionado) {
            setFeedback({ msg: "Seleccioná un booster primero", ok: false });
            setTimeout(() => setFeedback(null), 2000);
            return;
        }
        const result = comprarBooster(boosterSeleccionado);
        setFeedback(
            result.ok
                ? { msg: `✓ ${catalogoBoosters[boosterSeleccionado].nombre} comprado`, ok: true }
                : { msg: result.msg, ok: false }
        );
        setTimeout(() => setFeedback(null), 2000);
    };

    const estilos = {
        overlay: {
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        modal: {
            background: "rgb(53, 37, 23)",
            border: "2px solid #5a440c",
            borderRadius: 20,
            padding: "24px 28px",
            width: 400,
            fontFamily: "monospace",
            position: "relative",
        },
        header: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 18,
        },
        titulo: {
            color: "#d8ad36",
            fontSize: 20,
            fontWeight: "bold",
            margin: 0,
        },
        botonCerrar: {
            background: "transparent",
            border: "none",
            color: "#a07830",
            fontSize: 22,
            cursor: "pointer",
            lineHeight: 1,
            padding: "0 4px",
        },
        oro: {
            color: "#e5b634",
            fontSize: 20,
            marginBottom: 30,
            fontWeight: "bold"
        },
        divider: {
            height: 1,
            background: "#6c5210",
            marginBottom: 35,
        },
        grid: {
            overflowY: 'auto',
            scrollbarColor: '#6c5210 rgb(53, 37, 23)',
            scrollbarWidth: 'thin', 
            height: 300 ,
            display: "flex",
            flexDirection: "column",
            gap: 12,
            marginBottom: 15
        },
        card: (seleccionado) => ({
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: seleccionado ? "rgba(120, 97, 34, 0.32)" : "transparent",
            border: "1.5px solid #604601",
            borderRadius: 10,
            padding: "12px 15px",
            transition: "background 0.15s",
            marginRight: 5,
            marginLeft: 5,
        }),
        emoji: {
            fontSize: 25,
            color: "#f5c542"
        },
        info: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        },
        nombre: {
            color: "#f5c542",
            fontSize: 15,
            fontWeight: "bold",
        },
        desc: {
            color: "#a07830",
            fontSize: 12,
            width: "80%"
        },
        precios: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
        },
        precio: {
            fontSize: 12,
            color: "#3eb160",
            marginRight: 5
        },
        footer: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 10,
        },
        venta: {
            display: "flex",
            justifyContent: "center", 
            color: "#a07830",
            marginTop: 5,
        },
        comprar: {
            backgroundColor: isHovered ? 'rgba(120, 97, 34, 0.32)' : 'transparent',
            borderRadius: 10,
            border: "1px solid #604601",
            fontSize: 20, 
            padding: "5px 20px",
            color: "#f5c542",
            fontWeight: "bold"
        },
    };

    return (
        <div style={estilos.overlay} onClick={cerrarTienda}>
            <div style={estilos.modal} onClick={(e) => e.stopPropagation()}>
                
                {/* header */}
                <div style={estilos.header}>
                    <p style={estilos.titulo}>Tienda</p>
                    <button 
                        style={estilos.botonCerrar}
                        onClick={cerrarTienda}
                        title="Cerrar tienda"
                    >
                        ✕
                    </button>
                </div>

                {/* saldo */}
                <div style={estilos.oro}>
                    🪙 {oro}
                </div>

                <div style={estilos.divider} />

                {/* catalogo */}
                <div style={estilos.grid}>
                    {Object.entries(catalogoBoosters).map(([clave, booster]) => {
                        const seleccionado = boosterSeleccionado === clave;
                        const puedeComprar = oro >= booster.precioCompra;

                        return (
                            <button
                                key={clave}
                                style={{
                                    ...estilos.card(seleccionado),
                                    opacity: puedeComprar ? 1 : 0.5,
                                    cursor: puedeComprar ? "pointer" : "not-allowed",
                                }}
                                onClick={() => puedeComprar && seleccionarBooster(clave)}
                                
                            >
                                <span style={estilos.emoji}>{booster.emoji}</span>

                                <div style={estilos.info}>
                                    <div style={estilos.nombre}>{booster.nombre}</div>
                                    <div style={estilos.desc}>
                                        {booster.desc}
                                    </div>
                                </div>

                                <div style={estilos.precios}>
                                    <span style={estilos.precio}>
                                        🪙 {booster.precioCompra}
                                    </span>
                                    {(boostersActivos[clave] ?? 0) > 0 && (
                                        <span style={{ 
                                            fontSize: 11, 
                                            color: "#3eb160", 
                                            marginRight: 5,
                                            fontWeight: "bold",
                                            display: "flex",
                                            justifyContent: "center",
                                            flexDirection: "row",
                                            width: "110%",
                                            marginLeft: 10,
                                        }}>
                                            {clave === "X2All"
                                                ? `${boostersActivos[clave]} cosechas`
                                                : `×${boostersActivos[clave]}`
                                            }
                                        </span>
                                    )}
                                </div>
                            </button>
                        );
                    })}
                </div>

                <div style={estilos.footer}>
                    {feedback && (
                        <div style={{
                            position: "absolute",
                            top: 70,
                            left: "50%",
                            transform: "translateX(-50%)",
                            background: feedback.ok ? "rgba(62,177,96,0.15)" : "rgba(200,60,60,0.15)",
                            border: `1px solid ${feedback.ok ? "#3eb160" : "#9b3232"}`,
                            color: feedback.ok ? "#3eb160" : "#e07070",
                            borderRadius: 8,
                            padding: "6px 16px",
                            fontSize: 13,
                            whiteSpace: "nowrap",
                        }}>
                            {feedback.msg}
                        </div>
                    )}

                    <div
                        style={estilos.venta}
                    >
                        Venta: 🌾$20 | 🥕$35 | 🍅$50
                    </div>

                    <button
                        style={{
                            ...estilos.comprar,
                            opacity: puedeComprarSeleccionado ? 1 : 0.45,
                            cursor: puedeComprarSeleccionado ? "pointer" : "not-allowed",
                        }}
                        onClick={handleComprar}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        Comprar 🪙{boosterSeleccionado ? catalogoBoosters[boosterSeleccionado]?.precioCompra : ""}
                    </button>
                </div>
            </div>
        </div>
    );
}