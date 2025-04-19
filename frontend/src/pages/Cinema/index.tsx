import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../services/api";

export default function Cinema() {
  const [status, setStatus] = useState("");
  const [tasks, setTasks] = useState<any[]>([]);
  const navigate = useNavigate();

  const handleTaskDelete = (deletedTaskId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== deletedTaskId));
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("user-token");

        const response = await api.get(status ? `task/${status}` : "task", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setTasks(response.data);
      } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
      }
    };

    fetchTasks();
  }, [status]);

  const handleCreateCinema = () => {
    navigate('/CreateCinema');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="p-8 pr-12">
      <div className="flex justify-between items-center">
        <h1 className="m-12 text-4xl font-semibold text-gray-800">Cinema</h1>
        <button
          onClick={handleCreateCinema}
          className="mr-12 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          +
        </button>
      </div>
    </div>
  );
}
