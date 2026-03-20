export function BusInfo() {
  return (
    <div className="mt-4 w-full max-w-md px-2">
      <div className="rounded-xl border border-rose-200 bg-rose-50 p-6 shadow-sm">
        <h3 className="mb-4 text-center text-xl font-bold text-rose-700">
          광주 → 서울 버스 탑승 안내
        </h3>
        <div className="space-y-4 text-base leading-relaxed text-gray-700">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 text-lg text-rose-400">&#128197;</span>
            <div>
              <p className="font-semibold text-gray-800">출발일시</p>
              <p>5월 2일 오전 10시</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="mt-0.5 text-lg text-rose-400">&#128205;</span>
            <div>
              <p className="font-semibold text-gray-800">출발장소</p>
              <p>김대중센터 주차장</p>
              <p className="text-sm text-gray-500">광주시 서구 치평동 1154</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
