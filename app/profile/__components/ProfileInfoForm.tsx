import React, { ChangeEvent, useEffect, useState } from "react";
import { CameraIcon } from "lucide-react";
import avatarDefault from "@/public/default-avatar.png";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  useUpdateAvatarMutation,
  useUpdateProfileMutation,
} from "@/redux/features/user/userApi";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { toast } from "sonner";
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
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  firstName: z
    .union([z.string().length(0), z.string().min(2)])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  lastName: z
    .union([z.string().length(0), z.string().min(2)])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  email: z
    .union([z.string().email().length(0), z.string().min(2)])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  bio: z
    .union([z.string().length(0), z.string().min(2).max(500)])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  website: z
    .union([z.string().length(0), z.string().min(2).max(50)])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  linkedin: z
    .union([z.string().length(0), z.string().min(2).max(50)])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  github: z
    .union([z.string().length(0), z.string().min(2).max(50)])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
});

type Props = {
  user: any;
  avatar: string | null;
};

const ProfileInfoForm: React.FC<Props> = ({ user, avatar }) => {
  const [loadUser, setLoadUser] = useState(false);
  // redux update user info
  const [updateProfile, { isSuccess: isSuccessUpdate, error: isErrorUpdate }] =
    useUpdateProfileMutation();

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
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      bio: user.bio || "",
      website: user.social?.website || "",
      linkedin: user.social?.linkedin || "",
      github: user.social?.github || "",
    },
  });

  const handleAvatarClick = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files) {
      console.log("no files");
      return;
    }
    const file = e.currentTarget.files[0];
    const fileReader = new FileReader();

    fileReader.onload = (e) => {
      if (fileReader.readyState === 2) {
        const file = fileReader.result;
        // if image loaded successfully then update avatar via redux to database
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
    if (isSuccessUpdate) {
      setLoadUser(true);
      toast.success("Profile updated successfully", {
        position: "top-center",
      });
    }
    if (error || isErrorUpdate) {
      console.log(error);
    }
  }, [isSuccess, error, isSuccessUpdate, isErrorUpdate]);

  // Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const data = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      bio: values.bio,
      website: values.website,
      linkedin: values.linkedin,
      github: values.github,
    };

    // redux update ation
    await updateProfile(data);
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
                      <Textarea
                        placeholder="Enter your bio..."
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
