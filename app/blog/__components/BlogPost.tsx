import React from "react";

type Props = {};

const BlogPost = (props: Props) => {
  return (
    <div className="w-full flex mt-8 space-x-4 md:mb-16 lg:mb-24">
      {/* left side */}
      <div className="w-[35%] h-[200px] flex items-center justify-center">
        <img
          src="https://www.cined.com/content/uploads/2023/03/Midjourney_v5_out_now-feature_image_2.jpg"
          alt=""
          className=""
        />
      </div>

      {/* right side */}
      <div className="w-[65%] flex flex-col">
        <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
          Lorem ipsum dolor sit amet consectetur adipisicing eli
        </h1>
        <div className="flex mb-2 text-sm font-semibold text-gray-500 space-x-4 md:mb-4">
          <p>@essabessakessa</p>
          <div className="flex space-x-2">
            <p>16/06/2023</p>
            <p>16:45</p>
          </div>
        </div>
        <p className="text-sm md:text-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea facilis
          accusamus id, nobis voluptatibus eligendi laborum repellat adipisci
          quo assumenda fuga ipsum sequi vel ducimus ab, aliquam atque, culpa
          impedit?
        </p>
      </div>
    </div>
  );
};

export default BlogPost;
