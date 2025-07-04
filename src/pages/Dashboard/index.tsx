import Cabecalho from '../../components/Cabecalho';
import SearchInput from '../../components/AreaPesquisa';
import SummaryCard from '../../components/CartaoSumario';
import TabelaUnidades from '../../components/TabelaUnidades';
import Loader from '../../components/Loader';
import ErroMensagem from '../../components/ErroMensagem/index.tsx';
import { useTransparencia } from '../../hooks/useTransparencia';
import './Dashboard.scss';

export default function Dashboard() {
  const t = useTransparencia();

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
          <SummaryCard titulo="Licitações" valor={t.licitacoes} />
        </div>

        <h2>Unidades</h2>
        <TabelaUnidades unidades={t.unidades} tipo="unidades" />
      </main>
    </>
  );
}