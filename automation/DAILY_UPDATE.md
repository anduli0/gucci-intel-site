# Gucci Intelligence — 일간 자동 업데이트 런북

이 문서는 매일 아침 06:50 KST에 시작해 **08:00 KST 전에 배포가 완료**되어야 하는 자동 업데이트 세션(Claude Code 클라우드 예약 작업)이 따라야 하는 절차다. 사람이 수동으로 실행하거나 PC 폴백 스크립트가 실행할 때도 동일하게 따른다. 품질 원칙을 지키되 완료 시한이 있으므로 리서치를 불필요하게 늘리지 않는다.

## 0. 원칙

- **오늘 날짜는 KST(UTC+9) 기준**으로 계산한다: `TZ=Asia/Seoul date +%F`
- **멱등성**: `api/summary`의 `date`가 이미 오늘(KST)이면 이미 업데이트된 것이다. 아무것도 변경하지 말고 "이미 업데이트됨"으로 종료한다.
- **사실만 기록**: 모든 뉴스 항목은 WebSearch로 실제 확인된 기사만 넣는다. URL·매체명·발행일을 지어내지 않는다. 검증 불가한 항목은 버린다.
- **스키마 보존**: 각 파일은 전날(가장 최근) 버전과 **정확히 같은 JSON 구조**를 유지한다. 필드를 빼거나 이름을 바꾸지 않는다. 커밋 전 모든 수정 파일을 `python3 -m json.tool`로 검증한다.
- `index.html`, `api/status`, `api/runlog`, `api/pool`, `.github/`, `automation/`은 **건드리지 않는다**. `product-images/`는 제품 순위 변경 시 파일명 갱신만 허용.
- **파일 삭제 금지**: `rsync --delete`나 디렉토리 통째 교체 방식을 절대 쓰지 않는다. 기존 파일을 제자리에서 수정(edit)만 한다. (2026-07-06 실행에서 rsync --delete가 `.github/workflows/pages.yml`과 이 런북을 삭제해 배포가 끊긴 사고가 있었다.)
- 커밋 직전 필수 확인: `git status`에서 삭제(D)된 파일이 없는지, `.github/workflows/pages.yml`·`automation/DAILY_UPDATE.md`·`index.html`이 존재하는지 확인한다.
- 이 환경에서는 WebFetch/curl로 외부 사이트 본문을 읽을 수 없을 수 있다(네트워크 정책). **WebSearch를 주 수단**으로 사용하고, 검색 결과 요약·스니펫에 근거해 작성한다. 근거가 얇으면 해당 권역에 `low_evidence: true`를 정직하게 표기하고 `_freshness_note`에 한계를 기록한다.

## 1. 리서치 (WebSearch)

전일 대비 새로 나온 소식을 다음 축으로 검색한다 (여러 쿼리, 영어+한국어):

1. **구찌 세트**: `Gucci news <오늘 날짜/이번 주>`, `Gucci Demna`, `Gucci campaign`, `Gucci collection`, 진행 중 이벤트(예: 파리 오트 쿠튀르, 실적 발표 등 `api/calendar` 참조)
2. **럭셔리 경쟁 세트** (`api/pool`의 competitor/brand_watch 세트): Chanel, Louis Vuitton, Dior, Prada, Bottega Veneta, Saint Laurent, Balenciaga, Burberry, Kering/LVMH 실적·인사·논란
3. **권역 신호**: NEA(한·중·일: 앰배서더, 웨이보/K-셀럽), SEA(동남아), NA(북미), EU(유럽: Kering 실적, 규제)
4. **앰배서더/셀럽**: 신규 임명, 화보, 공항패션·착용 보도

## 2. 감성 스코어링 규칙 (GMAI)

- 항목별 감성: 긍정 +1 / 중립 0 / 부정 -1 스케일에서 아래 감쇠 규칙 적용.
- **활동 보도 감쇠**: 구찌가 스스로 낸 캠페인·행사·앰배서더 임명 보도는 여론으로 치지 않는다. 단순 소개 기사는 0(중립), 매체가 자체 평가를 붙인 기사는 최대 ±0.5, 만점(±1.0)은 독립 비평·수요 데이터(Lyst 등)·실구매 의사 확인 시에만.
- 권역별 구성요소(0~1): sentiment(가중 45%), buzz(20%), engagement(15%), sov(20%). 관측 불가한 buzz/engagement는 0.5(중립 prior)로 두고 `buzz_known`/`engagement_known`을 false로 표기.
- `contrib = weight × component × 100`, `GMAI = Σ contrib` (0~100).
- 밴드: ≥75 "강한 매력", 60~74 "우호", 45~59 "중립", 30~44 "주의", ≤29 "경고".
- GLOBAL은 전날 `summary.region_weights_used`와 같은 권역 가중으로 합성한다.
- SOV: 브랜드별 언급 건수 기반(전일 `api/sov`의 method/criteria를 그대로 따름), `evidence`에 근거 URL 기록.

## 3. 파일 업데이트

전날 파일을 읽고 같은 구조로 오늘자 데이터를 만든다:

| 파일 | 작업 |
|---|---|
| `api/news` | `date`=오늘, `gucci`/`luxury` 각 5~10건(rank, title_ko/original, source, tier(T1/T2/T3), url, published_at, summary_ko/en, why_gucci_ko/en), `keep`은 여전히 유효한 항목 유지, `available_dates`에 오늘 추가, `_freshness_note`에 수집 맥락 기록 |
| `api/sov` | 오늘자 브랜드별/권역별 카운트 + evidence |
| `api/summary` | 권역별 GMAI 재계산, `drivers`/`counts`/`delta`(전일 대비)/`delta_attrib` 갱신, `snapshot_count` +1 |
| `api/timeseries` | `rows`에 오늘자 5행(EU, NA, NEA, SEA, GLOBAL) **추가**(기존 행 보존) |
| `api/luxury` | 경쟁/그룹 뉴스 갱신 (`groups` 카테고리 구조 유지) |
| `api/ambassadors` | 새 소식 있을 때만 items 갱신 + summary 재작성 |
| `api/calendar` | 지난 이벤트 제거, 새 확정 일정 추가, `calendar_summary` 갱신 |
| `api/products` | 새 제품 신호가 뚜렷할 때만 insight 갱신(이미지 추가 금지) |
| `api/report/daily/` | 아래 리포트 2건 작성 |
| `api/reports` | 새 리포트를 인덱스에 추가(mtime = KST `YYYY-MM-DD HH:MM`) |

### 일간 리포트 (JSON 래핑된 마크다운)

리포트 파일 형식: `{"path": "daily/<파일명>.md", "content": "<마크다운 전문>"}` (전날 파일과 동일한 래핑).

1. `daily/YYYY-MM-DD-luxury-brief.md` — 오늘의 구찌·럭셔리 뉴스 브리핑 (한국어, Executive Summary 영어 포함, 출처 목록 필수)
2. `daily/YYYY-MM-DD-index-interpretation.md` — GMAI 일간 해석 (전날 리포트의 목차 구조를 따름: 오늘의 결론 / 지수를 읽는 법 / 오늘의 지수 한눈에 / 의미 / 권역 격차 / 유의점 / 무엇을 볼 것인가 / Executive Summary / 주석 / 출처)

문체는 기존 리포트와 동일하게: 비전문가도 읽을 수 있는 정중한 한국어, 과장 없이, 근거 얇으면 얇다고 명시.

## 4. 검증 & 배포

1. 수정한 모든 JSON 파일: `python3 -m json.tool <file> > /dev/null`
2. `api/timeseries` 행 수가 줄지 않았는지, `api/news`의 `available_dates`가 누적인지 확인.
3. 커밋: `git add -A && git commit -m "auto publish YYYY-MM-DD (claude cloud)"`
4. 푸시: `git push origin main` (실패 시 2s/4s/8s/16s 백오프로 최대 4회 재시도)
5. 푸시가 성공하면 GitHub Actions `deploy-pages` 워크플로우가 자동으로 사이트를 배포한다(~1분).
6. **배포 확인 필수**: 푸시 2~3분 후 GitHub MCP 도구(`actions_list`)로 방금 커밋의 `deploy-pages` 실행이 success인지 확인한다. 실패했으면 로그를 확인하고 `actions_run_trigger`(run_workflow, pages.yml, ref=main)로 새 실행을 트리거한 뒤 다시 확인한다. 같은 실행의 재시도(rerun)는 아티팩트 중복 오류를 일으키므로 반드시 **새 실행**을 만든다. 배포 성공까지 확인해야 작업 완료다.

## 5. 완료 보고

마지막 메시지(알림으로 전송됨)에 한국어로: 오늘 GLOBAL GMAI 수치와 밴드, 전일 대비 변화, 헤드라인 1~2개, 커밋 해시를 요약한다. 실패했거나 부분 완료면 무엇이 왜 안 됐는지 명시한다.
