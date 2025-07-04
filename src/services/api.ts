import axios from 'axios';
import type { Despesa } from '../types/Despesa';
import type { Unidade } from '../types/Unidade';

const api = axios.create({
  baseURL: 'https://www.transparencia.ma.gov.br/wp/apiportaldatransparncia',
});

export async function buscarDespesas(): Promise<Despesa[]> {
  const { data } = await api.get('/api/consulta-despesas');
  return data;
}

export async function buscarUnidades(): Promise<Unidade[]> {
  const { data } = await api.get('/api/consulta-unidades');
  return data;
}