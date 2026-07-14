# Change Request CR-20260714-001

## 1. 접수 정보

- 전체 Change Request ID: `CR-20260714-001`
- 접수 단계: Step 8 변경 계획 수립
- 기준선 commit: `2c4ed157c3a4428707d8c14d162560475fe0bb02`
- 기준선 브랜치: `main`
- 기준선 remote: `git@github.com:moonmoonbot/moonmoonbot.github.io.git`
- 마지막 정상 배포 URL: `https://moonmoonbot.github.io`
- 현재 상태: `HITL_REQUIRED`
- 배포 필요 여부: 실제 변경 요청 확정 후 판단 `[사람 확인 필요]`

## 2. 사용자 요청 원문 전체

```text
[배포된 웹사이트를 보고 수정하고 싶은 내용을 자유롭게 입력]
```

## 3. 추가 자료 원문 전체

```text
[문제가 발생한 기기, 브라우저, 재현 방법, 참고 디자인, 추가 요구사항 등을 입력]
```

확인 결과:

- 위 두 입력은 실제 요청/자료가 아니라 입력 안내용 placeholder로 판단된다.
- CV, 이력서, PDF, 이미지 또는 참고 문서는 구체적으로 언급되지 않았다.
- 프로젝트 루트에도 CV/PDF/이미지로 식별되는 참고 파일은 없다.
- 실제 수정 대상, 기대 동작, 재현 환경과 완료 기준을 확정할 근거가 없다.

## 4. 기준선

- 배포본에서 Home/Profile/Work/Games/Contact 카테고리 패널 확인
- Games 목록에서 Snake와 Tetris 진입 마크업 확인
- `game.test.js`: 기준선 통과
- `tetris.test.js`: 기준선 통과
- `browser-smoke.test.js`: 기준선 통과
- 공개 `index.html`: HTTP 200 및 Tetris 자산 연결 확인
- Git 상태: 변경 요청 문서 작성 전 clean
- 기존 정상 배포 상태를 이후 재현/회귀 테스트의 비교 기준으로 사용

## 5. Change Item 목록

### CR-001 — 실제 수정 요청 명세 확보

- Change Item ID: `CR-001`
- 사용자 요청 원문: `[배포된 웹사이트를 보고 수정하고 싶은 내용을 자유롭게 입력]`
- 요청 요약: 실제 수정 내용이 입력되지 않아 구현 가능한 변경 명세를 확보해야 함
- 요청 분류: `UNKNOWN`, `SPEC_CHANGE`
- 현재 동작: 정상 배포본이 동작하지만 무엇을 변경해야 하는지 특정되지 않음
- 기대 동작: 사용자가 변경 대상, 현재 문제 또는 원하는 결과를 실제 문장으로 제공함
- 재현 방법: 제공된 사용자 수정 요청 블록을 확인하면 placeholder만 존재함
- 근거 자료: 본 Change Request의 사용자 요청 원문 및 추가 자료 원문
- 수정 대상 기능: `[사람 확인 필요]`
- 예상 수정 파일: `[사람 확인 필요]`; 명세 확정 전 웹사이트/게임 파일을 지정하지 않음
- 변경 허용 범위: 이 단계에서는 `CHANGE_REQUEST.md`, `AORR.md`, `MEMORY.md`의 계획 문서만 허용
- 변경 금지 범위: 웹사이트 코드, 게임 코드, 콘텐츠, 테스트, 배포 설정 변경; commit/push/재배포
- 선행 작업: 없음
- 후속 작업: 실제 요청 수신 후 원자적 Change Item 재분해, 재현 테스트 정의, 실행 Loop 작성
- 다른 Change Item과의 의존성: 후속 모든 Change Item이 `CR-001` 완료에 의존
- 완료 기준: placeholder가 아닌 실제 수정 요청이 제공되고, 대상/기대 결과/완료 기준을 모호성 없이 기록할 수 있음
- 검증 방법: 사용자 원문을 그대로 인용하고 각 요구를 독립 Change Item으로 매핑
- 회귀 테스트: 명세 확보 단계에서는 코드 회귀 없음; 기준선 테스트 3종 결과를 유지
- 위험도: `HIGH` — 추측 구현 시 사용자 의도와 대규모로 어긋날 수 있음
- 배포 필요 여부: `[사람 확인 필요]`
- 사람 확인 필요 항목:
  - 실제 수정 요청
  - 문제가 있는 화면/기능
  - 현재 동작과 원하는 동작
  - 해당 시 기기·브라우저·재현 절차
  - 참고 디자인/문서의 실제 파일명 또는 경로

## 6. 중복·충돌·모호성 분석

- 독립적으로 분해할 실제 수정사항이 없어 Change Item은 `CR-001` 하나만 생성함.
- 중복 요청: 확인 불가
- 요청 간 충돌: 확인 불가
- 기존 요구사항과 충돌: 확인 불가
- 구현 순서: 실제 명세 확보가 모든 구현 Loop의 필수 선행 조건
- 객관적 완료 기준 부족: 실제 변경 내용 전체
- 결론: 임의 해석 금지 원칙에 따라 `HITL_REQUIRED`

## 7. 테스트 계획

### 변경 전 재현 테스트

- 절차: 사용자 수정 요청 및 추가 자료 블록 확인
- 기대 실패: placeholder 외 구체적인 문제·기대 결과가 없음
- 환경: 현재 대화 및 저장소 문서
- 관찰 대상: 실제 요구 문장, 기기, 브라우저, 재현 절차, 참고 파일명

### 변경 후 테스트

- 수정 후 동일 절차: 사용자가 제공한 실제 원문을 누락 없이 재확인
- 통과 기준: 각 독립 요구가 Change Item으로 추적되고 검증 가능한 완료 기준을 가짐
- 자동 검증 가능 여부: 원문 존재 여부는 가능; 의미와 우선순위 확정은 수동 확인 필요
- 수동 검수: 필수

### 향후 공통 회귀 테스트

실제 변경 유형에 따라 범위를 조정하되 최소 다음을 유지한다.

- 프로필과 Work/Contact 콘텐츠
- Home/Profile/Work/Games/Contact 패널 전환
- 모바일 내비게이션과 화면 오버플로우
- Snake 7개 로직 테스트
- Tetris 7개 로직 테스트
- 키보드·모바일 조작 및 게임 상태
- 브라우저 런타임 smoke
- 내부 링크와 상대 자산 경로
- GitHub Pages HTTP 200 및 배포 자산 일치

## 8. 의존성과 실행 순서

1. `CRL-001` — 실제 요청 및 참고 자료 확보 (`HITL_REQUIRED`)
2. `CRL-002` — 구체 요청 재현 및 기준선 세분화 (`BLOCKED`, CRL-001 이후)
3. 실제 요청 유형에 따라 구현/검증 Loop 동적 생성 (`BLOCKED`, CRL-002 이후)
4. 전체 회귀 및 Pages 호환성 Loop
5. 배포 승인/배포 Loop

## 9. 실행 가능한 AORR 변경 루프

### CRL-001 — Change specification intake

- 연결 Change Item: `CR-001`
- Target: placeholder가 아닌 실제 수정 요청과 필요한 참고 자료 확보
- 입력 자료: 사용자 수정 요청 원문, 추가 자료, 필요 시 파일명/경로
- Act: 사용자에게 실제 변경 내용을 요청; 코드 변경 없음
- Observe: 대상, 현재/기대 동작, 재현 환경, 참고 자료 식별 가능 여부
- Reason: 누락 또는 모호 항목을 `UNKNOWN`으로 분류
- Verifier: 모든 실제 요청 문장이 원문 보존되고 독립 항목으로 매핑되는지 검토
- 완료 기준: 구현 가능하고 검증 가능한 요구사항 최소 1개 확보
- Retry 정책: 사용자 답변마다 동일 체크리스트 재평가; 추측으로 빈칸을 채우지 않음
- Stop 조건: 실제 요청이 확보되면 `CHANGE_PLANNED`; 확보되지 않으면 `HITL_REQUIRED`
- HITL 조건: 현재와 같이 placeholder만 존재하거나 참고 파일이 불명확함
- 예상 수정 파일: `CHANGE_REQUEST.md`, `AORR.md`, `MEMORY.md`
- 선행 Loop: 없음
- 다음 Loop: `CRL-002`
- 상태: `HITL_REQUIRED`

### CRL-002 — Request-specific baseline and reproduction

- 연결 Change Item: `CR-001`에서 파생될 실제 Change Item
- Target: 실제 요청별 변경 전 재현과 객관적 실패 기준 확보
- 입력 자료: CRL-001에서 확정된 요청/환경/참고 자료, 정상 배포 commit `2c4ed15`
- Act: 배포본과 로컬 소스에서 요청별 재현 Verifier 실행; 구현 변경 없음
- Observe: 화면, 로그, 테스트, viewport 또는 콘텐츠 차이 기록
- Reason: BUG/UI_UX/RESPONSIVE/CONTENT 등 실제 분류 확정
- Verifier: 요청 유형별 재현 테스트
- 완료 기준: 각 실제 Change Item의 변경 전 실패 결과와 완료 기준이 재현 가능함
- Retry 정책: 환경 문제와 코드 문제를 구분하며 동일 fingerprint 2회 시 중지
- Stop 조건: 재현 성공 시 구현 Loop 준비; 재현 불가 시 `HITL_REQUIRED`
- HITL 조건: 환경/자료/완료 기준이 여전히 불명확함
- 예상 수정 파일: 계획 문서만; 실제 구현 파일은 후속 Loop에서 확정
- 선행 Loop: `CRL-001`
- 다음 Loop: 요청별 구현 Loop `[사람 확인 필요]`
- 상태: `BLOCKED`

## 10. Rollback 기준

- 기준 rollback commit: `2c4ed157c3a4428707d8c14d162560475fe0bb02`
- 향후 변경에서 기존 패널 전환, Snake/Tetris 테스트, 상대 자산 경로 또는 Pages HTTP 200이 깨지고 Retry 정책 내 해결되지 않으면 배포하지 않음
- 배포 후 치명적 회귀가 확인되면 새 수정 커밋으로 정상 기준선 기능을 복원하며 destructive reset은 사용하지 않음

## 11. 최종 판정

```text
Overall Status: HITL_REQUIRED
Reason: 실제 사용자 수정 요청과 추가 자료가 placeholder로만 제공됨
Next Step 9 Loop: CRL-001 (사용자 실제 요청 입력 후 즉시 실행 가능)
```

## 12. Step 9 실행 결과

### CR-001 상태 업데이트

- 상태: `HITL_REQUIRED`
- 실행 Loop: `CRL-001`
- 수정 전 재현: 사용자 요청과 추가 자료에 placeholder만 존재함을 재확인
- 실제 수정 파일: 웹사이트/게임 파일 없음; 실행 기록 문서만 업데이트
- 테스트 결과:
  - `node game.test.js`: PASS, exit 0
  - `node tetris.test.js`: PASS, exit 0
  - `node browser-smoke.test.js`: PASS, exit 0
- Retry 횟수: 0
- 오류 fingerprint: `MISSING_ACTUAL_CHANGE_REQUEST`
- 중지 이유: 변경 대상, 현재/기대 동작 및 완료 기준을 실제 사용자 요구로 확정할 수 없음
- 사람 확인 필요: placeholder가 아닌 실제 수정 요청과 해당 시 참고 자료

### 후속 Loop 상태

- `CRL-002`: `BLOCKED`
- 이유: `CRL-001` 완료에 의존하며 실제 요청 없이는 변경 전 문제를 재현할 수 없음
- 전체 회귀/배포 승인: 실행하지 않음
- 전체 Change Request 상태: `HITL_REQUIRED`

## 13. 사용자 실제 수정 요청 추가 접수

사용자 요청 원문:

```text
메인 페이지 색상을 조금 더 감성적으로 변경해주면 좋을것 같아.
```

### CR-001 — 실제 수정 요청 명세 확보

- 상태: `PASSED`
- 완료 내용: placeholder가 아닌 실제 사용자 요청 원문 확보
- Retry 횟수: 0
- 다음 Change Item: `CR-002`

### CR-002 — Home 감성 팔레트 개선

- Change Item ID: `CR-002`
- 사용자 요청 원문: `메인 페이지 색상을 조금 더 감성적으로 변경해주면 좋을것 같아.`
- 요청 요약: 기존 구조를 유지하면서 Home 화면 색상을 따뜻하고 감성적인 분위기로 개선
- 요청 분류: `UI_UX`, `SPEC_CHANGE`
- 현재 동작: Home이 전체 사이트와 같은 차가운 navy/mint 팔레트를 사용함
- 기대 동작: Home에만 dusk 배경, lavender/coral 포인트와 은은한 glow가 적용되고 콘텐츠 가독성은 유지됨
- 재현 방법: `#home` 진입 후 Home과 다른 패널의 색상 표현 비교
- 근거 자료: 사용자 실제 요청 원문; 별도 참고 디자인 없음
- 수정 대상 기능: Home panel의 배경, 강조 텍스트, CTA, 카테고리 카드
- 실제 수정 파일: `styles.css`
- 변경 허용 범위: Home 전용 CSS 팔레트와 장식 레이어
- 변경 금지 범위: 콘텐츠, 정보 구조, 다른 패널, Snake/Tetris 로직 및 조작, 외부 라이브러리
- 선행 작업: `CR-001 PASSED`
- 후속 작업: 전체 회귀와 재배포 승인
- 의존성: CR-001
- 완료 기준:
  - Home에 dusk/lavender/coral 팔레트가 적용됨
  - Home 배경과 카드가 기존 화면보다 시각적으로 구분됨
  - 텍스트와 CTA가 어두운 배경에서 읽힘
  - 680px 모바일 override가 유지됨
  - 다른 카테고리와 게임 기능이 변경되지 않음
- 검증 방법: CSS 토큰/선택자 검사, 브라우저 runtime smoke, 기존 게임 회귀
- 회귀 테스트: Snake, Tetris, 패널 초기화, JS 문법, diff whitespace
- 위험도: `LOW`
- 배포 필요 여부: `YES`
- 사람 확인 필요: 색상 취향의 최종 시각 검수
- 상태: `PASSED`
- Retry 횟수: 0
- 오류 fingerprint: `none`

## 14. CR-002 실행 결과

- Loop ID: `CRL-003`
- 수정 전 재현: Home 전용 감성 palette token/background layer 부재
- Act: Home에 한정된 dusk/lavender/coral 색상 토큰, glow, CTA 및 glass card override 추가
- 수정 후 결과: CSS 구조 검사 PASS
- 테스트:
  - Snake: PASS, exit 0
  - Tetris: PASS, exit 0
  - browser smoke: PASS, exit 0
  - `node --check script.js`: PASS, exit 0
  - `git diff --check`: PASS, exit 0
- 전체 Change Request 상태: `DEPLOY_APPROVAL_REQUIRED`
- 배포 전 사람 확인 필요: 없음; 배포 후 최종 색상 취향 검수 권장

## 15. 재배포 결과

- 사용자 승인: 확인
- 구현 commit: `80c4dea`
- push 결과: `2c4ed15..80c4dea main -> main`
- GitHub Pages URL: `https://moonmoonbot.github.io`
- HTTP 결과: 공개 `styles.css` 응답 성공
- 배포 검증: `--lavender:#b8a8ff`, Home gradient/glow/card override 반영 확인
- `CR-001`: `DEPLOYED`
- `CR-002`: `DEPLOYED`
- 전체 상태: `DEPLOYED`
- 배포 후 사람 확인 필요: 감성 색상 취향의 최종 사용자 검수

## 16. CR-003 — 게임 선택 후 보드 포커싱

- 사용자 요청 원문: `한가지 아쉬운점이 있어. 게임을 선택하면, 게임화면으로 바로 가야되는데 계속 페이지 포커스가 상단으로 고정돼. 예를들어 테트리스 게임 선택하면 게임화면이 바로 포ㅓ커싱되면 좋을거 같아. 수정해줘`
- 분류: `BUG`, `NAVIGATION`, `ACCESSIBILITY`
- 현재 동작: 게임 view는 열리지만 `focus({preventScroll:true})` 때문에 스크롤 위치가 Games 상단에 유지됨
- 기대 동작: Snake/Tetris 선택 즉시 선택한 보드가 viewport 중앙으로 이동하고 키보드 포커스를 받음
- 수정 파일: `script.js`, `browser-smoke.test.js`
- 변경 전 재현: Tetris 선택 후 canvas focus PASS, scrollIntoView FAIL
- Act: 공통 `openGame`에서 선택한 canvas에 smooth `scrollIntoView(block:center)` 실행 후 focus 설정
- 완료 기준: 두 게임에 동일 동작 적용, 포커스와 스크롤 테스트 통과, 기존 게임 회귀 통과
- 테스트: browser smoke PASS; Snake 7/7 PASS; Tetris 7/7 PASS; JS syntax PASS
- Retry: 0
- 위험도: LOW
- 상태: `PASSED`
- 전체 상태: `DEPLOY_APPROVAL_REQUIRED`

### CR-003 재배포 결과

- 사용자 승인: 확인
- 구현 commit: `a109267`
- push: `8181ab3..a109267 main -> main`
- Pages 검증: 공개 `script.js`에서 `scrollIntoView` 및 `block:'center'` 확인
- CR-003 상태: `DEPLOYED`
- 전체 상태: `DEPLOYED`
