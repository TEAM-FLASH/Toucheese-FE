import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import '@testing-library/jest-dom';
import Button from '@components/Button/Button';

/**test 01 기본 props 렌더링 */
it('render with default props', () => {
  render(<Button variant="primary" text="Button Click" />);

  /**렌터링 버튼에서 Button Click 찾기 */
  // const buttonClick = screen.getByText('Button Click');

  /**화면에 존재하는지 확인 */
  const button = screen.getByRole('button');

  /** 버튼의 속성 type이 기본 button type인지 확인 */
  expect(button).toHaveAttribute('type', 'button');
});
