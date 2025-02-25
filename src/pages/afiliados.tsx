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
  Users,
  Download,
  Search,
  Filter,
  ChevronDown,
  Wallet,
  UserPlus,
  CreditCard,
} from 'lucide-react';
import Logo from '../assets/logo.png';

const Afiliados = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [bankingMenuOpen, setBankingMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    role: '',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  });

  const navigate = useNavigate();
  const location = useLocation();

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

  const handleExportData = () => {
    // Implementar lógica de exportação
    console.log('Exportando dados...');
  };

  const isCurrentPath = (path: string) => {
    return location.pathname === path;
  };

  const affiliatesData = [
    {
      id: 1,
      name: 'João Silva',
      email: 'joao.silva@email.com',
      status: 'Ativo',
      dateJoined: '15/03/2024',
      sales: 12,
      commission: 'R$ 1.500,00',
    },
    {
      id: 2,
      name: 'Maria Santos',
      email: 'maria.santos@email.com',
      status: 'Inativo',
      dateJoined: '10/03/2024',
      sales: 8,
      commission: 'R$ 950,00',
    },
    {
      id: 3,
      name: 'Pedro Oliveira',
      email: 'pedro.oliveira@email.com',
      status: 'Pendente',
      dateJoined: '12/03/2024',
      sales: 5,
      commission: 'R$ 600,00',
    },
  ];

  const filteredAffiliates = affiliatesData
    .filter(affiliate => 
      affiliate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      affiliate.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(affiliate => 
      filterStatus === 'todos' ? true : affiliate.status.toLowerCase() === filterStatus.toLowerCase()
    );
    

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white shadow-sm transition-all duration-300 ease-in-out flex flex-col fixed h-full`}>
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
          {/* Banking Section */}
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
                  { icon: FileText, label: 'Balancetes', to: '/balancetes' },
                  { icon: History, label: 'Movimentações', to: '/movimentacoesrecentes' },
                  { icon: Briefcase, label: 'Link de Indicação', to: '/linkdeindicacao' },
                ].map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleNavigation(item.to)}
                    className={`w-full flex items-center px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg ${
                      isCurrentPath(item.to) ? 'bg-indigo-50 text-indigo-600' : ''
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="ml-3 text-sm">{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Afiliados Section */}
          <div className="px-4 mt-4">
            <button
              onClick={() => handleNavigation('/afiliados')}
              className={`w-full flex items-center px-4 py-2 rounded-lg ${
                isCurrentPath('/afiliados') ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'
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

          {/* Other menu items */}
          <div className="px-4 py-2 mt-6">
            {[
              { icon: Settings, label: 'Configurações', to: '/configuracoes' },
            ].map((item, index) => (
              <button
                key={index}
                onClick={() => handleNavigation(item.to)}
                className={`w-full flex items-center px-4 py-2 mt-1 rounded-lg ${
                  isCurrentPath(item.to) ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'
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
      <div className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
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
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Afiliados</h1>
              <button
                onClick={handleExportData}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Download className="h-4 w-4 mr-2" />
                Exportar Dados
              </button>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Buscar afiliados..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="todos">Todos os Status</option>
                    <option value="ativo">Ativo</option>
                    <option value="inativo">Inativo</option>
                    <option value="pendente">Pendente</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Affiliates Table */}
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nome
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Data de Entrada
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Vendas
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Comissão Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredAffiliates.map((affiliate) => (
                      <tr key={affiliate.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{affiliate.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{affiliate.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            affiliate.status === 'Ativo'
                              ? 'bg-green-100 text-green-800'
                              : affiliate.status === 'Inativo'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {affiliate.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {affiliate.dateJoined}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {affiliate.sales}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {affiliate.commission}
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

export default Afiliados;