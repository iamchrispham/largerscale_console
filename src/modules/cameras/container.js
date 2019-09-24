import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Spinner, Modal, ModalHeader } from 'reactstrap';

import DashboardTemplate from '../../shared/templates/dashboardTemplate';
import CameraPreview from '../../shared/molecules/cameraPreview';
import AddCamera from '../../shared/molecules/addCamera';
import { getCameras } from '../../shared/services/camera';
import ErrorContext from '../../shared/modules/error/context';
import AddEditCamera from './addEdit';

const CameraSetup = () => {
  const [state, setState] = useState({
    isLoading: false,
    cameras: [],
    reset: 0,
  });

  const [modalState, setModalState] = useState({
    camera: undefined,
    loading: false,
    visible: false,
  });

  function toggle() {
    setModalState({
      ...modalState,
      visible: !modalState.visible,
    });
  }

  const errorContext = useContext(ErrorContext);

  useEffect(() => {
    setState(s => ({
      ...s,
      isLoading: true,
    }));
    async function fetchCameras() {
      try {
        const cameras = await getCameras();
        setState(s => ({ ...s, cameras, isLoading: false }));
      } catch (e) {
        errorContext.setError(e, true);
      }
    }

    fetchCameras();
  }, [state.reset, setState, errorContext]);

  return (
    <DashboardTemplate>
      {state.isLoading ? (
        <div style={{ textAlign: 'center' }}>
          <Spinner type="grow" color="primary" />
        </div>
      ) : (
        <Row>
          {state.cameras.map(camera => (
            <Col md="2" key={camera._id}>
              <CameraPreview camera={camera} />
            </Col>
          ))}
          <Col md="2">
            <AddCamera onClick={() => toggle()} />
          </Col>
        </Row>
      )}
      <Modal isOpen={modalState.visible} toggle={toggle} style={{ maxWidth: '850px' }}>
        <ModalHeader toggle={toggle}>{modalState.camera && modalState.camera._id ? 'Edit' : 'Add'} Camera</ModalHeader>
        <AddEditCamera
          addCamera={(values, cb) => {
            console.log(values);
            cb();
          }}
        />
      </Modal>
    </DashboardTemplate>
  );
};

CameraSetup.defaultProps = {
  name: 'Camera-1',
  type: 'preview',
  ip: '123.432.4332.2',
};

export default CameraSetup;
