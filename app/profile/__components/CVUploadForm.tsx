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

type Props = {
  user: any;
};

const CVUploadForm: React.FC<Props> = ({ user }) => {
  const [CVFile, setCVFile] = useState<File | null>(null);
  // redux update CV action
  const [updateCV, { isSuccess, error }] = useUpdateCVMutation();
  // redux delete CV action
  const [deleteCV, { isSuccess: deleteSuccess, error: deleteError }] =
    useDeleteCVMutation();

  // redux get user
  const { refetch: loadUserRefetch } = useLoadUserQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  // TODO: FIX UPLOADING CV
  const handleCVUpload = () => {
    if (!CVFile) {
      toast.error("Please select a file", {
        position: "top-center",
      });
      return;
    }
    const file = CVFile;
    const fileReader = new FileReader();

    fileReader.onload = function (event) {
      const CV = event.target?.result as string;
      // if image loaded successfully then update avatar via redux to database
      updateCV({
        CV,
      });
    };
    fileReader.readAsDataURL(file);
    setCVFile(null);
  };

  const handleDeleteCV = async () => {
    await deleteCV({});
  };

  useEffect(() => {
    if (isSuccess) {
      loadUserRefetch();
      toast.success("CV added successfully", {
        position: "top-center",
      });
    }
    if (deleteSuccess) {
      loadUserRefetch();
      toast.success("CV deleted successfully", {
        position: "top-center",
      });
    }
    if (error || deleteError) {
      console.log(error);
    }
  }, [isSuccess, error, deleteSuccess, deleteError]);

  return (
    <div className="w-full h-full bg-slate-800/60 rounded-xl p-6">
      <div className="w-full h-full flex justify-center flex-col items-center">
        {user.CV && (
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

                {/* delete button */}
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
        )}
      </div>
      <div className="w-full h-24 flex justify-center items-center">
        <input
          type="file"
          id="CDUpload"
          name=""
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setCVFile(e.target.files[0]);
            }
          }}
          accept="application/pdf"
          className="w-full"
          formEncType="multipart/form-data"
        />
      </div>
      <label htmlFor="CDUpload">
        <Button className="w-full" variant={"primary"} onClick={handleCVUpload}>
          Upload by selecting a file
        </Button>
      </label>
    </div>
  );
};

export default CVUploadForm;
