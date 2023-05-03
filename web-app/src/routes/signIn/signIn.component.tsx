import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signInUser } from "../../store/user/userSlice";
import { useState } from "react";
import { AppDispatch } from "../../store/store";
import { useAppDispatch } from "../../hooks/useDispatch";
const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const signIn = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    await dispatch(signInUser({ email, password }));
  };

  return (
    <div>
      <form onSubmit={signIn}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">password</label>
        <input
          type="text"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Sign in</button>
      </form>
      <button onClick={() => navigate("/")}>Home</button>
    </div>
  );
};

export default SignIn;
