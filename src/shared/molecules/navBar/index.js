import React from 'react';
import { Alert, Button, Badge, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';

import { AuthContextConsumer } from '../../../modules/auth/authContext';

import './styles.scss';
import { isAdmin, isClient, isGod } from '../../services/role';
import SitesContext from '../../modules/sitesContext/context';

const Navigation = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  let user = localStorage.getItem('user') || {};
  if (user) {
    user = JSON.parse(user);
  }
  const role = user.role || {};

  function renderMainNav(selectedSite) {
    return (
      <Nav className="mr-auto" navbar>
        {isClient() && (
          <NavItem className="dar-navbar__item">
            <NavLink to="/console/home" activeClassName="link-active">
              Site
            </NavLink>
          </NavItem>
        )}
        {isClient() && selectedSite && (
          <NavItem className="dar-navbar__item">
            <NavLink to="/console/site" activeClassName="link-active">
              {selectedSite.name}
            </NavLink>
          </NavItem>
        )}
        {isClient() && (
          <NavItem className="dar-navbar__item">
            <NavLink to="/console/cameras" activeClassName="link-active">
              Cameras
            </NavLink>
          </NavItem>
        )}
        {isClient() && (
          <NavItem className="dar-navbar__item">
            <NavLink to="/console/explore" activeClassName="link-active">
              Explore
            </NavLink>
          </NavItem>
        )}
        {isClient() && (
          <NavItem className="dar-navbar__item">
            <NavLink to="/console/analytics" activeClassName="link-active">
              Analytics
            </NavLink>
          </NavItem>
        )}
        {(isGod() || isAdmin()) && (
          <NavItem className="dar-navbar__item">
            <NavLink to="/console/admin/users" activeClassName="link-active">
              Admin
            </NavLink>
          </NavItem>
        )}
      </Nav>
    );
  }

  function renderEmptyNav() {
    if (isClient()) {
      return (
        <Nav className="mr-auto" navbar>
          <Alert color="info" style={{ marginBottom: '0', padding: '0.45rem 1.25rem 0.3rem' }}>
            Select a site to move ahead
          </Alert>
        </Nav>
      );
    }

    return null;
  }

  return (
    <div className="dar-navbar">
      <Navbar className="container" color="faded" expand="md">
        <NavbarBrand href="/" className="mr-auto">
          <img className="dar-navbar__logo" src="/images/logo-full.png" alt="Darvis" />
        </NavbarBrand>
        <NavbarToggler onClick={() => setCollapsed(!collapsed)} />
        <Collapse isOpen={collapsed} navbar>
          <SitesContext.Consumer>
            {props => {
              const { selectedSite } = props;
              return <React.Fragment>{selectedSite ? renderMainNav(selectedSite) : renderEmptyNav()}</React.Fragment>;
            }}
          </SitesContext.Consumer>

          <span className="info">
            Hi &nbsp;
            <b>
              {user.name}
              &nbsp;
            </b>
            <Badge style={{ padding: '5px 4px 4px 4px' }} color="dark">
              {role.name}
            </Badge>
          </span>
          <AuthContextConsumer>
            {({ logout }) => (
              <Button outline size="sm" color="dark" type="submit" onClick={() => logout()}>
                logout
              </Button>
            )}
          </AuthContextConsumer>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Navigation;
