"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useConfirmModal } from "@/hooks/useConfirmModal";
import { useGetAllPostCommentsMutation } from "@/redux/features/comment/commentApi";
import {
  useDeletePostMutation,
  useGetPostByIdMutation,
} from "@/redux/features/post/postApi";
import { Edit, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import PostComment from "./__components/PostComment";
import MetaDataProvider from "@/app/providers/MetaDataProvider";
import AddComment from "./__components/AddComment";

type Props = {};

const BlogPostDetailPage = (props: Props) => {
  // router navigation
  const router = useRouter();
  // get postId from url
  const postId = useParams().postId;
  const [post, setPost] = useState<any>({}); // {}
  const [comments, setComments] = useState<any>([]); // []
  const [postDate, setPostDate] = useState<string>(""); // "2021-06-14"
  const [postTime, setPostTime] = useState<string>(""); // "16:45"
  const [loading, setLoading] = useState<boolean>(true);

  // custom hook for confirm modal
  const confirmModal = useConfirmModal();

  // redux action to get all posts
  const [getPostById, { isSuccess, error }] = useGetPostByIdMutation();
  // redux action for getting all comments
  const [getAllPostComments] = useGetAllPostCommentsMutation();
  // get user data from redux
  const { user } = useSelector((state: any) => state.auth);
  // redux action to delete post
  const [deletePost, { isSuccess: isSuccessDelete, error: errorDelete }] =
    useDeletePostMutation();

  let notificationId: any;

  // fetch post on page load
  useEffect(() => {
    getPostById({ postId }).then((res: any) => {
      setPost(res.data?.post);
    });
    getAllPostComments({ postId }).then((res: any) => {
      setComments(res.data?.comments);
    });
  }, []);

  // refetch comments after adding new comment
  const refetchComments = () => {
    getAllPostComments({ postId }).then((res: any) => {
      setComments(res.data?.comments);
    });
  };

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
      deletePost({ postId: post._id });
      toast.loading("Deleting post is process...", {
        position: "top-center",
        id: notificationId,
      });
    };
    confirmModal.onOpen();
  };

  useEffect(() => {
    if (isSuccessDelete) {
      router.push("/blog");
      toast.success("Post deleted successfully", {
        position: "top-center",
        id: notificationId,
      });
    }
    if (errorDelete) {
      console.log(errorDelete);
    }
  }, [isSuccessDelete, errorDelete]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl font-bold text-black">Loading...</p>
      </div>
    );

  return (
    <div className="px-8 md:max-w-7xl mx-auto mt-8">
      <MetaDataProvider
        title="Blog post"
        description="Fullstack Job Searching Site by @RiP3rQ"
      />
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
      <div className="flex flex-col space-y-2">
        <h3 className="mt-6 mb-4 font-semibold ">Comments:</h3>
        {comments?.map((comment: any, index: number) => (
          <PostComment
            key={index}
            comment={comment}
            user={user}
            refetchComments={refetchComments}
            postId={postId}
          />
        ))}
      </div>
      {/* Write own comment */}

      <AddComment
        user={user}
        postId={postId}
        refetchComments={refetchComments}
      />

      <br />
    </div>
  );
};

export default BlogPostDetailPage;
