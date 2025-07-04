import Cabecalho from '../../components/Cabecalho';
import SearchInput from '../../components/AreaPesquisa';
import SummaryCard from '../../components/CartaoSumario';
import TabelaUnidades from '../../components/TabelaUnidades';
import Loader from '../../components/Loader';
import ErroMensagem from '../../components/ErroMensagem/index.tsx';
import { useTransparencia } from '../../hooks/useTransparencia';
import Modal from '../../components/NotasGastos/Modal.tsx';
import { buscarNotas } from '../../services/api';
import { useState } from 'react';
import './Dashboard.scss';

export default function Dashboard() {
  const t = useTransparencia();

  // Estado para modal de notas
  const [modalAberto, setModalAberto] = useState(false);
  const [notas, setNotas] = useState<any[]>([]);
  const [carregandoNotas, setCarregandoNotas] = useState(false);
  const [erroNotas, setErroNotas] = useState<string | null>(null);

  // Função para abrir modal e buscar notas
  const abrirModalNotas = async (despesa: any) => {
    setModalAberto(true);
    setCarregandoNotas(true);
    setErroNotas(null);
    try {
      const resultado = await buscarNotas({ ano: String(despesa.ano), codigo_ug: String(despesa.codigo) });
      setNotas(resultado);
    } catch (e: any) {
      setErroNotas(e.message || 'Erro ao buscar notas');
      setNotas([]);
    } finally {
      setCarregandoNotas(false);
    }
  };

  if (t.carregando) return <Loader />;
  if (t.erro) return <ErroMensagem mensagem={t.erro} />;

  return (
    <>
      <Cabecalho />
      <main className="dashboard">
        <h1 className="titulo-principal">Portal da transparência do Maranhão</h1>
        <div className="filtros">
          <SearchInput placeholder="Pesquisar por ano" value={t.ano} onChange={t.setAno} />
          <SearchInput placeholder="Pesquisar por mês" value={t.mes} onChange={t.setMes} />
          <SearchInput
            placeholder="Pesquisar por código da unidade"
            value={t.codigoUnidade}
            onChange={t.setCodigoUnidade}
          />
        </div>

        <div className="resumo">
          <SummaryCard titulo={`Total de gastos em ${t.ano || '…'}`} valor={`R$ ${t.totalGastosNoAno.toLocaleString('pt-BR')}`} />
          <SummaryCard titulo="Quantidade de órgãos" valor={t.quantidadeOrgaos} />
          <SummaryCard titulo="Licitações" valor="Não informado" />
        </div>

        <h2>Unidades</h2>
        <TabelaUnidades unidades={t.unidades} tipo="unidades" />

        {/* Tabela de despesas, se houver */}
        {t.despesas && t.despesas.length > 0 && (
          <>
            <h2>Despesas</h2>
            <table className="tabela-unidades">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Unidade Gestora</th>
                  <th>Descrição</th>
                  <th>Credor</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>
                  {t.despesas.map((d) => (
                    <tr key={d.num_doc} style={{ cursor: 'pointer' }} onClick={() => abrirModalNotas(d)}>
                      <td>{d?.data || '-'}</td>
                      <td>{d?.unidade_gestora || '-'}</td>
                      <td>{d?.descricao || '-'}</td>
                      <td>{d?.credor_nome || '-'}</td>
                      <td>{d?.valor_emp ? Number(d.valor_emp).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {/* Modal de notas */}
        <Modal 
          isOpen={modalAberto} 
          onClose={() => setModalAberto(false)} 
          notas={notas}
          carregandoNotas={carregandoNotas}
          erroNotas={erroNotas}
        />
      </main>
    </>
  );
}