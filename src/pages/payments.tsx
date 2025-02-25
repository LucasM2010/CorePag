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
  Filter,
  Download,
  Search,
  Calendar,
  Wallet,
  ChevronDown,
  Users,
  UserPlus,
  TrendingUp,
  Bitcoin,
  CreditCard,
  Link,
  Plug,
  UserCircle,
  Stethoscope,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
} from 'lucide-react';
import Logo from '../assets/logo.png';

// Sample data for metrics
const metricsData = {
  totalRevenue: 150000,
  dailyRevenue: 5000,
  monthlyRevenue: 45000,
  yearlyRevenue: 540000,
  totalTransactions: 1250,
  averageTicket: 120,
};

const recentTransactions = [
  {
    id: 1,
    date: '2024-03-15',
    customer: 'João Silva',
    amount: 1500.00,
    status: 'completed',
    type: 'credit_card'
  },
  {
    id: 2,
    date: '2024-03-15',
    customer: 'Maria Santos',
    amount: 2300.00,
    status: 'completed',
    type: 'pix'
  },
];

const paymentLinks = [
  {
    id: 1,
    name: 'Plano Mensal',
    amount: 99.90,
    active: true,
    clicks: 145,
    conversions: 23
  },
  {
    id: 2,
    name: 'Produto Premium',
    amount: 497.00,
    active: true,
    clicks: 89,
    conversions: 12
  },
];

const Payments: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [bankingMenuOpen, setBankingMenuOpen] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [activeTab, setActiveTab] = useState('metrics');
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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'metrics':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <MetricCard
              title="Faturamento Total"
              value={formatCurrency(metricsData.totalRevenue)}
              icon={<DollarSign className="h-6 w-6 text-indigo-600" />}
            />
            <MetricCard
              title="Faturamento Diário"
              value={formatCurrency(metricsData.dailyRevenue)}
              icon={<TrendingUp className="h-6 w-6 text-green-600" />}
            />
            <MetricCard
              title="Faturamento Mensal"
              value={formatCurrency(metricsData.monthlyRevenue)}
              icon={<BarChart3 className="h-6 w-6 text-blue-600" />}
            />
            <MetricCard
              title="Faturamento Anual"
              value={formatCurrency(metricsData.yearlyRevenue)}
              icon={<TrendingUp className="h-6 w-6 text-purple-600" />}
            />
            <MetricCard
              title="Total de Transações"
              value={metricsData.totalTransactions.toString()}
              icon={<CreditCard className="h-6 w-6 text-orange-600" />}
            />
            <MetricCard
              title="Ticket Médio"
              value={formatCurrency(metricsData.averageTicket)}
              icon={<DollarSign className="h-6 w-6 text-teal-600" />}
            />
          </div>
        );
      case 'crypto':
        return (
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center justify-center h-40">
              <div className="text-center">
                <Bitcoin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900">Em Breve</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Pagamentos em crypto estarão disponíveis em breve.
                </p>
              </div>
            </div>
          </div>
        );
      case 'recent':
        return (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Valor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(transaction.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {transaction.customer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(transaction.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.type}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'links':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Links de Pagamento</h3>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                Novo Link
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paymentLinks.map((link) => (
                <div key={link.id} className="bg-white p-6 rounded-lg shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">{link.name}</h4>
                      <p className="text-2xl font-bold text-indigo-600 mt-2">
                        {formatCurrency(link.amount)}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      link.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {link.active ? 'Ativo' : 'Inativo'}
                    </span>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Cliques</p>
                      <p className="text-lg font-medium text-gray-900">{link.clicks}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Conversões</p>
                      <p className="text-lg font-medium text-gray-900">{link.conversions}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'integrations':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <IntegrationCard
              title="API REST"
              description="Integre sua aplicação via API REST"
              status="connected"
            />
            <IntegrationCard
              title="Webhook"
              description="Receba notificações em tempo real"
              status="available"
            />
            <IntegrationCard
              title="SDK JavaScript"
              description="Integração via SDK JavaScript"
              status="available"
            />
          </div>
        );
      case 'customers':
        return (
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center justify-center h-40">
              <div className="text-center">
                <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900">Em Breve</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Gestão de clientes estará disponível em breve.
                </p>
              </div>
            </div>
          </div>
        );
      case 'meds':
        return (
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center justify-center h-40">
              <div className="text-center">
                <Stethoscope className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900">Em Breve</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Funcionalidades médicas estarão disponíveis em breve.
                </p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white shadow-sm transition-all duration-300 ease-in-out flex flex-col fixed h-full`}>
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={Logo}
              alt="Logo"
              className={`h-8 w-auto ${!sidebarOpen && 'hidden'}`}
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
                    onClick={() => navigate(item.to)}
                    className={`w-full flex items-center px-4 py-2 ${
                      location.pathname === item.to
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

          {/* Afiliados section */}
          <div className="px-4 mt-4">
            <button
              onClick={() => navigate('/afiliados')}
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

          {/* Users section */}
          <div className="px-4 mt-4">
            <button
              onClick={() => navigate('/users')}
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

          {/* Settings section */}
          <div className="px-4 py-2 mt-6">
            <button
              onClick={() => navigate('/configuracoes')}
              className={`w-full flex items-center px-4 py-2 mt-1 rounded-lg ${
                location.pathname === '/configuracoes'
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Settings className={`h-5 w-5 ${!sidebarOpen ? 'mx-auto' : ''}`} />
              {sidebarOpen && <span className="ml-3 text-sm">Configurações</span>}
            </button>
          </div>
        </nav>

        <div className="p-4 border-t">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
          >
            <LogOut className="h-5 w-5" />
            {sidebarOpen && <span className="ml-3">Sair</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300 ease-in-out`}>
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
              
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
          {/* Tabs */}
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <TabButton
                  active={activeTab === 'metrics'}
                  onClick={() => setActiveTab('metrics')}
                  icon={<TrendingUp className="h-5 w-5" />}
                  label="Métricas"
                />
                <TabButton
                  active={activeTab === 'crypto'}
                  onClick={() => setActiveTab('crypto')}
                  icon={<Bitcoin className="h-5 w-5" />}
                  label="Crypto"
                  soon
                />
                <TabButton
                  active={activeTab === 'recent'}
                  onClick={() => setActiveTab('recent')}
                  icon={<History className="h-5 w-5" />}
                  label="Últimas Transações"
                />
                <TabButton
                  active={activeTab === 'links'}
                  onClick={() => setActiveTab('links')}
                  icon={<Link className="h-5 w-5" />}
                  label="Links de Pagamento"
                />
                <TabButton
                  active={activeTab === 'integrations'}
                  onClick={() => setActiveTab('integrations')}
                  icon={<Plug className="h-5 w-5" />}
                  label="Integrações"
                />
                <TabButton
                  active={activeTab === 'customers'}
                  onClick={() => setActiveTab('customers')}
                  icon={<UserCircle className="h-5 w-5" />}
                  label="Clientes"
                  soon
                />
                <TabButton
                  active={activeTab === 'meds'}
                  onClick={() => setActiveTab('meds')}
                  icon={<Stethoscope className="h-5 w-5" />}
                  label="Meds"
                  soon
                />
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="mt-6">
            {renderTabContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

// Component for metric cards
const MetricCard: React.FC<{
  title: string;
  value: string;
  icon: React.ReactNode;
}> = ({ title, value, icon }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
      </div>
      {icon}
    </div>
  </div>
);

// Component for integration cards
const IntegrationCard: React.FC<{
  title: string;
  description: string;
  status: 'connected' | 'available';
}> = ({ title, description, status }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        status === 'connected' 
          ? 'bg-green-100 text-green-800'
          : 'bg-blue-100 text-blue-800'
      }`}>
        {status === 'connected' ? 'Conectado' : 'Disponível'}
      </span>
    </div>
    <p className="text-sm text-gray-500">{description}</p>
    <button className={`mt-4 w-full px-4 py-2 rounded-lg text-sm font-medium ${
      status === 'connected'
        ? 'bg-gray-100 text-gray-700'
        : 'bg-indigo-600 text-white hover:bg-indigo-700'
    }`}>
      {status === 'connected' ? 'Configurar' : 'Conectar'}
    </button>
  </div>
);

// Component for tab buttons
const TabButton: React.FC<{
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  soon?: boolean;
}> = ({ active, onClick, icon, label, soon }) => (
  <button
    onClick={onClick}
    className={`
      flex items-center px-1 py-4 border-b-2 font-medium text-sm
      ${active
        ? 'border-indigo-500 text-indigo-600'
        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
      }
    `}
  >
    {icon}
    <span className="ml-2">{label}</span>
    {soon && (
      <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
        Em Breve
      </span>
    )}
  </button>
);

export default Payments;