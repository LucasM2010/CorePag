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
  Link as LinkIcon,
  Copy,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Wallet,
  ChevronDown,
  Users,
  UserPlus,
  CreditCard
} from 'lucide-react';
import Logo from '../assets/logo.png';

const Linkdeindicacao = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [bankingMenuOpen, setBankingMenuOpen] = useState(true);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showCopySuccess, setShowCopySuccess] = useState(false);
  const [generatedLink, setGeneratedLink] = useState('');
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    role: '',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  });
  const [referralData, setReferralData] = useState({
    title: '',
    description: '',
    expiryDate: '',
    referredName: '',
    referredEmail: '',
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

  const handleGenerateLink = (e: React.FormEvent) => {
    e.preventDefault();
    const mockReferralLink = `https://app.example.com/referral/${Math.random().toString(36).substring(7)}`;
    setGeneratedLink(mockReferralLink);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    setShowCopySuccess(true);
    setTimeout(() => setShowCopySuccess(false), 2000);
  };

  const location = useLocation();

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
                              { icon: FileText, label: 'Balancetes', to: '/balancetes' },
                              { icon: History, label: 'Movimentações', to: '/movimentacoesrecentes' },
                              { icon: Briefcase, label: 'Link de Indicação', to: '/linkdeindicacao', active: true },
                              
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
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Links de Indicações</h1>
              <p className="text-sm text-gray-500 mt-1">Gerencie seus links para indicar novos clientes</p>
            </div>
            <button
              onClick={() => setShowLinkModal(true)}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <LinkIcon className="h-4 w-4 mr-2" />
              Gerar link de indicação
            </button>
          </div>

          {/* Referral Link Modal */}
          {showLinkModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
                <div className="p-6 border-b">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">Nova Indicação</h2>
                    <button
                      onClick={() => setShowLinkModal(false)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">Fechar</span>
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                <form onSubmit={handleGenerateLink} className="p-6">
                  <div className="space-y-6">
                    {/* Title Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Título da Indicação</label>
                      <input
                        type="text"
                        required
                        value={referralData.title}
                        onChange={(e) => setReferralData({ ...referralData, title: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2"
                        placeholder="Ex: Indicação para Plano Premium"
                      />
                    </div>

                    {/* Description Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Descrição</label>
                      <textarea
                        required
                        value={referralData.description}
                        onChange={(e) => setReferralData({ ...referralData, description: e.target.value })}
                        rows={3}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2"
                        placeholder="Descreva os benefícios ou detalhes da indicação"
                      />
                    </div>

                    {/* Expiry Date Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Data de Expiração</label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Calendar className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="date"
                          required
                          value={referralData.expiryDate}
                          onChange={(e) => setReferralData({ ...referralData, expiryDate: e.target.value })}
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    </div>

                    {/* Referred Person Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Nome do Indicado</label>
                        <input
                          type="text"
                          required
                          value={referralData.referredName}
                          onChange={(e) => setReferralData({ ...referralData, referredName: e.target.value })}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2"
                          placeholder="Nome completo"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Email do Indicado</label>
                        <input
                          type="email"
                          required
                          value={referralData.referredEmail}
                          onChange={(e) => setReferralData({ ...referralData, referredEmail: e.target.value })}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2"
                          placeholder="email@exemplo.com"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Generated Link Display */}
                  {generatedLink && (
                    <div className="mt-6 bg-gray-50 p-4 rounded-md">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 mr-4">
                          <p className="text-sm font-medium text-gray-900">Link de Indicação:</p>
                          <p className="mt-1 text-sm text-gray-500 break-all">{generatedLink}</p>
                        </div>
                        <button
                          type="button"
                          onClick={handleCopyLink}
                          className="flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          {showCopySuccess ? (
                            <>
                              <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                              Copiado!
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4 mr-2" />
                              Copiar
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowLinkModal(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Gerar Link
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Recent Referrals Table */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Indicações Recentes</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Data de Criação
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Indicado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Validade
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[
                    {
                      date: '15/03/2024',
                      referred: 'Maria Silva',
                      status: 'Pendente',
                      expiryDate: '20/03/2024',
                    },
                    {
                      date: '14/03/2024',
                      referred: 'João Santos',
                      status: 'Aceito',
                      expiryDate: '19/03/2024',
                    },
                    {
                      date: '13/03/2024',
                      referred: 'Ana Oliveira',
                      status: 'Expirado',
                      expiryDate: '14/03/2024',
                    },
                  ].map((referral, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-gray-400" />
                          {referral.date}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {referral.referred}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          referral.status === 'Aceito'
                            ? 'bg-green-100 text-green-800'
                            : referral.status === 'Pendente'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {referral.status === 'Aceito' && <CheckCircle2 className="h-3 w-3 mr-1" />}
                          {referral.status === 'Pendente' && <Clock className="h-3 w-3 mr-1" />}
                          {referral.status === 'Expirado' && <AlertCircle className="h-3 w-3 mr-1" />}
                          {referral.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {referral.expiryDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                          <Copy className="h-4 w-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <LinkIcon className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Linkdeindicacao;