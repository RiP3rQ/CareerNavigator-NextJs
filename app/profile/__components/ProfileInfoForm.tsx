import React, { ChangeEvent, use, useEffect, useState } from "react";
// form validation
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import { CameraIcon } from "lucide-react";
import avatarDefault from "@/public/default-avatar.png";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUpdateAvatarMutation } from "@/redux/features/user/userApi";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { toast } from "sonner";

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "Must be 2 or more characters long" })
    .max(50, { message: "Must be 50 or fewer characters long" }),
  lastName: z
    .string()
    .min(2, { message: "Must be 2 or more characters long" })
    .max(50, { message: "Must be 50 or fewer characters long" }),
  email: z
    .string()
    .email("Please enter a valid email address.")
    .min(6, { message: "Must be 6 or more characters long" })
    .max(50, { message: "Must be 50 or fewer characters long" }),
  bio: z
    .string()
    .min(2, { message: "Must be 2 or more characters long" })
    .max(500, { message: "Must be 500 or fewer characters long" }),
  website: z
    .string()
    .min(5, { message: "Must be 2 or more characters long" })
    .max(75, { message: "Must be 75 or fewer characters long" }),
  linkedin: z
    .string()
    .min(5, { message: "Must be 2 or more characters long" })
    .max(75, { message: "Must be 75 or fewer characters long" }),
  github: z
    .string()
    .min(5, { message: "Must be 2 or more characters long" })
    .max(75, { message: "Must be 75 or fewer characters long" }),
});

type Props = {
  user: any;
  avatar: string | null;
};

const ProfileInfoForm: React.FC<Props> = ({ user, avatar }) => {
  const [loadUser, setLoadUser] = useState(false);

  // redux update avatar action
  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
  // redux get user
  const {} = useLoadUserQuery(undefined, {
    skip: loadUser ? false : true,
  });

  // Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      bio: "",
      website: "",
      linkedin: "",
      github: "",
    },
  });

  const handleAvatarClick = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files) {
      console.log("no files");
      return;
    }

    const file = e.currentTarget.files[0];
    const fileReader = new FileReader();
    // if image loaded successfully then update avatar via redux to database

    fileReader.onload = (e) => {
      if (fileReader.readyState === 2) {
        const file = fileReader.result;
        updateAvatar({
          avatar: file as string,
        });
      }
    };
    fileReader.readAsDataURL(file);
  };

  useEffect(() => {
    if (isSuccess) {
      setLoadUser(true);
      toast.success("Avatar updated successfully", {
        position: "top-center",
      });
    }
    if (error) {
      console.log(error);
    }
  }, [isSuccess, error]);

  // Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const data = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      bio: values.bio,
      social: {
        website: values.website,
        linkedin: values.linkedin,
        github: values.github,
      },
    };
    // redux update ation
    // await register(data);
  }

  return (
    <>
      <div className="w-full h-full bg-slate-800/60 rounded-xl px-6">
        <div className="w-full h-44 flex justify-center items-center">
          <div className="relative w-32 h-32">
            <img
              src={
                user.avatar.url || avatar
                  ? user.avatar.url || avatar
                  : avatarDefault.src
              }
              alt="avatar"
              className="w-32 h-32 rounded-full cursor-pointer border-4 border-[#37a39a]"
            />
            <input
              type="file"
              className="hidden"
              id="avatar"
              name=""
              onChange={handleAvatarClick}
              accept="image/png,image/jpeg,image/jpg,image/webp"
            />
            <label htmlFor="avatar">
              <div className="w-8 h-8 bg-slate-400 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
                <CameraIcon size={20} className="z-10" />
              </div>
            </label>
          </div>
        </div>
        <Separator />
        <div className="w-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid gap-4 py-4"
            >
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center justify-center">
                    <FormLabel className="text-right pr-2">Name:</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your name..."
                        {...field}
                        className="col-span-3"
                      />
                    </FormControl>
                    <FormMessage className="col-span-4 p-0 mt-0 text-center" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center justify-center">
                    <FormLabel className="text-right pr-2">
                      Last name:
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your last name..."
                        {...field}
                        className="col-span-3"
                      />
                    </FormControl>
                    <FormMessage className="col-span-4 p-0 mt-0 text-center" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center justify-center">
                    <FormLabel className="text-right pr-2">Email:</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email..."
                        {...field}
                        className="col-span-3"
                      />
                    </FormControl>
                    <FormMessage className="col-span-4 p-0 mt-0 text-center" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center justify-center">
                    <FormLabel className="text-right pr-2">Bio:</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your password..."
                        {...field}
                        className="col-span-3"
                      />
                    </FormControl>
                    <FormMessage className="col-span-4 p-0 mt-0 text-center" />
                  </FormItem>
                )}
              />
              <div className="w-full flex items-center justify-center space-x-2">
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center justify-center">
                      <FormLabel className="text-right pr-2">
                        Website:
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your password..."
                          {...field}
                          className="col-span-3"
                        />
                      </FormControl>
                      <FormMessage className="col-span-4 p-0 mt-0 text-center" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="linkedin"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center justify-center">
                      <FormLabel className="text-right pr-2">
                        LinkedIn:
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your password..."
                          {...field}
                          className="col-span-3"
                        />
                      </FormControl>
                      <FormMessage className="col-span-4 p-0 mt-0 text-center" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="github"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center justify-center">
                      <FormLabel className="text-right pr-2">Github:</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your password..."
                          {...field}
                          className="col-span-3"
                        />
                      </FormControl>
                      <FormMessage className="col-span-4 p-0 mt-0 text-center" />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full">
                Update
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ProfileInfoForm;
