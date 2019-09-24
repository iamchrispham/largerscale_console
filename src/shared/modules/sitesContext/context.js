import React from 'react';

const SitesContext = React.createContext({
  sites: [],
  selectedSite: {},
  selectSite: () => {},
});

export default SitesContext;
