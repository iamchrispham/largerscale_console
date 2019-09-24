import React, { useContext } from 'react';
import { Table, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SitesContext from '../../shared/modules/sitesContext/context';
import ConfirmationContext from '../../shared/modules/confirmationModal/context';

const SitesPage = ({ sites, editAction, deleteSite }) => {
  const siteContext = useContext(SitesContext);
  const { selectedSite, selectSite } = siteContext;

  if (sites && sites.length) {
    return (
      <Table borderless responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>User</th>
            <th>Organization</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {sites.map((site, i) => {
            const isSelected = !selectedSite ? false : selectedSite._id === site._id;

            return (
              <tr key={site._id}>
                <th scope="row">{i + 1}</th>
                <td>{site.name}</td>
                <td>{site.user && site.user.email}</td>
                <td>{site.organization && site.organization.name}</td>
                <td>{site.created && new Date(site.created).toDateString()}</td>

                <td>
                  {!isSelected && (
                    <React.Fragment>
                      <Button size="sm" onClick={() => editAction(site)}>
                        <FontAwesomeIcon icon="edit" />
                      </Button>
                      &nbsp;
                      <ConfirmationContext.Consumer>
                        {({ setConfirmationModal, resetConfirmationModal, setLoader }) => (
                          <Button
                            size="sm"
                            onClick={() =>
                              setConfirmationModal(s => ({
                                ...s,
                                visible: true,
                                item: site.name,
                                callback: () => {
                                  setLoader(true);
                                  deleteSite(site._id, () => resetConfirmationModal(), () => setLoader(false));
                                },
                              }))
                            }
                            color="danger"
                          >
                            <FontAwesomeIcon icon="trash" />
                          </Button>
                        )}
                      </ConfirmationContext.Consumer>
                      &nbsp;
                    </React.Fragment>
                  )}
                  {!isSelected && (
                    <Button size="sm" disabled={isSelected} color="success" onClick={() => selectSite(site)}>
                      Select &nbsp;
                    </Button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }

  return <div>No Sites found</div>;
};

export default SitesPage;
