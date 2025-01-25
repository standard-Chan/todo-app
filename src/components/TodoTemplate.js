import './TodoTemplate.scss';

const TodoTemplate = ({children}) => {
  return (
    <div className='TodoTemplate'>
      <div className='app-title'>할 일 목록</div>
      <div className='content'>{children}</div>
    </div>
  );
};

export default TodoTemplate;