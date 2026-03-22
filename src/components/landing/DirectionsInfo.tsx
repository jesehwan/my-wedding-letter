export function DirectionsInfo() {
  return (
    <div className="mt-4 w-full max-w-md space-y-6 px-2">
      <div className="rounded-xl bg-gray-50 p-5">
        <h3 className="mb-3 text-base font-semibold text-gray-700">버스</h3>
        <div className="space-y-4 text-sm leading-relaxed text-gray-600">
          <div>
            <p className="font-medium text-gray-700">
              올림픽공원역(5,9호선) 1번출구
            </p>
            <p>3220, 3319번 승차 → 오륜교회 하차</p>
            <p>
              3214, 3412, 3413번 승차 → 보성중고등학교서 하차
              <br />→ 오륜교회까지 도보 7분
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-700">
              잠실역(2호선) 7번, 11번 출구
            </p>
            <p>
              7번 출구: 3412, 30-5번 / 11번 출구: 3413, 3323번 승차
              <br />→ 보성중고등학교 하차 → 오륜교회까지 도보 7분
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
