import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { ModalContextProvider } from './context';

import styles from './styles.module.scss';

const AddCamModal = ({ title, children, visible, toggle, primaryAction, primaryText, size, parentClass, centered }) => {
  const initialState = {};
  const [modalState, setModalState] = useState(initialState);

  const handlePrimaryAction = event => {
    event.preventDefault();
    primaryAction(modalState);
  };

  return (
    <Modal
      contentClassName={styles.content}
      centered={centered}
      modalClassName={parentClass}
      size={size}
      isOpen={visible}
      toggle={toggle}
    >
      <ModalContextProvider value={{ modalState, setModalState }}>
        <ModalHeader className={styles.header} toggle={toggle}>
          {title}
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter className={styles.footer}>
          <button type="button" onClick={handlePrimaryAction} className={`btn btn-primary ${styles.btn}`}>
            {primaryText}
          </button>
        </ModalFooter>
      </ModalContextProvider>
    </Modal>
  );
};

AddCamModal.propTypes = {
  title: PropTypes.string.isRequired,
  centered: PropTypes.bool,
  visible: PropTypes.bool,
  toggle: PropTypes.func.isRequired,
  primaryText: PropTypes.string.isRequired,
  primaryAction: PropTypes.func.isRequired,
  size: PropTypes.string,
  parentClass: PropTypes.string,
  defaultFilters: PropTypes.shape({}),
};

AddCamModal.defaultProps = {
  visible: false,
  parentClass: 'content',
  centered: true,
  size: 'sm',
  defaultFilters: {},
};

export default AddCamModal;
