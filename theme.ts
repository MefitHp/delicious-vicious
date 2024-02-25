import { MantineColorsTuple, createTheme } from "@mantine/core";

import localFont from "next/font/local";

const acuminVariableFont = localFont({
  src: "./public/fonts/acumin-variable.ttf",
});

const richMastFont = localFont({
  src: "./public/fonts/richu-mast-regular.ttf",
});

const primaryColor: MantineColorsTuple = [
  "#f2f8f5",
  "#e6ece9",
  "#c7d9d0",
  "#a5c5b5",
  "#89b49e",
  "#77a98f",
  "#6ca487",
  "#5b8f74",
  "#4f8067",
  "#3f6f57",
];

const greenColor: MantineColorsTuple = [
  "#e5ffe8",
  "#ceffd3",
  "#9cffa7",
  "#66ff78",
  "#3cff51",
  "#24ff38",
  "#14ff28",
  "#00e31b",
  "#00c912",
  "#00ae01",
];

export const theme = createTheme({
  /* Put your mantine theme override here */
  primaryColor: "teal",
  colors: {
    teal: primaryColor,
    green: greenColor,
  },
  fontFamily: acuminVariableFont.style.fontFamily,
  headings: {
    fontFamily: richMastFont.style.fontFamily,
  },
});
