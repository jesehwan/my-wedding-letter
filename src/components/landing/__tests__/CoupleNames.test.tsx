import { render, screen } from "@testing-library/react";
import { CoupleNames } from "../CoupleNames";

describe("CoupleNames", () => {
  it("renders groom and bride names", () => {
    render(
      <CoupleNames
        couple={{
          groomName: "김신랑",
          brideName: "이신부",
          groomFamilyName: "김",
          brideFamilyName: "이",
        }}
      />
    );

    expect(screen.getByText("김신랑")).toBeInTheDocument();
    expect(screen.getByText("이신부")).toBeInTheDocument();
  });

  it("renders a separator between names", () => {
    render(
      <CoupleNames
        couple={{
          groomName: "김신랑",
          brideName: "이신부",
          groomFamilyName: "김",
          brideFamilyName: "이",
        }}
      />
    );

    expect(screen.getByText("♥")).toBeInTheDocument();
  });
});
