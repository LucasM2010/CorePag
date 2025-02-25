import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  History,
  Briefcase,
  Settings,
  LogOut,
  Menu,
  Download,
  Filter,
  Wallet,
  ChevronDown,
  Users,
  UserPlus,
  CreditCard,
} from 'lucide-react';
import Logo from '../assets/logo.png';

const balanceteData = [
  {
    periodo: 'Março 2024',
    ativoTotal: 1250000,
    passivoTotal: 850000,
    patrimonioLiquido: 400000,
    resultado: 75000,
    status: 'Fechado',
  },
  {
    periodo: 'Fevereiro 2024',
    ativoTotal: 1200000,
    passivoTotal: 820000,
    patrimonioLiquido: 380000,
    resultado: 70000,
    status: 'Fechado',
  },
];

const Balancetes: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [bankingMenuOpen, setBankingMenuOpen] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    role: '',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  });
  const navigate = useNavigate();

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      setUserData(prevState => ({
        ...prevState,
        name: user.name || 'Usuário',
        email: user.email || '',
        role: user.role || 'Usuário',
        company: user.company || ''
      }));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const location = useLocation();

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

        <nav className="flex-1 mt-4">
          {/* Banking Section with Submenu */}
          <div className="px-4">
            <button
              onClick={() => sidebarOpen && setBankingMenuOpen(!bankingMenuOpen)}
              className="w-full flex items-center justify-between px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
            >
              <div className="flex items-center">
                <Wallet className={`h-5 w-5 ${!sidebarOpen ? 'mx-auto' : ''}`} />
                {sidebarOpen && <span className="ml-3 font-medium">Banking</span>}
              </div>
              {sidebarOpen && (
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    bankingMenuOpen ? 'transform rotate-180' : ''
                  }`}
                />
              )}
            </button>

            {/* Banking Submenu */}
            {sidebarOpen && bankingMenuOpen && (
              <div className="ml-4 mt-2 space-y-1">
                {[
                  { icon: LayoutDashboard, label: 'Dashboard', to: '/dashboard' },
                  { icon: FileText, label: 'Balancetes', to: '/balancetes', active: true },
                  { icon: History, label: 'Movimentações', to: '/movimentacoesrecentes' },
                  { icon: Briefcase, label: 'Link de Indicação', to: '/linkdeindicacao' },
                ].map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleNavigation(item.to)}
                    className={`w-full flex items-center px-4 py-2 ${
                      item.active
                        ? 'bg-indigo-50 text-indigo-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    } rounded-lg`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="ml-3 text-sm">{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

{/* Update the Afiliados button */}
<div className="px-4 mt-4">
  <button
    onClick={() => handleNavigation('/afiliados')}
    className={`w-full flex items-center px-4 py-2 rounded-lg ${
      location.pathname === '/afiliados'
        ? 'bg-indigo-50 text-indigo-600'
        : 'text-gray-600 hover:bg-gray-50'
    }`}
  >
    <Users className={`h-5 w-5 ${!sidebarOpen ? 'mx-auto' : ''}`} />
    {sidebarOpen && <span className="ml-3 font-medium">Afiliados</span>}
  </button>
</div>

<div className="px-4 mt-4">
            <button
              onClick={() => handleNavigation('/users')}
              className={`w-full flex items-center px-4 py-2 rounded-lg ${
                location.pathname === '/users'
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <UserPlus className={`h-5 w-5 ${!sidebarOpen ? 'mx-auto' : ''}`} />
              {sidebarOpen && <span className="ml-3 font-medium">Usuários</span>}
            </button>
          </div>

          {/* Payments section */}
<div className="px-4 mt-4">
            <button
              onClick={() => navigate('/payments')}
              className={`w-full flex items-center px-4 py-2 rounded-lg ${
                location.pathname === '/payments'
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <CreditCard className={`h-5 w-5 ${!sidebarOpen ? 'mx-auto' : ''}`} />
              {sidebarOpen && <span className="ml-3 font-medium">Payments</span>}
            </button>
          </div>

{/* Update the Settings button */}
<div className="px-4 py-2 mt-6">
  {[
    { icon: Settings, label: 'Configurações', to: '/configuracoes' },
  ].map((item, index) => (
    <button
      key={index}
      onClick={() => handleNavigation(item.to)}
      className={`w-full flex items-center px-4 py-2 mt-1 rounded-lg ${
        location.pathname === item.to
          ? 'bg-indigo-50 text-indigo-600'
          : 'text-gray-600 hover:bg-gray-50'
      }`}
    >
      <item.icon className={`h-5 w-5 ${!sidebarOpen ? 'mx-auto' : ''}`} />
      {sidebarOpen && <span className="ml-3 text-sm">{item.label}</span>}
    </button>
  ))}
</div>
        </nav>

        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
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
        className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300 ease-in-out`}
      >
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold text-gray-900">Olá, {userData.name}!</h1>
              </div>
              
              {/* User Profile */}
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-3 focus:outline-none"
                >
                  <img
                    src={userData.avatar}
                    alt="Profile"
                    className="h-10 w-10 rounded-full object-cover border-2 border-indigo-600"
                  />
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-gray-900">{userData.name}</p>
                    <p className="text-xs text-gray-500">{userData.role}</p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-50">
                    <div className="p-4 border-b">
                      <p className="text-sm font-medium text-gray-900">{userData.name}</p>
                      <p className="text-xs text-gray-500">{userData.email}</p>
                      <p className="text-xs text-gray-500 mt-1">{userData.company}</p>
                    </div>
                    <div className="py-1">
                      <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                        Meu Perfil
                      </button>
                      <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                        Configurações
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                      >
                        Sair
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Balancetes</h1>
            <div className="flex space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter className="h-4 w-4" />
                <span>Filtrar</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                <Download className="h-4 w-4" />
                <span>Exportar</span>
              </button>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      {[
                        'Período',
                        'Ativo Total',
                        'Passivo Total',
                        'Patrimônio Líquido',
                        'Resultado',
                        'Status',
                        'Ações',
                      ].map((header, index) => (
                        <th
                          key={index}
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {balanceteData.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.periodo}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatCurrency(item.ativoTotal)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatCurrency(item.passivoTotal)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatCurrency(item.patrimonioLiquido)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatCurrency(item.resultado)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-indigo-600 hover:text-indigo-900">
                            <FileText className="h-5 w-5" />
                          </button>
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

export default Balancetes;