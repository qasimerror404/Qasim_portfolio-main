'use client';

import { personalData } from "@/utils/data/personal-data";
import { useEffect, useState } from "react";
import BlogCard from "../components/homepage/blog/blog-card";

function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        // Add cache-control headers to avoid different responses
        const res = await fetch(`https://dev.to/api/articles?username=${personalData.devUsername}`, {
          cache: 'force-cache'
        });
        
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        
        const data = await res.json();
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        // Set empty array on error to avoid undefined
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  return (
    <div className="py-8">
      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-2xl rounded-md">
            All Blog
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-10">Loading blogs...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 lg:gap-8 xl:gap-10">
          {blogs
            .filter(blog => blog?.cover_image)
            .map((blog, i) => (
              <BlogCard blog={blog} key={i} />
            ))}
        </div>
      )}
    </div>
  );
}

export default BlogPage;