import Button from "../../components/common/Button/Button.component";
import Box from "../../components/common/Box/Box";

import { FaArrowRight } from "react-icons/fa";
import { ButtonType } from "../../components/common/Button/button.types";

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
    <Button buttonType={ButtonType.Secondary} onClick={onClick}>
      <Box
        alignItems="center"
        flexDirection="row"
        justifyContent="space-between"
      >
        <span>{text}</span>
        {icon && (
          <Box alignItems="center" flexDirection="row">
            {icon}
          </Box>
        )}
        <Box flexDirection="row" alignItems="center">
          {children}
        </Box>
        {showArrow && <FaArrowRight size={29} />}
      </Box>
    </Button>
  );
};

export default NavigationItem;
