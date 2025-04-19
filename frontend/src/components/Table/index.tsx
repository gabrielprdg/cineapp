import { useState } from "react";
import { api } from "../../../services/api";
import { useNavigate } from "react-router-dom";

type ScheduleTableProps = {
  sessions: Session[];
};

interface Session {
  id: string;
  movieTitle: string;
  dayOfWeek: string; // "segunda", "terça", ...
  time: string;      // "14:00", "16:00", ...
  cinemaId: string;
}

const weekDays = ["segunda", "terça", "quarta", "quinta", "sexta", "sábado", "domingo"];

export default function Table({ sessions }: ScheduleTableProps) {
  const [showModal, setShowModal] = useState(false);
  const [sessionIdToDelete, setSessionIdToDelete] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleEdit = (id: string) => {
    navigate(`/updateSession/${id}`);
  };

  const handleDelete = async () => {
    if (!sessionIdToDelete) return;

    try {
      const token = localStorage.getItem("user-token");
      await api.delete(`/session/${sessionIdToDelete}`, {
        headers: { authorization: `Bearer ${token}` },
      });


      setShowModal(false);
      setSessionIdToDelete(null);
    } catch (error) {
      console.error("Erro ao excluir a sessão:", error);
    }
  };

  const openModal = (sessionId: string) => {
    setSessionIdToDelete(sessionId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSessionIdToDelete(null);
  };

  // Coletar todos os horários únicos (para as linhas)
  const times = Array.from(new Set(sessions.map((s) => s.time))).sort();

  return (
    <div className="mx-auto p-4">
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full bg-white border">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Horário</th>
              {weekDays.map((day) => (
                <th key={day} className="py-3 px-4 text-left capitalize">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {times.map((time) => (
              <tr key={time} className="border-t">
                <td className="py-3 px-4 font-semibold">{time}</td>
                {weekDays.map((day) => {
                  const session = sessions.find(s => s.time === time && s.dayOfWeek === day);
                  return (
                    <td key={day} className="py-3 px-4">
                      {session ? (
                        <div className="flex flex-col gap-1">
                          <span>{session.movieTitle}</span>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(session.id)}
                              className="text-blue-600 text-sm hover:underline"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => openModal(session.id)}
                              className="text-red-600 text-sm hover:underline"
                            >
                              Excluir
                            </button>
                          </div>
                        </div>
                      ) : (
                        "-"
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-semibold text-gray-800">Confirmar Exclusão</h2>
            <p className="mt-4 text-gray-600">Tem certeza que deseja excluir esta sessão?</p>
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
