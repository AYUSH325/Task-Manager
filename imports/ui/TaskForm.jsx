import React, {useState} from "react";
import {Meteor} from 'meteor/meteor';

export const Taskform = () => {
    const [text, setText] = useState("");

    const handleSubmit = (e) =>{
        e.preventDefault();

        if(!text){
            return;
        }else{
            Meteor.call('tasks.insert', text);
            setText("")
        }
        
    };

    return(
        <form className="task-form" onSubmit={handleSubmit}>
            <input
                type = "text"
                placeholder="Type to add new task"
                value ={text}
                onChange={(e) => setText(e.target.value)}
            />
            
            <button type="submit">Add Task</button>

        </form>
    );
};
