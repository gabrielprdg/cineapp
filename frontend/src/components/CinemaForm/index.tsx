import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";
import { api } from "../../../services/api";

export default function CinemaForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    name: "",
    city: "",
    state: "",
  });

  useEffect(() => {
    if (isEdit) {
      api.get(`/cinema/${id}`)
        .then(res => setFormData(res.data))
        .catch(() => toast.error("Erro ao carregar o cinema"));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await api.put(`/cinema/${id}`, formData);
        toast.success("Cinema atualizado com sucesso!");
      } else {
        await api.post("/cinema", formData);
        toast.success("Cinema cadastrado com sucesso!");
      }
      navigate("/cinemas");
    } catch {
      toast.error("Erro ao salvar o cinema");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">{isEdit ? "Editar Cinema" : "Cadastrar Cinema"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { name: "name", label: "Nome" },
          { name: "city", label: "Cidade" },
          { name: "state", label: "Estado" },
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
