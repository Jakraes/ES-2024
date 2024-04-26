<script lang="ts">
    import Loading from '$lib/components/Loading.svelte';
    import {
        GradientButton,
    } from 'flowbite-svelte';
    import { AngleDownOutline, AngleRightOutline, AngleLeftOutline} from 'flowbite-svelte-icons';
    import { onMount } from 'svelte';
    import FilterTable from '$lib/components/FilterTable.svelte';

    /** @type {import('./$types').PageData} */
    export let data;

    let index = 0
    let search = ''
    let js = []

    let headers = [];
    let columnVisibility = {};

    onMount(async () => {
        js = await data.json;
        headers = Object.keys(js[0] || {});
        headers.forEach(header => {
            columnVisibility[header] = true;
        });
    })


   function toggleColumnVisibility(index) {
        columnVisibility[index] = !columnVisibility[index];
        columnVisibility = [...columnVisibility]; // Atualizar a reatividade
    }

    function isVisible(column) {
        return columnVisibility[column] !== false;
    }


    // Filter for all keys
    $: filteredData = js.filter((row) => Object.keys(row).some((key) => String(row[key]).toLowerCase().includes(search.toLowerCase()))).slice(index, index + 10)
    //<TableHeadCell on:click={() => toggleColumnVisibility(header)}>{header}{#if isVisible(header)} <AngleDownOutline />{/if}</TableHeadCell>

</script>

{#await data.json}
    <Loading />
{:then _}
    <div class="h-full p-4">
        <a href="/upload">
            <GradientButton color="pinkToOrange" size="xl" on:click={() => val = 0} class="text-xl drop-shadow-md">
                Voltar do Menu
            </GradientButton>
        </a>

    </div>
{:catch error}
    <p>{error.message}</p>
{/await}