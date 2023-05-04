import { signSuccess } from "../../store/user/userSlice";
import { useState } from "react";
import { useAppDispatch } from "../../hooks/useDispatch";
import { useMutation } from "@tanstack/react-query";
import { ApiPostSignInUser } from "../../api/requests";
import { AxiosError } from "axios";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();

  const signInWithEmailMutation = useMutation({
    mutationFn: ApiPostSignInUser,
  });

  const signIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInWithEmailMutation.mutate(
      { email, password },
      {
        onSuccess: (data) => {
          dispatch(signSuccess(data));
        },
        onError: (error) => {
          if (error instanceof AxiosError) alert(error.message);
        },
      }
    );
  };

  return (
    <div>
      {signInWithEmailMutation.isLoading ? (
        "Signing in..."
      ) : (
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
      )}
    </div>
  );
};
export default SignIn;
