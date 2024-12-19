/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import useBottomSheetState from '@store/useBottomSheetStateStore';
import BottomSheet from '@components/BottomSheet/BottomSheet';
import KakaoShareButton from '@components/Kakao/KakaoShare';
import useClipboard from '@hooks/useClipboard';

interface ShareProps {
  title: string;
  description: string;
  imageUrl: string;
  webUrl: string;
}

const Share = ({ title, description, imageUrl, webUrl }: ShareProps) => {
  const { openBottomSheet } = useBottomSheetState();
  const { copyToClipboard } = useClipboard(webUrl);

  const handleOpenKakaoShare = () => {
    openBottomSheet(
      <div css={shareOptionsStyle}>
        <div css={iconWithLabel}>
          <div css={shareButtonStyle}>
            <KakaoShareButton title={title} description={description} imageUrl={imageUrl} webUrl={webUrl} />
          </div>
          <span css={textStyle}>카카오톡</span>
        </div>

        <div css={iconWithLabel}>
          <div css={shareButtonStyle} onClick={copyToClipboard}>
            <img src="/img/icon-copy-link.svg" alt="링크 복사" />
          </div>
          <span css={textStyle}>링크복사</span>
        </div>
      </div>,
      '공유 옵션 선택',
    );
  };
  return (
    <div css={containerStyle}>
      <button onClick={handleOpenKakaoShare}>
        <img src="/img/icon-share.svg" alt="공유하기" />
      </button>
      <BottomSheet />
    </div>
  );
};

export default Share;

const containerStyle = css`
  display: inline-block;
  width: auto;
  height: auto;
`;

const shareOptionsStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.5rem;
  gap: 2rem;
`;

const iconWithLabel = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const shareButtonStyle = css`
  cursor: pointer;
  width: 4.8rem;
  height: 4.8rem;

  img {
    width: 100%;
    height: 100%;
  }
`;

const textStyle = css`
  font-size: 1.2rem;
`;

/* 사용예시
<Share
  title="공유할 스튜디오 이름"
  description="공유할 스튜디오 설명"
  imageUrl="https://i.imgur.com/BMDwLgQ.jpeg" //보여질 이미지
  webUrl="http://toucheese.store/search/results?keyword=그믐달" //이동url
/> 
*/
