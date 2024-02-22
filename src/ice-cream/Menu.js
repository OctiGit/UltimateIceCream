// import React, { useEffect, useState } from 'react';
// import { getMenu } from '../data/iceCreamData';
import LoaderMessage from '../structure/LoaderMessage';
import Main from '../structure/Main';
import IceCreamCard from './IceCreamCard';
import IceCreamCardContainer from './IceCreamCardContainer';
import PropTypes from 'prop-types';
import { useFetchMenuQuery } from '../store';

const Menu = ({ history }) => {
  const { data, error, isFetching } = useFetchMenuQuery();
  // const [menu, setMenu] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   let isMounted = true;
  //   const fetchData = async () => {
  //     const menuData = await getMenu();
  //     if (isMounted) {
  //       setMenu(menuData);
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchData();
  //   return () => {
  //     isMounted = false;
  //   };
  //   }, []);

  return (
    <Main headingText="Rock your taste buds with one of these!">
      <LoaderMessage
        loadingMessage="Loading menu"
        // isLoading={true}
        isLoading={isFetching}
        doneMessage="Loading menu complete."
      />
      {!isFetching &&
        // {menu.length > 0 ? (
        (data.length > 0 ? (
          <IceCreamCardContainer>
            {/* {menu.map( */}
            {data.map(
              ({ id, iceCream, inStock, quantity, price, description }) => (
                <IceCreamCard
                  key={id.toString()}
                  iceCreamId={iceCream.id}
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
          // !isLoading && <p>Your menu is empty! The sadness!!</p>
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
