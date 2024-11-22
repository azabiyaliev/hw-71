export interface IDishForm {
  title: string;
  price: number;
  image: string;
}

export interface IDish {
  id: string;
  title: string;
  price: number;
  image: string;
}

export interface IDishAPI {
  [id: string]: IDish;
}

export interface IDishAmount {
  dish: IDish;
  counts: number;
}

export interface IOrderFromCustomer {
  [id: string] : number;
}
