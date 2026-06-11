// // src/services/index.ts
// // Campos 100% alinhados com o schema.prisma real
// import { api } from '../lib/api'

// export interface Toy { id:string; name:string; type:string; maxCapacity:number; defaultMinutes:number; pricePerSession:number; isActive:boolean; createdAt:string }
// export interface TimeExtension { id:string; sessionId:string; minutes:number; amountCents:number; createdAt:string }
// export interface ChildSession {
//   id:string; childName:string; parentName:string; phone:string; toyId:string; toy:Toy
//   userId:string; user:{ id:string; name:string; username:string }
//   scheduledTime:string|null; startedAt:string|null; endedAt:string|null
//   durationMinutes:number; isPaused:boolean; pausedAt:string|null
//   status:'SCHEDULED'|'ACTIVE'|'PAUSED'|'ENDED'|'CANCELLED'
//   paymentStatus:'PENDING'|'PAID'|'REFUNDED'; amountCents:number
//   notes:string|null; timeExtensions:TimeExtension[]; createdAt:string; updatedAt:string
// }
// export interface User { id:string; name:string; username:string; email:string|null; phone:string|null; avatarUrl:string|null; isActive:boolean; role:string; createdAt:string }
// export interface DailyReport { totalTickets:number; totalArrecadado:number; pendentePagamento:number; brinquedos:{nome:string;emoji:string;total:number}[]; atendentes:{nome:string;total:number}[]; porStatus:Record<string,number>; ultimaAtualizacao:string }
// export interface MonthlyReport { periodo:{inicio:string;fim:string}; totalTickets:number; totalArrecadado:number; brinquedos:{nome:string;emoji:string;total:number}[]; atendentes:{nome:string;total:number}[]; porDia:{dia:string;tickets:number;arrecadado:number}[] }

// export const toysService = {
//   getAll: () => api.get<Toy[]>('/toys'),
//   getOne: (id:string) => api.get<Toy>(`/toys/${id}`),
//   create: (b:{name:string;type:string;maxCapacity?:number}) => api.post<Toy>('/toys',b),
//   update: (id:string,b:Partial<Toy>) => api.patch<Toy>(`/toys/${id}`,b),
//   remove: (id:string) => api.delete<void>(`/toys/${id}`),
// }

// export const childrenService = {
//   getActive: () => api.get<ChildSession[]>('/children/active'),
//   getAll: (p?:Record<string,string>) => api.get<ChildSession[]>(`/children${p?'?'+new URLSearchParams(p):''}`),
//   getOne: (id:string) => api.get<ChildSession>(`/children/${id}`),
//   create: (b:{childName:string;parentName:string;phone:string;toyId:string;scheduledTime:string;extraMinutes?:number;notes?:string}) => api.post<ChildSession>('/children',b),
//   update: (id:string,b:{childName?:string;parentName?:string;phone?:string;notes?:string}) => api.patch<ChildSession>(`/children/${id}`,b),
//   start:    (id:string) => api.patch<ChildSession>(`/children/${id}/start`),
//   pause:    (id:string) => api.patch<ChildSession>(`/children/${id}/pause`),
//   addTime:  (id:string,minutes:number) => api.patch<ChildSession>(`/children/${id}/add-time`,{ minutes }),
//   tick:     (id:string,timeRemainingSec:number) => api.patch<ChildSession>(`/children/${id}/tick`,{ timeRemainingSec }),
//   end:      (id:string) => api.patch<ChildSession>(`/children/${id}/end`),
//   markPaid: (id:string) => api.patch<ChildSession>(`/children/${id}/payment`),
//   remove:   (id:string) => api.delete<void>(`/children/${id}`),
// }

// export const usersService = {
//   getAll: () => api.get<User[]>('/users'),
//   getOne: (id:string) => api.get<User>(`/users/${id}`),
//   create: (b:{name:string;username:string;password:string;roleName:'GERENTE'|'ATENDENTE';email?:string}) => api.post<User>('/users',b),
//   update: (id:string,b:Partial<Pick<User,'name'|'email'|'phone'|'avatarUrl'|'isActive'>>) => api.patch<User>(`/users/${id}`,b),
//   changeRole: (id:string,roleName:'GERENTE'|'ATENDENTE') => api.patch<User>(`/users/${id}/role`,{ roleName }),
//   remove: (id:string) => api.delete<void>(`/users/${id}`),
// }

// export const reportsService = {
//   daily: () => api.get<DailyReport>('/reports/daily'),
//   monthly: (year:number,month:number) => api.get<MonthlyReport>(`/reports/monthly?year=${year}&month=${month}`),
// }
// src/services/index.ts
// SUBSTITUIR o arquivo inteiro.
// Adicionado: toysService.getSlots(), interface ToySlot, interface Toy com campos completos

import { api } from '../lib/api'

// ── Interfaces ────────────────────────────────────────────────

export interface Toy {
  id:              string
  name:            string
  slug:            string | null
  emoji:           string | null
  type:            string
  maxCapacity:     number
  defaultMinutes:  number
  pricePerSession: number
  isActive:        boolean
  createdAt:       string
}

export interface ToySlot {
  time:       string   // "HH:MM"
  ocupado:    number   // quantas sessões ativas nesse horário
  capacidade: number   // maxCapacity do brinquedo
  disponivel: boolean  // ocupado < capacidade
}

export interface TimeExtension {
  id:         string
  sessionId:  string
  minutes:    number
  amountCents: number
  createdAt:  string
}

export interface ChildSession {
  id:             string
  childName:      string
  parentName:     string
  phone:          string
  toyId:          string
  toy:            Toy
  userId:         string
  user:           { id: string; name: string; username: string }
  scheduledTime:  string | null
  startedAt:      string | null
  endedAt:        string | null
  durationMinutes: number
  isPaused:       boolean
  pausedAt:       string | null
  status:         'SCHEDULED' | 'ACTIVE' | 'PAUSED' | 'ENDED' | 'CANCELLED'
  paymentStatus:  'PENDING' | 'PAID' | 'REFUNDED'
  amountCents:    number
  notes:          string | null
  timeExtensions: TimeExtension[]
  createdAt:      string
  updatedAt:      string
}

export interface User {
  id:        string
  name:      string
  username:  string
  email:     string | null
  phone:     string | null
  avatarUrl: string | null
  isActive:  boolean
  role:      string
  createdAt: string
}

export interface DailyReport {
  totalTickets:       number
  totalArrecadado:    number
  pendentePagamento:  number
  brinquedos:         { nome: string; emoji: string; total: number }[]
  atendentes:         { nome: string; total: number }[]
  porStatus:          Record<string, number>
  ultimaAtualizacao:  string
}

export interface MonthlyReport {
  periodo:         { inicio: string; fim: string }
  totalTickets:    number
  totalArrecadado: number
  brinquedos:      { nome: string; emoji: string; total: number }[]
  atendentes:      { nome: string; total: number }[]
  porDia:          { dia: string; tickets: number; arrecadado: number }[]
}

// ── Services ──────────────────────────────────────────────────

export const toysService = {
  getAll:    ()                       => api.get<Toy[]>('/toys'),
  getOne:    (id: string)             => api.get<Toy>(`/toys/${id}`),
  getSlots:  (id: string, date?: string) =>
    api.get<ToySlot[]>(`/toys/${id}/slots${date ? `?date=${date}` : ''}`),
  create: (body: {
    name:             string
    emoji?:           string
    type?:            string
    maxCapacity?:     number
    defaultMinutes?:  number
    pricePerSession?: number
  }) => api.post<Toy>('/toys', body),
  update: (id: string, body: Partial<Omit<Toy, 'id' | 'createdAt'>>) =>
    api.patch<Toy>(`/toys/${id}`, body),
  remove:    (id: string)             => api.delete<void>(`/toys/${id}`),
  reativar:  (id: string)             => api.patch<Toy>(`/toys/${id}`, { isActive: true }),
}

export const childrenService = {
  getActive: () => api.get<ChildSession[]>('/children/active'),
  getAll: (p?: Record<string, string>) =>
    api.get<ChildSession[]>(`/children${p ? '?' + new URLSearchParams(p) : ''}`),
  getOne:    (id: string)             => api.get<ChildSession>(`/children/${id}`),
  create: (body: {
    childName:     string
    parentName:    string
    phone:         string
    toyId:         string
    scheduledTime: string
    extraMinutes?: number
    notes?:        string
  }) => api.post<ChildSession>('/children', body),
  update:    (id: string, body: Partial<ChildSession>) =>
    api.patch<ChildSession>(`/children/${id}`, body),
  start:     (id: string)             => api.patch<ChildSession>(`/children/${id}/start`),
  pause:     (id: string)             => api.patch<ChildSession>(`/children/${id}/pause`),
  addTime:   (id: string, min: number) =>
    api.patch<ChildSession>(`/children/${id}/add-time`, { minutes: min }),
  tick:      (id: string, sec: number) =>
    api.patch<ChildSession>(`/children/${id}/tick`, { remainingSeconds: sec }),
  end:       (id: string)             => api.patch<ChildSession>(`/children/${id}/end`),
  markPaid:  (id: string)             => api.patch<ChildSession>(`/children/${id}/payment`),
  remove:    (id: string)             => api.delete<void>(`/children/${id}`),
}

export const usersService = {
  getAll:    ()                       => api.get<User[]>('/users'),
  getOne:    (id: string)             => api.get<User>(`/users/${id}`),
  create: (body: {
    name:     string
    username: string
    password: string
    roleName: 'GERENTE' | 'ATENDENTE'
  }) => api.post<User>('/users', body),
  update:     (id: string, body: Partial<User>) =>
    api.patch<User>(`/users/${id}`, body),
  changeRole: (id: string, roleName: 'GERENTE' | 'ATENDENTE') =>
    api.patch<User>(`/users/${id}/role`, { roleName }),
  remove:     (id: string)            => api.delete<void>(`/users/${id}`),
}

export const reportsService = {
  daily:   ()                               => api.get<DailyReport>('/reports/daily'),
  monthly: (year: number, month: number)    =>
    api.get<MonthlyReport>(`/reports/monthly?year=${year}&month=${month}`),
}