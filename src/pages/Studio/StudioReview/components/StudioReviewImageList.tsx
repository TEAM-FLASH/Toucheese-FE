/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { breakPoints, mqMin } from '@styles/BreakPoint';
import { DividerStyle, TypoCapSmM } from '@styles/Common';
import variables from '@styles/Variables';
import { useNavigate } from 'react-router-dom';

// 대체 이미지 경로 (실제 프로젝트에 맞게 수정 필요)
const PLACEHOLDER_IMAGE = '/img/img-replace-05.svg';

/** 이미지만 상세보기 (자식) 컴포넌트 */
const StudioReviewImageList = ({
  samplePhotoList,
  pageId,
}: {
  samplePhotoList: string[];
  pageId: string | undefined;
}) => {
  const navigate = useNavigate();

  // 이미지 데이터가 없는 경우 처리
  if (!samplePhotoList || samplePhotoList.length === 0) {
    return (
      <NoImageContainerStyle>
        <NoImageTextStyle>등록된 사진 없음</NoImageTextStyle>
      </NoImageContainerStyle>
    );
  }

  // 총 6개의 이미지를 표시하기 위한 배열 생성
  const displayImages = [...samplePhotoList];

  // 실제 이미지가 6개 미만인 경우 대체 이미지로 채우기
  while (displayImages.length <= 5) {
    displayImages.push(PLACEHOLDER_IMAGE);
  }

  return (
    <PhotoContainerStyle>
      {displayImages.slice(0, 4).map((photo, index) => (
        <div key={index}>
          <picture>
            <img src={photo} alt={`사진${index + 1}`} />
          </picture>
        </div>
      ))}
      <ImageListLastContentStyle>
        <picture>
          <img src={displayImages[4]} alt="사진5" />
        </picture>
        <DimOverlayStyle onClick={() => navigate(`/studio/${pageId}/review/photos`)}>
          <span>더보기</span>
        </DimOverlayStyle>
      </ImageListLastContentStyle>
    </PhotoContainerStyle>
  );
};

export default StudioReviewImageList;

const PhotoContainerStyle = styled.div`
  position: relative;
  margin-top: 1.8rem;
  width: 100%;
  margin-left: calc(-1 * ${variables.layoutPadding});
  padding: 0 ${variables.layoutPadding};
  display: flex;
  flex-wrap: wrap;
  gap: 0.2rem;
  box-sizing: border-box;
  overflow: hidden;

  & > div {
    width: calc(20% - 0.16rem);
    aspect-ratio: 128/162;
    overflow: hidden;
  }

  & > div > picture {
    width: 100%;
    height: 100%;
    display: block;
  }

  & > div > picture > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  ${DividerStyle}

  ${mqMin(breakPoints.pc)} {
    & > div {
      width: calc(20% - 0.16rem);
      aspect-ratio: 155/193;
      overflow: hidden;
    }
  }
`;

const ImageListLastContentStyle = styled.div`
  position: relative;
  width: calc(20% - 0.16rem);
  aspect-ratio: 128/162;
  cursor: pointer;
  overflow: hidden;

  picture {
    width: 100%;
    height: 100%;
    display: block;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  ${mqMin(breakPoints.pc)} {
    width: calc(20% - 0.16rem);
    aspect-ratio: 155/193;
  }
`;

const DimOverlayStyle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    color: ${variables.colors.white};
    ${TypoCapSmM}
  }
`;

const NoImageContainerStyle = styled.div`
  width: 100%;
  max-width: 812px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${variables.colors.gray100};
  border-radius: 4px;
  margin: 1.8rem auto 0;
`;

const NoImageTextStyle = styled.span`
  color: ${variables.colors.gray500};
  ${TypoCapSmM}
`;
