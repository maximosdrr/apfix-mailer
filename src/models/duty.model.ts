export interface IDuty {
  id?: string;
  nome_obrigacao: string;
  classificacao: number;
  valor_estimado: number;
  cuidados: [];
  riscos: [];
  dicas_contratacao: [];
  responsavel: [];
  periodicidade_manutencao: { qtd_tempo: number; medida: string };
  url_imagem: string;
  fixer: string;
}
