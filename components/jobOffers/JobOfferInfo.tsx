import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { BookOpen, Building, Copy, MapPin, Share2, Star } from "lucide-react";
import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAddToFavouritesMutation } from "@/redux/features/jobOffer/jobOfferApi";

type Props = {
  jobOfferId?: string;
  companyLogo: string;
  jobTitle: string;
  companyName: string;
  companyLocation: string;
  salaryRange: string;
  remote: string;
  contractType: string;
  alreadyApplied?: boolean;
  updatedAt: Date;
};

const JobOfferInfo: React.FC<Props> = ({
  jobOfferId,
  companyLogo,
  jobTitle,
  companyName,
  companyLocation,
  salaryRange,
  remote,
  contractType,
  alreadyApplied,
  updatedAt,
}) => {
  const [isFavorited, setIsFavorited] = React.useState<boolean>(false);
  // route to share job offer
  const routeToShare = usePathname();
  // redux action for adding job offer to favorites
  const [addJobOfferToFavorites, { data, error, isSuccess }] =
    useAddToFavouritesMutation();

  // check if updatedAt is less than 3 days
  const isLessThan3Days = (updatedAt: Date) => {
    const now = new Date();
    const postDate = new Date(updatedAt);
    const diff = now.getTime() - postDate.getTime();
    const diffInDays = diff / (1000 * 3600 * 24);
    if (diffInDays < 3) {
      return true;
    }
    return false;
  };

  console.log(data);

  // action based on redux response
  React.useEffect(() => {
    if (isSuccess) {
      if (data.favourited) {
        toast.success("Added to favorites", {
          position: "top-center",
        });
      } else {
        toast.success("Removed from favorites", {
          position: "top-center",
        });
      }
      setIsFavorited(data.favourited);
    }
    if (error) {
      console.log(error);
    }
  }, [isSuccess, error]);

  // handle share button click
  const handleShareClick = () => {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_PUBLIC_URL}${routeToShare}`
    );
    toast.success("Link copied to clipboard", {
      position: "top-center",
      unstyled: true,
      style: {
        backgroundColor: "#4B5563",
        color: "#00ff00",
        padding: "2rem",
        display: "flex",
        justifyItems: "center",
        alignItems: "center",
        borderRadius: "1rem",
      },
    });
  };

  const handleFavoriteClick = () => {
    addJobOfferToFavorites({ jobOfferId });
  };

  return (
    <div className="w-full h-fit">
      {/* Header */}
      <div className="bg-purple-400 rounded-t-2xl w-full flex h-40">
        {/* Company Image */}
        <div className="w-[25%] h-full flex items-center justify-center">
          <img
            src={companyLogo}
            alt="company-logo"
            className="object-contain rounded-full h-40 w-40"
          />
        </div>
        <div className="w-[75%] p-4 flex flex-col justify-center space-y-3 text-white relative">
          <Label className=" font-bold text-3xl">{jobTitle}</Label>
          {/* bottom line */}
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center" id="location">
              <Building className="w-5 h-5 mr-1" />
              <Label className="text-xs">{companyName}</Label>
              <MapPin className="w-5 h-5 ml-4" />
              <Label className="text-xs">{companyLocation}</Label>
            </div>
          </div>
          {/* absolute right top */}
          <div className="absolute top-0 right-4 space-x-2 flex items-center justify-center">
            {alreadyApplied ? (
              <Badge className="bg-transparent bg-green-400 border border-slate-200 text-xs py-2">
                Applied
              </Badge>
            ) : null}
            {isLessThan3Days(updatedAt) ? (
              <Badge className="bg-transparent border border-slate-200 text-xs py-2">
                New
              </Badge>
            ) : null}
            {/* SHARE BUTTON */}
            <Drawer>
              <DrawerTrigger>
                <div className="bg-slate-400 p-2 rounded-full cursor-pointer">
                  <Share2 className="w-5 h-5" />
                </div>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>
                    Want to share this job offer with someone?
                  </DrawerTitle>
                  <DrawerDescription>
                    Press Copy to copy the link to your clipboard
                  </DrawerDescription>
                </DrawerHeader>
                <div className="w-full py-4">
                  <input
                    type="text"
                    className="w-full bg-slate-200 rounded-md p-2"
                    value={`${process.env.NEXT_PUBLIC_PUBLIC_URL}${routeToShare}`}
                    readOnly
                  />
                </div>
                <DrawerFooter>
                  <Button className="text-2xl" onClick={handleShareClick}>
                    Copy
                    <Copy className="ml-4" />
                  </Button>
                  <DrawerClose>
                    <Button className="w-full bg-slate-200" variant={"ghost"}>
                      Cancel
                    </Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
            {/* SHARE BUTTON END */}
            {/* FAVORITE BUTTON */}
            <Button
              className="bg-slate-400 p-2 rounded-full cursor-pointer"
              onClick={handleFavoriteClick}
            >
              <Star
                className={`w-5 h-5 ${
                  isFavorited ? "text-yellow-300" : "text-white"
                }`}
              />
            </Button>
          </div>
          {/* absolute right bottom */}
          <div className="absolute bottom-4 right-4">
            <Badge className="bg-transparent border border-slate-200 text-base py-2 text-green-400">
              {salaryRange}
            </Badge>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="w-full h-32 bg-slate-600 rounded-b-2xl flex items-center justify-center">
        {/* Left side */}
        <div className="w-full h-full flex items-center justify-center">
          {/* icon */}
          <div className="bg-blue-400 p-3 rounded-xl">
            <MapPin className="w-7 h-7 text-white" />
          </div>
          <div className="ml-2 flex flex-col justify-center">
            <Label className="text-slate-400 text-sm">Operation mode</Label>
            <p className="text-white text-xl">{remote}</p>
          </div>
          {/* text */}
        </div>
        {/* Right side */}
        <div className="w-full h-full flex items-center justify-center">
          {/* icon */}
          <div className="bg-green-400 p-3 rounded-xl">
            <BookOpen className="w-7 h-7 text-white" />
          </div>
          <div className="ml-2 flex flex-col justify-center">
            <Label className="text-slate-400 text-sm">Employment Type</Label>
            <p className="text-white text-xl">{contractType}</p>
          </div>
          {/* text */}
        </div>
      </div>
    </div>
  );
};

export default JobOfferInfo;
