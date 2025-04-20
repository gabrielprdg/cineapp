import { Home, Film, Calendar, Building, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("sidebar-expanded", isExpanded);
  }, [isExpanded]);

  return (
    <aside
      className="h-screen w-20 bg-gray-900 text-white flex flex-col shadow-lg fixed left-0 top-0 transition-all duration-300 ease-in-out z-50 hover:w-64"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="p-6 flex items-center justify-center group-hover:justify-start transition-all duration-300">
        <span className="text-xl font-bold whitespace-nowrap hidden group-hover:block">
          🎬 CineAdmin
        </span>
        <span className="text-2xl group-hover:hidden">🎬</span>
      </div>

      <nav className="flex-1 p-2 space-y-1">
        <SidebarItem
          icon={<Home />}
          label="Início"
          onClick={() => navigate("/")}
          isExpanded={isExpanded}
        />
        <SidebarItem
          icon={<Calendar />}
          label="Sessões"
          onClick={() => navigate("/sessions")}
          isExpanded={isExpanded}
        />
        <SidebarItem
          icon={<Film />}
          label="Filmes"
          onClick={() => navigate("/movies")}
          isExpanded={isExpanded}
        />
        <SidebarItem
          icon={<Building />}
          label="Cinemas"
          onClick={() => navigate("/cinemas")}
          isExpanded={isExpanded}
        />
      </nav>

      <div className="p-2 border-t border-gray-700">
        <SidebarItem
          icon={<LogOut />}
          label="Sair"
          onClick={() => console.log("Logout")}
          isExpanded={isExpanded}
        />
      </div>
    </aside>
  );
}

type SidebarItemProps = {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  isExpanded: boolean;
};

function SidebarItem({ icon, label, onClick, isExpanded }: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center cursor-pointer w-full px-4 py-3 rounded-md hover:bg-gray-800 transition-all"
    >
      <span className="mr-3">{icon}</span>
      <span
        className={`text-sm font-medium transition-all duration-300 ease-in-out ${isExpanded ? "block" : "hidden"
          }`}
      >
        {label}
      </span>
    </button>
  );
}
