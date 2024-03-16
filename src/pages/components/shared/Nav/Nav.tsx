import {
  Group,
  Button,
  Divider,
  Box,
  Burger,
  Drawer,
  Image,
  Paper,
} from "@mantine/core";
import NextImage from "next/image";
import Link from "next/link";
import { useDisclosure } from "@mantine/hooks";
import classes from "./Nav.module.css";
import BrandLogo from "../../../../../public/images/delicious-vicious-logo.png";

const Nav = () => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  return (
    <Box>
      <Paper shadow="md" className={classes.header}>
        <Group justify="space-between" h="100%">
          <Group>
            <Image
              component={NextImage}
              src={BrandLogo}
              h={60}
              fit="contain"
              alt="Delicious Vicious"
            />
          </Group>
          <Group h="100%" gap={0} visibleFrom="sm">
            <Link href="/" className={classes.link}>
              Inicio
            </Link>
            <Link href="/productos" className={classes.link}>
              Munchis
            </Link>
            <Link href="#contacto" className={classes.link}>
              Contacto
            </Link>
          </Group>

          <Group visibleFrom="sm">
            <Link href="/arma-tu-box" className={classes.link}>
              <Button>Arma tu Box! 📦</Button>
            </Link>
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
        </Group>
      </Paper>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <Divider my="sm" />
        <Link href="/" className={classes.link}>
          Inicio
        </Link>
        <Link href="/productos" className={classes.link}>
          Productos
        </Link>
        <Link href="#" className={classes.link}>
          Contacto
        </Link>
        <Divider my="sm" />
        <Group justify="center" grow pb="xl" px="md">
          <Link href="/arma-tu-box" className={classes.link}>
            <Button>Arma tu Box! 📦</Button>
          </Link>
        </Group>
      </Drawer>
    </Box>
  );
};

export default Nav;
