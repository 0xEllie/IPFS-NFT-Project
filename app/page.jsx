"use client";

import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";
import { useWeb3Modal } from "@web3modal/ethers/react";

import { abi, NFT_CONTRACT_ADDRESS } from "../constant";

import { useState, useEffect } from "react";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
} from "@web3modal/ethers/react";
import { BrowserProvider, Contract, formatUnits, parseEther } from "ethers";
import Link from "next/link";
// 1. Get projectId at https://cloud.walletconnect.com
const projectId = process.env.PROJECT_ID;

// 2. Set chains
const holesky = {
  chainId: 17000,
  name: "Holesky",
  currency: "ETH",
  explorerUrl: "https://holesky.etherscan.io/",
  rpcUrl: "https://rpc.holesky.ethpandaops.io",
};

// 3. Create modal
const metadata = {
  name: "Ethereum Planet",
  description: "Mint EP NFT",
};

createWeb3Modal({
  themeMode: "dark",
  themeVariables: {
    "--w3m-color-mix": "gray",
    "--w3m-color-mix-strength": 5,
  },
  ethersConfig: defaultConfig({ metadata }),
  chains: [holesky],
  projectId,
});

export default function Home() {
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const [connectionText, setConnectionText] = useState("Connect Account");
  const [mintText, setMintText] = useState("Public Mint");
  const [tokenIdsMinted, setTokenIdsMinted] = useState("");
  const [nextTokenId, setNextTokenId] = useState("");
  const [loading, setLoading] = useState(false);
  const { open, close } = useWeb3Modal();
  const { walletProvider } = useWeb3ModalProvider();
  const walletHandler = () => {
    open();
    if (chainId !== 17000) {
      window.alert("Change the network to Holesky");
    }
  };

  useEffect(() => {
    if (isConnected) {
      setConnectionText("Disconnect Account");
    } else {
      setConnectionText("Connect Account");
    }
    if (!loading) {
      setLoading(false);
    }
    getTokenIdsMinted();
    setInterval(async function () {
      await getTokenIdsMinted();
    }, 10 * 1000);
  }, [isConnected, tokenIdsMinted, loading]);

  /**
   * getTokenIdsMinted: gets the number of tokenIds that have been minted
   */
  const getTokenIdsMinted = async () => {
    try {
      if (!isConnected) throw Error("User disconnected");

      const provider = new BrowserProvider(walletProvider);

      // connect to the Contract using a Provider, so will only
      // have read-only access to the Contract
      const nftContract = new Contract(NFT_CONTRACT_ADDRESS, abi, provider);
      // call the tokenIds from the contract
      const _tokenIds = await nftContract.tokenIds();
      console.log("tokenIds", _tokenIds);
      setTokenIdsMinted(_tokenIds.toString());
      const _nextTokenId = parseInt(_tokenIds) + 1;
      setNextTokenId(_nextTokenId.toString());
      console.log(`nextTokenId : ${_nextTokenId}`);
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * publicMint: Mint an NFT
   */
  const publicMint = async () => {
    try {
      console.log("Public mint");

      if (chainId !== 17000) {
        window.alert("Change the network to Holesky");
      }
      const ethersProvider = new BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();

      const nftContract = new Contract(NFT_CONTRACT_ADDRESS, abi, signer);
      // call the mint from the contract to mint the EthereumPlanet
      // value signifies the cost of one EthereumPlanet which is "0.01" eth.
      // parsing `0.01` string to ether using the parseEther library from ethersjs
      setLoading(true);
      const tx = await nftContract.mint({
        value: parseEther("0.01"),
      });

      // wait for the transaction to get mined
      await tx.wait();
      setLoading(false);
      setMintText("Minted");

      window.alert(
        "NFT successfully minted!\nview transaction on etherscan:\nhttps://holesky.etherscan.io/tx/" +
          `${tx.hash}`
      );
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };
  return (
    <div className="grid grid-flow-col gap-10 grid-cols-2">
      <div className=" grid-flow-row text-cyan-50 col-start-1 col-span-1">
        <h4 className="text-justify text-pretty text-white pt-20">
          It's a sample for an NFT collection on IPFS ! <br />
          the NFT smart contract has been deployed{" "}
          <Link
            className=" text-blue-400 "
            href="https://holesky.etherscan.io/token/0x6552C18B78A5d3A0481540FDa73752bD7F857E15"
            scroll={true}
          >
            here
          </Link>{" "}
          on Holesky Ethereum testnet <br />
          please connect your wallet on Holesky network in order to mint
          EthereumPlanet NFT
        </h4>
        <div className="pl-5">
          <div
            className="m-10 pt-8 rounded-lg h-20 w-40 bg-emerald-500 bg-primary text-s font-bold
         uppercase leading-normal text-white shadow-white transition duration-150
         ease-in-out hover:bg-primary-600 
         hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
         focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
          focus:outline-none focus:ring-0 active:bg-primary-700 
          active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]  "
          >
            <button
              type="button"
              className="text-justify"
              onClick={walletHandler}
            >
              {connectionText}
            </button>
          </div>
        </div>
        {isConnected && (
          <div className="pl-15 grid grid-flow-row text-justify text-white">
            <h5 className="pt-5 text-justify text-pretty">
              your wallet address : {address}
            </h5>
            <h5 className="text-justify text-pretty pt-5">
              {" "}
              {tokenIdsMinted}/10 have been minted
            </h5>
            <div className="pl-10">
              <div
                className="pl-10 m-5 pt-8 rounded-lg h-20 w-40 bg-emerald-500 inline-block bg-primary text-s font-bold
         uppercase leading-normal text-white shadow-white transition duration-150
         ease-in-out hover:bg-primary-600 
         hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
         focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
          focus:outline-none focus:ring-0 active:bg-primary-700 
          active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]  "
              >
                <button type="button" className="" onClick={publicMint}>
                  {loading ? "Loading..." : mintText}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex text-cyan-50 col-start-2 col-span-full">
        {isConnected && (
          <div>
            <h5 className=" text-center "> next NFT mint </h5>
            <img
              className="rounded-xl mb-10"
              src={`./EthereumPlanet/${nextTokenId}.png`}
            />
          </div>
        )}
      </div>
    </div>
  );
}
