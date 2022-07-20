import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { Tx_from, Tx_time } from "../components/transactionData";
import { Circles } from "react-loader-spinner";

export default function Home() {
  const [mint, setMint] = useState();
  const [burn, setBurn] = useState();
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="w-screen text-center h-screen justify-center items-center  overflow-auto">
        <h1 className="mt-8 text-3xl font-extrabold">MINT/BURN WBTC</h1>
        <div className="grid grid-flow-row grid-cols-2 gap-5 grid-rows-1">
          <div className="col-span-1 items-center justify-center m-6">
            <h2 className="m-6 text-2xl font-bold">MINTED</h2>
            {!loading ? (
              mint?.map((tx, key) => (
                <div
                  className="flex flex-col items-center justify-center"
                  key={key}
                >
                  <b>{key + 1}. Transaction Hash:</b>
                  {tx.transactionHash}
                  <Tx_from provider={provider} tx_hash={tx.transactionHash} />
                  <Tx_time provider={provider} block_no={tx.blockNumber} />
                  <br />
                </div>
              ))
            ) : (
              <Circles color="#000000" height={80} width={80} />
            )}
          </div>
          <div className="col-span-1 row-span-1 items-center justify-center m-6">
            <h2 className="m-6 text-2xl font-bold">BURNED</h2>
            {!loading ? (
              burn?.map((tx, key) => (
                <div
                  className="flex flex-col items-center justify-center"
                  key={key}
                >
                  <b>{key + 1}. Transaction Hash:</b>
                  {tx.transactionHash}
                  <Tx_from provider={provider} tx_hash={tx.transactionHash} />
                  <Tx_time provider={provider} block_no={tx.blockNumber} />
                  <br />
                </div>
              ))
            ) : (
              <Circles color="#000000" height={80} width={80} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
