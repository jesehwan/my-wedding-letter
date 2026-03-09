import { render, screen } from "@testing-library/react";
import { WeddingInfo } from "../WeddingInfo";

describe("WeddingInfo", () => {
  const info = {
    date: "2026년 5월 23일 토요일",
    time: "오후 2시",
    venue: "더채플앳청담",
    address: "서울특별시 강남구 청담동 123-45",
  };

  it("renders date and time", () => {
    render(<WeddingInfo {...info} />);

    expect(screen.getByText("2026년 5월 23일 토요일")).toBeInTheDocument();
    expect(screen.getByText("오후 2시")).toBeInTheDocument();
  });

  it("renders venue and address", () => {
    render(<WeddingInfo {...info} />);

    expect(screen.getByText("더채플앳청담")).toBeInTheDocument();
    expect(
      screen.getByText("서울특별시 강남구 청담동 123-45")
    ).toBeInTheDocument();
  });
});
