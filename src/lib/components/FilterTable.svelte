<script lang="ts">
    import { GradientButton, Button, Dropdown, DropdownItem, DropdownDivider, Checkbox, TableSearch, Table, TableHead, TableHeadCell, TableBody, TableBodyCell, TableBodyRow, Footer } from 'flowbite-svelte'
    import { AngleLeftOutline, AngleRightOutline, AngleDownOutline } from 'flowbite-svelte-icons';
    import {onMount} from "svelte";

    export let data;

    let keys = data.map((row) => Object.keys(row))[0];
    let index = 0
    let search = ''
    let toggle = false

    // Store all unique values from each key
    let unique_values = {};
    for (let i = 0; i < keys.length; i++) {
        unique_values[keys[i]] = Array.from(new Set(data.map((row) => row[keys[i]])));
    }

    let filters = {}

    // Column visibility
    let columnVisibility = {};

    for (let i = 0; i < keys.length; i++) {
        columnVisibility[keys[i]] = true;
    }

    function toggleColumnVisibility(key) {
        columnVisibility[key] = !columnVisibility[key];
    }

    // Add value to list of values for each key if value doesn't exist, or remove it if it does
    const change_filter = (key, value) => {
        if (filters[key] && filters[key].includes(value)) {
            filters[key] = filters[key].filter((val) => val !== value);

            // Remove key from filters if it's empty
            if (filters[key].length == 0) {
                delete filters[key];
            }
        } else {
            filters[key] = filters[key] ? [...filters[key], value] : [value];
        }

        console.log(filters);
    }

    const download = () => {
        const csv = filteredData.map(row => Object.values(row).join(',')).join('\n')
        const blob = new Blob([csv], {type: 'text/csv'})
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.download = 'export.csv'
        link.href = url
        link.click()
    }

    // Filter data based on filters, apply search, and lock it to 10 rows
    $: filteredData = data
        .filter((row) => Object.keys(filters).every((key) => filters[key].includes(row[key])))
        .filter((row) => Object.keys(row).some((key) => String(row[key]).toLowerCase().includes(search.toLowerCase())))
        .slice(index, index + 10)


    let numeroRecebido;
    let dadosRecebidos=[];
    let indexRegistoRecebido;
    //usado para criar colunas especificas dependendo da table
    import {dados_registo, numero, numero_registo} from '../../store.js';
    import * as csvToJson from "convert-csv-to-json";
    onMount(() => {
        const unsubscribe = numero.subscribe(value => {
            numeroRecebido = value;
        });

        const unsubscribe2 = dados_registo.subscribe(value => {
            dadosRecebidos = value;
        });

        const unsubscribe3 = numero_registo.subscribe(value => {
            indexRegistoRecebido = value;
        });

        // Certifique-se de cancelar a inscrição ao desmontar o componente
        return () => {
            unsubscribe();
            unsubscribe2();
            unsubscribe3();
        };
    })

    //construcao dados para alterar no registo
    function realizarUpdateSala(dados){
        //alterar os dados da tabela

        dadosRecebidos[5] = dados[2];
        dadosRecebidos[6] = dados[3];
        dadosRecebidos[7] = dados[4];
        dadosRecebidos[8] = dados[1];
        dadosRecebidos[10] = dados[0];



        if (numeroRecebido === 2) {
            
            const load = async () => {
                const json2 = new Promise((resolve, reject) => {
                    let data1 = csvToJson.getJsonFromCsv("./uploads/temp.csv");
                    resolve(data1);
                }); return {json2};
            }

            load[indexRegistoRecebido] = dadosRecebidos
            dados_registo.set(Object.values(load[indexRegistoRecebido]))

            //json2[indexRegistoRecebido] = dadosRecebidos;
            //dados_registo.set(Object.values(json2[indexRegistoRecebido]) )

            //dados_registo.set(dadosRecebidos)
            //dados_registo.set(Object.values(json2[indexRegistoRecebido]))
            //

            const csv = json2.map(row => Object.values(row).join(',')).join('\n')
            const blob = new Blob([csv], {type: 'text/csv'})
            const url = URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.download = 'temp.csv'
            link.href = url
            link.click()

        } else {

        }

        numero.set(1);
    }

    function getDadosSala(row){
        numero.set(2);
        dados_registo.set(Object.values(row));

        for (let i = 0; i < data.length; i++) {
            const registro = data[i];
            if (Object.keys(row).every(key => registro[key] === row[key])) {
                numero_registo.set(i);
                break;
            }
        }
    }

    function insereDataSemana(row) {
        var parts = row[8].split("/");
        var day = parseInt(parts[0]);
        var month = parseInt(parts[1]) - 1; // Months are 0-based
        var year = parseInt(parts[2]);

        // Create a new Date object using the parsed values
        return calculaDataSemana(year, month, day);
    }

    function calculaDataSemana(year, month, day) {
        var date = new Date(year, month, day);

        // Check if the date is valid
        if (isNaN(date.getTime())) {
            return NaN; // Invalid date
        }

        date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
        var yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
        var weekNumber = Math.ceil(((date - yearStart) / 86400000 + 1) / 7);
        return weekNumber;
    }
    

    function insereDataSemestre(row) {
        var parts = row[8].split("/");
        var day = parseInt(parts[0]);
        var month = parseInt(parts[1]) - 1;
        var year = parseInt(parts[2]);

        return calculaDataSemestre(year, month, day);
    }

    function calculaDataSemestre(year, month, day) {
        var date = new Date(year, month, day);

        if (isNaN(date.getTime())) {
            return NaN;
        }

        var semesterStart;
        if (date.getMonth() < 6) {
            semesterStart = new Date(year, 0, 1);
        } else {
            semesterStart = new Date(year, 8, 1);
        }

        var weekNumber =
            Math.ceil((date - semesterStart) / (7 * 24 * 60 * 60 * 1000)) + 1;
        return weekNumber;
    }

</script>

<div>
    <GradientButton color="pinkToOrange" on:click={() => download()}>Download</GradientButton>
    <GradientButton color="pinkToOrange" on:click={() => toggle = !toggle}>Filter {#if toggle} <AngleDownOutline />{:else} <AngleRightOutline />{/if}</GradientButton>

    <p>{search}</p>
    <Dropdown bind:open={toggle} >
        {#each keys as key}
            <DropdownItem>{key}</DropdownItem>
            <Dropdown placement="right-start" class="flex flex-col gap-4 p-4">
                <div class="grid grid-flow-col grid-rows-2 gap-8">
                    {#each unique_values[key] as value}
                        <Checkbox on:change={() => change_filter(key, value)} checked={filters[key] && filters[key].includes(value)}>{value}</Checkbox>
                    {/each}
                </div>
            </Dropdown>
        {/each}
        <DropdownDivider />
        <DropdownItem on:click={() => filters = {}}>Reset</DropdownItem>
    </Dropdown>


    <TableSearch placeholder="Pesquisar..."  bind:inputValue={search} hoverable={true}/>
    <Table>
        <TableHead>
            {#if numeroRecebido === 1}
                <TableHeadCell class="cursor-pointer"></TableHeadCell>
            {/if}
             {#if numeroRecebido === 2 ||numeroRecebido === 3}
                 <TableBodyCell></TableBodyCell>
             {/if}
            {#each keys as header}
                {#if columnVisibility[header]}
                    <TableHeadCell on:click={() => {toggleColumnVisibility(header); console.log(columnVisibility)}} class="cursor-pointer">{header}</TableHeadCell>
                {:else}
                    <TableHeadCell on:click={() => toggleColumnVisibility(header)}><AngleDownOutline /></TableHeadCell>
                {/if}
            {/each}
            <TableHeadCell on:click={() => {}} class="cursor-pointer"
                >Semana do Ano</TableHeadCell
            >
            <TableHeadCell on:click={() => {}} class="cursor-pointer"
                >Semana do Semestre</TableHeadCell
            >
        </TableHead>

        <TableBody>
            {#each filteredData as row}
               <TableBodyRow>
                   {#if numeroRecebido === 1}
                         <a href="/alteracao_sala">
                             <TableBodyCell on:click={() => {getDadosSala(row);}} class="cursor-pointer">
                                 Alterar Sala
                             </TableBodyCell>
                         </a>
                    {/if}
                    {#if numeroRecebido === 2 || numeroRecebido === 3}
                        <a href="/horario">
                        <TableBodyCell on:click={() => {realizarUpdateSala(Object.values(row));}}>Escolher sala</TableBodyCell>
                        </a>
                    {/if}

                    {#each keys as header}
                        {#if columnVisibility[header]}
                            <TableBodyCell>{row[header]}</TableBodyCell>
                        {:else}
                            <TableBodyCell></TableBodyCell>
                        {/if}
                    {/each}
                    <TableBodyCell class="cursor-pointer">
                        {insereDataSemana(Object.values(row))}
                    </TableBodyCell>
                    <TableBodyCell class="cursor-pointer">
                        {insereDataSemestre(Object.values(row))}
                    </TableBodyCell>
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