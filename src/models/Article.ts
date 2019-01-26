export interface IArticle {
  title: string;
  url: string;
  tags?: string[];
  starred?: boolean;
}

export interface ISubmitForm {
  title: string;
  url: string;
}

export interface IRecord {
  createdTime: string;
  id: string;
  fields: IArticle;
}
