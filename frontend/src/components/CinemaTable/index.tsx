import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Cinema = {
  id: string;
  name: string;
  city: string;
  state: string;
};

type Props = {
  cinemas: Cinema[];
  onDelete: (id: string) => void;
};

export default function CinemasTable({ cinemas, onDelete }: Props) {
  const navigate = useNavigate();

  const handleEdit = (id: string) => {
    navigate(`/cinema/edit/${id}`);
  };

  return (
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
          {cinemas.map((cinema) => (
            <tr key={cinema.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-3 font-medium">{cinema.name}</td>
              <td className="px-6 py-3">{cinema.city}</td>
              <td className="px-6 py-3">{cinema.state}</td>
              <td className="px-6 py-3 text-center flex justify-center gap-4">
                <button
                  onClick={() => handleEdit(cinema.id)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <Pencil size={18} />
                </button>
                <button
                  onClick={() => onDelete(cinema.id)}
                  className="text-red-500 hover:text-red-700"
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
