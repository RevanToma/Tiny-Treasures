import React, { useState } from "react";

import { signSuccess } from "../../store/user/userSlice";
import { SignUpInfo } from "../../types";
import { useAppDispatch } from "../../hooks/useDispatch";
import { useMutation } from "@tanstack/react-query";
import { ApiPostSignUpUser } from "../../api/requests";
import { AxiosError } from "axios";

export const SignUp: React.FC = () => {
  const dispatch = useAppDispatch();
  const [formFields, setFormFields] = useState<SignUpInfo>({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const signUpWithEmailMutation = useMutation({
    mutationFn: ApiPostSignUpUser,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signUpWithEmailMutation.mutate(formFields, {
      onSuccess: (data) => {
        dispatch(signSuccess(data));
      },
      onError: (error) => {
        if (error instanceof AxiosError) alert(error.message);
      },
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields((prevFields) => ({ ...prevFields, [name]: value }));
  };

  return (
    <div>
      {signUpWithEmailMutation.isLoading ? (
        "Signing up..."
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formFields.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formFields.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formFields.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input
              type="password"
              id="passwordConfirm"
              name="passwordConfirm"
              value={formFields.passwordConfirm}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
      )}
    </div>
  );
};
export default SignUp;
