<script lang="ts">
    import FilterTable from '$lib/components/FilterTable.svelte';
import Loading from '$lib/components/Loading.svelte';
    import { json } from '@sveltejs/kit';
    import {
        Button,
        Footer,
        GradientButton,
        Table,
        TableBody,
        TableBodyCell,
        TableBodyRow,
        TableHead,
        TableHeadCell,
        TableSearch
    } from 'flowbite-svelte';
    import { AngleDownOutline, AngleRightOutline, AngleLeftOutline} from 'flowbite-svelte-icons';
    import { onMount } from 'svelte';

    /** @type {import('./$types').PageData} */

    import {dados_registo,numero} from '../../store.js';
    let numeroRecebido=-1;

	export let data;

    onMount(async() => {
        js = await data.json
    })


    onMount(() => {
        const unsubscribe = numero.subscribe(value => {
            numeroRecebido = value;
        });

        // Certifique-se de cancelar a inscrição ao desmontar o componente
        return () => {
            unsubscribe();
        };
    })
</script>   


{#await data.json}
    <Loading />
{:then _}
    <div class="h-dvh p-4">
        <a href="/upload">
        <GradientButton color="pinkToOrange" on:click={() => { numero.set(0);dados_registo.set([]);}}>Retornar Menu</GradientButton>
        </a><br>
        <FilterTable data={_} />
    </div>
{:catch error}
    <p>{error.message}</p>
{/await}