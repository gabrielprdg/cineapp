import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../../services/api";

type Props = {
  sessions: any[];
};

type Movie = {
  id: number;
  name: string;
};

const organizeSessions = (sessions: any[]) => {
  const daysOfWeek = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
  const sessionsByTime: Record<string, Record<string, any[]>> = {};

  sessions.forEach(session => {
    const time = new Date(session.date).toISOString().substring(11, 16); // HH:MM
    const day = session.day_of_week;

    if (!sessionsByTime[time]) {
      sessionsByTime[time] = {};
    }

    if (!sessionsByTime[time][day]) {
      sessionsByTime[time][day] = [];
    }

    sessionsByTime[time][day].push(session);
  });

  return { sessionsByTime, daysOfWeek };
};

export default function Table({ sessions }: Props) {
  const [moviesMap, setMoviesMap] = useState<Record<number, string>>({});

  useEffect(() => {
    api.get("movies").then(res => {
      const map: Record<number, string> = {};
      res.data.forEach((movie: Movie) => {
        map[movie.id] = movie.name;
      });
      setMoviesMap(map);
    });
  }, []);

  // Enriquecer sessões com o nome do filme
  const enrichedSessions = sessions.map(session => ({
    ...session,
    name: moviesMap[session.movie_id] || "Filme desconhecido",
  }));

  const { sessionsByTime, daysOfWeek } = organizeSessions(enrichedSessions);
  const times = Object.keys(sessionsByTime).sort();

  return (
    <div className="overflow-x-auto mt-8 p-4">
      <table className="min-w-full text-sm bg-white shadow-lg rounded-lg overflow-hidden border-separate border-spacing-0">
        <thead className="bg-gradient-to-r from-[#101828] to-[#1f2937] text-white">
          <tr>
            <th className="px-6 py-3 text-left sticky left-0 z-10">Horário</th>
            {daysOfWeek.map(day => (
              <th key={day} className="px-6 py-3 text-center capitalize">{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {times.map(time => (
            <tr key={time} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-3 font-semibold text-center bg-gray-100 sticky left-0 z-0">
                {time}
              </td>
              {daysOfWeek.map(day => (
                <td key={day} className="px-6 py-3 text-center">
                  {sessionsByTime[time][day]?.map((session, index) => (
                    <div key={index} className="mb-2 text-blue-600 font-medium">
                      🎬 {session.name}
                    </div>
                  )) || (
                      <span className="text-gray-500">-</span>
                    )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
