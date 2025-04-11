/** @jsxImportSource @emotion/react */

import Modal from '@components/Modal/Modal';
import styled from '@emotion/styled';
import { breakPoints, mqMin } from '@styles/BreakPoint';
import { TypoBodyMdM, TypoBodySmM, TypoBodySmR, TypoTitleXsSb } from '@styles/Common';
import variables from '@styles/Variables';

const PolicyModal = () => {
  return (
    <Modal type="fullscreen" title="개인정보 수집, 제공 동의" withBtn={false}>
      <section>
        <ContentStyle>
          <h2>개인정보 수집 및 이용 동의</h2>
          <div>
            <h3>개인정보 수집 항목 및 방법</h3>
            <p>
              회사는 일반회원 가입 시 아래와 같은 개인정보를 수집하고 있습니다.
              <br />
              1. 회원가입 시: 성명, 이메일 주소(이상 필수적 수집 정보).
              <br />
              2. 예약 및 결제 과정: 예약 정보(성명, 이메일 주소, 휴대폰번호)와 결제 정보(신용카드
              번호 및 은행 계좌정보 일부 등).
              <br />
              3. 문의 접수 및 회신 과정: 연락처 및 이메일 주소. 이벤트 진행 시 배송 정보 등을 수집할
              수 있습니다.
              <br />
              4. 서비스 이용 과정: IP 주소, 쿠키, 방문 일시, 불량 이용 기록, 기기정보(PC/모바일)
              정보가 자동으로 생성되어 수집됩니다.
            </p>
            <p>
              회사는 회원(일반회원, 파트너회원)에게 전화를 할 경우, 전화 중개 위탁 서비스에 따라
              전화번호를 수집합니다.
            </p>
            <p>
              개인정보의 수집 방법
              <br />
              1. 터치즈 PC/모바일 회원가입, 고객센터를 통한 유선 상담, 이메일을 통한 온라인 상담,
              카카오톡을 통한 온라인 상담.
              <br />
              2. 오프라인에서 진행되는 이벤트, 세미나 등.
            </p>
          </div>
          <div>
            <h3>개인정보 이용 목적</h3>
            <p>
              회사는 다음의 목적으로 서비스 제공을 위한 최소한의 개인정보만을 수집하며, 수집한
              정보를 목적 외로 이용하거나, 회원의 동의 없이 외부에 공개하지 않습니다.
              <br />
              1. 회원관리: 회원제 서비스 제공에 따른 개인 식별, 가입 의사 확인, 이용약관 위반 회원에
              대한 이용 제한 조치, 서비스 부정 이용 제재, 고충 처리 및 분쟁 조정을 위한 기록 보존,
              고지사항 전달, 회원탈퇴 의사의 확인.
              <br />
              2. 서비스 개선 및 맞춤형 서비스 제공: 인구통계학적 분석, 서비스 방문 및 이용 기록의
              분석, 개인정보 및 관심에 기반한 맞춤형 서비스 제공 등.
              <br />
              3. 신규 서비스 개발 및 마케팅 광고 활용: 신규 서비스 개발, 맞춤형 서비스 제공,
              인구통계학적 특성에 따른 광고 게재, 서비스의 유효성 확인, 이벤트 및 광고성 정보 제공.
              <br />
              4. 결제 시스템 제공: 본인 인증, 예약 및 요금 결제, 상품 및 서비스 제공.
              <br />
              5. 보안 및 안전 환경 구축: 보안, 프라이버시, 안전 측면에서 회원이 안심하고 이용할 수
              있는 환경 구축.
            </p>
          </div>
        </ContentStyle>
        <ContentStyle>
          <h2>개인정보 제3자 제공 동의</h2>
          <div>
            <p>
              회사는 회원의 개인정보를 사전 동의 없이 외부에 공개하거나 제공하지 않습니다. 다만,
              회원이 사전에 제공에 동의한 경우 또는 법령에 따라 법원 및 수사기관의 요구가 있는 경우
              예외로 합니다.
            </p>
          </div>
          <div>
            <p>
              일반회원의 촬영 예약 및 이용, 결제 및 환불 처리 과정에서 개인정보가 제공될 수
              있습니다.
              <br />
              1. 제공받는 자: 터치즈 파트너.
              <br />
              2. 제공 항목: 이름, 연락처, 결제정보(결제방식 및 결제금액), 이메일.
              <br />
              3. 제공 목적: 촬영 예약 및 환불 처리.
              <br />
              4. 제공 기간: 서비스 제공 기간(관련 법령의 규정에 의하여 보존할 필요가 있는 경우 해당
              보유기간).
            </p>
          </div>
        </ContentStyle>
      </section>
    </Modal>
  );
};

export default PolicyModal;

const ContentStyle = styled.div`
  padding: 1rem 0;
  box-sizing: border-box;

  & h2 {
    margin-bottom: 0.8rem;
    ${TypoTitleXsSb}
  }

  & div {
    margin-bottom: 0.8rem;
    &:last-of-type {
      margin-bottom: unset;
    }

    & h3 {
      margin-bottom: 0.8rem;
      ${TypoBodySmM}

      ${mqMin(breakPoints.pc)} {
        ${TypoBodyMdM}
      }
    }

    & p {
      color: ${variables.colors.black};
      margin-bottom: 0.8rem;
      ${TypoBodySmR}
    }
  }
`;
