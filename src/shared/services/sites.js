import API from '../../api';
import { SITES } from '../../api/endpoints';

export async function getSites() {
  const api = new API();
  return api.get(SITES).then(
    res => res.data,
    error => {
      throw error;
    }
  );
}

export async function getSite(id) {
  const api = new API();
  return api.get(SITES, id).then(
    res => res.data,
    error => {
      throw error;
    }
  );
}

export async function addSite(site) {
  const api = new API();
  return api.post(SITES, site).then(
    res => res.data,
    error => {
      throw error;
    }
  );
}

export async function updateSite(site, id) {
  const api = new API();
  return api.put(`${SITES}/${id}`, site).then(
    res => res.data,
    error => {
      throw error;
    }
  );
}

export async function deleteSite(id) {
  const api = new API();
  return api.delete(SITES, id).then(
    res => res.data,
    error => {
      throw error;
    }
  );
}
