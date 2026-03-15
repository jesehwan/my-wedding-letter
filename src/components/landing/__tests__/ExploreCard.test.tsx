import { render, screen, fireEvent } from "@testing-library/react";
import { ExploreCard } from "../ExploreCard";

describe("ExploreCard", () => {
  it("renders the explore button and badge", () => {
    render(<ExploreCard onClick={() => {}} />);

    expect(
      screen.getByRole("button", { name: "신혼집 구경하기" })
    ).toBeInTheDocument();
    expect(screen.getByText("체험형 게임")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const onClick = jest.fn();
    render(<ExploreCard onClick={onClick} />);

    fireEvent.click(screen.getByRole("button", { name: "신혼집 구경하기" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
