import { render, screen } from "@testing-library/react";
import { LoadingScreen } from "../LoadingScreen";
import { useProgress } from "@react-three/drei";

jest.mock("@react-three/drei");

describe("LoadingScreen", () => {
  it("renders loading text", () => {
    (useProgress as jest.Mock).mockReturnValue({ progress: 0 });
    render(<LoadingScreen />);
    expect(screen.getByText("신혼집 준비 중...")).toBeInTheDocument();
  });

  it("shows progress percentage", () => {
    (useProgress as jest.Mock).mockReturnValue({ progress: 75 });
    render(<LoadingScreen />);
    expect(screen.getByText("75%")).toBeInTheDocument();
  });

  it("renders progressbar", () => {
    (useProgress as jest.Mock).mockReturnValue({ progress: 50 });
    render(<LoadingScreen />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});
