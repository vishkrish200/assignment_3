import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { Tx_from, Tx_time } from "../components/transactionData";

export default function Home() {
  const [mint, setMint] = useState();
  const [burn, setBurn] = useState();

  const ABI = [
    "event Mint(address indexed to, uint256 amount);",
    "event Burn(address indexed burner, uint256 value);",
  ];

  const provider = new ethers.providers.JsonRpcProvider(
    "https://eth-mainnet.g.alchemy.com/v2/UnuZM-Onc8TssoCfFwOhZE0Kp7oTXoa-"
  );
  const WBTC_address = "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599";
  const contract = new ethers.Contract(WBTC_address, ABI, provider);

  useEffect(() => {
    const fetchData = async () => {
      const minttx = await contract.queryFilter("Mint", 0, "latest");
      const burntx = await contract.queryFilter("Burn", 0, "latest");
      const minted_tx = minttx.slice(minttx.length - 21, minttx.length - 1);
      const burned_tx = burntx.slice(burntx.length - 21, burntx.length - 1);
      setMint(minted_tx);
      setBurn(burned_tx);
      console.log(mint);
      console.log(burn);
    };
    fetchData();
  }, []);

  return (
    <div className="grid grid-flow-row grid-cols-2 grid-rows-1 w-screen text-center h-screen justify-center items-center bg-slate-600">
      <div className="col-span-1 row-span-1">
        mint
        {mint?.map((tx, key) => (
          <div className="" key={key}>
            <Tx_from provider={provider} tx_hash={tx.transactionHash} />
            <Tx_time provider={provider} block_no={tx.blockNumber} />
          </div>
        ))}
      </div>
      <div className="col-span-1 row-span-1">
        burn
        {burn?.map((tx, key) => (
          <div className="" key={key}>
            <Tx_from provider={provider} tx_hash={tx.transactionHash} />
            <Tx_time provider={provider} block_no={tx.blockNumber} />
          </div>
        ))}
      </div>
    </div>
  );
}
