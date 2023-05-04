import React, { useState } from "react";

import { signUpWithEmailAsync } from "../../store/user/userSlice";
import { SignUpInfo } from "../../types";
import { useAppDispatch } from "../../hooks/useDispatch";

export const SignUp: React.FC = () => {
  const [formFields, setFormFields] = useState<SignUpInfo>({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(signUpWithEmailAsync(formFields));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields((prevFields) => ({ ...prevFields, [name]: value }));
  };

  return (
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
  );
};
export default SignUp;
