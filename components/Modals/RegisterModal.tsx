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
import { useVerifyModal } from "@/hooks/useVerifyModal";

type Props = {};

const RegisterModal = (props: Props) => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const verifyModal = useVerifyModal();

  const handleLogin = () => {
    registerModal.onClose();
    loginModal.onOpen();
  };

  const handleVerifyAccount = () => {
    registerModal.onClose();
    verifyModal.onOpen();
  };

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
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="firstName" className="text-right">
              First name:
            </Label>
            <Input id="firstName" value="" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="lastName" className="text-right">
              Last name:
            </Label>
            <Input id="lastName" value="" className="col-span-3" />
          </div>
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
            Already have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={handleLogin}
            >
              Login instead
            </span>
          </p>
        </div>

        <DialogFooter>
          <Button type="submit" onClick={handleVerifyAccount}>
            Register
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterModal;
