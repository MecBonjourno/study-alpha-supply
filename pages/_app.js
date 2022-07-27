import "../styles/globals.css";
import { useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import { StoreProvider } from "../utils/Store";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    return () => {
      if (jssStyles) {
        jssStyles.parentElement.removeChild(jssStyles);
      }
    };
  }, []);

  return (
    <SessionProvider session={session}>
      <StoreProvider>
        <PayPalScriptProvider>
          <Component {...pageProps} />
        </PayPalScriptProvider>
      </StoreProvider>
    </SessionProvider>
  );
}

export default MyApp;
