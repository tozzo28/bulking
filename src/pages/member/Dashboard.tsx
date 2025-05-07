import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { getMember } from '../../data/mockData';
import { 
  Calendar, 
  TrendingUp, 
  Clock, 
  Activity, 
  ChevronRight,
  AlertCircle 
} from 'lucide-react';

const MemberDashboard = () => {
  const { currentUser, isAuthenticated } = useAuth();
  
  // Get member data
  const member = currentUser ? getMember(currentUser.id) : null;
  
  // Redirect if not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (!member) {
    return <div className="text-center py-8">
      <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
      <h3 className="mt-2 text-lg font-medium text-gray-900">Member data not found</h3>
      <p className="mt-1 text-gray-500">There was a problem retrieving your member information.</p>
    </div>;
  }

  // Sort workouts by date (newest first)
  const recentWorkouts = [...member.workouts].sort((a, b) => 
    b.date.getTime() - a.date.getTime()
  ).slice(0, 3);
  
  // Get upcoming classes
  const upcomingClasses = member.bookedClasses
    .filter(booking => !booking.attended && booking.class.startTime > new Date())
    .sort((a, b) => a.class.startTime.getTime() - b.class.startTime.getTime())
    .slice(0, 2);
  
  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Calculate days until membership expiry
  const daysUntilExpiry = Math.ceil(
    (member.expiryDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );
  
  return (
    <div>
      {/* Welcome Header */}
      <div className="bg-blue-600 text-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {member.name.split(' ')[0]}</h1>
            <p className="mt-2 text-blue-100">
              Your fitness journey continues. Let's make today count!
            </p>
          </div>
          <div className="mt-4 md:mt-0 bg-white text-blue-600 rounded-lg p-3 shadow-inner">
            <div className="text-sm">Membership Status</div>
            <div className="font-bold">{member.membershipType.charAt(0).toUpperCase() + member.membershipType.slice(1)}</div>
            <div className="text-sm">
              {daysUntilExpiry > 0 
                ? `${daysUntilExpiry} days remaining` 
                : 'Expired'}
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-5">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-indigo-100 text-indigo-600 mr-4">
              <Calendar size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Last Check-in</p>
              <p className="font-semibold text-gray-800">
                {member.lastCheckIn 
                  ? member.lastCheckIn.toLocaleDateString() 
                  : 'Never'
                }
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-5">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
              <TrendingUp size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Workouts This Month</p>
              <p className="font-semibold text-gray-800">
                {member.workouts.filter(w => {
                  const now = new Date();
                  const start = new Date(now.getFullYear(), now.getMonth(), 1);
                  return w.date >= start;
                }).length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-5">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-amber-100 text-amber-600 mr-4">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Classes Booked</p>
              <p className="font-semibold text-gray-800">
                {member.bookedClasses.filter(b => !b.attended).length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-5">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100 text-red-600 mr-4">
              <Activity size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Avg. Workout Duration</p>
              <p className="font-semibold text-gray-800">
                {member.workouts.length > 0 
                  ? `${Math.round(member.workouts.reduce((sum, w) => sum + w.duration, 0) / member.workouts.length)} min` 
                  : 'N/A'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Upcoming Classes & Recent Workouts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Upcoming Classes */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="border-b border-gray-200 bg-gray-50 px-5 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-800">Upcoming Classes</h2>
              <a href="/book-class" className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                Book Class
                <ChevronRight size={16} className="ml-1" />
              </a>
            </div>
          </div>
          
          <div className="p-2">
            {upcomingClasses.length > 0 ? (
              upcomingClasses.map((booking) => (
                <div 
                  key={booking.id} 
                  className="p-4 m-2 border border-gray-100 rounded-lg hover:bg-gray-50 transition duration-150"
                >
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4">
                      {booking.class.imageUrl ? (
                        <img 
                          src={booking.class.imageUrl} 
                          alt={booking.class.name} 
                          className="h-16 w-16 rounded-md object-cover"
                        />
                      ) : (
                        <div className="h-16 w-16 bg-blue-100 rounded-md flex items-center justify-center">
                          <Calendar size={24} className="text-blue-600" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{booking.class.name}</h3>
                      <p className="text-sm text-gray-600">
                        with {booking.class.instructor}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {formatDate(booking.class.startTime)}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {booking.class.location}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center">
                <p className="text-gray-500">No upcoming classes booked</p>
                <a href="/book-class" className="text-blue-600 hover:text-blue-800 mt-2 inline-block font-medium">
                  Browse available classes
                </a>
              </div>
            )}
          </div>
        </div>
        
        {/* Recent Workouts */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="border-b border-gray-200 bg-gray-50 px-5 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-800">Recent Workouts</h2>
              <a href="/workouts" className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                View All
                <ChevronRight size={16} className="ml-1" />
              </a>
            </div>
          </div>
          
          <div className="p-2">
            {recentWorkouts.length > 0 ? (
              recentWorkouts.map((workout) => (
                <div 
                  key={workout.id} 
                  className="p-4 m-2 border border-gray-100 rounded-lg hover:bg-gray-50 transition duration-150"
                >
                  <div>
                    <div className="flex justify-between mb-2">
                      <h3 className="text-lg font-medium text-gray-900">
                        {workout.date.toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </h3>
                      <span className="text-gray-500 text-sm">{workout.duration} min</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      {workout.exercises.slice(0, 4).map((exercise, i) => (
                        <div key={`${workout.id}-ex-${i}`} className="text-sm">
                          <span className="font-medium">{exercise.name}</span>
                          <span className="text-gray-500"> • {exercise.sets.length} sets</span>
                        </div>
                      ))}
                      
                      {workout.exercises.length > 4 && (
                        <div className="text-sm text-gray-500">
                          +{workout.exercises.length - 4} more
                        </div>
                      )}
                    </div>
                    
                    {workout.notes && (
                      <p className="text-sm text-gray-500 mt-2 italic">
                        "{workout.notes}"
                      </p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center">
                <p className="text-gray-500">No workout history found</p>
                <a href="/workouts/new" className="text-blue-600 hover:text-blue-800 mt-2 inline-block font-medium">
                  Log a new workout
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Membership Info */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-lg font-medium text-gray-800 mb-4">Your Membership</h2>
        
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg text-white p-5 shadow-md">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <h3 className="text-xl font-bold">{member.membershipType.charAt(0).toUpperCase() + member.membershipType.slice(1)} Membership</h3>
              <p className="text-blue-100 mt-1">Member since {member.memberSince.toLocaleDateString()}</p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <div className="text-sm text-blue-100">Membership expires on</div>
              <div className="font-bold">{member.expiryDate.toLocaleDateString()}</div>
              {daysUntilExpiry <= 30 && daysUntilExpiry > 0 && (
                <div className="text-sm bg-yellow-500 text-white px-2 py-1 rounded-full mt-2 text-center">
                  Expiring soon!
                </div>
              )}
              {daysUntilExpiry <= 0 && (
                <div className="text-sm bg-red-500 text-white px-2 py-1 rounded-full mt-2 text-center">
                  Expired
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-6">
            <a 
              href="/membership" 
              className="inline-block bg-white text-blue-600 hover:bg-blue-50 font-medium px-4 py-2 rounded-lg shadow-sm transition duration-150"
            >
              Manage Membership
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;