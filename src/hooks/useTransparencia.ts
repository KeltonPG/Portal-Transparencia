import { useEffect, useState, useMemo } from 'react';
import { buscarDespesas, buscarUnidades } from '../services/api';
import type { Unidade } from '../types/Unidade';
import type { Despesa } from '../types/Despesa';

export function useTransparencia() {
  // states de busca
  const [ano, setAno] = useState('');
  const [mes, setMes] = useState('');
  const [codigoUnidade, setCodigoUnidade] = useState('');

  // dados
  const [despesas, setDespesas] = useState<Despesa[]>([]);
  const [unidades, setUnidades] = useState<Unidade[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  // carregar dados brutos
  async function carregar() {
    setCarregando(true);
    try {
      const [d, u] = await Promise.all([buscarDespesas(), buscarUnidades()]);
      setDespesas(d);
      setUnidades(u);
    } catch (e: any) {
      setErro(e.message || 'Erro desconhecido');
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  // filtros locais (feito em memo para não recalcular sempre)
  const unidadesFiltradas = useMemo(() => {
    if (!codigoUnidade) return unidades;
    return unidades.filter((u) => u.codigo.includes(codigoUnidade));
  }, [unidades, codigoUnidade]);

  const totalGastosNoAno = useMemo(() => {
    if (!ano) return 0;
    return despesas
      .filter((d) => d.ano.toString() === ano)
      .reduce((soma, d) => soma + d.valor, 0);
  }, [despesas, ano]);

  const quantidadeOrgaos = unidades.length;

  // interface pública
  return {
    // dados prontos
    carregando,
    erro,
    unidades: unidadesFiltradas,
    totalGastosNoAno,
    quantidadeOrgaos,
    licitacoes: 68, // placeholder até conectar endpoint

    // controles
    ano,
    setAno,
    mes,
    setMes,
    codigoUnidade,
    setCodigoUnidade,
  };
}