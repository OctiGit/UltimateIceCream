import Main from '../structure/Main';
import LoaderMessage from '../structure/LoaderMessage';
import IceCreamCardContainer from './IceCreamCardContainer';
import IceCreamCard from './IceCreamCard';
import PropTypes from 'prop-types';
import { useFetchIceCreamsQuery } from '../store';

const IceCreams = ({ history }) => {
  const { data, isFetching } = useFetchIceCreamsQuery();

  return (
    <Main headingText="Choose your poison and enjoy!">
      <LoaderMessage
        loadingMessage="Loading the stock list"
        doneMessage="Loading stock list complete"
        isLoading={isFetching}
      />
      {!isFetching &&
        (data.length > 0 ? (
          <IceCreamCardContainer>
            {data.map(({ id, name, imgURL }) => (
              <IceCreamCard
                key={id.toString()}
                iceCreamId={id}
                imgURL={imgURL}
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
