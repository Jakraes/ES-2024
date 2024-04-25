<script lang="ts">
    import Loading from '$lib/components/Loading.svelte';
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

        <TableSearch placeholder="Pesquisar..."  bind:inputValue={search} hoverable={true}/>
        <Table>
            <TableHead>
                {#each headers as header}
                    <TableHeadCell>{header}</TableHeadCell>
                {/each}
            </TableHead>
            <TableBody>
                {#each filteredData as row}
                   <TableBodyRow>
                        {#each headers as header}
                            <TableBodyCell>{isVisible(header) ? row[header] : ''}</TableBodyCell>
                        {/each}
                    </TableBodyRow>
                {/each}
            </TableBody>
        </Table>
        <Footer class="flex w-full gap-4 m-4">
            <Button color="light" on:click={() => index = 0 } class="w-full" >Inicio</Button>
            <Button color="light" on:click={() => {if (index > 0) {index -= 10} } } class="w-full" ><AngleLeftOutline/>{index/10}</Button>
            <Button color="light" on:click={() => index += 10} class="w-full"><AngleRightOutline/>{(index + 10)/10}</Button>
        </Footer>
    </div>
{:catch error}
    <p>{error.message}</p>
{/await}