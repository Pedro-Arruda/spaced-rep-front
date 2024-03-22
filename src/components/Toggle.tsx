interface IToggleSwitch {
  isChecked: boolean;
  handleToggle: () => void;
}

export const ToggleSwitch = ({ handleToggle, isChecked }: IToggleSwitch) => {
  return (
    <div
      className={`toggle-switch ${isChecked ? "checked" : ""}`}
      onClick={handleToggle}
    >
      <div className="switch"></div>
    </div>
  );
};

export default ToggleSwitch;
