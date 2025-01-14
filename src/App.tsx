import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import BalanceSheetComplete from './pages/Balancetes';
import MovimentacoesRecentes from './pages/MovimentacoesRecentes';
import Cripto from './pages/Cripto';
import LoadingScreen from './pages/LoadingScreen';
import Config from './pages/Config';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/loading" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/register" element={<Register/>} />
      <Route path="/balancetes" element={<BalanceSheetComplete/>} />
      <Route path="/movimentacoesrecentes" element={<MovimentacoesRecentes/>} />
      <Route path="/criptomoedas" element={<Cripto/>} />
      <Route path="/loading" element={<LoadingScreen/>} />
      <Route path="/configuracoes" element={<Config/>} />
      
    </Routes>
  );
}

export default App;