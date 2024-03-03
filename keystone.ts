// Welcome to Keystone!
//
// This file is what Keystone uses as the entry-point to your headless backend
//
// Keystone imports the default export of this file, expecting a Keystone configuration object
//   you can find out more at https://keystonejs.com/docs/apis/config

import { config } from "@keystone-6/core";

// to keep this file tidy, we define our schema in a different file
import { lists } from "./src/keystone/schema";

// authentication is configured separately here too, but you might move this elsewhere
// when you write your list-level access control functions, as they typically rely on session data
import { withAuth, session } from "./auth";
import "dotenv/config";

export default withAuth(
  config({
    db: {
      // we're using sqlite for the fastest startup experience
      //   for more information on what database might be appropriate for you
      //   see https://keystonejs.com/docs/guides/choosing-a-database#title
      provider: "postgresql",
      url: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ep-billowing-star-a584btzx.us-east-2.aws.neon.tech/delicious-vicious-dev?sslmode=require`,
    },
    ui: {
      basePath: "/admin",
    },
    lists,
    session,
    storage: {
      // The key here will be what is referenced in the image field
      my_local_images: {
        // Images that use this store will be stored on the local machine
        kind: "local",
        // This store is used for the image field type
        type: "image",
        // The URL that is returned in the Keystone GraphQL API
        generateUrl: (path) => `/images${path}`,
        // The route that will be created in Keystone's backend to serve the images
        serverRoute: {
          path: "/images",
        },
        storagePath: "public/images",
      },
    },
  })
);

import type { Context } from ".keystone/types";

async function seedDemoData(context: Context) {
  if ((await context.db.Producto.count()) > 0) return;

  for (const desserts of [
    {
      nombre: "Brownie de Chocolate",
      descripcion:
        "Brownie rico y decadente con una textura densa de chocolate.",
      precio: 70,
      es_visible: true,
      categoria: "brownie",
    },
    {
      nombre: "Brownie de Nueces",
      descripcion:
        "Delicioso brownie cargado con nueces crujientes para obtener una textura y sabor extra.",
      precio: 80,
      es_visible: true,
      categoria: "brownie",
    },
    {
      nombre: "Brownie de Caramelo",
      descripcion:
        "Brownie indulgente con remolinos de caramelo deliciosamente dulce y pegajoso.",
      precio: 90,
      es_visible: true,
      categoria: "brownie",
    },
    {
      nombre: "Galleta de Mantequilla",
      descripcion:
        "Galleta suave y masticable hecha con mantequilla de galleta cremosa para una experiencia de sabor única.",
      precio: 50,
      es_visible: true,
      categoria: "cookie",
    },
    {
      nombre: "Galleta de Avena con Pasas",
      descripcion:
        "Clásica galleta de avena con pasas con un toque de canela para un bocadillo reconfortante.",
      precio: 40,
      es_visible: true,
      categoria: "cookie",
    },
    {
      nombre: "Galleta de Chocolate",
      descripcion:
        "Irresistible galleta con chispas de chocolate cargada de trozos de rico chocolate.",
      precio: 60,
      es_visible: true,
      categoria: "cookie",
    },
    {
      nombre: "Cheesecake de Limón",
      descripcion:
        "Cheesecake cremoso infundido con sabor a limón y cubierto con un glaseado de limón picante.",
      precio: 120,
      es_visible: true,
      categoria: "cheesecake",
    },
    {
      nombre: "Cheesecake de Chocolate",
      descripcion:
        "Cheesecake de chocolate decadente con una base de galleta de chocolate, perfecto para los amantes del chocolate.",
      precio: 130,
      es_visible: true,
      categoria: "cheesecake",
    },
    {
      nombre: "Cheesecake de Fresa",
      descripcion:
        "Cheesecake suave y cremoso cubierto con fresas frescas para un toque afrutado.",
      precio: 140,
      es_visible: true,
      categoria: "cheesecake",
    },
  ] as const) {
    await context.db.Producto.createOne({ data: desserts });
  }
}
