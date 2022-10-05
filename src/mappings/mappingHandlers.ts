import fetch from "node-fetch";
import { AvalancheTransaction } from "@subql/types-avalanche";
import { BigNumber } from "ethers";
import { Account, Transfer } from "../types";

type TransferEventArgs = [string, string, BigNumber] & {
  from: string;
  to: string;
  value: BigNumber;
};

export async function handleTransfer(
  transaction: AvalancheTransaction<TransferEventArgs>
): Promise<void> {
  // event data
  //logger.info("log" + JSON.stringify(event.args));

  // ensure that our account entities exist
  const fromAccount = await Account.get(transaction.args[0].toString());
  if (!fromAccount) {
    await new Account(transaction.args[0].toString()).save();
  }

  const toAccount = await Account.get(transaction.args[1].toString());
  if (!toAccount) {
    await new Account(transaction.args[1].toString()).save();
  }

  // Create the new transfer entity
  const transfer = new Transfer(`${transaction.blockHash}-${transaction.hash}`);
  transfer.blockNumber = BigInt(transaction.blockNumber);
  transfer.fromId = transaction.args[0].toString();
  transfer.toId = transaction.args[1].toString();
  transfer.amount = transaction.args[2].toBigInt();
  await transfer.save();

  const httpData = await fetch("https://api.github.com/users/github");
  logger.info(`httpData: ${JSON.stringify(httpData.body)}`);
}
