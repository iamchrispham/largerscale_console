import React from 'react';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './styles.module.scss';

const CameraPreview = ({ camera, onClick }) => {
  return (
    <div className={styles.cameraCard}>
      <FontAwesomeIcon
        icon="circle"
        style={{ color: camera.isActive ? '#0bde0b' : 'red' }}
        className={styles.activeIcon}
      />
      <div className={styles.cameraCardBody}>
        <FontAwesomeIcon icon="video" className={styles.icon} />
      </div>
      <div className={styles.cameraCardFooter}>
        <span>{camera.name}</span>
        <Button onClick={onClick} color="default" className={styles.editButton}>
          <FontAwesomeIcon icon="pen" />
        </Button>
        {!!camera.type && <img src={`/images/${camera.type}-icon.png`} alt={camera.type} />}
      </div>
    </div>
  );
};

CameraPreview.defaultProps = {
  camera: {},
};

export default CameraPreview;
