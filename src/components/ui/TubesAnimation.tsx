"use client";

import { useEffect, useRef } from "react";
// @ts-ignore
import { Tubes1Cursor } from "threejs-components";

export function TubesAnimation() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        // Initialize TubesCursor
        const app = Tubes1Cursor(canvasRef.current, {
            tubes: {
                colors: ["#8B5CF6", "#3B82F6", "#D946EF"],
                lights: {
                    intensity: 200,
                    colors: ["#8B5CF6", "#3B82F6", "#D946EF", "#F8FAFC"]
                }
            }
        });

        return () => {
            // Cleanup
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[200vh] pointer-events-none opacity-20 mix-blend-screen -z-50 scale-50 transform-gpu"
        />
    );
}
