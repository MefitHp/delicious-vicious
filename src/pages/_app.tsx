import "@mantine/core/styles.css";
import Head from "next/head";
import { Container, MantineProvider } from "@mantine/core";
import Nav from "./components/shared/Nav";
import { theme } from "../../theme";
import { Footer } from "./components/shared/Footer";

export default function App({ Component, pageProps }: any) {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
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
