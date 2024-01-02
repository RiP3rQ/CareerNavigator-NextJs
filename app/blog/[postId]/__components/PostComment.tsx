import { Edit, Trash } from "lucide-react";
import React from "react";

type Props = {
  comment: any;
};

const PostComment: React.FC<Props> = ({ comment }) => {
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
      <p className="px-4 mt-2">{comment.comment}</p>
    </div>
  );
};

export default PostComment;
