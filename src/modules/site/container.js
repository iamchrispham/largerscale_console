import React, { useState } from 'react';
import { Row, Col, Badge, Modal, ModalHeader } from 'reactstrap';

import DashboardTemplate from '../../shared/templates/dashboardTemplate';
import GreyCard from '../../shared/molecules/greyCard';
import SiteTable from '../../shared/molecules/siteTable';

import AddEditLevel from './addEditLevel';
import SitesContext from '../../shared/modules/sitesContext/context';

const SiteContainer = () => {
  const [modalState, setModalState] = useState({
    level: undefined,
    loading: false,
    visible: false,
  });

  function toggle() {
    setModalState({
      ...modalState,
      visible: !modalState.visible,
    });
  }

  return (
    <DashboardTemplate>
      <SitesContext.Consumer>
        {props => {
          const { selectedSite } = props;
          const {
            structure: { dataObjects },
          } = selectedSite;

          const levels = dataObjects[0];

          return (
            <React.Fragment>
              <Row>
                <Col md="8">
                  <Row>
                    <Col md={12}>
                      <h2 style={{ display: 'inline-block' }}>{selectedSite.name}</h2>
                      <Badge
                        style={{
                          padding: '8px 20px 7px',
                          background: 'white',
                          float: 'right',
                          textTransform: 'capitalize',
                          letterSpacing: '0.5px',
                          border: '1px solid #e6e6e6',
                        }}
                        color="light"
                      >
                        {levels.objType}
                      </Badge>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12" sm="12">
                      <SiteTable
                        levelDetails={levels.levelDetails}
                        addAoi={() => console.log('Added AOI')}
                        addLevel={() => toggle()}
                        aoiEdit={(aoiId, levelId) => console.log('Edit AOI', aoiId, levelId)}
                        aoiDelete={(aoiId, levelId) => console.log('Delete AOI', aoiId, levelId)}
                        levelEdit={levelId => console.log('Eidt Level', levelId)}
                        levelDelete={levelId => console.log('Delete Level', levelId)}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col md="3" offset="1">
                  <GreyCard online>
                    {{
                      header: (
                        <React.Fragment>
                          <span>Site:</span> Messe-Berlin
                        </React.Fragment>
                      ),
                      thead: (
                        <tr>
                          <th />
                          <th>Status</th>
                          <th>Uptime</th>
                        </tr>
                      ),
                      tbody: (
                        <React.Fragment>
                          <tr>
                            <td className="grey-card__cell--1">AI</td>
                            <td className="color--green">OK</td>
                            <td>88%</td>
                          </tr>
                          <tr>
                            <td className="grey-card__cell--1">DE</td>
                            <td className="color--green">OK</td>
                            <td>98%</td>
                          </tr>
                          <tr>
                            <td className="grey-card__cell--1">Cams</td>
                            <td className="color--green">58</td>
                            <td>65%</td>
                          </tr>
                          <tr>
                            <td className="grey-card__cell--1">License</td>
                            <td className="color--green">valid</td>
                            <td />
                          </tr>
                        </React.Fragment>
                      ),
                    }}
                  </GreyCard>
                </Col>
              </Row>
              <Modal isOpen={modalState.visible} toggle={toggle} style={{ maxWidth: '850px' }}>
                <ModalHeader toggle={toggle}>
                  {modalState.level && modalState.level._id ? 'Edit' : 'Add'} Level
                </ModalHeader>
                <AddEditLevel initialValues={modalState.level} />
              </Modal>
            </React.Fragment>
          );
        }}
      </SitesContext.Consumer>
    </DashboardTemplate>
  );
};

export default SiteContainer;
