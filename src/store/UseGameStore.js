import { create } from "zustand";

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
        },
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
        },
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
        },
    },
};

function crearParcela(id) {
    return {
        id,
        estado: "vacia", //"vacia", "sembrada", "brotando", "creciendo"
        cultivos: null,
        progreso: 0,
        tiempoPlantado: null,
    };
}

function calcEstado(parcela, ahora) {
    if(!parcela.cultivo || !parcela.tiempoPlantado) return parcela.estado

    const cultivo = CULTIVOS[parcela.cultivo]
    const tiempoTranscurrido = (ahora - parcela.tiempoPlantado) / 1000 // en segundos
    const progreso = Math.min((tiempoTranscurrido / cultivo.tiempoDeCrecimiento) * 100, 100) //porcentaje del progreso, el tiempo transcurrido sobre el tiempo de crecimiento

    let estado 
    if (progreso < 25) estado: "sembrada";
    else if (progreso < 55)  estado = "brotando";
    else if (progreso < 90)  estado = "creciendo";
    else                     estado = "listo";

    return {estado, progreso};
}

export const useGameStore = create((set, get) => ({
    oro: 50,
    inventario: {},
    cultivoSeleccionado: "trigo",

    parcelas: Array.from({ length: 12 }, (_, i) => crearParcela(i)),

    tiendaAbierta: false,
    catalogo: CULTIVOS,

    dia: 1,
    hora: 6,
    timerActivo: false, 

    sembrar: (parcelaId) => {
        const { parcelas, cultivoSeleccionado, inventario, oro } = get();
        const parcela = parcelas[parcelaId];
        const cultivo = CULTIVOS[cultivoSeleccionado];

        if(parcela.estado !== "vacia") 
            return { 
                ok: false, 
                msg: "La parcela ya tiene un cultivo"
            };

        if(oro < cultivo.precioCompra) 
            return { 
                ok: false, 
                msg: "No tienes suficiente dinero"
            };

        set((state) => ({
            oro: state.oro - cultivo.precioCompra,
            parcelas: state.parcelas.map((p) => 
                p.id === parcelaId ? 
                {
                    ...p, 
                    estado: "sembrada", 
                    cultivo: cultivoSeleccionado, 
                    tiempoPlantado: Date.now(), 
                    progreso: 0 
                } : p
            ), 
        }));
    
        return { ok: true };
    },

    cosechar: (parcelaId) => {
        const { parcelas } = get()
        const parcela = parcelas[parcelaId]

        if(parcela.estado !== "listo") 
            return { 
                ok: false,
                msg: "El cultivo no terminó de crecer"
            };

        const cultivo = CULTIVOS[parcela.cultivo];

        set((state) => ({
            oro: state.oro + cultivo.precioVenta,
            parcelas : state.parcelas.map((p) => 
                p.id === parcelaId ?
                crearParcela(parcelaId) : p
            ),
        }));
        return { ok: true, ganancia: cultivo.precioVenta };
    },
    
    actualizarCrecimiento: () => {
        const ahora = Date.now();

        set((state) => ({
            parcelas: state.parcelas.map((p) => {        
                if(!p.cultivo || p.estado === "vacia" || p.estado === "listo") return p ;
                
                const { estado, progreso } = calcEstado(p, ahora);

                return {
                    ...p,
                    estado,
                    progreso
                }; 
            }),
        }));    
    },

    abrirTienda: () => set({ tiendaAbierta: true }),
    cerrarTienda: () => set({ tiendaAbierta: false }),

    seleccionarCultivo: (cultivo) => {
        if(CULTIVOS[cultivo]) set({ cultivoSeleccionado: cultivo });
    },

    avanzarTiempo: () => { 
        set((state) => {
            let hora = state.hora + 1;    
            let dia = state.dia;

            if(hora >= 24) {
                hora = 6 
                dia += 1             
            }

            return { hora, dia }; 
        });        
    },
   
    getCultivo: (clave) => CULTIVOS[clave] ?? null,
 
    estaListo: (parcelaId) => {
        const p = get().parcelas[parcelaId];
        return p?.estado === "listo";    
    },

    oroDisponible: () => {
        const { parcelas } = get() 
        return parcelas    
        .filter((p) => p.estado === "listo")    
        .reduce((acc, p) => acc + (CULTIVOS[p.cultivo]?.precioVenta ?? 0), 0)
    }
}))

export { CULTIVOS };