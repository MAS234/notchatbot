import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { z } from "zod";

// Definición de la tabla "tasks" en la base de datos
export const tasks = pgTable('tasks', {
    id: serial('id').primaryKey(), // Columna ID como llave primaria
    title: text('title').notNull(), // Columna title, no puede ser nula
    content: text('content'), // Columna content, opcional
    createdAt: timestamp('created_at').defaultNow() // Columna de fecha de creación con valor por defecto
});

// Esquema de validación con Zod
export const taskSchema = z.object({
    title: z.string().min(1, "El título es obligatorio"),
    content: z.string().min(1, "La descripción es obligatoria"),
});