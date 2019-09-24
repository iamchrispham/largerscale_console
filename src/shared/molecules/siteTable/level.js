import React from 'react';
import { Col, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import HrDivider from '../../atoms/hrDivider';
import styles from './styles.module.scss';

const LevelField = ({ levels, deleteLevel, editLevel }) => {
  const renderNewAOI = () => (
    <Row style={{ padding: '5px 30px' }}>
      <Col>
        <button className={styles.blue} type="button" onClick={() => console.log('add aoi')}>
          <FontAwesomeIcon size="1x" icon="plus-circle" />
          <span className="pl-1">Add new AOI in this level</span>
        </button>
      </Col>
    </Row>
  );

  const renderAOI = level => {
    if (level && level.zones && level.zones.length) {
      return (
        <React.Fragment>
          <Row style={{ padding: '5px 30px' }}>
            {level.zones.map(zone => (
              <Col key={zone.name}>
                {zone.name}
                <span
                  style={{
                    float: 'none',
                    marginLeft: '20px',
                  }}
                >
                  <button className={`${styles.blue} pr-2`} type="button" onClick={() => console.log(zone)}>
                    <FontAwesomeIcon size="sm" icon="pen" />
                  </button>
                  <button className={`${styles.times}`} type="button" onClick={() => console.log(zone)}>
                    <FontAwesomeIcon size="sm" icon="times" />
                  </button>
                </span>
              </Col>
            ))}
          </Row>
          {renderAOI()}
        </React.Fragment>
      );
    }
    return renderNewAOI();
  };

  return (
    <React.Fragment>
      {levels && levels.length ? (
        levels.map(level => (
          <React.Fragment key={level.name + level.level}>
            <Row>
              <Col sm={12}>
                <HrDivider bold={false} color="#72a7e0" />
              </Col>
            </Row>
            <Row style={{ margin: '0' }}>
              <Col sm={5} className={`${styles.level}  pt-2 pb-2`}>
                {level.name}
              </Col>
              <Col sm={3} className={`${styles.level}  pt-2 pb-2`}>
                {level.levelType}
              </Col>
              <Col sm={4} className={`${styles.level}  pt-2 pb-2`}>
                {level.zones.length}
                <span className={styles.levelIcons}>
                  <button className={`${styles.blue} pr-3`} type="button" onClick={() => editLevel(level)}>
                    <FontAwesomeIcon size="sm" icon="pen" />
                  </button>
                  <button className={`${styles.times}`} type="button" onClick={() => deleteLevel(level)}>
                    <FontAwesomeIcon size="sm" icon="times" />
                  </button>
                </span>
              </Col>
            </Row>
            {renderAOI(level)}
          </React.Fragment>
        ))
      ) : (
        <React.Fragment>
          <Row>
            <Col sm={12}>
              <HrDivider bold={false} color="#72a7e0" />
            </Col>
          </Row>
          <div>No Levels Found</div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default LevelField;
