import { MessageContainer } from './Message.styled';
import PropTypes from 'prop-types';

const Message = ({ submitValue, isLoading, error }) => {
  if (isLoading) {
    return;
  }
  if (submitValue !== '') {
    return (
      <MessageContainer>
        Unfortunately, we did not find anything for your request ~{submitValue}
        ~. Try again!
      </MessageContainer>
    );
  }
  if (error) {
    return <MessageContainer>{error}</MessageContainer>;
  }
  return <MessageContainer>Fill in the search field</MessageContainer>;
};

export default Message;

Message.propTypes = {
  submitValue: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};
