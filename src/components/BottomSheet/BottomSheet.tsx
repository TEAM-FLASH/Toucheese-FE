/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import useBottomSheetState from '@store/useBottomSheetStateStore';
import { Hidden } from '@styles/Common';
import variables from '@styles/Variables';
import { useEffect, useRef, useState } from 'react';

const BottomSheet = () => {
  const { isOpen, children, title, closeBottomSheet } = useBottomSheetState();
  const [sheetHeight, setSheetHeight] = useState(0); // 바텀시트 높이
  const [translateY, setTranslateY] = useState(0); // 바텀시트 드래그 시 위치 Y값
  const [isDrag, setIsDrag] = useState(false); //드래그 상

  const sheet = useRef<HTMLDivElement>(null); // 바텀시트 전체
  const content = useRef<HTMLDivElement>(null); // 바텀시트 컨텐츠
  const startY = useRef<number | null>(null); //초기 터치&마우스 Y좌표

  //바텀 시트 나오면 배경 스크롤 금지
  useEffect(() => {
    document.documentElement.style.overscrollBehavior = isOpen ? 'none' : '';

    // if(content.current)

    //바텀시트 닫을때 이전 드래그 Y위치값이 저장되어 다음에 열릴 때 초기 위치에서 시작하도록 하는 코드
    if (!isOpen) {
      setTranslateY(0);
    }

    return () => {
      document.documentElement.style.overscrollBehavior = '';
    };
  }, [isOpen]);

  // 바텀시트가 열렸을때 컨텐츠 높이 저장 함수
  useEffect(() => {
    if (sheet.current) {
      const observer = new ResizeObserver(() => {
        const contentHeight = sheet.current?.getBoundingClientRect().height;
        setSheetHeight(contentHeight || 0);
      });

      observer.observe(sheet.current);

      return () => observer.disconnect();
    }
  }, [children]);

  const handleDragStart = (e: React.TouchEvent | React.MouseEvent) => {
    //터치&마우스 이벤트 구분하는 코드
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const target = e.target as HTMLElement;

    //컨텐츠 영역 터치 시 드래그 막기
    if (content.current && content.current.contains(target)) {
      return;
    }

    // 바텀 시트 영역 내에서만 드래그 가능
    if (sheet.current && sheet.current.contains(target)) {
      // 드래그 시작 Y위치값 저장
      startY.current = clientY;
      setIsDrag(true);
    }
  };

  const handleDragMove = (e: TouchEvent | MouseEvent) => {
    if (!isDrag || startY.current === null || !sheet.current) return;

    //터치&마우스 이벤트 구분하는 코드
    const clientY = e instanceof TouchEvent ? e.touches[0].clientY : e.clientY;
    //이동한 위치 - 초기값 = 드래그한 양
    const calcY = clientY - startY.current;

    // 아래로만 드래그 가능 & 바텀시트 컨텐츠만 드래그 가능
    if (calcY > 0 && sheet.current.contains(e.target as HTMLElement)) {
      setTranslateY(calcY);
    }
  };

  const handleDragEnd = () => {
    setIsDrag(false);

    // 컨텐츠 3/1 이상 드래그하면 닫기
    if (translateY > sheetHeight / 3) {
      closeBottomSheet();
    } else {
      // 충분히 드래그하지 않으면 원래 위치로 복귀
      setTranslateY(0);
    }
    startY.current = null;
  };

  useEffect(() => {
    if (sheet.current) {
      sheet.current.addEventListener('mousemove', handleDragMove);
      sheet.current.addEventListener('mouseup', handleDragEnd);
      sheet.current.addEventListener('touchmove', handleDragMove, { passive: false });
      sheet.current.addEventListener('touchend', handleDragEnd);
    }

    return () => {
      if (sheet.current) {
        sheet.current.removeEventListener('mousemove', handleDragMove);
        sheet.current.removeEventListener('mouseup', handleDragEnd);
        sheet.current.removeEventListener('touchmove', handleDragMove);
        sheet.current.removeEventListener('touchend', handleDragEnd);
      }
    };
  }, [isDrag, translateY, sheetHeight, closeBottomSheet]);

  return (
    isOpen && (
      <div css={DimStyle}>
        <div
          css={[SheetStyle(sheetHeight, translateY)]}
          ref={sheet}
          onMouseDown={handleDragStart}
          // 앱에서만이 아닌 웹에서 device toolbar 사용할 경우도 필요
          onTouchStart={handleDragStart}
        >
          <div css={SheetHeadStyle}>
            <h4>{title}</h4>
            <button type="button" onClick={closeBottomSheet}>
              <span css={Hidden}>바텀시트 닫기</span>
            </button>
          </div>
          <div css={SheetContentStyle} ref={content}>
            {children}
          </div>
        </div>
      </div>
    )
  );
};

export default BottomSheet;

const DimStyle = css`
  position: fixed;
  inset: 0;
  background-color: rgba(30, 30, 30, 0.5);
  z-index: 888;
  min-height: 100svh;
`;

const SlideUp = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

const SheetStyle = (sheetHeight: number, moveY: number) => css`
  position: fixed;
  z-index: 999;
  left: 0;
  //(초기 위치값 - 드래그한 만큼)
  top: ${`calc(100% - ${sheetHeight}px + ${moveY}px)`};
  width: 100%;
  border-radius: 2rem 2rem 0 0;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  padding: 2rem 1.6rem 4.8rem;
  box-sizing: border-box;
  background-color: ${variables.colors.white};
  animation: ${SlideUp} 0.3s ease-in-out forwards;
  transition: transform 0.2s ease-out;
`;

const SheetHeadStyle = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  background-color: ${variables.colors.white};

  & h4 {
    color: ${variables.colors.gray800};
    font-size: 1.6rem;
  }

  & button {
    display: block;
    background-image: url('/img/icon-close-gray500.svg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: 1.5rem;
    width: 1.5em;
    height: 1.5rem;
  }
`;

const SheetContentStyle = css`
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`;
