# AORR.md

## 개인 프로페셔널 웹사이트 + Games(지렁이 게임) 개발 AORR 상태 머신 설계

이 문서는 **GitHub Pages에서 실행 가능한 정적 웹사이트**를 만들기 위한 개발 업무를
AORR(Act-Observe-Reason-Repeat) 상태 머신으로 설계한 문서다.

범위:
- 정적 웹사이트만 사용
- 백엔드 서버 없음
- HTML / CSS / JavaScript로만 동작
- 최종 산출물은 최소 다음 파일을 루트에 포함해야 함
  - `index.html`
  - `styles.css`
  - `script.js`
  - 게임 구현에 필요한 JavaScript 파일 또는 `script.js` 내부 게임 코드

제약:
- 아직 코드를 수정하거나 테스트하거나 배포하지 않음
- 이 문서는 설계 전용
- 불확실한 내용은 `[사람 확인 필요]`로 표시

---

## 1. Target

### 1-1. 프로페셔널 웹사이트 개발 목표
- 개인 프로페셔널 웹사이트를 구축한다.
- 방문자가 짧은 시간 안에 다음을 이해할 수 있어야 한다.
  - 누구인지
  - 어떤 일을 하는지
  - 어떤 프로젝트/경험이 있는지
  - 어떻게 연락할 수 있는지
- 정적 웹사이트이므로 GitHub Pages에서 바로 호스팅 가능해야 한다.
- 유지보수가 쉬운 단순한 파일 구조를 우선한다.

### 1-2. GitHub Pages 배포 목표
- GitHub Pages에서 정상적으로 렌더링되어야 한다.
- 루트 기준 정적 파일 경로가 깨지지 않아야 한다.
- 별도 서버 기능 없이 브라우저에서 동작해야 한다.
- 기본 진입점은 `index.html` 이어야 한다.

### 1-3. 입력 자료
- 개인 이름 / 닉네임 `[사람 확인 필요]`
- 한 줄 소개 `[사람 확인 필요]`
- 직무/관심 분야 `[사람 확인 필요]`
- 경력/프로젝트 목록 `[사람 확인 필요]`
- 연락처 공개 범위 `[사람 확인 필요]`
- GitHub, LinkedIn 등 외부 링크 `[사람 확인 필요]`
- 디자인 톤 (미니멀/모던/실험적 등) `[사람 확인 필요]`
- 게임 탭 강조 수준 (메인 기능/서브 기능) `[사람 확인 필요]`
- 지렁이 게임 추가 기능 여부 `[사람 확인 필요]`

### 1-4. 필수 페이지와 섹션
최소 권장 단일 페이지 섹션:
- Header / Navigation
- Hero (이름, 소개, CTA)
- About
- Projects or Experience
- Contact
- Games

선택 섹션:
- Skills
- Resume 링크
- Footer

### 1-5. Games 탭 및 지렁이 게임 요구사항
필수 요구사항:
- 상단 내비게이션에 `Games` 탭 존재
- Games 탭으로 게임 영역 접근 가능
- 키보드 조작 지원
- 모바일 터치 조작 지원
- 브라우저에서 즉시 실행 가능
- 정적 자원만 사용

기본 게임 요구사항:
- 지렁이(스네이크) 이동
- 먹이 생성
- 점수 증가
- 벽 또는 자기 자신 충돌 처리
- 시작 / 재시작 가능

추가 기능:
- Step 1에서 `[게임 추가 기능:]`에 대한 구체 입력은 제공되지 않음
- 따라서 현재 문서에서는 추가 기능을 추측하지 않음
- `[사람 확인 필요]`: 속도 증가, 최고 점수, 일시정지, 사운드, 난이도 선택, 진동 피드백 여부

### 1-6. 데스크톱 및 모바일 완료 기준
데스크톱 완료 기준:
- 1280px 전후 화면에서 레이아웃이 안정적임
- 내비게이션 사용 가능
- 콘텐츠 가독성 확보
- 게임이 키보드로 조작 가능
- 콘솔 오류 없음

모바일 완료 기준:
- 360px~430px 전후 화면에서 레이아웃이 깨지지 않음
- 메뉴 접근 가능
- 텍스트가 확대 없이 읽힘
- 게임이 터치로 조작 가능
- 가로 스크롤 없음

---

## 2. Act

### 2-1. 한 번의 개발 루프에서 수행할 최소 작업
한 번의 루프는 다음 원칙을 따른다.
- 정확히 하나의 작은 목표만 다룬다.
- 하나의 실패 원인만 수정한다.
- 가능한 한 최소 파일만 변경한다.
- 변경 후 즉시 동일한 검증 절차로 확인 가능해야 한다.

예:
- `index.html`에 Games 섹션 뼈대 추가
- `styles.css`에서 모바일 내비게이션 레이아웃만 수정
- `script.js`에서 키보드 입력 버그만 수정

### 2-2. 수정 가능한 파일 범위
수정 가능한 기본 범위:
- `index.html`
- `styles.css`
- `script.js`
- 게임 코드 분리 시 `game.js`, `controls.js` 등 추가 JS 파일
- 정적 이미지/아이콘 파일
- 문서 파일 (`README.md`, `AORR.md`)은 필요 시 보조적으로만 수정

### 2-3. 생성할 수 있는 파일
기본 필수 파일:
- `index.html`
- `styles.css`
- `script.js`

선택 생성 가능 파일:
- `game.js`
- `touch-controls.js`
- `assets/*`
- `favicon.ico`

단, 불필요한 빌드 시스템/백엔드 파일은 만들지 않는다.

### 2-4. 실행 가능한 로컬 검증 명령어
설계 기준 권장 verifier 예시:

```bash
python3 -m http.server 8000
```

```bash
php -S localhost:8000
```

```bash
npx serve .
```

정적 검사용 보조 명령 예시:

```bash
ls -la
```

```bash
find . -maxdepth 2 -type f | sort
```

```bash
grep -n "Games" index.html
```

브라우저 수동 검증 대상 URL 예시:

```text
http://localhost:8000/
```

주의:
- 현재 단계에서는 위 명령을 **실행하지 않고**, 이후 개발 루프에서 verifier 후보로 사용한다.

---

## 3. Observe

각 루프에서 다음을 관찰한다.

### 3-1. 파일 생성 여부
- 필수 파일 존재 여부
- 참조 경로 일치 여부
- HTML에서 CSS/JS가 올바르게 연결되었는지

### 3-2. HTML, CSS, JavaScript 오류
- HTML 구조 누락 여부
- CSS 선택자/레이아웃 문제
- JavaScript 문법 오류
- 이벤트 연결 실패 여부

### 3-3. 로컬 웹서버 응답
- 정적 서버에서 `200 OK`로 페이지가 열리는지
- JS/CSS 파일이 404 없이 로드되는지

### 3-4. 브라우저 콘솔 오류
- `Uncaught` 에러 여부
- 경로 오류 여부
- DOM 선택 실패 여부
- 게임 초기화 오류 여부

### 3-5. 데스크톱 및 모바일 화면
- 데스크톱에서 시각적 균형 유지 여부
- 모바일에서 줄바꿈/오버플로우 여부
- 헤더/메뉴/게임 영역이 화면에 맞는지

### 3-6. 키보드 및 터치 게임 조작
- 방향 전환 가능 여부
- 반대 방향 즉시 전환 제한 여부
- 터치 입력과 페이지 스크롤 충돌 여부
- 게임 오버/재시작 UX 명확성

### 3-7. GitHub Pages 호환성
- 상대 경로 사용 여부
- 서버 전용 기능 미사용 여부
- 빌드 산출물 없이 정적 파일만으로 실행 가능한지

---

## 4. Reason

실패 원인은 아래 분류 중 하나로만 식별한다.

| 분류 | 기준 |
|---|---|
| HTML_STRUCTURE | 섹션 누락, DOM 구조 오류, 잘못된 링크/참조, 접근 불가능한 마크업 |
| CSS_RESPONSIVE | 모바일 깨짐, 오버플로우, 정렬 붕괴, 브레이크포인트 문제 |
| JAVASCRIPT | 일반 JS 문법/실행 오류, DOM 이벤트 연결 실패 |
| GAME_LOGIC | 이동, 먹이, 충돌, 점수 계산 등 게임 규칙 자체 문제 |
| GAME_CONTROL | 키보드/터치 입력 처리 문제, 스크롤 충돌, 입력 반응 오류 |
| CONTENT | 이름/소개/프로젝트/연락처 등 콘텐츠 부정확 또는 미확정 |
| TEST | 검증 절차 누락, 재현 불가능, 체크리스트 불완전 |
| ENVIRONMENT | 로컬 서버 미실행, 브라우저 차이, 파일 경로/OS 환경 문제 |
| GITHUB_PERMISSION | 저장소 접근권, push 권한, Pages 설정 접근권 문제 |
| DEPLOYMENT | Pages 미반영, 잘못된 브랜치/폴더, 배포 후 자산 로드 문제 |
| UNKNOWN | 위 기준으로도 분류 불가 |

분류 원칙:
- 한 실패는 우선 하나의 대표 카테고리만 부여
- 다중 원인처럼 보이더라도 가장 선행 원인을 우선 기록

---

## 5. Repeat

반복 원칙:
1. 한 번에 하나의 실패 원인만 수정한다.
2. 관련된 최소 파일만 변경한다.
3. 수정 후 동일한 verifier를 다시 실행한다.
4. 기존에 통과한 기능에 대한 회귀 테스트를 함께 수행한다.

회귀 테스트 최소 기준 예시:
- 내비게이션 링크 동작 유지
- Hero/콘텐츠 섹션 렌더링 유지
- 게임 시작 가능 유지
- 키보드 조작 유지
- 모바일 터치 UI 유지
- 콘솔 에러 재발생 여부 확인

---

## 6. Stop

다음 조건 중 하나에 해당하면 현재 루프 또는 전체 작업을 멈춘다.

- 전체 테스트가 통과한 경우
- 최대 Retry에 도달한 경우
- 동일한 오류 fingerprint가 2회 반복된 경우
- 개인정보나 콘텐츠 확인이 필요한 경우
- GitHub 인증 또는 배포 권한 문제가 발생한 경우

권장 제한:
- 루프별 최대 Retry: 3
- 동일 fingerprint 반복 2회 시 `HITL_REQUIRED` 또는 `BLOCKED` 전환 검토

---

## 7. Human-in-the-loop

다음 상황에서는 반드시 사람 확인을 요청한다.

- 이름, 소개, 경력, 프로젝트, 연락처 등 개인 콘텐츠가 불명확한 경우
- 기존 콘텐츠 삭제가 필요한 경우
- 외부 분석 도구나 외부 서비스를 추가해야 하는 경우
- GitHub 저장소 설정을 변경해야 하는 경우
- 요구사항이 충돌하는 경우
- 게임 범위가 확장되는 경우 (예: 최고 점수 저장, 사운드, 멀티페이지 구조)

표기 규칙:
- 불명확한 항목은 `[사람 확인 필요]`
- 사람이 답해야 진행 가능한 상태는 `HITL_REQUIRED`
- 권한/환경으로 중단되면 `BLOCKED`

---

## 8. 상태 정의

| 상태 | 의미 |
|---|---|
| READY | 아직 시작 전, 입력과 목표가 정의된 상태 |
| ACTING | 현재 파일 생성/수정 작업 수행 중인 상태 |
| VERIFYING | 로컬 검증 또는 브라우저 검증 절차 수행 상태 |
| RETRYING | 실패 원인을 특정하고 최소 수정 후 재시도하는 상태 |
| PASSED | 해당 루프의 종료 기준을 충족한 상태 |
| DEPLOY_READY | 전체 로컬 검증 통과, 배포 직전 상태 |
| DEPLOYING | GitHub Pages 반영 절차 수행 중인 상태 |
| DEPLOYED | Pages 반영까지 확인된 상태 |
| BLOCKED | 권한, 환경, 설정 등으로 진행 불가 상태 |
| HITL_REQUIRED | 사람의 콘텐츠/판단/확인이 필요해 대기하는 상태 |

---

## 9. 루프별 AORR 상태 머신 표

아래 표는 전체 개발 업무를 작은 루프로 나눈 것이다.

### 표: 개발 루프 설계

| 루프 | 입력 | Act | Observe | 출력 | 테스트 기준 | 다음 상태 |
|---|---|---|---|---|---|---|
| 저장소 및 기존 파일 확인 | 저장소 루트, 기존 파일 목록, 브랜치 정보 | 필수 파일 존재 여부 확인 계획 수립, 기존 구조 파악 | 루트 파일 목록, 기존 `index.html/styles.css/script.js` 존재 여부, 기존 충돌 파일 확인 | 현재 구조 인벤토리, 누락 파일 목록 | 루트 구조를 설명할 수 있고 삭제/보존 판단이 가능함 | `PASSED` 또는 `[사람 확인 필요]` 시 `HITL_REQUIRED` |
| 정적 사이트 기본 구조 | 인벤토리, 필수 산출물 요구사항 | `index.html`, `styles.css`, `script.js` 기준 구조 설계 | 파일 연결 관계, HTML skeleton, CSS/JS 링크 설계 적절성 | 정적 구조 초안 | 세 파일이 루트 기준으로 연결 가능한 구조여야 함 | `PASSED` → 프로페셔널 콘텐츠 영역 |
| 프로페셔널 콘텐츠 영역 | 이름/소개/프로젝트/연락처 자료 | Hero/About/Projects/Contact 섹션 텍스트 구조 설계 | 콘텐츠 누락, 과도한 추측 여부, 공개 범위 문제 | 콘텐츠 슬롯 정의, 미확정 필드 목록 | 필수 섹션이 있고 미확정 값은 `[사람 확인 필요]` 처리됨 | `PASSED` 또는 `HITL_REQUIRED` |
| 반응형 내비게이션 | 섹션 구조, 모바일 요구사항 | 헤더, 메뉴, 햄버거/단순 메뉴 구조 설계 | 작은 화면 메뉴 접근성, 링크 수 적절성 | 반응형 내비 설계안 | 360px와 데스크톱 모두에서 접근 가능한 메뉴 구조 설명 가능 | `PASSED` |
| Games 탭 | 메뉴 구조, 게임 위치 정책 | `Games` 탭 방식 설계(앵커/섹션/별도 페이지) | 프로페셔널 톤과 게임 탭의 균형, 접근성 | Games 탭 진입 UX 정의 | 1~2번 상호작용 내 게임 접근 가능 구조여야 함 | `PASSED` |
| 지렁이 게임 핵심 로직 | 게임 규칙 정의, 캔버스/DOM 방식 선택 `[사람 확인 필요 가능]` | 보드, 먹이, 충돌, 점수, 시작/재시작 로직 단위 설계 | 상태 모델 단순성, 정적 JS로 구현 가능 여부 | 게임 상태 머신 초안 | 브라우저만으로 구동 가능한 로직 단위가 정의됨 | `PASSED` |
| 키보드 조작 | 방향키/wasd 정책 | 입력 이벤트 처리 방식 설계, 반대방향 금지 정책 정의 | 입력 충돌, 반복 입력, 포커스 의존성 | 키보드 컨트롤 규칙 | 데스크톱에서 재현 가능한 방향 전환 규칙이 명확함 | `PASSED` |
| 모바일 터치 조작 | 모바일 UX 방향 `[사람 확인 필요: 스와이프/버튼]` | 터치 버튼 또는 스와이프 입력 방식 설계 | 페이지 스크롤과 충돌 여부, 오입력 위험 | 모바일 컨트롤 UX 정의 | 한 손 조작 가능하고 오입력 방지 전략이 설명됨 | `PASSED` 또는 `HITL_REQUIRED` |
| 게임 UI 및 점수 | 게임 상태 모델, 콘텐츠 디자인 톤 | 시작 버튼, 점수판, 게임오버, 재시작 UI 설계 | UI 복잡도, 본문과 게임 영역의 시각 충돌 | 게임 UI 와이어/구성안 | 사용자가 규칙을 텍스트 없이도 대부분 이해 가능 | `PASSED` |
| 접근성과 반응형 검증 | 전체 구조, 모바일/데스크톱 기준 | 검증 체크리스트 설계, 포커스/대비/스크롤 점검 항목 정의 | 텍스트 대비, 포커스 이동, 가로 스크롤, 터치 영역 | 검증 체크리스트 | 핵심 접근성/반응형 항목이 누락 없이 정의됨 | `PASSED` |
| GitHub Pages 호환성 검증 | 파일 구조, 상대 경로 원칙 | Pages 배포 전 정적 호환성 점검 절차 설계 | 절대 경로 문제, 서버 의존 기능 여부 | 배포 전 호환성 체크리스트 | GitHub Pages에서 깨질 만한 요소를 사전 식별 가능 | `PASSED` |
| 배포 | 로컬 검증 통과 결과, 저장소 권한, Pages 설정 접근권 | push/Pages 설정/반영 확인 절차 설계 | 권한 문제, 브랜치 문제, 루트 파일 문제 | 배포 절차서 | `DEPLOY_READY` 이후 수행 가능한 명확한 단계가 존재 | `DEPLOY_READY` → `DEPLOYING` → `DEPLOYED` 또는 `BLOCKED` |

---

## 10. 루프별 세부 AORR 규칙

### 10-1. 저장소 및 기존 파일 확인
- 초기 상태: `READY`
- Act 최소 단위:
  - 현재 루트 파일 목록 확인
  - 기존 `index.html`, `styles.css`, `script.js` 존재 여부 분류
- Observe:
  - 기존 파일 유지/대체 여부 판단에 필요한 정보만 수집
- 출력:
  - 인벤토리 요약
  - 삭제/덮어쓰기 필요 항목
- Stop/HITL:
  - 기존 중요한 콘텐츠가 있으면 `HITL_REQUIRED`

### 10-2. 정적 사이트 기본 구조
- 초기 상태: `READY`
- Act 최소 단위:
  - 세 파일 루트 배치 설계
  - HTML에서 CSS/JS 로드 경로 고정
- Observe:
  - 상대 경로만 사용하는지 확인
- 실패 분류 우선순위:
  - `HTML_STRUCTURE`
  - `ENVIRONMENT`

### 10-3. 프로페셔널 콘텐츠 영역
- 초기 상태: `READY`
- Act 최소 단위:
  - placeholder와 실제 콘텐츠 경계를 분리
- Observe:
  - 추측된 콘텐츠가 없는지 확인
- 실패 분류 우선순위:
  - `CONTENT`
  - `HTML_STRUCTURE`

### 10-4. 반응형 내비게이션
- 초기 상태: `READY`
- Act 최소 단위:
  - 메뉴 구조 하나만 설계
  - 애니메이션/복잡 인터랙션은 후순위
- Observe:
  - 360px, 768px, 1280px에서의 예상 동작 점검
- 실패 분류 우선순위:
  - `CSS_RESPONSIVE`
  - `HTML_STRUCTURE`
  - `JAVASCRIPT`

### 10-5. Games 탭
- 초기 상태: `READY`
- Act 최소 단위:
  - 탭 진입 방식 1개만 채택
- Observe:
  - 메인 정보구조를 해치지 않는지 점검
- 실패 분류 우선순위:
  - `HTML_STRUCTURE`
  - `CONTENT`

### 10-6. 지렁이 게임 핵심 로직
- 초기 상태: `READY`
- Act 최소 단위:
  - 위치 상태
  - 이동 tick
  - 충돌 처리
  - 먹이 처리
  - 점수 계산
- Observe:
  - 로직이 DOM/UI와 과하게 결합되지 않았는지 확인
- 실패 분류 우선순위:
  - `GAME_LOGIC`
  - `JAVASCRIPT`

### 10-7. 키보드 조작
- 초기 상태: `READY`
- Act 최소 단위:
  - 방향키 또는 WASD 정책 1회 정의
- Observe:
  - 반대 방향 즉시 전환 예외 처리 필요성
- 실패 분류 우선순위:
  - `GAME_CONTROL`
  - `JAVASCRIPT`

### 10-8. 모바일 터치 조작
- 초기 상태: `READY`
- Act 최소 단위:
  - 버튼형 또는 스와이프형 중 하나만 우선 채택
- Observe:
  - 게임 조작 시 스크롤 잠금 전략 필요성
- 실패 분류 우선순위:
  - `GAME_CONTROL`
  - `CSS_RESPONSIVE`
  - `JAVASCRIPT`
- HITL 조건:
  - 스와이프/버튼 선호 불명확 시 `HITL_REQUIRED`

### 10-9. 게임 UI 및 점수
- 초기 상태: `READY`
- Act 최소 단위:
  - 시작/점수/게임오버/재시작 중 우선순위 높은 UI만 추가
- Observe:
  - 시각적 복잡도 증가 여부
- 실패 분류 우선순위:
  - `GAME_LOGIC`
  - `HTML_STRUCTURE`
  - `CSS_RESPONSIVE`

### 10-10. 접근성과 반응형 검증
- 초기 상태: `READY`
- Act 최소 단위:
  - 수동 체크리스트 정의
- Observe:
  - 포커스, 대비, 스크롤, 버튼 크기
- 실패 분류 우선순위:
  - `CSS_RESPONSIVE`
  - `TEST`

### 10-11. GitHub Pages 호환성 검증
- 초기 상태: `READY`
- Act 최소 단위:
  - 상대 경로/정적 파일만 사용 여부 점검
- Observe:
  - Pages 환경에서 실패 가능성 사전 목록화
- 실패 분류 우선순위:
  - `DEPLOYMENT`
  - `ENVIRONMENT`

### 10-12. 배포
- 초기 상태: `DEPLOY_READY`
- Act 최소 단위:
  - push
  - Pages 설정 확인
  - 사이트 응답 확인
- Observe:
  - 404 여부
  - CSS/JS 로딩 여부
  - 게임 실행 여부
- 실패 분류 우선순위:
  - `GITHUB_PERMISSION`
  - `DEPLOYMENT`
- Stop/HITL:
  - 권한 문제 시 `BLOCKED`
  - 설정 변경 승인 필요 시 `HITL_REQUIRED`

---

## 11. 공통 Verifier 템플릿

각 루프에서 재사용 가능한 verifier 템플릿:

### 구조 검증
```bash
find . -maxdepth 2 -type f | sort
```

### 진입점 확인
```bash
grep -n "<title\|Games\|script\|stylesheet" index.html
```

### 로컬 정적 서버
```bash
python3 -m http.server 8000
```

### 브라우저 수동 검증 체크리스트
- 메인 페이지가 열린다.
- 레이아웃이 깨지지 않는다.
- 메뉴가 동작한다.
- Games 탭으로 접근 가능하다.
- 게임이 시작된다.
- 키보드 조작이 된다.
- 모바일 터치 조작이 된다.
- 콘솔 오류가 없다.

### GitHub Pages 사전 검증
- 상대 경로만 사용
- 파일명이 정확함
- 대소문자 불일치 없음
- 서버 전용 API 미사용

---

## 12. 가장 안전한 첫 번째 실행 루프 추천

가장 안전한 첫 번째 루프:
**저장소 및 기존 파일 확인**

이유:
- 현재 저장소가 비어 있는지, README만 있는지, 기존 페이지가 있는지 먼저 알아야 한다.
- 기존 콘텐츠를 실수로 덮어쓸 위험을 낮춘다.
- 이후 `정적 사이트 기본 구조` 루프를 최소 수정 범위로 진행할 수 있다.

첫 루프의 종료 기준:
- 현재 루트 파일 인벤토리가 정리됨
- 필수 파일 존재 여부가 명확함
- 덮어쓰기 위험이 있는 기존 파일이 식별됨
- 콘텐츠 삭제/보존 여부에서 사람이 답해야 할 항목이 있으면 `HITL_REQUIRED`

---

## 13. 현재 시점에서 사람 확인 필요 목록

- 사이트에 표시할 이름 `[사람 확인 필요]`
- 한 줄 소개 `[사람 확인 필요]`
- 프로젝트/경력 항목 `[사람 확인 필요]`
- 연락처 공개 범위 `[사람 확인 필요]`
- 디자인 톤 `[사람 확인 필요]`
- Games를 메인 강조 요소로 둘지 여부 `[사람 확인 필요]`
- 모바일 터치 방식: 버튼형 / 스와이프형 `[사람 확인 필요]`
- 게임 추가 기능 (최고 점수, 일시정지, 사운드 등) `[사람 확인 필요]`

---

## 14. 요약 상태 머신

```text
READY
  -> 저장소 및 기존 파일 확인
  -> PASSED
  -> 정적 사이트 기본 구조
  -> PASSED
  -> 프로페셔널 콘텐츠 영역
     -> HITL_REQUIRED 가능
  -> 반응형 내비게이션
  -> Games 탭
  -> 지렁이 게임 핵심 로직
  -> 키보드 조작
  -> 모바일 터치 조작
     -> HITL_REQUIRED 가능
  -> 게임 UI 및 점수
  -> 접근성과 반응형 검증
  -> GitHub Pages 호환성 검증
  -> DEPLOY_READY
  -> DEPLOYING
  -> DEPLOYED
```

오류 발생 시:
```text
VERIFYING -> Reason 분류 -> RETRYING -> 동일 verifier 재실행 -> PASSED 또는 STOP/BLOCKED/HITL_REQUIRED
```

---

이 문서는 설계용 기준 문서이며, 이후 실제 개발 루프를 수행할 때 각 단계의 verifier와 실패 분류 기준으로 사용한다.

---

## Self-Correcting TDD Loop

이 섹션은 현재 프로젝트의 `AORR.md`와 저장소 구조를 기준으로, **Verifier 중심의 Self-Correcting TDD 루프**를 정의한다.

범위:
- GitHub Pages에서 동작하는 정적 HTML/CSS/JavaScript 웹사이트
- 백엔드 없음
- 테스트/검증 우선 접근
- 한 번에 하나의 실패 원인만 수정
- 아직 이 단계에서는 **코드 수정이나 테스트 실행을 하지 않음**

### 1. 현재 환경에서 실제로 확인된 검증 도구

이 문서는 **실제로 현재 환경에 존재하거나 실행 가능한 도구만** verifier 후보로 사용한다.
임의의 npm 스크립트나 존재하지 않는 테스트 명령은 정의하지 않는다.

현재 확인된 도구:
- `python3`: 사용 가능 (`/usr/bin/python3`)
- `node`: 사용 가능 (`/home/moonsu/.nvm/versions/node/v24.14.0/bin/node`)
- `npm`: 사용 가능 (`/home/moonsu/.nvm/versions/node/v24.14.0/bin/npm`)
- `npx`: 사용 가능 (`/home/moonsu/.nvm/versions/node/v24.14.0/bin/npx`)
- `claude`: 사용 가능 (`/home/moonsu/.nvm/versions/node/v24.14.0/bin/claude`)
- `php`: 현재 확인 결과 경로 미출력, 사용 가능 여부 미확정

현재 저장소에서 확인된 파일:
- `AORR.md`
- `README.md`
- `.git/*`

즉, 현재 시점 기준으로는 아직 다음 파일이 없음:
- `index.html`
- `styles.css`
- `script.js`

이 상태를 기준으로 verifier는 **존재하는 파일/도구에 대한 점검**과, 이후 개발 단계에서 실행할 **검증 절차 정의**로 구성한다.

### 2. Claude Code CLI Verifier 정책

가능하면 Claude Code CLI를 **독립 Verifier**로 활용한다.

현재 확인된 사실:
- Claude Code CLI 설치 확인됨
- `claude --version` 결과: `2.1.208 (Claude Code)`
- 이전 interactive 확인에서는 `Sonnet 5`가 보였음

단, 본 단계에서는 실제 verifier 실행을 하지 않으므로 다음 정책으로 정의한다.

#### Claude Verifier Preflight
1. 실행 단계에서 먼저 Claude Code CLI 로그인/실행 가능 상태 확인
2. Sonnet 5 사용 가능 여부 확인
3. Sonnet 5 사용 가능 시 해당 모델 사용
4. 불가능하면 현재 사용 가능한 Sonnet 계열 모델 사용
5. 실제 사용 모델명을 로그에 기록

#### 기록 규칙
- 사용 모델: `Sonnet 5` 또는 실제 fallback Sonnet 모델명
- 확인 실패 시 원인 분류:
  - 인증/권한 문제면 `ENVIRONMENT` 또는 `GITHUB_PERMISSION`이 아니라 **Claude 실행 환경 문제이므로 `ENVIRONMENT`**
  - 모델 선택 불가만 발생하면 `ENVIRONMENT`

### 3. Verifier 중심 Self-Correcting TDD 루프 개요

```text
READY
  -> ACTING (최소 구현 또는 최소 수정)
  -> VERIFYING (정의된 verifier 실행)
  -> PASSED
  또는
  -> Reason 분류
  -> RETRYING (최소 수정)
  -> 동일 verifier 재실행
  -> PASSED / HITL_REQUIRED / BLOCKED / STOP
```

원칙:
- 구현보다 verifier를 먼저 정의한다.
- verifier는 실제 존재하는 도구로만 구성한다.
- 한 retry에서는 하나의 오류 원인만 수정한다.
- 기존에 통과한 verifier는 회귀 테스트에 포함한다.

### 4. 검증 범주별 Verifier 설계

#### 4-1. 기본 파일 검증

목표:
- 루트의 `index.html` 존재
- CSS 및 JavaScript 연결
- 잘못된 로컬 파일 경로 확인
- 대소문자 불일치 확인
- GitHub Pages에서 사용할 수 없는 절대 로컬 경로 확인

실행 가능한 verifier 후보:

```bash
find . -maxdepth 2 -type f | sort
```

```bash
grep -nE '<link|<script' index.html
```

```bash
grep -nE 'src="/|href="/|file://|C:\\|/home/|/Users/' index.html styles.css script.js
```

```bash
ls -la
```

관찰 항목:
- `index.html` 존재 여부
- `styles.css`, `script.js` 참조 여부
- 대소문자 다른 파일 참조 여부 (`Styles.css` vs `styles.css` 등)
- `file://`, `/home/...`, `/Users/...`, `C:\...` 등 로컬 절대 경로 여부

실패 분류:
- `HTML_STRUCTURE`
- `DEPLOYMENT`
- `ENVIRONMENT`

#### 4-2. HTML 검증

목표:
- 기본 문서 구조
- `title`, `meta viewport`
- 시맨틱 태그
- 내비게이션 링크
- Games 영역
- 이미지 `alt` 속성
- 깨진 내부 링크

실행 가능한 verifier 후보:

```bash
grep -nE '<!DOCTYPE html>|<html|<head>|<body>|</html>' index.html
```

```bash
grep -nE '<title>|meta name="viewport"' index.html
```

```bash
grep -nE '<header|<nav|<main|<section|<footer' index.html
```

```bash
grep -nE 'href="#' index.html
```

```bash
grep -n 'Games\|games' index.html
```

```bash
grep -n '<img ' index.html
```

수동/후속 관찰 규칙:
- `<img>`가 존재하면 각 이미지에 `alt=` 존재 여부 확인
- `href="#..."` 링크는 해당 `id="..."` 존재 여부와 대응 검사
- Games 탭이 있으면 실제 Games 영역이 존재해야 함

실패 분류:
- `HTML_STRUCTURE`
- `CONTENT`
- `TEST`

#### 4-3. CSS 검증

목표:
- 데스크톱 / 태블릿 / 모바일 화면 대응
- 가로 스크롤 여부
- 내비게이션 및 Games UI 반응형 동작

실행 가능한 verifier 후보:
- 정적 grep 기반 사전 점검:

```bash
grep -nE '@media|overflow-x|max-width|min-width|display:\s*flex|display:\s*grid' styles.css
```

- 브라우저 수동 검증 viewport 기준:
  - 모바일: 약 375px
  - 태블릿: 약 768px
  - 데스크톱: 약 1440px

관찰 항목:
- 메뉴 줄바꿈/겹침 여부
- Games 섹션 폭 초과 여부
- body/document 가로 스크롤 발생 여부
- 버튼/터치 영역 가독성

실패 분류:
- `CSS_RESPONSIVE`
- `TEST`

#### 4-4. JavaScript 검증

목표:
- 문법 오류
- 브라우저 콘솔 오류
- DOM 요소 null 참조
- 중복 이벤트 리스너
- 페이지 로드 시 오류

실행 가능한 verifier 후보:

```bash
node --check script.js
```

추가 JS 파일이 있으면:

```bash
node --check game.js
```

```bash
node --check touch-controls.js
```

브라우저 관찰 항목:
- 페이지 로드 직후 콘솔 오류
- `Cannot read properties of null` 류 오류
- 이벤트 리스너 중복 등록으로 인한 다중 실행
- Games 탭 재진입 시 중복 초기화 여부

실패 분류:
- `JAVASCRIPT`
- `GAME_CONTROL`
- `GAME_LOGIC`

#### 4-5. 지렁이 게임 검증

목표:
- 게임 시작
- 일시정지
- 다시 시작
- 점수 증가
- 음식 생성
- 벽 또는 자기 몸 충돌
- 키보드 방향키 또는 WASD 조작
- 모바일 버튼 또는 터치 조작
- 반대 방향 즉시 전환 방지
- Games 탭을 다시 열었을 때 중복 실행 방지

실행 가능한 verifier 구성:
- 이 단계에서는 자동화 도구 존재가 확인되지 않았으므로 **수동 브라우저 verifier 중심**으로 설계
- Claude Code CLI는 코드/구조 검토용 독립 verifier로 보조 사용 가능

수동 브라우저 검증 체크리스트:
1. 게임 시작 버튼 작동
2. 일시정지 후 상태 유지
3. 재시작 시 게임 상태 초기화
4. 음식 섭취 시 점수 증가
5. 음식이 유효한 위치에 생성
6. 벽/자기 몸 충돌 시 게임오버 처리
7. 방향키 또는 WASD 입력 정상 반응
8. 반대 방향 즉시 전환 방지
9. 모바일 버튼/터치 입력 작동
10. Games 탭 재진입 시 루프/타이머/이벤트 중복 실행 없음

실패 분류:
- `GAME_LOGIC`
- `GAME_CONTROL`
- `JAVASCRIPT`
- `TEST`

#### 4-6. 로컬 실행 검증

목표:
- 로컬 정적 서버 사용
- HTTP 응답 확인
- `index.html` 정상 로드
- CSS/JS 파일 응답 확인

실행 가능한 verifier 후보:

```bash
python3 -m http.server 8000
```

대안 verifier 후보:

```bash
npx serve .
```

관찰 항목:
- `/` 또는 `/index.html` 응답 여부
- `styles.css`, `script.js` 404 여부
- 브라우저에서 정상 로드 여부

실패 분류:
- `ENVIRONMENT`
- `DEPLOYMENT`
- `HTML_STRUCTURE`

#### 4-7. 브라우저 검증

현재 확인된 도구 목록에는 별도 브라우저 자동화 도구가 명시적으로 확인되지 않았다.
따라서 현재 설계에서는 **수동 브라우저 검증**을 기본으로 둔다.

viewport 기준:
- 모바일: 약 375px
- 태블릿: 약 768px
- 데스크톱: 약 1440px

수동 관찰 항목:
- 헤더/내비게이션 가시성
- 본문 폭/가독성
- Games 영역 진입성
- 게임 조작 버튼 크기
- 가로 스크롤 유무

실패 분류:
- `CSS_RESPONSIVE`
- `GAME_CONTROL`
- `TEST`

#### 4-8. GitHub Pages 호환성 검증

목표:
- 루트 `index.html`
- 정적 상대 경로
- 서버 전용 기능 미사용
- 로컬 파일 시스템 의존성 미사용
- 백엔드 API 의존성 미사용

실행 가능한 verifier 후보:

```bash
find . -maxdepth 2 -type f | sort
```

```bash
grep -nE 'fetch\(|XMLHttpRequest|WebSocket|file://|/home/|/Users/|C:\\' index.html styles.css script.js
```

관찰 항목:
- 루트 진입점 존재 여부
- 정적 파일 참조만 있는지
- 서버 API 호출 존재 여부
- 로컬 파일 의존성 존재 여부

실패 분류:
- `DEPLOYMENT`
- `ENVIRONMENT`
- `HTML_STRUCTURE`

### 5. 실패 로그 수집 형식

모든 verifier 실패는 다음 형식으로 기록한다.

| 항목 | 기록 내용 |
|---|---|
| 실행 명령어 | 실제 실행한 명령어 전체 |
| exit code | 종료 코드 |
| 실패한 검증 항목 | 예: `HTML title missing`, `script.js 404` |
| 핵심 오류 메시지 | stderr/stdout 핵심 줄 |
| 관련 파일과 라인 | 가능하면 파일 경로 + 라인 번호 |
| 브라우저 콘솔 메시지 | 수동 복사 또는 요약 |
| 오류 fingerprint | 동일 오류 재발 판별용 짧은 식별자 |

오류 fingerprint 예시 규칙:

```text
<category>|<file>|<normalized-message>
```

예:
```text
JAVASCRIPT|script.js|cannot-read-properties-of-null
```

```text
CSS_RESPONSIVE|styles.css|mobile-horizontal-overflow
```

### 6. 실패 원인 분류 기준

| 분류 | 기준 |
|---|---|
| HTML_STRUCTURE | 문서 구조, 섹션, 링크, DOM 배치 문제 |
| CSS_RESPONSIVE | viewport 대응, 레이아웃 깨짐, 오버플로우 |
| JAVASCRIPT | 문법 오류, 일반 런타임 오류, 초기화 실패 |
| GAME_LOGIC | 충돌, 점수, 이동, 생성 등 규칙 오류 |
| GAME_CONTROL | 키보드/터치/재진입/입력 충돌 문제 |
| CONTENT | 이름, 소개, 프로젝트 등 콘텐츠 확정 문제 |
| TEST | verifier 누락, 기준 부족, 재현 불가 |
| ENVIRONMENT | 로컬 서버, 실행 환경, CLI, 브라우저 차이 |
| GITHUB_PERMISSION | 저장소/설정 접근권 문제 |
| DEPLOYMENT | Pages 루트/정적 경로/배포 반영 문제 |
| UNKNOWN | 위로 분류 불가 |

### 7. 최소 수정 원칙

- 한 Retry에서는 하나의 원인만 수정
- 관련 파일만 수정
- 테스트 삭제 또는 검증 기준 완화 금지
- 전체 사이트의 불필요한 재작성 금지
- 이미 통과한 기능을 깨뜨리는 수정 금지
- 외부 프레임워크로 임의 전환 금지

추가 규칙:
- HTML 구조 문제면 우선 `index.html`만 수정
- 반응형 문제면 우선 `styles.css`만 수정
- 게임 입력 문제면 우선 해당 게임 제어 JS만 수정
- 환경/권한 문제는 코드 수정으로 해결하려 하지 않음

### 8. Retry 정책

- 하나의 오류에 대해 최대 3회
- 동일 오류 fingerprint가 2회 반복되면 중지
- 각 Retry마다 다음 기록 필수:
  - 가설
  - 변경 파일
  - 실행 명령어
  - 결과
- 환경 또는 권한 문제는 코드 수정으로 해결하려 하지 않음

상태 전이:

```text
VERIFYING
  -> 실패
  -> Reason 분류
  -> RETRYING
  -> 최소 수정
  -> 동일 verifier 재실행
  -> PASSED 또는 BLOCKED/HITL_REQUIRED/STOP
```

### 9. 루프별 Self-Correcting TDD 표

| 루프 | 입력 | Act | Observe | 출력 | 테스트 기준 | 다음 상태 |
|---|---|---|---|---|---|---|
| 기본 파일 검증 | 저장소 루트 파일 목록 | 필수 파일 구조 verifier 정의 | `index.html`, `styles.css`, `script.js` 존재 여부 및 참조 구조 | 파일 검증 결과 | 루트 진입점과 자산 연결 조건이 정의됨 | `PASSED` 또는 `RETRYING` |
| HTML 검증 | `index.html` | 구조/시맨틱/링크 verifier 정의 | title, viewport, nav, Games, alt, 내부 링크 | HTML 검증 체크리스트 | 필수 HTML 기준이 누락 없이 정의됨 | `PASSED` 또는 `RETRYING` |
| CSS 검증 | `styles.css` | 반응형/overflow verifier 정의 | 375/768/1440 기준 관찰 항목 | CSS 검증 체크리스트 | 모바일/태블릿/데스크톱 기준이 명시됨 | `PASSED` 또는 `RETRYING` |
| JavaScript 검증 | `script.js` 및 추가 JS | 문법/콘솔/null 참조 verifier 정의 | `node --check`, 콘솔 오류, 중복 리스너 | JS 검증 체크리스트 | 런타임 전/후 검증 기준이 명확함 | `PASSED` 또는 `RETRYING` |
| 게임 검증 | Games UI, 게임 코드 | 수동 게임 verifier 정의 | 시작/일시정지/재시작/점수/충돌/입력/재진입 | 게임 검증 체크리스트 | 핵심 게임 루프 검증 항목이 정의됨 | `PASSED` 또는 `RETRYING` |
| 로컬 실행 검증 | 정적 파일 세트 | 정적 서버 verifier 정의 | 서버 응답, 자산 로딩 | 로컬 실행 절차 | HTTP 기반 검증이 가능함 | `PASSED` 또는 `BLOCKED` |
| 브라우저 검증 | 실행 중 페이지 | viewport별 수동 verifier 정의 | 모바일/태블릿/데스크톱 렌더링 | 브라우저 검증 체크리스트 | UI/게임 사용성 기준이 정의됨 | `PASSED` 또는 `RETRYING` |
| GitHub Pages 호환성 | 전체 정적 구조 | Pages 사전 verifier 정의 | 상대 경로, 서버 의존성, API 의존성 | Pages 호환성 체크리스트 | 배포 전 위험을 식별 가능함 | `PASSED` 또는 `BLOCKED` |

### 10. 가장 안전한 첫 Verifier 추천

현재 저장소 상태상 가장 안전한 첫 verifier는:
**기본 파일 검증**

이유:
- 현재 repo 루트에는 아직 `index.html`, `styles.css`, `script.js`가 없다.
- 따라서 가장 먼저 확인해야 할 것은 구조적 진입점이다.
- 이 검증은 코드 실행 없이도 가능하고, 이후 모든 루프의 선행 조건이 된다.

첫 verifier의 종료 기준:
- 루트 파일 구조가 명확히 식별됨
- 누락된 필수 파일이 식별됨
- 절대 로컬 경로/오경로 검출 기준이 정의됨

### 11. 현재 시점의 제한 사항

- 아직 실제 테스트를 실행하지 않았음
- 브라우저 자동화 도구 존재는 현재 확인되지 않음
- Claude Code CLI는 설치되어 있으나, 실제 독립 verifier 실행은 후속 단계에서 수행
- Sonnet 5 사용 가능 여부는 실행 단계 preflight에서 최종 확인
- 현재 저장소에는 웹페이지 필수 파일이 아직 없음

### 12. 실행 시 기록 템플릿

```text
[Verifier Run]
- Command:
- Exit code:
- Check:
- Result:
- Error message:
- Related file/line:
- Browser console:
- Fingerprint:
- Category:
- Hypothesis for next retry:
- Files to change:
```

이 섹션은 이후 실제 개발 단계에서 verifier-first 방식으로 작업을 수행할 때 기준으로 사용한다.
