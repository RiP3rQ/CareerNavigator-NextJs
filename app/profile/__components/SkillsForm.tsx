import { useEffect, useState } from "react";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  useDeleteSkillsMutation,
  useUpdateSkillsMutation,
} from "@/redux/features/user/userApi";
import { toast } from "sonner";

type Props = {
  user: any;
};

const SkillsForm: React.FC<Props> = ({ user }) => {
  const [skills, setSkills] = useState("");

  // redux update education action
  const [updateSkills, { isSuccess, error }] = useUpdateSkillsMutation();
  // redux delete education action
  const [deleteSkills, { isSuccess: deleteSuccess, error: deleteError }] =
    useDeleteSkillsMutation();
  // redux get user
  const { refetch: loadUserRefetch } = useLoadUserQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  useEffect(() => {
    if (isSuccess) {
      loadUserRefetch();
      toast.success("Skill added successfully", {
        position: "top-center",
      });
    }
    if (deleteSuccess) {
      loadUserRefetch();
      toast.success("Skill deleted successfully", {
        position: "top-center",
      });
    }
    if (error || deleteError) {
      console.log(error);
    }
  }, [isSuccess, error, deleteSuccess, deleteError]);

  // add skill using redux
  const handleUpdateSkills = async () => {
    await updateSkills({ skills: skills });
    setSkills("");
  };

  // delete skill action using redux
  const handleDeleteSkill = async (id: string) => {
    console.log(id);
    await deleteSkills({ skillId: id });
  };

  return (
    <div className="w-full h-fit bg-slate-800/60 rounded-xl px-6">
      <div className="w-full h-full flex justify-center flex-col items-center">
        {user.skills.length > 0 && (
          <>
            <div className="w-full flex items-center flex-col justify-center pt-2">
              <Label className="text-center mb-2 text-xl">My skills:</Label>
              <Separator className="w-full" />
              {user.skills.map((skill: any, index: any) => (
                <div
                  key={index}
                  className="w-full h-full flex items-center justify-center flex-col py-2 relative"
                >
                  <div className="w-full text-center">
                    <Label className="mb-2 text-lg">{skill}</Label>
                  </div>
                  {/* delete button */}
                  <div
                    className="absolute top-2 right-2 cursor-pointer hover:bg-red-500 
                  hover:rounded-full"
                    onClick={() => handleDeleteSkill(index)}
                  >
                    <X className="h-4 w-4 text-white" />
                  </div>
                </div>
              ))}
            </div>
            <Separator className="w-full" />
          </>
        )}
        <div className="w-full flex items-center justify-center flex-col py-2">
          <Label className="text-center mb-2 text-xl">Add skill:</Label>
          <Input
            type="text"
            className="w-full h-10 rounded-md px-2"
            placeholder="Skill"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
          <Button
            variant={"primary"}
            className="w-full h-10 rounded-md px-2 mt-2"
            onClick={handleUpdateSkills}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SkillsForm;
