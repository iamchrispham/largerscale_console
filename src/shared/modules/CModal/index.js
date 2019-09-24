import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Modal,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import { ModalContextProvider } from './context';
import HrDivider from '../../atoms/hrDivider';

import styles from './styles.module.scss';

const CModal = ({
  title,
  visible,
  toggle,
  primaryAction,
  primaryText,
  size,
  parentClass,
  centered,
  levels,
  onItemSelect,
  coordinates,
  type,
}) => {
  const initialState = {};
  const [modalState, setModalState] = useState(initialState);
  const [dropdownState, setDropdownState] = useState(false);

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
        <ModalBody>
          <Row>
            <Col sm={5} className={styles.mt}>
              <span className={styles.title}>{title}</span>
              {type === 'cam' && (
                <div className={` ${styles.domeCamContainer}`}>
                  <img
                    src="https://images.homedepot-static.com/productImages/de180224-447b-4b7c-8ed1-730704038c9c/svn/swann-wired-security-cameras-swnhd-886msd-64_1000.jpg"
                    alt="dome-cam"
                    className={`img-fluid ${styles.domeCam}`}
                  />
                  180 &#176; viewer for dome cams
                  <HrDivider />
                </div>
              )}
              {type === 'level' && (
                <>
                  <Form className={styles.aoiForm} inline>
                    <FormGroup className="ml-4">
                      <Col sm={3}>
                        <Label for="level" className="mr-sm-2">
                          Name:
                        </Label>
                      </Col>
                      <Col sm={9}>
                        <Input bsSize="sm" type="text" name="level" />
                      </Col>
                    </FormGroup>
                    <FormGroup className="ml-4">
                      <Col sm={3}>
                        <Label for="name" className="mr-sm-2">
                          Type:
                        </Label>
                      </Col>
                      <Col sm={9}>
                        <Input bsSize="sm" type="text" name="name" />
                      </Col>
                    </FormGroup>
                  </Form>
                  <div>
                    <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                      {({ getRootProps, getInputProps }) => (
                        <div className={styles.dragDrop}>
                          <div className={styles.dragDropIcon} {...getRootProps()}>
                            <div className={styles.dragContent}>
                              <input {...getInputProps()} />
                              <FontAwesomeIcon className={styles.icon} size="3x" icon="map-marker" />
                              <p className={styles.dropText}>
                                Simply drag & drop
                                <br /> plan/3D here
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </Dropzone>
                    <Row>
                      <Col sm={5} className="ml-4">
                        <HrDivider />
                      </Col>
                      or
                      <Col sm={5} className="pr-0">
                        <HrDivider />
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={11} className="ml-4">
                        <button
                          type="button"
                          onClick={handlePrimaryAction}
                          className={`btn btn-primary ${styles.btn} ${styles.upload}`}
                        >
                          Upload file
                        </button>
                      </Col>
                    </Row>
                  </div>
                </>
              )}
              {type === 'aoi' && (
                <>
                  <Form className={styles.aoiForm} inline>
                    <FormGroup className="ml-4">
                      <Col sm={3}>
                        <Label for="level" className="mr-sm-2">
                          Level:
                        </Label>
                      </Col>
                      <Col sm={9}>
                        <Input bsSize="sm" type="text" name="level" />
                      </Col>
                    </FormGroup>
                    <FormGroup className="ml-4">
                      <Col sm={3}>
                        <Label for="name" className="mr-sm-2">
                          Name:
                        </Label>
                      </Col>
                      <Col sm={9}>
                        <Input bsSize="sm" type="text" name="name" />
                      </Col>
                    </FormGroup>
                  </Form>
                  <div className={styles.markers}>
                    <Col sm={{ size: 11 }}>
                      <span className={styles.heading}>Put markers on map/plan</span>
                    </Col>
                    <Row>
                      <Col sm={{ size: 5, offset: 1 }}>
                        P1x: <span className="text-primary">{coordinates.p1x}</span> P1y:{' '}
                        <span className="text-primary">{coordinates.p1y}</span>{' '}
                      </Col>
                      <Col sm={6}>
                        P2x: <span className="text-primary">{coordinates.p2x}</span> P2y:{' '}
                        <span className="text-primary">{coordinates.p2y}</span>{' '}
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={{ size: 5, offset: 1 }}>
                        P3x: <span className="text-primary">{coordinates.p3x}</span> P3y:{' '}
                        <span className="text-primary">{coordinates.p3y}</span>{' '}
                      </Col>
                      <Col sm={6}>
                        P4x: <span className="text-primary">{coordinates.p4x}</span> P4y:{' '}
                        <span className="text-primary">{coordinates.p4x}</span>{' '}
                      </Col>
                    </Row>
                  </div>
                </>
              )}
            </Col>
            <Col sm={7} className={styles.mt}>
              <img className="img-fluid" src="/images/berlin_map_ground.png" alt="fairground-map" />
            </Col>
          </Row>
          {type === 'cam' && (
            <Row>
              <Col sm={5} className={styles.mt}>
                <Row>
                  <Col sm={{ size: 5, offset: 1 }}>
                    P1x: <span className="text-primary">{coordinates.p1x}</span> P1y:{' '}
                    <span className="text-primary">{coordinates.p1y}</span>{' '}
                  </Col>
                  <Col sm={6}>
                    P2x: <span className="text-primary">{coordinates.p2x}</span> P2y:{' '}
                    <span className="text-primary">{coordinates.p2y}</span>{' '}
                  </Col>
                </Row>
                <Row>
                  <Col sm={{ size: 5, offset: 1 }}>
                    P3x: <span className="text-primary">{coordinates.p3x}</span> P3y:{' '}
                    <span className="text-primary">{coordinates.p3y}</span>{' '}
                  </Col>
                  <Col sm={6}>
                    P4x: <span className="text-primary">{coordinates.p4x}</span> P4y:{' '}
                    <span className="text-primary">{coordinates.p4x}</span>{' '}
                  </Col>
                </Row>
              </Col>
              <Col sm={3} className={styles.mt}>
                <span>Assigned to:</span>
                <Dropdown
                  className={styles.dropdown}
                  isOpen={dropdownState}
                  toggle={() => setDropdownState(!dropdownState)}
                >
                  <DropdownToggle caret>Select level</DropdownToggle>
                  <DropdownMenu>
                    {levels.map((level, i) => (
                      // eslint-disable-next-line
                      <DropdownItem key={i} onClick={onItemSelect}>
                        {level}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              </Col>
              <Col sm={4} className={styles.mt}>
                <Row>
                  <Col sm={6}>
                    P1x:<span className="text-primary"> {coordinates.p1x} </span>
                    P1y:<span className="text-primary"> {coordinates.p1y} </span>
                  </Col>
                  <Col sm={6} className={styles.pl0}>
                    P2x:<span className="text-primary"> {coordinates.p2x} </span>
                    P2y:<span className="text-primary"> {coordinates.p2y} </span>
                  </Col>
                </Row>
                <Row>
                  <Col sm={6}>
                    P3x:<span className="text-primary"> {coordinates.p3x} </span>
                    P3y:<span className="text-primary"> {coordinates.p3y} </span>
                  </Col>
                  <Col sm={6} className={styles.pl0}>
                    P4x:<span className="text-primary"> {coordinates.p4x} </span>
                    P4y:<span className="text-primary"> {coordinates.p4y} </span>
                  </Col>
                </Row>
              </Col>
            </Row>
          )}
        </ModalBody>
        <ModalFooter className={`${styles.footer} ${type === 'aoi' ? styles.btnLeft : ''}`}>
          <button type="button" onClick={handlePrimaryAction} className={`btn btn-primary ${styles.btn}`}>
            {primaryText}
          </button>
        </ModalFooter>
      </ModalContextProvider>
    </Modal>
  );
};

CModal.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['cam', 'level', 'aoi']),
  centered: PropTypes.bool,
  visible: PropTypes.bool,
  toggle: PropTypes.func.isRequired,
  primaryText: PropTypes.string.isRequired,
  primaryAction: PropTypes.func.isRequired,
  size: PropTypes.string,
  parentClass: PropTypes.string,
  defaultFilters: PropTypes.shape({}),
};

CModal.defaultProps = {
  visible: false,
  type: 'aoi',
  parentClass: 'content',
  centered: true,
  size: 'sm',
  defaultFilters: {},
};

export default CModal;
