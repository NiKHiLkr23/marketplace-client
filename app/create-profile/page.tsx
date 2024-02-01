"use client";

import React, { Suspense } from "react";
import { ProfileForm } from "./_components/profile-form";
import { Separator } from "@/components/ui/separator";
import { useSearchParams } from "next/navigation";
import { EmployerProfileForm } from "./_components/employer-profile-form";

function CreateProfile() {
  const searchParams = useSearchParams();

  const user = searchParams.get("user");
  return (
    <div className="container my-10 md:my-20 flex flex-col md:max-w-3xl md:mx-auto">
      <div className="">
        <h3 className="text-lg md:text-2xl font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator className="my-5" />
      {user === "employer" ? <EmployerProfileForm /> : <ProfileForm />}
    </div>
  );
}

function CreateProfilePage() {
  return (
    <Suspense>
      <CreateProfile />
    </Suspense>
  );
}

export default CreateProfilePage;
