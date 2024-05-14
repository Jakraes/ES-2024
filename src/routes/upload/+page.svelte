<script lang="ts">
    import { P, Fileupload, Label, Helper, GradientButton, Input, A, Button } from 'flowbite-svelte'

    let val = 0
    let val_2 = 1
    let file = ""
    let input = ""

    import { dados_registo,numero } from '../../store.js';



</script>

<div class="w-full h-full flex flex-col justify-center items-center gap-10">
    {#if val == 0}
        <div class="flex justify-center items-center gap-8">
            <GradientButton color="pinkToOrange" size="xl" on:click={() => val = 1} class="text-xl drop-shadow-md">Selecionar ficheiro local</GradientButton>
            <GradientButton color="pinkToOrange" size="xl" on:click={() => val = 2} class="text-xl drop-shadow-md">Selecionar ficheiro online</GradientButton>
        </div>
        <div class="flex justify-center items-center gap-8">
            <a href="/horario"><GradientButton color="pinkToOrange" size="xl" on:click={() => numero.set(1)} class="text-xl drop-shadow-md">Ver horário</GradientButton></a>
            <a href="/sala"><GradientButton color="pinkToOrange" size="xl" on:click={() => val = 0} class="text-xl drop-shadow-md">Ver salas</GradientButton></a>
        </div>

    {:else if val == 1}
            <Label for="upload" class="text-4xl text-white font-semibold drop-shadow-md">Insira o seu ficheiro CSV</Label>
            <form method="post" enctype="multipart/form-data" class="flex flex-col justify-center items-center gap-8 w-1/3">
                <input type="file" name="file" class="bg-gray-100 rounded-xl" accept=".csv"/>
                <button type="submit" class="bg-orange-500 rounded-xl text-white px-8 py-3 text-lg " on:click={() => val_2 = 1}>Upload</button>
            </form>
            <a href="/table"><GradientButton color="pinkToOrange" size="xl" on:click={() => val = 0} class="text-xl drop-shadow-md">Ver tabela</GradientButton></a>
    {:else}
            <Label for="link" class="text-4xl text-white font-semibold drop-shadow-md">Insira o seu link</Label>
            <form method="post" enctype="multipart/form-data" class="flex flex-col justify-center items-center gap-8 w-1/3">
                <input type="text" name="text" class="bg-gray-100 rounded-xl w-full"/>
                <button type="submit" class="bg-orange-500 rounded-xl text-white px-8 py-3 text-lg " on:click={() => val_2 = 1}>Upload</button>
            </form>
            <a href="/table"><GradientButton color="pinkToOrange" size="xl" on:click={() => val = 0} class="text-xl drop-shadow-md">Ver tabela</GradientButton></a>
    {/if}
</div>