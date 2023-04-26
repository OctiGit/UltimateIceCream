import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { getIceCream, postMenuItem } from '../data/iceCreamData';
import LoaderMessage from '../structure/LoaderMessage';
import IceCream from './IceCream';
import Main from '../structure/Main';

const EditIceCream = ({ history, location }) => {
  const isMounted = useRef(true);
  const [iceCream, setIceCream] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getIceCream(location.search.split('=')[1])
      .then(item => {
        if (isMounted.current) {
          setIceCream(item);
          setIsLoading(false);
        }
      })
      .catch(err => {
        if (err.response.status === 404 && isMounted.current) {
          history.replace('/', { focus: true });
        }
      });
  }, [history, location.search]);

  const onSubmitHandler = menuItem => {
    postMenuItem(menuItem).then(() => {
      history.push('/', { focus: true });
    });
  };

  return (
    <Main headingText="Add some goodness to the menu">
      <LoaderMessage
        loadingMessage="Loading ice cream"
        doneMessage="Ice cream loaded."
        isLoading={isLoading}
      />
      {!isLoading && (
        <IceCream iceCream={iceCream} onSubmit={onSubmitHandler} />
      )}
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
