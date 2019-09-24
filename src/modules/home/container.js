import React, { useEffect, useState, useContext } from 'react';
import { Row, Col, Button, ModalHeader, Modal } from 'reactstrap';

import Card from '../../shared/molecules/card';
import DashboardTemplate from '../../shared/templates/dashboardTemplate';
import ErrorContext from '../../shared/modules/error/context';
import SitesPage from './sitesPage';
import AddEditSite from './addEdit';

import { getSites, addSite, updateSite, deleteSite } from '../../shared/services/sites';

const Home = () => {
  const [state, setState] = useState({
    sites: [],
    reset: 0,
    isLoading: false,
  });
  const [modalState, setModalState] = useState({
    visible: false,
    site: undefined,
  });
  const [reload, setReload] = useState(0);
  const { setError } = useContext(ErrorContext);

  useEffect(() => {
    async function fetchAllSites() {
      setState(s => ({ ...s, isLoading: true }));
      try {
        const sites = await getSites();
        setState(s => ({ ...s, sites, isLoading: false }));
      } catch (e) {
        setError(e, true);
        setState(s => ({ ...s, isLoading: false }));
      }
    }

    fetchAllSites();
  }, [setError, reload]);

  const add = async (site, callback, errorCallback) => {
    try {
      await addSite(site);
      if (callback) {
        callback();
      }
      setReload(reload + 1);
      setModalState({ visible: false, site: undefined });
    } catch (e) {
      if (errorCallback) {
        errorCallback(e);
      }
      setError(e, true);
    }
  };

  const update = async (site, id, callback, errorCallback) => {
    try {
      await updateSite(site, id);
      if (callback) {
        callback();
      }
      setReload(reload + 1);
      setModalState({ visible: false, site: undefined });
    } catch (e) {
      if (errorCallback) {
        errorCallback(e);
      }
      setError(e, true);
    }
  };

  const remove = async (id, callback, errorCallback) => {
    try {
      await deleteSite(id);
      if (callback) {
        callback();
      }
      setReload(reload + 1);
    } catch (e) {
      if (errorCallback) {
        errorCallback(e);
      }
      setError(e, true);
    }
  };

  const toggleModal = () =>
    setModalState({
      ...modalState,
      visible: !modalState.visible,
      site: undefined,
    });

  const renderAction = () => {
    return (
      <Button size="sm" color="primary" className="float-right" onClick={toggleModal}>
        Add Site
      </Button>
    );
  };

  return (
    <DashboardTemplate>
      <Row>
        <Col>
          <Card header="Sites" actionHandler={renderAction()}>
            {state.isLoading ? (
              <span>Loading...</span>
            ) : (
              <SitesPage
                sites={state.sites}
                editAction={site => {
                  setModalState({
                    ...modalState,
                    visible: true,
                    site,
                  });
                }}
                deleteSite={remove}
              />
            )}
          </Card>
        </Col>
      </Row>
      <Modal isOpen={modalState.visible} toggle={toggleModal} style={{ maxWidth: '650px' }}>
        <ModalHeader toggle={toggleModal}>{modalState.site && modalState.site._id ? 'Edit' : 'Add'} Site</ModalHeader>
        <AddEditSite initialValues={modalState.site} addSite={add} updateSite={update} />
      </Modal>
    </DashboardTemplate>
  );
};

export default Home;
