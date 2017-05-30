import axios from 'axios';
const url = 'localhost';

const request = axios.create({
  baseUrl: url,
})

const fetchData = ({type='all', selector='all', id='', policyTypeId=''}) => {
  return new Promise((resolve, reject) => {
    request({
      method:'get',
      url: '/api/' + type,
      params: {
        selector,
        id,
        policyTypeId 
      }
    })
    .then(({data}) => resolve(data))
    .catch(reject);
  });
};

const postLogin = ({email, password}) => {
  return new Promise((resolve, reject) => {
    request({
      method: 'post',
      url: '/login',
      data: {
        email,
        password
      }
    })
    .then(resolve)
    .catch(reject);
  });
};

const postRegister = ({email, password, firstName, lastName, city, state, profileUrl}) => {
  return new Promise((resolve, reject) => {
    request({
      method: 'post',
      url:'/register',
      data: {
        email,
        password,
        firstName,
        lastName, 
        city,
        state,
        profileUrl
      }
    })
    .then(resolve)
    .catch(reject);
  });
}

const tableToFieldName = (tableName) => {
  let singular;
  if (tableName.lastIndexOf('s') === tableName.length) {
    singular = tableName.split('s')[0];
  } else {
    singular = tableName;
  }
  let charArr = singular.split('');
  if (singular.charAt(charArr.length - 2) === 'i' && 
    singular.charAt(charArr.length - 2) === 'e') {
    charArr.slice(0, singular.lastIndexOf('i')).push('y');
  }
  return charArr[0].toUpperCase().concat(charArr.slice(1).join(''));
}

export {
  fetchData,
  postLogin,
  postRegister,
  tableToFieldName
};

