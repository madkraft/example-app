export interface Article {
  title: string;
  id: string;
  url: string;
  tags?: string[];
}

export interface SubmitForm {
  title: string;
  url: string;
}
