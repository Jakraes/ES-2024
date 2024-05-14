<script>
    import {GradientButton, TableBodyCell} from 'flowbite-svelte';
    import {onMount} from "svelte";
    import FilterTable from '$lib/components/FilterTable.svelte';

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

    let dataInicio = '';//default
    let dataFim = '';//default
    let datasResultantes = [];

    function calcularDatas() {
        datasResultantes = datasEntreDuasDatasFiltro(dataInicio, dataFim,[]);
        const firstSemenstre = listaAND(datasResultantes,datas1Semestre);
        const secondSemenstre = listaAND(datasResultantes,datas2Semestre);

        if (firstSemenstre.length !== 0 && secondSemenstre.length !== 0){
            datasResultantes = [... firstSemenstre, ...secondSemenstre]
        } else {
            if (firstSemenstre.length !== 0){datasResultantes = firstSemenstre}
            if (secondSemenstre.length !== 0){datasResultantes = secondSemenstre}
        }
    }

    export let data;
    let js; //dados da caracterização das salas
    let aulas; // dados da aulas marcandas

    onMount(async () => {
        js = await data.json
        aulas = await data.json2
    })

    let listaSala = [];
    let nome_sala_incluir = "";
    const diasDaSemana = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];

    let opcaoSubstituicaoSalaBase = [];
    let dados_inicio_aula = [];
    let dados_fim_aula = [];
    let dados_dia_aula = [];
    let dados_sala_aula = [];

    let dados_aula = [];

    function extracao_hora_sala(){
        dados_inicio_aula= aulas.map((row) => Object.values(row)[6]);
        dados_fim_aula = aulas.map((row) => Object.values(row)[7]);
        dados_dia_aula = aulas.map((row) => Object.values(row)[8]);
        dados_sala_aula = aulas.map((row) => Object.values(row)[10]);

        dados_aula = aulas.map((item, index) => {
        return {
            'hora_inicio': dados_inicio_aula[index],
            'hora_final': dados_fim_aula[index],
            'dia': dados_dia_aula[index],
            'sala': dados_sala_aula[index]
        };
        });
    }

    function criarOpcaoSubstituirSala() {

        if(numeroRecebido===3){
            dados_registo.set([curso,uc,turno,turma,inscritos,"","","","",caracteristicas,""] )
        }

        if (opcaoSubstituicaoSalaBase.length>0){opcaoSubstituicaoSalaBase = [] }
        //dados_aula = extracao_hora_sala();
        listaSala = js.map((row) => Object.values(row)[1]);
        calcularDatas()
        extracao_hora_sala()

        const novaOpcaoSubstituicaoSalaBase = [];

        for (let s of listaSala) {
            for (let d of datasResultantes) {
                for (let i = 0; i < horas.length - 1; i++) {
                    // criar caso exista uma aula numa sala numa hora
                    // obter os dados do temp
                    // percorrer o temp
                    if ((i + 1) % 4 !== 0) {

                        const partesData = d.split('/');
                        const dia = parseInt(partesData[0], 10); // Converte o dia em um número inteiro
                        const mes = parseInt(partesData[1], 10) - 1; // Os meses em JavaScript são base 0 (janeiro é 0)
                        const ano = parseInt(partesData[2], 10);

                        const semana = diasDaSemana[new Date(ano, mes, dia).getDay()]

                        const checkboxIdsemana = `incluir_semana_${semana.trim()}`;
                        const checkboxsemana = document.getElementById(checkboxIdsemana);
                        const diaDaSemanaSelecionado = checkboxsemana.checked;

                        const horaInicio = horas[i];
                        const horaFim = horas[i + 1];

                        const conflito = dados_aula.some((aula) => {
                            return (
                                aula.hora_inicio === horaInicio &&
                                aula.hora_final === horaFim &&
                                aula.dia === d && // Corrigido para comparar com a data atual
                                aula.sala === s
                            );
                        });
                        console.log(conflito);
                        if (diaDaSemanaSelecionado) {
                        if (!conflito) {
                            novaOpcaoSubstituicaoSalaBase.push({ Sala: s, Data: d, "Dia da Semana": semana, "Hora inicio": horaInicio, "Hora fim": horaFim });
                        }
                        }
                    }
                }
            }
        }

        opcaoSubstituicaoSalaBase = novaOpcaoSubstituicaoSalaBase;
    }

    import {dados_registo, numero, numero_registo} from "../../store.js";

    let tipo_alteracao=[];
    let numeroRecebido;
    let num_registo=-1;

     onMount(() => {
        const unsubscribe = dados_registo.subscribe(value => {
            tipo_alteracao = value;
        });

        const unsubscribe2 = numero.subscribe(value => {
            numeroRecebido = value;
        });

         const unsubscribe3 = numero_registo.subscribe(value => {
            num_registo = value;
        });

        // Certifique-se de cancelar a inscrição ao desmontar o componente
        return () => {
            unsubscribe();
            unsubscribe2();
            unsubscribe3();
        };
    })


    let curso;
    let uc;
    let turno;
    let turma;
    let inscritos;
    let caracteristicas;
</script>

<div class="w-full flex flex-col justify-center items-center gap-16" style="background-color: gray">
    <h1>Substituicao de aula</h1>

    {#if numeroRecebido === 3 }
        <p>
        <label>Curso:<input type="text" id="curso" bind:value={curso}></label><br>
        <label>Unidade Curricular<input type="text" id="uc" bind:value={uc}></label><br>
        <label>Turno<input type="text" id="turno" bind:value={turno}></label><br>
        <label>Turma<input type="text" id="turma" bind:value={turma}></label><br>
        <label>Inscritos Noturnos<input type="text" id="inscritos" bind:value={inscritos}></label><br>
        <label>Caracteristicas pedidas para sala<input type="text" id="caracteristicas" bind:value={caracteristicas}></label><br>
        </p>
    {/if}

    <table>
        <tr>
            <th><label>Caracteristicas que quer</label></th>
        </tr>
        <tr>
            <th>
                <label>Data de inicio:<input type="text" id="dataInicio" bind:value={dataInicio}></label><br>
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
    <a href="/horario">
        <GradientButton color="pinkToOrange" on:click={() => { numero.set(1);dados_registo.set([]);numero_registo.set(-1);}}>Retornar Horario</GradientButton>
    </a>
    <a href="/upload">
        <GradientButton color="pinkToOrange" on:click={() => { numero.set(0);dados_registo.set([]);numero_registo.set(-1);}}>Retornar Menu</GradientButton>
    </a>

    {#if opcaoSubstituicaoSalaBase.length > 0}
        <ul>
            <FilterTable data={opcaoSubstituicaoSalaBase} />
        </ul>
    {/if}

    </div>
