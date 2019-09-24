import React from 'react';

// Modal Context
const ModalContext = React.createContext({
  setModalState: () => {},
});
export const ModalContextProvider = ModalContext.Provider;
export const ModalContextConsumer = ModalContext.Consumer;

export default ModalContext;
