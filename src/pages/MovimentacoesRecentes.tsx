import React, { useState } from 'react';
import {
  LayoutDashboard,
  FileText,
  History,
  Briefcase,
  Settings,
  LogOut,
  Menu,
  Filter,
  Download,
  Search,
  ArrowUpRight,
  ArrowDownLeft,
  Calendar
} from 'lucide-react';
import { Link } from 'react-router-dom'; // Importando o Link para navegação
import Logo from '../assets/logo.png';

const movimentacoesData = [
  {
    data: '2024-03-15',
    tipo: 'entrada',
    descricao: 'Pagamento Cliente XYZ',
    categoria: 'Vendas',
    valor: 15000,
    status: 'Concluído'
  },
  {
    data: '2024-03-14',
    tipo: 'saida',
    descricao: 'Folha de Pagamento',
    categoria: 'RH',
    valor: 28000,
    status: 'Concluído'
  },
];

const Sidebar: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

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
            { icon: History, label: 'Movimentações', to: '/movimentacoesrecentes', active: true },
            { icon: Briefcase, label: 'Criptomoedas', to: '/Criptomoedas' },
            { icon: Settings, label: 'Configurações', to: '/configuracoes' },
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
              <item.icon className={`h-5 w-5 ${!sidebarOpen ? 'mx-auto' : ''}`} />
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
          <h1 className="text-2xl font-bold">Movimentações Recentes</h1>
        </header>
        <main className="p-8">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                                    <Filter className="h-4 w-4" />
                                    <span>Filtrar</span>
                                  </button>
                                  <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                                    <Download className="h-4 w-4" />
                                    <span>Exportar</span>
                                  </button>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <select className="border-gray-300 rounded-md">
                      <option>Hoje</option>
                      <option>Última semana</option>
                      <option>Último mês</option>
                      <option>Personalizado</option>
                    </select>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Buscar movimentação..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Data
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tipo
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Descrição
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Categoria
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Valor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {movimentacoesData.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(item.data)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {item.tipo === 'entrada' ? (
                              <ArrowUpRight className="h-5 w-5 text-green-500 mr-2" />
                            ) : (
                              <ArrowDownLeft className="h-5 w-5 text-red-500 mr-2" />
                            )}
                            <span className={`text-sm ${item.tipo === 'entrada' ? 'text-green-600' : 'text-red-600'}`}>
                              {item.tipo === 'entrada' ? 'Entrada' : 'Saída'}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.descricao}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.categoria}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <span className={item.tipo === 'entrada' ? 'text-green-600' : 'text-red-600'}>
                            {item.tipo === 'entrada' ? '+' : '-'} {formatCurrency(item.valor)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Sidebar;
