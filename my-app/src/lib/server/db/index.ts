import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { env } from '$env/dynamic/private';


// Verificar que la URL de la base de datos esté configurada
if (!env.DATABASE_URL) {
  console.error('ERROR: DATABASE_URL no está configurada');
  throw new Error('La variable de entorno DATABASE_URL no está configurada');
}

// Configurar el cliente de Neon con opciones de conexión
const sql = neon(env.DATABASE_URL);

// Crear la instancia de Drizzle
export const db = drizzle(sql);





