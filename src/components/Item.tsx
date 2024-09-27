type Todo = {
    id: number;
    text: string;
    done: boolean;
};

type ItemProps = {
    todo: Todo;
    updateTodos: (updater: (draft: Todo[]) => void) => void;
};

function Item({ todo, updateTodos }: ItemProps) {

    // 更新完成状态
    const handleToggle = () => {
        updateTodos(draft => {
            const item = draft.find(item => item.id === todo.id);
            if (item) {
                item.done = !item.done;
            }
        });
    };

    // 删除todo
    const handleDelete = () => {
        updateTodos(draft => {
            const index = draft.findIndex(item => item.id === todo.id);
            if (index !== -1) {
                draft.splice(index, 1);
            }
        });
    };

    return (
        <li>
            <input
                type="checkbox"
                checked={todo.done}
                onChange={handleToggle}
            />
            <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
                {todo.text}
            </span>
            <button onClick={handleDelete}>Delete</button>
        </li>
    );
}

export default Item;