import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import { api } from "../../../services/api";
import { toast } from "react-toastify";

type Cinema = {
  id: string;
  name: string;
  city: string;
  state: string;
};


export default function Cinema() {
  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const [selectedCinemaId, setSelectedCinemaId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCinemas();
  }, []);

  const fetchCinemas = async () => {
    try {
      const response = await api.get("/cinemas");
      setCinemas(response.data);
    } catch (error) {
      console.error("Erro ao buscar cinemas:", error);
    }
  };

  const handleCreateCinema = () => navigate('/CreateCinema');

  const handleDeleteClick = (id: string) => {
    setSelectedCinemaId(id);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedCinemaId) return;

    try {
      await api.delete(`/cinema/${selectedCinemaId}`);
      setCinemas(prev => prev.filter(c => c.id !== selectedCinemaId));
      toast.success("Cinema deletado com sucesso!");
    } catch (error) {
      toast.error("Erro ao deletar cinema");
    } finally {
      setShowModal(false);
      setSelectedCinemaId(null);
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/cinema/${id}`);
  };

  return (
    <div className="p-8 pr-12">
      <div className="items-top flex justify-between items-center">
        <h1 className="text-4xl font-semibold text-gray-800">Cinemas</h1>
        <button
          onClick={handleCreateCinema}
          className="create-cinema px-4 cursor-pointer py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          +
        </button>
      </div>

      <div className="overflow-x-auto mt-8 p-4">
        <table className="min-w-full text-sm bg-white shadow-lg rounded-lg overflow-hidden border-separate border-spacing-0">
          <thead className="bg-gradient-to-r from-[#101828] to-[#1f2937] text-white">
            <tr>
              <th className="px-6 py-3 text-left">Nome</th>
              <th className="px-6 py-3 text-left">Cidade</th>
              <th className="px-6 py-3 text-left">Estado</th>
              <th className="px-6 py-3 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {cinemas.map((cinema: any) => (
              <tr key={cinema.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-3 font-medium">{cinema.name}</td>
                <td className="px-6 py-3">{cinema.city}</td>
                <td className="px-6 py-3">{cinema.state}</td>
                <td className="px-6 py-3 text-center flex justify-center gap-4">
                  <button
                    onClick={() => handleEdit(cinema.id)}
                    className="text-blue-500 cursor-pointer hover:text-blue-700"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(cinema.id)}
                    className="text-red-500 cursor-pointer hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Confirmar exclusão</h2>
            <p className="text-gray-600 mb-6">Tem certeza que deseja excluir este cinema?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 cursor-pointer bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 cursor-pointer py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
