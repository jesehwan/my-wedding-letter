import { render, screen, fireEvent } from "@testing-library/react";
import { LandingSection } from "../LandingSection";
import { weddingData } from "@/data/weddingData";

describe("LandingSection", () => {
  it("renders couple names from wedding data", () => {
    render(<LandingSection onExplore={() => {}} />);

    expect(screen.getByText(weddingData.couple.groomName)).toBeInTheDocument();
    expect(screen.getByText(weddingData.couple.brideName)).toBeInTheDocument();
  });

  it("renders wedding info", () => {
    render(<LandingSection onExplore={() => {}} />);

    expect(screen.getByText(weddingData.date)).toBeInTheDocument();
    expect(screen.getByText(weddingData.venue)).toBeInTheDocument();
  });

  it("renders explore button that triggers onExplore", () => {
    const onExplore = jest.fn();
    render(<LandingSection onExplore={onExplore} />);

    fireEvent.click(screen.getByRole("button", { name: "살펴보기" }));
    expect(onExplore).toHaveBeenCalledTimes(1);
  });
});
