import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Menu, X, User, LogOut, ChevronDown, Dumbbell } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { currentUser, logout, isAdmin } = useAuth();
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);
  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenus();
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md py-3 fixed w-full top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center" onClick={closeMenus}>
              <span className="text-blue-600 h-8 w-8 mr-2">
                <Dumbbell size={32} />
              </span>
              <span className="font-bold text-xl text-gray-900">Academia</span>
            </Link>
          </div>

          <div className="hidden md:flex space-x-6">
            {currentUser && (
              <>
                <Link
                  to="/dashboard"
                  className={`py-2 px-3 ${
                    isActive('/dashboard')
                      ? 'text-blue-600 font-medium'
                      : 'text-gray-700 hover:text-blue-600'
                  } transition duration-150 ease-in-out`}
                >
                  Painel
                </Link>
                
                {isAdmin ? (
                  <>
                    <Link
                      to="/alunos"
                      className={`py-2 px-3 ${
                        isActive('/alunos')
                          ? 'text-blue-600 font-medium'
                          : 'text-gray-700 hover:text-blue-600'
                      } transition duration-150 ease-in-out`}
                    >
                      Alunos
                    </Link>
                    <Link
                      to="/aulas"
                      className={`py-2 px-3 ${
                        isActive('/aulas')
                          ? 'text-blue-600 font-medium'
                          : 'text-gray-700 hover:text-blue-600'
                      } transition duration-150 ease-in-out`}
                    >
                      Aulas
                    </Link>
                    <Link
                      to="/planos"
                      className={`py-2 px-3 ${
                        isActive('/planos')
                          ? 'text-blue-600 font-medium'
                          : 'text-gray-700 hover:text-blue-600'
                      } transition duration-150 ease-in-out`}
                    >
                      Planos
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/treinos"
                      className={`py-2 px-3 ${
                        isActive('/treinos')
                          ? 'text-blue-600 font-medium'
                          : 'text-gray-700 hover:text-blue-600'
                      } transition duration-150 ease-in-out`}
                    >
                      Treinos
                    </Link>
                    <Link
                      to="/agendar-aula"
                      className={`py-2 px-3 ${
                        isActive('/agendar-aula')
                          ? 'text-blue-600 font-medium'
                          : 'text-gray-700 hover:text-blue-600'
                      } transition duration-150 ease-in-out`}
                    >
                      Agendar Aula
                    </Link>
                    <Link
                      to="/meu-plano"
                      className={`py-2 px-3 ${
                        isActive('/meu-plano')
                          ? 'text-blue-600 font-medium'
                          : 'text-gray-700 hover:text-blue-600'
                      } transition duration-150 ease-in-out`}
                    >
                      Meu Plano
                    </Link>
                  </>
                )}
              </>
            )}
          </div>

          <div className="flex items-center">
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={toggleProfile}
                  className="flex items-center text-gray-800 hover:text-blue-600 focus:outline-none transition duration-150 ease-in-out"
                >
                  <span className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2">
                    <User size={18} />
                  </span>
                  <span className="hidden sm:block font-medium">{currentUser.name}</span>
                  <ChevronDown size={16} className="ml-1" />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl py-1 z-10">
                    <Link
                      to="/perfil"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={closeMenus}
                    >
                      Perfil
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <LogOut size={16} className="mr-2" />
                      Sair
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition duration-150 ease-in-out"
              >
                Entrar
              </Link>
            )}

            <div className="ml-4 md:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-md border-t">
            {currentUser ? (
              <>
                <Link
                  to="/dashboard"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive('/dashboard')
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                  }`}
                  onClick={closeMenus}
                >
                  Painel
                </Link>
                
                {isAdmin ? (
                  <>
                    <Link
                      to="/alunos"
                      className={`block px-3 py-2 rounded-md text-base font-medium ${
                        isActive('/alunos')
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                      }`}
                      onClick={closeMenus}
                    >
                      Alunos
                    </Link>
                    <Link
                      to="/aulas"
                      className={`block px-3 py-2 rounded-md text-base font-medium ${
                        isActive('/aulas')
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                      }`}
                      onClick={closeMenus}
                    >
                      Aulas
                    </Link>
                    <Link
                      to="/planos" 
                      className={`block px-3 py-2 rounded-md text-base font-medium ${
                        isActive('/planos')
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                      }`}
                      onClick={closeMenus}
                    >
                      Planos
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/treinos"
                      className={`block px-3 py-2 rounded-md text-base font-medium ${
                        isActive('/treinos')
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                      }`}
                      onClick={closeMenus}
                    >
                      Treinos
                    </Link>
                    <Link
                      to="/agendar-aula"
                      className={`block px-3 py-2 rounded-md text-base font-medium ${
                        isActive('/agendar-aula')
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                      }`}
                      onClick={closeMenus}
                    >
                      Agendar Aula
                    </Link>
                    <Link
                      to="/meu-plano"
                      className={`block px-3 py-2 rounded-md text-base font-medium ${
                        isActive('/meu-plano')
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                      }`}
                      onClick={closeMenus}
                    >
                      Meu Plano
                    </Link>
                  </>
                )}
                
                <Link
                  to="/perfil"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive('/perfil')
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                  }`}
                  onClick={closeMenus}
                >
                  Perfil
                </Link>
                
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                >
                  Sair
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                onClick={closeMenus}
              >
                Entrar
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;