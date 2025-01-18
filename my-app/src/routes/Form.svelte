<!-- Formulario.svelte -->
<script lang="ts">
    export let createTask: () => void;
    export let newTaskTitle: string;
    export let newTaskContent: string;
    export let errors: boolean;

    console.log(errors, "ESTAS SON LOS ERRORES");
  </script>

  <div class="flex justify-center items-center">
    <form  class="flex flex-col items-center justify-center w-96 h-96 shadow-md rounded-md mt-20 text-orange-600 bg-white hover:bg-orange-600 hover:text-white  duration-300">

        <div class="flex flex-col items-center justify-center">
          <label for="title" class= "text-lg font-semibold " >Título de la tarea</label>
          <input bind:value={newTaskTitle} placeholder="Título de la tarea" class="w-full h-10 rounded-md p-3 border-2 border-orange-600 mt-2 text-black" />
          {#if errors}
            <p class="text-white mt-2 rounded-md shadow-md p-2 text-xs bg-red-600">El titulo es obligatorio</p>
          {/if}
        </div>
      
        <div class="flex flex-col items-center justify-center mt-5 mb-5">
          <label for="content" class=" text-lg font-semibold ">Descripción de la tarea</label>
          <input bind:value={newTaskContent} placeholder="Descripción de la tarea" class="w-full h-10 rounded-md p-3 border-2 border-orange-600 mt-2 text-black"/>
          {#if errors}
            <p class="text-white mt-2 rounded-md shadow-md p-2 text-xs bg-red-600">La descripcion es obligatoria</p>
          {/if}
        </div>
      
        <div class="flex flex-col items-center justify-center border-2 border-orange-600 rounded-md p-3  hover:border-white hover:text-white duration-300 w-32 h-10 cursor-pointer shadow-md">
          <button on:click={createTask}>Agregar</button>
        </div>
      </form>
  </div>
  

  