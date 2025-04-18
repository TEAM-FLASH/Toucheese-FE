// userId === 1 => 로그인/회원가입 시 변경 예정
const postBookmark = async (accessToken: string, studioId: number) => {
  const response = await fetch(`${import.meta.env.VITE_TOUCHEESE_API}/user/bookmark/${studioId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to add bookmark');
  }
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
    throw new Error('Failed to delete bookmark');
  }
};

const useBookmark = (isBookmarked: boolean) => {
  return (accessToken: string, studioId: number) =>
    isBookmarked ? deleteBookmark(accessToken, studioId) : postBookmark(accessToken, studioId);
};

export default useBookmark;
