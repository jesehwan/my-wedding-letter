# Claude Code Development Guide

결혼식 안내 웹페이지 프로젝트입니다.

---

## Core Principles

### TDD: Red-Green-Refactor

1. **RED**: 실패하는 테스트 먼저 작성
2. **GREEN**: 테스트 통과하는 최소 구현
3. **REFACTOR**: 테스트 통과 상태에서 정리

### Tidy First

구조적 변경과 동작 변경을 분리:

- `refactor:` = 구조적 변경 (rename, extract, move) - 동작 변경 없음
- `feat:` / `fix:` = 동작 변경

### Simple Design (우선순위 순서)

1. 테스트 통과
2. 의도 드러내기 (명확한 네이밍)
3. 중복 없음 (3번째 반복에서 DRY)
4. 최소 요소

### YAGNI

필요할 때만 구현. 미래 요구사항 예측 금지.

---

## Commit Discipline

### 규칙

- 모든 테스트 통과 후에만 커밋
- 하나의 논리적 변경 단위
- 컴파일러/린터 경고 없음

### Prefix

```
feat:      새 기능
fix:       버그 수정
refactor:  구조적 변경 (동작 변경 없음)
test:      테스트 추가
docs:      문서만 변경
```

---

## Testing

### Test Pyramid

- **Unit** (70%): 컴포넌트, 함수 - Jest
- **Integration** (20%): API, 데이터 흐름 - Jest
- **E2E** (10%): Critical user journeys - Playwright

### 버그 수정 워크플로우

1. 실패하는 테스트 작성
2. 최소 수정으로 통과
3. 필요시 리팩토링
