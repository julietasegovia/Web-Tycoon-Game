// useAutosave.js
import { useEffect, useRef } from "react";
import { useGameStore } from "../store/UseGameStore";

export function useAutosave(token, delay = 5000) {
    const saveTimer = useRef(null);
    const isSaving = useRef(false);
    
    // Get a stable reference to the save function
    const saveToServer = async () => {
        if (isSaving.current || !token) return;
        
        // Get current state directly from the store
        const currentState = useGameStore.getState();
        const stateToSave = {
            oro: currentState.oro,
            parcelas: currentState.parcelas,
            boostersActivos: currentState.boostersActivos,
            cultivoSeleccionado: currentState.cultivoSeleccionado,
            dia: currentState.dia,
            hora: currentState.hora,
        };
        
        try {
            isSaving.current = true;
            console.log('Saving game state...');
            
            const response = await fetch('/api/game/state', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ state: stateToSave })
            });
            
            if (!response.ok) {
                console.error('Autosave failed:', await response.text());
            } else {
                console.log('✅ Autosave successful');
            }
        } catch (error) {
            console.error('Autosave error:', error);
        } finally {
            isSaving.current = false;
        }
    };

    // Set up periodic autosave (every 5 seconds)
    useEffect(() => {
        if (!token) return;
        
        // Clear any existing timer
        if (saveTimer.current) {
            clearInterval(saveTimer.current);
        }
        
        // Start new interval
        saveTimer.current = setInterval(saveToServer, delay);
        
        // Cleanup on unmount or token change
        return () => {
            if (saveTimer.current) {
                clearInterval(saveTimer.current);
                saveTimer.current = null;
            }
        };
    }, [token, delay]); // Only re-run when token or delay changes
    
    // Listen for game state changes and save immediately (debounced)
    useEffect(() => {
        if (!token) return;
        
        // Don't save immediately - wait for user to stop making changes
        const debounceTimer = setTimeout(() => {
            saveToServer();
        }, 2000); // Save 2 seconds after last change
        
        return () => clearTimeout(debounceTimer);
    }, [
        token,
        useGameStore((state) => state.oro),
        useGameStore((state) => state.parcelas),
        useGameStore((state) => state.boostersActivos),
        useGameStore((state) => state.cultivoSeleccionado),
    ]);
}