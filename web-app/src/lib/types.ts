import { Timestamp } from 'firebase/firestore';

export interface Usuario {
  uid: string | null;
  email: string | null;
  displayName: string | null;
  rol: 'profesor' | 'administrador' | 'apoderado' | null;
  colegioId: string | null;
  hijos: string[];
  loading?: boolean;
}

export interface Aviso {
  id: string;
  titulo: string;
  descripcion: string;
  fechaPublicacion: Timestamp;
  fechaEvento?: Timestamp | null;
  cursos: string[];
  archivos?: string[];
  profesorId: string | null;
  administradorId: string | null;
}

export interface Confirmacion {
  id: string;
  apoderadoId: string;
  fechaConfirmacion: Timestamp;
  leido: boolean;
}
