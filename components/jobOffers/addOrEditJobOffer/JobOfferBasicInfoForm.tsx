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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

type Props = {
  jobOfferBasicInfo: {
    title: string;
    salaryRange: string;
    remote: "Remote" | "Hybrid" | "Office";
    contractType:
      | "B2B"
      | "UoP"
      | "UZ"
      | "B2B/UoP"
      | "B2B/UZ"
      | "UoP/UZ"
      | "B2B/UoP/UZ";
  };
  setJobOfferBasicInfo: (jobOfferBasicInfo: {
    title: string;
    salaryRange: string;
    remote: "Remote" | "Hybrid" | "Office";
    contractType:
      | "B2B"
      | "UoP"
      | "UZ"
      | "B2B/UoP"
      | "B2B/UZ"
      | "UoP/UZ"
      | "B2B/UoP/UZ";
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
  remote: z.enum(["Remote", "Hybrid", "Office"]),
  contractType: z.enum([
    "B2B",
    "UoP",
    "UZ",
    "B2B/UoP",
    "B2B/UZ",
    "UoP/UZ",
    "B2B/UoP/UZ",
  ]),
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

  console.log(jobOfferBasicInfo);

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
          Basic information about the job offer
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
                  Title:
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="etc. Fullstack developer"
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
                  Salary:
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="etc. 4000-8000PLN"
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
                  Remote:
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select organization of work" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Remote">Fully Remote</SelectItem>
                        <SelectItem value="Hybrid">Hybrid Work</SelectItem>
                        <SelectItem value="Office">Office based</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
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
                  Contract:
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select type of contract" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="B2B">B2B</SelectItem>
                        <SelectItem value="UoP">UoP</SelectItem>
                        <SelectItem value="UZ">UZ</SelectItem>
                        <SelectItem value="B2B/UoP">B2B/UoP</SelectItem>
                        <SelectItem value="B2B/UZ">B2B/UZ</SelectItem>
                        <SelectItem value="UoP/UZ">UoP/UZ</SelectItem>
                        <SelectItem value="B2B/UoP/UZ">B2B/UoP/UZ</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="col-span-4 p-0 mt-0 text-center" />
              </FormItem>
            )}
          />
          <Button type="submit" className="bg-blue-500">
            Next step
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default JobOfferBasicInfoForm;
