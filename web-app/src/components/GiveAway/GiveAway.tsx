import { useState } from "react";
import { CreatePostData, createPost } from "../../api/requests";
import Box from "../common/Box/Box";
import { ButtonType } from "../common/Button/button.types";
import SelectInput from "../common/select-input/SelectInput.component";
import Button from "../common/Button/Button.component";

const GiveAway = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    image: null,
  });

  const handleFileUpload = (event: any) => {
    setFormData({
      ...formData,
      image: event.target.files[0],
    });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const data = new FormData();

    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("category", formData.category);
    if (formData.image !== null) {
      data.append("image", formData.image);
    }

    const post: CreatePostData = {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      itemCount: 0,
      size: "",
      mainCategory: "",
      subCategory: "",
      image: formData.image as File | null,
    };

    try {
      const { data } = await createPost(post);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategorySelect = (option: string): void => {
    setFormData({ ...formData, category: option });
  };

  return (
    <>
      <h2>Give Away</h2>
      <Box alignItems="center" gap="2rem">
        <label>
          Image:
          <input type="file" onChange={handleFileUpload} />
        </label>
        <Box>
          <form onSubmit={handleSubmit}>
            <label>
              Title:
              <input
                type="text"
                value={formData.title}
                onChange={(event) =>
                  setFormData({ ...formData, title: event.target.value })
                }
              />
            </label>
            <label>
              Description:
              <textarea
                value={formData.description}
                onChange={(event) =>
                  setFormData({ ...formData, description: event.target.value })
                }
              />
            </label>
            <SelectInput
              optionsArray={["Clothing", "Toys", "Books"]}
              initialValue={formData.category}
              label="Category"
              handleSelect={handleCategorySelect}
            />
            <Button buttonType={ButtonType.Pending} onClick={handleSubmit}>
              Submit
            </Button>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default GiveAway;
