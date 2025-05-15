import { useState } from "react";
import { useAddBookMutation } from "../../../redux/bookApi";
import { useNavigate } from "react-router-dom";

const NewBook = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
    category: "",
    description: "",
  });

  const [image, setImage] = useState(null);

  const navigate = useNavigate();
  const [addBook, { isLoading }] = useAddBookMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("author", formData.author);
      data.append("price", formData.price);
      data.append("category", formData.category);
      data.append("description", formData.description);
      if (image) {
        data.append("img", image); // multer expects this field name
      }

      await addBook(data).unwrap();
      navigate("/dashboard/books");
    } catch (err) {
      console.error("Error creating book:", err);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">➕ Add New Book</h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
        encType="multipart/form-data"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          required
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          required
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          required
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        ></textarea>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {isLoading ? "Adding..." : "Add Book"}
        </button>
      </form>
    </div>
  );
};

export default NewBook;
