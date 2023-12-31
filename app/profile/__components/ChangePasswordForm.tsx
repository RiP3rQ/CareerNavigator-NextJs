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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUpdatePasswordMutation } from "@/redux/features/user/userApi";
import { useEffect } from "react";
import { toast } from "sonner";

type Props = {};

const formSchema = z
  .object({
    currentPassword: z
      .string({
        required_error: "Current password is required",
      })
      .min(6, { message: "Must be 6 or more characters long" })
      .max(50, { message: "Must be 50 or fewer characters long" }),
    newPassword: z
      .string({
        required_error: "New password is required",
      })
      .min(6, { message: "Must be 6 or more characters long" })
      .max(20, { message: "Must be 20 or fewer characters long" }),
    confirmPassword: z
      .string({
        required_error: "Confirm new password is required",
      })
      .min(6, { message: "Must be 6 or more characters long" })
      .max(20, { message: "Must be 20 or fewer characters long" }),
  })
  .refine((data) => data.confirmPassword === data.newPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // path of error
  });

const ChangePasswordForm = (props: Props) => {
  // redux update password action
  const [updatePassword, { isSuccess, error }] = useUpdatePasswordMutation();

  // Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const data = {
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
    };

    // redux update ation
    await updatePassword(data);
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password updated successfully", {
        position: "top-center",
      });
      form.reset();
    }
    if (error) {
      console.log(error);
    }
  }, [isSuccess, error]);

  return (
    <>
      <div className="w-full h-full bg-slate-800/60 rounded-xl px-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4 w-full"
          >
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center justify-center">
                  <FormLabel className="text-right pr-2">
                    Current Password:
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your current password..."
                      type="password"
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
              name="newPassword"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center justify-center">
                  <FormLabel className="text-right pr-2">
                    New Password:
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter new password..."
                      type="password"
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
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center justify-center">
                  <FormLabel className="text-right pr-2">
                    Confirm new password:
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Confirm new password..."
                      type="password"
                      {...field}
                      className="col-span-3"
                    />
                  </FormControl>
                  <FormMessage className="col-span-4 p-0 mt-0 text-center" />
                </FormItem>
              )}
            />
            <Button type="submit">Change password</Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default ChangePasswordForm;
