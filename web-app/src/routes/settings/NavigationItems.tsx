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
        padding="1rem"
      >
        {icon && (
          <Box alignItems="center" flexDirection="row">
            {icon}
          </Box>
        )}
              {text}

        <Box flexDirection="row" alignItems="center">
          {children}
        </Box>
        {showArrow && <IoMdArrowDropright color="black" size={29}/>}
      </Box>
    </Button>
  );
};

export default NavigationItem;
