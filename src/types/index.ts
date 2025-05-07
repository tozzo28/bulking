// Type definitions for the application

// User roles
export type Role = 'admin' | 'member';

// Base user interface
export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
}

// Member-specific interface
export interface Member extends User {
  membershipId: string;
  memberSince: Date;
  membershipType: MembershipType;
  expiryDate: Date;
  profilePicture?: string;
  phoneNumber?: string;
  emergencyContact?: string;
  lastCheckIn?: Date;
  attendanceHistory: AttendanceRecord[];
  workouts: Workout[];
  bookedClasses: BookedClass[];
}

// Admin-specific interface
export interface Admin extends User {
  position: string;
  adminSince: Date;
}

// Membership types
export type MembershipType = 'basic' | 'standard' | 'premium';

// Membership plan details
export interface MembershipPlan {
  id: string;
  name: string;
  type: MembershipType;
  price: number;
  duration: number; // in months
  description: string;
  features: string[];
}

// Attendance record
export interface AttendanceRecord {
  id: string;
  memberId: string;
  checkInTime: Date;
  checkOutTime?: Date;
}

// Workout session
export interface Workout {
  id: string;
  memberId: string;
  date: Date;
  exercises: Exercise[];
  duration: number; // in minutes
  notes?: string;
}

// Exercise details
export interface Exercise {
  id: string;
  name: string;
  sets: ExerciseSet[];
  notes?: string;
}

// Exercise set
export interface ExerciseSet {
  reps: number;
  weight?: number; // in kg
  duration?: number; // in seconds, for timed exercises
  completed: boolean;
}

// Fitness class category
export type ClassCategory = 
  | 'musculação'
  | 'cardio'
  | 'yoga'
  | 'pilates'
  | 'dança'
  | 'funcional'
  | 'crossfit'
  | 'spinning'
  | 'lutas';

// Fitness class
export interface FitnessClass {
  id: string;
  name: string;
  description: string;
  instructor: string;
  startTime: Date;
  endTime: Date;
  maxCapacity: number;
  currentAttendees: number;
  location: string;
  imageUrl?: string;
  category: ClassCategory;
  recurrent: boolean;
  weekDays?: number[]; // 0-6, where 0 is Sunday
  difficulty: 'iniciante' | 'intermediário' | 'avançado';
  requirements?: string[];
}

// Booked class
export interface BookedClass {
  id: string;
  memberId: string;
  classId: string;
  bookingDate: Date;
  attended: boolean;
  class: FitnessClass;
  cancellationDate?: Date;
  cancellationReason?: string;
}