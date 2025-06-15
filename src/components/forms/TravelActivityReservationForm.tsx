interface Activity {
    id: number;
    name: string;
    types: "RENTING" | "RESERVATION";
    price: number;
}

interface ActivityReservationData {
    initialDate: string;
    finalDate?: string;
    total_price: number;
}

import { useEffect } from "react";

export function TravelActivityReservationForm({
    activity,
    data,
    setData,
}: {
    activity: Activity;
    data?: ActivityReservationData;
    setData: (data: ActivityReservationData) => void;
}) {
    const isRenting = activity.types === "RENTING";

    const initial = data?.initialDate ? new Date(data.initialDate) : null;
    const final = isRenting && data?.finalDate ? new Date(data.finalDate) : null;

    const days = initial && final ? Math.max(1, Math.ceil((final.getTime() - initial.getTime()) / (1000 * 60 * 60 * 24))) : 1;
    const finalPrice = activity.price * days;

    // Actualizar total_price automáticamente cuando cambian las fechas o actividad.price
    useEffect(() => {
        if (!initial) return;

        setData({
            ...data!,
            total_price: finalPrice,
        });
    }, [data?.initialDate, data?.finalDate, activity.price]);

    return (
        <div className="border p-4 rounded my-4 bg-gray-50">
            <h3>Detalles actividad: {activity.name}</h3>

            <label className="block mt-2 font-semibold">Fecha inicio</label>
            <input
                type="date"
                value={data?.initialDate || ""}
                onChange={(e) => setData({ ...data!, initialDate: e.target.value })}
                className="border p-2 rounded w-full"
                required
            />

            {isRenting && (
                <>
                    <label className="block mt-2 font-semibold">Fecha fin</label>
                    <input
                        type="date"
                        value={data?.finalDate || ""}
                        onChange={(e) => setData({ ...data!, finalDate: e.target.value })}
                        className="border p-2 rounded w-full"
                        required
                    />
                </>
            )}

            {initial && (!isRenting || (isRenting && final)) && (
                <p className="mt-2">
                    Precio total: {finalPrice.toFixed(2)}€ ({days} día{days > 1 ? "s" : ""})
                </p>
            )}
        </div>
    );
}
