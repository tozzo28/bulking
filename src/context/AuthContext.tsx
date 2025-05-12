import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Role } from '../types';

// Mock user data for demo purposes
const MOCK_USERS = [
  {
    id: '1',
    email: 'admin@gymhub.com',
    name: 'Admin User',
    role: 'admin' as Role,
    password: 'admin123', // In a real app, we would never store plain text passwords
  },
  {
    id: '2',
    email: 'aluno@gymhub.com',
    name: 'John Member',
    role: 'member' as Role,
    password: 'aluno123',
  },
];

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string, role: Role) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const isAuthenticated = !!currentUser;
  const isAdmin = currentUser?.role === 'admin';

  // Check for saved user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  // Mock login function
  const login = async (email: string, password: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const user = MOCK_USERS.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    
    if (user) {
      const { password: _, ...safeUser } = user;
      setCurrentUser(safeUser);
      localStorage.setItem('currentUser', JSON.stringify(safeUser));
      return true;
    }
    
    return false;
  };

  // Mock signup function
  const signup = async (email: string, password: string, name: string, role: Role): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Check if user already exists
    if (MOCK_USERS.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      return false;
    }
    
    // Create new user
    const newUser = {
      id: String(MOCK_USERS.length + 1),
      email,
      name,
      role,
      password // In real app, this would be hashed
    };
    
    // Add to mock database
    MOCK_USERS.push(newUser);
    
    // Auto-login after signup
    const { password: _, ...safeUser } = newUser;
    setCurrentUser(safeUser);
    localStorage.setItem('currentUser', JSON.stringify(safeUser));
    
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ 
      currentUser, 
      login, 
      signup, 
      logout, 
      isAuthenticated, 
      isAdmin 
    }}>
      {children}
    </AuthContext.Provider>
  );
};