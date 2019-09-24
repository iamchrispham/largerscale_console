import React, { useEffect, useContext, useState } from 'react';
import { Row, Col, Button, Modal, ModalHeader } from 'reactstrap';

import Card from '../../../shared/molecules/card';
import { getUsers, addUser, updateUser, deleteUser } from '../../../shared/services/users';
import ErrorContext from '../../../shared/modules/error/context';
import UserPage from './userPage';
import UserAddEdit from './userAddEdit';

const UsersContainer = () => {
  const [state, setState] = useState({
    users: [],
    reset: 0,
    isLoading: false,
  });
  const [modalState, setModalState] = useState({
    visible: false,
    org: undefined,
  });
  const [reload, setReload] = useState(0);
  const { setError } = useContext(ErrorContext);

  useEffect(() => {
    async function fetchAllUsers() {
      setState(s => ({ ...s, isLoading: true }));
      try {
        const users = await getUsers();
        setState(s => ({ ...s, users, isLoading: false }));
      } catch (e) {
        setError(e, true);
        setState(s => ({ ...s, isLoading: false }));
      }
    }

    fetchAllUsers();
  }, [setError, reload]);

  const add = async (user, callback, errorCallback) => {
    try {
      delete user.confirmPassword;
      await addUser(user);
      if (callback) {
        callback();
      }
      setReload(reload + 1);
      setModalState({ visible: false, user: undefined });
    } catch (e) {
      if (errorCallback) {
        errorCallback(e);
      }
      setError(e, true);
    }
  };

  const update = async (user, id, callback, errorCallback) => {
    try {
      await updateUser(user, id);
      if (callback) {
        callback();
      }
      setReload(reload + 1);
      setModalState({ visible: false, user: undefined });
    } catch (e) {
      if (errorCallback) {
        errorCallback(e);
      }
      setError(e, true);
    }
  };

  const remove = async (id, callback, errorCallback) => {
    try {
      await deleteUser(id);
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
      user: undefined,
    });

  const renderAction = () => {
    return (
      <Button size="sm" color="primary" className="float-right" onClick={toggleModal}>
        Add User
      </Button>
    );
  };

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card header="Users" actionHandler={renderAction()}>
            {state.isLoading ? (
              <span>Loading...</span>
            ) : (
              <UserPage
                users={state.users}
                editAction={user => {
                  setModalState({
                    ...modalState,
                    visible: true,
                    user,
                  });
                }}
                deleteUser={remove}
              />
            )}
          </Card>
        </Col>
      </Row>
      <Modal isOpen={modalState.visible} toggle={toggleModal} style={{ maxWidth: '650px' }}>
        <ModalHeader toggle={toggleModal}>Add User</ModalHeader>
        <UserAddEdit initialValues={modalState.user} updateUser={update} addUser={add} />
      </Modal>
    </React.Fragment>
  );
};

export default UsersContainer;
