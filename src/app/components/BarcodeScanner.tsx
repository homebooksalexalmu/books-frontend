"use client"
import { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

interface BarcodeScannerProps {
    onDetected: (barcode: string) => void;
    onClose?: () => void;
}

const BarcodeScanner = ({ onDetected, onClose }: BarcodeScannerProps) => {
    const [error, setError] = useState<string | null>(null);
    const scannerRef = useRef<Html5QrcodeScanner | null>(null);
    const hasDetectedRef = useRef(false);

    useEffect(() => {
        try {
            if (typeof window === "undefined") {
                setError("No disponible en servidor");
                return;
            }

            // Crear instancia del scanner
            const scanner = new Html5QrcodeScanner(
                "qr-reader",
                {
                    fps: 10,
                    qrbox: { width: 250, height: 250 },
                    aspectRatio: 1,
                    disableFlip: false,
                },
                false
            );

            scannerRef.current = scanner;

            const onScanSuccess = (decodedText: string) => {
                // Evitar múltiples detecciones simultáneas
                if (hasDetectedRef.current) return;

                // Validar que sea un ISBN (13 dígitos)
                const cleanedText = decodedText.trim();
                if (/^\d{13}$/.test(cleanedText)) {
                    hasDetectedRef.current = true;
                    scanner.clear();
                    onDetected(cleanedText);
                }
            };

            const onScanFailure = () => {
                // Ignorar errores de escaneo, es normal que falle frecuentemente
            };

            scanner.render(onScanSuccess, onScanFailure);
            setError(null);

            return () => {
                scanner.clear().catch(() => {});
            };
        } catch (err) {
            let message = "No se pudo inicializar el escáner";

            if (err instanceof Error) {
                message = err.message;
                if (err.message.includes("NotAllowedError")) {
                    message = "Permiso de cámara denegado. Ve a Configuración > Privacidad y habilita el acceso a cámara.";
                } else if (err.message.includes("NotFoundError")) {
                    message = "No se encontró cámara en este dispositivo.";
                } else if (err.message.includes("https")) {
                    message = "Este navegador requiere HTTPS para acceder a la cámara.";
                }
            }

            setError(message);
            console.error("Scanner error:", err);
        }
    }, [onDetected]);

    return (
        <div className="fixed top-0 left-0 w-full h-[calc(100vh-80px)] z-50 bg-black overflow-hidden flex flex-col">
            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute top-4 left-4 z-20 w-12 h-12 rounded-full bg-neutral-900/70 hover:bg-neutral-900 text-white flex items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                aria-label="Cerrar escáner"
            >
                <i className="fa-solid fa-xmark text-xl"></i>
            </button>

            {/* Scanner container */}
            <div id="qr-reader" className="w-full flex-1" />

            {/* Help text */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center pointer-events-none">
                <p className="text-white text-sm font-medium">Enfoca el código de barras del libro</p>
            </div>

            {/* Error message */}
            {error && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-900/90 z-30 pointer-events-auto">
                    <i className="fa-solid fa-circle-exclamation text-4xl text-white mb-4"></i>
                    <p className="text-white text-lg font-semibold mb-2">Error del escáner</p>
                    <p className="text-neutral-300 text-sm max-w-xs text-center mb-6">{error}</p>
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
                    >
                        Cerrar
                    </button>
                </div>
            )}
        </div>
    );
};

export default BarcodeScanner;
