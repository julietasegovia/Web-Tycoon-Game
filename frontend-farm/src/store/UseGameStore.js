import { create } from "zustand"
import sembrarAudioPath from "../assets/planting.mp3"
import cosecharAudioPath from "../assets/harvesting.mp3"

const EfectosSonido = {
    sembrar: new Audio(sembrarAudioPath),
    cosechar: new Audio(cosecharAudioPath),
}

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
}

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
}

// ─── Misiones ────────────────────────────────────────────────────────────────

/**
 * Tipos de misiones disponibles.
 * Cada misión tiene un tipo, parámetros y recompensa.
 */
const PLANTILLAS_MISIONES = [
    // Cosechar cultivo específico
    { tipo: "cosechar_cultivo", cultivo: "trigo",     objetivo: 5,  recompensaOro: 80,   recompensaBooster: "X5oro"      },
    { tipo: "cosechar_cultivo", cultivo: "zanahoria", objetivo: 4,  recompensaOro: 120,  recompensaBooster: "X2All"      },
    { tipo: "cosechar_cultivo", cultivo: "tomate",    objetivo: 3,  recompensaOro: 200,  recompensaBooster: "X5oro"},
    { tipo: "cosechar_cultivo", cultivo: "trigo",     objetivo: 8,  recompensaOro: 150,  recompensaBooster: "X2All"      },
    { tipo: "cosechar_cultivo", cultivo: "zanahoria", objetivo: 6,  recompensaOro: 180,  recompensaBooster: "X5oro"      },
    { tipo: "cosechar_cultivo", cultivo: "tomate",    objetivo: 5,  recompensaOro: 300,  recompensaBooster: "X10All"     },
    // Usar booster
    { tipo: "usar_booster", booster: "X5oro",      objetivo: 1, recompensaOro: 150,  recompensaBooster: "X2All"      },
    { tipo: "usar_booster", booster: "X2All",      objetivo: 1, recompensaOro: 200,  recompensaBooster: "X5oro"},
    { tipo: "usar_booster", booster: "sembradoAut",objetivo: 1, recompensaOro: 100,  recompensaBooster: "X5oro"      },
    { tipo: "usar_booster", booster: "X10All",     objetivo: 1, recompensaOro: 500,  recompensaBooster: "X2All"      },
]

/**
 * Genera el texto descriptivo de una misión para mostrar al jugador.
 */
export function describeMision(mision) {
    if (mision.tipo === "cosechar_cultivo") {
        const c = CULTIVOS[mision.cultivo]
        return `Cosechar ${mision.objetivo} ${c?.emoji ?? ""} ${c?.nombre ?? mision.cultivo}`
    }
    if (mision.tipo === "usar_booster") {
        const b = BOOSTERS[mision.booster]
        return `Usar el booster ${b?.emoji ?? ""} ${b?.nombre ?? mision.booster}`
    }
    return "Misión desconocida"
}

/**
 * Elige 3 misiones aleatorias sin repetir plantilla.
 */
function generarMisiones() {
    const shuffled = [...PLANTILLAS_MISIONES].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 3).map((plantilla, i) => ({
        id: i,
        ...plantilla,
        progreso: 0,
        completada: false,
        reclamada: false,
    }))
}

// ─── Racha ───────────────────────────────────────────────────────────────────

/** Ventana de tiempo (ms) para mantener la racha activa entre cosechas */
const VENTANA_RACHA_MS = 10000

/**
 * Devuelve el multiplicador de ganancia según la racha actual.
 * Racha 0-2: x1 | 3-5: x1.5 | 6-9: x2 | 10+: x3
 */
export function multiplicadorRacha(racha) {
    if (racha >= 10) return 3
    if (racha >= 6)  return 2
    if (racha >= 3)  return 1.5
    return 1
}

// ─────────────────────────────────────────────────────────────────────────────

function crearParcela(id) {
    return {
        id,
        estado: "vacia",
        cultivo: null,
        progreso: 0,
        tiempoPlantado: null,
    }
}

function calcEstado(parcela, ahora) {
    if(!parcela.cultivo || !parcela.tiempoPlantado) return parcela.estado

    const cultivo = CULTIVOS[parcela.cultivo]
    const tiempoTranscurrido = (ahora - parcela.tiempoPlantado) / 1000
    const progreso = Math.min((tiempoTranscurrido / cultivo.tiempoDeCrecimiento) * 100, 100)

    let estado 
    if (progreso < 25) estado = "sembrada"
    else if (progreso < 55)  estado = "brotando"
    else if (progreso < 90)  estado = "creciendo"
    else                     estado = "listo"

    return {estado, progreso}
}

// ─────────────────────────────────────────────────────────────────────────────

export const useGameStore = create((set, get) => ({
    oro: 60,
    inventario: {},
    cultivoSeleccionado: "trigo",

    parcelas: Array.from({ length: 12 }, (_, i) => crearParcela(i)),

    tiendaAbierta: false,
    catalogo: CULTIVOS,
    catalogoBoosters: BOOSTERS,
    boosterSeleccionado: null,
    boostersActivos: {},

    perfilAbierto: false,

    dia: 1,
    hora: 6,
    timerActivo: false,

    // ── Misiones ─────────────────────────────────────────────────────────────
    misiones: generarMisiones(),
    misionesAbiertas: false,
    /** Notificación de misión completada: { id, nombre } | null */
    notificacionMision: null,

    // ── Racha ─────────────────────────────────────────────────────────────────
    /** Cantidad de cosechas consecutivas dentro de la ventana de tiempo */
    racha: 0,
    /** Timestamp de la última cosecha (para calcular si expiró la racha) */
    ultimaCosecha: null,

    // ── Acciones de misiones ──────────────────────────────────────────────────

    abrirMisiones:  () => set({ misionesAbiertas: true  }),
    cerrarMisiones: () => set({ misionesAbiertas: false }),

    /**
     * Reclama la recompensa de una misión completada.
     * Otorga oro + 1 unidad del booster indicado.
     */
    reclamarMision: (misionId) => {
        const { misiones } = get()
        const mision = misiones.find((m) => m.id === misionId)
        if (!mision || !mision.completada || mision.reclamada) return { ok: false }

        set((state) => ({
            oro: state.oro + mision.recompensaOro,
            boostersActivos: {
                ...state.boostersActivos,
                [mision.recompensaBooster]: (state.boostersActivos[mision.recompensaBooster] ?? 0) + 1,
            },
            misiones: state.misiones.map((m) =>
                m.id === misionId ? { ...m, reclamada: true } : m
            ),
        }))

        return { ok: true }
    },

    /** Refresca las 3 misiones (útil para pruebas o al cambiar de día) */
    refrescarMisiones: () => set({ misiones: generarMisiones() }),

    limpiarNotificacionMision: () => set({ notificacionMision: null }),

    // ── Sembrar ───────────────────────────────────────────────────────────────

    sembrar: (parcelaId) => {
        const { parcelas, cultivoSeleccionado, oro } = get()
        const parcela = parcelas[parcelaId]
        const cultivo = CULTIVOS[cultivoSeleccionado]

        if(parcela.estado !== "vacia") 
            return { ok: false }

        if(oro < cultivo.precioCompra) 
            return { ok: false, msg: "No tienes suficiente dinero" }

        EfectosSonido.sembrar.play().catch(() => {})
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
        }))
    
        return { ok: true }
    },

    // ── Cosechar ──────────────────────────────────────────────────────────────

    cosechar: (parcelaId) => {
        const { parcelas, boostersActivos, racha, ultimaCosecha, misiones } = get()
        const parcela = parcelas[parcelaId]

        if(parcela.estado !== "listo") 
            return { ok: false }

        const ahora = Date.now()
        const cultivo = CULTIVOS[parcela.cultivo]

        // ── Calcular racha ────────────────────────────────────────────────────
        const rachaValida = ultimaCosecha && (ahora - ultimaCosecha) <= VENTANA_RACHA_MS
        const nuevaRacha  = rachaValida ? racha + 1 : 1
        const multRacha   = multiplicadorRacha(nuevaRacha)

        // ── Calcular ganancia con boosters ────────────────────────────────────
        const tieneX5    = (boostersActivos.X5oro  ?? 0) > 0
        const tieneX2All = (boostersActivos.X2All  ?? 0) > 0
        const tieneX10All= (boostersActivos.X10All ?? 0) > 0

        let ganancia = cultivo.precioVenta
        if (tieneX5)    ganancia *= 5
        if (tieneX2All) ganancia *= 2
        if (tieneX10All)ganancia *= 10
        ganancia = Math.round(ganancia * multRacha)

        // ── Progreso de misiones ──────────────────────────────────────────────
        let notificacionMision = null
        const misionesActualizadas = misiones.map((m) => {
            if (m.completada) return m

            let nuevoProgreso = m.progreso

            if (m.tipo === "cosechar_cultivo" && m.cultivo === parcela.cultivo) {
                nuevoProgreso = Math.min(m.progreso + 1, m.objetivo)
            }

            const ahoraCompletada = nuevoProgreso >= m.objetivo
            if (ahoraCompletada && !m.completada) {
                notificacionMision = { id: m.id }
            }

            return { ...m, progreso: nuevoProgreso, completada: ahoraCompletada }
        })

        EfectosSonido.cosechar.play().catch(() => {})

        set((state) => {
            const nuevosB = { ...state.boostersActivos }
            if (tieneX5)    { 
                nuevosB.X5oro  -= 1
                if (nuevosB.X5oro  <= 0) delete nuevosB.X5oro  
            }
            if (tieneX2All) { 
                nuevosB.X2All  -= 1
                if (nuevosB.X2All  <= 0) delete nuevosB.X2All  
            }
            if (tieneX10All){ 
                nuevosB.X10All -= 1 
                if (nuevosB.X10All <= 0) delete nuevosB.X10All 
            }

            return {
                oro: state.oro + ganancia,
                boostersActivos: nuevosB,
                parcelas: state.parcelas.map((p) => 
                    p.id === parcelaId ? crearParcela(parcelaId) : p
                ),
                racha: nuevaRacha,
                ultimaCosecha: ahora,
                misiones: misionesActualizadas,
                ...(notificacionMision ? { notificacionMision } : {}),
            }
        })

        return { ok: true, ganancia, multRacha, nuevaRacha, x5Aplicado: tieneX5 }
    },


    comprarBooster: (booster) => {
        const { oro, misiones } = get()
        const boost = BOOSTERS[booster]

        if (!boost || oro < boost.precioCompra) return { ok: false }

        // Progreso misión usar_booster
        let notificacionMision = null
        const misionesActualizadas = misiones.map((m) => {
            if (m.completada || m.tipo !== "usar_booster" || m.booster !== booster) return m
            const nuevoProgreso = Math.min(m.progreso + 1, m.objetivo)
            const ahoraCompletada = nuevoProgreso >= m.objetivo
            if (ahoraCompletada && !m.completada) {
                notificacionMision = { id: m.id }
            }
            return { ...m, progreso: nuevoProgreso, completada: ahoraCompletada }
        })

        if(booster === "sembradoAut"){
            set((state) => ({
                oro: state.oro - boost.precioCompra,
                parcelas: state.parcelas.map((p) => 
                    p.cultivo && p.estado !== "vacia" 
                        ? { ...p, estado: "listo", progreso: 100 }
                        : p 
                ),
                misiones: misionesActualizadas,
                ...(notificacionMision ? { notificacionMision } : {}),
            }))
            return { ok: true }
        }

        if(booster === "X2All") {
            set((state) => ({
                oro: state.oro - boost.precioCompra,
                boostersActivos: { ...state.boostersActivos, X2All: (state.boostersActivos.X2All ?? 0) + 12 },
                misiones: misionesActualizadas,
                ...(notificacionMision ? { notificacionMision } : {}),
            }))
            return { ok: true }
        }

        if(booster === "X10All") {
            set((state) => ({
                oro: state.oro - boost.precioCompra,
                boostersActivos: { ...state.boostersActivos, X10All: (state.boostersActivos.X10All ?? 0) + 12 },
                misiones: misionesActualizadas,
                ...(notificacionMision ? { notificacionMision } : {}),
            }))
            return { ok: true }
        }

        set((state) => ({
            oro: state.oro - boost.precioCompra,
            boostersActivos: {
                ...state.boostersActivos,
                [booster]: (state.boostersActivos[booster] ?? 0) + 1,
            },
            misiones: misionesActualizadas,
            ...(notificacionMision ? { notificacionMision } : {}),
        }))

        return { ok: true }
    },

    actualizarCrecimiento: () => {
        const ahora = Date.now()
        set((state) => ({
            parcelas: state.parcelas.map((p) => {        
                if(!p.cultivo || p.estado === "vacia" || p.estado === "listo") return p
                const { estado, progreso } = calcEstado(p, ahora)
                return { ...p, estado, progreso } 
            }),
        }))    
    },

    abrirTienda:  () => set({ tiendaAbierta: true  }),
    cerrarTienda: () => set({ tiendaAbierta: false }),

    abrirPerfil:  () => set({ perfilAbierto: true  }),
    cerrarPerfil: () => set({ perfilAbierto: false }),

    seleccionarCultivo: (cultivo) => {
        if(CULTIVOS[cultivo]) set({ cultivoSeleccionado: cultivo })
    },

    seleccionarBooster: (boost) => {
        if(BOOSTERS[boost]) set({ boosterSeleccionado: boost })
    },

    avanzarTiempo: () => { 
        set((state) => {
            let hora = state.hora + 1    
            let dia  = state.dia
            if(hora >= 24) { 
                hora = 6
                dia += 1
            }
            return { hora, dia } 
        })
    },
   
    getCultivo: (clave) => CULTIVOS[clave] ?? null,
 
    estaListo: (parcelaId) => {
        const p = get().parcelas[parcelaId]
        return p?.estado === "listo"    
    },

    oroDisponible: () => {
        const { parcelas } = get()
        return parcelas    
            .filter((p) => p.estado === "listo")    
            .reduce((acc, p) => acc + (CULTIVOS[p.cultivo]?.precioVenta ?? 0), 0)
    },

    loadGameState: (savedState) => {
        if (!savedState) return
        set({
            oro: savedState.oro ?? 60,
            inventario: savedState.inventario ?? {},
            cultivoSeleccionado: savedState.cultivoSeleccionado ?? "trigo",
            parcelas: savedState.parcelas ?? Array.from({ length: 12 }, (_, i) => crearParcela(i)),
            boostersActivos: savedState.boostersActivos ?? {},
            dia: savedState.dia ?? 1,
            hora: savedState.hora ?? 6,
            misiones: savedState.misiones ?? generarMisiones(),
            racha: savedState.racha ?? 0,
            ultimaCosecha: savedState.ultimaCosecha ?? null,
        })
    },

    restartGame: () => {
        set((state) => ({
            oro: 60,
            parcelas: state.parcelas.map((parcela) => ({
                ...parcela,
                estado: "vacia",
                cultivo: null,
                progreso: 0,
                tiempoPlantado: null,
            })),
            boostersActivos: {},
            tiendaAbierta: false,
            boosterSeleccionado: null,
            dia: 1,
            hora: 6,
            misiones: generarMisiones(),
            racha: 0,
            ultimaCosecha: null,
        }))
    },
}))

export { CULTIVOS, BOOSTERS }