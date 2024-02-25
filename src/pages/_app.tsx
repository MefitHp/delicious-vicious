import Head from "next/head";
import { Container, MantineProvider } from "@mantine/core";

import { theme } from "../../theme";
import { Footer } from "./components/shared/Footer";
import Nav from "./components/shared/Nav";
import "@mantine/core/styles.css";

export default function App({ Component, pageProps }: any) {
  return (
    <MantineProvider theme={theme}>
      <Head>
        <title>Delicious Vicious 🍪</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>
      <Nav />
      <Container>
        <Component {...pageProps} />
      </Container>
      <Footer />
    </MantineProvider>
  );
}
