const API_URL = "https://setnfy-api.herokuapp.com";

export function API_USER_RESET_PASSWORD(token, password) {
  return {
    url: API_URL + `/user/reset_password/${token}`,
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(password),
    },
  };
}

export function API_USER_FORGOT(email) {
  return {
    url: API_URL + "/user/forgot",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(email),
    },
  };
}

export function API_USER_LOGIN(user) {
  return {
    url: API_URL + "/user/login",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    },
  };
}

export function API_USER_TOKEN(token) {
  return {
    url: API_URL + "/user/token",
    options: {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
    },
  };
}

export function API_USER_REGISTER(user) {
  return {
    url: API_URL + "/user/register",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    },
  };
}

export function API_GET_NF(id_user) {
  return {
    url: API_URL + `/api/get=${id_user}`,
    options: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  };
}

export function API_ADD_NF(nf) {
  return {
    url: API_URL + "/api/add",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nf),
    },
  };
}

export function API_ATT_NF(nf) {
  return {
    url: API_URL + "/api/att",
    options: {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nf),
    },
  };
}

export async function API_DEL_NF(nf_id) {
  const response = await fetch(API_URL + "/api/del", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nf_id),
  });
  const data = await response.json();
  return { data };
}

export async function API_FIN_NF(nf_id) {
  const response = await fetch(API_URL + "/api/fin", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nf_id),
  });
  const data = await response.json();
  return { data };
}
