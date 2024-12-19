import { 
  MdCheckBoxOutlineBlank,
  MdCheckBox
 } from 'react-icons/md';
import { FaTrash } from "react-icons/fa";
import './TodoListItem.scss';

const TodoListItem = () => {
  return(
    <div className='TodoListItem'>
      <div className='checkbox'>
        <MdCheckBoxOutlineBlank/>
        <div className='text'>할 일</div>
      </div>
      <div className='remove'>
        <FaTrash/>
      </div>
    </div>
  );
};

export default TodoListItem;