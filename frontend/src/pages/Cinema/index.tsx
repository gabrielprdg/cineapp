import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../services/api";
import CinemaTable from "../../components/CinemaTable";

export default function Cinema() {
  const [cinemas, setCinemas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCinemas = async () => {
      try {
        const response = await api.get("/cinemas"); // sem headers
        setCinemas(response.data);
      } catch (error) {
        console.error("Erro ao buscar cinemas:", error);
      }
    };

    fetchCinemas();
  }, []);


  const handleCreateCinema = () => navigate('/CreateCinema');
  const handleBackToHome = () => navigate('/');

  return (
    <div className="p-8 pr-12">
      <div className="items-top flex justify-between items-center">
        <h1 className="text-4xl font-semibold text-gray-800">Cinemas</h1>
        <button
          onClick={handleCreateCinema}
          className="mr-12 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          +
        </button>
      </div>

      <CinemaTable cinemas={cinemas} />
    </div>
  );
}
