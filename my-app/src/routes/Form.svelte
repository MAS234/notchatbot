<!-- Formulario.svelte -->
<script lang="ts">
    export let createTask: () => void;
    export let newTaskTitle: string;
    export let newTaskContent: string;
    export let errors: boolean;
    export let success: boolean;

  </script>

  <div class="flex justify-center items-center">
    
    <form  class="flex flex-col items-center justify-center w-96 h-96 shadow-md rounded-md mt-20  gradient-bg duration-300">
        <h1 class="text-2xl font-bold">To Do List</h1>

        <div class="flex flex-col items-start justify-center w-72 mt-5">
            
          <label for="title" class= "text-md font-normal" >Título de la tarea</label>
          <input bind:value={newTaskTitle} placeholder="Escriba su tarea" class="w-full h-10 rounded-md p-3 border-2 text-black text-sm" />
          {#if errors}
            <p class="text-white mt-2 rounded-md shadow-md p-2 text-xs bg-red-600">El titulo es obligatorio</p>
          {/if}
        </div>
      
        <div class="flex flex-col items-start justify-center mt-5 w-72 mb-5">
          <label for="content" class=" text-md font-normal ">Descripción</label>
          <input bind:value={newTaskContent} placeholder="Escriba su descripcion" class="w-full h-10 rounded-md p-3 border-2  text-black text-sm"/>
          {#if errors}
            <p class="text-white mt-2 rounded-md shadow-md p-2 text-xs bg-red-600">La descripcion es obligatoria</p>
          {/if}
        </div>
      
        <div class="flex flex-col items-center justify-center rounded-md p-3 bg-black text-white hover:bg-green-600 duration-300 w-32 h-10 cursor-pointer shadow-md">
          <button on:click={createTask}>Agregar</button>

        </div>

        {#if success}
        <p class="text-green-600 mt-2 rounded-md shadow-md text-xs">Tarea agregada correctamente</p>
      {/if}
      </form>
  </div>


  <style>
   .gradient-bg {
        background: linear-gradient(to bottom, white, black);
    }
  </style>
  

  