<script lang="ts">
    import FilterTable from '$lib/components/FilterTable.svelte';
import Loading from '$lib/components/Loading.svelte';
    import { json } from '@sveltejs/kit';
    import { Button, Footer, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, TableSearch } from 'flowbite-svelte';
    import { AngleDownOutline, AngleRightOutline, AngleLeftOutline} from 'flowbite-svelte-icons';
    import { onMount } from 'svelte';

    /** @type {import('./$types').PageData} */
	export let data;

    onMount(async () => {
        js = await data.json
    })
</script>   


{#await data.json}
    <Loading />
{:then _}
    <div class="h-dvh p-4">
    </div>
{:catch error}
    <p>{error.message}</p>
{/await}