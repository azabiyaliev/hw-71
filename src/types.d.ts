export interface IDishForm {
  title: string;
  price: string;
  image: string;
}

export interface IDish {
  id: string;
  title: string;
  price: string;
  image: string;
}

export interface IDishAPI {
  [id: string]: IDish;
}

