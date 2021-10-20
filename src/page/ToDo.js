import React from 'react';
import { useSelector } from 'react-redux';

import Wrapper from '../components/Wrapper';
import List from '../components/List';

export default function ToDo() {
  const { number } = useSelector((state) => state.CreateItemReducer);

  return (
    <Wrapper>
      <div className="todo">
        <div className="todoContainer">
          <List
            title="To Do"
            type="todo"
            number={number === 1}
          />
          <List
            title="In Progress"
            type="progress"
            number={number === 2}
          />
          <List
            title="Done"
            type="done"
            number={number === 3}
          />
        </div>
      </div>
    </Wrapper>
  );
}
