import { signSuccess } from "../../store/user/userSlice";
import { useState } from "react";
import { useAppDispatch } from "../../hooks/useDispatch";
import { useMutation } from "@tanstack/react-query";
import { ApiPostSignInUser } from "../../api/requests";
import { AxiosError } from "axios";
import type { IUser } from "../../types";
import Spinner from "../../components/common/spinner/spinner.component";
import Logo from "../../assets/logo.svg";
import Input from "../../components/common/Input/input.component";
import { InputType } from "../../components/common/Input/input.types";
import Box from "../../components/common/Box/Box";
import Button from "../../components/common/Button/Button.component";
import { ButtonType } from "../../components/common/Button/button.types";
import * as S from "./signIn.styles";

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
        onSuccess: (data: IUser) => {
          dispatch(signSuccess(data));
          document.cookie = `jwt=${data.token}`;
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
        <Spinner />
      ) : (
        <Box width="80%" margin="auto">
          <img src={Logo} alt="Tiny Treasures Logo" />
          <S.TextContainer>
            <Box>
              <p>Log in or create an account to exchange items for free.</p>
              <p>Log In</p>
            </Box>
          </S.TextContainer>
          <form onSubmit={signIn}>
            <Box gap="20px">
              <Input
                type={InputType.email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                type={InputType.password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>

            <S.TextContainer>
              <p>Forgot your password?</p>
            </S.TextContainer>
            <Box>
              <button>Sign In</button>

              <S.TextContainer>
                <p>or</p>
              </S.TextContainer>

              <button disabled>Continue with Google</button>
            </Box>
          </form>
        </Box>
      )}
    </div>
  );
};
export default SignIn;
