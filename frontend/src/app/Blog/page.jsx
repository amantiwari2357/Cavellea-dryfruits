"use client";
import { useState } from "react";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "Welcome to Our Blog!",
      content: "Stay updated with the latest trends in tech, lifestyle, and more.",
      date: new Date().toDateString(),
    },
  ]);

  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [editingBlog, setEditingBlog] = useState(null);

  // Add a new blog post
  const addBlogPost = () => {
    if (!newTitle.trim() || !newContent.trim()) return;

    if (editingBlog) {
      // Edit existing blog
      setBlogs(
        blogs.map((blog) =>
          blog.id === editingBlog.id
            ? { ...blog, title: newTitle, content: newContent }
            : blog
        )
      );
      setEditingBlog(null);
    } else {
      // Add new blog
      const newPost = {
        id: blogs.length + 1,
        title: newTitle,
        content: newContent,
        date: new Date().toDateString(),
      };
      setBlogs([newPost, ...blogs]);
    }

    setNewTitle("");
    setNewContent("");
  };

  // Edit a blog
  const editBlogPost = (blog) => {
    setEditingBlog(blog);
    setNewTitle(blog.title);
    setNewContent(blog.content);
  };

  // Delete a blog
  const deleteBlogPost = (id) => {
    setBlogs(blogs.filter((blog) => blog.id !== id));
  };

  return (
    <main className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <h1 className="text-4xl font-bold text-center text-blue-700">📝 Our Blog</h1>
      <p className="text-center text-gray-600 mt-2">
        Share insights, news, and updates with your audience.
      </p>

      {/* Blog Form */}
      <section className="mt-6 p-6 bg-gray-100 rounded-lg shadow">
        <h2 className="text-2xl font-semibold text-gray-800">
          {editingBlog ? "Edit Blog Post" : "Add a New Blog Post"}
        </h2>
        <input
          type="text"
          className="w-full p-2 mt-3 border rounded-md focus:outline-blue-500"
          placeholder="Blog Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <textarea
          className="w-full p-2 mt-3 border rounded-md focus:outline-blue-500 h-32"
          placeholder="Write your content here..."
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
        />
        <button
          onClick={addBlogPost}
          className={`mt-3 px-6 py-2 rounded-md text-white transition ${
            editingBlog ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {editingBlog ? "Update Blog" : "Add Blog"}
        </button>
        {editingBlog && (
          <button
            onClick={() => {
              setEditingBlog(null);
              setNewTitle("");
              setNewContent("");
            }}
            className="ml-3 px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        )}
      </section>

      {/* Blog Posts List */}
      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800">Latest Blogs</h2>
        <div className="mt-4 space-y-4">
          {blogs.length === 0 ? (
            <p className="text-gray-500">No blogs added yet.</p>
          ) : (
            blogs.map((blog) => (
              <div key={blog.id} className="p-4 border rounded-lg shadow-sm bg-white">
                <h3 className="text-xl font-bold">{blog.title}</h3>
                <p className="text-gray-600 text-sm">{blog.date}</p>
                <p className="text-gray-700 mt-2">{blog.content}</p>
                <div className="mt-3 flex space-x-3">
                  <button
                    onClick={() => editBlogPost(blog)}
                    className="px-4 py-2 text-sm bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => deleteBlogPost(blog.id)}
                    className="px-4 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
