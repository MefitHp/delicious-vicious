import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { SimpleGrid, Box, Flex, Title, Text } from "@mantine/core";

import { keystoneContext } from "../keystone/context";
import { Carousel } from "./components";
import classes from "./index.module.css";
import image1 from "../../public/images/close_box_with_cookies_outside.jpg";
import image2 from "../../public/images/single_sliced_cookie_with_logo.jpg";
import image3 from "../../public/images/box_with_cookies_inside.jpg";

const imageUrl = image1.src;
const imageUrl2 = image2.src;
const imageUrl3 = image3.src;
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
            backgroundImage: `url("${imageUrl}")`,
          }}
        />
      </SimpleGrid>
      <SimpleGrid cols={{ sm: 2, xs: 1 }} spacing="0">
        <Box
          className={classes.imageCard}
          style={{
            backgroundImage: `url("${imageUrl2}")`,
          }}
        ></Box>
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
            backgroundImage: `url("${imageUrl3}")`,
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
