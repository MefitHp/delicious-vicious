import { Paper, Text, Title, rem } from "@mantine/core";
import { Carousel } from "@mantine/carousel";

import { DessertType } from "../../types";
import classes from "./CardsCarousel.module.css";

function Card({ nombre, imagen, categoria }: DessertType) {
  return (
    <Paper
      shadow="md"
      p="xl"
      style={{ backgroundImage: `url(${imagen?.url})` }}
      className={classes.card}
    >
      <div className={classes.overlay}>
        <Title order={3} className={classes.title}>
          {nombre}
        </Title>
        <Text className={classes.category} size="md">
          {categoria} Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Voluptatibus beatae facere praesentium accusamus harum esse maiores
          non cupiditate mollitia doloribus, aut explicabo sit aliquam sapiente
          voluptatum ab, blanditiis veniam neque.
        </Text>
      </div>
    </Paper>
  );
}

const CarouselComponent = ({ items }: any) => {
  const slides = items.map((item: DessertType) => (
    <Carousel.Slide key={item.nombre}>
      <Card {...item} />
    </Carousel.Slide>
  ));

  return (
    <Carousel
      withIndicators
      slideSize={{ base: "100%", sm: "100%" }}
      slideGap={{ base: rem(2), sm: "xl" }}
      align="start"
      slidesToScroll={1}
    >
      {slides}
    </Carousel>
  );
};

export default CarouselComponent;
