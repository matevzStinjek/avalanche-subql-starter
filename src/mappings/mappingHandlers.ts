// Copyright 2020-2022 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0
import fetch from "node-fetch";

import {
  AvalancheLog,
} from "@subql/types-avalanche";

import {
  TransferEvent,
} from "../contracts/BetaSimpleFlatLostWorld";

export async function handleTransfer(event: AvalancheLog<TransferEvent['args']>): Promise<void> {
  // event data
  logger.info('log')
  if (event.args) {
    delete event.block;
    logger.info(JSON.stringify(event.args)); 
  }
};
