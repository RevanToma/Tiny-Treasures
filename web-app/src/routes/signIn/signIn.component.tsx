import { signInWithEmailAsync } from "../../store/user/userSlice";
import { useState } from "react";
import { useAppDispatch } from "../../hooks/useDispatch";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();

  const signIn = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    await dispatch(signInWithEmailAsync({ email, password }));
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
    </div>
  );
};

export default SignIn;
