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
import { Textarea } from "@/components/ui/textarea";
import Mapbox from "@/components/Mapbox";

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
      latitude: number;
      longitude: number;
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
      latitude: number;
      longitude: number;
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
    .max(300, { message: "Must be 300 or fewer characters long" }),
  website: z
    .string()
    .min(2, { message: "Must be 2 or more characters long" })
    .max(50, { message: "Must be 50 or fewer characters long" }),
  location: z
    .string()
    .min(2, { message: "Must be 2 or more characters long" })
    .max(50, { message: "Must be 300 or fewer characters long" }),
});

const JobOfferCompanyForm: React.FC<Props> = ({
  jobOfferCompanyInfo,
  setJobOfferCompanyInfo,
  active,
  setActive,
}) => {
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  // drag n' drop state
  const [dragging, setDragging] = useState(false);
  // Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: jobOfferCompanyInfo.name || "",
      description: jobOfferCompanyInfo.description || "",
      website: jobOfferCompanyInfo.website || "",
      location: jobOfferCompanyInfo.location || "",
    },
  });

  // handle company logo
  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setJobOfferCompanyInfo({
            ...jobOfferCompanyInfo,
            logo: {
              url: reader.result as any,
            },
          });
        }
      };
      reader.readAsDataURL(file);
    }
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
        setJobOfferCompanyInfo({
          ...jobOfferCompanyInfo,
          logo: {
            url: reader.result as any,
          },
        });
      };

      reader.readAsDataURL(file);
    }
  };

  // Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!location.latitude || !location.longitude)
      return toast.error("Please choose exact location");

    if (!jobOfferCompanyInfo.logo.url)
      return toast.error("Please upload company's logo");

    toast.success("Company info saved");
    setJobOfferCompanyInfo({
      ...jobOfferCompanyInfo,
      name: values.name,
      description: values.description,
      website: values.website,
      location: values.location,
      geoLocation: {
        latitude: location.latitude,
        longitude: location.longitude,
      },
    });
    setActive(active + 1);
  }

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
                <FormLabel className="text-right pr-2 text-white pt-2">
                  Name:
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="etc. Facebook"
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
                <FormLabel className="text-right pr-2 text-white pt-2">
                  Description:
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="etc. Facebook is an American online social media and social networking service..."
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
                <FormLabel className="text-right pr-2 text-white pt-2">
                  Website URL:
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="etc. https://www.facebook.com/"
                    {...field}
                    className="col-span-3"
                  />
                </FormControl>
                <FormMessage className="col-span-4 p-0 mt-0 text-center" />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-4 items-center justify-center relative">
            {jobOfferCompanyInfo.logo.url && (
              <div
                className="absolute -top-2 -right-2 p-1 bg-red-400 cursor-pointer 
            rounded-full hover:bg-red-800/70 z-50"
                onClick={() =>
                  setJobOfferCompanyInfo({
                    ...jobOfferCompanyInfo,
                    logo: {
                      url: "",
                    },
                  })
                }
              >
                <X size={20} className="text-white" />
              </div>
            )}
            <p className=" text-right pr-2 text-white pt-2">Company's logo:</p>
            <Input
              type="file"
              accept="image/*"
              id="file"
              onChange={handleFileChange}
              className="hidden"
            />
            <Label
              htmlFor="file"
              className={`col-span-3 min-h-[20vh] border-[#00000026] p-3 border flex
            items-center justify-center ${
              dragging ? "bg-blue-500" : "bg-transparent"
            } `}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {jobOfferCompanyInfo.logo.url ? (
                <>
                  <img
                    src={jobOfferCompanyInfo.logo.url}
                    alt="Company's logo"
                    className="max-h-full max-w-full object-contain"
                  />
                </>
              ) : (
                <span className="text-black text-center">
                  Drag 'n' drop your company's logo here, or click to select
                  file
                </span>
              )}
            </Label>
          </div>
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center justify-center">
                <FormLabel className="text-right pr-2 text-white pt-2">
                  Closes big city:
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="etc. Warsaw, Poland"
                    {...field}
                    className="col-span-3"
                  />
                </FormControl>
                <FormMessage className="col-span-4 p-0 mt-0 text-center" />
              </FormItem>
            )}
          />
          {/* TODO: Add interactive mapbox and google location autocomplete */}
          <div className="w-full h-fit">
            <Label className="text-white text-2xl">
              Choose exact location:
            </Label>
            <div className="w-full h-96">
              <Mapbox setLocation={setLocation} />
            </div>
          </div>

          <Button type="submit" className="bg-blue-500">
            Next step
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default JobOfferCompanyForm;
