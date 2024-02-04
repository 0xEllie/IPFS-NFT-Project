import "./globals.css";

import Head from "next/head";

export const metadata = {
  title: "Ethereum Planet",
  description: "Interacting with NFT contract",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className=" grid text-center rounded-md p-5 text-white
             dark:text-black
           bg-black font-semibold "
      >
        <Head>
          <title>EthereumPlanet</title>
          <meta name="description" content="EthereumPlanet-Dapp" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="min-h-screen items-center justify-between ">
          {children}
        </main>
        <footer className=" items-center pt-5 font-extralight ">
          IPFS NFT PROJECT by Ellie.xyz1991@gmail.com
        </footer>
      </body>
    </html>
  );
}
