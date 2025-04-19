import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Movie = {
  id: string;
  gender: string;
  name: string;
  duration: number;
  classification: string;
  release_date: string;
  synopsis: string;
};

type Props = {
  movies: Movie[];
  onDelete: (id: string) => void;
};

export default function MovieTable({ movies, onDelete }: Props) {
  const navigate = useNavigate();

  const handleEdit = (id: string) => {
    navigate(`/movie/edit/${id}`);
  };

  return (
    <div className="overflow-x-auto mt-8 p-4">
      <table className="min-w-full text-sm bg-white shadow-lg rounded-lg overflow-hidden border-separate border-spacing-0">
        <thead className="bg-gradient-to-r from-[#101828] to-[#1f2937] text-white">
          <tr>
            <th className="px-6 py-3 text-left">Nome</th>
            <th className="px-6 py-3 text-left">Gênero</th>
            <th className="px-6 py-3 text-left">Duração (min)</th>
            <th className="px-6 py-3 text-left">Classificação</th>
            <th className="px-6 py-3 text-left">Data de Lançamento</th>
            <th className="px-6 py-3 text-left">Sinopse</th>
            <th className="px-6 py-3 text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-3 font-medium">{movie.name}</td>
              <td className="px-6 py-3">{movie.gender}</td>
              <td className="px-6 py-3">{movie.duration}</td>
              <td className="px-6 py-3">{movie.classification}</td>
              <td className="px-6 py-3">{new Date(movie.release_date).toLocaleDateString()}</td>
              <td className="px-6 py-3 max-w-xs truncate" title={movie.synopsis}>
                {movie.synopsis}
              </td>
              <td className="px-6 py-3 text-center flex justify-center gap-4">
                <button
                  onClick={() => handleEdit(movie.id)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <Pencil size={18} />
                </button>
                <button
                  onClick={() => onDelete(movie.id)}
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
