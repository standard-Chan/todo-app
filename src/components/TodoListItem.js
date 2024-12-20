import { 
  MdCheckBoxOutlineBlank,
  MdCheckBox
 } from 'react-icons/md';
import { FaTrash } from "react-icons/fa";
import './TodoListItem.scss';
import cn from 'classnames';

const TodoListItem = ({todo}) => {
  const {text, checked} = todo;
  return(
    <div className='TodoListItem'>
      <div className={cn('checkbox', {checked})}>
        {checked ? <MdCheckBox/> : <MdCheckBoxOutlineBlank/>}
        <div className='text'>{text}</div>
      </div>
      <div className='remove'>
        <FaTrash/>
      </div>
    </div>
  );
};

export default TodoListItem;