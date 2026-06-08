import { create } from "zustand";
import sembrarAudioPath from "../assets/planting.mp3";
import cosecharAudioPath from "../assets/harvesting.mp3";

const EfectosSonido = {
    sembrar: new Audio(sembrarAudioPath),
    cosechar: new Audio(cosecharAudioPath),
};

const CULTIVOS = {
    trigo: {
        nombre: "Trigo",
        emoji: "🌾",
        precioCompra: 10,
        precioVenta: 20,
        tiempoDeCrecimiento: 60,
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
        tiempoDeCrecimiento: 120,
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
        tiempoDeCrecimiento: 180,
        sprites: {
            semilla:   { sx: 0,  sy: 32,  sw: 16, sh: 16 },
            brotando:  { sx: 16, sy: 32,  sw: 16, sh: 16 },
            creciendo: { sx: 32, sy: 32,  sw: 16, sh: 16 },
            listo:     { sx: 48, sy: 32,  sw: 16, sh: 16 },
        },
    },
};

const BOOSTERS = {
    X5oro: {
        nombre: "X5",
        emoji: "💵",
        desc: "Ganancias de proxima cosecha X5",
        precioCompra: 100,
        
    },

    sembradoAut: {
        nombre: "Cosechar Todo",
        emoji: "👨‍🌾",
        desc: "Acelera el tiempo de todos los cultivos",
        precioCompra: 500,
        
    },

    X2All: {
        nombre: "X2",
        emoji: "💰",
        desc: "Ganancias de toda la parcela X2",
        precioCompra: 1000,
        
    },

    X10All: {
        nombre: "X10",
        emoji: "💰",
        desc: "Ganancias de toda la parcela X10",
        precioCompra: 5000,
    },
};

function crearParcela(id) {
    return {
        id,
        estado: "vacia", //"vacia", "sembrada", "brotando", "creciendo"
        cultivo: null,
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
    if (progreso < 25) estado = "sembrada";
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
    catalogoBoosters: BOOSTERS,
    boosterSeleccionado: null,
    boostersActivos: {},

    dia: 1,
    hora: 6,
    timerActivo: false, 

    sembrar: (parcelaId) => {
        const { parcelas, cultivoSeleccionado, oro } = get();
        const parcela = parcelas[parcelaId];
        const cultivo = CULTIVOS[cultivoSeleccionado];

        if(parcela.estado !== "vacia") 
            return { 
                ok: false, 
            };

        if(oro < cultivo.precioCompra) 
            return { 
                ok: false, 
                msg: "No tienes suficiente dinero"
            };

        EfectosSonido.sembrar.play().catch(() => {});
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
        const { parcelas, boostersActivos } = get()
        const parcela = parcelas[parcelaId]

        if(parcela.estado !== "listo") 
            return { 
                ok: false,
            };

        const cultivo = CULTIVOS[parcela.cultivo];
        const tieneX5   = (boostersActivos.X5oro ?? 0) > 0;
        const tieneX2All = (boostersActivos.X2All ?? 0) > 0;
        const tieneX10All = (boostersActivos.X10All ?? 0) > 0;

        let ganancia = cultivo.precioVenta;
        if (tieneX5) ganancia *= 5;
        if (tieneX2All) ganancia *= 2;
        if (tieneX10All) ganancia *= 10;

        EfectosSonido.cosechar.play().catch(() => {});
        set((state) => {
            const nuevos = { ...state.boostersActivos };
            if (tieneX5) {
                nuevos.X5oro -= 1;
                if (nuevos.X5oro <= 0) delete nuevos.X5oro;
            }
            if (tieneX2All) {
                nuevos.X2All -= 1;
                if (nuevos.X2All <= 0) delete nuevos.X2All;
            }
            if (tieneX10All) {
                nuevos.X10All -= 1;
                if (nuevos.X10All <= 0) delete nuevos.X10All;
            }

            return {
                oro: state.oro + ganancia,
                boostersActivos: nuevos,
                parcelas: state.parcelas.map((p) => 
                    p.id === parcelaId ? crearParcela(parcelaId) : p
                ),
            };
        });

        return { ok: true, ganancia, x5Aplicado: tieneX5 };
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

    seleccionarBooster: (boost) => {
        if(BOOSTERS[boost]) set({ boosterSeleccionado: boost });
    },

    comprarBooster: (booster) => {
        const { oro } = get() 
        const boost = BOOSTERS[booster]

        if (!boost || oro < boost.precioCompra) return { ok: false }

        if(booster === "sembradoAut"){
            set((state) => ({
                oro: state.oro - boost.precioCompra,
                parcelas: state.parcelas.map((p) => 
                    p.cultivo && p.estado !== "vacia" 
                        ? { ...p, estado: "listo", progreso: 100 }
                        : p 
                )
            }))
            return { ok: true }
        }

        if(booster === "X2All") {
            set((state) => ({
                oro: state.oro - boost.precioCompra,
                boostersActivos: {
                    ...state.boostersActivos,
                    X2All: (state.boostersActivos.X2All ?? 0) + 12,
                },
            }));
            return { ok: true };
        }

        if(booster === "X10All") {
            set((state) => ({
                oro: state.oro - boost.precioCompra,
                boostersActivos: {
                    ...state.boostersActivos,
                    X10All: (state.boostersActivos.X10All ?? 0) + 12,
                },
            }));
            return { ok: true };
        }

        set((state) => ({
            oro: state.oro - boost.precioCompra,
            boostersActivos: {
                ...state.boostersActivos,
                [booster]: (state.boostersActivos[booster] ?? 0) + 1,
            },
        }));

        return { ok: true };
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

export { CULTIVOS, BOOSTERS };