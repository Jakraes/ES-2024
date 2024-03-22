<script lang="ts">
    import Loading from '$lib/components/Loading.svelte';
    import { Button, Footer, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, TableSearch } from 'flowbite-svelte';
    import { AngleDownOutline, AngleRightOutline, AngleLeftOutline} from 'flowbite-svelte-icons';
    import { onMount } from 'svelte';

    /** @type {import('./$types').PageData} */
	export let data;

    let index = 0
    let search = ''
    let js = []

    let row_1 = true
    let row_2 = true
    let row_3 = true
    let row_4 = true
    let row_5 = true
    let row_6 = true
    let row_7 = true
    let row_8 = true
    let row_9 = true
    let row_10 = true

    onMount(async () => {
        js = await data.json
    })
    
    // Filter for all keys
    $: filteredData = js.filter((row) => Object.keys(row).some((key) => String(row[key]).toLowerCase().includes(search.toLowerCase()))).slice(index, index + 10)
</script>   


{#await data.json}
    <Loading />
{:then _}
    <div class="h-full p-4">
        <TableSearch placeholder="Pesquisar..."  bind:inputValue={search} hoverable={true}/>
        <Table>
            <TableHead>
                {#if row_1}
                    <TableHeadCell on:click={() => row_1 = !row_1}>CURSO</TableHeadCell>
                {:else}
                    <TableHeadCell on:click={() => row_1 = !row_1}><AngleDownOutline /></TableHeadCell>
                {/if}

                {#if row_2}
                    <TableHeadCell on:click={() => row_2 = !row_2}>UNIDADE CURRICULAR</TableHeadCell>
                {:else}
                    <TableHeadCell on:click={() => row_2 = !row_2}> <AngleDownOutline /> </TableHeadCell>
                {/if}

                {#if row_3}
                    <TableHeadCell on:click={() => row_3 = !row_3}>TURNO</TableHeadCell>
                {:else}
                    <TableHeadCell on:click={() => row_3 = !row_3}> <AngleDownOutline /> </TableHeadCell>
                {/if}

                {#if row_4}
                    <TableHeadCell on:click={() => row_4 = !row_4}>TURMA</TableHeadCell>
                {:else}
                    <TableHeadCell on:click={() => row_4 = !row_4}> <AngleDownOutline /> </TableHeadCell>
                {/if}

                {#if row_5}
                    <TableHeadCell on:click={() => row_5 = !row_5}>INSCRITOS</TableHeadCell>
                {:else}
                    <TableHeadCell on:click={() => row_5 = !row_5} > <AngleDownOutline /> </TableHeadCell>
                {/if}

                {#if row_6}
                    <TableHeadCell on:click={() => row_6 = !row_6}>DIA DA SEMANA</TableHeadCell>
                {:else}
                    <TableHeadCell on:click={() => row_6 = !row_6}> <AngleDownOutline /> </TableHeadCell>
                {/if}

                {#if row_7}
                    <TableHeadCell on:click={() => row_7 = !row_7}>HORA INICIO DA AULA</TableHeadCell>
                {:else}
                    <TableHeadCell on:click={() => row_7 = !row_7}> <AngleDownOutline /> </TableHeadCell>   
                {/if}

                {#if row_8}
                    <TableHeadCell on:click={() => row_8 = !row_8}>HORA FIM DA AULA</TableHeadCell>
                {:else}
                    <TableHeadCell on:click={() => row_8 = !row_8}> <AngleDownOutline /> </TableHeadCell>
                {/if}

                {#if row_9}
                    <TableHeadCell on:click={() => row_9 = !row_9}>DATA DA AULA</TableHeadCell>
                {:else}
                    <TableHeadCell on:click={() => row_9 = !row_9}> <AngleDownOutline /> </TableHeadCell>
                {/if}

                {#if row_10}
                    <TableHeadCell on:click={() => row_10 = !row_10}>CARACTERISTICAS</TableHeadCell>
                {:else}
                    <TableHeadCell on:click={() => row_10 = !row_10}> <AngleDownOutline /> </TableHeadCell>
                {/if}

            </TableHead>
            <TableBody>
                {#each filteredData as row}
                    <TableBodyRow>
                        {#if row_1}
                            <TableBodyCell>{row['Curso']}</TableBodyCell>
                        {:else}
                            <TableBodyCell/>
                        {/if}

                        {#if row_2}
                            <TableBodyCell>{row['UnidadeCurricular']}</TableBodyCell>
                        {:else}
                            <TableBodyCell/>
                        {/if}

                        {#if row_3}
                            <TableBodyCell>{row['Turno']}</TableBodyCell>
                        {:else}
                            <TableBodyCell/>
                        {/if}

                        {#if row_4}
                            <TableBodyCell>{row['Turma']}</TableBodyCell>
                        {:else}
                            <TableBodyCell/>
                        {/if}

                        {#if row_5}
                            <TableBodyCell>{row['Inscritosnoturno']}</TableBodyCell>
                        {:else}
                            <TableBodyCell/>
                        {/if}

                        {#if row_6}
                            <TableBodyCell>{row['Diadasemana']}</TableBodyCell>
                        {:else}
                            <TableBodyCell/>
                        {/if}

                        {#if row_7}
                            <TableBodyCell>{row['Horainiciodaaula']}</TableBodyCell>
                        {:else}
                            <TableBodyCell/>
                        {/if}

                        {#if row_8}
                            <TableBodyCell>{row['Horafimdaaula']}</TableBodyCell>
                        {:else}
                            <TableBodyCell/>
                        {/if}

                        {#if row_9}
                            <TableBodyCell>{row['Datadaaula']}</TableBodyCell>
                        {:else}
                            <TableBodyCell/>
                        {/if}

                        {#if row_10}
                            <TableBodyCell>{row['Caracteristicasdasalapedidaparaaaula']}</TableBodyCell>
                        {:else}
                            <TableBodyCell/>
                        {/if}
                    </TableBodyRow>
                {/each}
            </TableBody>
        </Table>
        <Footer class="flex w-full gap-4 m-4">
            <Button color="light" on:click={() => index -= 10} class="w-full"><AngleLeftOutline/></Button>
            <Button color="light" on:click={() => index += 10} class="w-full"><AngleRightOutline/></Button>
        </Footer>
    </div>
{:catch error}
    <p>{error.message}</p>
{/await}