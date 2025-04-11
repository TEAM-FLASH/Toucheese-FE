/** @jsxImportSource @emotion/react */
import KakaoShareButton from '@components/Kakao/KaKaoShare';
import { css } from '@emotion/react';
import useToast from '@hooks/useToast';

interface ShareProps {
  title: string;
  description: string;
  imageUrl: string;
  webUrl: string;
}

const ShareOptions = ({ title, description, imageUrl, webUrl }: ShareProps) => {
  const openToast = useToast();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(webUrl);
      openToast('링크가 복사되었습니다.');
    } catch (error) {
      openToast('링크 복사에 실패했습니다.');
    }
  };

  return (
    <div css={shareOptionsStyle}>
      <div css={iconWithLabel}>
        <div css={shareButtonStyle}>
          <KakaoShareButton
            title={title}
            description={description}
            imageUrl={imageUrl}
            webUrl={webUrl}
          />
        </div>
        <span css={textStyle}>카카오톡</span>
      </div>

      <div css={iconWithLabel}>
        <div css={shareButtonStyle} onClick={copyToClipboard}>
          <img src="/img/icon-copy-link.svg" alt="링크 복사" />
        </div>
        <span css={textStyle}>링크복사</span>
      </div>
    </div>
  );
};

export default ShareOptions;

const shareOptionsStyle = css`
  display: flex;
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
