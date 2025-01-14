import { useState } from 'react';
import Logo from '../assets/logo.png';
import { 
  DollarSign, 
  ArrowUpRight,
  CreditCard,
  TrendingUp,
  LayoutDashboard,
  History,
  Settings,
  LogOut,
  Menu,
  FileText,
  Briefcase,
  Eye,
  EyeOff,
  ChevronDown,
  Send,
  Banknote,
  PiggyBank,
  ArrowUpDown
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useNavigate } from 'react-router-dom';

const revenueData = [
  { month: 'Jan', receita: 45000, despesa: 32000 },
  { month: 'Fev', receita: 52000, despesa: 35000 },
  { month: 'Mar', receita: 49000, despesa: 31000 },
  { month: 'Abr', receita: 58000, despesa: 36000 },
  { month: 'Mai', receita: 55000, despesa: 34000 },
  { month: 'Jun', receita: 62000, despesa: 38000 },
];

const balanceData = [
  { category: 'Ativos Circulantes', valor: 250000 },
  { category: 'Ativos Fixos', valor: 450000 },
  { category: 'Passivos Circulantes', valor: 150000 },
  { category: 'Passivos Não Circulantes', valor: 200000 },
  { category: 'Patrimônio Líquido', valor: 350000 },
];

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showBalance, setShowBalance] = useState(true);
  const [showNewTransactionMenu, setShowNewTransactionMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const currentBalance = 86000;

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
          {[
            { icon: LayoutDashboard, label: 'Dashboard', to: '/dashboard', active: true },
            { icon: FileText, label: 'Balancetes', to: '/balancetes' },
            { icon: History, label: 'Movimentações', to: '/movimentacoesrecentes' },
            { icon: Briefcase, label: 'Criptomoedas', to: '/Criptomoedas' },
            { icon: Settings, label: 'Configurações', to: '/configuracoes' },
          ].map((item, index) => (
            <button
              key={index}
              onClick={() => handleNavigation(item.to)}
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
            </button>
          ))}
        </nav>

        <div className="p-4 border-t">
          <button 
            onClick={handleLogout}
            className={`w-full flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg ${!sidebarOpen && 'justify-center'}`}
          >
            <LogOut className="h-5 w-5" />
            {sidebarOpen && <span className="ml-3 font-medium">Sair</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300 ease-in-out`}>
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold text-gray-900">Olá, Lucas Martins!</h1>
              </div>
              <div className="relative">
                <button 
                  onClick={() => setShowNewTransactionMenu(!showNewTransactionMenu)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center space-x-2"
                >
                  <span>Nova Movimentação</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                
                {showNewTransactionMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg z-50">
                    <div className="py-1">
                      <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center space-x-2">
                        <Send className="h-4 w-4" />
                        <span>Pix</span>
                      </button>
                      <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center space-x-2">
                        <ArrowUpDown className="h-4 w-4" />
                        <span>Transferência</span>
                      </button>
                      <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center space-x-2">
                        <Banknote className="h-4 w-4" />
                        <span>Depósito</span>
                      </button>
                      <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center space-x-2">
                        <PiggyBank className="h-4 w-4" />
                        <span>Saque</span>
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
          {/* Saldo Atual Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Saldo Atual</p>
                <div className="flex items-center space-x-2">
                  <p className="text-3xl font-bold text-gray-900">
                    {showBalance ? formatCurrency(currentBalance) : '••••••'}
                  </p>
                  <button
                    onClick={() => setShowBalance(!showBalance)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    {showBalance ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Revenue Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Receita Mensal</p>
                  <p className="text-2xl font-bold text-gray-900">R$ 62.000,00</p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-green-600">
                <ArrowUpRight className="h-4 w-4" />
                <span className="text-sm ml-1">+8.5% vs mês anterior</span>
              </div>
            </div>

            {/* Expenses Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Despesas Mensais</p>
                  <p className="text-2xl font-bold text-gray-900">R$ 38.000,00</p>
                </div>
                <div className="bg-red-100 p-3 rounded-lg">
                  <CreditCard className="h-6 w-6 text-red-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-red-600">
                <ArrowUpRight className="h-4 w-4" />
                <span className="text-sm ml-1">+5.2% vs mês anterior</span>
              </div>
            </div>

            {/* Profit Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Lucro Líquido</p>
                  <p className="text-2xl font-bold text-gray-900">R$ 24.000,00</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-blue-600">
                <ArrowUpRight className="h-4 w-4" />
                <span className="text-sm ml-1">+13.8% vs mês anterior</span>
              </div>
            </div>

            {/* Projects Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Projetos Ativos</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Briefcase className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-purple-600">
                <ArrowUpRight className="h-4 w-4" />
                <span className="text-sm ml-1">2 novos este mês</span>
              </div>
            </div>
          </div>

          {/* Charts and Tables Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Chart */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Receitas vs Despesas</h2>
                <select className="text-sm text-gray-500 border rounded-md px-2 py-1">
                  <option>Últimos 6 meses</option>
                  <option>Este ano</option>
                  <option>Último ano</option>
                </select>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="receita" stackId="1" stroke="#4F46E5" fill="#4F46E5" fillOpacity={0.2} />
                    <Area type="monotone" dataKey="despesa" stackId="1" stroke="#EF4444" fill="#EF4444" fillOpacity={0.2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Balance Sheet */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Balancete Simplificado</h2>
                <button className="text-sm text-indigo-600 hover:text-indigo-700">Ver Completo</button>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={balanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="valor" fill="#4F46E5" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white rounded-xl shadow-sm p-6 lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Últimas Movimentações</h2>
                <button className="text-sm text-indigo-600 hover:text-indigo-700">Ver Todas</button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      { date: '15 Mar 2024', desc: 'Pagamento Cliente XYZ', type: 'Receita', category: 'Vendas', amount: '+ R$ 15.000,00' },
                      { date: '14 Mar 2024', desc: 'Folha de Pagamento', type: 'Despesa', category: 'RH', amount: '- R$ 28.000,00' },
                      { date: '14 Mar 2024', desc: 'Projeto ABC', type: 'Receita', category: 'Serviços', amount: '+ R$ 8.500,00' },
                      { date: '13 Mar 2024', desc: 'Fornecedor 123', type: 'Despesa', category: 'Insumos', amount: '- R$ 5.200,00' },
                      { date: '13 Mar 2024', desc: 'Manutenção', type: 'Despesa', category: 'Infraestrutura', amount: '- R$ 1.800,00' },
                    ].map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.desc}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.category}</td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium text-right ${
                          item.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'
                        }`}>{item.amount}</td>
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
}

export default Dashboard;