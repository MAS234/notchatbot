<script lang="ts">
    export let isOpen: boolean; // Estado para controlar si el modal está abierto
    export let task: { id: number; title: string; content: string }; // La tarea a actualizar
    export let onClose: () => void; // Función para cerrar el modal
    export let fetchTasks: () => void;


    let updatedTitle = task?.title || '';
    let updatedContent = task?.content || '';

    // Función para manejar la actualización
    const handleUpdate = async () => {

        try {
            if (updatedTitle.trim() === '' || updatedContent.trim() === '') {
            alert('Ambos campos son obligatorios.');
            return;
        }

        const updatedTask = { id: task.id, title: updatedTitle, content: updatedContent };
        console.log(updatedTask, 'esto es updatedTask');
        const response = await fetch('../api/datos', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedTask)
        });
        console.log(response, 'esto es response');
        updatedTitle = '';
        updatedContent = '';
        fetchTasks();
        onClose();
            
        } catch (error) {
            console.error('Error al actualizar la tarea:', error);
        }
     

    };

</script>

{#if isOpen}
<div class="modal" on:click={onClose}>
    <div class="modal-content" on:click|stopPropagation>
        <h2 class="text-lg font-bold mb-4">Actualizar tarea</h2>
        <form on:submit|preventDefault={handleUpdate}>
            <div class="mb-4">
                <label for="title" class="block text-sm font-semibold">Título</label>
                <input
                    id="title"
                    type="text"
                    class="w-full p-2 border rounded-md"
                    bind:value={updatedTitle}
                />
            </div>
            <div class="mb-4">
                <label for="content" class="block text-sm font-semibold">Contenido</label>
                <textarea
                    id="content"
                    rows="4"
                    class="w-full p-2 border rounded-md"
                    bind:value={updatedContent}
                ></textarea>
            </div>
            <div class="flex justify-end">
                <button
                    type="button"
                    class="bg-red-600 hover:bg-red-800 duration-300 text-white px-4 py-2 rounded-md mr-2"
                    on:click={onClose}
                >
                    Cancelar
                </button>
                <button on:click={handleUpdate} class="bg-black hover:bg-green-800 duration-300 text-white px-4 py-2 rounded-md">
                    Actualizar
                </button>
            </div>
        </form>
    </div>
</div>
{/if}

<style>
    /* Estilos del modal */
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .modal-content {
        background: white;
        padding: 2rem;
        border-radius: 8px;
        width: 90%;
        max-width: 400px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
</style>
