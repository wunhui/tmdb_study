# boilerplate-next-website

웹사이트 보일러 플레이트 프로젝트

## 프로젝트 소개

이 프로젝트는 Nextjs를 기반으로 한 웹사이트 보일러 플레이트입니다. 기본적인 설정과 구조가 포함되어 있어, 빠르게 웹사이트를 개발할 수 있도록 돕습니다.

## 주요 기능

-   Nextjs 기반의 SSR(서버 사이드 렌더링) 지원
-   React Query를 사용한 데이터 페칭 및 캐싱
-   커스텀 훅을 이용한 상태 관리
-   공통 컴포넌트 및 유틸리티 함수 제공
-   Framer Motion을 이용한 애니메이션 효과
-   환경 변수 관리 및 API 호출 설정
-   git action을 활용한 CI/CD 자동배포

## 설치 및 실행 방법

### 사전 요구사항

-   Node.js (>=16.14.1)
-   npm 또는 yarn

### 설치

프로젝트를 클론한 후, 필요한 패키지를 설치합니다.

```bash
git clone https://github.com/yourusername/boilerplate-next-website.git
cd boilerplate-next-website
npm install
# 또는
yarn install
```

### 실행

npm run dev

## 프로젝트 설명

### 프로젝트 구조

```
├── /api
│   └── api.js
├── /components
│   ├── /common
│   │   ├── BtnLoader.jsx
│   │   ├── Form.jsx
│   │   ├── PageMenuArea.jsx
│   │   ├── PageFooterArea.jsx
│   │   ├── PageHeaderArea.jsx
│   │   ├── Pagination.jsx
│   │   └── WebSeo.jsx
│   ├── /layout
│   │   ├── Alert.js
│   │   ├── Overlay.jsx
│   │   ├── PageLayout.jsx
│   │   └── Tab.jsx
│   ├── /portals
│   │   └── ModalFindAddress.jsx
│   └── /svg
│       └── Icons.jsx
├── /constants
│   ├── colors.js
│   └── globalConstants.js
├── /lib
│   ├── errorHandler.js
│   └── renderHelper.js
├── /pages
├── /public
├── /queries
├── /screens
├── /store
├── /utils
│   ├── hooks.js
│   └── util.js
├── .env
├── .prettierrc.js
├── .jsconfig.json
├── .next-sitemap.config.js
└── README.md
```

### 항목 설명

#### /api

-   [api.js](api/api.js): `fetch` 기반 기본적인 API 요청을 선언하는 파일입니다.

#### /components

-   **/common**: 자주 사용되는 공통 컴포넌트들을 포함합니다.

    -   [BtnLoader.jsx](components/common/BtnLoader.jsx): 버튼 내에 로딩 애니메이션을 추가하는 컴포넌트입니다.
    -   [Form.jsx](components/common/Form.jsx): `input`, `radio`, `checkbox`, `select` 등 다양한 폼 요소를 커스텀하여 사용할 수 있는 컴포넌트입니다.
    -   [PageMenuArea.jsx](components/common/PageMenuArea.jsx): 페이지의 상단 메뉴 영역을 구성하는 컴포넌트로, 반응형 처리가 되어 있습니다.
    -   [PageFooterArea.jsx](components/common/PageFooterArea.jsx): 사이트 하단에 위치하는 푸터 컴포넌트입니다.
    -   [PageHeaderArea.jsx](components/common/PageHeaderArea.jsx): 페이지의 헤더 영역을 구성하는 컴포넌트로, 데스크톱과 모바일을 조건부로 렌더링합니다.
    -   [Pagination.jsx](components/common/Pagination.jsx): 게시물 목록의 페이지네이션을 처리하는 컴포넌트입니다.
    -   [WebSeo.jsx](components/common/WebSeo.jsx): 각 페이지의 메타태그를 설정하여 SEO를 최적화하는 컴포넌트입니다.

-   **/layout**: 레이아웃 관련 컴포넌트를 포함합니다.

    -   [Alert.js](components/layout/Alert.js): `SweetAlert` 기반의 커스텀 알럿 컴포넌트입니다. `success`, `error`, `warning`, `question`의 static 옵션을 활용할 수 있습니다.
    -   [Overlay.jsx](components/layout/Overlay.jsx): 포탈을 활용한 커스텀 모달 컴포넌트입니다.
    -   [PageLayout.jsx](components/layout/PageLayout.jsx): `_app.js`에서 각 페이지를 렌더링할 때 기본적으로 적용되는 레이아웃 컴포넌트입니다.
    -   [Tab.jsx](components/layout/Tab.jsx): 탭 형태의 레이아웃을 생성하는 공통 컴포넌트입니다.

-   **/portals**: 포탈 관련 컴포넌트를 포함합니다.

    -   [ModalFindAddress.jsx](components/portals/ModalFindAddress.jsx): `카카오 주소 찾기 API`를 활용한 모달 컴포넌트입니다.

-   **/svg**: `SVG` 형태의 아이콘을 포함하는 컴포넌트입니다.
    -   [Icons.jsx](components/svg/Icons.jsx): 여러 `SVG` 아이콘들을 모아둔 컴포넌트로, `props`를 통해 색상과 방향 등을 조정할 수 있습니다.

#### /constants

-   [colors.js](constants/colors.js): 프로젝트 전반에서 사용하는 색상 변수를 선언한 파일입니다.
-   [globalConstants.js](constants/globalConstants.js): 사이트 전체에서 사용하는 상수 값을 선언한 파일입니다.

#### /lib

-   [errorHandler.js](lib/errorHandler.js): 컴포넌트 트리에서 발생하는 오류를 처리하는 로직을 포함합니다.
-   [renderHelper.js](lib/renderHelper.js): 쿼리 설정값과 쿼리 클라이언트 프리패칭 설정 등을 포함하는 헬퍼 함수입니다.

#### /pages

-   `Nextjs`의 라우팅을 담당하는 디렉토리로, 각 파일이 하나의 라우트로 매핑됩니다.

#### /public

-   정적 파일들을 포함하는 디렉토리입니다. 이미지, 폰트, 정적 자원 등이 여기에 위치합니다.

#### /queries

-   `React Query`의 쿼리 함수들을 포함하는 디렉토리입니다.

#### /screens

-   프로젝트의 주요 화면(페이지) 컴포넌트들을 포함합니다.

#### /store

-   상태 관리를 위한 파일들을 포함합니다. 예: `zustand` 설정 파일 등.

#### /utils

-   유틸리티 함수들을 포함합니다. 공통으로 사용될 만한 헬퍼 함수들이 여기에 위치합니다.
    -   [hooks.js](utils/hooks.js): 커스텀 훅들을 모아둔 파일입니다.
    -   [util.js](utils/util.js): 공통적으로 사용되는 함수들을 모아둔 파일입니다.

#### .env

-   환경 변수 파일로, 프로젝트에서 사용하는 `API 키`나 비밀 값을 여기에 저장합니다.
-   `development`, 'production' 환경이 있습니다.

#### .prettierrc.js

-   코드 스타일을 정의하는 `Prettier` 설정 파일입니다.

#### .jsconfig.json

-   `JavaScript` 프로젝트의 설정 파일로, 경로 별칭(`alias`) 등을 설정할 수 있습니다.

#### .next-sitemap.config.js

-   `Nextjs` 사이트맵을 생성하는 설정 파일입니다.

#### README.md

-   프로젝트의 개요, 설치 및 실행 방법, 주요 기능 등을 설명하는 파일입니다.

## 배포 환경 설명

### GitHub Actions 설정

GitHub Actions를 이용하여 자동 배포를 설정합니다. [`.github/workflows/deplay.yml`](.github/workflows/deploy.yml) 파일에 주석처리 된 배포 파이프라인을 적절하게 수정합니다.

#### GitHub Actions 환경 변수 설정

GitHub Repository의 `Settings > Secrets and variables > Actions`에서 배포에 필요한 변수를 설정합니다.

-   `AWS_ACCESS_KEY_ID`: AWS 액세스 키 ID
-   `AWS_REGION_NAME`: AWS 리전 이름
-   `AWS_S3_BUCKET_NAME_PRODUCT`: 프로덕션용 S3 버킷 이름
-   `AWS_S3_BUCKET_NAME_STAGING`: 스테이징용 S3 버킷 이름
-   `AWS_SECRET_ACCESS_KEY`: AWS 비밀 액세스 키
-   `CLOUDFRONT_DISTRIBUTION_ID`: CloudFront 배포 ID

Git Commit 시 Branch Name(`master`, `stage`)에 따라 Production 환경과 Staging 환경에 자동 배포됩니다.

#### 잔디 웹훅 설정

iandna GitHub에 생성된 Repository는 잔디 메신저의 `잔디 커넥트 > 연동 항목 추가하기 > GitHub 연동하기`에서 Repository 선택을 통해 쉽게 연동할 수 있습니다.

#### 구글 애널리틱스 설정

[`_app.js`](pages/_app.js)파일에서 주석 처리된 구글 애널리틱스 관련 항목(주석참고)을 주석 해제 후 적용합니다.

#### sitemap.xml/robots.txt 설정

배포/빌드 시 [`next-sitemap.config.js`](next-sitemap.config.js)파일을 통해 public 폴더에 sitemap.xml, robots.txt 파일이 자동 생성됩니다.

#### 네이버 서치 어드바이저 설정

Production 환경의 배포가 가능한 시점에서 네이버 서치 어드바이저 설정을 진행합니다. [`네이버 서치 어드바이저 바로가기`](https://searchadvisor.naver.com/)

네이버 서치 어드바이저 사이트 소유확인을 위해 다음 두가지 중 하나의 방법을 선택하여 진행합니다.

-   HTML 업로드

    1.  네이버 서치 어드바이저 사이트 소유확인 페이지에서 다운받을 수 있는 `UNIQUE_CODE`.html 파일을 다운받아 프로젝트의 root 디렉토리에 업로드 합니다.
    2.  BASE_PATH/`UNIQUE_CODE`.html 로 이동하여 업로드를 확인합니다.
    3.  네이버 서치 어드바이저 사이트 소유확인 페이지에서 소유확인 버튼을 클릭합니다.

-   메타태그 추가

    1.  네이버 서치 어드바이저 사이트 소유확인 페이지에서 확인 가능한 메타태그를 복사하여 components/common/WebSeo.jsx 문서의 Head 태그 내에 붙여넣어줍니다. ` <meta name="naver-site-verification" content="``UNIQUE_CODE``" /> `
    2.  네이버 서치 어드바이저 사이트 소유확인 페이지에서 소유확인 버튼을 클릭합니다.
# tmdb_study
