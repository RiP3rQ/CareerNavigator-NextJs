import { Input } from "@/components/ui/input";
import { useEditCommentMutation } from "@/redux/features/comment/commentApi";
import { Check, Edit, Trash, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {
  comment: any;
  user: any;
  postId: string | string[];
  refetchComments: () => void;
};

const PostComment: React.FC<Props> = ({
  comment,
  user,
  postId,
  refetchComments,
}) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [commentValue, setCommentValue] = useState<string>(comment.comment);
  const [disabled, setDisabled] = useState<boolean>(false);

  const [editComment, { isSuccess }] = useEditCommentMutation();

  let notificationId: any;

  const handleEditComment = () => {
    if (!commentValue) return toast.error("Comment can't be empty");

    const author = `${user.firstName}_${user.lastName}`;
    const data = {
      comment: commentValue,
      userId: user._id,
      postId,
      author,
    };
    setDisabled(true);
    setEditing(false);
    toast.loading("Editing comment...");
    editComment({ commentId: comment._id, data });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Comment edited successfully", {
        id: notificationId,
      });
      setDisabled(false);
      refetchComments();
    }
  }, [isSuccess]);

  return (
    <div className="px-2 py-2 bg-gray-200 rounded-lg">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-600">@{comment.author}</h3>
        <div className="flex justify-center items-center space-x-4">
          <p className="text-gray-500 text-sm">
            {new Date(comment.createdAt).toLocaleString().slice(0, 10)}
          </p>
          <p className="text-gray-500 text-sm">
            {new Date(comment.createdAt).toLocaleString().slice(11, 16)}
          </p>
          {/* actions */}
          {user?._id === comment.userId && (
            <div className="flex items-center justify-center space-x-2">
              <p className="text-blue-500 cursor-pointer hover:text-blue-400">
                {editing ? (
                  <Check onClick={handleEditComment} />
                ) : (
                  <Edit onClick={() => setEditing(true)} />
                )}
              </p>
              <p className="text-red-500 cursor-pointer hover:text-red-400">
                {editing ? (
                  <X
                    onClick={() => {
                      setEditing(false);
                      setCommentValue(comment.comment);
                    }}
                  />
                ) : (
                  <Trash onClick={() => console.log("delete")} />
                )}
              </p>
            </div>
          )}
        </div>
      </div>

      {editing ? (
        <Input
          type="text"
          className="w-full outline-none text-base py-0 "
          value={commentValue}
          onChange={(e) => setCommentValue(e.target.value)}
          disabled={disabled}
        />
      ) : (
        <p className="px-4 mt-2">{commentValue}</p>
      )}
    </div>
  );
};

export default PostComment;
