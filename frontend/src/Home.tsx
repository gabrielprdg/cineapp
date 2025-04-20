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

      </div>

      <Table sessions={sessions} />
    </div>
  );
}
