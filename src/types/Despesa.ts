export interface Despesa {
    valor: number;
    ano: number;
    mes: number;
    orgao: string;
    valor_emp: string;
    data?: string;
    unidade_gestora?: string;
    descricao?: string;
    credor_nome?: string;
    num_doc?: string;
  }