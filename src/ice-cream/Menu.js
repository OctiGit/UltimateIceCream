import LoaderMessage from '../structure/LoaderMessage';
import Main from '../structure/Main';
import IceCreamCard from './IceCreamCard';
import IceCreamCardContainer from './IceCreamCardContainer';
// import PropTypes from 'prop-types';
import { useFetchMenuQuery } from '../store';

const Menu = ({ history }) => {
  const { data, isFetching } = useFetchMenuQuery();

  return (
    <Main headingText="Rock your taste buds with one of these!">
      <LoaderMessage
        loadingMessage="Loading menu"
        isLoading={isFetching}
        doneMessage="Loading menu complete."
      />
      {!isFetching &&
        (data.length > 0 ? (
          <IceCreamCardContainer>
            {data.map(
              ({ id, iceCream, inStock, quantity, price, description }) => (
                <IceCreamCard
                  key={id.toString()}
                  imgURL={iceCream.imgURL}
                  heading={iceCream.name}
                  to={`/menu-items/${id.toString()}`}
                  history={history}
                >
                  <div className="content card-content">
                    <p className="price">{`$${price.toFixed(2)}`}</p>
                    <p className={`stock${inStock ? '' : ' out'}`}>
                      {inStock
                        ? `${quantity} in stock`
                        : 'Currently out of stock'}
                    </p>
                    <p className="description">{description}</p>
                  </div>
                </IceCreamCard>
              )
            )}
          </IceCreamCardContainer>
        ) : (
          <p>Your menu is empty! The sadness!!</p>
        ))}
    </Main>
  );
};

// Menu.propTypes = {
//   history: PropTypes.shape({
//     history: PropTypes.func.isRequired,
//   }),
// };

export default Menu;
