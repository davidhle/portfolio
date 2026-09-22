interface NavButtonProps {
  label: string;
  onClick: () => void;
}

export function NavButton({ label, onClick }: NavButtonProps) {
  return (
    <button
      type="button"
      className="nav-button"
      onClick={onClick}
      // A nav button is itself a "nav target" — stop the double-click from
      // also bubbling to the canvas's generic double-click-to-zoom-in.
      onDoubleClick={(event) => event.stopPropagation()}
    >
      {label}
    </button>
  );
}
