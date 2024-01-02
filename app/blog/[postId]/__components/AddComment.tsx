"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAddCommentMutation } from "@/redux/features/comment/commentApi";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {
  postId: string | string[];
  user: any;
  refetchComments: () => void;
};

const AddComment: React.FC<Props> = ({ postId, user, refetchComments }) => {
  const [commentValue, setCommentValue] = useState<string>(""); // "Comment text"
  const [addComment, { isSuccess }] = useAddCommentMutation();

  // notification ID
  let notificationId: any;

  const handleAddComment = () => {
    if (commentValue === "") {
      toast.error("Comment can't be empty");
      return;
    }

    const data = {
      postId,
      author: `${user.firstName}_${user.lastName}`,
      comment: commentValue,
      userId: user._id,
    };

    addComment({ postId: postId, data });
    toast.loading("Adding comment...", {
      id: notificationId,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Comment added successfully", {
        id: notificationId,
      });
      setCommentValue("");
      refetchComments();
    }
  }, [isSuccess]);

  return (
    <div className="flex items-center flex-col md:flex-row mt-4 w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddComment();
        }}
        className="md:w-[90%] w-full mr-0 md:mr-2"
      >
        <Input
          type="text"
          placeholder="Write a comment..."
          className="w-full outline-none py-2 px-4 mt-4 md:mt-0"
          value={commentValue}
          onChange={(e) => setCommentValue(e.target.value)}
        />
      </form>

      <Button
        className="bg-black hover:bg-slate-800 text-white px-4 py-2 md:w-[10%] w-full mt-4 md:mt-0"
        onClick={handleAddComment}
      >
        Send
      </Button>
    </div>
  );
};

export default AddComment;
