// Tipos de Enum
export type UserRole = 'admin' | 'support' | 'user';
export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high';

// Tipos de Erro
export interface ApiError {
  status: number;
  message: string;
  errors?: any;
}

// Tipos de Autenticação
export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: UserRole;
  };
}

// Tipos de Usuário
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

// Tipos de Ticket
export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  category: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  assigned_to?: string;
  due_date?: string;
  attachments?: string[];
}

export interface TicketUpdate {
  title?: string;
  description?: string;
  status?: TicketStatus;
  priority?: TicketPriority;
  category?: string;
  assigned_to?: string;
  due_date?: string;
  attachments?: string[];
}

// Tipos de Configuração
export interface Config {
  port: number;
  environment: string;
  logLevel: string;
  jwtSecret: string;
  jwtExpiresIn: string;
  supabaseUrl: string;
  supabaseAnonKey: string;
  clientUrl: string;
}

// Tipos do Banco de Dados
export type DatabaseTypes = {
  Tables: {
    profiles: {
      Row: {
        id: string;
        nome: string;
        empresa: string | null;
        telefone: string | null;
        avatar_url: string | null;
        role: UserRole;
        created_at: string;
        updated_at: string;
      }
      Insert: {
        id: string;
        nome: string;
        empresa?: string | null;
        telefone?: string | null;
        avatar_url?: string | null;
        role?: UserRole;
        created_at?: string;
        updated_at?: string;
      }
      Update: {
        id?: string;
        nome?: string;
        empresa?: string | null;
        telefone?: string | null;
        avatar_url?: string | null;
        role?: UserRole;
        created_at?: string;
        updated_at?: string;
      }
      Relationships: [
        {
          foreignKeyName: "profiles_id_fkey";
          columns: ["id"];
          isOneToOne: true;
          referencedRelation: "auth.users";
          referencedColumns: ["id"];
        }
      ];
    };
    chamados: {
      Row: {
        id: string;
        usuario_id: string;
        titulo: string;
        descricao: string;
        categoria: string;
        prioridade: TicketPriority;
        status: TicketStatus;
        tecnico_id: string | null;
        created_at: string;
        updated_at: string;
      }
      Insert: {
        id?: string;
        usuario_id: string;
        titulo: string;
        descricao: string;
        categoria: string;
        prioridade: TicketPriority;
        status?: TicketStatus;
        tecnico_id?: string | null;
        created_at?: string;
        updated_at?: string;
      }
      Update: {
        id?: string;
        usuario_id?: string;
        titulo?: string;
        descricao?: string;
        categoria?: string;
        prioridade?: TicketPriority;
        status?: TicketStatus;
        tecnico_id?: string | null;
        created_at?: string;
        updated_at?: string;
      }
      Relationships: [
        {
          foreignKeyName: "chamados_usuario_id_fkey";
          columns: ["usuario_id"];
          isOneToOne: false;
          referencedRelation: "auth.users";
          referencedColumns: ["id"];
        },
        {
          foreignKeyName: "chamados_tecnico_id_fkey";
          columns: ["tecnico_id"];
          isOneToOne: false;
          referencedRelation: "auth.users";
          referencedColumns: ["id"];
        }
      ];
    };
    agendamentos: {
      Row: {
        id: string;
        usuario_id: string;
        chamado_id: string | null;
        data_agendamento: string;
        tipo_servico: string;
        descricao: string | null;
        status: TicketStatus;
        tecnico_id: string | null;
        created_at: string;
        updated_at: string;
      }
      Insert: {
        id?: string;
        usuario_id: string;
        chamado_id?: string | null;
        data_agendamento: string;
        tipo_servico: string;
        descricao?: string | null;
        status?: TicketStatus;
        tecnico_id?: string | null;
        created_at?: string;
        updated_at?: string;
      }
      Update: {
        id?: string;
        usuario_id?: string;
        chamado_id?: string | null;
        data_agendamento?: string;
        tipo_servico?: string;
        descricao?: string | null;
        status?: TicketStatus;
        tecnico_id?: string | null;
        created_at?: string;
        updated_at?: string;
      }
      Relationships: [
        {
          foreignKeyName: "agendamentos_usuario_id_fkey";
          columns: ["usuario_id"];
          isOneToOne: false;
          referencedRelation: "auth.users";
          referencedColumns: ["id"];
        },
        {
          foreignKeyName: "agendamentos_chamado_id_fkey";
          columns: ["chamado_id"];
          isOneToOne: false;
          referencedRelation: "chamados";
          referencedColumns: ["id"];
        },
        {
          foreignKeyName: "agendamentos_tecnico_id_fkey";
          columns: ["tecnico_id"];
          isOneToOne: false;
          referencedRelation: "auth.users";
          referencedColumns: ["id"];
        }
      ];
    };
  };
};

// Tipos de Autenticação
export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: UserRole;
  };
}

// Tipos de Usuário
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
}

export interface JwtPayload {
  id: string;
  email: string;
  role: UserRole;
  iat: number;
  exp: number;
}

// Tipos de Ticket
export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  category: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  assigned_to?: string;
  due_date?: string;
  attachments?: string[];
}

export interface TicketUpdate {
  title?: string;
  description?: string;
  status?: TicketStatus;
  priority?: TicketPriority;
  category?: string;
  assigned_to?: string;
  due_date?: string;
  attachments?: string[];
}
