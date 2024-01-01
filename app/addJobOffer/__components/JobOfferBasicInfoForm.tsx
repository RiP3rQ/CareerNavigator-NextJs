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

type Props = {
  jobOfferBasicInfo: {
    title: string;
    salaryRange: string;
    remote: string;
    contractType: string;
  };
  setJobOfferBasicInfo: (jobOfferBasicInfo: {
    title: string;
    salaryRange: string;
    remote: string;
    contractType: string;
  }) => void;
  active: number;
  setActive: (active: number) => void;
};

const formSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Must be 2 or more characters long" })
    .max(50, { message: "Must be 50 or fewer characters long" }),
  salaryRange: z
    .string()
    .min(4, { message: "Must be 4 or more characters long" })
    .max(50, { message: "Must be 50 or fewer characters long" }),
  remote: z
    .string()
    .min(2, { message: "Must be 2 or more characters long" })
    .max(50, { message: "Must be 50 or fewer characters long" }),
  contractType: z
    .string()
    .min(2, { message: "Must be 2 or more characters long" })
    .max(300, { message: "Must be 300 or fewer characters long" }),
});

const JobOfferBasicInfoForm: React.FC<Props> = ({
  jobOfferBasicInfo,
  setJobOfferBasicInfo,
  active,
  setActive,
}) => {
  // Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: jobOfferBasicInfo.title || "",
      salaryRange: jobOfferBasicInfo.salaryRange || "",
      remote: jobOfferBasicInfo.remote || "",
      contractType: jobOfferBasicInfo.contractType || "",
    },
  });

  // Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    toast.success("Basic info saved");
    setJobOfferBasicInfo(values);
    setActive(active + 1);
  }

  return (
    <div className="w-[80%] mx-auto mt-10 bg-purple-700 px-4">
      <div className="w-full text-center pt-4 text-white">
        <Label className="text-2xl font-bold ">
          Basic infoformation about the job offer
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
            name="title"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center justify-center">
                <FormLabel className="text-right pr-2 text-white">
                  title:
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter title..."
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
            name="salaryRange"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center justify-center">
                <FormLabel className="text-right pr-2 text-white">
                  salaryRange:
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter salaryRange..."
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
            name="remote"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center justify-center">
                <FormLabel className="text-right pr-2 text-white">
                  remote:
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter remote..."
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
            name="contractType"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center justify-center">
                <FormLabel className="text-right pr-2 text-white">
                  contractType:
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter contractType..."
                    {...field}
                    className="col-span-3"
                  />
                </FormControl>
                <FormMessage className="col-span-4 p-0 mt-0 text-center" />
              </FormItem>
            )}
          />
          <Button type="submit" className="bg-blue-500">
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default JobOfferBasicInfoForm;
