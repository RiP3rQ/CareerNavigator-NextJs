import React from "react";

type Props = {
  post: any;
};

const BlogPost: React.FC<Props> = ({ post }) => {
  const postData = new Date(post.createdAt).toLocaleString().slice(0, 10);
  const postTime = new Date(post.createdAt).toLocaleString().slice(11, 16);
  return (
    <div className="w-full flex mt-8 space-x-4 md:mb-16 lg:mb-24 h-[200px]">
      {/* left side */}
      <div className="w-[35%] h-full flex items-center justify-center">
        <img src={post.postImage.url} alt="Post Image" className="h-full" />
      </div>

      {/* right side */}
      <div className="w-[65%] flex flex-col">
        <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
          {post.title}
        </h1>
        <div className="flex mb-2 text-sm font-semibold text-gray-500 space-x-4 md:mb-4">
          <p>@{post.username}</p>
          <div className="flex space-x-2">
            <p>{postData}</p>
            <p>{postTime}</p>
          </div>
        </div>
        <p className="text-sm md:text-lg">
          {post.description.length > 200
            ? post.description.slice(0, 200) + "... Read more"
            : post.description}
        </p>
      </div>
    </div>
  );
};

export default BlogPost;
