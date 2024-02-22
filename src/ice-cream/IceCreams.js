// import React, { useEffect, useState } from 'react';
import Main from '../structure/Main';
import LoaderMessage from '../structure/LoaderMessage';
// import { getIceCreams } from '../data/iceCreamData';
import IceCreamCardContainer from './IceCreamCardContainer';
import IceCreamCard from './IceCreamCard';
import PropTypes from 'prop-types';
import { useFetchIceCreamsQuery } from '../store';

const IceCreams = ({ history }) => {
  const { data, error, isFetching } = useFetchIceCreamsQuery();
  // const [iceCreams, setIceCreams] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   let isMounted = true;
  //   getIceCreams().then(iceCreams => {
  //     if (isMounted) {
  //       setIceCreams(iceCreams);
  //       setIsLoading(false);
  //     }
  //   });

  //   return () => {
  //     isMounted = false;
  //   };
  //   }, []);

  return (
    <Main headingText="Choose your poison and enjoy!">
      <LoaderMessage
        loadingMessage="Loading the stock list"
        doneMessage="Loading stock list complete"
        // isLoading={isLoading}
        isLoading={isFetching}
      />
      {!isFetching &&
        // {iceCreams.length > 0 ? (
        (data.length > 0 ? (
          <IceCreamCardContainer>
            {/* {iceCreams.map(({ id, name }) => ( */}
            {data.map(({ id, name }) => (
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
          // !isLoading && (<p className="fully-stocked">Your menu is fully stocked!</p>)
          <p className="fully-stocked">Your menu is fully stocked!</p>
        ))}
    </Main>
  );
};

IceCreams.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

export default IceCreams;
