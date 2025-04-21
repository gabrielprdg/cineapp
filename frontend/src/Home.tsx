import { useEffect, useState } from "react";
import { api } from "../services/api";
import Table from "./components/Table";
import { Session } from "./pages/Session";

export default function Home() {
  const [sessions, setSessions] = useState<Session[]>([]);

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

  return (
    <div className="p-8 pr-12">
      <div className="flex justify-between items-end">
        <h2 className="ml-8 mt-12 text-4xl font-semibold text-gray-800">Sessões Disponíveis</h2>

      </div>

      <Table sessions={sessions} />
    </div>
  );
}
