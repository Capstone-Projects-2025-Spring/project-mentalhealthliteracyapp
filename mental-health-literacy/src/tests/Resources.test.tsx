import { test, expect, vi } from "vitest";

function Resources({ onNavigate }: { onNavigate: (to: string) => void }) {
  return {
    type: "button",
    props: {
      onClick: () => onNavigate("/cbt"),
      children: "Cognitive Behavioral Therapy",
    },
  };
}

function CBT() {
  return {
    type: "a",
    props: {
      href: "https://www.templehealth.org/services/treatments/psychotherapy",
      target: "_blank",
      rel: "noopener noreferrer",
      children: "CBT",
    },
  };
}

test("clicking Cognitive Behavioral Therapy card navigates to /cbt", () => {
  const navigateMock = vi.fn();
  const resourcesComp = Resources({ onNavigate: navigateMock });
  resourcesComp.props.onClick();
  expect(navigateMock).toHaveBeenCalledWith("/cbt");
});

test("CBT card has a link labeled CBT linking to the temple health url", () => {
  const cbtComp = CBT();
  expect(cbtComp.props.children).toBe("CBT");
  expect(cbtComp.props.href).toBe(
    "https://www.templehealth.org/services/treatments/psychotherapy"
  );
});

test("navigation handler is called twice", () => {
  const navigateMock = vi.fn();
  const comp = Resources({ onNavigate: navigateMock });
  comp.props.onClick();
  comp.props.onClick();
  expect(navigateMock).toHaveBeenCalledTimes(2); 
});

test("resources component returns a button element", () => {
  const comp = Resources({ onNavigate: () => {} });
  expect(comp.type).toBe("button");
});

test("CBT component returns an anchor element", () => {
  const comp = CBT();
  expect(comp.type).toBe("a");
});