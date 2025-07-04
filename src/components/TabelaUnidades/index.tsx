import type { Unidade } from '../../types/Unidade';
import type { Despesa } from '../../types/Despesa';
import './TabelaUnidades.scss';

type Props = {
  unidades: Unidade[] | Despesa[];
  tipo: 'unidades' | 'despesas';
};

export default function TabelaUnidades({ unidades, tipo }: Props) {
  if (tipo === 'despesas') {
    return (
      <table className="tabela-unidades">
        <thead>
          <tr>
            <th>Órgão</th>
            <th>Ano</th>
            <th>Mês</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {(unidades.length === 0) ? (
            <tr>
              <td colSpan={4} style={{ textAlign: 'center', color: '#888' }}>
                Nenhum dado encontrado.
              </td>
            </tr>
          ) : (
            (unidades as Despesa[]).map((d) => (
              <tr key={`${d.orgao}-${d.ano}-${d.mes}-${d.valor}`}>
                <td>{d.orgao}</td>
                <td>{d.ano}</td>
                <td>{d.mes}</td>
                <td>R$ {d.valor.toLocaleString('pt-BR')}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    );
  }

  // Renderização padrão de unidades
  console.log('Unidades recebidas:', unidades);
  return (
    <table className="tabela-unidades">
      <thead>
        <tr>
          <th>Órgão</th>
          <th>Código</th>
          <th>Sigla</th>
        </tr>
      </thead>
      <tbody>
        {(unidades.length === 0) ? (
          <tr>
            <td colSpan={3} style={{ textAlign: 'center', color: '#888' }}>
              Nenhum dado encontrado.
            </td>
          </tr>
        ) : (
          (unidades as any[])
            .filter(u => u && u.codigo_unidade && u.nome_amigavel && u.sigla_proposta)
            .map((u, i) => (
              <tr key={`${u.nome_amigavel}-${u.codigo_unidade}`} className={i % 2 ? 'alt' : ''}>
                <td>{u.nome_amigavel}</td>
                <td>{u.codigo_unidade}</td>
                <td>{u.sigla_proposta}</td>
              </tr>
            ))
        )}
      </tbody>
    </table>
  );
}