export type DessertType = {
  nombre: string;
  descripcion: string;
  imagen: { url: string };
  precio: number;
  es_visible: boolean;
  categoria: "cheesecake" | "cookie" | "brownie";
};
