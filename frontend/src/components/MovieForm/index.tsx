import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../../services/api";

export default function MovieForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    duration: "",
    classification: "",
    release_date: "",
    synopsis: "",
  });

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await api.get(`/movie/${id}`);
        const data = res.data;
        const release_date = data.release_date?.split("T")[0] || "";
        setFormData({ ...data, release_date });
      } catch (error) {
        toast.error("Erro ao carregar o filme");
      }
    };

    if (isEdit) {
      fetchMovie();
    }
  }, [id, isEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await api.put(`/movie/${id}`, formData);
        toast.success("Filme atualizado com sucesso!");
      } else {
        // Se o backend exige releaseDate (camelCase), converte só nesse momento
        const { release_date, ...rest } = formData;
        await api.post("/movie", {
          ...rest,
          releaseDate: release_date,
        });
        toast.success("Filme criado com sucesso!");
      }
      navigate("/movies");
    } catch {
      toast.error("Erro ao salvar o filme");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        {isEdit ? "Editar Filme" : "Cadastrar Filme"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-3 w-full border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gênero</label>
          <input
            type="text"
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="mt-1 p-3 w-full border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duração</label>
          <input
            type="text"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="mt-1 p-3 w-full border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="classification" className="block text-sm font-medium text-gray-700">Classificação</label>
          <input
            type="text"
            id="classification"
            name="classification"
            value={formData.classification}
            onChange={handleChange}
            className="mt-1 p-3 w-full border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="release_date" className="block text-sm font-medium text-gray-700">Data de Lançamento</label>
          <input
            type="date"
            id="release_date"
            name="release_date"
            value={formData.release_date}
            onChange={handleChange}
            className="mt-1 p-3 w-full border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="synopsis" className="block text-sm font-medium text-gray-700">Sinopse</label>
          <textarea
            id="synopsis"
            name="synopsis"
            value={formData.synopsis}
            onChange={handleChange}
            className="mt-1 p-3 w-full border border-gray-300 rounded-md"
          />
        </div>

        <button type="submit" className="w-full cursor-pointer py-3 bg-blue-500 text-white rounded-md">
          {isEdit ? "Atualizar" : "Cadastrar"}
        </button>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mt-4 w-full cursor-pointer py-3 bg-red-500 text-white rounded-md"
        >
          Voltar
        </button>
      </form>
    </div>
  );
}
