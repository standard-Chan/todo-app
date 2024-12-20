import { 
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdNotStarted
 } from 'react-icons/md';
import { FaTrash } from "react-icons/fa";
import './TodoListItem.scss';
import cn from 'classnames';

const TodoListItem = ({todo, onRemove, onToggle, onStart}) => {
  const {text, checked} = todo;
  return(
    <div className='TodoListItem'>

      <div className={cn('checkbox', {checked})} onClick={(e) => onToggle(todo.id)}>
        {checked ? <MdCheckBox/> : <MdCheckBoxOutlineBlank/>}
        <div className='text'>{text}</div>
      </div>

      <div className='start' onClick={() => onStart(todo)}><MdNotStarted/></div>
      <div className='remove' onClick={() => onRemove(todo.id)}><FaTrash/></div>
    </div>
  );
};

export default TodoListItem;