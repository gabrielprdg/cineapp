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
    if (isEdit) {
      api.get(`/movies/${id}`)
        .then(res => setFormData(res.data))
        .catch(() => toast.error("Erro ao carregar o filme"));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await api.patch(`/movies/${id}`, formData);
        toast.success("Filme atualizado com sucesso!");
      } else {
        await api.post("/movies", formData);
        toast.success("Filme criado com sucesso!");
      }
      navigate("/movies");
    } catch {
      toast.error("Erro ao salvar o filme");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">{isEdit ? "Editar Filme" : "Cadastrar Filme"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { name: "name", label: "Nome" },
          { name: "gender", label: "Gênero" },
          { name: "duration", label: "Duração" },
          { name: "classification", label: "Classificação" },
          { name: "release_date", label: "Data de Lançamento" },
        ].map(field => (
          <div key={field.name}>
            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">{field.label}</label>
            <input
              type="text"
              id={field.name}
              name={field.name}
              value={(formData as any)[field.name]}
              onChange={handleChange}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md"
            />
          </div>
        ))}
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

        <button type="submit" className="w-full py-3 bg-blue-500 text-white rounded-md">
          {isEdit ? "Atualizar" : "Cadastrar"}
        </button>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mt-4 w-full py-3 bg-red-500 text-white rounded-md"
        >
          Voltar
        </button>
      </form>
    </div>
  );
}
