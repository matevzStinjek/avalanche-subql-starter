// Copyright 2020-2022 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0
import axios from "axios";

import {
  AvalancheLog,
} from "@subql/types-avalanche";

import {
  TransferEvent,
} from "../contracts/BetaSimpleFlatLostWorld";

export async function handleTransfer(event: AvalancheLog<TransferEvent['args']>): Promise<void> {
  // event data
  logger.info(JSON.stringify(event.args));

  // external http requests
  const data = await axios.get('https://jsonplaceholder.typicode.com/todos/1')
    .then(res => res.data);

  logger.info(JSON.stringify(data));
};
