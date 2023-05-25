import Button from "../../components/common/Button/Button.component";
import Box from "../../components/common/Box/Box";
import { ButtonType } from "../../components/common/Button/button.types";
import { IoMdArrowDropright } from "react-icons/io";

interface NavigationItemProps {
  children?: React.ReactNode;

  text?: string;
  icon?: React.ReactNode;
  onClick: () => void;
  showArrow?: boolean;
}

const NavigationItem = ({
  children,
  text,
  icon,
  onClick,
  showArrow = true,
}: NavigationItemProps) => {
  return (
    <Button buttonType={ButtonType.Google} onClick={onClick}>
      <Box
        flexDirection="row"
        justifyContent="space-between"
        gap="1rem"
        padding="0rem 1.6rem"
      >
        {icon && (
          <Box alignItems="center" flexDirection="row">
            {icon}
          </Box>
        )}
        {text}
        {children ? <Box>{children}</Box> : ""}

        {showArrow && <IoMdArrowDropright color="#646464" size={29} />}
      </Box>
    </Button>
  );
};

export default NavigationItem;
