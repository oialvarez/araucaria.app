"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendContactEmail = exports.markAvisoAsRead = exports.deleteAviso = exports.updateAviso = exports.createAviso = exports.deleteAlumno = exports.updateAlumno = exports.createAlumno = exports.deleteCurso = exports.updateCurso = exports.createCurso = exports.deleteColegio = exports.updateColegio = exports.createColegio = exports.deleteUser = exports.updateUser = exports.createUser = void 0;
const functions = __importStar(require("firebase-functions"));
const admin = __importStar(require("firebase-admin"));
const nodemailer = __importStar(require("nodemailer"));
const uuid_1 = require("uuid");
admin.initializeApp();
const db = admin.firestore();
const auth = admin.auth();
// 1. Crear usuario
exports.createUser = functions.https.onCall(async (data, context) => {
    try {
        // Verificar que el usuario es administrador
        if (context.auth?.token.rol !== 'administrador') {
            throw new functions.https.HttpsError('permission-denied', 'Solo los administradores pueden crear usuarios');
        }
        // Crear usuario en Firebase Auth
        const userRecord = await auth.createUser({
            email: data.email,
            password: data.password,
            displayName: data.nombre
        });
        // Crear documento en Firestore
        const userRef = db.collection('users').doc(userRecord.uid);
        await userRef.set({
            uid: userRecord.uid,
            email: data.email,
            nombre: data.nombre,
            rol: data.rol,
            colegioId: data.colegioId,
            hijos: data.hijos || [],
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
        return { uid: userRecord.uid };
    }
    catch (error) {
        console.error('Error creating user:', error);
        throw new functions.https.HttpsError('internal', 'Error al crear el usuario');
    }
});
// 2. Actualizar usuario
exports.updateUser = functions.https.onCall(async (data, context) => {
    try {
        const userId = context.auth?.uid;
        if (!userId) {
            throw new functions.https.HttpsError('unauthenticated', 'Usuario no autenticado');
        }
        const userRef = db.collection('users').doc(userId);
        const userDoc = await userRef.get();
        if (!userDoc.exists) {
            throw new functions.https.HttpsError('not-found', 'Usuario no encontrado');
        }
        const userData = userDoc.data();
        const isAdmin = userData?.rol === 'administrador';
        // Solo administradores pueden actualizar otros usuarios
        if (!isAdmin && userId !== data.uid) {
            throw new functions.https.HttpsError('permission-denied', 'No tienes permiso para actualizar este usuario');
        }
        // Actualizar documento en Firestore
        await userRef.update({
            nombre: data.nombre,
            email: data.email,
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
        // Actualizar correo en Firebase Auth
        if (data.email !== userData?.email) {
            await auth.updateUser(userId, { email: data.email });
        }
        return { success: true };
    }
    catch (error) {
        console.error('Error updating user:', error);
        throw new functions.https.HttpsError('internal', 'Error al actualizar el usuario');
    }
});
// 3. Eliminar usuario
exports.deleteUser = functions.https.onCall(async (data, context) => {
    try {
        const userId = context.auth?.uid;
        if (!userId || context.auth?.token.rol !== 'administrador') {
            throw new functions.https.HttpsError('permission-denied', 'Solo los administradores pueden eliminar usuarios');
        }
        // Eliminar usuario de Firebase Auth
        await auth.deleteUser(userId);
        // Eliminar documento de Firestore
        await db.collection('users').doc(userId).delete();
        return { success: true };
    }
    catch (error) {
        console.error('Error deleting user:', error);
        throw new functions.https.HttpsError('internal', 'Error al eliminar el usuario');
    }
});
// 4. Crear colegio
exports.createColegio = functions.https.onCall(async (data, context) => {
    try {
        if (context.auth?.token.rol !== 'administrador') {
            throw new functions.https.HttpsError('permission-denied', 'Solo los administradores pueden crear colegios');
        }
        const colegioId = (0, uuid_1.v4)();
        const colegioRef = db.collection('colegios').doc(colegioId);
        await colegioRef.set({
            id: colegioId,
            ...data,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
        return { id: colegioId };
    }
    catch (error) {
        console.error('Error creating colegio:', error);
        throw new functions.https.HttpsError('internal', 'Error al crear el colegio');
    }
});
// 5. Actualizar colegio
exports.updateColegio = functions.https.onCall(async (data, context) => {
    try {
        if (context.auth?.token.rol !== 'administrador') {
            throw new functions.https.HttpsError('permission-denied', 'Solo los administradores pueden actualizar colegios');
        }
        const colegioRef = db.collection('colegios').doc(data.id);
        await colegioRef.update({
            ...data,
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
        return { success: true };
    }
    catch (error) {
        console.error('Error updating colegio:', error);
        throw new functions.https.HttpsError('internal', 'Error al actualizar el colegio');
    }
});
// 6. Eliminar colegio
exports.deleteColegio = functions.https.onCall(async (data, context) => {
    try {
        if (context.auth?.token.rol !== 'administrador') {
            throw new functions.https.HttpsError('permission-denied', 'Solo los administradores pueden eliminar colegios');
        }
        const colegioRef = db.collection('colegios').doc(data.id);
        await colegioRef.delete();
        return { success: true };
    }
    catch (error) {
        console.error('Error deleting colegio:', error);
        throw new functions.https.HttpsError('internal', 'Error al eliminar el colegio');
    }
});
// 7. Crear curso
exports.createCurso = functions.https.onCall(async (data, context) => {
    try {
        if (context.auth?.token.rol !== 'administrador') {
            throw new functions.https.HttpsError('permission-denied', 'Solo los administradores pueden crear cursos');
        }
        const cursoId = (0, uuid_1.v4)();
        const cursoRef = db.collection('cursos').doc(cursoId);
        await cursoRef.set({
            id: cursoId,
            ...data,
            administradorId: context.auth?.uid,
            numAlumnos: 0,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
        return { id: cursoId };
    }
    catch (error) {
        console.error('Error creating curso:', error);
        throw new functions.https.HttpsError('internal', 'Error al crear el curso');
    }
});
// 8. Actualizar curso
exports.updateCurso = functions.https.onCall(async (data, context) => {
    try {
        if (context.auth?.token.rol !== 'administrador') {
            throw new functions.https.HttpsError('permission-denied', 'Solo los administradores pueden actualizar cursos');
        }
        const cursoRef = db.collection('cursos').doc(data.id);
        await cursoRef.update({
            ...data,
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
        return { success: true };
    }
    catch (error) {
        console.error('Error updating curso:', error);
        throw new functions.https.HttpsError('internal', 'Error al actualizar el curso');
    }
});
// 9. Eliminar curso
exports.deleteCurso = functions.https.onCall(async (data, context) => {
    try {
        if (context.auth?.token.rol !== 'administrador') {
            throw new functions.https.HttpsError('permission-denied', 'Solo los administradores pueden eliminar cursos');
        }
        const cursoRef = db.collection('cursos').doc(data.id);
        await cursoRef.delete();
        return { success: true };
    }
    catch (error) {
        console.error('Error deleting curso:', error);
        throw new functions.https.HttpsError('internal', 'Error al eliminar el curso');
    }
});
// 10. Crear alumno
exports.createAlumno = functions.https.onCall(async (data, context) => {
    try {
        if (context.auth?.token.rol !== 'administrador') {
            throw new functions.https.HttpsError('permission-denied', 'Solo los administradores pueden crear alumnos');
        }
        const alumnoId = (0, uuid_1.v4)();
        const alumnoRef = db.collection('alumnos').doc(alumnoId);
        await alumnoRef.set({
            id: alumnoId,
            ...data,
            administradorId: context.auth?.uid,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
        // Actualizar numAlumnos en el curso
        const cursoRef = db.collection('cursos').doc(data.cursoId);
        await cursoRef.update({
            numAlumnos: admin.firestore.FieldValue.increment(1)
        });
        return { id: alumnoId };
    }
    catch (error) {
        console.error('Error creating alumno:', error);
        throw new functions.https.HttpsError('internal', 'Error al crear el alumno');
    }
});
// 11. Actualizar alumno
exports.updateAlumno = functions.https.onCall(async (data, context) => {
    try {
        if (context.auth?.token.rol !== 'administrador') {
            throw new functions.https.HttpsError('permission-denied', 'Solo los administradores pueden actualizar alumnos');
        }
        const alumnoRef = db.collection('alumnos').doc(data.id);
        await alumnoRef.update({
            ...data,
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
        return { success: true };
    }
    catch (error) {
        console.error('Error updating alumno:', error);
        throw new functions.https.HttpsError('internal', 'Error al actualizar el alumno');
    }
});
// 12. Eliminar alumno
exports.deleteAlumno = functions.https.onCall(async (data, context) => {
    try {
        if (context.auth?.token.rol !== 'administrador') {
            throw new functions.https.HttpsError('permission-denied', 'Solo los administradores pueden eliminar alumnos');
        }
        const alumnoRef = db.collection('alumnos').doc(data.id);
        await alumnoRef.delete();
        // Actualizar numAlumnos en el curso
        const cursoRef = db.collection('cursos').doc(data.cursoId);
        await cursoRef.update({
            numAlumnos: admin.firestore.FieldValue.increment(-1)
        });
        return { success: true };
    }
    catch (error) {
        console.error('Error deleting alumno:', error);
        throw new functions.https.HttpsError('internal', 'Error al eliminar el alumno');
    }
});
// 13. Crear aviso
exports.createAviso = functions.https.onCall(async (data, context) => {
    try {
        if (!context.auth?.uid) {
            throw new functions.https.HttpsError('unauthenticated', 'Usuario no autenticado');
        }
        const userDoc = await db.collection('users').doc(context.auth.uid).get();
        const userData = userDoc.data();
        if (!userData || !['profesor', 'administrador'].includes(userData.rol)) {
            throw new functions.https.HttpsError('permission-denied', 'Solo profesores y administradores pueden crear avisos');
        }
        const avisoId = (0, uuid_1.v4)();
        const avisoRef = db.collection('avisos').doc(avisoId);
        await avisoRef.set({
            id: avisoId,
            ...data,
            [userData.rol === 'profesor' ? 'profesorId' : 'administradorId']: context.auth.uid,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
        return { id: avisoId };
    }
    catch (error) {
        console.error('Error creating aviso:', error);
        throw new functions.https.HttpsError('internal', 'Error al crear el aviso');
    }
});
// 14. Actualizar aviso
exports.updateAviso = functions.https.onCall(async (data, context) => {
    try {
        if (!context.auth?.uid) {
            throw new functions.https.HttpsError('unauthenticated', 'Usuario no autenticado');
        }
        const avisoRef = db.collection('avisos').doc(data.id);
        const avisoDoc = await avisoRef.get();
        if (!avisoDoc.exists) {
            throw new functions.https.HttpsError('not-found', 'Aviso no encontrado');
        }
        const avisoData = avisoDoc.data();
        if (!avisoData) {
            throw new functions.https.HttpsError('not-found', 'Aviso no encontrado');
        }
        const isAdmin = context.auth.token.rol === 'administrador';
        const isCreator = context.auth.uid === avisoData.profesorId || context.auth.uid === avisoData.administradorId;
        if (!isAdmin && !isCreator) {
            throw new functions.https.HttpsError('permission-denied', 'No tienes permiso para actualizar este aviso');
        }
        await avisoRef.update({
            ...data,
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
        return { success: true };
    }
    catch (error) {
        console.error('Error updating aviso:', error);
        throw new functions.https.HttpsError('internal', 'Error al actualizar el aviso');
    }
});
// 15. Eliminar aviso
exports.deleteAviso = functions.https.onCall(async (data, context) => {
    try {
        if (!context.auth?.uid) {
            throw new functions.https.HttpsError('unauthenticated', 'Usuario no autenticado');
        }
        const avisoRef = db.collection('avisos').doc(data.id);
        const avisoDoc = await avisoRef.get();
        if (!avisoDoc.exists) {
            throw new functions.https.HttpsError('not-found', 'Aviso no encontrado');
        }
        const avisoData = avisoDoc.data();
        if (!avisoData) {
            throw new functions.https.HttpsError('not-found', 'Aviso no encontrado');
        }
        const isAdmin = context.auth.token.rol === 'administrador';
        const isCreator = context.auth.uid === avisoData.profesorId || context.auth.uid === avisoData.administradorId;
        if (!isAdmin && !isCreator) {
            throw new functions.https.HttpsError('permission-denied', 'No tienes permiso para eliminar este aviso');
        }
        await avisoRef.delete();
        return { success: true };
    }
    catch (error) {
        console.error('Error deleting aviso:', error);
        throw new functions.https.HttpsError('internal', 'Error al eliminar el aviso');
    }
});
// 16. Marcar aviso como leído
exports.markAvisoAsRead = functions.https.onCall(async (data, context) => {
    try {
        if (!context.auth?.uid) {
            throw new functions.https.HttpsError('unauthenticated', 'Usuario no autenticado');
        }
        const avisoRef = db.collection('avisos').doc(data.avisoId);
        const avisoDoc = await avisoRef.get();
        if (!avisoDoc.exists) {
            throw new functions.https.HttpsError('not-found', 'Aviso no encontrado');
        }
        const avisoData = avisoDoc.data();
        const userDoc = await db.collection('users').doc(context.auth.uid).get();
        const userData = userDoc.data();
        if (!userData || userData.rol !== 'apoderado') {
            throw new functions.https.HttpsError('permission-denied', 'Solo apoderados pueden marcar avisos como leídos');
        }
        // Verificar que el aviso se aplica al curso del apoderado
        const alumnoRef = db.collection('alumnos').where('apoderadoId', '==', context.auth.uid).limit(1);
        const alumnoDocs = await alumnoRef.get();
        if (alumnoDocs.empty) {
            throw new functions.https.HttpsError('permission-denied', 'No tienes hijos en el sistema');
        }
        const alumnoData = alumnoDocs.docs[0].data();
        if (!avisoData) {
            throw new functions.https.HttpsError('not-found', 'Aviso no encontrado');
        }
        const aplicaAlCurso = !avisoData.cursos?.length || avisoData.cursos?.includes(alumnoData.cursoId);
        if (!aplicaAlCurso) {
            throw new functions.https.HttpsError('permission-denied', 'Este aviso no se aplica a tus cursos');
        }
        const confirmacionRef = avisoRef.collection('confirmaciones').doc(context.auth.uid);
        await confirmacionRef.set({
            apoderadoId: context.auth.uid,
            fechaConfirmacion: admin.firestore.FieldValue.serverTimestamp(),
            leido: true
        });
        return { success: true };
    }
    catch (error) {
        console.error('Error marking aviso as read:', error);
        throw new functions.https.HttpsError('internal', 'Error al marcar el aviso como leído');
    }
});
// 17. Enviar correo de contacto
exports.sendContactEmail = functions.https.onCall(async (data, context) => {
    try {
        if (!context.auth?.uid) {
            throw new functions.https.HttpsError('unauthenticated', 'Usuario no autenticado');
        }
        // Configuración de SendGrid
        const transporter = nodemailer.createTransport({
            host: 'smtp.sendgrid.net',
            port: 587,
            secure: false,
            auth: {
                user: 'apikey',
                pass: 'tu_sendgrid_api_key' // Deberías reemplazar esto con tu API key real
            }
        });
        const mailOptions = {
            from: data.email,
            to: 'contacto@araucaria-app.com', // Email de destino
            subject: data.asunto,
            text: data.mensaje,
            html: `<p>${data.mensaje}</p><br><p>Enviado por: ${data.nombre}</p><p>Email: ${data.email}</p>`
        };
        await transporter.sendMail(mailOptions);
        return { success: true };
    }
    catch (error) {
        console.error('Error sending contact email:', error);
        throw new functions.https.HttpsError('internal', 'Error al enviar el correo');
    }
});
