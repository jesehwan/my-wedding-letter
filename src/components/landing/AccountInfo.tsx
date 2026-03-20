import { useState } from "react";

interface Account {
  name: string;
  bank: string;
  number: string;
}

const groomAccounts: Account[] = [
  { name: "제세환", bank: "토스뱅크", number: "1000-2897-7636" },
  { name: "제병덕", bank: "광주", number: "420-121-040095" },
  { name: "최기원", bank: "농협", number: "302-1894-2043-21" },
];

const brideAccounts: Account[] = [
  { name: "신지은", bank: "토스뱅크", number: "1001-2372-2783" },
  { name: "신완철", bank: "농협", number: "352-0803-7737-23" },
  { name: "이미재", bank: "국민", number: "051-24-0225-460" },
];

type PopupType = "groom" | "bride" | null;

export function AccountInfo() {
  const [popup, setPopup] = useState<PopupType>(null);

  const accounts = popup === "groom" ? groomAccounts : brideAccounts;
  const title = popup === "groom" ? "신랑측 계좌 안내" : "신부측 계좌 안내";

  return (
    <div className="flex w-full max-w-md flex-col items-center gap-4 px-2">
      <h2 className="text-base font-semibold text-gray-700">
        신랑신부에게 마음 전하기
      </h2>
      <div className="flex w-full max-w-xs flex-col gap-3">
        <button
          onClick={() => setPopup("groom")}
          className="rounded-full bg-blue-400 px-8 py-3 text-base font-medium text-white shadow-sm transition hover:bg-blue-500"
        >
          신랑측
        </button>
        <button
          onClick={() => setPopup("bride")}
          className="rounded-full bg-rose-400 px-8 py-3 text-base font-medium text-white shadow-sm transition hover:bg-rose-500"
        >
          신부측
        </button>
      </div>

      {popup && (
        <div
          data-testid="popup-overlay"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => setPopup(null)}
        >
          <div
            className="mx-4 w-full max-w-sm rounded-xl bg-white p-6 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="mb-4 text-center text-lg font-semibold text-gray-700">
              {title}
            </h3>
            <div className="space-y-3">
              {accounts.map((account) => (
                <div
                  key={account.number}
                  className="rounded-lg bg-gray-50 px-4 py-3"
                >
                  <p className="text-sm font-medium text-gray-700">
                    {account.name}
                  </p>
                  <p className="text-xs text-gray-500">{account.bank}</p>
                  <p className="mt-1 text-sm tracking-wide text-gray-600">
                    {account.number}
                  </p>
                </div>
              ))}
            </div>
            <button
              onClick={() => setPopup(null)}
              className="mt-4 w-full rounded-lg bg-gray-100 py-2 text-sm text-gray-600 transition hover:bg-gray-200"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
