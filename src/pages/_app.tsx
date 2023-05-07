import { type AppType } from "next/app";

import { api } from "~/trpc/api";

import "~/styles/globals.css";
import { DefaultSeo } from "next-seo";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <DefaultSeo
        title="Musicaire"
        description="Discover new music for your library with our AI recommendations"
        openGraph={{
          images: [{ url: "/images/og.png", width: 1200, height: 630 }],
        }}
      />
      <Component {...pageProps} />
    </>
  );
};

export default api.withTRPC(MyApp);
