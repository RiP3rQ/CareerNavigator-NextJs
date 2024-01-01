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
  jobOfferDescription: {
    description: string;
  };
  setJobOfferDescription: (jobOfferDescription: {
    description: string;
  }) => void;
  active: number;
  setActive: (active: number) => void;
};

const formSchema = z.object({
  description: z
    .string()
    .min(4, { message: "Must be 4 or more characters long" })
    .max(1000, { message: "Must be 1000 or fewer characters long" }),
});

const JobOfferDescriptionForm: React.FC<Props> = ({
  jobOfferDescription,
  setJobOfferDescription,
  active,
  setActive,
}) => {
  // Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: jobOfferDescription.description || "",
    },
  });

  // Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    toast.success("Company info saved");
    setJobOfferDescription(values);
    setActive(active + 1);
  }

  // TODO: Change to textarea
  return (
    <div className="w-[80%] mx-auto mt-10 bg-purple-700 px-4">
      <div className="w-full text-center pt-4 text-white">
        <Label className="text-2xl font-bold ">Your company info</Label>
      </div>

      <Separator className="my-4" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-4 py-4"
        >
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="flex items-center justify-center">
                <FormLabel className="w-full text-center text-white">
                  Job description:
                </FormLabel>
                <FormControl className="w-full">
                  <Input
                    placeholder="Enter description..."
                    {...field}
                    className="col-span-3"
                  />
                </FormControl>
                <FormMessage className="w-full p-0 mt-0 text-center" />
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

export default JobOfferDescriptionForm;
