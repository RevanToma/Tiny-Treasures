import { useSelector } from "react-redux";
import { selectIsSignedIn } from "../../store/user/userSelectors";
import SignIn from "../signIn/signIn.component";

const Home = () => {
  const userSignedIn = useSelector(selectIsSignedIn);

  if (!userSignedIn) {
    return <SignIn />;
  }

  return (
    <div>
      <h2>HOME</h2>
    </div>
  );
};

export default Home;
