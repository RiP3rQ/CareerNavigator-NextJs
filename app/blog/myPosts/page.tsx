"use client";

import MetaDataProvider from "@/app/providers/MetaDataProvider";
import { Separator } from "@/components/ui/separator";
import { useGetPostsByUserIdMutation } from "@/redux/features/post/postApi";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BlogPost from "../__components/BlogPost";
import { useRouter } from "next/navigation";

type Props = {};

const MyBlogPosts = (props: Props) => {
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  // redux fetch users posts
  const [getPostsByUser, { isSuccess, error }] = useGetPostsByUserIdMutation();
  // get user data from redux
  const { user } = useSelector((state: any) => state.auth);

  useEffect(() => {
    getPostsByUser({ userId: user._id }).then((res: any) => {
      setPosts(res.data.posts);
    });
  }, [user]);

  // handle post click
  const handlePostClick = (postId: string) => () => {
    router.push(`/blog/${postId}`);
  };

  return (
    <div className="max-w-7xl mx-4 lg:mx-auto">
      <MetaDataProvider
        title="My Posts"
        description="Fullstack Job Searching Site by @RiP3rQ"
      />
      <div className="w-full flex items-center justify-center my-4">
        <p className="text-3xl font-bold">MY POSTS</p>
      </div>
      <Separator className="w-full" />
      {posts?.length > 0 ? (
        posts?.map((post: any, index: number) => (
          <div
            key={index}
            className="bg-transparent hover:bg-slate-300 hover:rounded-lg h-fit w-full cursor-pointer"
            onClick={handlePostClick(post._id)}
          >
            <BlogPost key={index} post={post} />
          </div>
        ))
      ) : (
        <p className="text-center font-bold text-black mt-20 text-3xl">
          No posts available!
        </p>
      )}
    </div>
  );
};

export default MyBlogPosts;
