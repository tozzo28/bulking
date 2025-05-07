import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { MEMBERS, FITNESS_CLASSES } from '../../data/mockData';
import { Users, Calendar, DollarSign, BarChart2 } from 'lucide-react';

const AdminDashboard = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const [stats, setStats] = useState({
    totalMembers: 0,
    activeClasses: 0,
    revenueThisMonth: 0,
    checkInsToday: 0
  });
  
  useEffect(() => {
    // Calculate dashboard statistics
    const totalMembers = MEMBERS.length;
    const activeClasses = FITNESS_CLASSES.length;
    
    // Calculate mock revenue (would come from actual payment data in real app)
    const revenueThisMonth = MEMBERS.reduce((sum, member) => {
      // Using membership type to determine monthly revenue
      let amount = 0;
      switch(member.membershipType) {
        case 'basic': amount = 29.99; break;
        case 'standard': amount = 49.99; break;
        case 'premium': amount = 79.99; break;
        default: amount = 0;
      }
      return sum + amount;
    }, 0);
    
    // Calculate check-ins today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const checkInsToday = MEMBERS.reduce((count, member) => {
      if (member.lastCheckIn && member.lastCheckIn >= today) {
        return count + 1;
      }
      return count;
    }, 0);
    
    setStats({
      totalMembers,
      activeClasses,
      revenueThisMonth,
      checkInsToday
    });
  }, []);
  
  // Redirect if not logged in or not admin
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to the GymHub admin dashboard.</p>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
              <Users size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Total Members</p>
              <p className="text-2xl font-bold text-gray-800">{stats.totalMembers}</p>
            </div>
          </div>
          <div className="mt-4">
            <a href="/members" className="text-sm text-blue-600 hover:underline">
              View all members →
            </a>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
              <Calendar size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Active Classes</p>
              <p className="text-2xl font-bold text-gray-800">{stats.activeClasses}</p>
            </div>
          </div>
          <div className="mt-4">
            <a href="/classes" className="text-sm text-green-600 hover:underline">
              Manage classes →
            </a>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
              <DollarSign size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Monthly Revenue</p>
              <p className="text-2xl font-bold text-gray-800">${stats.revenueThisMonth.toFixed(2)}</p>
            </div>
          </div>
          <div className="mt-4">
            <a href="/finances" className="text-sm text-purple-600 hover:underline">
              View finances →
            </a>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-amber-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-amber-100 text-amber-600 mr-4">
              <BarChart2 size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Check-ins Today</p>
              <p className="text-2xl font-bold text-gray-800">{stats.checkInsToday}</p>
            </div>
          </div>
          <div className="mt-4">
            <a href="/attendance" className="text-sm text-amber-600 hover:underline">
              View attendance →
            </a>
          </div>
        </div>
      </div>
      
      {/* Recent Activity & Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
          <ul className="space-y-4">
            <li className="border-b pb-3">
              <p className="text-gray-800">New member <span className="font-medium">Sarah Jones</span> signed up</p>
              <p className="text-sm text-gray-500 mt-1">2 hours ago</p>
            </li>
            <li className="border-b pb-3">
              <p className="text-gray-800"><span className="font-medium">HIIT Workout</span> class is now fully booked</p>
              <p className="text-sm text-gray-500 mt-1">5 hours ago</p>
            </li>
            <li className="border-b pb-3">
              <p className="text-gray-800">Membership renewal for <span className="font-medium">David Miller</span></p>
              <p className="text-sm text-gray-500 mt-1">Yesterday</p>
            </li>
            <li className="border-b pb-3">
              <p className="text-gray-800">New class <span className="font-medium">Zumba</span> added to schedule</p>
              <p className="text-sm text-gray-500 mt-1">2 days ago</p>
            </li>
            <li>
              <p className="text-gray-800">Equipment maintenance completed</p>
              <p className="text-sm text-gray-500 mt-1">3 days ago</p>
            </li>
          </ul>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Tasks</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <input type="checkbox" className="mt-1 mr-3" />
              <div>
                <p className="text-gray-800">Contact members with expiring memberships</p>
                <p className="text-sm text-gray-500">5 members have memberships expiring this week</p>
              </div>
            </li>
            <li className="flex items-start">
              <input type="checkbox" className="mt-1 mr-3" />
              <div>
                <p className="text-gray-800">Review and update class schedule</p>
                <p className="text-sm text-gray-500">Due by Friday</p>
              </div>
            </li>
            <li className="flex items-start">
              <input type="checkbox" className="mt-1 mr-3" checked />
              <div>
                <p className="text-gray-800 line-through">Order new equipment</p>
                <p className="text-sm text-gray-500 line-through">Completed yesterday</p>
              </div>
            </li>
            <li className="flex items-start">
              <input type="checkbox" className="mt-1 mr-3" />
              <div>
                <p className="text-gray-800">Process refund request for Jessica Williams</p>
                <p className="text-sm text-gray-500">Requested on Monday</p>
              </div>
            </li>
            <li className="flex items-start">
              <input type="checkbox" className="mt-1 mr-3" />
              <div>
                <p className="text-gray-800">Monthly financial report</p>
                <p className="text-sm text-gray-500">Due by end of month</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Latest Members */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Latest Members</h2>
          <a href="/members" className="text-sm text-blue-600 hover:underline">View all</a>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {MEMBERS.slice(0, 5).map(member => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {member.profilePicture ? (
                        <img 
                          src={member.profilePicture} 
                          alt={member.name} 
                          className="h-10 w-10 rounded-full object-cover mr-3"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <span className="text-blue-600 font-medium">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900">{member.name}</div>
                        <div className="text-sm text-gray-500">{member.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      member.membershipType === 'premium' ? 'bg-purple-100 text-purple-800' :
                      member.membershipType === 'standard' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {member.membershipType.charAt(0).toUpperCase() + member.membershipType.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {member.memberSince.toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      new Date() > member.expiryDate ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {new Date() > member.expiryDate ? 'Expired' : 'Active'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;