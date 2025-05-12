import LoginForm from '../components/auth/LoginForm';
import { useAuth } from '../context/AuthContext';
import { Navigate, Link } from 'react-router-dom';

const Login = () => {
  const { isAuthenticated } = useAuth();
  
  // Redirect if already logged in
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl flex flex-col md:flex-row shadow-xl rounded-xl overflow-hidden">
        {/* Left image section */}
        <div 
          className="hidden md:block md:w-1/2 bg-cover bg-center" 
          style={{ 
            backgroundImage: `url('https://images.pexels.com/photos/3253501/pexels-photo-3253501.jpeg')`,
            backgroundPosition: 'center',
          }}
        >
          <div className="h-full w-full bg-blue-900 bg-opacity-40 flex flex-col justify-center p-12">
            <h1 className="text-white text-4xl font-bold mb-6">Welcome to GymHub</h1>
            <p className="text-white text-xl">
              The complete management system for your fitness journey
            </p>
          </div>
        </div>
        
        {/* Right login form section */}
        <div className="w-full md:w-1/2 bg-white p-8 md:p-12 flex flex-col items-center justify-center">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;