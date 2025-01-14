import React, { useEffect, useState } from 'react';
import Logo from '../assets/logo.png';
import Dashboard from './Dashboard';

const LoadingScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // Tempo de carregamento de 3 segundos

    return () => clearTimeout(timer);
  }, []);

  if (!loading) {
    return <Dashboard />; // Redireciona para a HomePage após o carregamento
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center">
        {/* Logo */}
        <img src={Logo} alt="Logo" className="w-32 h-auto animate-pulse" />

        {/* Linha de carregamento */}
        <div className="w-64 h-2 mt-8 bg-gray-200 rounded-full overflow-hidden relative">
          <div className="absolute h-full bg-indigo-500 animate-loading-bar"></div>
        </div>
      </div>
    </div>
  );
};


export default LoadingScreen;
