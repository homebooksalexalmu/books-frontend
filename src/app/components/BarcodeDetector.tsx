"use client"
import { useEffect, useRef, useState } from "react";

interface BarcodeDetectorComponentProps {
    onDetected: (value: string) => void;
    onClose?: () => void;
}

const BarcodeDetectorComponent = ({ onDetected, onClose }: BarcodeDetectorComponentProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [error, setError] = useState<string | null>(null);
    const [isSupported, setIsSupported] = useState<boolean>(false);
    const scanningRef = useRef<boolean>(false);

    useEffect(() => {
        let streamRef: MediaStream | null = null;

        const initScanner = async () => {
            // Verificar soporte
            if (!("BarcodeDetector" in window)) {
                setError("BarcodeDetector no soportado en este navegador");
                setIsSupported(false);
                return;
            }

            setIsSupported(true);

            try {
                // Crear detector EAN-13
                const detector = new (window as any).BarcodeDetector({
                    formats: ["ean_13"],
                });

                // Solicitar acceso a cámara
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: "environment" },
                });

                streamRef = stream;

                const video = videoRef.current;
                if (video) {
                    video.srcObject = stream;

                    // Función de escaneo
                    const scan = async () => {
                        if (!video || !scanningRef.current) return;

                        try {
                            const barcodes = await detector.detect(video);
                            if (barcodes.length > 0) {
                                const isbn = barcodes[0].rawValue;
                                if (isbn && isbn.length === 13) {
                                    scanningRef.current = false;
                                    onDetected(isbn);
                                    return;
                                }
                            }
                        } catch (err) {
                            console.error("Error detectando código:", err);
                        }

                        if (scanningRef.current) {
                            requestAnimationFrame(scan);
                        }
                    };

                    scanningRef.current = true;
                    scan();
                }
            } catch (err) {
                const errorMsg = err instanceof Error ? err.message : "Error al acceder a la cámara";
                setError(errorMsg);
                console.error("Error inicializando scanner:", err);
            }
        };

        initScanner();

        // Cleanup
        return () => {
            scanningRef.current = false;
            if (streamRef) {
                streamRef.getTracks().forEach((track) => track.stop());
            }
        };
    }, [onDetected]);

    if (!isSupported) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-900 text-white">
                <i className="fa-solid fa-circle-exclamation text-4xl mb-4"></i>
                <p className="text-lg font-semibold">{error}</p>
                <p className="text-sm text-neutral-400 mt-2">Por favor, usa un navegador más moderno</p>
                {onClose && (
                    <button
                        onClick={onClose}
                        className="mt-6 px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
                    >
                        Cerrar
                    </button>
                )}
            </div>
        );
    }

    return (
        <div className="relative w-full h-full bg-black overflow-hidden">
            <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
            />

            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute top-4 left-4 z-10 w-12 h-12 rounded-full bg-neutral-900/70 hover:bg-neutral-900 text-white flex items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                aria-label="Cerrar escáner"
            >
                <i className="fa-solid fa-xmark text-xl"></i>
            </button>

            {/* Focus guide overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-64 h-64 border-4 border-primary-500 rounded-xl shadow-lg"></div>
            </div>

            {/* Loading indicator */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center">
                <p className="text-white text-sm font-medium">Enfoca el código de barras</p>
            </div>
        </div>
    );
};

export default BarcodeDetectorComponent;
