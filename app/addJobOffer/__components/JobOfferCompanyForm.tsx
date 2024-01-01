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
  jobOfferCompanyInfo: {
    name: string;
    description: string;
    website: string;
    logo: {
      url: string;
    };
    location: string;
    geoLocation: {
      lat: number;
      lng: number;
    };
  };
  setJobOfferCompanyInfo: (jobOfferCompanyInfo: {
    name: string;
    description: string;
    website: string;
    logo: {
      url: string;
    };
    location: string;
    geoLocation: {
      lat: number;
      lng: number;
    };
  }) => void;
  active: number;
  setActive: (active: number) => void;
};

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Must be 2 or more characters long" })
    .max(50, { message: "Must be 50 or fewer characters long" }),
  description: z
    .string()
    .min(4, { message: "Must be 4 or more characters long" })
    .max(50, { message: "Must be 50 or fewer characters long" }),
  website: z
    .string()
    .min(2, { message: "Must be 2 or more characters long" })
    .max(50, { message: "Must be 50 or fewer characters long" }),
  logo: z.object({
    url: z.string(),
  }),
  location: z
    .string()
    .min(2, { message: "Must be 2 or more characters long" })
    .max(300, { message: "Must be 300 or fewer characters long" }),
  geoLocation: z.object({
    lat: z.coerce.number().min(-90).max(90), // SOLUTION: use coerce.number() instead of number()
    lng: z.coerce.number().min(-180).max(180),
  }),
});

const JobOfferCompanyForm: React.FC<Props> = ({
  jobOfferCompanyInfo,
  setJobOfferCompanyInfo,
  active,
  setActive,
}) => {
  // Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: jobOfferCompanyInfo.name || "",
      description: jobOfferCompanyInfo.description || "",
      website: jobOfferCompanyInfo.website || "",
      logo: {
        url: jobOfferCompanyInfo.logo.url || "",
      },
      location: jobOfferCompanyInfo.location || "",
      geoLocation: {
        lat: jobOfferCompanyInfo.geoLocation.lat || 0.0,
        lng: jobOfferCompanyInfo.geoLocation.lng || 0.0,
      },
    },
  });

  // Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    toast.success("Company info saved");
    setJobOfferCompanyInfo(values);
    setActive(active + 1);
  }

  // TODO: company logo upload and location autocomplete + mapbox
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
            name="name"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center justify-center">
                <FormLabel className="text-right pr-2 text-white">
                  name:
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter name..."
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
            name="description"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center justify-center">
                <FormLabel className="text-right pr-2 text-white">
                  description:
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter description..."
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
            name="website"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center justify-center">
                <FormLabel className="text-right pr-2 text-white">
                  website:
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter website..."
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
            name="logo.url"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center justify-center">
                <FormLabel className="text-right pr-2 text-white">
                  logo:
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter logo..."
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
            name="location"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center justify-center">
                <FormLabel className="text-right pr-2 text-white">
                  location:
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter location..."
                    {...field}
                    className="col-span-3"
                  />
                </FormControl>
                <FormMessage className="col-span-4 p-0 mt-0 text-center" />
              </FormItem>
            )}
          />
          {/* TODO: Add interactive mapbox and google location autocomplete */}
          <FormField
            control={form.control}
            name="geoLocation.lat"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center justify-center">
                <FormLabel className="text-right pr-2 text-white">
                  geoLocation.lat:
                </FormLabel>
                <FormControl>
                  <Input type="number" {...field} className="col-span-3" />
                </FormControl>
                <FormMessage className="col-span-4 p-0 mt-0 text-center" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="geoLocation.lng"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center justify-center">
                <FormLabel className="text-right pr-2 text-white">
                  geoLocation.lng:
                </FormLabel>
                <FormControl>
                  <Input type="number" {...field} className="col-span-3" />
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

export default JobOfferCompanyForm;
