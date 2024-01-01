import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Trash } from "lucide-react";
import React from "react";

type Props = {};

const BlogPostDetailPage = (props: Props) => {
  return (
    <div className="px-8 md:max-w-7xl mx-auto mt-8">
      {/* Title, edit, delete */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-black md:text-3xl">
          Lorem ipsum dolor sit amet consectetur adipisicing eli
        </h1>
        <div className="flex items-center justify-center space-x-2">
          <p>
            <Edit />
          </p>
          <p>
            <Trash />
          </p>
        </div>
      </div>
      {/* @, date */}
      <div className="flex items-center justify-between mt-2 md:mt-4">
        <p>@RiP3rQ</p>
        <div className="flex space-x-2">
          <p>16/06/2023</p>
          <p>16:45</p>
        </div>
      </div>
      {/* Image */}
      <img
        src="https://www.cined.com/content/uploads/2023/03/Midjourney_v5_out_now-feature_image_2.jpg"
        alt=""
        className=""
      />
      <p className="mx-auto mt-8">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea facilis
        accusamus id, nobis voluptatibus eligendi laborum repellat adipisci quo
        assumenda fuga ipsum sequi vel ducimus ab, aliquam atque, culpa impedit?
      </p>
      <div className="flex items-center flex-wrap mt-8 space-x-4 font-semibold">
        <p className="w-full text-start my-1">Tags:</p>

        <div className="w-full space-x-2 space-y-2">
          <Badge className="bg-gray-300 rounded-lg pr-3 text-gray-700 text-xl cursor-pointer hover:bg-gray-400">
            Test
          </Badge>
          <Badge className="bg-gray-300 rounded-lg pr-3 text-gray-700 text-xl cursor-pointer hover:bg-gray-400">
            React
          </Badge>
          <Badge className="bg-gray-300 rounded-lg pr-3 text-gray-700 text-xl cursor-pointer hover:bg-gray-400">
            JavaScript
          </Badge>
          <Badge className="bg-gray-300 rounded-lg pr-3 text-gray-700 text-xl cursor-pointer hover:bg-gray-400">
            Test
          </Badge>
          <Badge className="bg-gray-300 rounded-lg pr-3 text-gray-700 text-xl cursor-pointer hover:bg-gray-400">
            React
          </Badge>
          <Badge className="bg-gray-300 rounded-lg pr-3 text-gray-700 text-xl cursor-pointer hover:bg-gray-400">
            Test
          </Badge>
          <Badge className="bg-gray-300 rounded-lg pr-3 text-gray-700 text-xl cursor-pointer hover:bg-gray-400">
            React
          </Badge>
          <Badge className="bg-gray-300 rounded-lg pr-3 text-gray-700 text-xl cursor-pointer hover:bg-gray-400">
            JavaScript
          </Badge>
          <Badge className="bg-gray-300 rounded-lg pr-3 text-gray-700 text-xl cursor-pointer hover:bg-gray-400">
            Test
          </Badge>
          <Badge className="bg-gray-300 rounded-lg pr-3 text-gray-700 text-xl cursor-pointer hover:bg-gray-400">
            React
          </Badge>
        </div>
      </div>
      <div className="flex flex-col my-4 ">
        <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>
        {/* Single Comment */}
        <div className="px-2 py-2 bg-gray-200 rounded-lg">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-600">@essabessa</h3>
            <div className="flex justify-center items-center space-x-4">
              <p className="text-gray-500 text-sm">14/06/2023</p>
              <p className="text-gray-500 text-sm">16:45</p>
              {/* actions */}
              <div className="flex items-center justify-center space-x-2">
                <p>
                  <Edit />
                </p>
                <p>
                  <Trash />
                </p>
              </div>
            </div>
          </div>
          <p className="px-4 mt-2">
            Nice Comment! Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Quia neque nobis explicabo quam at architecto temporibus sint
            nam veniam accusantium sequi alias illo molestias omnis repudiandae,
            quos maxime earum distinctio?
          </p>
        </div>
      </div>
      {/* Write own comment */}
      <div className="flex flex-col mt-4 md:flex-row md:space-x-2">
        <Input
          type="text"
          placeholder="Write a comment..."
          className="md:w-[90%] outline-none py-2 px-4 mt-4 md:mt-0"
        />
        <Button className="bg-black text-white px-4 py-2 md:w-[10%] mt-4 md:mt-0">
          Add comment
        </Button>
      </div>
      <br />
    </div>
  );
};

export default BlogPostDetailPage;
