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
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FaCalendarAlt } from "react-icons/fa";
import { addDays, format } from "date-fns";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { DateRange } from "react-day-picker";
import { toast } from "sonner";
import {
  useDeleteEducationMutation,
  useUpdateEducationMutation,
} from "@/redux/features/user/userApi";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";

const formSchema = z.object({
  school: z
    .string()
    .min(2, { message: "Must be 2 or more characters long" })
    .max(50, { message: "Must be 50 or fewer characters long" }),
  degree: z
    .string()
    .min(2, { message: "Must be 2 or more characters long" })
    .max(50, { message: "Must be 50 or fewer characters long" }),
  fieldOfStudy: z
    .string()
    .min(2, { message: "Must be 2 or more characters long" })
    .max(50, { message: "Must be 50 or fewer characters long" }),
  description: z
    .string()
    .min(2, { message: "Must be 2 or more characters long" })
    .max(300, { message: "Must be 300 or fewer characters long" }),
});

type Props = {
  user: any;
};

const EducationForm: React.FC<Props> = ({ user }) => {
  const [loadUser, setLoadUser] = useState(false);
  // date range for date picker
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });

  // redux update education action
  const [updateEducation, { isSuccess, error }] = useUpdateEducationMutation();
  // redux delete education action
  const [deleteEducation, { isSuccess: deleteSuccess, error: deleteError }] =
    useDeleteEducationMutation();
  // redux get user
  const {} = useLoadUserQuery(undefined, {
    skip: loadUser ? false : true,
  });

  // Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      school: "",
      degree: "",
      fieldOfStudy: "",
      description: "",
    },
  });

  // delete education action
  const handleDeleteEducation = async (id: string) => {
    await deleteEducation({ educationId: id });
  };

  // Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const education = {
      school: values.school,
      degree: values.degree,
      fieldOfStudy: values.fieldOfStudy,
      description: values.description,
      from: date?.from,
      to: date?.to,
    };

    if (!date?.from || !date?.to) {
      toast.error("Please select a date range");
      return;
    }

    if (
      !education.school ||
      !education.degree ||
      !education.fieldOfStudy ||
      !education.description
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    // redux action
    await updateEducation({ education });
  }

  useEffect(() => {
    if (isSuccess) {
      setLoadUser(true);
      toast.success("Education updated successfully", {
        position: "top-center",
      });
      form.reset();
    }
    if (deleteSuccess) {
      setLoadUser(true);
      toast.success("Education deleted successfully", {
        position: "top-center",
      });
    }
    if (error || deleteError) {
      console.log(error);
    }
  }, [isSuccess, error, deleteSuccess, deleteError]);

  const formatDate = (date: Date) => {
    return format(date, "LLL dd, y");
  };

  return (
    <div className="w-full h-fit bg-slate-800/60 rounded-xl px-6">
      <div className="w-full h-full flex justify-center flex-col items-center">
        {user.education.length > 0 && (
          <>
            <div className="w-full flex items-center flex-col justify-center pt-2">
              <Label className="text-center mb-2 text-xl">My education</Label>
              <Separator className="w-full" />
              {user.education.map((education: any, index: any) => (
                <div
                  key={index}
                  className="w-full flex items-center justify-center flex-col py-2 relative"
                >
                  <div className="w-full text-center">
                    <Label className="mb-2 text-xl">
                      {education.school} - {education.degree} -{" "}
                      {education.fieldOfStudy}
                    </Label>
                  </div>

                  <p className="text-xs">{education.description}</p>
                  <Label className="text-center mb-2 text-xl">
                    {formatDate(education.from)} - {formatDate(education.to)}
                  </Label>
                  {/* delete button */}
                  <div
                    className="absolute top-2 right-2 cursor-pointer hover:bg-red-500 
                  hover:rounded-full"
                    onClick={() => handleDeleteEducation(education._id)}
                  >
                    <X className="h-4 w-4 text-white" />
                  </div>
                </div>
              ))}
            </div>
            <Separator className="w-full" />
          </>
        )}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4"
          >
            <FormField
              control={form.control}
              name="school"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center justify-center">
                  <FormLabel className="text-right pr-2">School:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter school name..."
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
              name="fieldOfStudy"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center justify-center">
                  <FormLabel className="text-right pr-2">
                    Field of study:
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter field of study..."
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
              name="degree"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center justify-center">
                  <FormLabel className="text-right pr-2">Degree:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your degree..."
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
                  <FormLabel className="text-right pr-2">
                    Description:
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter description..."
                      {...field}
                      className="col-span-3"
                    />
                  </FormControl>
                  <FormMessage className="col-span-4 p-0 mt-0 text-center" />
                </FormItem>
              )}
            />
            <div className="w-full flex items-center justify-center">
              <Label>Pick a range of dates for your education</Label>
            </div>
            <div className="grid gap-2 items-center justify-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={"outline"}
                    className={cn(
                      "w-[300px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <FaCalendarAlt className="mr-2 h-4 w-4" />
                    {date?.from ? (
                      date.to ? (
                        <>
                          {format(date.from, "LLL dd, y")} -{" "}
                          {format(date.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(date.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <Button type="submit">Save</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EducationForm;
