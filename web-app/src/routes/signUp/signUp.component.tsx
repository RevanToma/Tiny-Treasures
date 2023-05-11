import React, { useState } from "react";

import { signSuccess } from "../../store/user/userSlice";
import { SignUpInfo } from "../../types";
import { useAppDispatch } from "../../hooks/useDispatch";
import { useMutation } from "@tanstack/react-query";
import { ApiPostSignUpUser } from "../../api/requests";
import { AxiosError } from "axios";
import Input from "../../components/common/Input/input.component";
import Button from "../../components/common/Button/Button.component";
import { ButtonType } from "../../components/common/Button/button.types";
import Logo from "../../assets/logo.svg";
import * as S from "./SignUp.styles";
import Box from "../../components/common/Box/Box";
import { InputType } from "../../components/common/Input/input.types";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
export const SignUp: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formFields, setFormFields] = useState<SignUpInfo>({
    name: "",
    email: "",
    confirmEmail: "",
    password: "",
    passwordConfirm: "",
  });

  const signUpWithEmailMutation = useMutation({
    mutationFn: ApiPostSignUpUser,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formFields.password !== formFields.passwordConfirm) {
      alert("Password does not match");
    }
    if (formFields.email !== formFields.confirmEmail) {
      alert("Emails does not match");
    }

    signUpWithEmailMutation.mutate(formFields, {
      onSuccess: (data) => {
        dispatch(signSuccess(data));
        navigate("/");
      },
      onError: (error) => {
        if (error instanceof AxiosError) alert(error.message);
      },
    });
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields((prevFields) => ({ ...prevFields, [name]: value }));
  };

  return (
    <Box alignItems="center" gap="2.4rem">
      <S.SignUpContainer>
        <img src={Logo} alt="Tiny Treasures Logo" />

        <h3>Sign Up</h3>
        {signUpWithEmailMutation.isLoading ? (
          "Signing up..."
        ) : (
          <>
            <S.SignUpForm onSubmit={handleSubmit}>
              <Input
                type={InputType.text}
                onChange={handleChange}
                placeholder="Name"
                name={InputType.name}
              />

              <Input
                type={InputType.email}
                name={InputType.confirmEmail}
                onChange={handleChange}
                placeholder="Email"
              />
              <Input
                type={InputType.email}
                name={InputType.email}
                onChange={handleChange}
                placeholder="Repeat Email"
              />
              <S.InputPassword>
                <Input
                  type={showPassword ? InputType.text : InputType.password}
                  name={InputType.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
                {showPassword ? (
                  <FaEyeSlash
                    size={25}
                    color="#AAAAAA"
                    onClick={toggleShowPassword}
                  />
                ) : (
                  <FaEye
                    size={25}
                    color="#AAAAAA"
                    onClick={toggleShowPassword}
                  />
                )}
              </S.InputPassword>
              <S.InputPassword>
                <Input
                  type={
                    showConfirmPassword ? InputType.text : InputType.password
                  }
                  name={InputType.passwordConfirm}
                  onChange={handleChange}
                  placeholder="Repeat Password"
                />
                {showConfirmPassword ? (
                  <FaEyeSlash
                    size={25}
                    color="#AAAAAA"
                    onClick={toggleShowConfirmPassword}
                  />
                ) : (
                  <FaEye
                    size={25}
                    color="#AAAAAA"
                    onClick={toggleShowConfirmPassword}
                  />
                )}
              </S.InputPassword>
              <Button buttonType={ButtonType.Primary}>Sign Up</Button>
            </S.SignUpForm>
          </>
        )}
        <S.SignUpFooter>
          <span>Support</span>
          <span>How it Works</span>
          <span>Reviews</span>
        </S.SignUpFooter>
      </S.SignUpContainer>
    </Box>
  );
};
export default SignUp;
