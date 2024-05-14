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



	export let data;

    onMount(async() => {
        js = await data.json
    })


    let numeroRecebido;
    let dadosRecebidos=[];
    let numeroRegistoRecebido;
    //usado para criar colunas especificas dependendo da table
    import {dados_registo, numero, numero_registo} from '../../store.js';
    onMount(() => {
        const unsubscribe = numero.subscribe(value => {
            numeroRecebido = value;
        });

        const unsubscribe2 = dados_registo.subscribe(value => {
            dadosRecebidos = value;
        });

         const unsubscribe3 = numero_registo.subscribe(value => {
            numeroRegistoRecebido = value;
        });

        // Certifique-se de cancelar a inscrição ao desmontar o componente
        return () => {
            unsubscribe();
            unsubscribe2();
            unsubscribe3();

        };
    })
</script>   

    <h1 style="color: white">{dadosRecebidos}</h1>
    <h1 style="color: white">{numeroRegistoRecebido}</h1>

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