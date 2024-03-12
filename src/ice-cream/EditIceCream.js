import PropTypes from 'prop-types';
import LoaderMessage from '../structure/LoaderMessage';
import IceCream from './IceCream';
import Main from '../structure/Main';
import {
  useDeleteMenuItemMutation,
  useFetchMenuItemQuery,
  usePutMenuItemMutation,
} from '../store';

const EditIceCream = ({ match, history }) => {
  const { data, error, isFetching } = useFetchMenuItemQuery(
    match.params.menuItemId
  );
  const [putMenuItem] = usePutMenuItemMutation();
  const [deleteMenuItem] = useDeleteMenuItemMutation();

  const onSubmitHandler = async updatedItem => {
    await putMenuItem({ id: data.id, ...updatedItem });
    history.push('/', { focus: true });
  };

  const onDeleteHandler = async () => {
    await deleteMenuItem(match.params.menuItemId);
    history.replace('/', { focus: true });
  };

  if (error) {
    history.replace('/', { focus: true });
    return null;
  }
  return (
    <Main headingText="Update this beauty">
      <LoaderMessage
        loadingMessage="Loading ice cream"
        doneMessage="Ice cream loaded."
        isLoading={isFetching}
      />
      {!isFetching && (
        <IceCream
          {...data}
          onDelete={onDeleteHandler}
          onSubmit={onSubmitHandler}
        />
      )}
    </Main>
  );
};

EditIceCream.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object.isRequired,
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
  }),
};

export default EditIceCream;
