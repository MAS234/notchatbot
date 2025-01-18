<script lang="ts">
    export let tasks: { title: string; content: string }[] = [];
    export let fetchTasks: () => void;

        // Función para ELIMINAR TAREAS
        const fetchDelete = async (id: number) => {
            try {
                const response = await fetch('../api/datos', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: id })
            });
            fetchTasks();
        } catch (error) {
            console.error('Error al eliminar la tarea:', error);
        }
    };

</script>


<div class="flex  items-center justify-center">
    <div class="w-96 h-96 overflow-y-auto m-auto bg-white shadow-lg rounded-md mt-20">

        <h1 class="text-orange-600 text-center text-2xl font-semibold mt-5">Lista de tareas</h1>

        {#if tasks.length === 0}
        <div class="flex justify-center items-center">
            <p class="text-center text-orange-600 font-semibold mt-40">No hay tareas para mostrar</p>
        </div>
        {:else}
            {#each tasks as task}
                <div class="text-orange-600 hover:bg-orange-600 hover:text-white duration-300 shadow-md p-3 rounded-md m-5">    
                    <img src="/trash.svg" alt="Eliminar tarea" class="bg-red-600 hover:bg-red-800 cursor-pointer p-1 rounded-md shadow-md " onclick={() => fetchDelete(task.id)} />
                    <p class="text-lg font-semibold text-center">            
                        {task.title} 
                    </p>
                    <p>            
                        {task.content}
                    </p>
                </div>
            {/each}
        {/if}
    </div>
    

</div>
