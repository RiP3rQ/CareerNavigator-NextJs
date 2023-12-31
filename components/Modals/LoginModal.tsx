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

type Props = {};

const LoginModal = (props: Props) => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const handleSignUp = () => {
    loginModal.onClose();
    registerModal.onOpen();
  };

  return (
    <Dialog open={loginModal.isOpen} onOpenChange={loginModal.onClose}>
      <DialogContent className="max-w-md p-6 overflow-hidden">
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>
            Access your CareerNavigator account and find your next dream job.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email:
            </Label>
            <Input id="email" value="" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Password:
            </Label>
            <Input id="password" value="" className="col-span-3" />
          </div>
        </div>
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

        <DialogFooter>
          <Button type="submit">Login</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
