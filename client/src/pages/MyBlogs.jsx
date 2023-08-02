import React, { useState, useEffect } from 'react';
import { getAllBlogsByAuthor, updateBlogs, deleteBlogs, resetState } from '../features/blog/blogSlice';
import { useDispatch, useSelector } from 'react-redux';
import PageAuth from '../component/PageAuth';

const MyBlogs = () => {
    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState({});
    const [updatedBlog, setUpdatedBlog] = useState({});

    const handleUpdateClick = (blogId) => {
        const selectedBlog = allBlogsByAuthor.blogs.find(blog => blog._id === blogId);
        setSelectedBlog(selectedBlog);
        setUpdatedBlog({ ...selectedBlog });
        setIsModalOpen(true);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUpdatedBlog({ ...updatedBlog, [name]: value });
    };

    const handleSaveClick = () => {
        dispatch(updateBlogs(updatedBlog));
        setIsModalOpen(false);
    };
    const handleDeleteClick = (blogId) => {
        dispatch(deleteBlogs(blogId));
    };

    const user = useSelector((state) => state.auth.user?.user || {});
    const authorId = user?._id || '';
    useEffect(() => {
        dispatch(resetState());
        dispatch(getAllBlogsByAuthor(authorId));
    }, [authorId, dispatch]);

    const blogstate = useSelector((state) => state);
    const { allBlogsByAuthor, isLoading, isError } = blogstate.blog;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-4 text-center">
            {isLoading ? (
                <div>Loading...</div>
            ) : isError ? (
                <div>Error occurred while fetching blogs.</div>
            ) : allBlogsByAuthor && allBlogsByAuthor.blogs.length > 0 ? (
                allBlogsByAuthor.blogs.map((blog, index) => (
                    <div key={blog._id} className="blog-container bg-[#393939] p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                        {blog.imageUrl && <img src={blog.imageUrl} alt={blog.title} className="mb-2 rounded-md" />}
                        <p className="mb-4">{blog.shortDescription}</p>
                        <div className="overflow-y-auto max-h-32">{blog.fullBlogDetail}</div>
                        <button className="w-full flex justify-center py-2 px-4 mt-3 text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600">Read</button>
                        <button
                            className="w-full flex justify-center py-2 px-4 mt-3 text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600"
                            onClick={() => handleUpdateClick(blog._id)}
                        >
                            Update
                        </button>
                        <button className="w-full flex justify-center py-2 px-4 mt-3 text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600"
                            onClick={() => handleDeleteClick(blog._id)}
                        >Delete</button>
                    </div>
                ))
            ) : (
                <div>No blogs found.</div>
            )}


            {selectedBlog && isModalOpen && (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-opacity-50 bg-gray-800 flex justify-center items-center">
                    <div className="blog-container bg-white p-4 text-black rounded-lg shadow-md w-[500px]">
                        <h2 className="text-xl font-semibold mb-2">Update Blog Details</h2>
                        <input
                            type="text"
                            name="title"
                            placeholder="Enter Title"
                            value={updatedBlog.title}
                            onChange={handleInputChange}
                            className="border p-2 rounded-md mb-2 w-full"
                        />
                        <input
                            type="text"
                            name="imageUrl"
                            placeholder="Enter imageURL"
                            value={updatedBlog.imageUrl}
                            onChange={handleInputChange}
                            className="border p-2 rounded-md mb-2 w-full"
                        />
                        <input
                            type="text"
                            name="shortDescription"
                            placeholder="Enter Short Description"
                            value={updatedBlog.shortDescription}
                            onChange={handleInputChange}
                            className="border p-2 rounded-md mb-2 w-full"
                        />
                        <textarea
                            name="fullBlogDetail"
                            placeholder="Enter Full Blog Detail"
                            value={updatedBlog.fullBlogDetail}
                            onChange={handleInputChange}
                            className="border p-2 rounded-md mb-2 w-full"
                        />
                        <div className="flex justify-end">
                            <button
                                className="mr-2 px-4 py-2 bg-gray-300 rounded-md"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-orange-500 text-white rounded-md"
                                onClick={handleSaveClick}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PageAuth(MyBlogs)
