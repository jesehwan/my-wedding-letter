import { render, screen, fireEvent } from "@testing-library/react";
import { AccountInfo } from "../AccountInfo";

describe("AccountInfo", () => {
  it("renders the section title and both buttons", () => {
    render(<AccountInfo />);

    expect(screen.getByText("신랑신부에게 마음 전하기")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "신랑측" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "신부측" })
    ).toBeInTheDocument();
  });

  it("opens groom popup with account info when groom button is clicked", () => {
    render(<AccountInfo />);

    fireEvent.click(screen.getByRole("button", { name: "신랑측" }));

    expect(screen.getByText("신랑측 계좌 안내")).toBeInTheDocument();
    expect(screen.getByText("제세환")).toBeInTheDocument();
    expect(screen.getByText("1000-2897-7636")).toBeInTheDocument();
    expect(screen.getByText("토스은행")).toBeInTheDocument();
    expect(screen.getByText("제병덕")).toBeInTheDocument();
    expect(screen.getByText("최기원")).toBeInTheDocument();
  });

  it("opens bride popup with account info when bride button is clicked", () => {
    render(<AccountInfo />);

    fireEvent.click(screen.getByRole("button", { name: "신부측" }));

    expect(screen.getByText("신부측 계좌 안내")).toBeInTheDocument();
    expect(screen.getByText("신지은")).toBeInTheDocument();
    expect(screen.getByText("1001-2372-2783")).toBeInTheDocument();
    expect(screen.getByText("토스뱅크")).toBeInTheDocument();
    expect(screen.getByText("신완철")).toBeInTheDocument();
    expect(screen.getByText("이미재")).toBeInTheDocument();
  });

  it("closes popup when overlay is clicked", () => {
    render(<AccountInfo />);

    fireEvent.click(screen.getByRole("button", { name: "신랑측" }));
    expect(screen.getByText("신랑측 계좌 안내")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("popup-overlay"));
    expect(screen.queryByText("신랑측 계좌 안내")).not.toBeInTheDocument();
  });

  it("closes popup when close button is clicked", () => {
    render(<AccountInfo />);

    fireEvent.click(screen.getByRole("button", { name: "신부측" }));
    expect(screen.getByText("신부측 계좌 안내")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "닫기" }));
    expect(screen.queryByText("신부측 계좌 안내")).not.toBeInTheDocument();
  });
});
