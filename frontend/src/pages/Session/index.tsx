import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../services/api";
import SessionTable from "../../components/SessionTable";
import { toast } from "react-toastify";

export type Session = {
  id: string;
  movie_id: string;
  cinema_id: string;
  day_of_week: string;
  date: string;
};

export default function Session() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await api.get("/sessions");
        setSessions(response.data);
      } catch (error) {
        console.error("Erro ao buscar sessões:", error);
      }
    };

    fetchSessions();
  }, []);

  const handleCreateSession = () => {
    navigate("/CreateSession");
  };

  const handleRequestDelete = (id: string) => {
    setSelectedSessionId(id);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedSessionId) return;
    try {
      await api.delete(`/session/${selectedSessionId}`);
      setSessions(prev => prev.filter(s => s.id !== selectedSessionId));
      toast.success("Sessão deletada com sucesso!");
    } catch (error) {
      toast.error("Erro ao deletar sessão");
    } finally {
      setShowModal(false);
      setSelectedSessionId(null);
    }
  };

  return (
    <div className="p-8 pr-12">
      <div className="flex justify-between items-center">
        <h1 className="m-12 text-4xl font-semibold text-gray-800">Gerenciar Sessões</h1>
        <button
          onClick={handleCreateSession}
          className="mr-12 px-4 py-2 cursor-pointer bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          +
        </button>
      </div>

      <SessionTable sessions={sessions} onDelete={handleRequestDelete} />

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Confirmar exclusão</h2>
            <p className="text-gray-600 mb-6">Tem certeza que deseja excluir esta sessão?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 cursor-pointer bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 cursor-pointer bg-red-500 text-white rounded-md hover:bg-red-600"
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
