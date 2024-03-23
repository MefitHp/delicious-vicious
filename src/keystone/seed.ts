import type { Context } from ".keystone/types";

export async function seedDemoData(context: Context) {
  if ((await context.db.Producto.count()) > 0) return;

  for (const cookie of [
    {
      nombre: "Cheesecake de fresa",
      descripcion: "Deliciosa cheesecake de fresa con base de galleta",
      precio: 6,
      es_visible: true,
    },
    {
      nombre: "Cheesecake de chocolate",
      descripcion: "Irresistible cheesecake de chocolate con salsa de caramelo",
      precio: 7,
      es_visible: true,
    },
    {
      nombre: "Cheesecake de limón",
      descripcion: "Refrescante cheesecake de limón con base de galleta",
      precio: 6,
      es_visible: true,
    },
    {
      nombre: "Galletas de chocolate",
      descripcion:
        "Deliciosas galletas de chocolate con trozos de chocolate negro",
      precio: 3,
      es_visible: true,
    },
    {
      nombre: "Galletas de avena y pasas",
      descripcion: "Sabrosas galletas de avena con pasas jugosas",
      precio: 4,
      es_visible: true,
    },
    {
      nombre: "Galletas de mantequilla",
      descripcion: "Clásicas galletas de mantequilla con un toque de vainilla",
      precio: 3,
      es_visible: true,
    },
    {
      nombre: "Brownie de chocolate",
      descripcion: "Suave brownie de chocolate con nueces",
      precio: 5,
      es_visible: true,
    },
    {
      nombre: "Brownie de caramelo",
      descripcion: "Delicioso brownie de caramelo con trozos de toffee",
      precio: 6,
      es_visible: true,
    },
    {
      nombre: "Brownie de nueces",
      descripcion: "Brownie clásico con trozos de nueces",
      precio: 5,
      es_visible: true,
    },
  ] as const) {
    await context.db.Producto.createOne({ data: cookie });
  }
}
