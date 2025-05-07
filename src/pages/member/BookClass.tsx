import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { FITNESS_CLASSES, getMember } from '../../data/mockData';
import { Calendar, Clock, Users, MapPin, Search, Filter, Check, X, AlertTriangle } from 'lucide-react';
import { ClassCategory } from '../../types';

const BookClass = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDay, setFilterDay] = useState('all');
  const [filterCategory, setFilterCategory] = useState<ClassCategory | 'all'>('all');
  const [filterDifficulty, setFilterDifficulty] = useState<'all' | 'iniciante' | 'intermediário' | 'avançado'>('all');
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [cancelReason, setCancelReason] = useState('');
  
  // Get member data
  const member = currentUser ? getMember(currentUser.id) : null;
  
  // Redirect if not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (!member) {
    return <div className="text-center py-8">Carregando dados do membro...</div>;
  }
  
  // Function to format date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'short',
      month: 'short', 
      day: 'numeric'
    });
  };
  
  // Function to format time
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get day name in Portuguese
  const getDayName = (day: number): string => {
    const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    return days[day];
  };
  
  // Filter classes based on search term and filters
  const filteredClasses = FITNESS_CLASSES.filter(fitnessClass => {
    const classStartTime = fitnessClass.startTime;
    const classDay = classStartTime.getDay();
    
    // Only show future classes
    if (classStartTime < new Date()) return false;
    
    // Search filter
    const matchesSearch = 
      searchTerm === '' || 
      fitnessClass.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fitnessClass.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fitnessClass.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Day filter
    const matchesDay = 
      filterDay === 'all' || 
      (filterDay === 'today' && classStartTime.toDateString() === new Date().toDateString()) ||
      (filterDay === 'tomorrow' && classStartTime.toDateString() === new Date(new Date().setDate(new Date().getDate() + 1)).toDateString()) ||
      (filterDay === 'weekend' && (classDay ===  0 || classDay === 6));

    // Category filter
    const matchesCategory = 
      filterCategory === 'all' || 
      fitnessClass.category === filterCategory;

    // Difficulty filter
    const matchesDifficulty = 
      filterDifficulty === 'all' || 
      fitnessClass.difficulty === filterDifficulty;
    
    return matchesSearch && matchesDay && matchesCategory && matchesDifficulty;
  });
  
  // Check if a class is already booked
  const isClassBooked = (classId: string) => {
    return member.bookedClasses.some(booking => booking.classId === classId && !booking.attended && !booking.cancellationDate);
  };
  
  // Function to handle booking a class
  const handleBookClass = (classId: string, className: string) => {
    // In a real app, this would make an API call to book the class
    
    // For demo purposes, just show a success message
    setBookingSuccess(className);
    
    // Hide the success message after 3 seconds
    setTimeout(() => {
      setBookingSuccess(null);
    }, 3000);
  };

  // Function to handle canceling a class
  const handleCancelClass = () => {
    if (!selectedClass || !cancelReason) return;

    // In a real app, this would make an API call to cancel the booking
    
    // For demo purposes, just show a success message
    setBookingSuccess(`Aula cancelada com sucesso`);
    setShowCancelModal(false);
    setSelectedClass(null);
    setCancelReason('');
    
    // Hide the success message after 3 seconds
    setTimeout(() => {
      setBookingSuccess(null);
    }, 3000);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Agendar Aula</h1>
        <p className="text-gray-600 mt-1">Navegue e agende suas aulas de fitness</p>
      </div>
      
      {/* Success Message */}
      {bookingSuccess && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded-md shadow-sm">
          <div className="flex">
            <div className="flex-shrink-0">
              <Check className="h-5 w-5 text-green-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">
                {bookingSuccess}
              </p>
              <p className="text-sm text-green-700 mt-1">
                A aula foi adicionada à sua agenda
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar aulas..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <Filter size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none w-full"
              value={filterDay}
              onChange={(e) => setFilterDay(e.target.value)}
            >
              <option value="all">Todos os Dias</option>
              <option value="today">Hoje</option>
              <option value="tomorrow">Amanhã</option>
              <option value="weekend">Fim de Semana</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          <div className="relative">
            <Filter size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none w-full"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value as ClassCategory | 'all')}
            >
              <option value="all">Todas as Categorias</option>
              <option value="musculação">Musculação</option>
              <option value="cardio">Cardio</option>
              <option value="yoga">Yoga</option>
              <option value="pilates">Pilates</option>
              <option value="dança">Dança</option>
              <option value="funcional">Funcional</option>
              <option value="crossfit">CrossFit</option>
              <option value="spinning">Spinning</option>
              <option value="lutas">Lutas</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          <div className="relative">
            <Filter size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none w-full"
              value={filterDifficulty}
              onChange={(e) => setFilterDifficulty(e.target.value as 'all' | 'iniciante' | 'intermediário' | 'avançado')}
            >
              <option value="all">Todos os Níveis</option>
              <option value="iniciante">Iniciante</option>
              <option value="intermediário">Intermediário</option>
              <option value="avançado">Avançado</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClasses.map(fitnessClass => (
          <div key={fitnessClass.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {fitnessClass.imageUrl ? (
              <div 
                className="h-48 bg-cover bg-center" 
                style={{ backgroundImage: `url(${fitnessClass.imageUrl})` }}
              />
            ) : (
              <div className="h-48 bg-blue-100 flex items-center justify-center">
                <Calendar size={48} className="text-blue-500" />
              </div>
            )}
            
            <div className="p-5">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{fitnessClass.name}</h3>
                  <span className={`mt-1 px-2 py-1 inline-flex text-xs leading-4 font-semibold rounded-full ${
                    fitnessClass.difficulty === 'avançado' ? 'bg-red-100 text-red-800' :
                    fitnessClass.difficulty === 'intermediário' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {fitnessClass.difficulty}
                  </span>
                </div>
                <span className={`px-2 py-1 inline-flex text-xs leading-4 font-semibold rounded-full ${
                  fitnessClass.currentAttendees >= fitnessClass.maxCapacity
                    ? 'bg-red-100 text-red-800'
                    : fitnessClass.currentAttendees >= fitnessClass.maxCapacity * 0.8
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-green-100 text-green-800'
                }`}>
                  {fitnessClass.currentAttendees >= fitnessClass.maxCapacity
                    ? 'Lotada'
                    : fitnessClass.currentAttendees >= fitnessClass.maxCapacity * 0.8
                    ? 'Quase Cheia'
                    : 'Disponível'}
                </span>
              </div>
              
              <div className="text-gray-500 text-sm mt-1">
                Prof. {fitnessClass.instructor}
              </div>
              
              <p className="text-gray-600 mt-2 text-sm line-clamp-2">
                {fitnessClass.description}
              </p>
              
              <div className="mt-4 space-y-2">
                {fitnessClass.recurrent ? (
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar size={16} className="mr-2" />
                    <span>
                      {fitnessClass.weekDays?.map(day => getDayName(day)).join(', ')}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar size={16} className="mr-2" />
                    <span>{formatDate(fitnessClass.startTime)}</span>
                  </div>
                )}
                
                <div className="flex items-center text-sm text-gray-500">
                  <Clock size={16} className="mr-2" />
                  <span>
                    {formatTime(fitnessClass.startTime)} - {formatTime(fitnessClass.endTime)}
                  </span>
                </div>
                
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin size={16} className="mr-2" />
                  <span>{fitnessClass.location}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-500">
                  <Users size={16} className="mr-2" />
                  <span>
                    {fitnessClass.currentAttendees} / {fitnessClass.maxCapacity} vagas preenchidas
                  </span>
                </div>

                {fitnessClass.requirements && fitnessClass.requirements.length > 0 && (
                  <div className="flex items-start text-sm text-gray-500">
                    <AlertTriangle size={16} className="mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Requisitos:</span>
                      <ul className="list-disc list-inside ml-2">
                        {fitnessClass.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-5">
                {isClassBooked(fitnessClass.id) ? (
                  <div className="space-y-2">
                    <button 
                      className="w-full bg-gray-100 text-gray-800 font-medium py-2 px-4 rounded-md focus:outline-none cursor-default"
                      disabled
                    >
                      Aula Agendada
                    </button>
                    <button 
                      className="w-full border border-red-500 text-red-500 hover:bg-red-50 font-medium py-2 px-4 rounded-md focus:outline-none transition duration-150"
                      onClick={() => {
                        setSelectedClass(fitnessClass.id);
                        setShowCancelModal(true);
                      }}
                    >
                      Cancelar Agendamento
                    </button>
                  </div>
                ) : fitnessClass.currentAttendees >= fitnessClass.maxCapacity ? (
                  <button 
                    className="w-full bg-gray-100 text-gray-800 font-medium py-2 px-4 rounded-md focus:outline-none cursor-default"
                    disabled
                  >
                    Aula Lotada
                  </button>
                ) : (
                  <button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150"
                    onClick={() => handleBookClass(fitnessClass.id, fitnessClass.name)}
                  >
                    Agendar Aula
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {filteredClasses.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500">
            <div className="flex flex-col items-center">
              <Calendar size={48} className="mb-2 text-gray-400" />
              <p className="text-lg font-medium">Nenhuma aula encontrada</p>
              <p className="text-sm mt-1">Tente ajustar seus filtros de busca</p>
            </div>
          </div>
        )}
      </div>

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <X className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Cancelar Agendamento
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Tem certeza que deseja cancelar esta aula? Esta ação não pode ser desfeita.
                      </p>
                      <div className="mt-4">
                        <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
                          Motivo do cancelamento
                        </label>
                        <select
                          id="reason"
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                          value={cancelReason}
                          onChange={(e) => setCancelReason(e.target.value)}
                        >
                          <option value="">Selecione um motivo</option>
                          <option value="schedule_conflict">Conflito de horário</option>
                          <option value="feeling_sick">Não estou me sentindo bem</option>
                          <option value="transportation">Problemas com transporte</option>
                          <option value="other">Outro motivo</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleCancelClass}
                  disabled={!cancelReason}
                >
                  Confirmar Cancelamento
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    setShowCancelModal(false);
                    setSelectedClass(null);
                    setCancelReason('');
                  }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookClass;