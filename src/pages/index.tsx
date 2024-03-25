import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { SimpleGrid, Box, Flex, Title, Text } from "@mantine/core";

import { keystoneContext } from "../keystone/context";
import { Carousel } from "./components";
import classes from "./index.module.css";

const bucketStaticPath = "https://delicious-vicious.s3.amazonaws.com/static";
export function HomePage({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Carousel items={data} />
      <SimpleGrid cols={{ sm: 2, xs: 1 }} spacing="0">
        <Flex className={classes.card} p="xl" px={80}>
          <Title order={1}>Eat</Title>
          <Text size="xl">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque
            expedita libero tempora aspernatur rem culpa officia, nihil
            praesentium, suscipit nam nesciunt ut maiores iusto deleniti odio
            corporis exercitationem fugiat voluptates?
          </Text>
        </Flex>
        <Box
          className={classes.imageCard}
          style={{
            backgroundImage: `url("${bucketStaticPath}/COOKIE_BOX_CLOSED.jpg")`,
          }}
        />
      </SimpleGrid>
      <SimpleGrid cols={{ sm: 2, xs: 1 }} spacing="0">
        <Box
          className={classes.imageCard}
          style={{
            backgroundImage: `url("${bucketStaticPath}/COOKIE_BOX_CLOSEUP.jpg")`,
          }}
        />
        <Flex className={classes.card} p="xl" px={80}>
          <Title order={1}>Drink</Title>
          <Text size="xl">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque
            expedita libero tempora aspernatur rem culpa officia, nihil
            praesentium, suscipit nam nesciunt ut maiores iusto deleniti odio
            corporis exercitationem fugiat voluptates?
          </Text>
        </Flex>
      </SimpleGrid>
      <SimpleGrid cols={{ sm: 2, xs: 1 }} spacing="0">
        <Flex className={classes.card} p="xl" px={80}>
          <Title order={1}>Enjoy</Title>
          <Text size="xl">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque
            expedita libero tempora aspernatur rem culpa officia, nihil
            praesentium, suscipit nam nesciunt ut maiores iusto deleniti odio
            corporis exercitationem fugiat voluptates?
          </Text>
        </Flex>
        <Box
          className={classes.imageCard}
          style={{
            backgroundImage: `url("${bucketStaticPath}/LOGO_WITH_CAT.jpg")`,
          }}
        />
      </SimpleGrid>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const context = await keystoneContext.withRequest(req, res);
  const data = await context.query.Portada.findMany({
    query: `
    titulo
    descripcion
    imagen {
      url
    }
    `,
    where: { es_visible: { equals: true } },
  });

  return {
    props: {
      data,
    },
  };
};

export default HomePage;
