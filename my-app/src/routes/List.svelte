<script lang="ts">
    export let tasks: { id: number; title: string; content: string; createdAt: date  }[] = [];
    export let fetchTasks: () => void;
    import Modal from './modal.svelte';
    import { formatDate } from './utils/formatear';

    // Estado del modal y la tarea seleccionada
    let isModalOpen = false;
    let selectedTask: { id: number; title: string; content: string } | null = null;

    // Función para abrir el modal
    const openModal = (task: { id: number; title: string; content: string }) => {
        selectedTask = task;
        isModalOpen = true;
    };

    // Función para cerrar el modal
    const closeModal = () => {
        isModalOpen = false;
        selectedTask = null;
    };

    // Función para actualizar la tarea
    const updateTask = async (updatedTask: { id: number; title: string; content: string }) => {
        try {
            const response = await fetch('../api/datos', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedTask),
            });

            if (response.ok) {
                fetchTasks(); // Actualiza la lista de tareas
                closeModal(); // Cierra el modal
            } else {
                console.error('Error al actualizar la tarea:', await response.text());
            }
        } catch (error) {
            console.error('Error al actualizar la tarea:', error);
        }
    };

    // Función para eliminar tareas
    const fetchDelete = async (id: number) => {
        try {
            const response = await fetch('../api/datos', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: id }),
            });
            if (response.ok) {
                fetchTasks(); // Actualiza la lista de tareas
            } else {
                console.error('Error al eliminar la tarea:', await response.text());
            }
        } catch (error) {
            console.error('Error al eliminar la tarea:', error);
        }
    };

</script>

<div class="flex flex-col items-center justify-center">
    <h1 class="text-white text-center text-2xl font-semibold mt-5">Lista de tareas</h1>
  
    <div class="w-full h-96 overflow-y-auto m-auto bg-black shadow-lg rounded-md mt-20 p-5">
  
      {#if tasks.length === 0}
      <div class="flex flex-col justify-center items-center">
        <p class="text-center text-white font-semibold mt-20">No hay tareas para mostrar</p>
        <img src="/vacio.svg" alt="No hay tareas para mostrar" class="w-32 h-32 m-auto" />
      </div>
      {:else}
      <!-- Contenedor con CSS Grid para organizar las tarjetas -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        {#each tasks as task (task.id)}
        <div class="flex flex-col w-56 shadow-md p-5 rounded-md bg-white">

         <p class="text-lg font-semibold">{task.title}</p>
          <p class=" font-light text-sm text-gray-400 h-14 overflow-auto">{task.content}</p>

          <div class="flex justify-between items-center mt-3">

            <div>
                <p class="text-xs font-semibold">{formatDate(task.createdAt)}</p>
            </div>

            <div class="flex gap-1">
                    <img
                    src="/editar.svg"
                    alt="editar tarea"
                    class="bg-blue-600 hover:bg-blue-800 cursor-pointer p-1 rounded-md shadow-md w-6 h-6"
                    onclick={() => openModal(task)}
                />
                <img
                    src="/trash.svg"
                    alt="Eliminar tarea"
                    class="bg-red-600 hover:bg-red-800 cursor-pointer p-1 rounded-md shadow-md w-6 h-6"
                    onclick={() => fetchDelete(task.id)}
                />
            </div>

          </div>
  
          
        </div>
        {/each}
      </div>
      {/if}
    </div>
  </div>
  

<!-- Modal para actualizar la tarea -->
<Modal
    isOpen={isModalOpen}
    task={selectedTask}
    onClose={closeModal}
   {fetchTasks}
/>

