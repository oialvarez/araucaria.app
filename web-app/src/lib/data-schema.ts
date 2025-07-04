// Esquema de datos para Araucaria App
import { Timestamp } from 'firebase/firestore';

// 1. Colegios (colección: colegios)
interface Colegio {
  id: string; // Clave primaria, generado aleatoriamente
  nombre: string;
  direccion: string;
  telefono: string;
  email: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// 2. Usuarios (colección: users)
interface User {
  uid: string; // Clave primaria, generado por Firebase Auth
  email: string;
  nombre: string;
  rol: 'profesor' | 'apoderado' | 'administrador';
  colegioId: string; // Ref al id del colegio al que pertenece el usuario
  createdAt: Timestamp;
  updatedAt: Timestamp;
  // Para apoderados:
  hijos?: string[]; // Array de refs a alumnos
}

// 3. Cursos (colección: cursos)
interface Curso {
  id: string; // Clave primaria, generado aleatoriamente
  nombre: string;
  descripcion: string;
  codigo: string; // Código único para suscripción
  colegioId: string; // Ref al id del colegio al que pertenece el curso
  administradorId: string; // Ref al uid del administrador que crea el curso
  createdAt: Timestamp;
  updatedAt: Timestamp;
  // Campos calculados:
  numAlumnos?: number;
}

// 4. Alumnos (colección: alumnos)
interface Alumno {
  id: string; // Clave primaria, generado aleatoriamente
  nombre: string;
  cursoId: string; // Ref al id del curso
  colegioId: string; // Ref al id del colegio al que pertenece el alumno
  administradorId: string; // Ref al uid del administrador que crea el alumno
  apoderadoId: string; // Ref al uid del apoderado principal
  apoderadosSecundarios?: string[]; // Array de refs a los uid de los apoderados secundarios
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// 5. Avisos (colección: avisos)
interface Aviso {
  id: string; // Clave primaria, generado aleatoriamente
  colegioId: string; // Ref al id del colegio al que pertenece el aviso
  titulo: string;
  descripcion: string;
  fechaPublicacion: Timestamp;
  fechaEvento?: Timestamp; // Fecha del evento al que se refiere el aviso
  cursos?: string[]; // Lista de cursoId a los que se aplica el aviso
  profesorId?: string; // Ref al uid del profesor que creó el aviso
  administradorId?: string; // Ref al uid del administrador que creó el aviso
  archivos?: string[]; // URLs de archivos almacenados en Firebase Storage
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// 6. Confirmaciones (subcolección de avisos)
interface Confirmacion {
  apoderadoId: string; // Clave primaria, referencia al uid del apoderado
  fechaConfirmacion: Timestamp;
  leido: boolean;
}

// Estructura de colecciones en Firestore
// Colecciones principales:
// - users
// - cursos
// - alumnos
// - avisos
// Subcolecciones:
// - avisos/{avisoId}/confirmaciones

// Estructura de colecciones en Firestore
// Colecciones principales:
// - users
// - cursos
// - alumnos
// Subcolecciones:
// - cursos/{cursoId}/pendientes

// Ejemplo de documentos:
// users/{uid}:
// {
//   "uid": "user123",
//   "email": "profesor@example.com",
//   "nombre": "Juan Pérez",
//   "rol": "profesor",
//   "cursos": ["curso1", "curso2"],
//   "createdAt": Timestamp(...),
//   "updatedAt": Timestamp(...)
// }

// cursos/{cursoId}:
// {
//   "id": "curso1",
//   "nombre": "Matemáticas 1",
//   "descripcion": "Curso de matemáticas para 1er año",
//   "codigo": "MAT123",
//   "profesorId": "prof123",
//   "createdAt": Timestamp(...),
//   "updatedAt": Timestamp(...)
// }

// alumnos/{alumnoId}:
// {
//   "id": "alumno1",
//   "nombre": "Pedro González",
//   "cursoId": "curso1",
//   "apoderadoId": "apoderado123",
//   "createdAt": Timestamp(...),
//   "updatedAt": Timestamp(...)
// }

// cursos/{cursoId}/pendientes/{pendienteId}:
// {
//   "id": "pendiente1",
//   "titulo": "Tarea 1",
//   "descripcion": "Resolver problemas 1-10",
//   "fechaLimite": Timestamp(...),
//   "fechaCreacion": Timestamp(...),
//   "completado": false,
//   "asignadoA": "alumno1"
// }
