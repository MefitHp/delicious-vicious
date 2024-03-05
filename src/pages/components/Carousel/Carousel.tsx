import { Box, Paper, Text, Title, rem } from "@mantine/core";
import { Carousel } from "@mantine/carousel";

import { BannerType } from "../../types";

import classes from "./CardsCarousel.module.css";

function Card({ titulo, imagen, descripcion }: BannerType) {
  return (
    <Paper
      shadow="md"
      p="xl"
      style={{ backgroundImage: `url(${imagen?.url})` }}
      className={classes.card}
    >
      <div className={classes.overlay}>
        <Box>
          <Title order={3} className={classes.title}>
            {titulo}
          </Title>
          <Text className={classes.category} size="md">
            {descripcion}
          </Text>
        </Box>
      </div>
    </Paper>
  );
}

const CarouselComponent = ({ items }: any) => {
  const slides = items.map((item: BannerType) => (
    <Carousel.Slide key={item.titulo}>
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
