import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../services/api";
import { ArrowLeft } from 'lucide-react'
import MovieCard from "../../components/MovieCard";
import Sidebar from "../../components/SideBar";

export default function Movie() {
  const [status, setStatus] = useState("");
  const [tasks, setTasks] = useState<any[]>([]);
  const navigate = useNavigate();

  const handleTaskDelete = (deletedTaskId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== deletedTaskId)); // Remover a tarefa deletada do estado
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
        console.log('tasksss', response)
        setTasks(response.data);
      } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
      }
    };

    fetchTasks();
  }, [status]);

  const handleCreateMovie = () => {
    navigate('/createMovies');
  };

  return (
    <div className="p-8 pr-12">


      <div className="items-top flex justify-between items-anchor-center">
        <h1 className="text-4xl font-semibold text-gray-800">Filmes</h1>

        <div className="mr-[6rem] flex">
          <button
            onClick={handleCreateMovie}
            className="cursor-pointer ml-12 mr-12 mt-6 px-4 py-2 bg-blue-500 text-white rounded-md h-10">
            +
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
        {tasks.map(task => (
          <MovieCard
            key={task.id}
            title={task.title}
            description={task.description}
            genre={task.genre}
            year={task.year}
            imageUrl={task.imageUrl}
          />
        ))}
      </div>


    </div>
  );
}
