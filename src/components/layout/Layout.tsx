import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <main className={`flex-grow ${isLoginPage ? 'flex items-center justify-center' : 'pt-20'}`}>
        <div className={`${isLoginPage ? '' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'}`}>
          {children}
        </div>
      </main>
      
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">GymHub</h3>
              <p className="text-gray-400 text-sm">
                Your complete gym management solution for both admins and members.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="text-gray-400 text-sm space-y-2">
                <li><a href="#" className="hover:text-white transition duration-150">Home</a></li>
                <li><a href="#" className="hover:text-white transition duration-150">Features</a></li>
                <li><a href="#" className="hover:text-white transition duration-150">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition duration-150">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p className="text-gray-400 text-sm">
                123 Fitness Street<br />
                Exercise City, EC 12345<br />
                contact@gymhub.com<br />
                (555) 123-4567
              </p>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} GymHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
