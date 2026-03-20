import { render, screen } from "@testing-library/react";
import { BusInfo } from "../BusInfo";
import { LandingSection } from "../LandingSection";

describe("BusInfo", () => {
  it("renders bus departure date and time", () => {
    render(<BusInfo />);

    expect(screen.getByText("5월 2일 오전 10시")).toBeInTheDocument();
  });

  it("renders departure location and address", () => {
    render(<BusInfo />);

    expect(screen.getByText("김대중센터 주차장")).toBeInTheDocument();
    expect(
      screen.getByText("광주시 서구 치평동 1154")
    ).toBeInTheDocument();
  });
});

describe("LandingSection with side prop", () => {
  it("does not render BusInfo when side is not groom", () => {
    render(<LandingSection onExplore={() => {}} />);

    expect(screen.queryByText("광주 → 서울 버스 탑승 안내")).not.toBeInTheDocument();
  });

  it("renders BusInfo when side is groom", () => {
    render(<LandingSection onExplore={() => {}} side="groom" />);

    expect(screen.getByText("광주 → 서울 버스 탑승 안내")).toBeInTheDocument();
    expect(screen.getByText("5월 2일 오전 10시")).toBeInTheDocument();
  });
});
