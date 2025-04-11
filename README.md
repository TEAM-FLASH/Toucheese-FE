# Toucheese-FE

<img src='https://github-production-user-asset-6210df.s3.amazonaws.com/92114270/430810646-5601ae0a-b773-47c0-b81c-5804fdcb32ce.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20250407%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250407T062321Z&X-Amz-Expires=300&X-Amz-Signature=5611e0bf049b1969c5e78bfd40ad608c1b427a0bc101e0b45b118b69025cd976&X-Amz-SignedHeaders=host' />

다양한 스튜디오를 한 곳에서 모아보고 비교하며 간편하게 예약할 수 있는 스튜디오 예약 플랫폼

<br />

[터치즈 방문하기](https://toucheese-flash.store/)

```
id : toucheese@gmail.com
pw: 1q2w3e4r1!
```

---

## 프로젝트 소개

터치즈는 멋쟁이사자처럼 스타트업 스테이션 기획안을 바탕으로 개발된 스튜디오 예약 플랫폼으로 사용자가 쉽고 빠르게 원하는 스튜디오를 예약할 수 있도록 돕는 웹 서비스입니다.

프론트엔드 6인, 백엔드 1인, 디자이너 2인, 기획자 1인으로 구성된 팀이 애자일 방식을 기반으로 협업하였습니다.
<br />

| 주요서비스                  | 내용                                                           |
| --------------------------- | -------------------------------------------------------------- |
| **스튜디오 조회 및 필터링** | 지역, 가격, 촬영 컨셉 등 원하는 조건으로 스튜디오 조회 및 비교 |
| **스튜디오 검색**           | 스튜디오 검색, 관심 급상승 스튜디오 정보 제공                  |
| **스튜디오 상세 정보**      | 스튜디오 정보, 촬영 옵션, 포트폴리오, 리뷰 확인                |
| **스튜디오 예약 및 결제**   | 날짜와 시간을 선택하여 예약 및 결제                            |
| **SNS 간편 로그인**         | 카카오, 구글 계정을 활용한 간편 로그인 제공                    |

<br />

---

## 개발기간 및 작업관리

### 1. 개발 기간

```
2024.11.06 ~ 2025.04.18 (총 23주)
```

<br />

### 2. 애자일 방법론 적용

- 6주간 5개의 스프린트를 수행하는 애자일 방법론 적용
- 주 단위 스프린트 계획 수립 후 기획, 디자인, 개발 진행
  - `Jira`를 활용해 스프린트 작업 및 일정 관리
- 스프린트 종료 시
  - 개발 내용 배포, QA 진행
  - 개인/팀 단위 스프린트 회고를 통해 작업 중 개선사항을 다음 스프린트에 반영
- QA사항을 다음 스프린트에 즉각 반영하여 서비스 품질 향상 및 사용자 경험 개선

내용은 괜찮은듯 넘어갈까요

### 3. 이슈 관리 및 코드 리뷰

- `GitHub Issues`를 통해 개발 이슈와 기능 단위의 작업 현황을 관리

  - **How?**
    - 스프린트별 마일스톤을 생성하고, 이슈 번호로 branch를 생성해 개발 진행, 스토리 별 명확한 이슈 템플릿과 라벨링으로 작업 우선순위 설정 및 가시성 확보
    - 스토리별 명확한 이슈 템플릿과 라벨링으로 작업 우선순위 설정 및 가시성 확보
  - **Why?**
    해당 이슈가 어떤 스프린트에 진행된 작업인지 명시, 각 이슈별 작업이 어떻게 진행되고 있는지 파악하기 용이
  - **Result?**
    작업 진행 상황을 빠르게 팔로우하고, 팀원별 작업 내용을 세부적으로 파악할 수 있었음

- `GitHub Pull Requests`를 활용하여 모든 코드에 대해 동료 간 상호 코드 리뷰 진행
  - **How?**
    `Pull Request` 템플릿을 생성하여 작업 내용에 대해 상세한 설명 작성, 팀원 모두 `Pull Request`에 대한 리뷰를 승인해야 dev 브랜치로 병합할 수 있도록 branch 조건 설정
  - **Why?**
    코드 리뷰를 통해 불필요한 코드나 성능 개선이 필요한 부분을 발견하기 용이, 코드의 일관성이나 컨벤션 유지
  - **Result?**
    본인 담당 작업이 아니더라도 전체적으로 내용에 대해 이해하고, 새롭게 적용된 기술을 파악할 수 있었음, 좀 더 나은 코드에 대해 함께 고민할 수 있었음

### 4. AWS 배포 환경 구축 및 관리

- `AWS S3` + `CloudFront`를 활용한 배포 환경 구성
- `GitHub Actions`를 이용한 CD 환경 구현

<br />

---

## 기술 선정 이유

| 기술                      | 활용 방식                                                                                                                                                                                                                        |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **React**                 | 복잡한 UI 상태 관리를 효율적으로 하기 위해 컴포넌트 기반 개발 방식을 활용하고, 상태 및 UI 렌더링을 최적화했으며, 커스텀 훅을 통해 중복되는 비즈니스 로직을 재사용할 수 있도록 구성함. 이를 통해 코드 유지보수성을 향상시킴.      |
| **TypeScript**            | 프로젝트에서 발생할 수 있는 런타임 오류를 줄이고, API 응답 데이터의 타입을 명확하게 정의하여 예측 가능한 코드 작성을 가능하게 함. 이를 통해 협업 시 코드의 신뢰도를 높이고 디버깅 시간을 단축함.                                 |
| **Emotion**               | 기존 CSS 및 CSS 모듈 대비 스타일의 동적 적용이 용이하며, props 기반 스타일링을 통해 특정 조건에 따라 스타일을 쉽게 변경할 수 있도록 구성함. 또한, 테마를 적용하고 컴포넌트 단위의 스타일 관리를 통해 유지보수성 향상.            |
| **Zustand**               | Redux보다 가볍고 보일러플레이트 코드가 적어, 전역 상태를 직관적으로 관리할 수 있도록 적용함. 또한, 비동기 상태 관리가 간편하여 API 호출 결과를 효율적으로 캐싱 및 공유할 수 있도록 함.                                           |
| **Vitest**                | Vite와의 최적화된 통합 덕분에 테스트 실행 속도가 빠르며, Jest 대비 설정이 간편하고 빌드 성능 저하 없이 테스트가 가능하도록 구성함. 특히, ESM 환경에서 원활하게 작동하여 최신 프로젝트와의 호환성을 높임.                         |
| **React Testing Library** | 단순히 컴포넌트 렌더링이 정상적으로 되는지 확인하는 것이 아니라, 사용자의 실제 행동을 기반으로 UI 테스트를 수행할 수 있도록 활용함. 이를 통해, 버튼 클릭 후 상태 변경, 입력값 검증 등의 사용자 플로우를 검증할 수 있도록 함.     |
| **AWS S3**                | 대용량 파일 저장이 필요했고, 클라이언트에서 직접 업로드하도록 설정하여 서버 부하를 줄이고 성능을 최적화할 수 있도록 구성함. 또한, Signed URL을 활용하여 보안성을 강화하고, 필요에 따라 이미지 최적화 기능과 연계할 수 있도록 함. |
| **AWS CloudFront**        | CDN인 CloudFront를 활용하여 이미지파일, 정적 및 동적 웹 컨텐츠를 배포함으로써 캐싱을 통해 S3 부하를 감소시키고, 엣지 로케이션을 통해 응답속도를 향상시킴.                                                                        |
| **GitHub Actions**        | 배포 과정에서 반복적인 작업을 줄이기 위해 도입하고, PR 단위의 자동 테스트 및 빌드 검증을 통해 코드 안정성을 높이며 배포 속도를 개선함. 이를 통해, 코드 변경 사항이 신속하고 안정적으로 운영 환경에 반영될 수 있도록 구성함.      |

---

## 역할분담

|          | View                                                                                                              | Components                                                                                                                         |
| :------: | ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **지민** | 스튜디오 검색<br />스튜디오 예약 - 결제<br />마이페이지 - 예약 상세                                               | 카카오 지도 및 공유<br />이미지 스와이퍼<br />모바일 헤더                                                                          |
| **우중** | 스튜디오 상세 - 리뷰<br />스튜디오 상세 - 이미지 모아보기<br />이메일 / 카카오 로그인<br />마이페이지 - 리뷰 작성 | 리뷰 컴포넌트<br />가격 필터링 컴포넌트<br />매장 옵션 컴포넌트<br />별점 입력 컴포넌트<br />인풋 컴포넌트                         |
| **경민** | 스튜디오 상세 - 메뉴<br />스튜디오 상세 - 메뉴 상세<br />마이페이지                                               | 바텀시트<br />스튜디오 예약 하단 고정 버튼<br />예약 카드                                                                          |
| **소정** | 스튜디오 상세 - 포트폴리오<br />스튜디오 예약 - 시간 조회 및 선택<br />마이페이지 - 예약 취소                     | masonry 레이아웃<br />모달<br />딤 모달 내 스와이퍼<br />캘린더 및 시간 선택<br />로딩 컴포넌트<br />에러 컴포넌트                 |
| **희선** | 스튜디오 상세 - 스튜디오 정보 메인<br />이메일 회원가입<br />간편 본인인증<br />유저 정보 및 계정 정보 변경       | 버튼 컴포넌트<br />필터 컴포넌트<br />정렬 및 지역 필터링 컴포넌트                                                                 |
| **진욱** | 홈<br />마이페이지 - 예약 내역                                                                                    | 스튜디오 목록<br />토스트 메시지<br />PC 헤더<br />북마크<br />스튜디오 상세 / 예약 상세 탭<br />스튜디오 조회 / 검색 결과 없음 UI |

<br />

---

## 컴포넌트 및 화면구성

(캡처해서 넣기)
<br />

---

## 기술적 이슈와 해결 과정

### 1. [디자인 시스템 설계](https://github.com/TEAM-FLASH/Toucheese-FE/wiki/%EB%94%94%EC%9E%90%EC%9D%B8-%EC%8B%9C%EC%8A%A4%ED%85%9C-%EC%84%A4%EA%B3%84)

### 2. [에러 바운더리](https://github.com/TEAM-FLASH/Toucheese-FE/wiki/%EC%97%90%EB%9F%AC-%EB%B0%94%EC%9A%B4%EB%8D%94%EB%A6%AC)

### 3. 성능 최적화

- [결제 진행중 사용자 취소 시 로딩 플로우 최적화](https://github.com/TEAM-FLASH/Toucheese-FE/wiki/%EA%B2%B0%EC%A0%9C-%EC%A7%84%ED%96%89%EC%A4%91-%EC%82%AC%EC%9A%A9%EC%9E%90-%EC%B7%A8%EC%86%8C-%EC%8B%9C-%EB%A1%9C%EB%94%A9-%ED%94%8C%EB%A1%9C%EC%9A%B0-%EC%B5%9C%EC%A0%81%ED%99%94)

- [리스트 가상화](https://github.com/TEAM-FLASH/Toucheese-FE/wiki/%EB%A6%AC%EC%8A%A4%ED%8A%B8-%EA%B0%80%EC%83%81%ED%99%94)

- [스와이퍼 아이템 최대 3개씩 노출](https://github.com/TEAM-FLASH/Toucheese-FE/wiki/%EC%8A%A4%EC%99%80%EC%9D%B4%ED%8D%BC-%EC%95%84%EC%9D%B4%ED%85%9C-%EC%B5%9C%EB%8C%80-3%EA%B0%9C%EC%94%A9-%EB%85%B8%EC%B6%9C)

- [유저 접근 환경별 이미지 최적화](https://github.com/TEAM-FLASH/Toucheese-FE/wiki/%EC%9C%A0%EC%A0%80-%EC%A0%91%EA%B7%BC-%ED%99%98%EA%B2%BD%EB%B3%84-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%B5%9C%EC%A0%81%ED%99%94)

### 4. [SEO 최적화 및 메타태그 동적 생성](https://github.com/TEAM-FLASH/Toucheese-FE/wiki/SEO-%EC%B5%9C%EC%A0%81%ED%99%94-%EB%B0%8F-%EB%A9%94%ED%83%80%ED%83%9C%EA%B7%B8-%EB%8F%99%EC%A0%81-%EC%83%9D%EC%84%B1)

### 5. [SNS 로그인](https://github.com/TEAM-FLASH/Toucheese-FE/wiki/SNS-%EB%A1%9C%EA%B7%B8%EC%9D%B8)

### 6. UI/UX 고려

- [토스트(Toast) 메시지](<https://github.com/TEAM-FLASH/Toucheese-FE/wiki/%ED%86%A0%EC%8A%A4%ED%8A%B8(Toast)-%EB%A9%94%EC%8B%9C%EC%A7%80>)

- [바텀시트 구현](https://github.com/TEAM-FLASH/Toucheese-FE/wiki/%EB%B0%94%ED%85%80%EC%8B%9C%ED%8A%B8-%EA%B5%AC%ED%98%84)

- [필터 상태 URL 반영 및 유지 기능 개발](https://github.com/TEAM-FLASH/Toucheese-FE/wiki/%ED%95%84%ED%84%B0-%EC%83%81%ED%83%9C-URL-%EB%B0%98%EC%98%81-%EB%B0%8F-%EC%9C%A0%EC%A7%80-%EA%B8%B0%EB%8A%A5-%EA%B0%9C%EB%B0%9C)

### 7. [입력 검증 NPM 라이브러리 개발을 통한 DX 향상](https://github.com/TEAM-FLASH/Toucheese-FE/wiki/%EC%9E%85%EB%A0%A5-%EA%B2%80%EC%A6%9D-NPM-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC-%EA%B0%9C%EB%B0%9C%EC%9D%84-%ED%86%B5%ED%95%9C-DX-%ED%96%A5%EC%83%81)

<br />

---

## 팀원 소개

### 1. 프론트엔드

|                                                       박지민                                                        |                                                                                                                                                                                                                                                                                                                                                                                                                 윤우중                                                                                                                                                                                                                                                                                                                                                                                                                 | 이경민                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :-----------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/ChatNull/frankmap/assets/84115816/8d17df8e-0da1-4c92-863a-da87705460ec" width="100" /> | <img src="https://private-user-images.githubusercontent.com/109408216/430826507-b8bab899-ee39-4d16-9dc0-95cbd805f5a7.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDQwMTA0MjYsIm5iZiI6MTc0NDAxMDEyNiwicGF0aCI6Ii8xMDk0MDgyMTYvNDMwODI2NTA3LWI4YmFiODk5LWVlMzktNGQxNi05ZGMwLTk1Y2JkODA1ZjVhNy5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwNDA3JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDQwN1QwNzE1MjZaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0xNTg0ZWU4ZjU2MTBmNGYwZGJmYWRjN2NhMjcxMzY4YWQyN2Q3YThiMjI3YTU5Mzk0ODA3NDBhNTI3N2U2MjRjJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.KCwt5rZmQtlU0iBXvVmQqpiBvVfbraqCkp8RJQX-Om0" width="100" /> | <img src="https://private-user-images.githubusercontent.com/109408216/430825677-7de768b5-c644-477a-89b1-4ce0c4b81702.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDQwMTAyNzQsIm5iZiI6MTc0NDAwOTk3NCwicGF0aCI6Ii8xMDk0MDgyMTYvNDMwODI1Njc3LTdkZTc2OGI1LWM2NDQtNDc3YS04OWIxLTRjZTBjNGI4MTcwMi5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwNDA3JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDQwN1QwNzEyNTRaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1kOGQ0MzhiNjE1OGFmNTRjNjEwZjk1ODRlOGM5OTY1NjllMjE3YTU3OWVhNGIwY2FmYzc5NGUzNzIzNjFmYjkwJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.-YoSlTHGll8FGY4JYnkuUaJrWUYOk7dDwcngDb4skzs" width="100" /> |
|                                       [@aksenmi](https://github.com/aksenmi)                                        |                                                                                                                                                                                                                                                                                                                                                                                            [@woojoung1217](https://github.com/woojoung1217)                                                                                                                                                                                                                                                                                                                                                                                            | [@kyungmim](https://github.com/kyungmim)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |

|                                                       이소정                                                        |                                                       전희선                                                        | 정진욱                                                                                                              |
| :-----------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------ |
| <img src="https://github.com/ChatNull/frankmap/assets/84115816/8d17df8e-0da1-4c92-863a-da87705460ec" width="100" /> | <img src="https://github.com/ChatNull/frankmap/assets/84115816/3e777bdf-5e7f-47e3-a0dd-afe0a2fed078" width="100" /> | <img src="https://github.com/ChatNull/frankmap/assets/84115816/b9cd199b-61df-403b-a2c5-28ec85f5ae35" width="100" /> |
|                                       [@s0zzang](https://github.com/s0zzang)                                        |                                    [@HuiseonDev](https://github.com/HuiseonDev)                                     | [@JWJung-99](https://github.com/JWJung-99)                                                                          |

---

### 2. 백엔드

|                                                                                                                                                                                                                                                                                                                                                                                                                 고기욱                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://private-user-images.githubusercontent.com/109408216/430827818-8ab85738-c005-4784-b528-7a57e159db2c.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDQwMTA2NjIsIm5iZiI6MTc0NDAxMDM2MiwicGF0aCI6Ii8xMDk0MDgyMTYvNDMwODI3ODE4LThhYjg1NzM4LWMwMDUtNDc4NC1iNTI4LTdhNTdlMTU5ZGIyYy5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwNDA3JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDQwN1QwNzE5MjJaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0yMjNjYTkzNGZkOTFlMmQ3NmNjZjNkOGE3YjM0ZjNmMTIwZTZjMjg5M2E1NjkxODI0MDJjZDMxMjc2ZjM3ZTI5JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.vbbAgWhI0WtEUseitoZzKJqn-zTHx4W03dce6AKo7yA" width="100" /> |
|                                                                                                                                                                                                                                                                                                                                                                                                  [@kokiuk](https://github.com/kokiuk)                                                                                                                                                                                                                                                                                                                                                                                                  |

---

### 3. 디자이너

|                                                                                                                                                                                                                                                                                                                                                                                                                 김고은                                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                                                                                                                                                                                                                                                                                                                                                                 홍지희                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://private-user-images.githubusercontent.com/109408216/430825518-9e498e2c-1ad3-4b6f-807c-468a1955c329.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDQwMTAyNDQsIm5iZiI6MTc0NDAwOTk0NCwicGF0aCI6Ii8xMDk0MDgyMTYvNDMwODI1NTE4LTllNDk4ZTJjLTFhZDMtNGI2Zi04MDdjLTQ2OGExOTU1YzMyOS5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwNDA3JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDQwN1QwNzEyMjRaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0xNzgzZjBkNjA2M2MxYTMyYjQ5MDc0MTZjYWFkY2EyZWI3OGQyNDJiM2Y4YmNhMGYzZDU0ZWJjODM5OTNkZjhiJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.QFvYVxamFJ57YazMPRvbPcacltSRVI64KOyTW7AGPUQ" width="100" /> | <img src="https://private-user-images.githubusercontent.com/109408216/430830508-0ed18ff4-a239-4082-8798-4a303320988d.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDQwMTExMDcsIm5iZiI6MTc0NDAxMDgwNywicGF0aCI6Ii8xMDk0MDgyMTYvNDMwODMwNTA4LTBlZDE4ZmY0LWEyMzktNDA4Mi04Nzk4LTRhMzAzMzIwOTg4ZC5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwNDA3JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDQwN1QwNzI2NDdaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT02Y2M3NTg0NTBlOWZlMzg1MDE3ZjViYzE1MGJmODkzMjI5ZTFmNTlkNjc0YWRhZDE3ZDI3Mzg1ZTM0NzBjNGNmJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.irHQizDMaMrvuSDE9Aqf5swZG7BCebiMohDnE1btF-c" width="100" /> |
|                                                                                                                                                                                                                                                                                                                                                                                                 [@skygoeu](https://github.com/skygoeu)                                                                                                                                                                                                                                                                                                                                                                                                 |                                                                                                                                                                                                                                                                                                                                                                                                [@Heee3333](https://github.com/Heee3333)                                                                                                                                                                                                                                                                                                                                                                                                |
