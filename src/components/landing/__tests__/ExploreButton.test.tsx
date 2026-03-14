import { render, screen, fireEvent } from "@testing-library/react";
import { ExploreButton } from "../ExploreButton";

describe("ExploreButton", () => {
  it("renders the explore button", () => {
    render(<ExploreButton onClick={() => {}} />);

    expect(
      screen.getByRole("button", { name: "신혼집 구경하기" })
    ).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const onClick = jest.fn();
    render(<ExploreButton onClick={onClick} />);

    fireEvent.click(screen.getByRole("button", { name: "신혼집 구경하기" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
