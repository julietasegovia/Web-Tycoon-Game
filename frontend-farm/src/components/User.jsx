/**
 * @fileoverview Modal de perfil de usuario para Farm Tycoon.
 * Muestra nombre, email, foto de perfil (editable) y el oro actual,
 * además de un botón para cerrar sesión.
 *
 * @author Farm Tycoon
 * @version 1.0.0
 */

import { useContext, useRef, useState } from "react";
import { useGameStore } from "../store/UseGameStore";
import { AuthContext } from "../context/AuthContext";
import { useAuth } from "../hooks/useAuth";

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Redimensiona una imagen en el cliente antes de subirla, para no mandar
 * fotos pesadas al backend. Devuelve un data URL base64 (JPEG).
 */
function resizeImageToBase64(file, maxSize = 256, quality = 0.75) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            let { width, height } = img;

            if (width > height) {
                if (width > maxSize) { 
                    height = Math.round(height * (maxSize / width))
                    width = maxSize 
                }
            } else {
                if (height > maxSize) { 
                    width = Math.round(width * (maxSize / height))
                    height = maxSize
                }
            }

            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            canvas.getContext("2d").drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL("image/jpeg", quality));
        }

        img.onerror = () => reject(new Error("No se pudo leer la imagen ૮◞ ‸ ◟ ა"));
        img.src = e.target.result;
        }

        reader.onerror = () => reject(new Error("No se pudo leer el archivo ૮◞ ‸ ◟ ა"));
        reader.readAsDataURL(file);
    })
}

// ─── Componente principal ─────────────────────────────────────────────────────

/**
 * Modal de perfil de usuario.
 * Se renderiza solo cuando `perfilAbierto` es true en el store.
 *
 * @component
 * @returns {JSX.Element|null}
 */

export default function UserProfile() {
    const perfilAbierto = useGameStore((s) => s.perfilAbierto)
    const cerrarPerfil  = useGameStore((s) => s.cerrarPerfil)
    const oro = useGameStore((s) => s.oro)

    const { user } = useContext(AuthContext)
    const { handleLogout, handleUpdateProfilePicture } = useAuth()

    const fileInputRef = useRef(null)
    const [subiendoFoto, setSubiendoFoto] = useState(false)
    const [errorFoto, setErrorFoto] = useState(null)

    if (!perfilAbierto) return null;

    async function onFileSelected(e) {
        const file = e.target.files?.[0];
        e.target.value = ""

        if (!file) return
        if (!file.type.startsWith("image/")) {
            setErrorFoto("El archivo tiene que ser una imagen (¬`‸´¬)")
            return
        }

        setErrorFoto(null)
        setSubiendoFoto(true)

        try {
            const base64  = await resizeImageToBase64(file)
            const result  = await handleUpdateProfilePicture(base64)
        if (!result) setErrorFoto("No se pudo actualizar la foto (ᴗ_ ᴗ。)")
        } catch {
            setErrorFoto("No se pudo actualizar la foto (ᴗ_ ᴗ。)")
        } finally {
            setSubiendoFoto(false)
        }
    }

    function onLogoutClick() {
        cerrarPerfil()
        handleLogout()
    }

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.52)",
                zIndex: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
            onClick={cerrarPerfil}
        >
            <div
                style={{
                    background: "rgb(53, 37, 23)",
                    border: "2px solid #5a440c",
                    borderRadius: 20,
                    padding: "24px 28px",
                    width: 320,
                    fontFamily: "monospace",
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    gap: 14,
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div 
                    style={{ 
                        display: "flex", 
                        justifyContent: "space-between", 
                        alignItems: "center" 
                    }}
                >
                <p 
                    style={{ 
                        color: "#d8ad36", 
                        fontSize: 20, 
                        fontWeight: "bold", 
                        margin: 0 
                    }}
                >
                    👤 Perfil
                </p>
                <button
                    onClick={cerrarPerfil}
                    style={{
                        background: "transparent",
                        border: "none",
                        color: "#a07830",
                        fontSize: 22,
                        cursor: "pointer",
                        lineHeight: 1,
                        padding: "0 4px",
                    }}
                >
                    ✕
                </button>
                </div>

                <div 
                    style={{ 
                        height: 1, 
                        background: "#6c5210" 

                    }} 
                />

                {/* Avatar + edición de foto */}
                <div 
                    style={{ 
                        display: "flex", 
                        flexDirection: "column", 
                        alignItems: "center", 
                        gap: 10 
                    }}
                >
                    <div 
                        style={{ 
                            position: "relative" 
                        }}
                    >
                        <div
                            style={{
                                width: 84,
                                height: 84,
                                borderRadius: "50%",
                                border: "2px solid #5a440c",
                                background: user?.profilePicture
                                ? `url(${user.profilePicture}) center / cover no-repeat`
                                : "rgb(71, 58, 21)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 36,
                                color: "#deac21",
                            }}
                        >
                            {!user?.profilePicture && "👤"}
                        </div>

                        <button
                            onClick={() => fileInputRef.current?.click()}
                            title="Cambiar foto"
                            disabled={subiendoFoto}
                            style={{
                                position: "absolute",
                                bottom: -2,
                                right: -2,
                                width: 28,
                                height: 28,
                                borderRadius: "50%",
                                border: "2px solid rgb(53, 37, 23)",
                                background: "#deac21",
                                color: "rgb(53, 37, 23)",
                                fontSize: 13,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: subiendoFoto ? "default" : "pointer",
                            }}
                        >
                            {subiendoFoto ? "…" : "✎"}
                        </button>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={onFileSelected}
                            style={{ 
                                display: "none" 
                            }}
                        />
                    </div>

                    {errorFoto && (
                        <span 
                            style={{ 
                                color: "#c24133", 
                                fontSize: 12,
                                textAlign: "center"
                            }}
                        >
                            {errorFoto}
                        </span>
                    )}

                    <div style={{ textAlign: "center" }}>
                        <div 
                            style={{ 
                                color: "#d8ad36",   
                                fontSize: 17, 
                                fontWeight: "bold" 
                            }}
                        >
                            {user?.username}
                        </div>
                        <div 
                            style={{ 
                                color: "#a07830", 
                                fontSize: 12, 
                                marginTop: 2 

                            }}
                        >
                            {user?.email}
                        </div>
                    </div>
                </div>

                <div 
                    style={{ 
                        height: 1, 
                        background: "#6c5210" 
                    }} 
                />

                {/* Stats */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        background: "rgba(0,0,0,0.18)",
                        border: "1.5px solid #604601",
                        borderRadius: 12,
                        padding: "12px 16px",
                    }}
                >
                    <span 
                        style={{ 
                            color: "#a07830", 
                            fontSize: 13 

                        }}
                    > 🪙 Oro </span>
                    <span 
                        style={{ 
                            color: "#cfa42e", 
                            fontWeight: "bold", 
                            fontSize: 16 
                        }}
                    > {oro} </span>
                </div>

                {/* Logout */}
                <button
                    onClick={onLogoutClick}
                    style={{
                        background: "#7a2c22",
                        border: "none",
                        borderRadius: 10,
                        color: "#ffd9ad",
                        fontFamily: "monospace",
                        fontSize: 14,
                        fontWeight: "bold",
                        padding: "10px 0",
                        cursor: "pointer",
                        transition: "opacity 0.15s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.82")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                    Log out ⏻
                </button>
            </div>
        </div>
    );
}