import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import {
  useDeleteCVMutation,
  useUpdateCVMutation,
} from "@/redux/features/user/userApi";
import { X } from "lucide-react";
import Link from "next/link";
import React, { ChangeEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { IoIosDocument } from "react-icons/io";
import { Input } from "@/components/ui/input";

type Props = {
  user: any;
};

const CVUploadForm: React.FC<Props> = ({ user }) => {
  // drag n' drop state
  const [dragging, setDragging] = useState(false);

  // redux update CV action
  const [updateCV, { isSuccess, error }] = useUpdateCVMutation();
  // redux delete CV action
  const [deleteCV, { isSuccess: deleteSuccess, error: deleteError }] =
    useDeleteCVMutation();

  // redux get user
  const { refetch: loadUserRefetch } = useLoadUserQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  // handle CV upload
  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          const CV = reader.result as any;
          updateCV({
            CV,
          });
        }
      };
    }
  };

  const handleDeleteCV = async () => {
    await deleteCV({});
  };

  // handle Drag n' Drop
  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          const CV = reader.result as any;
          updateCV({
            CV,
          });
        }
      };

      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      loadUserRefetch();
      toast.success("CV added successfully", {
        position: "top-center",
      });
    }
    if (error) {
      console.log(error);
    }
  }, [isSuccess, error]);

  useEffect(() => {
    if (deleteSuccess) {
      loadUserRefetch();
      toast.success("CV deleted successfully", {
        position: "top-center",
      });
    }
    if (deleteError) {
      console.log(deleteError);
    }
  }, [deleteSuccess, deleteError]);

  return (
    <div className="w-full h-fit bg-slate-800/60 rounded-xl p-6">
      <div className="w-full h-full flex justify-center flex-col items-center relative">
        {/* {user.CV && (
          <>
            <div className="w-full flex items-center flex-col justify-center pt-2">
              <Label className="text-center mb-2 text-xl">My CV:</Label>
              <Separator className="w-full" />

              <div className="w-full h-full flex items-center justify-center flex-col py-2 relative">
                <Label className="mb-2 text-lg">Uploaded CV: </Label>
                <div className="text-center">
                  <IoIosDocument className="text-white h-24 w-24" />
                  <Link
                    href={user.CV.url}
                    className="text-center w-full text-4xl underline text-blue-700 hover:text-blue-500"
                    target="_blank"
                  >
                    CV
                  </Link>
                </div>


                <div
                  className="absolute top-2 right-2 cursor-pointer hover:bg-red-500 
                  hover:rounded-full"
                  onClick={handleDeleteCV}
                >
                  <X className="h-4 w-4 text-white" />
                </div>
              </div>
            </div>
            <Separator className="w-full" />
          </>
        )}  */}
        {user?.CV ? (
          <>
            <div
              className="absolute -top-2 -right-2 p-1 bg-red-400 cursor-pointer 
            rounded-full hover:bg-red-800/70 z-50"
              onClick={handleDeleteCV}
            >
              <X size={20} className="text-white" />
            </div>
            <Label className="text-3xl text-white mb-3">Your CV:</Label>
          </>
        ) : (
          <Label className="text-3xl text-white mb-3">Upload your CV:</Label>
        )}

        <Input
          type="file"
          accept="application/pdf"
          id="file"
          onChange={handleFileChange}
          className="hidden"
        />
        <Label
          htmlFor="file"
          className={`w-full min-h-[20vh] border-[#00000026] p-3 border flex
            items-center justify-center ${
              dragging ? "bg-blue-500" : "bg-transparent"
            } `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {user?.CV ? (
            <>
              <div className="text-center">
                <IoIosDocument className="text-white h-24 w-24" />
                <Link
                  href={user.CV.url}
                  className="text-center w-full text-4xl underline text-blue-700 hover:text-blue-500"
                  target="_blank"
                >
                  CV
                </Link>
              </div>
            </>
          ) : (
            <span className="text-black">
              Drag 'n' drop your CV here, or click to select file
            </span>
          )}
        </Label>
      </div>
    </div>
  );
};

export default CVUploadForm;
