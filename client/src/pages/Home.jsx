import React, { useEffect } from 'react';
import { getAllBlogs } from '../features/blog/blogSlice';
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBlogs());
  }, []);

  const blogstate = useSelector((state) => state);
  const { allBlogs, isLoading, isError, isSuccess } = blogstate.blog;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-4 text-center">
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error occurred while fetching blogs.</div>
      ) : allBlogs && allBlogs.blogs.length > 0 ? (
        allBlogs.blogs.map((blog, index) => (
          <div key={index} className="blog-container bg-[#393939] p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
            {blog.imageUrl && <img src={blog.imageUrl} alt={blog.title} className="mb-2 rounded-md" />}
            <p className="mb-4">{blog.shortDescription}</p>
            <div className="overflow-y-auto max-h-32">{blog.fullBlogDetail}</div>
            <button className="w-full flex justify-center py-2 px-4 text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600">Read</button>
          </div>
        ))
      ) : (
        <div>No blogs found.</div>
      )}
    </div>
  );
};

export default Home;
