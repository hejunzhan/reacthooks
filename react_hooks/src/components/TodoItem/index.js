import React from 'react';

import './index.scss';

function TodoItem (props) {
  const {
    removeItem,
    completeItem,
    openCheckModal,
    openEditModal,
    dataItem,
  } = props;

  return (
    <li className="todo-item">
      <div className="check-box">
        <input
          type="checkbox"
          checked={dataItem.completed}
          onChange={() => completeItem(dataItem.id)}
        />
      </div>
      <span
        className="content"
        style={{ textDecoration: dataItem.completed ? "line-through" : "none" }}
      >
        {dataItem.content}
      </span>
      <div className="btn-group">
        <button
          className="btn btn-primary"
          onClick={() => openCheckModal(dataItem.id)}
        >
          查看
        </button>
        <button
          className="btn btn-warning"
          onClick={() => openEditModal(dataItem.id)}
        >
          编辑
        </button>
        <button
          className="btn btn-danger"
          onClick={() => removeItem(dataItem.id)}
        >
          删除
        </button>
      </div>
    </li>
  );
}

export default TodoItem;