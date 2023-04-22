import { ButtonLoadMore } from './Button.styled';
import PropTypes from 'prop-types';

const Button = ({ onClick, isloading }) => {
  return (
    <ButtonLoadMore
      type="button"
      onClick={() => onClick()}
      disabled={isloading}
    >
      Load More
    </ButtonLoadMore>
  );
};
export default Button;

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  isloading: PropTypes.bool.isRequired,
};
