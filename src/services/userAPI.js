const USER_KEY = 'user';
const TIMEOUT = 1500;
const SUCCESS_STATUS = 'OK';

const readUser = () => JSON.parse(localStorage.getItem(USER_KEY));
const saveUser = (user) => localStorage.setItem(USER_KEY, JSON.stringify(user));

// --------------------------------------------------------------------
// A função simulateRequest simula uma requisição para uma API externa
// Esse tipo de função que "chama outra função" é chamada de
// "currying function" https://javascript.info/currying-partials
// não se preocupe, estudaremos isso mais futuramente
// --------------------------------------------------------------------

const simulateRequest = (response) => (callback) => {
  setTimeout(() => {
    callback(response);
  }, TIMEOUT);
};

export const getUser = () => new Promise((resolve) => {
  let user = readUser();
  if (user === null) {
    user = {};
  }
  simulateRequest(user)(resolve);
});

export const createUser = (user) => new Promise((resolve) => {
  const emptyUser = {
    name: '',
    email: '',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqZTrzAB4Dx6G__8N_tifYN8TJ9GZ2WX8iGK6FsM-I4OEOwsFYKkihpU6SQ-XNED-UCtw&usqp=CAU',
    description: '',
  };
  saveUser({ ...emptyUser, ...user });
  simulateRequest(SUCCESS_STATUS)(resolve);
});

export const updateUser = (updatedUser) => new Promise((resolve) => {
  saveUser({ ...updatedUser });
  simulateRequest(SUCCESS_STATUS)(resolve);
});
