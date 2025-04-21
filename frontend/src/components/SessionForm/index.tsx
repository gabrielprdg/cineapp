import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../../services/api";
import { toast } from "react-toastify";

type Movie = { id: string; name: string };
type Cinema = { id: string; name: string };

export default function SessionForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    movie_id: "",
    cinema_id: "",
    day_of_week: "",
    date: "",
  });

  const [movies, setMovies] = useState<Movie[]>([]);
  const [cinemas, setCinemas] = useState<Cinema[]>([]);

  useEffect(() => {
    api.get("/movies")
      .then(res => setMovies(res.data))
      .catch(() => toast.error("Erro ao buscar filmes"));

    api.get("/cinemas")
      .then(res => setCinemas(res.data))
      .catch(() => toast.error("Erro ao buscar cinemas"));

    if (isEdit) {
      api.get(`/session/${id}`)
        .then(res => {
          const sessionData = res.data;
          const dateObj = new Date(sessionData.date);
          const hours = String(dateObj.getHours()).padStart(2, "0");
          const minutes = String(dateObj.getMinutes()).padStart(2, "0");
          const formattedTime = `${hours}:${minutes}`;

          setFormData({
            ...sessionData,
            date: formattedTime,
          });
        })
        .catch(() => toast.error("Erro ao carregar sessão"));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const [hour, minute] = formData.date.split(":").map(Number);
      const now = new Date();
      const dateWithTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        hour,
        minute,
        0
      );

      const offsetMs = dateWithTime.getTimezoneOffset() * 60000;
      const localDate = new Date(dateWithTime.getTime() - offsetMs);

      const payload = {
        ...formData,
        date: localDate.toISOString(),
      };

      if (isEdit) {
        await api.put(`/session/${id}`, payload);
        toast.success("Sessão atualizada com sucesso!");
      } else {
        await api.post("/session", payload);
        toast.success("Sessão cadastrada com sucesso!");
      }

      navigate(-1);
    } catch {
      toast.error("Erro ao salvar sessão");
    }
  };

  return (
    <div className="mt-12 max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">{isEdit ? "Editar Sessão" : "Cadastrar Sessão"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Filme</label>
          <select
            name="movie_id"
            value={formData.movie_id}
            onChange={handleChange}
            className="mt-1 p-3 w-full border border-gray-300 rounded-md"
          >
            <option value="">Selecione um filme</option>
            {movies.map(movie => (
              <option key={movie.id} value={movie.id}>{movie.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Cinema</label>
          <select
            name="cinema_id"
            value={formData.cinema_id}
            onChange={handleChange}
            className="mt-1 p-3 w-full border border-gray-300 rounded-md"
          >
            <option value="">Selecione um cinema</option>
            {cinemas.map(cinema => (
              <option key={cinema.id} value={cinema.id}>{cinema.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Dia da Semana</label>
          <select
            name="day_of_week"
            value={formData.day_of_week}
            onChange={handleChange}
            className="mt-1 p-3 w-full border border-gray-300 rounded-md"
          >
            <option value="">Selecione o dia</option>
            <option value="Domingo">Domingo</option>
            <option value="Segunda">Segunda</option>
            <option value="Terça">Terça</option>
            <option value="Quarta">Quarta</option>
            <option value="Quinta">Quinta</option>
            <option value="Sexta">Sexta</option>
            <option value="Sábado">Sábado</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Horário</label>
          <input
            type="time"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="mt-1 p-3 w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        <button type="submit" className="w-full cursor-pointer py-3 bg-blue-500 text-white rounded-md">
          {isEdit ? "Atualizar" : "Cadastrar"}
        </button>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mt-4 cursor-pointer w-full py-3 bg-red-500 text-white rounded-md"
        >
          Voltar
        </button>
      </form>
    </div>
  );
}
