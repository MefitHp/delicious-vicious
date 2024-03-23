import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { keystoneContext } from "../../keystone/context";
import { DessertType } from "../../types";
import {
  Badge,
  Box,
  Container,
  Divider,
  Flex,
  Grid,
  NumberFormatter,
  SegmentedControl,
  Title,
} from "@mantine/core";
import Image from "next/image";
import classNames from "./Productos.module.css";
import segmentedControlClassnames from "./SegmentedControl.module.css";
import { useEffect, useState } from "react";

const Product = ({
  nombre,
  categoria,
  descripcion,
  imagen,
  precio,
}: DessertType) => {
  return (
    <Flex direction="column" h="100%" className={classNames.productCard}>
      <Box pos="relative" w="100%" h={300} className={classNames.imageWrapper}>
        <Image
          className={classNames.productImage}
          src={imagen?.url}
          sizes="500px"
          fill
          alt={nombre}
        />
      </Box>
      <Container py="sm">
        <Flex align="center" justify="space-between">
          <Title variant="teal" order={3}>
            {nombre}
          </Title>
          <Badge size="lg" color="teal" variant="outline">
            <NumberFormatter prefix="$ " value={precio} suffix=" MXN" />
          </Badge>
        </Flex>
        <Divider my="xs" label={categoria.nombre} labelPosition="left" />

        <span>{descripcion}</span>
      </Container>
    </Flex>
  );
};

const uniqueCategories = (desserts: DessertType[]) =>
  desserts.reduce((acc: Array<string>, dessert) => {
    if (!acc.includes(dessert.categoria.nombre)) {
      acc.push(dessert.categoria.nombre);
    }
    return acc;
  }, []);

const ProductsPage = ({
  desserts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [filteredDesserts, setFilteredDesserts] =
    useState<DessertType[]>(desserts);
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");

  useEffect(() => {
    if (selectedCategory === "Todos") {
      return setFilteredDesserts(desserts);
    }
    const filteredDesserts = desserts.filter(
      (dessert: DessertType) => dessert.categoria.nombre === selectedCategory
    );
    setFilteredDesserts(filteredDesserts);
  }, [selectedCategory, desserts]);

  return (
    <Container size="xl" mih="calc(100vh - 60px - 100px)">
      <Flex py="md" align="center" direction="column" gap="md">
        <Title>Nuestros Productos</Title>
        <Box>
          <SegmentedControl
            classNames={segmentedControlClassnames}
            value={selectedCategory}
            onChange={(value) => setSelectedCategory(value)}
            color="teal"
            radius="xl"
            data={["Todos", ...uniqueCategories(desserts)]}
          />
        </Box>
      </Flex>
      <Grid gutter={20} align="stretch">
        {filteredDesserts.map((producto: DessertType) => (
          <Grid.Col
            key={producto.nombre}
            span={{ base: 12, md: 6, lg: 4, sm: 6, xs: 12 }}
          >
            <Product {...producto} />
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const context = await keystoneContext.withRequest(req, res);
  const desserts = await context.query.Producto.findMany({
    query: `
    nombre
    categoria {
      id
      nombre
    }
    descripcion
    precio
    imagen {
      url
    }
    `,
    where: { es_visible: { equals: true } },
  });

  return {
    props: {
      desserts,
    },
  };
};

export default ProductsPage;
