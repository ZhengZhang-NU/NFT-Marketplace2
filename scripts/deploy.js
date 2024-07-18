const { ethers } = require("ethers");
const { JsonRpcProvider } = require("@ethersproject/providers");
const fs = require("fs");
require("dotenv").config();

const contractJson = JSON.parse(fs.readFileSync("./out/NFTCollection.sol/NFTCollection.json", "utf8"));

async function main() {
    const provider = new JsonRpcProvider(`https://eth-sepolia.alchemyapi.io/v2/${process.env.VITE_ALCHEMY_API_KEY}`);
    const wallet = new ethers.Wallet(process.env.VITE_PRIVATE_KEY, provider);

    console.log("Deploying contracts with the account:", wallet.address);

    const NFTCollectionFactory = new ethers.ContractFactory(contractJson.abi, contractJson.bytecode, wallet);
    const nft = await NFTCollectionFactory.deploy("MyNFT", "MNFT", "https://ipfs.io/ipfs/QmQGxHEnAKrU41FtPnGnBBicqKgmntj63ZaD6uW9Ca6qKn/");

    console.log("Awaiting deployment...");
    await nft.deployed();

    console.log("NFTCollection deployed to:", nft.address);
}

main().catch((error) => {
    console.error("Error deploying contract:", error);
    process.exit(1);
});
