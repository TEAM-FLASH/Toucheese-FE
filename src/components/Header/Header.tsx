/** @jsxImportSource @emotion/react */
import BackButton from '@components/BackButton/BackButton';
import { css, SerializedStyles } from '@emotion/react';
import { TypoTitleXsSB } from '@styles/Common';
import variables from '@styles/Variables';

interface HeaderProps {
  title?: string;
  backTo?: string;
  customStyle?: SerializedStyles;
}

const Header = ({ title, backTo, customStyle }: HeaderProps) => {
  return (
    <header css={[headerStyle, customStyle]}>
      <BackButton to={backTo} />
      {title && <h1 css={[TypoTitleXsSB, additionalH1Style]}>{title}</h1>}
    </header>
  );
};

export default Header;

const headerStyle = css`
  display: flex;
  position: fixed;
  width: 100%;
  z-index: 5;
  align-items: center;

  top: 0;
  left: 0;
  right: 0;
  padding: ${variables.layoutPadding};
`;

const additionalH1Style = css`
  margin-left: calc(50% - 2.4rem);
  transform: translateX(-50%);
`;
