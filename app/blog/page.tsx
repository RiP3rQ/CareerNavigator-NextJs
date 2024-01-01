import React from "react";
import BlogPost from "./__components/BlogPost";
import SearchBar from "./__components/SearchBar";

type Props = {};

const BlogPage = (props: Props) => {
  return (
    <div className="max-w-7xl mx-4 lg:mx-auto">
      <div className="w-full flex items-center justify-center my-4">
        <SearchBar />
      </div>
      <BlogPost />
      <BlogPost />
      <BlogPost />
      <BlogPost />
      <BlogPost />
      <BlogPost />
      <BlogPost />
      <BlogPost />
    </div>
  );
};

export default BlogPage;
