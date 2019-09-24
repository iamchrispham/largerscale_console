import React, { useContext } from 'react';
import { Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import SiteContext from '../../modules/sitesContext/context';
import Card from '../card';
import LevelField from './level';
import HrDivider from '../../atoms/hrDivider';
import styles from './styles.module.scss';

const SiteTable = ({ levelDetails, addLevel, levelEdit, levelDelete }) => {
  const { loading } = useContext(SiteContext);

  return (
    <Card className="camera-system__content">
      <Row>
        <Col sm={5}>Level</Col>
        <Col sm={3}>Type</Col>
        <Col sm={4}># Sensors</Col>
      </Row>
      {loading ? (
        'Loading...'
      ) : (
        <React.Fragment>
          <LevelField levels={levelDetails} editLevel={levelEdit} deleteLevel={levelDelete} addLevel={addLevel} />
          <Row>
            <Col sm={12}>
              <HrDivider bold={false} color="#72a7e0" />
            </Col>
            <Col sm={12}>
              <button className={styles.blue} type="button" onClick={addLevel}>
                <FontAwesomeIcon size="1x" icon="plus-circle" />
                <span className="pl-1">Add new level</span>
              </button>
            </Col>
          </Row>
        </React.Fragment>
      )}
    </Card>
  );
};

SiteTable.defaultProps = {
  addAoi: () => {},
  addLevel: () => {},
};

export default SiteTable;
