import { useState, useRef, FormEvent } from "react";
import { useCreateNewPost } from "../../api/requests";
import SelectInput from "../common/select-input/SelectInput.component";
import { ages, clothes, mainCategories, other, sizes, toys } from "../../types";
import Input from "../common/Input/input.component";
import { InputType } from "../common/Input/input.types";
import Box from "../common/Box/Box";
import LeftOrRightCarett from "../common/leftCarett/LeftOrRightCarett";
import { useNavigate } from "react-router-dom";
import * as S from "./GiveAway.styles";
import Button from "../common/Button/Button.component";
import { ButtonType } from "../common/Button/button.types";
const GiveAway = () => {
  const mutation = useCreateNewPost();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [numItems, setNumItems] = useState("");
  const [category, setCategory] = useState("");
  const [size, setSize] = useState("");
  const [condition, setCondition] = useState("");
  const navigate = useNavigate();

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
    <S.GiveAwayContainer>
      <h2>Uppload Item</h2>

      <S.GiveAwayForm onSubmit={createPost}>
        <input ref={fileInputRef} type="file" multiple />

        <Input
          onChange={(e) => setTitle(e.target.value)}
          name="title"
          required
          placeholder="Title"
          type={InputType.text}
        />
        <S.GiveAwayDescription
          placeholder="Item description"
          onChange={(e) => setDescription(e.target.value)}
        ></S.GiveAwayDescription>

        <Input
          onChange={(e) => setNumItems(e.target.value)}
          name="item-count"
          type={InputType.text}
          required
          min={0}
          max={10}
          placeholder="Number of articles"
        />

        <SelectInput
          handleSelect={(value) => setCategory(value)}
          optionsArray={mainCategories}
          initialValue=""
          label="Categories"
        />
        {category === "Clothes" && (
          <>
            <SelectInput
              handleSelect={(value) => setSize(value)}
              optionsArray={clothes}
              initialValue=""
              label="clothes"
              required
            />
          </>
        )}
        {category === "Toys" && (
          <>
            <SelectInput
              handleSelect={(value) => setSize(value)}
              optionsArray={toys}
              initialValue=""
              label="Toys"
              required
            />
          </>
        )}
        {category === "Other" && (
          <>
            <SelectInput
              handleSelect={(value) => setSize(value)}
              optionsArray={other}
              initialValue=""
              label="Other"
              required
            />
          </>
        )}
        {category === "Clothes" && (
          <>
            <SelectInput
              handleSelect={(value) => setSize(value)}
              optionsArray={sizes}
              initialValue=""
              label="Size"
              required
            />
          </>
        )}
        {category !== "Clothes" && (
          <>
            <SelectInput
              handleSelect={(value) => setSize(value)}
              optionsArray={ages}
              initialValue=""
              label="Age"
              required
            />
          </>
        )}

        <SelectInput
          handleSelect={(value) => setCondition(value)}
          optionsArray={["Used", "Good", "New"]}
          initialValue=""
          label="Condition"
          required
        />

        <Button
          buttonType={ButtonType.Review}
          // onClick={() => navigate("/review")}
        >
          Review
        </Button>
      </S.GiveAwayForm>
    </S.GiveAwayContainer>
  );
};

export default GiveAway;
