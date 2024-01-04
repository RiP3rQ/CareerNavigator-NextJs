"use client";

import { Button } from "@/components/ui/button";
import { useConfirmModal } from "@/hooks/useConfirmModal";
import { useDeleteJobOfferMutation } from "@/redux/features/jobOffer/jobOfferApi";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "sonner";

type Props = {
  onClick?: () => void;
  jobOfferRecruiterId?: string;
  userId?: string;
  jobOfferId?: string;
  isEditButton?: boolean;
};

const ApplyButton: React.FC<Props> = ({
  onClick,
  jobOfferRecruiterId,
  userId,
  jobOfferId,
  isEditButton,
}) => {
  // redux action to delete job offer
  const [deleteJobOffer, { isSuccess, error }] = useDeleteJobOfferMutation();
  // router
  const router = useRouter();
  // custom hook for confirm modal
  const confirmModal = useConfirmModal();

  const handleEditClick = () => {
    if (jobOfferRecruiterId === userId) {
      router.push(`/jobs/${jobOfferId}/edit`);
    } else {
      toast.error("You are not the owner of this job offer", {
        position: "top-center",
      });
    }
  };

  const handleDeleteClick = () => {
    confirmModal.data = {
      title: "Delete job offer",
      description: "Are you sure you want to DELETE this job offer?",
    };
    confirmModal.action = () => {
      deleteJobOffer({ jobOfferId });
    };
    confirmModal.onOpen();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Job offer deleted", {
        position: "top-center",
      });
      router.push("/");
    }
    if (error) {
      console.log(error);
    }
  }, [isSuccess, error]);

  if (isEditButton) {
    return (
      <Button
        className="w-full h-16 bg-blue-400 rounded-lg text-white flex items-center justify-center text-3xl font-bold"
        onClick={onClick}
      >
        Edit
      </Button>
    );
  }

  if (jobOfferRecruiterId === userId) {
    return (
      <div className="w-full flex ">
        <Button
          className="w-full h-16 bg-blue-400 rounded-lg text-white flex items-center justify-center text-3xl font-bold"
          onClick={handleEditClick}
        >
          Edit
        </Button>
        <Button
          className="w-full h-16 bg-red-500 rounded-lg text-white flex items-center justify-center text-3xl font-bold"
          onClick={handleDeleteClick}
        >
          Delete
        </Button>
      </div>
    );
  }

  return (
    <Button
      className="w-full h-16 bg-purple-400 rounded-lg text-white flex items-center justify-center text-3xl font-bold"
      onClick={onClick}
      disabled={!userId}
    >
      {userId ? "Apply" : "Login to apply"}
    </Button>
  );
};

export default ApplyButton;
