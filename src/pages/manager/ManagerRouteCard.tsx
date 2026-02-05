interface Props {
    route: {
        id: number;
        departureCity: string;
        arrivalCity: string;
        departureTime: string;
        arrivalTime: string;
        duration: number;
        amenities: string[];
    };
}

const ManagerRouteCard = ({ route }: Props) => {
    return (
        <div className="border rounded-lg p-4 shadow-sm bg-white">
            <h2 className="text-lg font-semibold mb-2">
                {route.departureCity} → {route.arrivalCity}
            </h2>

            <p className="text-sm text-gray-600">
                Départ : {new Date(route.departureTime).toLocaleString()}
            </p>

            <p className="text-sm text-gray-600">
                Arrivée : {new Date(route.arrivalTime).toLocaleString()}
            </p>

            <p className="text-sm mt-2">
                ⏱️ {route.duration} min
            </p>

            {route.amenities.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                    {route.amenities.map((a, i) => (
                        <span
                            key={i}
                            className="px-2 py-1 bg-gray-100 text-xs rounded"
                        >
              {a}
            </span>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ManagerRouteCard;
