"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useConfirmModal } from "@/hooks/useConfirmModal";
import { useGetPostByIdMutation } from "@/redux/features/post/postApi";
import { Edit, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type Props = {};

const BlogPostDetailPage = (props: Props) => {
  const [post, setPost] = useState<any>({}); // {}
  const [postDate, setPostDate] = useState<string>(""); // "2021-06-14"
  const [postTime, setPostTime] = useState<string>(""); // "16:45"
  const [loading, setLoading] = useState<boolean>(true);
  const confirmModal = useConfirmModal();
  const router = useRouter();
  // get postId from url
  const postId = useParams().postId;
  // redux action to get all posts
  const [getPostById, { isSuccess, error }] = useGetPostByIdMutation();
  // get user data from redux
  const { user } = useSelector((state: any) => state.auth);

  // fetch post on page load
  useEffect(() => {
    getPostById({ postId }).then((res: any) => {
      setPost(res.data?.post);
    });
  }, []);

  // do action base on success or error
  useEffect(() => {
    if (isSuccess) {
      setLoading(false);
      setPostDate(new Date(post?.createdAt).toLocaleString().slice(0, 10));
      setPostTime(new Date(post?.createdAt).toLocaleString().slice(11, 16));
    }
    if (error) {
      console.log("Error fetching post");
    }
  }, [isSuccess, error]);

  const handleEditClick = () => {
    confirmModal.data = {
      title: "Edit post",
      description: "Are you sure you want to edit this post?",
    };
    confirmModal.action = () => {
      router.push(`/blog/editPost/${post._id}`);
    };
    confirmModal.onOpen();
  };

  const handleDeleteClick = () => {
    confirmModal.data = {
      title: "Delete post",
      description: "Are you sure you want to delete this post?",
    };
    confirmModal.action = () => {
      // TODO: Delete comment functionality
      console.log("Delete post");
    };
    confirmModal.onOpen();
  };

  // TODO: Fetch comments functionality
  // TODO: Add comment functionality

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl font-bold text-black">Loading...</p>
      </div>
    );

  return (
    <div className="px-8 md:max-w-7xl mx-auto mt-8">
      {/* Title, edit, delete */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-black md:text-3xl">
          {post.title}
        </h1>
        {user._id === post.userId && (
          <div className="flex items-center justify-center space-x-2">
            <p
              className="text-blue-500 cursor-pointer hover:text-blue-400"
              onClick={handleEditClick}
            >
              <Edit />
            </p>
            <p
              className="text-red-500 cursor-pointer hover:text-red-400"
              onClick={handleDeleteClick}
            >
              <Trash />
            </p>
          </div>
        )}
      </div>
      {/* @, date */}
      <div className="flex items-center justify-between mt-2 md:mt-4">
        <p>@{post.username}</p>
        <div className="flex space-x-2">
          <p>{postDate}</p>
          <p>{postTime}</p>
        </div>
      </div>
      {/* Image */}
      <div className="w-full flex items-center justify-center">
        <img src={post.postImage.url} alt="" className="" />
      </div>
      <p className="mx-auto mt-8">{post.description}</p>
      <div className="flex items-center flex-wrap mt-8 space-x-4 font-semibold">
        <p className="w-full text-start my-1">Tags:</p>

        <div className="w-full space-x-2 space-y-2">
          {post.tags?.map((tag: string, index: number) => (
            <Badge
              key={index}
              className="bg-gray-300 rounded-lg pr-3 text-gray-700 text-xl cursor-pointer hover:bg-gray-400"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      <div className="flex flex-col my-4 ">
        <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>
        {/* TODO: Redux feting comments */}
        {/* TODO: Adding comments */}
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
