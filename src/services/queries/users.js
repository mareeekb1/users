import { token } from "../../App";

const getAllUsersToTable = `
query Users {
    user {
      username
      is_premium
      email
      id
      role
    }
  }
`
const getUserById = `
query ($id:Int!) {
    user_by_pk(id : $id) {
      birth_date
      description
      email
      firstname
      id
      is_premium
      lastname
      phone
      role
      username
    }
  }
  
`
const updateUserById = `
    mutation UpdateUserById($id: Int = 2, $birth_date: date = "", $description: String = "", $email: String = "", $firstname: String = "", $lastname: String = "", $phone: String = "") {
      update_user_by_pk(_set: {birth_date: $birth_date, description: $description, email: $email, firstname: $firstname, lastname: $lastname, phone: $phone}, pk_columns: {id: $id}) {
        birth_date
        description
        email
        firstname
        lastname
        phone
      }
    }
  `;
const deleteUserById = `
  mutation DeleteUserById($id: Int = 2) {
    delete_user_by_pk(id: $id) {
      username
    }
  }
`;
const registerUser = `
  mutation RegisterUser($birth_date: date = "", $description: String = "", $email: String = "", $firstname: String = "", $is_premium: Boolean = false, $lastname: String = "", $password: String = "", $phone: String = "", $role: String = "", $username: String = "") {
    insert_user_one(object: {birth_date: $birth_date, description: $description, email: $email, firstname: $firstname, is_premium: $is_premium, lastname: $lastname, password: $password, phone: $phone, role: $role, username: $username}) {
      username
      role
    }
  }
`;
const login = `
  query Login($_eq: String = "", $_eq1: String = "") {
    user_aggregate(where: {username: {_eq: $_eq}, password: {_eq: $_eq1}}){
      nodes {
        role
      }
    }
  }
`;
const getUserByID = `
  query GetUserByID($id: Int = 10) {
    user_by_pk(id: $id) {
      username
      role
      phone
      lastname
      is_premium
      firstname
      email
      birth_date
      description
    }
  }
`;

export const query = {
  getAllForTable: getAllUsersToTable,
  getUserById: getUserById,
  updateUserById: updateUserById,
  deleteUserById: deleteUserById,
  registerUser: registerUser,
  login: login
}
export const service = {
  updateUserByIdS,
  deleteUserByIdS,
  registerUserS,
  loginS,
  getUserByIDs
}


async function fetchGraphQL(operationsDoc, operationName, variables) {
  const result = await fetch(
    "https://industry.hasura.app/v1/graphql",
    {
      method: "POST",
      body: JSON.stringify({
        query: operationsDoc,
        variables: variables,
        operationName: operationName
      }),
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": token
      },
    }
  );

  return await result.json();
}

function executeUpdateUserById(id, birth_date, description, email, firstname, lastname, phone) {
  return fetchGraphQL(
    updateUserById,
    "UpdateUserById",
    { "id": id, "birth_date": birth_date, "description": description, "email": email, "firstname": firstname, "lastname": lastname, "phone": phone }
  );
}
async function updateUserByIdS(id, birth_date, description, email, firstname, lastname, phone) {
  const { errors, data } = await executeUpdateUserById(id, birth_date, description, email, firstname, lastname, phone);

  if (errors) {
    // handle those errors like a pro
    console.error(errors);
    return errors
  }

  // do something great with this precious data
  return data;
}
function executeDeleteUserById(id) {
  return fetchGraphQL(
    deleteUserById,
    "DeleteUserById",
    { "id": id }
  );
}
async function deleteUserByIdS(id) {
  const { errors, data } = await executeDeleteUserById(id);

  if (errors) {
    // handle those errors like a pro
    console.error(errors);
    return errors;
  }

  // do something great with this precious data
  return data
}


function executeRegisterUser(birth_date, description, email, firstname, is_premium, lastname, password, phone, role, username) {
  return fetchGraphQL(
    registerUser,
    "RegisterUser",
    { "birth_date": birth_date, "description": description, "email": email, "firstname": firstname, "is_premium": is_premium, "lastname": lastname, "password": password, "phone": phone, "role": role, "username": username }
  );
}

async function registerUserS(birth_date, description, email, firstname, is_premium, lastname, password, phone, role, username) {
  const { errors, data } = await executeRegisterUser(birth_date, description, email, firstname, is_premium, lastname, password, phone, role, username);

  if (errors) {
    // handle those errors like a pro
    console.error(errors);
    return errors
  }

  // do something great with this precious data
  return data
}


function fetchLogin(_eq, _eq1) {
  return fetchGraphQL(
    login,
    "Login",
    { "_eq": _eq, "_eq1": _eq1 }
  );
}

async function loginS(_eq, _eq1) {
  const { errors, data } = await fetchLogin(_eq, _eq1);

  if (errors) {
    // handle those errors like a pro
    console.error(errors);
    return errors
  }

  // do something great with this precious data
  return data
}


function fetchGetUserByID(id) {
  return fetchGraphQL(
    getUserByID,
    "GetUserByID",
    { "id": id }
  );
}

async function getUserByIDs(id) {
  const { errors, data } = await fetchGetUserByID(id);

  if (errors) {
    // handle those errors like a pro
    console.error(errors);
    return errors
  }

  // do something great with this precious data
  console.log(data);
  return data
}
