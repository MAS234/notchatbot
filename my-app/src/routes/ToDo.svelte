<script lang="ts">
    import { onMount } from 'svelte';
    import List from './List.svelte';
    import Form from './Form.svelte';

    let newTaskTitle = ''; // Título de la nueva tarea
    let newTaskContent = ''; // Descripción de la nueva tarea
    export let tasks: { id: number; title: string; content: string; createdAt: Date  }[] = []; // Lista de tareas obtenidas del backend
    let errors = false;
    let success = false;

    // Función para crear una nueva tarea
    const createTask = async () => {

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
        success = true;
        const task = await response.json(); // Respuesta con la tarea creada
      
        setTimeout(() => {
        success = false; 
        }, 3000);

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

    <div class="w-full h-screen flex flex-col lg:flex-row">
        <!-- Contenedor izquierdo: Formulario -->
        <div class="w-full lg:w-1/2 h-auto flex flex-col items-center justify-start p-5">
          <div class="w-48 h-auto flex justify-center items-center mb-5">
            <img src="/logoNotChatBot.png" alt="Logo de NotChatBot" class="w-16 h-auto" />
            <h1 class="text-2xl font-bold text-center ml-3">NotChatBot</h1>
          </div>
          <Form bind:errors bind:newTaskTitle bind:newTaskContent bind:success {createTask} />
        </div>
      
        <!-- Contenedor derecho: Lista de tareas -->
        <div class="w-full lg:w-1/2 h-auto flex justify-center items-start p-5 bg-black">
          <List {fetchTasks} {tasks} />
        </div>
      </div>
      

</div>



