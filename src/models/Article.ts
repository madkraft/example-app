export interface IArticle {
  title: string;
  url: string;
  createTime: string;
  id: string;
  tags?: string[];
  starred?: boolean;
}

export interface ISubmitForm {
  title: string;
  url: string;
}
