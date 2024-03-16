import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { keystoneContext } from "../../keystone/context";
import { Container, Radio, Title } from "@mantine/core";
import { UnstyledButton } from "@mantine/core";
import classes from "./ImageCheck.module.css";
import { useState } from "react";

type Box = {
  qty: string;
  title: string;
};
const CraftYourBox = ({
  boxes,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [selectedOption, setSelectedOption] = useState<string>(boxes[0].qty);

  const handleOptionSelect = (qty: string) => {
    setSelectedOption(qty);
  };

  const items = boxes.map((box: Box) => (
    <UnstyledButton
      key={box.qty}
      onClick={() => handleOptionSelect(box.qty)}
      data-checked={box.qty === selectedOption || undefined}
      className={classes.button}
    >
      <div className={classes.body}>
        <Radio
          value={box.qty}
          checked={box.qty === selectedOption}
          label={box.title}
          // display="none"
        />
      </div>
    </UnstyledButton>
  ));

  console.log({ value: selectedOption });
  return (
    <Container>
      <Title variant="teal">Arma tu caja</Title>
      <Radio.Group
        className={classes.radioGroup}
        value={selectedOption}
        name="selectBox"
        label="Selecciona el tamaño de tu caja"
        withAsterisk
      >
        {items}
      </Radio.Group>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const context = await keystoneContext.withRequest(req, res);
  const desserts = await context.query.Producto.findMany({
    query: `
    nombre
    categoria
    descripcion
    imagen {
      url
    }
    `,
    where: { es_visible: { equals: true } },
  });
  const boxes = [
    { qty: "5", title: "Monster Box Pequeña" },
    { qty: "10", title: "Monster Box Mediana" },
    { qty: "15", title: "Grande" },
  ];

  return {
    props: {
      boxes,
    },
  };
};

export default CraftYourBox;
