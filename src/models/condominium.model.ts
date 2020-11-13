export interface ICondominium {
  _id?: string;
  cnpj: string;
  razao_social: string;
  nome_fantasia: string;
  socios: [];
  situacao: string;
  data_situacao: string;
  endereco: {
    cep: string;
    cod_municipio: string;
    uf: string;
    municipio: string;
  };
  email: string;
  dutys?: [];
}
