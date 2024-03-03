"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_core2 = require("@keystone-6/core");

// src/keystone/schema.ts
var import_core = require("@keystone-6/core");
var import_access = require("@keystone-6/core/access");
var import_fields = require("@keystone-6/core/fields");
var lists = {
  User: (0, import_core.list)({
    // WARNING
    //   for this starter project, anyone can create, query, update and delete anything
    //   if you want to prevent random people on the internet from accessing your data,
    //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
    access: import_access.allowAll,
    // this is the fields for our User list
    fields: {
      // by adding isRequired, we enforce that every User should have a name
      //   if no name is provided, an error will be displayed
      name: (0, import_fields.text)({ validation: { isRequired: true } }),
      email: (0, import_fields.text)({
        validation: { isRequired: true },
        // by adding isIndexed: 'unique', we're saying that no user can have the same
        // email as another user - this may or may not be a good idea for your project
        isIndexed: "unique"
      }),
      password: (0, import_fields.password)({ validation: { isRequired: true } }),
      createdAt: (0, import_fields.timestamp)({
        // this sets the timestamp to Date.now() when the user is first created
        defaultValue: { kind: "now" }
      })
    }
  }),
  Producto: (0, import_core.list)({
    // WARNING
    //   for this starter project, anyone can create, query, update and delete anything
    //   if you want to prevent random people on the internet from accessing your data,
    //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
    access: import_access.allowAll,
    // this is the fields for our Producto list
    fields: {
      nombre: (0, import_fields.text)({ validation: { isRequired: true } }),
      // the document field can be used for making rich editable content
      //   you can find out more at https://keystonejs.com/docs/guides/document-fields
      descripcion: (0, import_fields.text)({ validation: { isRequired: true } }),
      precio: (0, import_fields.integer)({
        validation: { isRequired: true }
      }),
      es_visible: (0, import_fields.checkbox)(),
      imagen: (0, import_fields.image)({ storage: "my_local_images" }),
      categoria: (0, import_fields.select)({
        options: [
          {
            label: "Cheesecake",
            value: "cheesecake"
          },
          {
            label: "Galletas",
            value: "cookie"
          },
          {
            label: "Brownies",
            value: "brownie"
          }
        ]
      })
    }
  }),
  Order: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      nombre_comprador: (0, import_fields.text)({
        validation: { isRequired: true }
      }),
      email: (0, import_fields.text)({
        validation: { isRequired: true }
      }),
      direccion: (0, import_fields.text)({
        validation: { isRequired: true },
        ui: {
          displayMode: "textarea"
        }
      }),
      referencia: (0, import_fields.text)({
        validation: { isRequired: true }
      }),
      total_orden: (0, import_fields.integer)({
        validation: { isRequired: true }
      }),
      status: (0, import_fields.select)({
        defaultValue: "created",
        options: [
          {
            label: "Orden creada",
            value: "created"
          },
          {
            label: "Orden Pagada",
            value: "paid"
          },
          {
            label: "Orden Finalizada",
            value: "finished"
          }
        ]
      })
    }
  })
};

// auth.ts
var import_crypto = require("crypto");
var import_auth = require("@keystone-6/auth");
var import_session = require("@keystone-6/core/session");
var sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret && process.env.NODE_ENV !== "production") {
  sessionSecret = (0, import_crypto.randomBytes)(32).toString("hex");
}
var { withAuth } = (0, import_auth.createAuth)({
  listKey: "User",
  identityField: "email",
  // this is a GraphQL query fragment for fetching what data will be attached to a context.session
  //   this can be helpful for when you are writing your access control functions
  //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
  sessionData: "name createdAt",
  secretField: "password",
  // WARNING: remove initFirstItem functionality in production
  //   see https://keystonejs.com/docs/config/auth#init-first-item for more
  initFirstItem: {
    // if there are no items in the database, by configuring this field
    //   you are asking the Keystone AdminUI to create a new user
    //   providing inputs for these fields
    fields: ["name", "email", "password"]
    // it uses context.sudo() to do this, which bypasses any access control you might have
    //   you shouldn't use this in production
  }
});
var sessionMaxAge = 60 * 60 * 24 * 30;
var session = (0, import_session.statelessSessions)({
  maxAge: sessionMaxAge,
  secret: sessionSecret
});

// keystone.ts
var import_config = require("dotenv/config");
var keystone_default = withAuth(
  (0, import_core2.config)({
    db: {
      // we're using sqlite for the fastest startup experience
      //   for more information on what database might be appropriate for you
      //   see https://keystonejs.com/docs/guides/choosing-a-database#title
      provider: "postgresql",
      url: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ep-billowing-star-a584btzx.us-east-2.aws.neon.tech/delicious-vicious-dev?sslmode=require`,
      // onConnect: async (context) => {
      //   await seedDemoData(context);
      // }
    },
    ui: {
      basePath: "/admin"
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
          path: "/images"
        },
        storagePath: "public/images"
      }
    }
  })
);
async function seedDemoData(context) {
  if (await context.db.Producto.count() > 0)
    return;
  for (const desserts of [
    {
      nombre: "Brownie de Chocolate",
      descripcion: "Brownie rico y decadente con una textura densa de chocolate.",
      precio: 70,
      es_visible: true,
      categoria: "brownie"
    },
    {
      nombre: "Brownie de Nueces",
      descripcion: "Delicioso brownie cargado con nueces crujientes para obtener una textura y sabor extra.",
      precio: 80,
      es_visible: true,
      categoria: "brownie"
    },
    {
      nombre: "Brownie de Caramelo",
      descripcion: "Brownie indulgente con remolinos de caramelo deliciosamente dulce y pegajoso.",
      precio: 90,
      es_visible: true,
      categoria: "brownie"
    },
    {
      nombre: "Galleta de Mantequilla",
      descripcion: "Galleta suave y masticable hecha con mantequilla de galleta cremosa para una experiencia de sabor \xFAnica.",
      precio: 50,
      es_visible: true,
      categoria: "cookie"
    },
    {
      nombre: "Galleta de Avena con Pasas",
      descripcion: "Cl\xE1sica galleta de avena con pasas con un toque de canela para un bocadillo reconfortante.",
      precio: 40,
      es_visible: true,
      categoria: "cookie"
    },
    {
      nombre: "Galleta de Chocolate",
      descripcion: "Irresistible galleta con chispas de chocolate cargada de trozos de rico chocolate.",
      precio: 60,
      es_visible: true,
      categoria: "cookie"
    },
    {
      nombre: "Cheesecake de Lim\xF3n",
      descripcion: "Cheesecake cremoso infundido con sabor a lim\xF3n y cubierto con un glaseado de lim\xF3n picante.",
      precio: 120,
      es_visible: true,
      categoria: "cheesecake"
    },
    {
      nombre: "Cheesecake de Chocolate",
      descripcion: "Cheesecake de chocolate decadente con una base de galleta de chocolate, perfecto para los amantes del chocolate.",
      precio: 130,
      es_visible: true,
      categoria: "cheesecake"
    },
    {
      nombre: "Cheesecake de Fresa",
      descripcion: "Cheesecake suave y cremoso cubierto con fresas frescas para un toque afrutado.",
      precio: 140,
      es_visible: true,
      categoria: "cheesecake"
    }
  ]) {
    await context.db.Producto.createOne({ data: desserts });
  }
}
//# sourceMappingURL=config.js.map
