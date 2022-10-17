import "../styles/globals.css";
import type { AppProps } from "next/app";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
// import { RecoilRoot } from "recoil";


// need to learn abot this Session type
function MyApp({ Component, pageProps: { session  , ...pageProps } }: AppProps<{session : Session}>) {
  return (
    <SessionProvider session={session}>
      {/* To keeep our application throught our application */}
      {/* <RecoilRoot> */}
        <Component {...pageProps} />
      {/* </RecoilRoot> */}
    </SessionProvider>
  );
}

export default MyApp;
