import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/layout/Layout';
import Login from './pages/Login';
import AdminDashboard from './pages/admin/Dashboard';
import MemberDashboard from './pages/member/Dashboard';
import MemberList from './pages/admin/MemberList';
import BookClass from './pages/member/BookClass';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

const DashboardRouter = () => {
  const { isAdmin } = useAuth();
  
  return isAdmin ? <AdminDashboard /> : <MemberDashboard />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardRouter />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/agendar-aula" 
              element={
                <ProtectedRoute>
                  <BookClass />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/alunos" 
              element={
                <AdminRoute>
                  <MemberList />
                </AdminRoute>
              } 
            />
            
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;