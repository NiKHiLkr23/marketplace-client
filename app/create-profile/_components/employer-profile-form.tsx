"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import * as anchor from "@coral-xyz/anchor";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ChangeEvent, useCallback, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createEmployeeProfile } from "@/actions/create-profile/create-employee-profile";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { useRouter } from "next/navigation";
import { IDL } from "@/idl/marketplace-idl";
const MAX_IMAGE_SIZE = 5242880; // 5 MB
const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/jpg",
];
export const profileFormSchema = z.object({
  // profile_image: z
  // .custom<FileList>((val) => val instanceof FileList, "Required")
  // .refine((files) => files.length == 1, `Image is Required`)
  // .refine(
  //   (files) => Array.from(files).every((file) => file.size <= MAX_IMAGE_SIZE),
  //   `Each file size should be less than 5 MB.`
  // )
  // .refine(
  //   (files) =>
  //     Array.from(files).every((file) =>
  //       ALLOWED_IMAGE_TYPES.includes(file.type)
  //     ),
  //   "Only these types are allowed .jpg, .jpeg, .png and .webp"
  // ),
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  email: z
    .string({
      required_error: "Email is required!",
    })
    .email(),
  bio: z.string().max(160).min(4),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: "Please enter a valid URL." }),
      })
    )
    .optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  bio: "I own a computer.",
  urls: [
    { value: "https://github.com/NiKHiLkr23" },
    { value: "https://portfolio-v2-nikhilkr23.vercel.app/" },
  ],
};

function getImageData(event: ChangeEvent<HTMLInputElement>) {
  // FileList is immutable, so we need to create a new one
  const dataTransfer = new DataTransfer();

  // Add newly uploaded images
  Array.from(event.target.files!).forEach((image) =>
    dataTransfer.items.add(image)
  );

  const files = dataTransfer.files;
  const displayUrl = URL.createObjectURL(event.target.files![0]);

  return { files, displayUrl };
}

const marketplaceProgramId = new PublicKey(
  "Hnf7nuJLhXP5pMh7AQrqratPUWcAXzsw6MUf6vacY23V"
);

const preflightCommitment = "processed";
const commitment = "processed";

export function EmployerProfileForm() {
  const [preview, setPreview] = useState<string>("");
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const { fields, append } = useFieldArray({
    name: "urls",
    control: form.control,
  });

  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const wallet = useAnchorWallet();
  const router = useRouter();

  const onClick = useCallback(
    async (data: ProfileFormValues) => {
      if (!publicKey) {
        toast.error("Wallet not connected");
        return;
      }
      const newEmployerUserPDA = PublicKey.findProgramAddressSync(
        [Buffer.from("User"), publicKey.toBuffer()],
        marketplaceProgramId
      )[0];
      console.log(`new user PDA : ${newEmployerUserPDA}`);

      if (!wallet) {
        return;
      }
      const provider = new anchor.AnchorProvider(connection, wallet, {
        preflightCommitment,
        commitment,
      });

      const program = new anchor.Program(IDL, marketplaceProgramId, provider);

      const { username: name, email } = data;
      const profileImage = "image_url";
      const userPDA = await program.methods
        .initializeEmployerProfile(name, email, profileImage)
        .accounts({
          user: publicKey,
          userProfile: newEmployerUserPDA,
          systemProgram: SystemProgram.programId,
        })
        .instruction();
      console.log(userPDA);
      const txn = new Transaction().add(userPDA);
      const sig = await sendTransaction(txn, connection);
      await connection.confirmTransaction(sig);

      if (sig) {
        try {
          toast.success("user created...");
        } catch (error) {
          console.log(error);
        }
      }
    },
    [connection, publicKey, wallet, sendTransaction]
  );

  function onSubmit(data: ProfileFormValues) {
    // console.log(JSON.stringify(data));
    if (data) {
      onClick(data);
    }

    // toast.success(
    //   <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //     <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //   </pre>
    // );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* <FormField
          control={form.control}
          name="profile_image"
          render={({ field: { onChange, value, ...rest } }) => (
            <>
              <FormItem>
                <FormLabel>Profile Image</FormLabel>
                <FormControl>
                  <>
                    <Avatar className="w-32 h-32">
                      <AvatarImage src={preview} />
                      <AvatarFallback>PIC</AvatarFallback>
                    </Avatar>
                    {!preview && (
                      <Input
                        type="file"
                        {...rest}
                        onChange={(event) => {
                          const { files, displayUrl } = getImageData(event);
                          setPreview(displayUrl);
                          onChange(files[0]);
                        }}
                      />
                    )}
                  </>
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            </>
          )}
                      /> */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Jhon Doe" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym. You can only change this once every 30 days.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="m@example.com">m@example.com</SelectItem>
                  <SelectItem value="m@google.com">m@google.com</SelectItem>
                  <SelectItem value="m@support.com">m@support.com</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                You can manage verified email addresses in your{" "}
                <Link href="/examples/forms">email settings</Link>.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john@gmail.com" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Tell us a bit about yourself. This information will appear on
                your public profile, so that potential employers can get to know
                you better.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`urls.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && "sr-only")}>
                    URLs
                  </FormLabel>
                  <FormDescription className={cn(index !== 0 && "sr-only")}>
                    Add links to your website, blog, or social media profiles.
                  </FormDescription>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => append({ value: "" })}
          >
            Add URL
          </Button>
        </div>
        <Button type="submit">Create profile</Button>
      </form>
    </Form>
  );
}
