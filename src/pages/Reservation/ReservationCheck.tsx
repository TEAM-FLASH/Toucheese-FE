/** @jsxImportSource @emotion/react */
import Header from '@components/Header/Header';
import { css } from '@emotion/react';
import useModal from '@hooks/useModal';
import PolicyModal from '@pages/Reservation/components/PolicyModal';
import {
  TypoBodyMdR,
  TypoBodyMdSb,
  TypoBodySmR,
  TypoCapSmM,
  TypoCapSmR,
  TypoTitleXsM,
  TypoTitleXsR,
  TypoTitleXsSb,
} from '@styles/Common';
import variables from '@styles/Variables';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Payment from './components/Payment';
import useReservationStore from '@store/useReservationStore';
import { useSelectTimeStore } from '@store/useSelectTimeStore';
import { useSelectDateStore } from '@store/useSelectDateStore';
import { useUserStore, loadUserFromStorage } from '@store/useUserStore';
import ReservationInfo from './components/ReservationInfo';
import { breakPoints, mqMax, mqMin } from '@styles/BreakPoint';
import { pcFlexLayout } from './ReservationSchedule';
import { useNavigate } from 'react-router-dom';

interface FormValues {
  visitorName: string;
  visitorContact: string;
  requests?: string;
  agree?: boolean;
}

const ReservationCheck = () => {
  // 암호화 된 유저 정보 복호화
  useEffect(() => {
    loadUserFromStorage();
  }, []);

  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('카카오페이');
  const [isAgreed, setIsAgreed] = useState(false);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAgreed(e.target.checked);
  };

  const { time } = useSelectTimeStore();
  const { date } = useSelectDateStore();
  const { totalPrice, options, menuName, basicPrice, menuImage, menuId, requests } =
    useReservationStore();
  const { username, phone, user_id } = useUserStore();
  const [isDifferentVisitor, setIsDifferentVisitor] = useState(false);

  const {
    register,
    getValues,
    setFocus,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    trigger,
  } = useForm<FormValues>({
    mode: 'onChange',
  });

  const requestsValue = watch('requests', '');

  const [visitorName, visitorContact] = watch(['visitorName', 'visitorContact']);

  const formatPhoneNumber = (phone: string | undefined): string => {
    if (!phone) return '';

    return phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  };

  const handleSubmitForm = async () => {
    const isValid = await trigger();

    if (!isValid) {
      if (errors.visitorName) {
        setFocus('visitorName');
        return;
      }

      if (errors.visitorContact) {
        setFocus('visitorContact');
        return;
      }

      if (!isAgreed) {
        setFocus('agree');
        return;
      }
    }

    if (isValid) {
      const formData = getValues();
      const formattedContact = formatPhoneNumber(formData.visitorContact);
      const currentState = useReservationStore.getState();

      const visitorInfo = isDifferentVisitor
        ? {
            name: formData.visitorName,
            contact: formattedContact,
          }
        : {
            name: username,
            contact: phone,
          };

      currentState.saveReservationDetails({
        ...currentState,
        visitorInfo,
        requests: formData.requests || '',
        paymentMethod,
      });
    }
  };

  const { open } = useModal(1);

  return (
    <>
      <Header title="결제하기" fixed={true} />

      <div css={pcFlexLayout}>
        <div className="left-box">
          {/* 예약정보 */}
          <ReservationInfo />
        </div>

        <div className="right-box">
          <div className="content-box">
            {' '}
            {/* 예약자정보 */}
            <section css={reservationPersonInfoStyle}>
              <h2 css={reservationTitleAlignStyle}>예약자정보</h2>
              <div css={userInfoWrapperStyle}>
                <p css={[TypoTitleXsM]}>{username}</p>
                <button
                  type="button"
                  css={[infoChangeBtnStyle, TypoCapSmM]}
                  onClick={() => navigate('/user/profile/edit')}
                >
                  변경하기
                </button>
              </div>
              <p css={TypoTitleXsM}>{phone}</p>
              <div css={checkboxWrapperStyle}>
                <input
                  type="checkbox"
                  id="visitorCheckbox"
                  css={checkboxStyle}
                  onChange={(e) => setIsDifferentVisitor(e.target.checked)}
                />
                <label htmlFor="visitorCheckbox" css={[TypoCapSmM, labelStyle]}>
                  <img src="/img/icon-check-gray.svg" alt="체크 아이콘" />
                  <p>실제 방문자가 달라요</p>
                </label>
              </div>
            </section>
            <form onSubmit={handleSubmit(handleSubmitForm)}>
              {/* 방문자가 다를 경우 */}
              {isDifferentVisitor && (
                <section>
                  <h2 css={[TypoBodyMdSb, visitorTitleStyle]}>
                    실제 방문하실 분의 정보를 입력하세요.
                  </h2>
                  <div css={visitorFormStyle}>
                    <label css={TypoBodySmR} htmlFor="visitorName">
                      방문자 이름
                    </label>
                    <div css={visitorInputStyle}>
                      <input
                        type="text"
                        placeholder="방문자 이름을 입력하세요."
                        id="visitorName"
                        {...register('visitorName', { required: '방문자 이름을 입력해주세요.' })}
                      />
                      {visitorName && (
                        <button type="button" onClick={() => setValue('visitorName', '')}>
                          <img src="/img/icon-cancel.svg" alt="입력창 삭제 버튼" />
                        </button>
                      )}
                    </div>
                    {errors.visitorName?.message && <p>{errors.visitorName.message}</p>}
                    <label css={TypoBodySmR} htmlFor="visitorName">
                      휴대폰 번호 (-제외)
                    </label>
                    <div css={visitorInputStyle}>
                      <input
                        type="text"
                        placeholder="'-'구분없이 휴대폰 번호를 입력하세요."
                        maxLength={11}
                        {...register('visitorContact', {
                          required: '방문자 연락처를 입력해주세요.',
                          pattern: {
                            value: /^[0-9]+$/,
                            message: '휴대폰 번호는 숫자 11자리를 입력해주세요.',
                          },
                          validate: (value) =>
                            value.length === 11 || '휴대폰 번호는 정확히 11자리여야 합니다.',
                        })}
                      />
                      {visitorContact && (
                        <button type="button" onClick={() => setValue('visitorContact', '')}>
                          <img src="/img/icon-cancel.svg" alt="입력창 삭제 버튼" />
                        </button>
                      )}
                    </div>

                    {errors.visitorContact?.message && <p>{errors.visitorContact.message}</p>}
                  </div>
                </section>
              )}
              <section css={requestsSectionStyle}>
                <h2 css={reservationTitleAlignStyle}>요청사항</h2>
                <div css={textareaBox}>
                  <textarea
                    css={textRequestsStyle}
                    maxLength={100}
                    placeholder="방문 전 요청하실 내용을 적어주세요.&#10;원하는 스타일을 작가님에게 전달할 수 있습니다."
                    {...register('requests')}
                  />
                  <span css={showLength}>{requestsValue?.length || 0}/100</span>
                </div>
              </section>
            </form>
            {/* 결제정보*/}
            <section css={paymentSectionStyle}>
              <h2 css={[reservationTitleAlignStyle]}>결제정보</h2>
              <div css={[reservationBoxStyle, TypoBodySmR]}>
                <div css={[PriceInforowStyle, options.length > 0 && basicPriceStyle]}>
                  <span>기본 가격</span>
                  <span>{menuName}</span>
                  <span>{basicPrice?.toLocaleString()}원</span>
                </div>
                {options.length > 0 && (
                  <div css={PriceInforowStyle}>
                    <span>추가 옵션</span>
                    <span css={optionListStyle}>
                      {options.map((option, index) => (
                        <span key={option.option_id}>
                          {option.optionName}
                          {index < options.length - 1 && <br />}
                        </span>
                      ))}
                    </span>
                    <span css={optionListStyle}>
                      {options.map((option, index) => (
                        <span key={option.option_id}>
                          {option.optionPrice.toLocaleString()}원
                          {index < options.length - 1 && <br />}
                        </span>
                      ))}
                    </span>
                  </div>
                )}

                <hr css={reservationHrStyle} />
                <div css={[totalPriceLowStyle, TypoTitleXsSb, totalPriceStyle]}>
                  <span>총 결제금액</span>
                  <span>{totalPrice.toLocaleString()}원</span>
                </div>
              </div>
            </section>
            {/* 결제수단 */}
            <section css={paymentMethodSectionStyle}>
              <h2 css={reservationTitleAlignStyle}>결제수단</h2>
              <div css={[TypoTitleXsR, radioGroupStyle]}>
                <li css={radioLabelStyle}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    id="kakaoPay"
                    value="카카오페이"
                    defaultChecked
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label htmlFor="kakaoPay">
                    <img css={payIconStyle} src="/img/icon-kakaoPay.svg" alt="카카오페이 로고" />
                  </label>
                </li>
                <li css={radioLabelStyle}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    id="naverPay"
                    value="네이버페이"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label htmlFor="naverPay">
                    <img css={payIconStyle} src="/img/icon-naverPay.svg" alt="네이버페이 로고" />
                  </label>
                </li>
                <li css={radioLabelStyle}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    id="creditCard"
                    value="일반신용카드"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label htmlFor="creditCard">
                    <span css={TypoTitleXsR}>일반신용카드</span>
                  </label>
                </li>
              </div>
            </section>
            {/* 개인정보 동의 */}
            <div css={termsSectionStyle}>
              {' '}
              <div css={termsContainerStyle}>
                <div css={[termsCheckStyle, TypoBodyMdR]}>
                  <input
                    type="checkbox"
                    id="agree"
                    onChange={handleCheckboxChange}
                    data-testid="paymentAgree"
                  />
                  <label htmlFor="agree" css={termsCheckBoxStyle(isAgreed)}>
                    <img src="/img/icon-checkbox-empty.svg" alt="빈 체크박스" />
                    <img src="/img/icon-checkbox-done.svg" alt="체크된 체크박스" />
                  </label>
                  <label htmlFor="agree">
                    결제 내용을 확인했으며, 아래 내용에 모두 동의합니다.
                  </label>
                </div>
                {!isAgreed && <p>결제 진행을 위해 동의가 필요합니다.</p>}
                <div css={PrivacyPolicyTitleStyle}>
                  <h3 css={TypoBodyMdSb}>개인정보 수집, 제공</h3>
                  <button
                    css={[TypoCapSmM, modalTitleColor]}
                    onClick={() => {
                      open();
                    }}
                  >
                    전체보기
                  </button>
                  <PolicyModal />
                </div>
                <div>
                  <h3 css={TypoBodyMdSb}>취소/환불 규정</h3>
                  <div css={[TypoBodySmR, refundPolicyTableStyle]}>
                    <div css={refundInfoRowStyle}>
                      <span>이용 7일 전까지</span>
                      <span>결제 금액에 대한 취소 수수료 없음</span>
                    </div>
                    <hr css={reservationHrStyle} />
                    <div css={refundInfoRowStyle}>
                      <span>이용 7일 전 ~ 이용 당일</span>
                      <span>취소 불가</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Payment
            onClick={handleSubmitForm}
            trigger={trigger}
            paymentMethod={paymentMethod}
            isAgreed={isAgreed}
            totalPrice={totalPrice}
            options={options}
            userId={user_id}
            visitorName={isDifferentVisitor ? visitorName || '' : username || ''}
            visitorPhone={isDifferentVisitor ? visitorContact || '' : phone || ''}
            menuId={menuId}
            menuName={menuName}
            requests={requests}
            date={date}
            time={time[0]}
            basicPrice={basicPrice}
            menuImage={menuImage}
          />
        </div>
      </div>
    </>
  );
};

export default ReservationCheck;

export const reservationTitleAlignStyle = css`
  height: 4.2rem;
  line-height: 4.2rem;
  margin-top: 0.4rem;
  ${TypoTitleXsSb}
`;

export const reservationBoxStyle = css`
  border: 1px solid ${variables.colors.gray400};
  border-radius: ${variables.borderRadius};
  padding: 1rem 1.4rem;

  ${mqMin(breakPoints.pc)} {
    padding: 1.4rem 1.6rem;
  }
`;

export const reservationHrStyle = css`
  border: none;
  border-bottom: 1px solid ${variables.colors.gray400};
  margin: 1rem 0;

  ${mqMin(breakPoints.pc)} {
    margin: 1.5rem 0;
  }
`;

// 예약자정보
const reservationPersonInfoStyle = css`
  ${mqMax(breakPoints.pc)} {
    margin-top: 1.5rem;
  }
`;
const userInfoWrapperStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const infoChangeBtnStyle = css`
  color: ${variables.colors.gray600};
`;

const checkboxWrapperStyle = css`
  min-width: 13.5rem;
  height: 3.2rem;
  box-sizing: border-box;
  position: relative;
  display: flex;
  margin-top: 1rem;

  input {
    display: none;
  }
  input:checked + label {
    border-color: ${variables.colors.primary600};
    background-color: ${variables.colors.primary50};
  }
`;

const checkboxStyle = css`
  opacity: 0;
  position: absolute;
`;

const labelStyle = css`
  display: flex;
  align-items: center;
  padding: 0.7rem 0.9rem 0.7rem 0.5rem;
  font-size: 1.2rem;
  line-height: 1.2rem;
  color: ${variables.colors.gray900};
  border: 1px solid ${variables.colors.gray500};
  border-radius: ${variables.borderRadius};
  cursor: pointer;
  gap: 1px;

  & img {
    margin: 0 0.24rem;
    width: 1.1rem;
    height: 0.8rem;
  }
`;

const visitorTitleStyle = css`
  margin-top: 1.5rem;
`;
const visitorFormStyle = css`
  margin-top: 0.8rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  input {
    padding: 1.2rem 1rem;
    height: 5.6rem;
    font-size: 1.2rem;
    color: ${variables.colors.gray800};
    border-color: ${variables.colors.gray400};

    &:focus {
      outline: none;
      border-color: ${variables.colors.primary600};
    }

    &::placeholder {
      ${TypoBodyMdR};
      color: ${variables.colors.gray600};
    }
  }
  p {
    color: #f80100;
    font-size: 1.2rem;
  }
`;

const visitorInputStyle = css`
  position: relative;

  button {
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    right: 1.1rem;
    top: 50%;
    transform: translateY(-50%);

    & > img {
      width: 1.7rem;
      height: 1.7rem;
    }
  }
`;

const requestsSectionStyle = css`
  ${mqMin(breakPoints.pc)} {
    margin-top: 3.4rem;
    padding-bottom: 3.4rem;
  }
  ${mqMax(breakPoints.pc)} {
    margin-top: 1.5rem;
  }
`;

const paymentSectionStyle = css`
  position: relative;
  margin-top: 2rem;
  padding-top: 1rem;

  ${mqMin(breakPoints.pc)} {
    padding-top: 3.4rem;
    padding-bottom: 3.4rem;
  }

  &::before {
    content: '';
    display: block;
    position: absolute;
    left: -1.6rem;
    right: -1.6rem;
    top: -2rem;
    height: 1rem;
    background-color: ${variables.colors.gray300};

    ${mqMax(breakPoints.pc)} {
      top: calc(-2rem + 1rem);
    }
  }

  h2 {
    ${mqMin(breakPoints.pc)} {
      margin-top: -0.5rem;
    }
  }
`;

const textRequestsStyle = css`
  color: ${variables.colors.gray600};
  border: 1px solid ${variables.colors.gray400};
  border-radius: ${variables.borderRadius};
  padding: 1rem 1.2rem;
  height: 9.6rem;

  &:focus {
    outline: none;
    border-color: ${variables.colors.primary600};
  }
  &::placeholder {
    ${TypoBodyMdR};
    color: ${variables.colors.gray600};
  }
`;

const textareaBox = css`
  position: relative;
`;

const showLength = css`
  position: absolute;
  color: ${variables.colors.gray500};
  right: 1.2rem;
  bottom: 1.2rem;
  ${TypoCapSmR}
`;

//결제정보
const PriceInforowStyle = css`
  display: flex;

  > span:first-of-type {
    color: ${variables.colors.gray800};
    margin-right: 0.8rem;
  }

  > span:last-of-type {
    margin-left: auto;
    text-align: right;
  }
`;

const totalPriceLowStyle = css`
  display: flex;
  color: ${variables.colors.black};

  > span:last-of-type {
    margin-left: auto;
    text-align: right;
  }
`;

const basicPriceStyle = css`
  margin-bottom: 0.8rem;
`;

const optionListStyle = css`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const totalPriceStyle = css`
  margin-top: 1.2rem;
  color: ${variables.colors.black};
`;

//결제수단

const paymentMethodSectionStyle = css`
  ${mqMin(breakPoints.pc)} {
    padding-bottom: 3.4rem;
  }
  ${mqMax(breakPoints.pc)} {
    margin-top: 2rem;
  }
`;

const radioGroupStyle = css`
  font-size: 1.8rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const radioLabelStyle = css`
  display: flex;
  align-items: center;
  cursor: pointer;

  input {
    margin: 0 0.8rem 0 0;
    flex-shrink: 0;
  }

  label {
    display: flex;
    align-items: center;
    line-height: 1;
    margin: 0;
  }
`;

const payIconStyle = css`
  width: 6rem;
`;

//동의,약관,규정

const termsSectionStyle = css`
  position: relative;
  margin-top: 3rem;

  ${mqMin(breakPoints.pc)} {
    padding-top: 3.4rem;
  }

  &::before {
    content: '';
    display: block;
    position: absolute;
    left: -1.6rem;
    right: -1.6rem;
    top: -2rem;
    height: 1rem;
    background-color: ${variables.colors.gray300};

    ${mqMax(breakPoints.pc)} {
      top: calc(-2rem + 1rem);
    }
  }
`;

const termsContainerStyle = css`
  padding-top: 1rem;

  ${mqMin(breakPoints.pc)} {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding-top: 0rem;
    margin-top: -1rem;
  }

  h3 {
    height: 3.6rem;
    line-height: 3.6rem;
  }
  p {
    color: #f80100;
    font-size: 1.2rem;
  }
`;

const termsCheckStyle = css`
  display: flex;
  align-items: center;
  height: 4rem;

  input {
    display: none;
  }
`;

const termsCheckBoxStyle = (isAgreed: boolean) => css`
  cursor: pointer;
  margin-right: 0.8rem;

  img:first-of-type {
    display: ${isAgreed ? 'none' : 'block'};
  }

  img:nth-of-type(2) {
    display: ${isAgreed ? 'block' : 'none'};
  }
`;

const PrivacyPolicyTitleStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const modalTitleColor = css`
  color: ${variables.colors.gray600};
`;
const refundPolicyTableStyle = css`
  border: 1px solid ${variables.colors.gray400};
  border-radius: ${variables.borderRadius};
  padding: 1rem 1.4rem;
  margin-top: 0.5rem;
`;

const refundInfoRowStyle = css`
  display: flex;
  justify-content: space-between;

  span:first-of-type {
    color: ${variables.colors.gray800};
  }
`;
