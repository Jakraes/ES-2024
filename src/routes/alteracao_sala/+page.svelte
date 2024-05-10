<script>
    import { GradientButton} from 'flowbite-svelte';
    import {onMount} from "svelte";
    import FilterTable from '$lib/components/FilterTable.svelte';
    import Loading from '$lib/components/Loading.svelte';

    let colunasOpcao = ["Sala", 'Data','hora de inicio', 'hora de fim', 'tipo de sala']

    let horas = ["08:00:00","09:30:00","11:00:00","12:30:00",
                    "13:00:00","14:30:00","16:00:00","17:30:00",
                     "18:00:00","19:30:00","21:00:00","22:30:00"]

    let paresHoras = [];

    for (let i = 0; i < horas.length - 1; i++) {
        if ((i+1)%4 !== 0) {
            paresHoras.push(horas[i] + " - " + horas[i + 1]);
        }
    }

    let diasSemana = ["seg","ter","qua","qui","sex","sáb"]

    function datasEntreDuasDatasFiltro(dataInicio, dataFim, datasExcluidas) {
    const datasEntre = [];

    const partesInicio = dataInicio.split('/');
    const partesFim = dataFim.split('/');

    const inicio = new Date(partesInicio[2], partesInicio[1] - 1, partesInicio[0]);
    const fim = new Date(partesFim[2], partesFim[1] - 1, partesFim[0]);

    for (let data = inicio; data <= fim; data.setDate(data.getDate() + 1)) {
      const dia = data.getDate().toString().padStart(2, '0');
      const mes = (data.getMonth() + 1).toString().padStart(2, '0');
      const ano = data.getFullYear();

      const dataFormatada = `${dia}/${mes}/${ano}`;

      if (!datasExcluidas.includes(dataFormatada) && data.getDay() !== 0 ) {
        datasEntre.push(dataFormatada);
      }
    }

    return datasEntre;
  }

    let datasNatal = datasEntreDuasDatasFiltro("19/12/2022","02/01/2023",[])
    let datasCarnaval = datasEntreDuasDatasFiltro("20/02/2023","26/02/2023",[])
    let datasPascoa = datasEntreDuasDatasFiltro("03/04/2023","15/04/2023",[])

    let datas1Semestre = datasEntreDuasDatasFiltro("01/09/2022","17/12/2022",datasNatal)
    let datas2Semestre = datasEntreDuasDatasFiltro("30/01/2023","27/05/2023",[...datasCarnaval, ...datasPascoa])

    function listaAND(lista1, lista2) {//criar ua lista que contem os valores comuns entre as listas dadas
    const listaResultado = [];
    for (let elemento of lista1) {
      if (lista2.includes(elemento)) {
        listaResultado.push(elemento);
      }
    }
    return listaResultado;
  }

    let dataInicio = '';
    let dataFim = '';
    let datasResultantes = [];

    function calcularDatas() {
    datasResultantes = datasEntreDuasDatasFiltro(dataInicio, dataFim,[]);
    let datas = listaAND(datasResultantes,datas1Semestre);
    if (datas.length !== 0 ){
        datasResultantes = listaAND(datasResultantes,datas1Semestre);
    } else {
        datasResultantes = listaAND(datasResultantes,datas2Semestre);
    }
  }

    let dataInicioExcluir = '';
    let dataFimExcluir = '';
    let datasResultantesExcluir = [];

    function calcularDatasExcluir() { datasResultantesExcluir = datasEntreDuasDatasFiltro(dataInicioExcluir, dataFimExcluir,[]); }

    export let data;
    let js;

    onMount(async () => {
        js = await data.json
    })

    let listaSala = [];
    let nome_sala_incluir = "";

    const diasDaSemana = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];

    let opcaoSubstituicaoSalaBase = [];
    function criarOpcaoSubstituirSala() {

        if (opcaoSubstituicaoSalaBase.length>0){
            opcaoSubstituicaoSalaBase = []
        }

        listaSala = js.map((row) => Object.values(row)[1]);
        calcularDatas()

        const novaOpcaoSubstituicaoSalaBase = [];

        for (let s of listaSala) {
            for (let d of datasResultantes) {
                for (let i = 0; i < horas.length - 1; i++) {
                    if ((i + 1) % 4 !== 0) {

                        const partesData = d.split('/');
                        const dia = parseInt(partesData[0], 10); // Converte o dia em um número inteiro
                        const mes = parseInt(partesData[1], 10) - 1; // Os meses em JavaScript são base 0 (janeiro é 0)
                        const ano = parseInt(partesData[2], 10);

                        const semana = diasDaSemana[new Date(ano, mes, dia).getDay()]

                        const checkboxIdsemana = `incluir_semana_${semana.trim()}`;
                        const checkboxsemana = document.getElementById(checkboxIdsemana);
                        const diaDaSemanaSelecionado = checkboxsemana.checked;

                        const checkboxIdhora = `incluir_hora_${semana.trim()}`; // em falta
                        const checkboxhora = document.getElementById(checkboxIdhora);
                        const horaSelecionado = checkboxhora.checked;


                        if (diaDaSemanaSelecionado) {
                            novaOpcaoSubstituicaoSalaBase.push({Sala: s,Data: d, "Dia da Semana": semana, "Hora": [horas[i], horas[i + 1]]});
                        }
                    }
                }
            }
        }

        opcaoSubstituicaoSalaBase = novaOpcaoSubstituicaoSalaBase;
    }


</script>

<div class="w-full flex flex-col justify-center items-center gap-16" style="background-color: gray">
    <h1>Substituicao de aula</h1>

    <table>
        <tr>
            <th><label>Caracteristicas que quer</label></th>
        </tr>

        <tr align="left">
            <th>
                <label>Data de inicio:
                    <input type="text" id="dataInicio" bind:value={dataInicio}>
                </label><br>
                <label>Data de fim:
                    <input type="text" id="dataFim" bind:value={dataFim}>
                </label><br>

                <label>Dia da semana:<br>
                {#each diasSemana as item}
                    <label>
                    <input type="checkbox" id="incluir_semana_{ item }" checked/>
                    { item }
                    </label>
                {/each}</label><br>

                <label>Horas:<br>
                 {#each paresHoras as item}
                    <label>
                    <input type="checkbox" name="incluir_hora{ item }" checked/>
                    { item } <br>
                    </label>
                {/each}</label><br>
                <label>Nome de sala:  <input id="nome_sala_incluir" bind:value={nome_sala_incluir} /></label><br>
                <label>Tipo de sala:  <input name="tipo_sala_incluir"/></label><br>
            </th>


        </tr>
    </table>

    <!-- Tabela com as opções possiveis-->
    <!-- Filtros -->
    <!-- Colunas: escolher a opçao,sala, data, hora de inicio, hora de fim, caracteristicas, botao para remover opçao-->
    <!-- Menu da opçao-->


    <GradientButton color="pinkToOrange" size="xl" class="text-xl drop-shadow-md" on:click={criarOpcaoSubstituirSala}>Calcular Datas</GradientButton>
    <GradientButton color="pinkToOrange" size="xl" class="text-xl drop-shadow-md">Adicionar opcao</GradientButton>


    {#if opcaoSubstituicaoSalaBase.length > 0}
        <h2>Datas entre {dataInicio} e {dataFim}:</h2>
        <ul>
            <FilterTable data={opcaoSubstituicaoSalaBase} />
        </ul>
    {/if}
</div>
<!--
{#await data.json}
    <Loading />
{:then _}
    <div class="h-dvh p-4">
        <FilterTable data={opcaoSubstituicaoSalaBase} />
    </div>
{:catch error}
    <p>{error.message}</p>
{/await}

-->