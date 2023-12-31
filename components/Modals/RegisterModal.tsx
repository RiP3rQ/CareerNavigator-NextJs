"use client";

import { useLoginModal } from "@/hooks/useLoginModal";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { useRegisterModal } from "@/hooks/useRegisterModal";
import { useVerifyModal } from "@/hooks/useVerifyModal";
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
} from "../ui/form";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { useEffect } from "react";

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
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, { message: "Must be 6 or more characters long" })
    .max(20, { message: "Must be 20 or fewer characters long" }),
});

type Props = {};

const RegisterModal = (props: Props) => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const verifyModal = useVerifyModal();

  // redirect to login modal
  const handleLogin = () => {
    registerModal.onClose();
    loginModal.onOpen();
  };

  // redux
  const [register, { data, error, isSuccess }] = useRegisterMutation();

  // Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  // based on redux state do different things
  useEffect(() => {
    if (isSuccess) {
      // display toast message
      const message =
        data?.message || "Please check your email to verify your account.";
      toast.info(message, {
        position: "top-center",
      });
      // close Registration modal and open Verification modal
      registerModal.onClose();
      verifyModal.onOpen();
      // reset form
      form.reset();
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  // Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const data = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
    };

    await register(data);
  }

  return (
    <Dialog open={registerModal.isOpen} onOpenChange={registerModal.onClose}>
      <DialogContent className="max-w-md p-6 overflow-hidden">
        <DialogHeader>
          <DialogTitle>Create an account</DialogTitle>
          <DialogDescription>
            Create an account and increase your chances of finding your next
            dream job.
          </DialogDescription>
        </DialogHeader>
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
                  <FormLabel className="text-right pr-2">Last name:</FormLabel>
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
              name="password"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center justify-center">
                  <FormLabel className="text-right pr-2">Password:</FormLabel>
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
            <DialogFooter>
              <Button type="submit">Register</Button>
            </DialogFooter>
          </form>
        </Form>
        <Separator />
        <div className="">
          <p className="text-base text-gray-400">
            Already have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={handleLogin}
            >
              Login instead
            </span>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterModal;
