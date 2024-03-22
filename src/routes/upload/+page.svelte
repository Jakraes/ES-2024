<script lang="ts">
    import { P, Fileupload, Label, Helper, GradientButton, Input, A } from 'flowbite-svelte'

    let val = 0
    let file = ""
    let input = ""

</script>

<div class="w-full h-full flex flex-col justify-center items-center gap-10">
    {#if val == 0}
        <div class="flex justify-center items-center gap-8">
            <GradientButton color="pinkToOrange" size="xl" on:click={() => val = 1} class="text-xl drop-shadow-md">Selecionar ficheiro local</GradientButton>
            <GradientButton color="pinkToOrange" size="xl" on:click={() => val = 2} class="text-xl drop-shadow-md">Selecionar ficheiro online</GradientButton>
        </div>
    {:else if val == 1}
        <Label for="upload" class="text-4xl text-white font-semibold drop-shadow-md">Insira o seu ficheiro CSV</Label>
        <form method="post" enctype="multipart/form-data" class="flex flex-col justify-center items-center gap-8">
            <input type="file" name="file" class="bg-gray-100 rounded-xl" accept=".csv"/>
            <button type="submit" class="bg-orange-500 rounded-xl text-white px-8 py-3 text-lg ">Upload</button>
        </form>
    {:else}
        <Label for="link" class="text-4xl text-white font-semibold drop-shadow-md">Insira o seu link</Label>
        <form method="post" enctype="multipart/form-data" class="flex flex-col justify-center items-center gap-8">
            <input type="file" name="file" class="bg-gray-100 rounded-xl" accept=".csv"/>
            <button type="submit" class="bg-orange-500 rounded-xl text-white px-8 py-3 text-lg ">Upload</button>
        </form>
    {/if}
</div>