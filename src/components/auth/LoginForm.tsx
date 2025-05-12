import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Email ou senha inválidos');
      }
    } catch (err) {
      setError('Ocorreu um erro. Por favor, tente novamente.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-center text-gray-800">Bem-vindo de volta</h2>
          <p className="text-center text-gray-600 mb-6">Faça login para acessar sua conta</p>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="appearance-none border rounded-md w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            id="email"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
            Senha
          </label>
          <input
            className="appearance-none border rounded-md w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            id="password"
            type="password" 
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <p className="text-right mt-2">
            <a className="text-sm text-blue-600 hover:text-blue-800" href="#esqueci-senha">
              Esqueceu sua senha?
            </a>
          </p>
        </div>
        {/* Link único para cadastro (fora do formulário) */}
      <div className="text-center mt-4 mb-6">
        <p className="text-gray-600 text-sm">
          Não tem uma conta?{' '}
          <Link 
            to="/cadastro" 
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Cadastre-se
          </Link>
        </p>
      </div>
        <div className="mb-6">
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 ease-in-out"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>
        </div>
      </form>

      

      <div className="text-center text-gray-500 text-xs">
        <p>Contas de demonstração:</p>
        <p>Admin: admin@gymhub.com / admin123</p>
        <p>Aluno: aluno@gymhub.com / aluno123</p>
      </div>
    </div>
  );
};

export default LoginForm;