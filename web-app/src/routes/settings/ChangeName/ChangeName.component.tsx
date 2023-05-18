import GoBackNav from "../../../components/common/GoBackNav/GoBackNav.component";
import ChangeNameSVG from "../../../assets/changeNameSVG.svg";
import Box from "../../../components/common/Box/Box";
import Input from "../../../components/common/Input/input.component";
import Button from "../../../components/common/Button/Button.component";
import { ButtonType } from "../../../components/common/Button/button.types";
import { useState } from "react";

import { patchName } from "../../../api/requests";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
const ChangeName: React.FC = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const mutation = useMutation((newNAme: string) => patchName(newNAme), {
    onSuccess: () => {
      alert(`Successfully changed name to: ${name}`);
      navigate("/account");
    },
    onError: () => {
      console.log("error");
    },
  });

  const handleSaveName = (newName: string) => {
    if (newName.trim() === "") alert("Please fill in the name!");
    mutation.mutate(newName);
  };

  return (
    <Box gap="2.4rem">
      <GoBackNav title="Change Name" size={35} />
      <img src={ChangeNameSVG} />
      <Box height="400px" gap="3.2rem" justifyContent="center">
        <Input
          placeholder="Name"
          padding="1.3rem"
          onChange={(e) => setName(e.target.value)}
        />
        <Button
          onClick={() => handleSaveName(name)}
          buttonType={ButtonType.Primary}
          isLoading={mutation.isLoading}
        >
          save
        </Button>
      </Box>
    </Box>
  );
};

export default ChangeName;
