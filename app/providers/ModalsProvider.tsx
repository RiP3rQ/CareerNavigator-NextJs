"use client";

import ConfirmModal from "@/components/Modals/ConfirmModal";
import LoginModal from "@/components/Modals/LoginModal";
import RegisterModal from "@/components/Modals/RegisterModal";
import VerifyAccountModal from "@/components/Modals/VerifyAccountModal";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <LoginModal />
      <RegisterModal />
      <VerifyAccountModal />
      <ConfirmModal />
    </>
  );
};
