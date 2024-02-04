# Sample NFT Project on IPFS

Reading about IPFS made me thinking of building a sample project on IPFS to have a better understanding of it. So here you are:

IPFS is a decentralized network of peer to peer nodes for storing and sharing files. Files on IPFS are content addressed, and each file is identified based on it's content hash. This content hash is referred to as a CID - a Content ID. You will often hear the term "IPFS CID" when working with IPFS.

Anyone can run an IPFS node and upload files to that node. The node will hash those files, and make their CID's publicly known to the rest of the network. If someone else is interested in that content, they can request for the contents of that CID, and eventually the request will reach your node, and you can then serve their request, Interesting!

This project is a simple NFT project with it's metadata on IPFS. I used [Pinata](https://www.pinata.cloud/) IPFS provider to upload Ethereum Planet NFT metadata.

- the IPFS CID for EP NFT collection: QmVr3BHAdTJ9Bm48w1iGUUtYaL45PikNnBR1MpGdBcyAFE
- link to data uploaded on IPFS : https://ipfs.io/ipfs/QmVr3BHAdTJ9Bm48w1iGUUtYaL45PikNnBR1MpGdBcyAFE/

EthereumPlanet contract is basic ERC721 developed and deployed by hardhat framework. the only thing was a little bit challenging to me, was verifying the contract code on [Holesky](https://holesky.ethpandaops.io/) network. As its newly published and there isn't that much resource around it yet- compared to other public testnets. However, finally I managed to verify the source code which you can see it [here](https://holesky.etherscan.io/address/0x6552c18b78a5d3a0481540fda73752bd7f857e15#code) and you can find the config I used inside hardhat.config.js file.

Although I'm not a frontend-developer but made a simple UI with [Next.js](https://nextjs.org/) which was a fun experience. The Next.js frontend connects to the user's wallet, displays NFTs owned, and allows minting new NFTs.

- run command `npm install` then `npm run dev` inside nft-showcase folder to run the development server.
- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result
- address of EthereumPlanet contract deployed on holesky public testnet: 0x6552C18B78A5d3A0481540FDa73752bD7F857E15

Disclaimer

The whole project is meant for educational purposes and may contain vulnerabilities or low quality in terms of efficiency for the frontend usage. Therefore don’t use these codes directly in a production environment.
