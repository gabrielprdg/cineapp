import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../services/api";
import MovieTable from "../../components/MovieTable";
import { toast } from "react-toastify";

type Movie = {
  id: string;
  gender: string;
  name: string;
  duration: number;
  classification: string;
  release_date: string;
  synopsis: string;
};

export default function Movie() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await api.get("/movies");
        setMovies(response.data);
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
      }
    };

    fetchMovies();
  }, []);

  const handleCreateMovie = () => {
    navigate("/CreateMovie");
  };

  const handleRequestDelete = (id: string) => {
    setSelectedMovieId(id);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedMovieId) return;
    try {
      await api.delete(`/movie/${selectedMovieId}`);
      // filtragem com filmes existentes
      setMovies(prev => prev.filter(m => m.id !== selectedMovieId));
      toast.success("Filme deletado com sucesso!");
    } catch (error) {
      toast.error("Erro ao deletar filme, possívelmente vinculado a uma sessão");
    } finally {
      setShowModal(false);
      setSelectedMovieId(null);
    }
  };

  return (
    <div className="p-8 pr-12">
      <div className="flex justify-between items-center">
        <h1 className="m-12 text-4xl font-semibold text-gray-800">Filmes</h1>
        <button
          onClick={handleCreateMovie}
          className="mr-12 px-4 cursor-pointer py-2 cursor-pointer bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          +
        </button>
      </div>

      <MovieTable movies={movies} onDelete={handleRequestDelete} />

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Confirmar exclusão</h2>
            <p className="text-gray-600 mb-6">Tem certeza que deseja excluir este filme?</p>
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
