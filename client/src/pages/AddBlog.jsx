import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addBlogs } from '../features/blog/blogSlice';
import PageAuth from '../component/PageAuth';

const AddBlog = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: "",
    imageUrl: "",
    shortDescription: "",
    fullBlogDetail: "",
  });

  const { title, imageUrl, shortDescription, fullBlogDetail } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(addBlogs(formData))
  };

  const blogstate = useSelector((state) => state)
  console.log(blogstate);
  const { addedBlogs, isLoading, isError, isSuccess } = blogstate.blog

  useEffect(() => {
    if (isSuccess && addedBlogs) {
      navigate("/myblogs")
    } else {
      navigate("")
    }
  }, [addedBlogs, isLoading, isError, isSuccess, navigate])


  return (
    <div className="md:h-[82vh] h-[82vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full rounded-md space-y-8 p-10 bg-[#393939]">
        <div>
          <h2 className="text-center text-3xl font-bold text-white">
            Add Blog
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-5">
            <div>
              <label htmlFor="blog-title" className="sr-only">
                Title
              </label>
              <input
                name="title"
                type="text"
                value={title}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md sm:text-sm"
                placeholder="Enter Title of Your Story"
              />
            </div>
            <div>
              <label htmlFor="image-url" className="sr-only">
                Image Url
              </label>
              <input
                name="imageUrl"
                type="text"
                value={imageUrl}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md sm:text-sm"
                placeholder="Enter URL of Blog Image"
              />
            </div>
            <div>
              <label htmlFor="short-description" className="sr-only">
                Short Description
              </label>
              <input
                name="shortDescription"
                type="text"
                value={shortDescription}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md sm:text-sm"
                placeholder="Type short description for your Blog"
              />
            </div>
            <div>
              <textarea
                name="fullBlogDetail"
                type="text"
                value={fullBlogDetail}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md sm:text-sm"
                placeholder="Type your Blog"
                rows={6}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600"
            >
              Publish Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PageAuth(AddBlog);