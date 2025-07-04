import axios from 'axios';
import type { Despesa } from '../types/Despesa';
import type { Unidade } from '../types/Unidade';

const api = axios.create({
  baseURL: 'https://www.transparencia.ma.gov.br',
});

// GET /api/consulta-despesas?ano=&mes=&codigo_ug=
export async function buscarDespesas(params?: {
  ano?: string;
  mes?: string;
  codigo_ug?: string;
}): Promise<Despesa[]> {
  const { data } = await api.get('/api/consulta-despesas', { params });
  return data;
}

// GET /api/consulta-unidades
export async function buscarUnidades(): Promise<Unidade[]> {
  const { data } = await api.get('/api/consulta-unidades');
  return data;
}

// GET /api/consulta-notas
export async function buscarNotas(params: { ano: string; codigo_ug: string }): Promise<any[]> {
  const { data } = await api.get('/api/consulta-notas', { params });
  return data;
}