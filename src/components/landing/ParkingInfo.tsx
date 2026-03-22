import Image from "next/image";

export function ParkingInfo() {
  return (
    <div className="mt-4 w-full max-w-md px-2">
      <div className="rounded-xl bg-gray-50 p-5">
        <h3 className="mb-3 text-base font-semibold text-gray-700">주차 안내</h3>
        <p className="mb-4 text-sm leading-relaxed text-gray-600">
          하객 분들은 오륜교회 지하주차장 및 옥외주차장에 주차하실 수 있습니다.
          오륜교회 뒤편으로 돌아서 오시면 됩니다.
        </p>
        <Image
          src="/image/parking.png"
          alt="주차장 안내 지도"
          width={800}
          height={600}
          className="w-full rounded-lg"
        />
      </div>
    </div>
  );
}
