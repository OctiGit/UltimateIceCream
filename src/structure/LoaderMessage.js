import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const LoaderMessage = ({ loadingMessage, isLoading, doneMessage }) => {
  const [showLoadingMessage, setShowLoadingMessage] = useState(false);
  const [showDoneMessage, setShowDoneMessage] = useState(false);
  const isLoadingPreviousMessage = useRef(null);

  useEffect(() => {
    let loadingMessageDelay;
    let doneMessageDelay;

    if (isLoading) {
      loadingMessageDelay = setTimeout(() => {
        setShowLoadingMessage(true);
      }, 400);
    } else {
      if (isLoadingPreviousMessage.current) {
        setShowDoneMessage(true);
        doneMessageDelay(() => {
          setShowDoneMessage(false);
        }, 300);
      }
    }

    return () => {
      clearTimeout(loadingMessageDelay);
      clearTimeout(doneMessageDelay);
      setShowLoadingMessage(false);
      setShowDoneMessage(false);
    };
  }, [isLoading]);
  return (
    <div aria-live="assertive" aria-atomic="true">
      {showLoadingMessage && <p className="loading">{loadingMessage}</p>}
      {showDoneMessage && <p className="visually-hiddenss">{doneMessage}</p>}
    </div>
  );
};

LoaderMessage.propTypes = {
  loadingMessage: PropTypes.string.isRequired,
  doneMessage: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
};

export default LoaderMessage;
