import { writable } from 'svelte/store';

export const numero = writable(0);

export const dados_registo= writable([])

/**
 * Para caso a pagina faz Atualizar não perder os dados da store.js
const initialNumeroValue = localStorage.getItem('numero') || 0;
export const numero = writable(initialNumeroValue);
numero.subscribe(value => {localStorage.setItem('numero', value);});

const initialdados_registoValue = localStorage.getItem('dados_registo') || [];
export const dados_registo= writable(initialdados_registoValue)
dados_registo.subscribe(value => {localStorage.setItem('dados_registo', value);});
 */
