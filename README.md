# Toucheese-FE

<img src='https://github.com/user-attachments/assets/e004498a-a77b-4453-bbed-79d4de958884' />

### 다양한 스튜디오를 한 곳에서 모아보고 비교하며 간편하게 예약할 수 있는 스튜디오 예약 플랫폼

<br />

[터치즈 방문하기](https://toucheese-flash.store/)

```
id : toucheese@gmail.com
pw : 1q2w3e4r1!
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

<br />

### 3. 이슈 관리 및 코드 리뷰

- `GitHub Issues`를 통해 개발 이슈와 기능 단위의 작업 현황을 관리

  - **How?**

    - 스프린트별 마일스톤을 생성하고, 이슈 번호로 branch를 생성해 개발 진행, 스토리 별 명확한 이슈 템플릿과 라벨링으로 작업 우선순위 설정 및 가시성 확보
    - 스토리별 명확한 이슈 템플릿과 라벨링으로 작업 우선순위 설정 및 가시성 확보

  - **Why?**

    - 해당 이슈가 어떤 스프린트에 진행된 작업인지 명시, 각 이슈별 작업이 어떻게 진행되고 있는지 파악하기 용이

  - **Result?** - 작업 진행 상황을 빠르게 팔로우하고, 팀원별 작업 내용을 세부적으로 파악할 수 있었음
    <br />

- `GitHub Pull Requests`를 활용하여 모든 코드에 대해 동료 간 상호 코드 리뷰 진행

  - **How?**
    - `Pull Request` 템플릿을 생성하여 작업 내용에 대해 상세한 설명 작성, 팀원 모두 `Pull Request`에 대한 리뷰를 승인해야 dev 브랜치로 병합할 수 있도록 branch 조건 설정
  - **Why?**
    - 코드 리뷰를 통해 불필요한 코드나 성능 개선이 필요한 부분을 발견하기 용이, 코드의 일관성이나 컨벤션 유지
  - **Result?**
    - 본인 담당 작업이 아니더라도 전체적으로 내용에 대해 이해하고, 새롭게 적용된 기술을 파악할 수 있었음, 좀 더 나은 코드에 대해 함께 고민할 수 있었음

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

|                                                                                                                                                           | View                                                                                                              | Components                                                                                                                         |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------: | ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| [**지민**](https://github.com/TEAM-FLASH/Toucheese-FE/wiki/%EC%A7%80%EB%AF%BC-%E2%80%90-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EC%9D%B4%EB%AF%B8%EC%A7%80) | 스튜디오 검색<br />스튜디오 예약 - 결제<br />마이페이지 - 예약 상세                                               | 카카오 지도 및 공유<br />이미지 스와이퍼<br />모바일 헤더                                                                          |
| [**우중**](https://github.com/TEAM-FLASH/Toucheese-FE/wiki/%EC%9A%B0%EC%A4%91-%E2%80%90-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EC%9D%B4%EB%AF%B8%EC%A7%80) | 스튜디오 상세 - 리뷰<br />스튜디오 상세 - 이미지 모아보기<br />이메일 / 카카오 로그인<br />마이페이지 - 리뷰 작성 | 리뷰 컴포넌트<br />가격 필터링 컴포넌트<br />매장 옵션 컴포넌트<br />별점 입력 컴포넌트<br />인풋 컴포넌트                         |
| [**경민**](https://github.com/TEAM-FLASH/Toucheese-FE/wiki/%EA%B2%BD%EB%AF%BC-%E2%80%90-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EC%9D%B4%EB%AF%B8%EC%A7%80) | 스튜디오 상세 - 메뉴<br />스튜디오 상세 - 메뉴 상세<br />마이페이지                                               | 바텀시트<br />스튜디오 예약 하단 고정 버튼<br />예약 카드                                                                          |
| [**소정**](https://github.com/TEAM-FLASH/Toucheese-FE/wiki/%EC%86%8C%EC%A0%95-%E2%80%90-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EC%9D%B4%EB%AF%B8%EC%A7%80) | 스튜디오 상세 - 포트폴리오<br />스튜디오 예약 - 시간 조회 및 선택<br />마이페이지 - 예약 취소                     | masonry 레이아웃<br />모달<br />딤 모달 내 스와이퍼<br />캘린더 및 시간 선택<br />로딩 컴포넌트<br />에러 컴포넌트                 |
| [**희선**](https://github.com/TEAM-FLASH/Toucheese-FE/wiki/%ED%9D%AC%EC%84%A0-%E2%80%90-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EC%9D%B4%EB%AF%B8%EC%A7%80) | 스튜디오 상세 - 스튜디오 정보 메인<br />이메일 회원가입<br />간편 본인인증<br />유저 정보 및 계정 정보 변경       | 버튼 컴포넌트<br />필터 컴포넌트<br />정렬 및 지역 필터링 컴포넌트                                                                 |
| [**진욱**](https://github.com/TEAM-FLASH/Toucheese-FE/wiki/%EC%A7%84%EC%9A%B1-%E2%80%90-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EC%9D%B4%EB%AF%B8%EC%A7%80) | 홈<br />마이페이지 - 예약 내역                                                                                    | 스튜디오 목록<br />토스트 메시지<br />PC 헤더<br />북마크<br />스튜디오 상세 / 예약 상세 탭<br />스튜디오 조회 / 검색 결과 없음 UI |

<br />

---

## 화면 구성

### 1. 홈

#### 1) 홈

| PC  |                                                  모바일                                                   |
| :-: | :-------------------------------------------------------------------------------------------------------: |
|<img width="500" alt="image" src="https://github.com/user-attachments/assets/b998a6e2-17a5-40fa-8669-43cf16d11f23" />|<img width="200" src="https://github.com/user-attachments/assets/3608fbca-2bf0-4294-a3b6-13f5f4fd1a9e" /> |

#### 2) 지역/날짜 필터링

<table>
  <tr>
    <th align="center" colspan="2">PC</th>
    <th align="center">모바일</th>
  </tr>
  <tr>
    <td align="center">지역 선택</td>
    <td align="center">날짜 선택</td>
    <td align="center"rowspan="2"><img width="160" src="https://github.com/user-attachments/assets/9ebf5f83-0b19-45fc-8cb8-befde20a39c0" /></td>
  </tr>
  <tr>
    <td align="center"><img width="400" alt="image" src="https://github.com/user-attachments/assets/f9b5a976-406e-4e98-92e4-5060b914a002" /></td>
    <td align="center"><img width="400" alt="image" src="https://github.com/user-attachments/assets/29f71b82-441d-4762-9c23-025fc271b10a" /></td>
  </tr>
</table>

#### 3) 정렬 및 가격/매장옵션 필터링

| PC  |                                                  모바일                                                   |
| :-: | :-------------------------------------------------------------------------------------------------------: |
|<img width="500" alt="image" src="https://github.com/user-attachments/assets/a83e63f9-30e1-4da0-a284-70f7be7a46ca" />| <img width="200" src="https://github.com/user-attachments/assets/99efcf7d-73c2-43e0-94b4-e513dc7df9ab" /> |


### 2. 스튜디오 검색

| PC  |                                                  모바일                                                   |
| :-: | :-------------------------------------------------------------------------------------------------------: |
|<img width="500" alt="image" src="https://github.com/user-attachments/assets/9d09f748-cf58-49e6-a4e9-a1cb1200378e" />| <img width="200" src="https://github.com/user-attachments/assets/d2d84e1b-6229-4bc1-ae8a-a0405c9f57bf" /> |

### 3. 스튜디오 상세

#### 1) 홈

| PC  |                                                  모바일                                                   |
| :-: | :-------------------------------------------------------------------------------------------------------: |
|<img width="500" alt="image" src="https://github.com/user-attachments/assets/dc13657c-f287-4328-b93b-baaf39a03387" />| <img width="200" src="https://github.com/user-attachments/assets/a2b4ecaa-b910-4986-8948-03cce0399655" /> |

#### 2) 메뉴 및 메뉴 상세

| PC  |                                                  모바일                                                   |
| :-: | :-------------------------------------------------------------------------------------------------------: |
|<img width="500" alt="image" src="https://github.com/user-attachments/assets/ad491350-7616-4d15-aa29-36941d0958d0" />| <img width="200" src="https://github.com/user-attachments/assets/c34c66fb-10d8-4700-a0e1-80326d63139a" /> |

#### 3) 포트폴리오

| PC  |                                                  모바일                                                   |
| :-: | :-------------------------------------------------------------------------------------------------------: |
|<img width="500" alt="image" src="https://github.com/user-attachments/assets/a0149d59-e4bf-4557-8b52-66754879284c" />| <img width="200" src="https://github.com/user-attachments/assets/88fd287a-18b4-415b-92f4-34f21a812273" /> |

#### 4) 리뷰 및 리뷰 모아보기

| PC  |                                                  모바일                                                   |
| :-: | :-------------------------------------------------------------------------------------------------------: |
|<img width="500" alt="image" src="https://github.com/user-attachments/assets/fccf7935-bbe6-4dcd-adbe-c3965127fe3a" />| <img width="200" src="https://github.com/user-attachments/assets/d4a6be6e-fa46-4796-b8a7-954bab4ce63d" /> |

### 4. 스튜디오 예약

#### 1) 날짜 및 시간 선택

| PC  |                                                  모바일                                                   |
| :-: | :-------------------------------------------------------------------------------------------------------: |
|<img width="500" alt="image" src="https://github.com/user-attachments/assets/61e54482-e514-4782-b80c-766774f48d35" />| <img width="200" src="https://github.com/user-attachments/assets/9fccd30d-1d54-438a-b783-029477a70033" /> |

#### 2) 결제

| PC  |           모바일           |
| :-: | :------------------------: |
|<img width="500" alt="image" src="https://github.com/user-attachments/assets/28688ceb-954a-4f4b-b29c-6cfdadfd0d0b" />| <img width="200" src="" /> |

#### 3) 예약 상세

| PC  |                                                  모바일                                                   |
| :-: | :-------------------------------------------------------------------------------------------------------: |
|<img width="500" alt="image" src="https://github.com/user-attachments/assets/66540d9c-0fe9-47ab-bc26-4a02e9f5e5d8" />| <img width="200" src="https://github.com/user-attachments/assets/b81cc580-a545-4f8f-8e46-ad1e052d9073" /> |

#### 4) 예약 취소

| PC  |                                                  모바일                                                   |
| :-: | :-------------------------------------------------------------------------------------------------------: |
|<img width="500" alt="image" src="https://github.com/user-attachments/assets/b3d2de98-9a04-4515-ad1d-f9dc1bf0d705" />| <img width="200" src="https://github.com/user-attachments/assets/cbed39ac-7bb4-44bb-beaf-5a562b0a9315" /> |

### 5. 로그인 및 회원가입

#### 1) 이메일 회원가입

| PC  |                                                  모바일                                                   |
| :-: | :-------------------------------------------------------------------------------------------------------: |
|<img width="500" alt="image" src="" />| <img width="200" src="https://github.com/user-attachments/assets/b81cc580-a545-4f8f-8e46-ad1e052d9073" /> |

#### 2) 이메일 로그인

| PC  |                                                  모바일                                                   |
| :-: | :-------------------------------------------------------------------------------------------------------: |
|<img width="500" alt="image" src="https://github.com/user-attachments/assets/0ca3ebc4-5e4c-431a-9b49-7679ec25345d" />| <img width="200" src="https://github.com/user-attachments/assets/afb8805a-1a7d-45e9-92b8-cd0bed75f327" /> |

#### 3) 카카오 로그인

| PC  |           모바일           |
| :-: | :------------------------: |
|<img width="500" alt="image" src="" />| <img width="200" src="https://github.com/user-attachments/assets/6a3e7fc0-a983-4925-b3d4-69e06c6d36be" /> |

#### 4) 구글 로그인

| PC  |           모바일           |
| :-: | :------------------------: |
|<img width="500" alt="image" src="" />| <img width="200" src="https://github.com/user-attachments/assets/b3297812-23a8-4697-8fc1-1830c491c4c2" /> |

### 6. 마이페이지

#### 1) 마이페이지

| PC  |                                                  모바일                                                   |
| :-: | :-------------------------------------------------------------------------------------------------------: |
|<img width="500" alt="image" src="https://github.com/user-attachments/assets/2c08bb5e-4e96-4c5e-8f11-db353755350d" />| <img width="200" src="https://github.com/user-attachments/assets/8002d394-8a24-4854-bd06-9aa6d8bd266f" /> |

#### 2) 예약 내역

| PC  |                                                  모바일                                                   |
| :-: | :-------------------------------------------------------------------------------------------------------: |
|<img width="500" alt="image" src="https://github.com/user-attachments/assets/a9f51cb1-26e3-47d8-afd8-704458a16f8d" />| <img width="200" src="https://github.com/user-attachments/assets/6b0f19ec-4627-4c6f-ab06-9d27c50ae03e" /> |

#### 3) 내 리뷰

| PC  |                                                  모바일                                                   |
| :-: | :-------------------------------------------------------------------------------------------------------: |
|<img width="500" alt="image" src="https://github.com/user-attachments/assets/8c7abcba-df79-414f-90d8-a8c73e41eb23" />| <img width="200" src="https://github.com/user-attachments/assets/a2da6a67-3e70-4996-85e9-c6a4193ed406" /> |

#### 4) 리뷰 작성

| PC  |           모바일           |
| :-: | :------------------------: |
|<img width="500" alt="image" src="" />| <img width="200" src="" /> |

#### 5) 찜한 사진관

| PC  |                                                  모바일                                                   |
| :-: | :-------------------------------------------------------------------------------------------------------: |
|<img width="500" alt="image" src="https://github.com/user-attachments/assets/a85fdc8e-367d-4679-a5e7-0d1d524cea04" />| <img width="200" src="https://github.com/user-attachments/assets/b580b1fd-b181-4186-90ce-449d51f95aa9" /> |

#### 6) 내 정보 관리

| PC  |           모바일           |
| :-: | :------------------------: |
|<img width="500" alt="image" src="" />| <img width="200" src="" /> |

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

|                                                  박지민                                                   |                                                  윤우중                                                   | 이경민                                                                                                                                         |
| :-------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/user-attachments/assets/1f23014b-8dc4-4d80-9e1d-87c773b52fd1" width="100" /> | <img src="https://github.com/user-attachments/assets/4324dba3-563c-477b-b160-b3ebe9444899" width="100" /> | <img src="https://github.com/user-attachments/assets/19a938da-84f1-4d4b-aac9-ba85b54fd73b" width="62" style="display: flex;margin: 0 auto;" /> |
|                                  [@aksenmi](https://github.com/aksenmi)                                   |                             [@woojoung1217](https://github.com/woojoung1217)                              | [@kyungmim](https://github.com/kyungmim)                                                                                                       |

|                                                       이소정                                                        |                                                       전희선                                                        | 정진욱                                                                                                             |
| :-----------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/ChatNull/frankmap/assets/84115816/8d17df8e-0da1-4c92-863a-da87705460ec" width="100" /> | <img src="https://github.com/ChatNull/frankmap/assets/84115816/3e777bdf-5e7f-47e3-a0dd-afe0a2fed078" width="100" /> | <img src="https://github.com/ChatNull/frankmap/assets/84115816/b9cd199b-61df-403b-a2c5-28ec85f5ae35" width="100"/> |
|                                       [@s0zzang](https://github.com/s0zzang)                                        |                                    [@HuiseonDev](https://github.com/HuiseonDev)                                     | [@JWJung-99](https://github.com/JWJung-99)                                                                         |

---

### 2. 백엔드

|                                                  고기욱                                                   |
| :-------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/user-attachments/assets/a7fd80bb-fd33-4121-af6b-cd0b67ddfd78" width="100" /> |
|                                   [@kokiuk](https://github.com/kokiuk)                                    |

---

### 3. 디자이너

|                                                  김고은                                                   |                                                  홍지희                                                   |
| :-------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/user-attachments/assets/9827009f-6494-4940-8253-33433e79928f" width="100" /> | <img src="https://github.com/user-attachments/assets/4a5784de-3510-49ea-9df5-13e6ff045579" width="100" /> |
|                                  [@skygoeu](https://github.com/skygoeu)                                   |                                 [@Heee3333](https://github.com/Heee3333)                                  |
