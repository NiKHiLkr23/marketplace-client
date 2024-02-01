"use server";

import * as z from "zod";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { profileFormSchema } from "@/app/create-profile/_components/profile-form";
import { User, getXataClient } from "@/lib/xata";
import { useWallet } from "@solana/wallet-adapter-react";

const Bucket = process.env.AWS_BUCKET_NAME;
const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});
export const createEmployeeProfile = async (
  data: z.infer<typeof profileFormSchema>
) => {
  // const profile_image = formData.get("username");

  const { username, email, bio, urls } = data;

  const xataClient = getXataClient();

  const user = await xataClient.db.User.create({
    name: username,
    email,
    role: "EMPLOYEE",
    address: "wallet",
  });

  // console.log("profile_image", profile_image);

  // not sure why I have to override the types here

  return { success: "Confirmation email sent!" };
};
