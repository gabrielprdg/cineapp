import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import Table from "./components/Table";

export default function Home() {
  const [sessions, setSessions] = useState<any[]>([]);
  const navigate = useNavigate();

  const handleSessionDelete = (deletedSessionId: number) => {
    setSessions(prev => prev.filter(session => session.id !== deletedSessionId));
  };

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await api.get("sessions");
        console.log('response', response)
        setSessions(response.data);
      } catch (error) {
        console.error("Erro ao buscar sessões:", error);
      }
    };

    fetchSessions();
  }, []);

  const handleCreateSession = () => {
    navigate('/createSession');
  };

  return (
    <div className="p-8 pr-12">
      <div className="flex justify-between items-end">
        <h2 className="ml-8 mt-12 text-4xl font-semibold text-gray-800">Sessões Disponíveis</h2>
        <div className="flex gap-4 mr-12 mt-6">
          <button
            onClick={handleCreateSession}
            className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-md h-10"
          >
            +
          </button>
        </div>
      </div>

      <Table sessions={sessions} />
    </div>
  );
}
