import { useEffect, useState, useMemo } from 'react';
import { buscarDespesas, buscarUnidades } from '../services/api';
import type { Unidade } from '../types/Unidade'; 
import type { Despesa } from '../types/Despesa';

export function useTransparencia() {
  // filtros controlados
  const [ano, setAno] = useState('');
  const [mes, setMes] = useState('');
  const [codigoUnidade, setCodigoUnidade] = useState('');

  // dados
  const [despesas, setDespesas] = useState<Despesa[]>([]);
  const [unidades, setUnidades] = useState<Unidade[]>([]);

  // loaders individuais (evita loader infinito)
  const [loadingUnidades, setLoadingUnidades] = useState(true);
  const [loadingDespesas, setLoadingDespesas] = useState(false);
  const carregando = loadingUnidades || loadingDespesas;

  const [erro, setErro] = useState<string | null>(null);

  // carregar unidades uma única vez
  useEffect(() => {
    setLoadingUnidades(true);
    buscarUnidades()
      .then(setUnidades)
      .catch((e) => setErro(e.message))
      .finally(() => setLoadingUnidades(false));
  }, []);

  // carregar despesas sempre que filtros mudarem
  useEffect(() => {
    if (!ano) {
      // limpa despesas e garante que loader não fique ativo
      setDespesas([]);
      return;
    }

    setLoadingDespesas(true);
    buscarDespesas({ ano, mes, codigo_ug: codigoUnidade })
      .then(setDespesas)
      .catch((e) => setErro(e.message))
      .finally(() => setLoadingDespesas(false));
  }, [ano, mes, codigoUnidade]);

  // derivados
  const unidadesFiltradas = useMemo(() => {
    if (!codigoUnidade) return unidades;
    return unidades.filter((u) => u.codigo.includes(codigoUnidade));
  }, [unidades, codigoUnidade]);

  const totalGastosNoAno = useMemo(() => {
    return despesas.reduce((soma, d) => soma + d.valor, 0);
  }, [despesas]);

  return {
    carregando,
    erro,
    unidades: unidadesFiltradas,
    totalGastosNoAno,
    quantidadeOrgaos: unidades.length,
    licitacoes: 68, // TODO conectar endpoint de licitações

    // filtros controlados
    ano,
    setAno,
    mes,
    setMes,
    codigoUnidade,
    setCodigoUnidade,
  };
}