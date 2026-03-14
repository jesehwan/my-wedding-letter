import { render, screen, fireEvent } from "@testing-library/react";
import { EndingScreen } from "../EndingScreen";

describe("EndingScreen", () => {
  it("renders letter text", () => {
    render(<EndingScreen onClose={() => {}} />);

    expect(
      screen.getByText(/저희 두 사람의 이야기를 끝까지 들어주셨군요/)
    ).toBeInTheDocument();
  });

  it("renders wedding info", () => {
    render(<EndingScreen onClose={() => {}} />);

    expect(screen.getByText(/2026년 5월 23일/)).toBeInTheDocument();
  });

  it("renders celebration button", () => {
    render(<EndingScreen onClose={() => {}} />);

    expect(
      screen.getByRole("button", { name: "축하해주세요 💌" })
    ).toBeInTheDocument();
  });

  it("calls onClose when button clicked", () => {
    const onClose = jest.fn();
    render(<EndingScreen onClose={onClose} />);

    fireEvent.click(screen.getByRole("button", { name: "축하해주세요 💌" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
