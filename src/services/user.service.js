import axios from 'axios';
import { storageService } from './async-storage.service';
import { httpService } from './http.service';
import { utilService } from './util.service';
const STORAGE_KEY = 'users';
var gWatchedUser = null;

export const userService = {
  query,
  getById,
  remove,
  save,
  getEmptyUser,
  findUserByEmail,
};

var gUsers = _loadUsers();

async function query(filterBy = null) {
  let users = await gUsers;

  if (filterBy && (filterBy.name.length > 0 || filterBy.email.length > 0)) {
    var { name, email } = filterBy;
    users = users.filter((user) => {
      return (
        user.firstName.toLowerCase().includes(name.toLowerCase()) &&
        user.email.toLowerCase().includes(email.toLowerCase())
      );
    });
  }
  return Promise.resolve(users);
}

async function getById(userId) {
  const user = await storageService.get(STORAGE_KEY, userId);
  return user;
}
function remove(userId) {
  return storageService.remove(STORAGE_KEY, userId);
}

async function findUserByEmail(email) {
  const users = await gUsers;
  return users.find((user) => {
    return user.email === email.toLowerCase();
  });
}

async function _loadUsers() {
  var users = await storageService.query(STORAGE_KEY);
  console.log('loadusers', users);
  if (!users || !users.length) {
    var { data } = await axios.get('https://randomuser.me/api/?results=10');
    users = data.results.map((data) => ({
      title: data.name.title,
      firstName: data.name.first,
      lastName: data.name.last,
      email: data.email,
      userImage: data.picture.medium,
      country: data.location.country,
      city: data.location.city,
      streetName: data.location.street.name,
      streetNum: data.location.street.number,
    }));
    storageService.postMany(STORAGE_KEY, users);
  }
  return Promise.resolve(users);
}

function getEmptyUser() {
  return {
    title: '',
    firstName: '',
    lastName: '',
    email: '',
    userImage: '',
    country: '',
    city: '',
    streetName: '',
    streetNum: '',
    userImage: `https://randomuser.me/api/portraits/med/men/${utilService.getRandomIntInclusive(
      1,
      100
    )}.jpg`,
  };
}

async function save(userToSave) {
  var users = await gUsers;
  if (userToSave._id) {
    const idx = users.findIndex((user) => user._id === userToSave._id);
    users.splice(idx, 1, userToSave);
    storageService.put(STORAGE_KEY, userToSave);
  } else {
    userToSave._id = utilService.makeId();
    users.push(userToSave);
    storageService.post(STORAGE_KEY, userToSave);
  }
  users = gUsers;
  return Promise.resolve(userToSave);
}
