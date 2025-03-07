/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import useToast from '@hooks/useToast';
import { TypoBodyMdR, TypoBodySmR } from '@styles/Common';
import variables from '@styles/Variables';

interface CopyButtonProps {
  text: string;
  buttonLabel?: string;
}

const CopyLocation = ({ text, buttonLabel }: CopyButtonProps) => {
  const openToast = useToast();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      openToast('주소가 복사되었습니다.');
    } catch (error) {
      openToast('주소 복사에 실패했습니다.');
    }
  };
  return (
    <div css={containerStyle}>
      <div css={contentRowStyle}>
        <img src="/img/icon-location.svg" alt="주소 아이콘" css={iconStyle} />
        <span css={TypoBodyMdR}>{text}</span>
      </div>
      <div>
        <button css={[buttonStyle, TypoBodySmR]} onClick={copyToClipboard}>
          <span css={buttonTextStyle}>{buttonLabel}</span>
          <img src="/img/icon-content_copy.svg" alt="주소 복사 아이콘" css={iconStyle} />
        </button>
      </div>
    </div>
  );
};

export default CopyLocation;

const containerStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;

  gap: 1rem;
  margin-top: 1rem;
`;

const contentRowStyle = css`
  display: flex;
  align-items: flex-start;
  gap: 0.4rem;
`;

const iconStyle = css`
  width: 1.6rem;
  height: 1.6rem;
  flex-shrink: 0;
`;

const buttonStyle = css`
  display: flex;
  align-items: center;

  justify-content: center;
  border-radius: 0.6rem;
  border: 0.1rem solid ${variables.colors.gray400};
  cursor: pointer;
  width: 7.4rem;
  height: 3rem;
`;

const buttonTextStyle = css`
  margin-top: 0.2rem;
`;
