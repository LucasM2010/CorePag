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
  User,
  Mail,
  Phone,
  Building,
  Lock,
  Camera,
  Save,
  Wallet,
  ChevronDown,
  Users,
  MapPin,
  Calendar,
  DollarSign,
  Smartphone,
  Shield,
  Globe,
  Calculator,
  Percent,
  UserPlus,
  CreditCard
} from 'lucide-react';
import Logo from '../assets/logo.png';

const Configuracoes = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [bankingMenuOpen, setBankingMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    role: '',
    motherName: '',
    birthDate: '',
    monthlyIncome: '',
    address: '',
    number: '',
    zipCode: '',
    neighborhood: '',
    city: '',
    state: '',
    trustedDevice: '',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  });

  const [fees, setFees] = useState({
    transactionFee: 2.5,
    monthlyFee: 29.90,
    withdrawalFee: 1.5
  });

  const [simulationData, setSimulationData] = useState({
    saleAmount: 0,
    totalFees: 0,
    netAmount: 0
  });

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      setUserData(prevState => ({
        ...prevState,
        name: user.name || 'Usuário',
        email: user.email || '',
        role: user.role || 'Usuário',
        company: user.company || '',
        phone: user.phone || ''
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

  const isCurrentPath = (path: string) => {
    return location.pathname === path;
  };

  const calculateSaleSimulation = (amount: number) => {
    const totalFees = (amount * fees.transactionFee) / 100;
    const netAmount = amount - totalFees;
    setSimulationData({
      saleAmount: amount,
      totalFees,
      netAmount
    });
  };

  // Navigation tabs configuration
  const navigationTabs = [
    { id: 'profile', label: 'Meus Dados', icon: User },
    { id: 'trusted-device', label: 'Aparelho de Confiança', icon: Smartphone },
    { id: 'ip-management', label: 'Gerenciamento de IP', icon: Globe },
    { id: 'security', label: 'Segurança', icon: Lock },
    { id: 'fees', label: 'Minhas Taxas', icon: Percent },
    { id: 'sales-simulator', label: 'Simulador de Vendas', icon: Calculator },
  ];

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
                    className={`w-full flex items-center px-4 py-2 ${
                      isCurrentPath(item.to) ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'
                    } rounded-lg`}
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
            <h1 className="text-2xl font-bold text-gray-900">Configurações</h1>
            <p className="text-sm text-gray-500 mt-1">Gerencie suas informações pessoais e preferências</p>
          </div>

          {/* Settings Navigation */}
          <div className="mb-8 border-b">
            <nav className="flex flex-wrap gap-4">
              {navigationTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center pb-4 px-4 ${
                    activeTab === tab.id
                      ? 'border-b-2 border-indigo-600 text-indigo-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon className="h-5 w-5 mr-2" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content Sections */}
          <div className="max-w-4xl">
            {/* Meus Dados */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <img
                      src={userData.avatar}
                      alt="Profile"
                      className="h-24 w-24 rounded-full object-cover"
                    />
                    <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg border hover:bg-gray-50">
                      <Camera className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">{userData.name}</h2>
                    <p className="text-sm text-gray-500">{userData.role}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  {/* Personal Information */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nome Completo</label>
                    <input
                      type="text"
                      value={userData.name}
                      onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Telefone</label>
                    <input
                      type="tel"
                      value={userData.phone}
                      onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nome da Mãe</label>
                    <input
                      type="text"
                      value={userData.motherName}
                      onChange={(e) => setUserData({ ...userData, motherName: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Data de Nascimento</label>
                    <input
                      type="date"
                      value={userData.birthDate}
                      onChange={(e) => setUserData({ ...userData, birthDate: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Renda Mensal</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">R$</span>
                      </div>
                      <input
                        type="number"
                        value={userData.monthlyIncome}
                        onChange={(e) => setUserData({ ...userData, monthlyIncome: e.target.value })}
                        className="mt-1 block w-full pl-12 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  {/* Address Information */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">CEP</label>
                    <input
                      type="text"
                      value={userData.zipCode}
                      onChange={(e) => setUserData({ ...userData, zipCode: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Endereço</label>
                    <input
                      type="text"
                      value={userData.address}
                      onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Número</label>
                    <input
                      type="text"
                      value={userData.number}
                      onChange={(e) => setUserData({ ...userData, number: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Bairro</label>
                    <input
                      type="text"
                      value={userData.neighborhood}
                      onChange={(e) => setUserData({ ...userData, neighborhood: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Cidade</label>
                    <input
                      type="text"
                      value={userData.city}
                      onChange={(e) => setUserData({ ...userData, city: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Estado</label>
                    <select
                      value={userData.state}
                      onChange={(e) => setUserData({ ...userData, state: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                      <option value="">Selecione um estado</option>
                      {[
                        'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
                        'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
                        'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
                      ].map((state) => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <Save className="h-4 w-4 mr-2" />
                    Salvar Alterações
                  </button>
                </div>
              </div>
            )}

            {/* Aparelho de Confiança */}
            {activeTab === 'trusted-device' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Configurar Aparelho de Confiança</h3>
                  <p className="text-sm text-gray-500 mb-6">
                    Configure o Google Authenticator para aumentar a segurança da sua conta.
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Nome do Dispositivo</label>
                      <input
                        type="text"
                        value={userData.trustedDevice}
                        onChange={(e) => setUserData({ ...userData, trustedDevice: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="Ex: iPhone 12"
                      />
                    </div>

                    <div className="mt-6">
                      <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <Shield className="h-4 w-4 mr-2" />
                        Configurar Google Authenticator
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Gerenciamento de IP */}
            {activeTab === 'ip-management' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Credenciais de IP</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-md">
                      <p className="text-sm text-gray-600">Seu IP atual: 192.168.1.1</p>
                      <p className="text-sm text-gray-600">Última atividade: 01/01/2024 12:00</p>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="text-md font-medium text-gray-700 mb-2">IPs Autorizados</h4>
                      <div className="border rounded-md divide-y">
                        {[
                          { ip: '192.168.1.1', lastAccess: '01/01/2024 12:00' },
                          { ip: '192.168.1.2', lastAccess: '31/12/2023 15:30' },
                        ].map((item, index) => (
                          <div key={index} className="p-4 flex justify-between items-center">
                            <div>
                              <p className="text-sm font-medium text-gray-900">{item.ip}</p>
                              <p className="text-sm text-gray-500">Último acesso: {item.lastAccess}</p>
                            </div>
                            <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                              Remover
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Minhas Taxas */}
            {activeTab === 'fees' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Taxas Atuais</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gray-50 p-4 rounded-md">
                        <p className="text-sm text-gray-500">Taxa de Transação</p>
                        <p className="text-2xl font-bold text-gray-900">{fees.transactionFee}%</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <p className="text-sm text-gray-500">Mensalidade</p>
                        <p className="text-2xl font-bold text-gray-900">R$ {fees.monthlyFee}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <p className="text-sm text-gray-500">Taxa de Saque</p>
                        <p className="text-2xl font-bold text-gray-900">{fees.withdrawalFee}%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Simulador de Vendas */}
            {activeTab === 'sales-simulator' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Simulador de Vendas</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Valor da Venda</label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">R$</span>
                        </div>
                        <input
                          type="number"
                          onChange={(e) => calculateSaleSimulation(Number(e.target.value))}
                          className="mt-1 block w-full pl-12 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          placeholder="0,00"
                        />
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gray-50 p-4 rounded-md">
                        <p className="text-sm text-gray-500">Valor Bruto</p>
                        <p className="text-2xl font-bold text-gray-900">
                          R$ {simulationData.saleAmount.toFixed(2)}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <p className="text-sm text-gray-500">Total de Taxas</p>
                        <p className="text-2xl font-bold text-red-600">
                          R$ {simulationData.totalFees.toFixed(2)}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <p className="text-sm text-gray-500">Valor Líquido</p>
                        <p className="text-2xl font-bold text-green-600">
                          R$ {simulationData.netAmount.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security Section */}
            {activeTab === 'security' && (
              <div className="space-y-6 max-w-md">
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Alterar Senha</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Senha Atual</label>
                      <input
                        type={showPassword ? "text" : "password"}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Nova Senha</label>
                      <input
                        type={showPassword ? "text" : "password"}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Confirmar Nova Senha</label>
                      <input
                        type={showPassword ? "text" : "password"}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="show-password"
                        checked={showPassword}
                        onChange={() => setShowPassword(!showPassword)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label htmlFor="show-password" className="ml-2 block text-sm text-gray-900">
                        Mostrar senha
                      </label>
                    </div>

                    <div className="flex justify-end mt-6">
                      <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <Save className="h-4 w-4 mr-2" />
                        Alterar Senha
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Configuracoes;