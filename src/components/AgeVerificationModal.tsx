import { useEffect, useState } from "react";

export default function AgeVerificationModal() {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const isConfirmed = sessionStorage.getItem("isAdultConfirmed");
        if (!isConfirmed) {
            setShowModal(true);
        }
    }, []);

    const handleAccept = () => {
        sessionStorage.setItem("isAdultConfirmed", "true");
        setShowModal(false);
    };

    const handleReject = () => {
        window.location.href = "https://www.google.com";
    };

    if (!showModal) return null;

    return (
        <div className="modal d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.8)", backdropFilter: "blur(8px)" }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content p-4">
                    <h5 className="modal-title">Aviso de edad</h5>
                    <p>
                        Este sitio contiene contenido no apto para menores de 18 años. Solo puedes acceder si afirmás ser mayor de edad.
                    </p>
                    <div className="d-flex justify-content-between">
                        <button className="btn btn-danger" onClick={handleReject}>
                            No tengo 18 años
                        </button>
                        <button className="btn btn-success" onClick={handleAccept}>
                            Soy mayor de 18 años
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
