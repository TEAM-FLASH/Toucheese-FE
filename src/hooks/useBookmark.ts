const postBookmark = async (accessToken: string, studioId: number) => {
  const response = await fetch(`${import.meta.env.VITE_TOUCHEESE_API}/user/bookmark/${studioId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    console.error(response.status);
    return response.status;
  }

  return null;
};

const deleteBookmark = async (accessToken: string, studioId: number) => {
  const response = await fetch(`${import.meta.env.VITE_TOUCHEESE_API}/user/bookmark/${studioId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    console.error(response.status);
    return response.status;
  }

  return null;
};

const useBookmark = (isBookmarked: boolean) => {
  return (accessToken: string, studioId: number) =>
    isBookmarked ? deleteBookmark(accessToken, studioId) : postBookmark(accessToken, studioId);
};

export default useBookmark;
