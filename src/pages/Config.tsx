import React, { useState } from 'react';
import {
  LayoutDashboard,
  FileText,
  History,
  Briefcase,
  Settings,
  LogOut,
  Menu,
} from 'lucide-react';
import { Link } from 'react-router-dom'; // Importando Link para navegação
import Logo from '../assets/logo.png';

const Sidebar: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-white shadow-sm transition-all duration-300 ease-in-out flex flex-col fixed h-full`}
      >
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={sidebarOpen ? Logo : '/src/assets/logo2.png'}
              alt="Logo"
              className={`h-auto w-auto ${!sidebarOpen ? 'h-16' : ''}`}
            />
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 rounded-lg hover:bg-gray-100"
          >
            <Menu className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 mt-4">
          {[ 
            { icon: LayoutDashboard, label: 'Dashboard', to: '/dashboard' },
            { icon: FileText, label: 'Balancetes', to: '/balancetes' },
            { icon: History, label: 'Movimentações', to: '/movimentacoesrecentes' }, 
            { icon: Briefcase, label: 'Criptomoedas', to: '/Criptomoedas' },
            { icon: Settings, label: 'Configurações', to: '/configuracoes' , active: true},
          ].map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className={`w-full flex items-center px-4 py-3 ${
                item.active
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon
                className={`h-5 w-5 ${!sidebarOpen ? 'mx-auto' : ''}`}
              />
              {sidebarOpen && (
                <span className="ml-3 font-medium">{item.label}</span>
              )}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t">
          <button
            className={`w-full flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg ${
              !sidebarOpen ? 'justify-center' : ''
            }`}
          >
            <LogOut className="h-5 w-5" />
            {sidebarOpen && <span className="ml-3 font-medium">Sair</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}
      >
        <header className="bg-white shadow p-4">
          <h1 className="text-2xl font-bold">Em processo de criação...</h1>
        </header>
        <main className="p-4">
          <p></p>
        </main>
      </div>
    </div>
  );
};

export default Sidebar;
