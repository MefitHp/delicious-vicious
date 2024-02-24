import { Group, Button, Divider, Box, Burger, Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./Nav.module.css";

const Nav = () => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  return (
    <Box>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <h3>Delicious Vicious</h3>
          <Group h="100%" gap={0} visibleFrom="sm">
            <a href="#" className={classes.link}>
              Inicio
            </a>
            <a href="#" className={classes.link}>
              Munchis
            </a>
            <a href="#" className={classes.link}>
              Contacto
            </a>
          </Group>

          <Group visibleFrom="sm">
            <Button>Arma tu Box! 📦</Button>
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
        </Group>
      </header>

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
        <a href="#" className={classes.link}>
          Home
        </a>
        <a href="#" className={classes.link}>
          Munchies
        </a>
        <a href="#" className={classes.link}>
          Contacto
        </a>
        <Divider my="sm" />
        <Group justify="center" grow pb="xl" px="md">
          <Button>Arma tu Box! 📦</Button>
        </Group>
      </Drawer>
    </Box>
  );
};

export default Nav;
