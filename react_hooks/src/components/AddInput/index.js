import React, { useCallback, useRef } from 'react';

import './index.scss';

function AddInput (props) {
  const { isShow, addItem } = props,
        inputRef = useRef();

  const submitValue = useCallback(
    () => {
      const inputValue = inputRef.current.value.trim();
      if (inputValue.length === 0) {
        return;
      }

      addItem(inputValue);
      inputRef.current.value = '';
    },
    [addItem]
  );

  return (
    <>
      {isShow && (
        <div className="input-wrapper">
          <input type="text" ref={inputRef} placeholder="请输入待办事件" />
          <button className="btn btn-primary" onClick={submitValue}>
            增加
          </button>
        </div>
      )}
    </>
  );
}

export default AddInput;