import { 
  Member, 
  MembershipPlan, 
  FitnessClass,
  Workout,
  Exercise,
  AttendanceRecord,
  ClassCategory
} from '../types';

// Generate a date X days ago
const daysAgo = (days: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
};

// Generate a future date X days from now
const daysFromNow = (days: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

// Mock membership plans
export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: '1',
    name: 'Plano Básico',
    type: 'basic',
    price: 89.99,
    duration: 1,
    description: 'Acesso às instalações básicas da academia durante horário padrão',
    features: [
      'Acesso aos equipamentos',
      'Acesso aos vestiários',
      'Horário comercial',
      'Gestão online da conta',
    ],
  },
  {
    id: '2',
    name: 'Plano Padrão',
    type: 'standard',
    price: 129.99,
    duration: 1,
    description: 'Acesso completo à academia e algumas aulas em grupo',
    features: [
      'Todos os benefícios do Plano Básico',
      'Acesso às aulas em grupo',
      'Avaliação física',
      'Horário estendido',
      'Desconto em personal trainer',
    ],
  },
  {
    id: '3',
    name: 'Plano Premium',
    type: 'premium',
    price: 199.99,
    duration: 1,
    description: 'Acesso ilimitado a todas as instalações e aulas com benefícios adicionais',
    features: [
      'Todos os benefícios do Plano Padrão',
      'Aulas em grupo ilimitadas',
      'Convites para amigos',
      'Acesso 24/7',
      'Consulta nutricional',
      'Plano de treino personalizado',
      'Acesso à área VIP',
    ],
  },
  {
    id: '4',
    name: 'Básico Anual',
    type: 'basic',
    price: 899.99,
    duration: 12,
    description: 'Plano básico com desconto no pagamento anual',
    features: [
      'Todos os benefícios do Plano Básico',
      '15% de desconto no pagamento anual',
    ],
  },
  {
    id: '5',
    name: 'Padrão Anual',
    type: 'standard',
    price: 1299.99,
    duration: 12,
    description: 'Plano padrão com desconto no pagamento anual',
    features: [
      'Todos os benefícios do Plano Padrão',
      '15% de desconto no pagamento anual',
    ],
  },
  {
    id: '6',
    name: 'Premium Anual',
    type: 'premium',
    price: 1999.99,
    duration: 12,
    description: 'Plano premium com desconto no pagamento anual',
    features: [
      'Todos os benefícios do Plano Premium',
      '15% de desconto no pagamento anual',
      'Kit de treino exclusivo',
    ],
  },
];

// Mock fitness classes
export const FITNESS_CLASSES: FitnessClass[] = [
  {
    id: '1',
    name: 'Yoga Matinal',
    description: 'Comece seu dia com uma sessão revigorante de yoga para aumentar flexibilidade e mindfulness.',
    instructor: 'Sarah Johnson',
    startTime: new Date(new Date().setHours(8, 0, 0, 0)),
    endTime: new Date(new Date().setHours(9, 0, 0, 0)),
    maxCapacity: 20,
    currentAttendees: 12,
    location: 'Sala de Yoga',
    imageUrl: 'https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg',
    category: 'yoga',
    recurrent: true,
    weekDays: [1, 3, 5], // Segunda, Quarta, Sexta
    difficulty: 'iniciante',
    requirements: ['Trazer tapete de yoga', 'Roupa confortável']
  },
  {
    id: '2',
    name: 'HIIT Intenso',
    description: 'Treinamento intervalado de alta intensidade para queimar calorias e melhorar o condicionamento.',
    instructor: 'Mike Peters',
    startTime: new Date(new Date().setHours(17, 30, 0, 0)),
    endTime: new Date(new Date().setHours(18, 30, 0, 0)),
    maxCapacity: 15,
    currentAttendees: 13,
    location: 'Área Funcional',
    imageUrl: 'https://images.pexels.com/photos/4098236/pexels-photo-4098236.jpeg',
    category: 'funcional',
    recurrent: true,
    weekDays: [2, 4], // Terça e Quinta
    difficulty: 'avançado',
    requirements: ['Tênis apropriado', 'Toalha']
  },
  {
    id: '3',
    name: 'Pilates Core',
    description: 'Fortaleça seu core com movimentos controlados e técnicas de respiração.',
    instructor: 'Emma Rodriguez',
    startTime: new Date(new Date().setHours(10, 15, 0, 0)),
    endTime: new Date(new Date().setHours(11, 15, 0, 0)),
    maxCapacity: 18,
    currentAttendees: 8,
    location: 'Sala de Pilates',
    imageUrl: 'https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg',
    category: 'pilates',
    recurrent: true,
    weekDays: [1, 3, 5], // Segunda, Quarta, Sexta
    difficulty: 'intermediário'
  },
  {
    id: '4',
    name: 'Spinning Power',
    description: 'Aula de ciclismo indoor com música motivacional e instruções dinâmicas.',
    instructor: 'James Wilson',
    startTime: new Date(new Date().setHours(18, 45, 0, 0)),
    endTime: new Date(new Date().setHours(19, 45, 0, 0)),
    maxCapacity: 25,
    currentAttendees: 20,
    location: 'Sala de Spinning',
    imageUrl: 'https://images.pexels.com/photos/4048516/pexels-photo-4048516.jpeg',
    category: 'spinning',
    recurrent: true,
    weekDays: [1, 2, 3, 4, 5], // Segunda a Sexta
    difficulty: 'intermediário',
    requirements: ['Toalha', 'Garrafa de água']
  },
  {
    id: '5',
    name: 'Musculação Guiada',
    description: 'Treino de força com orientação profissional para técnicas corretas.',
    instructor: 'David Kim',
    startTime: new Date(new Date().setHours(12, 0, 0, 0)),
    endTime: new Date(new Date().setHours(13, 0, 0, 0)),
    maxCapacity: 12,
    currentAttendees: 9,
    location: 'Área de Peso Livre',
    imageUrl: 'https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg',
    category: 'musculação',
    recurrent: true,
    weekDays: [1, 3, 5], // Segunda, Quarta, Sexta
    difficulty: 'iniciante',
    requirements: ['Luvas de treino (opcional)']
  },
  {
    id: '6',
    name: 'Zumba',
    description: 'Dança fitness divertida combinando ritmos latinos e internacionais.',
    instructor: 'Sofia Martinez',
    startTime: daysFromNow(1),
    endTime: new Date(daysFromNow(1).setHours(daysFromNow(1).getHours() + 1)),
    maxCapacity: 30,
    currentAttendees: 22,
    location: 'Salão Principal',
    imageUrl: 'https://images.pexels.com/photos/3775566/pexels-photo-3775566.jpeg',
    category: 'dança',
    recurrent: true,
    weekDays: [2, 4, 6], // Terça, Quinta, Sábado
    difficulty: 'iniciante'
  },
  {
    id: '7',
    name: 'CrossFit',
    description: 'Treino funcional de alta intensidade com exercícios variados.',
    instructor: 'Carlos Silva',
    startTime: new Date(new Date().setHours(7, 0, 0, 0)),
    endTime: new Date(new Date().setHours(8, 0, 0, 0)),
    maxCapacity: 15,
    currentAttendees: 12,
    location: 'Box CrossFit',
    imageUrl: 'https://images.pexels.com/photos/28080/pexels-photo.jpg',
    category: 'crossfit',
    recurrent: true,
    weekDays: [1, 3, 5], // Segunda, Quarta, Sexta
    difficulty: 'avançado',
    requirements: ['Tênis apropriado', 'Luvas', 'Toalha']
  },
  {
    id: '8',
    name: 'Muay Thai',
    description: 'Arte marcial tailandesa para condicionamento e defesa pessoal.',
    instructor: 'Ricardo Santos',
    startTime: new Date(new Date().setHours(19, 0, 0, 0)),
    endTime: new Date(new Date().setHours(20, 0, 0, 0)),
    maxCapacity: 20,
    currentAttendees: 15,
    location: 'Sala de Lutas',
    imageUrl: 'https://images.pexels.com/photos/4804257/pexels-photo-4804257.jpeg',
    category: 'lutas',
    recurrent: true,
    weekDays: [2, 4], // Terça e Quinta
    difficulty: 'intermediário',
    requirements: ['Bandagens', 'Protetor bucal']
  }
];

// Mock exercises for workouts
const EXERCISES: Exercise[] = [
  {
    id: '1',
    name: 'Supino Reto',
    sets: [
      { reps: 10, weight: 60, completed: true },
      { reps: 8, weight: 70, completed: true },
      { reps: 6, weight: 80, completed: true },
    ],
    notes: 'Foco na forma',
  },
  {
    id: '2',
    name: 'Agachamento',
    sets: [
      { reps: 12, weight: 80, completed: true },
      { reps: 10, weight: 90, completed: true },
      { reps: 8, weight: 100, completed: true },
    ],
  },
  {
    id: '3',
    name: 'Barra Fixa',
    sets: [
      { reps: 8, completed: true },
      { reps: 6, completed: true },
      { reps: 6, completed: false },
    ],
    notes: 'Última série assistida',
  },
  {
    id: '4',
    name: 'Desenvolvimento',
    sets: [
      { reps: 10, weight: 40, completed: true },
      { reps: 8, weight: 45, completed: true },
      { reps: 6, weight: 50, completed: false },
    ],
  },
  {
    id: '5',
    name: 'Levantamento Terra',
    sets: [
      { reps: 8, weight: 100, completed: true },
      { reps: 6, weight: 120, completed: true },
      { reps: 4, weight: 140, completed: true },
    ],
    notes: 'Novo recorde pessoal',
  },
  {
    id: '6',
    name: 'Leg Press',
    sets: [
      { reps: 12, weight: 150, completed: true },
      { reps: 10, weight: 170, completed: true },
      { reps: 8, weight: 190, completed: true },
    ],
  },
  {
    id: '7',
    name: 'Rosca Direta',
    sets: [
      { reps: 12, weight: 15, completed: true },
      { reps: 10, weight: 17.5, completed: true },
      { reps: 8, weight: 20, completed: true },
    ],
  },
  {
    id: '8',
    name: 'Extensão Triceps',
    sets: [
      { reps: 12, weight: 20, completed: true },
      { reps: 10, weight: 25, completed: true },
      { reps: 8, weight: 30, completed: false },
    ],
  },
  {
    id: '9',
    name: 'Prancha',
    sets: [
      { reps: 1, duration: 60, completed: true },
      { reps: 1, duration: 45, completed: true },
      { reps: 1, duration: 30, completed: true },
    ],
  },
  {
    id: '10',
    name: 'Rotação Russa',
    sets: [
      { reps: 20, completed: true },
      { reps: 20, completed: true },
      { reps: 20, completed: false },
    ],
  },
];

// Create a mock workout with random exercises
const createMockWorkout = (id: string, memberId: string, date: Date): Workout => {
  // Randomly select 3-5 exercises
  const numExercises = Math.floor(Math.random() * 3) + 3;
  const exerciseIndices = new Set<number>();
  
  while (exerciseIndices.size < numExercises) {
    exerciseIndices.add(Math.floor(Math.random() * EXERCISES.length));
  }
  
  const selectedExercises = Array.from(exerciseIndices).map(index => EXERCISES[index]);
  
  return {
    id,
    memberId,
    date,
    exercises: selectedExercises,
    duration: 45 + Math.floor(Math.random() * 30), // 45-75 minutes
    notes: Math.random() > 0.7 ? 'Ótimo treino hoje!' : undefined,
  };
};

// Create mock attendance records for a member
const createMockAttendance = (memberId: string): AttendanceRecord[] => {
  const records: AttendanceRecord[] = [];
  
  // Create 10-20 attendance records over the past 30 days
  const numRecords = 10 + Math.floor(Math.random() * 11);
  
  for (let i = 0; i < numRecords; i++) {
    const daysBack = Math.floor(Math.random() * 30);
    const date = daysAgo(daysBack);
    
    // Set hours for check-in (between 6 AM and 8 PM)
    date.setHours(6 + Math.floor(Math.random() * 14), 
                 Math.floor(Math.random() * 60), 0, 0);
    
    const checkInTime = new Date(date);
    
    // Create check-out time 1-2 hours after check-in
    const checkOutTime = new Date(date);
    checkOutTime.setHours(checkOutTime.getHours() + 1 + Math.floor(Math.random() * 2));
    
    records.push({
      id: `attendance-${memberId}-${i}`,
      memberId,
      checkInTime,
      checkOutTime: Math.random() > 0.1 ? checkOutTime : undefined, // Some people forget to check out
    });
  }
  
  return records;
};

// Mock members
export const MEMBERS: Member[] = [
  {
    id: '2', // Match the mock user ID
    email: 'member@gymhub.com',
    name: 'João Silva',
    role: 'member',
    membershipId: '2',
    memberSince: daysAgo(120),
    membershipType: 'standard',
    expiryDate: daysFromNow(60),
    profilePicture: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg',
    phoneNumber: '(11) 98765-4321',
    emergencyContact: '(11) 98765-4322',
    lastCheckIn: daysAgo(2),
    attendanceHistory: [],
    workouts: [],
    bookedClasses: [
      {
        id: 'booking-1',
        memberId: '2',
        classId: '1',
        bookingDate: daysAgo(5),
        attended: true,
        class: FITNESS_CLASSES[0],
      },
      {
        id: 'booking-2',
        memberId: '2',
        classId: '2',
        bookingDate: daysAgo(3),
        attended: false,
        class: FITNESS_CLASSES[1],
      },
      {
        id: 'booking-3',
        memberId: '2',
        classId: '6',
        bookingDate: daysAgo(1),
        attended: false,
        class: FITNESS_CLASSES[5],
      },
    ],
  },
  {
    id: '3',
    email: 'maria.santos@exemplo.com',
    name: 'Maria Santos',
    role: 'member',
    membershipId: '3',
    memberSince: daysAgo(45),
    membershipType: 'premium',
    expiryDate: daysFromNow(315),
    profilePicture: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    phoneNumber: '(11) 98765-4323',
    lastCheckIn: daysAgo(1),
    attendanceHistory: [],
    workouts: [],
    bookedClasses: [],
  },
  {
    id: '4',
    email: 'pedro.oliveira@exemplo.com',
    name: 'Pedro Oliveira',
    role: 'member',
    membershipId: '1',
    memberSince: daysAgo(200),
    membershipType: 'basic',
    expiryDate: daysFromNow(10),
    phoneNumber: '(11) 98765-4324',
    emergencyContact: '(11) 98765-4325',
    lastCheckIn: daysAgo(4),
    attendanceHistory: [],
    workouts: [],
    bookedClasses: [],
  },
  {
    id: '5',
    email: 'ana.costa@exemplo.com',
    name: 'Ana Costa',
    role: 'member',
    membershipId: '2',
    memberSince: daysAgo(90),
    membershipType: 'standard',
    expiryDate: daysFromNow(30),
    profilePicture: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg',
    phoneNumber: '(11) 98765-4326',
    lastCheckIn: daysAgo(1),
    attendanceHistory: [],
    workouts: [],
    bookedClasses: [],
  },
  {
    id: '6',
    email: 'carlos.ferreira@exemplo.com',
    name: 'Carlos Ferreira',
    role: 'member',
    membershipId: '6',
    memberSince: daysAgo(300),
    membershipType: 'premium',
    expiryDate: daysFromNow(240),
    profilePicture: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    phoneNumber: '(11) 98765-4327',
    emergencyContact: '(11) 98765-4328',
    lastCheckIn: daysAgo(2),
    attendanceHistory: [],
    workouts: [],
    bookedClasses: [],
  },
  {
    id: '7',
    email: 'julia.almeida@exemplo.com',
    name: 'Júlia Almeida',
    role: 'member',
    membershipId: '4',
    memberSince: daysAgo(150),
    membershipType: 'basic',
    expiryDate: daysFromNow(215),
    phoneNumber: '(11) 98765-4329',
    lastCheckIn: daysAgo(10),
    attendanceHistory: [],
    workouts: [],
    bookedClasses: [],
  },
  {
    id: '8',
    email: 'roberto.silva@exemplo.com',
    name: 'Roberto Silva',
    role: 'member',
    membershipId: '5',
    memberSince: daysAgo(180),
    membershipType: 'standard',
    expiryDate: daysFromNow(180),
    profilePicture: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
    phoneNumber: '(11) 98765-4330',
    emergencyContact: '(11) 98765-4331',
    lastCheckIn: daysAgo(3),
    attendanceHistory: [],
    workouts: [],
    bookedClasses: [],
  },
];

// Add workouts and attendance data to members
MEMBERS.forEach((member) => {
  // Add 3-8 workouts per member over the past 30 days
  const numWorkouts = 3 + Math.floor(Math.random() * 6);
  const workouts: Workout[] = [];
  
  for (let i = 0; i < numWorkouts; i++) {
    const daysBack = Math.floor(Math.random() * 30);
    workouts.push(createMockWorkout(`workout-${member.id}-${i}`, member.id, daysAgo(daysBack)));
  }
  
  // Sort workouts by date (newest first)
  workouts.sort((a, b) => b.date.getTime() - a.date.getTime());
  
  // Add attendance records
  const attendance = createMockAttendance(member.id);
  
  // Update member with workouts and attendance
  member.workouts = workouts;
  member.attendanceHistory = attendance;
  
  // Book some random classes for members
  if (Math.random() > 0.5 && member.bookedClasses.length === 0) {
    const classIndex = Math.floor(Math.random() * FITNESS_CLASSES.length);
    member.bookedClasses.push({
      id: `booking-${member.id}-future`,
      memberId: member.id,
      classId: FITNESS_CLASSES[classIndex].id,
      bookingDate: new Date(),
      attended: false,
      class: FITNESS_CLASSES[classIndex],
    });
  }
});

export const getMember = (id: string): Member | undefined => {
  return MEMBERS.find(member => member.id === id);
};

export const getMembershipPlan = (id: string): MembershipPlan | undefined => {
  return MEMBERSHIP_PLANS.find(plan => plan.id === id);
};

export const getFitnessClass = (id: string): FitnessClass | undefined => {
  return FITNESS_CLASSES.find(cls => cls.id === id);
};