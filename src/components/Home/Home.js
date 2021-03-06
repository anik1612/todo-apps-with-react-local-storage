import React from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import useLocalStorageState from 'use-local-storage-state/dist';
import Header from '../Header/Header';

const Home = () => {
    const [todos, setTodos] = useLocalStorageState('todos', [])
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = (data) => {
        setTodos([...todos, data.todo]);
    };

    const handleDeleteTodo = (index) => {
        const restItem = todos.filter((todo, i) => i !== index)
        setTodos(restItem);
    }
    return (
        <div className="todo-container">
            <Header />
            <div className='d-flex align-items-center justify-content-center text-white pt-5'>
                <div className='border rounded p-5 bg-dark'>
                    {
                        todos.map((todo, i) => (
                            <div className='d-flex justify-content-between border-bottom mb-2'>
                                <div className='mr-1'>
                                    <h4 key={i}>({i + 1}) {todo}</h4>
                                </div>
                                <div>
                                    <button onClick={() => handleDeleteTodo(i)} className='btn btn-sm text-white btn-danger'><FontAwesomeIcon icon={faTrashAlt} /></button>
                                </div>
                            </div>
                        )
                        )
                    }
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input type="text" className='form-control mb-3' placeholder="input your todo" name='todo' ref={register({ required: true })} />
                            <p className='text-white'>{errors.todo && '*Empty, Input Something'}</p>
                            <input type='submit' className='btn btn-block btn-outline-primary font-weight-bold text-white' value='Add new todo' />
                        </form>
                    </div>
                </div>
            </div>

            {/* developer info */}
            <div className='mt-5 text-center'>
                <h5 className='text-info display-4'>Developer: Anik Sarker</h5>
            </div>
        </div>

    );
};

export default Home;