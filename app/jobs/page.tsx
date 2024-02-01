"use client";

import { IDL } from "@/idl/marketplace-idl";
import * as anchor from "@coral-xyz/anchor";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import React, { useCallback, useEffect } from "react";
import CreateJob from "./create-job";
import Image from "next/image";
import { Button } from "@/components/ui/button";
const marketplaceProgramId = new PublicKey(
  "Hnf7nuJLhXP5pMh7AQrqratPUWcAXzsw6MUf6vacY23V"
);

const preflightCommitment = "processed";
const commitment = "processed";
function JobPage() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const wallet = useAnchorWallet();
  const getJobs = useCallback(async () => {
    if (!wallet) {
      return;
    }
    const provider = new anchor.AnchorProvider(connection, wallet, {
      preflightCommitment,
      commitment,
    });
    const program = new anchor.Program(IDL, marketplaceProgramId, provider);
    const jobs = await connection.getProgramAccounts(marketplaceProgramId);
    const accountInto = jobs[0].pubkey.toString();

    const owner = jobs[0].account.owner.toString();
    const ownerdata = jobs[0].account.data.toString();
    // console.log(ownerdata);
    // console.log(jobs, accountInto, owner);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getJobs();

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="flex flex-col gap-5 p-8">
      <CreateJob />

      <div className="container">
        <div className="border border-gray-200 shadow-md max-w-xs rounded-md">
          <Image
            src="/designer.jpg"
            width={500}
            height={500}
            alt=""
            className="rounded-md"
          />
          <div className="p-2">
            <p className="text-2xl py-2 ">UI/UX Designer</p>
            <Button className="w-full">Apply</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobPage;
