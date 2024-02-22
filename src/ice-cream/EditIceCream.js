import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
// import { deleteMenuItem, getMenuItem, putMenuItem } from '../data/iceCreamData';
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
  // const isMounted = useRef(true);
  // const [menuItem, setMenuItem] = useState({});
  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   return () => {
  //     isMounted.current = false;
  //   };
  // }, []);

  // useEffect(() => {
  //   setIsLoading(true);
  //   getMenuItem(match.params.menuItemId)
  //     .then(item => {
  //       if (isMounted.current) {
  //         setMenuItem(item);
  //         setIsLoading(false);
  //       }
  //     })
  //     .catch(err => {
  //       if (err.response.status === 404 && isMounted.current) {
  //         history.replace('/', { focus: true });
  //       }
  //     });
  // }, [match.params.menuItemId, history]);

  const onSubmitHandler = async updatedItem => {
    // await putMenuItem({ id: menuItem.id, ...updatedItem });
    const response = await putMenuItem({ id: data.id, ...updatedItem });
    console.log(response);
    // .then(() => {
    history.push('/', { focus: true });
    // });
  };

  const onDeleteHandler = () => {
    deleteMenuItem(match.params.menuItemId).then(() => {
      history.replace('/', { focus: true });
    });
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
        // isLoading={isLoading}
        isLoading={isFetching}
      />
      {!isFetching && console.log(data)}
      {!isFetching && (
        <IceCream
          // {...menuItem}
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
