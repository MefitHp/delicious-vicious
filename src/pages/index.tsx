import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { SimpleGrid, Box, em, Divider, Flex, Title, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import { keystoneContext } from "../keystone/context";
import { Carousel } from "./components";
import classes from "./index.module.css";
const imageUrl =
  "https://media.istockphoto.com/id/497959594/photo/fresh-cakes.jpg?s=612x612&w=0&k=20&c=T1vp7QPbg6BY3GE-qwg-i_SqVpstyHBMIwnGakdTTek=";
const imageUrl2 =
  "https://as1.ftcdn.net/v2/jpg/00/96/19/86/1000_F_96198695_oyJg0I7ELpXI6608FI942PX9LlRRyEnd.jpg";
const imageUrl3 =
  "https://as2.ftcdn.net/v2/jpg/01/55/53/79/1000_F_155537960_B4spCfhP8dSCIZwrHyR6XtcQNsliYG7Z.jpg";
export function HomePage({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  const displayFirst = isMobile ? "-1" : "2";

  return (
    <>
      <Carousel items={data} />
      <SimpleGrid cols={{ sm: 2, xs: 1 }} spacing="0">
        <Flex className={classes.card} p="xl" px={80}>
          <Title order={1}>Eat</Title>
          <Text size="lg">
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
          <Text size="lg">
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
          <Text size="lg">
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
