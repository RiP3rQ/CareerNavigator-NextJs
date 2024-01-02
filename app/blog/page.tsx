"use client";

import React, { useEffect, useState } from "react";
import BlogPost from "./__components/BlogPost";
import SearchBar from "./__components/SearchBar";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useGetAllPostsMutation } from "@/redux/features/post/postApi";
import MetaDataProvider from "../providers/MetaDataProvider";
import { useRouter } from "next/navigation";

type Props = {};

const BlogPage = (props: Props) => {
  const [searchFilter, setSearchFilter] = useState<string>(""); // "title"
  const [searchReady, setSearchReady] = useState<boolean>(false);
  const [posts, setPosts] = useState<any[]>([]); // [{}, {}, {}]
  const router = useRouter();
  // redux action to get all posts
  const [getAllPosts, { isSuccess, error }] = useGetAllPostsMutation();

  // handle post click
  const handlePostClick = (postId: string) => () => {
    router.push(`/blog/${postId}`);
  };

  // fetch all posts on page load
  useEffect(() => {
    getAllPosts({}).then((res: any) => {
      setPosts(res.data.posts);
    });
  }, []);

  let notificationId: string | number | undefined;
  // fetch all posts on search filter change
  useEffect(() => {
    if (searchReady) {
      getAllPosts({
        data: {
          searchFilter,
        },
      }).then((res: any) => {
        setPosts(res.data.posts);
      });
    }
  }, [searchReady]);

  // do action base on success or error
  useEffect(() => {
    if (isSuccess) {
      setSearchReady(false);
      setSearchFilter("");
    }
    if (error) {
      console.log(error);
    }
  }, [isSuccess, error]);

  return (
    <div className="max-w-7xl mx-4 lg:mx-auto">
      <MetaDataProvider
        title="Blog"
        description="Fullstack Job Searching Site by @RiP3rQ"
      />
      <div className="w-full flex items-center justify-center my-4">
        <SearchBar
          setSearchReady={setSearchReady}
          searchFilter={searchFilter}
          setSearchFilter={setSearchFilter}
        />
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
      {/* item */}
    </div>
  );
};

export default BlogPage;
