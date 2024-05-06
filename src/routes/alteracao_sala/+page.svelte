<script>
    import { GradientButton} from 'flowbite-svelte';
    import {onMount} from "svelte";

    let opcaoSubstituicaoSalaBase = {}

    export let data;

    onMount(async () => {
        js = await data.json
    })

    function criarOpcaoSubstituirSala() {
        let colunasOpcao = ["Sala", 'Data','hora de inicio', 'hora de fim', 'tipo de sala']
        let horas = ["08:00:00","09:30:00","11:00:00","12:30:00",
                    "13:00:00","14:30:00","16:00:00","17:30:00",
                     "18:00:00","19:30:00","21:00:00","22:30:00"]
        // let diasSemana = ["seg","ter","qua","qui","sex","sáb"]
        // lista de dias de aulas do ano letivo
        // obter da caratericaçao das salas = sala e tipo de sala

        //criar uma matriz com as colunasopcao, horas, e os dados da caratericacao das salas

        //durante o processo de criar a matriz verificar
        //se existe uma aula numa certo dia,hora e sala pelos dados do temp.cvs
        //se existe não irá adicionar na matriz nessa sala, esse dia nessa hora

        //por fim guardar essa matriz numa variavel
    }


</script>

<div class="w-full h-full flex flex-col justify-center items-center gap-16">
    <h1>Substituicao de aula</h1>

    <table>
        <tr>
            <th><label>Caracteristicas que quer</label></th>
            <th><label>Caracteristicas que não quer</label></th>
        </tr>

        <tr>
            <th>
                <label>Data de inicio: </label><br>
                <label>Data de fim: </label><br>
                <label>Dia da semana: </label><br>
                <label>Hora de inicio: </label><br>
                <label>Hora de fim: </label><br>
                <label>Tipo de sala: </label><br>
            </th>
            <th>
                <label>Datas: </label><br>
                <label>Dia da semana: </label><br>
                <label>Hora de inicio: </label><br>
                <label>Hora de fim: </label><br>
                <label>Tipo de sala: </label><br>
             </th>
        </tr>
    </table>

    <!-- Tabela com as opções possiveis-->
    <!-- Filtros -->
    <!-- Colunas: escolher a opçao,sala, data, hora de inicio, hora de fim, caracteristicas, botao para remover opçao-->
    <!-- Menu da opçao-->
    <a href="/upload">
        <GradientButton color="pinkToOrange" size="xl" class="text-xl drop-shadow-md">Procurar</GradientButton>
    </a >

    <a href="/upload">
        <GradientButton color="pinkToOrange" size="xl" class="text-xl drop-shadow-md">Adicionar opcao</GradientButton>
    </a >
</div>