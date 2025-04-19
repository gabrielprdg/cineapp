import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../services/api";
import MovieTable from "../../components/MovieTable";


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

  const handleBackToHome = () => {
    navigate("/");
  };

  const handleDeleteMovie = async (id: string) => {
    try {
      await api.delete(`/movies/${id}`);
      setMovies(prev => prev.filter(m => m.id !== id));
    } catch (error) {
      console.error("Erro ao deletar filme:", error);
    }
  };

  return (
    <div className="p-8 pr-12">
      <div className="flex justify-between items-center">
        <h1 className="m-12 text-4xl font-semibold text-gray-800">Filmes</h1>
        <button
          onClick={handleCreateMovie}
          className="mr-12 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          +
        </button>
      </div>

      <MovieTable movies={movies} onDelete={handleDeleteMovie} />
    </div>
  );
}
