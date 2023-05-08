import { SVGProps } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
interface LeftOrRightCaretProps extends SVGProps<SVGSVGElement> {
  left: boolean;
}
const LeftOrRightCarett = ({ left, ...props }: LeftOrRightCaretProps) => {
  return left ? (
    <FaArrowLeft size={29} {...props} />
  ) : (
    <FaArrowRight size={29} {...props} />
  );
};
export default LeftOrRightCarett;
