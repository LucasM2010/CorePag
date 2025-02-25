import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import BalanceSheetComplete from './pages/Balancetes';
import MovimentacoesRecentes from './pages/MovimentacoesRecentes';
import LoadingScreen from './pages/LoadingScreen';
import Config from './pages/Config';
import Linkdeindicacao from './pages/linkdeindicacao';
import Afiliados from './pages/afiliados';
import Users from './pages/Users';
import Payments from './pages/payments';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/loading" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/register" element={<Register/>} />
      <Route path="/balancetes" element={<BalanceSheetComplete/>} />
      <Route path="/movimentacoesrecentes" element={<MovimentacoesRecentes/>} />
      <Route path="/linkdeindicacao" element={<Linkdeindicacao/>} />
      <Route path="/loading" element={<LoadingScreen/>} />
      <Route path="/configuracoes" element={<Config/>} />
      <Route path="/afiliados" element={<Afiliados/>} />
      <Route path="/users" element={<Users/>} />
      <Route path="/payments" element={<Payments/>} />
    </Routes>
  );
}

export default App;