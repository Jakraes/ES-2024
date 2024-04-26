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


    let js = []

    let headers = [];
    let columnVisibility = {};

    onMount(async () => {
        js = await data.json;
    })



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

        <FilterTable data={_} />
    </div>
{:catch error}
    <p>{error.message}</p>
{/await}