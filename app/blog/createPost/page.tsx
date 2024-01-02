"use client";

import React, { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { toast } from "sonner";

type Props = {};

const CreatePostPage = (props: Props) => {
  const filePicekerRef = useRef(null);
  const [title, setTitle] = useState<string>(""); // "title"
  const [description, setDescription] = useState<string>(""); // "description"
  const [preview, setPreview] = useState<string>();
  const [tagInput, setTagInput] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]); // ["tag1", "tag2"]

  // tag handlers
  const handleAddTag = () => {
    if (tagInput === "") {
      toast.error("Tag cannot be empty");
      return;
    } else if (tagInput.length > 20) {
      toast.error("Tag cannot be longer than 20 characters");
      return;
    } else if (tags.length >= 10) {
      toast.error("You can only add 10 tags");
      return;
    }
    setTags([...tags, tagInput]);
    setTagInput("");
  };

  const handleDeleteTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  // drag n' drop state
  const [dragging, setDragging] = useState(false);

  // handle Drag n' Drop
  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        setPreview(e.target.result);
      };
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        setPreview(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  // Create post
  const handleCreatePost = () => {
    if (!preview) {
      toast.error("Please upload an image");
      return;
    } else if (tags.length === 0) {
      toast.error("Please add at least one tag");
      return;
    } else if (tags.length > 10) {
      toast.error("You can only add 10 tags");
      return;
    } else if (title === "") {
      toast.error("Please enter a title");
      return;
    } else if (title.length > 100) {
      toast.error("Title cannot be longer than 100 characters");
      return;
    } else if (description === "") {
      toast.error("Please enter a description");
      return;
    } else if (description.length > 2000) {
      toast.error("Description cannot be longer than 2000 characters");
      return;
    }

    // create post
    toast.success("Post created successfully");
    // reset state
    setPreview(undefined);
    setTags([]);
    setTitle("");
    setDescription("");
  };

  return (
    <div className="px-6 md:px-[200px] mt-8">
      <h1 className="font-bold md:text-2xl text-xl mt-8">Create a post</h1>
      <div className="w-full flex flex-col space-y-4 mt-4">
        <Input
          type="text"
          placeholder="Enter title"
          className="px-4 py-2 outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* IMAGE */}
        <div className="w-full relative">
          {/* delete preview button */}
          {preview && (
            <>
              <div
                className="absolute -top-3 -right-3 p-1 bg-red-400 cursor-pointer 
            rounded-full hover:bg-red-800/70 z-50"
                onClick={setPreview.bind(null, undefined)}
              >
                <X size={20} className="text-white" />
              </div>
            </>
          )}
          <Input
            type="file"
            accept="image/*"
            id="file"
            onChange={handleFileChange}
            className="hidden"
            ref={filePicekerRef}
          />
          <Label
            htmlFor="file"
            className={`w-full min-h-[20vh] border-[#00000026] p-3 border flex
            items-center justify-center ${
              dragging ? "bg-blue-500" : "bg-transparent"
            } `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {preview ? (
              <>
                <img
                  src={preview}
                  alt="Company's logo"
                  className="max-h-full max-w-full object-contain"
                />
              </>
            ) : (
              <span className="text-black">
                Drag 'n' drop your image here, or click to select file
              </span>
            )}
          </Label>
        </div>

        {/* DESCRIPTION */}
        <Label className="text-md">Post description:</Label>
        <Textarea
          className="px-4 py-2 w-full outline-none"
          placeholder="Enter post description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {/* Tags */}
        <div className="flex items-center space-x-4 md:space-x-8">
          <Input
            type="test"
            className="px-4 py-2 w-full outline-none"
            placeholder="Enter tag..."
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddTag();
              }
            }}
          />
          <Button className="px-4 py-2" onClick={handleAddTag}>
            Add tag
          </Button>
        </div>
        {/* Display tags */}
        <div className="flex space-x-4 flex-wrap space-y-2">
          {/* items */}
          {tags.map((tag: string, index: number) => (
            <Badge
              key={index}
              className="bg-gray-300 rounded-lg px-6 py-2 text-gray-700 text-xl cursor-pointer hover:bg-gray-400 relative"
            >
              {tag}
              <div
                className="absolute -top-2 -right-2 bg-red-500 rounded-full hover:bg-red-400"
                onClick={() => handleDeleteTag(index)}
              >
                <X className="h-4 w-4 text-white" />
              </div>
            </Badge>
          ))}
        </div>
        {/* Submit */}
        <Button
          className="bg-black text-white px-4 py-2"
          onClick={handleCreatePost}
        >
          Create post
        </Button>
      </div>
    </div>
  );
};

export default CreatePostPage;
