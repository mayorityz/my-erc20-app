import Web3 from "web3";

export const toWei = (value) => {
  let Wei = Web3.utils.toWei(value);
  return Wei;
};
