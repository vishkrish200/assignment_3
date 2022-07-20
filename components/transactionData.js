import { useState } from "react";
import moment from "moment";

export const Tx_from = ({ provider, tx_hash }) => {
  const [fromAdd, setFromAdd] = useState();
  useState(() => {
    const getFrom = async () => {
      const tx_receipt = await provider.getTransactionReceipt(tx_hash);
      setFromAdd(tx_receipt.from);
    };
    getFrom();
  }, []);
  return (
    <div>
      <b>From : </b>
      {fromAdd}
    </div>
  );
};

export const Tx_time = ({ provider, block_no }) => {
  const [time, setTime] = useState();
  useState(() => {
    const getTime = async () => {
      const block = await provider.getBlock(block_no);
      setTime(moment.unix(block.timestamp).toString());
    };
    getTime();
  }, []);
  return (
    <div>
      <b>Time : </b> {time}
    </div>
  );
};
