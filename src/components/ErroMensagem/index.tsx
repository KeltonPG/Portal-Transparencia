import './ErroMensagem.scss';

type Props = {
  mensagem: string;
};

export default function ErroMensagem({ mensagem }: Props) {
  return (
    <div className="erro-mensagem">
      <p>⚠️ Ocorreu um erro:</p>
      <pre>{mensagem}</pre>
    </div>
  );
}