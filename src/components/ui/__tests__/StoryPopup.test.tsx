import { render, screen, fireEvent } from "@testing-library/react";
import { StoryPopup } from "../StoryPopup";
import { DiscoveryPointData } from "@/types/discovery";

describe("StoryPopup", () => {
  const point: DiscoveryPointData = {
    id: "test",
    position: [0, 0, 0],
    title: "테스트 이야기",
    content: "이것은 테스트 내용입니다.",
  };

  it("renders title and content", () => {
    render(<StoryPopup point={point} onClose={() => {}} />);

    expect(screen.getByText("테스트 이야기")).toBeInTheDocument();
    expect(screen.getByText("이것은 테스트 내용입니다.")).toBeInTheDocument();
  });

  it("renders close button", () => {
    render(<StoryPopup point={point} onClose={() => {}} />);
    expect(screen.getByRole("button", { name: "닫기" })).toBeInTheDocument();
  });

  it("calls onClose when close button clicked", () => {
    const onClose = jest.fn();
    render(<StoryPopup point={point} onClose={onClose} />);

    fireEvent.click(screen.getByRole("button", { name: "닫기" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("renders image when imageUrl provided", () => {
    const pointWithImage = { ...point, imageUrl: "/test.jpg" };
    render(<StoryPopup point={pointWithImage} onClose={() => {}} />);

    const img = screen.getByAltText("테스트 이야기");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/test.jpg");
  });

  it("renders image for story with image mapping", () => {
    const knownPoint = { ...point, id: "first-met" };
    render(<StoryPopup point={knownPoint} onClose={() => {}} />);

    expect(screen.getByAltText("first-met")).toBeInTheDocument();
  });

  it("renders 3D object scene for story with 3D object", () => {
    const knownPoint = { ...point, id: "play-together" };
    render(<StoryPopup point={knownPoint} onClose={() => {}} />);

    expect(screen.getByTestId("r3f-canvas")).toBeInTheDocument();
  });

  it("does not render 3D object scene for unknown story id", () => {
    render(<StoryPopup point={point} onClose={() => {}} />);

    expect(screen.queryByTestId("r3f-canvas")).not.toBeInTheDocument();
  });
});
