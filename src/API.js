const API_URL = "https://setnfy-api.herokuapp.com";

export async function ADD_NF(nf) {
  await fetch(API_URL + "/api/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nf),
  });
}

export async function ATT_NF(nf) {
  await fetch(API_URL + "/api/att", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nf),
  });
}

export async function DEL_NF(nf_id) {
  await fetch(API_URL + "/api/del", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nf_id),
  });
}

export async function FIN_NF(nf_id) {
  await fetch(API_URL + "/api/fin", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nf_id),
  });
}
