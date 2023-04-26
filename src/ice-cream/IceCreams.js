import React, { useEffect, useState } from 'react';
import Main from '../structure/Main';
import LoaderMessage from '../structure/LoaderMessage';
import { getIceCreams } from '../data/iceCreamData';
import IceCreamCardContainer from './IceCreamCardContainer';
import IceCreamCard from './IceCreamCard';
import PropTypes from 'prop-types';

const IceCreams = ({ history }) => {
  const [iceCreams, setIceCreams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    getIceCreams().then(iceCreams => {
      if (isMounted) {
        setIceCreams(iceCreams);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  console.log(iceCreams);

  return (
    <Main headingText="Choose your poison and enjoy!">
      <LoaderMessage
        loadingMessage="Loading the stock list"
        doneMessage="Loading stock list complete"
        isLoading={isLoading}
      />
      {iceCreams.length > 0 ? (
        <IceCreamCardContainer>
          {iceCreams.map(({ id, name }) => (
            <IceCreamCard
              key={id.toString()}
              iceCreamId={id}
              heading={name}
              to={{
                pathname: '/menu-items/add',
                search: `?iceCreamId=${id.toString()}`,
              }}
              history={history}
            />
          ))}
        </IceCreamCardContainer>
      ) : (
        !isLoading && (
          <p className="fully-stocked">Your menu is fully stocked!</p>
        )
      )}
    </Main>
  );
};

IceCreams.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

export default IceCreams;
