import React from 'react';
import { Table, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ConfirmationContext from '../../../shared/modules/confirmationModal/context';
import { isAdmin, ROLES } from '../../../shared/services/role';

const UserPage = ({ users, editAction, deleteUser }) => {
  const noOneDeleteGod = user => user.role && user.role.name !== ROLES.GOD;
  const adminCantDeleteAdmin = user => !(user.role && user.role.name === ROLES.ADMIN && isAdmin());
  const adminCantEditGod = user => !(user.role && user.role.name === ROLES.GOD && isAdmin());

  if (users && users.length) {
    return (
      <Table borderless responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Organization</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <tr key={user._id}>
              <th scope="row">{i + 1}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.organization && user.organization.name}</td>
              <td style={{ textTransform: 'capitalize' }}>{user.role && user.role.name}</td>

              <td>
                {adminCantEditGod(user) && (
                  <React.Fragment>
                    <Button size="sm" onClick={() => editAction(user)}>
                      <FontAwesomeIcon icon="edit" />
                    </Button>
                    &nbsp;
                  </React.Fragment>
                )}
                {noOneDeleteGod(user) && adminCantDeleteAdmin(user) && (
                  <ConfirmationContext.Consumer>
                    {({ setConfirmationModal, resetConfirmationModal, setLoader }) => (
                      <Button
                        size="sm"
                        onClick={() =>
                          setConfirmationModal(s => ({
                            ...s,
                            visible: true,
                            item: user.name,
                            callback: () => {
                              setLoader(true);
                              deleteUser(user._id, () => resetConfirmationModal(), () => setLoader(false));
                            },
                          }))
                        }
                        color="danger"
                      >
                        <FontAwesomeIcon icon="trash" />
                      </Button>
                    )}
                  </ConfirmationContext.Consumer>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }

  return <div>No users found</div>;
};

export default UserPage;
