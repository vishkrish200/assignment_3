import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { ethers } from "ethers";
import { useState } from "react";

export default function Home() {
  const [state, setState] = useState();

  const provider = new ethers.providers.JsonRpcProvider(
    "https://eth-mainnet.g.alchemy.com/v2/UnuZM-Onc8TssoCfFwOhZE0Kp7oTXoa-"
  );
  const WBTC_address = "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599";
  const contract = new ethers.Contract(WBTC_address);

  const fetchData = async () => {
    const balance = await provider.getBalance(WBTC_address);
    const balanceinEth = ethers.utils.formatEther(balance);
    setState(balanceinEth);
  };
  fetchData();
  return <div>{state}</div>;
}
