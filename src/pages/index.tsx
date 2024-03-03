import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import { keystoneContext } from "../keystone/context";
import { Carousel } from "./components";

export function HomePage({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Carousel items={data} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const context = await keystoneContext.withRequest(req, res);
  const data = await context.query.Producto.findMany({
    query: `
    nombre
    categoria
    descripcion
    imagen {
      url
    }
    `,
  });
  console.log({ data });
  return {
    props: {
      data,
    },
  };
};

export default HomePage;
