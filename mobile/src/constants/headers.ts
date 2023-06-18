export const headers = (token: string | null) => {
  if (!token) {
    return undefined;
  }

  return {
    headers: {
      Authorization: token,
    },
  };
};
