import type { Unidade } from '../../types/Unidade';
//import './TabelaUnidades.scss';

type Props = {
  unidades: Unidade[];
};

export default function TabelaUnidades({ unidades }: Props) {
  return (
    <table className="tabela-unidades">
      <thead>
        <tr>
          <th>Orgão</th>
          <th>Código</th>
          <th>Sigla</th>
        </tr>
      </thead>
      <tbody>
        {unidades.map((u, i) => (
          <tr key={u.id} className={i % 2 ? 'alt' : ''}>
            <td>{u.orgao}</td>
            <td>{u.codigo}</td>
            <td>{u.sigla}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}