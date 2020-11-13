export interface ICondominiumDuty {
  _id?: string;
  status: string;
  data_proxima_realizacao: string;
  valor_estimado: number;
  obrigacao: string | any;
  fixer: string;
  cnpj_condominio: string;
  id_condominio: string | any;
  cnpj_empresa_executante?: string;
  data_realizacao?: string;
  id_sindico_atual?: string;
  nome_empresa_executante?: string;
  valor_gasto?: number;
}
