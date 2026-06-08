// useAutosave.js
import { useEffect, useRef } from "react";

export function useAutosave(gameState, token, delay = 5000) {
    const timer = useRef(null);
    const stateRef = useRef(gameState); // ← store latest state in a ref

    // keep ref up to date without triggering the effect
    useEffect(() => {
        stateRef.current = gameState;
    }, [gameState]);

    useEffect(() => {
        if (!token) return;

        clearTimeout(timer.current);
        timer.current = setInterval(async () => {
            await fetch('/api/game/state', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ state: stateRef.current }) // ← read from ref
            });
        }, delay);

        return () => clearInterval(timer.current);
    }, [token, delay]); // ← gameState removed from deps entirely
}