/** @jsxImportSource @emotion/react */

import { css, CSSObject, keyframes } from '@emotion/react';
import { PCLayout, TypoBodyMdM, TypoBodyMdR, TypoBodySmR, TypoTitleXsM } from '@styles/Common';
import variables from '@styles/Variables';
import React, { useState } from 'react';

type ButtonVariant =
  | 'primary'
  | 'gray'
  | 'lightGray'
  | 'black'
  | 'white'
  | 'grayWithYellowOutline'
  | 'grayWithGrayOutline';

type ButtonSize = 'xsmall' | 'small' | 'medium' | 'large';
type IconResetSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  text?: string;
  variant: ButtonVariant;
  disabled?: boolean;
  active?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  size?: ButtonSize;
  iconResetSize?: IconResetSize;
  fixed?: boolean;
  width?: 'fit' | 'max';
  iconPosition?: 'non' | 'left' | 'right';
  icon?: React.ReactNode;
  iconSizeWidth?: string;
  iconSizeHeight?: string;
  style?: CSSObject;
  dataTab?: string;
  iconGap?: string;
}

/**  버튼 컴포넌트 사용
 * 
    - iconPosition="right" 아이콘 필요시 버튼 내부 위치 ( 기본값은 none )
    - icon={이미지 태그로 경로 지정} 아이콘 추가
    - iconSizeWidth="1rem" 아이콘 가로사이즈
    - iconSizeHeight="1rem" 아이콘 세로사이즈
    - size="small" 버튼 자체의 높이 사이즈
    - text="버튼이름" 버튼에 들어갈 텍스트
    - width="fit" 버튼 자체의 가로값 max: 100%, fit: fit-content
    - variant="white" 버튼 색상
    - disabled={false} 활성화 여부
    - type="button"
 */

/**  리셋 아이콘 컴포넌트 사용
 * 
    - type="reset" 버튼 리셋 타입
    - iconResetSize="small" 아이콘 리셋 버튼 사이즈
    - variant="gray" 리셋은 gray300 공통이지만 필수값이므로 전달
    <Button type="reset" iconResetSize="small" variant="gray" />
 */

const Button = ({
  icon,
  iconGap = '0.8rem',
  iconSizeWidth = '2rem',
  iconSizeHeight = '2rem',
  iconPosition = 'non',
  width = 'max',
  text,
  disabled = false,
  active = false,
  onClick,
  type = 'button',
  variant = 'primary',
  fixed = false,
  size = 'large',
  style,
  iconResetSize,
  dataTab,
  ...restProps
}: ButtonProps) => {
  const isIconReset = type === 'reset' && iconResetSize;

  // ----------------------------- 리셋 아이콘 버튼 클릭 여부 및 상태관리 -----------------------------
  const [isAnimating, setIsAnimating] = useState(false);
  const handleButtonClick = () => {
    if (onClick) {
      onClick();
    }
    if (isIconReset) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 400);
    }
  };

  // ----------------------------- 가로값 사이즈 -----------------------------
  const widthStyles = {
    fit: css`
      min-width: fit-content;
      max-width: fit-content;
      padding: 0 1rem;
    `,
    max: css`
      width: 100%;
      box-sizing: border-box;
      ${PCLayout}
    `,
  };
  // ----------------------------- 아이콘 전용 리셋 버튼 크기 -----------------------------
  const iconResetSizeStyles = {
    small: css`
      width: 3.2rem;
      height: 3.2rem;
    `,
    medium: css`
      width: 4rem;
      height: 4rem;
    `,
    large: css`
      width: 4.8rem;
      height: 4.8rem;
    `,
  };

  // ----------------------------- 아이콘 전용 리셋 버튼 패딩값 -----------------------------
  const iconResetPaddingStyles = {
    small: css`
      padding: 0.8rem;
    `,
    medium: css`
      padding: 1rem;
    `,
    large: css`
      padding: 1.2rem;
    `,
  };
  // ----------------------------- 아이콘 리셋 버튼 애니메이팅 -----------------------------
  const rotateIcon = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

  // ----------------------------------------------------------
  const iconWrapperStyles = css`
    display: flex;
    align-items: center;
    gap: ${iconGap};

    ${iconPosition === 'right' && `flex-direction: row-reverse;`}
    ${iconPosition === 'left' && ` flex-direction: row;`}
    ${icon && `img{width:${iconSizeWidth}; height:${iconSizeHeight}}`}
  `;

  // ----------------------------- 버튼 사이즈 -----------------------------
  const sizeStyles = {
    xsmall: css`
      ${TypoBodySmR};
      height: 3.2rem;
      padding: 0.6rem 1rem;
    `,
    small: css`
      ${TypoBodyMdR};
      height: 3.6rem;
      padding: 0 1rem;
    `,
    medium: css`
      ${TypoBodyMdM};
      height: 4rem;
      padding: 0 1rem;
    `,
    large: css`
      ${TypoTitleXsM};
      height: 4.8rem;
    `,
    xlarge: css`
      ${TypoBodyMdM}
      height: 4.8rem;
    `,
  };

  // ----------------------------- 버튼 기본 스타일 -----------------------------
  const styles = css`
    border: none;
    border-radius: ${variables.borderRadius};
    cursor: pointer;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    box-sizing: border-box;
    ${sizeStyles[size]}
    ${widthStyles[width]}

    // ----------------------------- 노란색 버튼 ----------------------------- 
    ${variant === 'primary' &&
    css`
      background-color: ${variables.colors.primary50};
      border: 1px solid ${variables.colors.primary};
    `}

// ----------------------------- 블랙 버튼 ----------------------------- 
    ${variant === 'black' &&
    css`
      background-color: ${variables.colors.gray900};
      color: ${variables.colors.white};
    `}
    
// ----------------------------- 기본 회색 버튼 ----------------------------- 
    ${variant === 'gray' &&
    css`
      background-color: ${variables.colors.gray400};
      color: ${variables.colors.white};
    `}

    ${variant === 'gray' &&
    active &&
    css`
      background-color: ${variables.colors.gray900};
      color: ${variables.colors.white};
      border: none;
    `}


    // ----------------------------- 밝은 회색 버튼 ----------------------------- 
    ${variant === 'lightGray' &&
    css`
      background-color: ${variables.colors.gray300};
      color: ${variables.colors.gray800};
    `}

    ${variant === 'lightGray' &&
    active &&
    css`
      background-color: ${variables.colors.gray900};
      color: ${variables.colors.white};
      border: none;
    `}



// ----------------------------- 흰색 버튼 ----------------------------- 
    ${variant === 'white' &&
    css`
      background-color: ${variables.colors.white};
      border: 1px solid ${variables.colors.gray400};
    `}

    ${variant === 'white' &&
    active &&
    css`
      background-color: ${variables.colors.primary50};
      border: 1px solid ${variables.colors.primary500};
    `}

 // ----------------------------- 외곽선 노란색 회색 버튼 -----------------------------
    ${variant === 'grayWithYellowOutline' &&
    css`
      background-color: ${variables.colors.gray300};
      border: 1px solid ${variables.colors.primary50};
    `}

  ${variant === 'grayWithYellowOutline' &&
    active &&
    css`
      background-color: ${variables.colors.gray900};
      color: ${variables.colors.white};
      border: none;
    `}
  

 // ----------------------------- 외곽선 진회색 버튼 -----------------------------
    ${variant === 'grayWithGrayOutline' &&
    css`
      background-color: ${variables.colors.gray100};
      border: 1px solid ${variables.colors.gray400};
      color: ${variables.colors.gray500};
    `}

  ${variant === 'grayWithGrayOutline' &&
    active &&
    css`
      background-color: ${variables.colors.primary50};
      border: 1px solid ${variables.colors.primary500};
      color: ${variables.colors.gray900};
    `}


  // ----------------------------- 버튼 위치 고정 -----------------------------
    ${fixed &&
    css`
      position: fixed;
      bottom: 3rem;
      left: 50%;
      transform: translateX(-50%);
      width: calc(100% - 2 * ${variables.layoutPadding});
      max-width: calc(500px - 2 * ${variables.layoutPadding});
      z-index: 1000;
    `}

// ----------------------------- 아이콘 리셋 스타일 -----------------------------
    ${type === 'reset' &&
    iconResetSize &&
    css`
      ${iconResetSizeStyles[iconResetSize]}
      ${iconResetPaddingStyles[iconResetSize]}
      background-color: ${variables.colors.gray300};
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      aspect-ratio: 1 / 1;
    `}


// ----------------------------- 작은버튼 padding 값 -----------------------------
${width === 'fit' &&
    !(size === 'medium' || size === 'large') &&
    css`
      padding: 0 1.4rem;
    `}

  // ----------------------------- disabled일 때 기본값 -----------------------------
    ${disabled &&
    css`
      background-color: ${variables.colors.gray400};
      color: ${variables.colors.white};
      border: none;
      cursor: not-allowed;
    `}
  `;

  return (
    <button
      type={type}
      css={[styles, style]}
      disabled={disabled}
      onClick={handleButtonClick}
      data-tab={dataTab}
      {...restProps}
    >
      <div css={iconWrapperStyles}>
        {isIconReset ? (
          <img
            src="/img/icon-reset.svg"
            alt="초기화 아이콘"
            css={[
              iconResetSizeStyles[iconResetSize],
              isAnimating &&
                css`
                  animation: ${rotateIcon} 0.4s ease-out;
                `,
            ]}
          />
        ) : (
          icon
        )}
        {!isIconReset && text}
      </div>
    </button>
  );
};

export default Button;
