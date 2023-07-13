import React from "react";

export const Task = ({ task, onCheckboxClick, onDelete }) => {
  return (
    <li>
      <input
        type="checkbox"
        checked={!!task.isChecked}
        onClick={() => onCheckboxClick(task)}
        readOnly
      />
      <span>{task.text}</span>
      <button onClick={() => onDelete(task)}>&times;</button>
    </li>
  );
};
