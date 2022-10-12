import fetch from "node-fetch";
import { AvalancheLog, AvalancheTransaction } from "@subql/types-avalanche";
import { BigNumber } from "ethers";
import { Account, Transfer } from "../types";

type TransferEventArgs = [string, string, BigNumber] & {
  from: string;
  to: string;
  value: BigNumber;
};

export async function handleLog(
  logEvent: AvalancheLog<TransferEventArgs>
): Promise<void> {
  // logger.info("log" + JSON.stringify(logEvent.args));

  // ensure that our account entities exist
  const fromAccount = await Account.get(logEvent.args[0].toString());
  if (!fromAccount) {
    await new Account(logEvent.args[0].toString()).save();
  }

  const toAccount = await Account.get(logEvent.args[1].toString());
  if (!toAccount) {
    await new Account(logEvent.args[1].toString()).save();
  }

  // Create the new transfer entity
  const transfer = new Transfer(`${logEvent.blockHash}-${logEvent.logIndex}`);
  transfer.blockNumber = BigInt(logEvent.blockNumber);
  transfer.fromId = logEvent.args[0].toString();
  transfer.toId = logEvent.args[1].toString();
  transfer.amount = logEvent.args[2].toBigInt();
  await transfer.save();

  const httpData = await fetch("https://api.github.com/users/github");
  logger.info(`httpData: ${JSON.stringify(httpData.body)}`);
}
