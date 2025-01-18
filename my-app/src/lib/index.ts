import { tasks } from './server/db/schema';
import { eq } from 'drizzle-orm';
import { db } from './server/db';

// Tipos para nuestros taks
export type Newtaks = typeof tasks.$inferInsert;

// Funciones para interactuar con la base de datos
export const consultas = {
  // Obtener takss los takss
  getAll: async () => {
    return await db.select().from(tasks);
  },

  // Obtener un taks por ID
  getById: async (id: number) => {
    const result = await db
      .select()
      .from(tasks)
              .where(eq(tasks.id, id));
    return result[0];
  },

  // Crear un nuevo taks
  create: async (data: Newtaks) => {
    const result = await db
      .insert(tasks)
      .values(data)
      .returning();
    return result[0];
  },

  // Actualizar un taks
  update: async (id: number, data: Partial<Newtaks>) => {
    const result = await db
      .update(tasks)
      .set(data)
      .where(eq(tasks.id, id))
      .returning();
    return result[0];
  },

  // Eliminar un taks
  delete: async (id: number) => {
    const result = await db
      .delete(tasks)
      .where(eq(tasks.id, id))
      .returning();
    return result[0];
  }
};



