import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Session = {
  id: string;
  movie_id: string;
  cinema_id: string;
  day_of_week: string;
  date: string;
};

type Props = {
  sessions: Session[];
  onDelete: (id: string) => void;
};

export default function SessionTable({ sessions, onDelete }: Props) {
  const navigate = useNavigate();

  const handleEdit = (id: string) => {
    navigate(`/session/${id}`);
  };

  return (
    <div className="overflow-x-auto mt-8 p-4">
      <table className="min-w-full text-sm bg-white shadow-lg rounded-lg overflow-hidden border-separate border-spacing-0">
        <thead className="bg-gradient-to-r from-[#101828] to-[#1f2937] text-white">
          <tr>
            <th className="px-6 py-3 text-left">Filme</th>
            <th className="px-6 py-3 text-left">Cinema</th>
            <th className="px-6 py-3 text-left">Dia da Semana</th>
            <th className="px-6 py-3 text-left">Horário</th>
            <th className="px-6 py-3 text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((session) => (
            <tr key={session.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-3 font-medium">{session.movie_id}</td>
              <td className="px-6 py-3">{session.cinema_id}</td>
              <td className="px-6 py-3">{session.day_of_week}</td>
              <td className="px-6 py-3">
                {(() => {
                  const d = new Date(session.date);
                  const data = d.toLocaleDateString("pt-BR");
                  const hora = d.toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  });
                  return `${data} ${hora}`;
                })()}
              </td>

              <td className="px-6 py-3 text-center flex justify-center gap-4">
                <button
                  onClick={() => handleEdit(session.id)}
                  className="text-blue-500 cursor-pointer hover:text-blue-700"
                >
                  <Pencil size={18} />
                </button>
                <button
                  onClick={() => onDelete(session.id)}
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
  );
}
