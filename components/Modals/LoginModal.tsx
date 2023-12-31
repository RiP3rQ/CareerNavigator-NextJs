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
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { useRegisterModal } from "@/hooks/useRegisterModal";
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

const formSchema = z.object({
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

const LoginModal = (props: Props) => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const handleSignUp = () => {
    loginModal.onClose();
    registerModal.onOpen();
  };

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Dialog open={loginModal.isOpen} onOpenChange={loginModal.onClose}>
      <DialogContent className="max-w-md p-6 overflow-hidden">
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>
            Access your CareerNavigator account and find your next dream job.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4"
          >
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
              <Button type="submit">Login</Button>
            </DialogFooter>
          </form>
        </Form>
        <Separator />
        <div className="">
          <p className="text-base text-gray-400">
            Don't have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={handleSignUp}
            >
              Sign up
            </span>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
