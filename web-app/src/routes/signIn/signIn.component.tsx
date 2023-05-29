import { signInUser } from "../../store/user/userSlice";
import { useState } from "react";
import { useAppDispatch } from "../../hooks/useDispatch";

import Logo from "../../assets/logo.svg";
import Input from "../../components/common/Input/input.component";
import { InputType } from "../../components/common/Input/input.types";
import Box from "../../components/common/Box/Box";
import Button from "../../components/common/Button/Button.component";

import * as S from "./signIn.styles";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { SignUpFooter } from "../signUp/SignUp.styles";
import { ButtonType } from "../../components/common/Button/button.types";
import Spinner from "../../components/common/spinner/spinner.component";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const signIn = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!password) {
      alert("Please type in your Password");
      return;
    }
    if (!email) {
      alert("Please type in your Email");
      return;
    }
    setIsLoading(true);
    const action = await dispatch(signInUser({ email, password }));

    if (signInUser.rejected.match(action)) {
      setIsLoading(false);
      alert("Sign-in failed. Please check your credentials.");
      return;
    }

    navigate("/");
  };
  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <Box width="80%" margin="auto" gap="3rem">
          <img src={Logo} alt="Tiny Treasures Logo" />
          <S.TextContainer>
            <p>Log in or create an account to exchange items for free.</p>
          </S.TextContainer>
          <S.TextContainer>
            <h5>Log in</h5>
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
              <a>Forgot your aassword?</a>
            </S.TextContainer>
            <Box gap="2rem">
              <Button buttonType={ButtonType.SignIn}>Sign In</Button>
              <Button
                buttonType={ButtonType.Primary}
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </Button>
              <p>or</p>
            </Box>
          </form>
          <a href="http://127.0.0.1:8000/auth/google">
            <S.GoogleButton buttonType={ButtonType.Google}>
              <FcGoogle size={32} />
              Continue with Google
            </S.GoogleButton>
          </a>
          <SignUpFooter>
            <span>Support</span>
            <span>How it Works</span>
            <span>Reviews</span>
          </SignUpFooter>
        </Box>
      )}
    </div>
  );
};
export default SignIn;
