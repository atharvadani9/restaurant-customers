export interface Customer {
  id: number;
  name: string;
  email: string;
}

export const CustomerDefault: Customer = {
  id: 0,
  name: "",
  email: "",
};
