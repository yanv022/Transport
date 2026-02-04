import { useParams } from 'react-router-dom';

const ManageSchedulesPage = () => {
    const { routeId } = useParams();

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">
                Gestion des horaires
            </h1>

            <p className="mt-4 text-gray-600">
                Route ID : {routeId}
            </p>

            <p className="mt-2">
                (Les horaires seront affichés ici)
            </p>
        </div>
    );
};

export default ManageSchedulesPage;
