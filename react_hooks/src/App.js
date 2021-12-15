import React, { useState, useEffect, useCallback } from 'react';

import './App.scss';

import MyHeader from './components/Header';
import AddInput from './components/AddInput';
import NoDataTip from './components/NoDataTip';
import TodoItem from './components/TodoItem';
import CheckModal from './components/Modal/CheckModal';
import EditModal from './components/Modal/EditModal';

function App() {
  
  const [ isShowInput, setIsShowInput ] = useState(false),
        [ isShowCheckModal, setIsShowCheckModal ] = useState(false),
        [ isShowEditModal, setIsShowEditModal ] = useState(false),
        [ todoList, setTodoList ] = useState([]),
        [ currentData, setCurrentData ] = useState({});

  useEffect(() => {
    const todoData = JSON.parse(localStorage.getItem("todoData") || '[]');
    setTodoList(todoData);
  }, []);

  useEffect(() => {
    localStorage.setItem("todoData", JSON.stringify(todoList));
  }, [todoList]);
  
  const addItem = useCallback(
    (value) => {
      const dataItem = {
        id: new Date().getTime(),
        content: value,
        completed: false,
      };
      setTodoList((todoList) => [...todoList, dataItem]);
      setIsShowInput(false);
    },
    []
  );

  const removeItem = useCallback((id) => {
    setTodoList((todoList) => todoList.filter((item) => item.id !== id));
  }, []);

  const completeItem = useCallback((id) => {
    setTodoList((todoList) => todoList.map((item) => {
      if (item.id === id) {
        item.completed = !item.completed;
      }
      return item;
    }));
  }, [])

  const openCheckModal = useCallback(
    (id) => {
      setCurrentData(() => todoList.filter((item) => item.id === id)[0]);
      setIsShowCheckModal(true);
    },
    [todoList]
  );

  const openEditModal = useCallback(
    (id) => {
      setCurrentData(() => todoList.filter((item) => item.id === id)[0]);
      setIsShowEditModal(true);
    },
    [todoList]
  );

  const submitEdit = useCallback(
    (newData, id) => {
      setTodoList((todoList) =>
        todoList.map((item) => {
          if (item.id === id) {
            item = newData;
          }
          return item;
        })
      );
      setIsShowEditModal(false);
    },
    []
  );

  return (
    <div className="App">
      <CheckModal
        isShowCheckModal={isShowCheckModal}
        data={currentData}
        closeModal={() => setIsShowCheckModal(false)}
      />
      <EditModal
        isShowEditModal={isShowEditModal}
        data={currentData}
        submitEdit={submitEdit}
      />
      <MyHeader openInput={() => setIsShowInput(!isShowInput)} />
      <AddInput isShow={isShowInput} addItem={(value) => addItem(value)} />
      {!todoList || todoList.length === 0 ? (
        <NoDataTip />
      ) : (
        <ul className="todo-list">
          {todoList.map((item, index) => {
            return (
              <TodoItem
                dataItem={item}
                key={index}
                removeItem={removeItem}
                openCheckModal={openCheckModal}
                completeItem={completeItem}
                openEditModal={openEditModal}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default App;
