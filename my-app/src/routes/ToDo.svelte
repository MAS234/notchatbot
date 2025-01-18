<script lang="ts">
    import { onMount } from 'svelte';
    import List from './list.svelte';
    import Form from './Form.svelte';

    let newTaskTitle = ''; // Título de la nueva tarea
    let newTaskContent = ''; // Descripción de la nueva tarea
    let tasks: { title: string; content: string }[] = []; // Lista de tareas obtenidas del backend
    let errors = false;

    // Función para crear una nueva tarea
    const createTask = async () => {

        console.log(newTaskTitle, newTaskContent, "ESTAS SON LAS TAREAS ENTRANTES");

        if (newTaskTitle === '' || newTaskContent === '') {
           errors = true; // Activar errores si al menos uno está vacío
           console.log("Error: Uno o ambos campos están vacíos.");
           return; // Salir de la función
           }

        const response = await fetch('../api/datos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: newTaskTitle, content: newTaskContent })
        });

        newTaskTitle = '';
        newTaskContent = '';
        errors = false;
        const task = await response.json(); // Respuesta con la tarea creada
        console.log('Nueva tarea creada:', task);

        fetchTasks();
    };

    // Función para obtener todas las tareas
    const fetchTasks = async () => {
        const response = await fetch('../api/datos'); // Hacemos la consulta GET
        tasks = await response.json(); // Actualizamos el arreglo de tareas
        console.log('Tareas obtenidas:', tasks);
    };

    // Cargar las tareas al inicio (solo en el cliente)
    onMount(() => {
        fetchTasks();
    });

</script>


<div class="flex  w-full h-screen " > 

    <div class="w-full h-screen " > 
        <Form bind:errors bind:newTaskTitle bind:newTaskContent {createTask} />
    </div>
    
    
    <div class="w-full h-screen" > 
    <!-- Mostrar la lista de tareas -->
    <List {fetchTasks} {tasks} />
    </div>

</div>



