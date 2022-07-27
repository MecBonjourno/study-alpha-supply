import {
  AppBar,
  createTheme,
  CssBaseline,
  // Link,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container, ThemeProvider } from "@mui/system";
import Head from "next/head";
import React, { useContext } from "react";
// import NextLink from "next/link";
import useStyles from "../../utils/styles";
import { Store } from "../../utils/Store";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import DropdownLink from "../DropdownLink";
import { Menu } from "@headlessui/react";

export default function Layout({ title, children, description }) {
  const { status, data: session } = useSession();
  const { state, dispatch } = useContext(Store);
  const { darkMode, cart, userInfo } = state;
  const Badge = dynamic(() => import("@mui/material/Badge"), {
    ssr: false,
  });
  const Link = dynamic(() => import("@mui/material/Link"), {
    ssr: false,
  });
  const NextLink = dynamic(() => import("next/link"), {
    ssr: false,
  });
  const theme = createTheme({
    typography: {
      h1: {
        fontSize: "1.6rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
      h2: {
        fontSize: "1.4rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
    },
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#f0c000",
      },
      secondary: {
        main: "#208080",
      },
    },
  });

  const classes = useStyles();
  const logoutClickHandler = () => {
    Cookies.remove("cart");
    dispatch({ type: "CART_RESET" });
    signOut({ callbackUrl: "/login" });
  };
  const changeModeHandler = () => {
    dispatch({ type: "TOGGLE_DARK_MODE" });
    const newDarkMode = !darkMode;
    Cookies.set("darkMode", newDarkMode ? "ON" : "OFF");
  };
  return (
    <div>
      <Head>
        <title>{title ? `${title} - Supply Alpha` : "Supply Alpha"}</title>
        {description && <meta name="description" content={description} />}
      </Head>
      <ToastContainer position="bottom-center" limit={1} />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" className={classes.navbar}>
          <Toolbar>
            <NextLink href="/" passHref>
              <Link>
                <Typography className={classes.brand}>Supply Alpha</Typography>
              </Link>
            </NextLink>
            <div className={classes.grow}></div>
            <div>
              <Switch checked={darkMode} onChange={changeModeHandler}></Switch>
              <NextLink href="/cart" passHref>
                <Link>
                  {cart.cartItems.length > 0 ? (
                    <Badge
                      color="secondary"
                      badgeContent={cart.cartItems.length}
                    >
                      Cart
                    </Badge>
                  ) : (
                    "Cart"
                  )}
                </Link>
              </NextLink>

              {status === "loading" ? (
                "Loading"
              ) : session?.user ? (
                <Menu as="div" className="relative inline-block">
                  <Menu.Button className="text-blue-600">
                    {session.user.name}
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white  shadow-lg ">
                    <Menu.Item>
                      <DropdownLink className="dropdown-link" href="/profile">
                        Profile
                      </DropdownLink>
                    </Menu.Item>
                    <Menu.Item>
                      <DropdownLink
                        className="dropdown-link"
                        href="/order-history"
                      >
                        Order History
                      </DropdownLink>
                    </Menu.Item>
                    <Menu.Item>
                      <a
                        className="dropdown-link"
                        href="#"
                        onClick={logoutClickHandler}
                      >
                        Logout
                      </a>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              ) : (
                <Link href="/login">
                  <a className="p-2">Login</a>
                </Link>
              )}
            </div>
          </Toolbar>
        </AppBar>
        <Container className={classes.main}>{children}</Container>
        <footer className={classes.footer}>
          <Typography>Just a Test. Made by Mecbonjourno</Typography>
        </footer>
      </ThemeProvider>
    </div>
  );
}
