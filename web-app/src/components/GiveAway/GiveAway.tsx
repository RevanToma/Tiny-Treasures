import { useState, useRef, FormEvent } from "react";
import { useCreateNewPost } from "../../api/requests";
import Box from "../common/Box/Box";
import { ButtonType } from "../common/Button/button.types";
import SelectInput from "../common/select-input/SelectInput.component";
import Button from "../common/Button/Button.component";
import { ages, clothes, mainCategories, other, sizes, toys } from "../../types";
const GiveAway = () => {
  const mutation = useCreateNewPost();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [numItems, setNumItems] = useState("");
  const [category, setCategory] = useState("");
  const [size, setSize] = useState("");
  const [condition, setCondition] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const createPost = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!fileInputRef.current?.files) return;

    const form = new FormData();
    Array.from(fileInputRef.current.files).forEach((file) => {
      form.append("photos", file);
    });
    form.append("title", title);
    form.append("description", description);
    form.append("itemCount", numItems);
    form.append("categories", category);
    form.append("size", size);
    form.append("condition", condition);

    mutation.mutate(form);
  };

  return (
    <div>
      <form onSubmit={createPost}>
        <label htmlFor="tile">Title:</label>
        <input
          onChange={(e) => setTitle(e.target.value)}
          name="tile"
          type="text"
          required
        />
        <label htmlFor="description">Description:</label>
        <input
          onChange={(e) => setDescription(e.target.value)}
          name="description"
          type="text"
        />
        <label htmlFor="item-count">Number of articles:</label>
        <input
          onChange={(e) => setNumItems(e.target.value)}
          name="item-count"
          type="number"
          required
          min={0}
          max={10}
        />
        <label htmlFor="categories">Category:</label>
        <select onChange={(e) => setCategory(e.target.value)} name="categories">
          <option value="">Choose an option...</option>
          {mainCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {category === "Clothes" && (
          <>
            <label htmlFor="clothes">type:</label>
            <select
              onChange={(e) => setSize(e.target.value)}
              name="clothes"
              required
            >
              <option value="">Choose an option...</option>
              {clothes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </>
        )}
        {category === "Toys" && (
          <>
            <label htmlFor="toys">type:</label>
            <select
              onChange={(e) => setSize(e.target.value)}
              name="toys"
              required
            >
              <option value="">Choose an option...</option>
              {toys.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </>
        )}
        {category === "Other" && (
          <>
            <label htmlFor="other">type:</label>
            <select
              onChange={(e) => setSize(e.target.value)}
              name="other"
              required
            >
              <option value="">Choose an option...</option>
              {other.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </>
        )}

        {category === "Clothes" && (
          <>
            <label htmlFor="size">Size:</label>
            <select
              onChange={(e) => setSize(e.target.value)}
              name="size"
              required
            >
              <option value="">Choose an option...</option>
              {sizes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </>
        )}
        {category !== "Clothes" && (
          <>
            <label htmlFor="age">Age:</label>
            <select
              onChange={(e) => setSize(e.target.value)}
              name="age"
              required
            >
              <option value="">Choose an option...</option>

              {ages.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </>
        )}
        <label htmlFor="condition">Condition:</label>
        <select onChange={(e) => setCondition(e.target.value)} name="condition">
          <option value="">Choose an option...</option>

          <option value="used">Used</option>
          <option value="good">Good</option>
          <option value="new">New</option>
        </select>

        <input ref={fileInputRef} type="file" multiple />
        <button>Create</button>
      </form>
    </div>
  );
};

export default GiveAway;
