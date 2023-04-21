import { ButtonLoadMore } from './Button.styled';

const Button = ({ onClick }) => {
  return (
    <ButtonLoadMore type="button" onClick={() => onClick()}>
      Load More
    </ButtonLoadMore>
  );
};
export default Button;
