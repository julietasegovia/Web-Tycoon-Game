import { create } from "zustand"

const CULTIVOS = {
    trigo: {
        nombre: "Trigo",
        emoji: "🌾",
        precioCompra: 10,
        precioVenta: 20,
        tiempoDeCrecimiento: 15,
        sprites: {
            semilla: { sx: 0,  sy: 0,  sw: 16, sh: 16 },
            brotando:  { sx: 16, sy: 0,  sw: 16, sh: 16 },
            creciendo: { sx: 32, sy: 0,  sw: 16, sh: 16 },
            listo:     { sx: 48, sy: 0,  sw: 16, sh: 16 },
        }
    },

    zanahoria: {
        nombre: "Zanahoria",
        emoji: "🥕",
        precioCompra: 15,
        precioVenta: 35,
        tiempoDeCrecimiento: 25,
        sprites: {
            semilla:   { sx: 0,  sy: 16,  sw: 16, sh: 16 },
            brotando:  { sx: 16, sy: 16,  sw: 16, sh: 16 },
            creciendo: { sx: 32, sy: 16,  sw: 16, sh: 16 },
            listo:     { sx: 48, sy: 16,  sw: 16, sh: 16 },
        }
    },

    tomate: {
        nombre: "Tomate",
        emoji: "🍅",
        precioCompra: 20,
        precioVenta: 50,
        tiempoDeCrecimiento: 40,
        sprites: {
            semilla:   { sx: 0,  sy: 32,  sw: 16, sh: 16 },
            brotando:  { sx: 16, sy: 32,  sw: 16, sh: 16 },
            creciendo: { sx: 32, sy: 32,  sw: 16, sh: 16 },
            listo:     { sx: 48, sy: 32,  sw: 16, sh: 16 },
        }
    }
}

function crearParcela(id) {
    
}