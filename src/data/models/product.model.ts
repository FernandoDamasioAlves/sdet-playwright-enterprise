export type ProductReference = {
  name: string;
  price: number;
};

export type CartExpectation = ProductReference & {
  quantity: number;
  total: number;
};
