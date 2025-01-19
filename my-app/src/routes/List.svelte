<script lang="ts">
    export let tasks: { id: number; title: string; content: string }[] = [];
    export let fetchTasks: () => void;

    import Modal from './modal.svelte';

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

<div class="flex items-center justify-center">
    <div class="w-96 h-96 overflow-y-auto m-auto bg-white shadow-lg rounded-md mt-20">
        <h1 class="text-orange-600 text-center text-2xl font-semibold mt-5">Lista de tareas</h1>

        {#if tasks.length === 0}
        <div class="flex flex-col justify-center items-center">
            <p class="text-center text-orange-600 font-semibold mt-20">No hay tareas para mostrar</p>
            <img src="/vacio.svg" alt="No hay tareas para mostrar" class="w-32 h-32 m-auto" />
        </div>
        {:else}
            {#each tasks as task (task.id)}
                <div class="text-orange-600 hover:bg-orange-600 hover:text-white duration-300 shadow-md p-3 rounded-md m-5">
                    <div class="flex justify-between items-center w-full">
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

                    <p class="text-lg font-semibold text-center">{task.title}</p>
                    <p>{task.content}</p>

                </div>
            {/each}
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

