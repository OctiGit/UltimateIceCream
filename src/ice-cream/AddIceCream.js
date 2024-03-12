import PropTypes from 'prop-types';
import LoaderMessage from '../structure/LoaderMessage';
import IceCream from './IceCream';
import Main from '../structure/Main';
import { useFetchIceCreamQuery, usePostMenuItemMutation } from '../store';

const EditIceCream = ({ history, location }) => {
  const { data, error, isFetching } = useFetchIceCreamQuery(
    location.search.split('=')[1]
  );
  const [postMenuItem] = usePostMenuItemMutation();

  const onSubmitHandler = menuItem => {
    postMenuItem(menuItem).then(() => {
      history.push('/', { focus: true });
    });
  };

  if (error) {
    history.replace('/', { focus: true });
    return null;
  }
  return (
    <Main headingText="Add some goodness to the menu">
      <LoaderMessage
        loadingMessage="Loading ice cream"
        doneMessage="Ice cream loaded."
        isLoading={isFetching}
      />
      {!isFetching && <IceCream iceCream={data} onSubmit={onSubmitHandler} />}
    </Main>
  );
};

EditIceCream.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
  }),
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }),
};

export default EditIceCream;
