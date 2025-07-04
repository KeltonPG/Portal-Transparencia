import { useEffect, useState, useMemo } from 'react';
import { buscarDespesas, buscarUnidades } from '../services/api';
import type { Unidade } from '../types/Unidade'; 
import type { Despesa } from '../types/Despesa';
import { useDebounce } from './useDebounce';

export function useTransparencia() {
  // filtros controlados
  const [ano, setAno] = useState('');
  const [mes, setMes] = useState('');
  const [codigoUnidade, setCodigoUnidade] = useState('');

  // debounce dos filtros
  const debouncedAno = useDebounce(ano, 500);
  const debouncedMes = useDebounce(mes, 500);
  const debouncedCodigoUnidade = useDebounce(codigoUnidade, 500);

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

  // carregar despesas sempre que filtros mudarem (com debounce)
  useEffect(() => {
    // Validação: todos obrigatórios e numéricos
    const anoValido = debouncedAno && !isNaN(Number(debouncedAno));
    const mesValido = debouncedMes && !isNaN(Number(debouncedMes));
    const codigoValido = debouncedCodigoUnidade && !isNaN(Number(debouncedCodigoUnidade));
    if (!anoValido || !mesValido || !codigoValido) {
      setDespesas([]);
      return;
    }

    setLoadingDespesas(true);
    buscarDespesas({ ano: debouncedAno, mes: debouncedMes, codigo_ug: debouncedCodigoUnidade })
      .then(setDespesas)
      .catch((e) => setErro(e.message))
      .finally(() => setLoadingDespesas(false));
  }, [debouncedAno, debouncedMes, debouncedCodigoUnidade]);

  // derivados
  const unidadesFiltradas = useMemo(() => {
    if (!codigoUnidade) return unidades;
    return unidades.filter((u: any) => u && u.codigo_unidade && typeof u.codigo_unidade === 'string' && u.codigo_unidade.includes(codigoUnidade));
  }, [unidades, codigoUnidade]);

  const totalGastosNoAno = useMemo(() => {
    return despesas.reduce((soma, d: any) => soma + Number(d.valor_emp), 0);
  }, [despesas]);

  return {
    carregando,
    erro,
    unidades: unidadesFiltradas,
    despesas,
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