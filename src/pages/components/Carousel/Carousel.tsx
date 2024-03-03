import { Paper, Text, Title, rem } from "@mantine/core";
import classes from "./CardsCarousel.module.css";
import { DessertType } from "../../types";
import { Carousel } from "@mantine/carousel";

function Card({ nombre, imagen, categoria }: DessertType) {
  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      style={{ backgroundImage: `url(${imagen?.url})` }}
      className={classes.card}
    >
      <div className={classes.overlay}>
        <Text className={classes.category} size="xs">
          {categoria}
        </Text>
        <Title order={3} className={classes.title}>
          {nombre}
        </Title>
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
