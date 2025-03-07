/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { DividerStyle, TypoCapSmM } from '@styles/Common';
import variables from '@styles/Variables';
import { useNavigate } from 'react-router-dom';

/** 이미지만 상세보기 (자식) 컴포넌트 */
const StudioReviewImageList = ({
  samplePhotoList,
  pageId,
}: {
  samplePhotoList: string[];
  pageId: string | undefined;
}) => {
  const navigate = useNavigate();

  return (
    <PhotoContainerStyle>
      {samplePhotoList.slice(0, 3).map((photo, index) => (
        <div key={index}>
          <picture>
            <source srcSet={photo.replace(/\.(jpg|jpeg|png)$/, '.webp')} type="image/webp" />
            <img src={photo} alt={`사진${index + 1}`} />
          </picture>
        </div>
      ))}
      <ImageListLastContentStyle>
        <picture>
          <source
            srcSet={samplePhotoList[3].replace(/\.(jpg|jpeg|png)$/, '.webp')}
            type="image/webp"
          />
          <img src={samplePhotoList[3]} alt="사진4" />
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
  display: flex;
  gap: 0.2rem;

  & > div {
    width: 25%;
  }

  & > div > img {
    width: 100%;
    aspect-ratio: 94 / 118;
    object-fit: contain;
  }
  ${DividerStyle}
`;
const ImageListLastContentStyle = styled.div`
  position: relative;
  width: 25%;
  height: 100%;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const DimOverlayStyle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100%);
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    color: ${variables.colors.white};
    ${TypoCapSmM}
  }
`;
