// src/routes/api/datos.ts
import { consultas } from '$lib';
import { json, fail } from '@sveltejs/kit';
import { taskSchema } from '$lib/server/db/schema';

// Endpoint para consultar tareas
export const GET = async () => {
  try {
    const datos = await consultas.getAll();
    return json(datos);
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    return json({ error: 'No se pudieron obtener las tareas' }, { status: 500 });
  }
};

export const POST = async ({ request }: { request: Request }) => {
    try {
        const formData = await request.json();
        console.log(formData, 'esto es formData');
        
        // Validar los datos con Zod directamente
        const validationResult = taskSchema.safeParse(formData);

        if (!validationResult.success) {
            // Si no es válido, devolver los errores
            return fail(400, { errors: validationResult.error.format() });
        }

        // Si la validación es exitosa, proceder a crear la tarea
        const datos = await consultas.create(formData);
        return json({ success: true, datos });
    } catch (error) {
        console.error('Error al crear la tarea:', error);
        return json({ error: 'No se pudo crear la tarea' }, { status: 500 });
    }
};

export const DELETE = async ({ request }: { request: Request }) => {
    const formData = await request.json();

    const id = formData.id;
    const eliminado = await consultas.delete(id);
    console.log(eliminado, 'esto es eliminado');
    return json({ success: true, eliminado });
}







