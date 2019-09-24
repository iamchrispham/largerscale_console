import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'reactstrap';

import styles from './styles.module.scss';

const AddCamera = ({ onClick }) => {
  return (
    <div className={styles.cameraCard}>
      <div className={styles.cameraCardBody}>
        <Button color="default" onClick={onClick}>
          <FontAwesomeIcon className={styles.icon} size="3x" icon="plus" />
        </Button>
      </div>
    </div>
  );
};

AddCamera.defaultProps = {
  onClick: () => {},
};

export default AddCamera;
