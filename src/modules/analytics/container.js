import React from 'react';
import { Row, Col } from 'reactstrap';

import DashboardTemplate from '../../shared/templates/dashboardTemplate';
import Card from '../../shared/molecules/card';

const CameraSetup = () => {
  return (
    <DashboardTemplate>
      <Row>
        <Col>
          <Card header="Berlin Fairground">Analytics goes here</Card>
        </Col>
      </Row>
    </DashboardTemplate>
  );
};

export default CameraSetup;
