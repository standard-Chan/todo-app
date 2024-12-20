import { MdAdd } from 'react-icons/md';
import './TodoInsert.scss';
import { useCallback, useState } from 'react';

const TodoInsert = ({onInsert}) => {
  const [value, setValue] = useState('');

  const onChange = useCallback(e => {
    setValue(e.target.value);
  }, [])

  const onSubmit = useCallback(
    e => {
      onInsert(value);
      setValue('');
      e.preventDefault();
    }, [onInsert, value]);

  return (
    <form className='TodoInsert' onSubmit={onSubmit}>
      <input placeholder='할일을 입력하세요' value={value} onChange={onChange}/>
      <button type='submit'><MdAdd/></button>
    </form>
  );
};

export default TodoInsert;