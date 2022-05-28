import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';


export type TodoListsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}
export type FilterValuesType = "all" | "active" | "completed";

function App() {
     const todolistID1 = v1();
     const todolistID2 = v1();
    let [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });


    function removeTask(todolistID: string, id: string) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(t => t.id !== id)})
    }

    function addTask(todolistID: string, title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
    }

    function changeStatus(todolistID: string, taskId: string, isDone: boolean) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(m => m.id === taskId? {...m, isDone: isDone}: m)})
            //Создаем копию объекта tasks, в ключе todolistID заменяем массив на новый массив с помощью map, если id объекта m равен значению, которое приходит из клика - заменяем isDone, иначе оставляем
    }


    function changeFilter(todolistID: string, value: FilterValuesType) {
        setTodoLists(todoLists.map((filtered) => filtered.id === todolistID ? {...filtered, filter: value} : filtered))
    }

    return (
        <div className="App">
            {todoLists.map((mtl) => {
                let tasksForTodolist = tasks[mtl.id];
                if (mtl.filter === "active") {
                    tasksForTodolist = tasks[mtl.id].filter(t => t.isDone === false);
                }
                if (mtl.filter === "completed") {
                    tasksForTodolist = tasks[mtl.id].filter(t => t.isDone === true);
                }
                return (
                    <Todolist
                        key={mtl.id}
                        todolistID={mtl.id}
                        title={mtl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={mtl.filter}
                    />
                )
            })}

        </div>
    );
}

export default App;
