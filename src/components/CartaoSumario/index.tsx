import './CartaoSumario.scss';

type Props = {
  titulo: string;
  valor: string | number;
};

export default function SummaryCard({ titulo, valor }: Props) {
  return (
    <div className="summary-card">
      <span className="titulo">{titulo}</span>
      <strong className="valor">{valor}</strong>
    </div>
  );
}
