import { fetch } from ".";

type User = {
  email: string;
  password: string;
};

export const getLoginApi = async (value: User) => {
  const res = await fetch(`auth/login`, {
    method: "POST",
    body: JSON.stringify(value),
    // credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
  });

  const { data } = res;

  return data;
};
