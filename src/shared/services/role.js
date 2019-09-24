import API from '../../api';
import { ROLE } from '../../api/endpoints';

export const ROLES = {
  CLIENT: 'client',
  ADMIN: 'admin',
  GOD: 'god',
};

export function readRoleFromStorage() {
  let user = localStorage.getItem('user') || {};
  if (user) {
    user = JSON.parse(user);
  }
  const role = user.role || {};

  return role.key;
}

export const isClient = () => readRoleFromStorage() === ROLES.CLIENT;
export const isAdmin = () => readRoleFromStorage() === ROLES.ADMIN;
export const isGod = () => readRoleFromStorage() === ROLES.GOD;

export async function getRoles() {
  const api = new API();
  return api.get(ROLE).then(
    res => res.data,
    error => {
      throw error;
    }
  );
}

export async function getRole(id) {
  const api = new API();
  return api.get(ROLE, id).then(
    res => res.data,
    error => {
      throw error;
    }
  );
}

export async function addRole(course) {
  const api = new API();
  return api.post(ROLE, course).then(
    res => res.data,
    error => {
      throw error;
    }
  );
}

export async function updateRole(course, id) {
  const api = new API();
  return api.put(`${ROLE}/${id}`, course).then(
    res => res.data,
    error => {
      throw error;
    }
  );
}

export async function deleteRole(id) {
  const api = new API();
  return api.delete(ROLE, id).then(
    res => res.data,
    error => {
      throw error;
    }
  );
}
