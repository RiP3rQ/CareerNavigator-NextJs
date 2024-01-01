"use client";
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
// shadcn/ui
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useState } from "react";
import { X } from "lucide-react";

type Props = {
  jobOfferRequirements: {
    requirements: Array<string>;
  };
  setJobOfferRequirements: (jobOfferRequirements: {
    requirements: Array<string>;
  }) => void;
  active: number;
  setActive: (active: number) => void;
};

const formSchema = z.object({
  skill: z
    .string()
    .min(1, { message: "Must be 1 or more characters long" })
    .max(40, { message: "Must be 40 or fewer characters long" }),
});

const JobOfferRequirementsForm: React.FC<Props> = ({
  jobOfferRequirements,
  setJobOfferRequirements,
  active,
  setActive,
}) => {
  const [skills, setSkills] = useState<Array<string>>(
    jobOfferRequirements.requirements || []
  );

  // Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      skill: "",
    },
  });

  // Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    if (skills.length >= 15) {
      toast.error("Max number of skills required achived", {
        unstyled: true,
        position: "top-center",
        classNames: {
          toast:
            "bg-red-500 p-4 rounded-md shadow-lg text-white w-full flex items-center justify-center",
        },
      });
      return;
    }
    toast.success("Skill added properly");
    setSkills([...skills, values.skill]);
    form.reset();
  }

  const handleSaveSkills = () => {
    if (skills.length === 0) {
      toast.error("You need to add at least one skill", {
        unstyled: true,
        position: "top-center",
        classNames: {
          toast:
            "bg-red-500 p-4 rounded-md shadow-lg text-white w-full flex items-center justify-center",
        },
      });
      return;
    }
    setJobOfferRequirements({ requirements: skills });
    setActive(active + 1);
  };

  console.log(skills);

  // TODO: repair error displaying
  return (
    <div className="w-[80%] mx-auto mt-10 bg-purple-700 px-4">
      {skills.length > 0 && (
        <div className="w-full text-center pt-4 text-white">
          <Label className="text-xl ">You've added so far:</Label>
          <Separator className="my-1" />
          <div className="flex flex-wrap justify-center">
            {skills.map((skill: any, index: number) => (
              <div
                className="bg-white m-2 p-2 rounded-md text-black relative"
                key={index}
              >
                {skill}
                <div
                  className="absolute -top-3 -right-3 p-1 rounded-full bg-red-500 cursor-pointer"
                  onClick={() => setSkills(skills.filter((s) => s !== skill))}
                >
                  <X size={16} className="text-white" />
                </div>
              </div>
            ))}
          </div>
          <Separator className="my-4 bg-green-500 h-2" />
        </div>
      )}
      <div className="w-full text-center pt-4 text-white">
        <Label className="text-2xl font-bold ">
          Skills needed to do the job{" "}
          <span className="text-gray-400 text-sm">(Max:15)</span>
        </Label>
      </div>

      <Separator className="my-4" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-4 py-4"
        >
          <FormField
            control={form.control}
            name="skill"
            render={({ field }) => (
              <FormItem className="flex items-center justify-center">
                <FormLabel className="w-full text-center text-white">
                  Skill name:
                </FormLabel>
                <FormControl className="w-full">
                  <Input
                    placeholder="Enter skill name..."
                    {...field}
                    className="col-span-3"
                  />
                </FormControl>
                <FormMessage className="w-full p-0 mt-0 text-center" />
              </FormItem>
            )}
          />

          <Button type="submit" className="bg-blue-500">
            Add to list
          </Button>
        </form>
      </Form>
      <Separator className="my-4" />
      <div className="flex items-center justify-center flex-col pt-4 text-white w-full">
        <div className="w-full  text-center">
          <Label className="text-2xl font-bold w-full">
            Are you done adding skills?
          </Label>
        </div>
        <br />
        <div className="w-full">
          <Button onClick={handleSaveSkills} className="bg-green-500 w-full">
            Save
          </Button>
        </div>
        <br />
      </div>
    </div>
  );
};

export default JobOfferRequirementsForm;
