import {Meteor} from 'meteor/meteor';
import React from 'react';
import { TasksCollection } from '../db/TasksCollection';
import {useTracker} from 'meteor/react-meteor-data'
import {Task} from './Task';
import { Taskform } from './TaskForm';
import { useState, Fragment } from 'react';
import { LoginForm } from './LoginForm';

const toggleChecked = ({_id, isChecked}) => {
  Meteor.call('task.setIsChecked', _id, !isChecked);
};

const HandleDelete = ({_id}) =>{
  Meteor.call('task.remove', _id);
}

export const App = () => {
  const user = useTracker(() => Meteor.user());
  const [hideCompleted, setHideCompleted] = useState(false)

  const hideCompletedFilter = { isChecked: {$ne: true}}; //returns all objects whose isChecked property is false
  const userFilter = user ? {userId : user._id} : {};
  //this is all the pendings tasks i.e the ischecked field is false plus current user
  const pendingOnlyTasks = { ...hideCompletedFilter, ...userFilter};

  const {tasks, pendingTasksCount, isLoading} = useTracker(() => {
      const noDataAvailable = { tasks: [], pendingTasksCount: 0};
      if(!Meteor.user()){
        return noDataAvailable;
      }
      const handler = Meteor.subscribe('tasks');
      
      if (!handler.ready()){
        return {...noDataAvailable, isLoading: true};
      }

      const tasks =  TasksCollection.find(
        hideCompleted ? pendingOnlyTasks : userFilter,
        {
          sort: {createdAt: -1}
        }
      ).fetch();

      const pendingTasksCount = TasksCollection.find(pendingOnlyTasks).count();

      return { tasks, pendingTasksCount};
  });
    const logout = () => {
    Meteor.logout();
    }
  
  return (
   <div className='app'>
     <header>
       <div className='app-bar'>
        <div className='app-header'>
          <h1>
          📝️  Task Management
            ({pendingTasksCount})
          </h1>
        </div>
      </div>
     </header>


     <div className='main'>
       {user ? (
        <Fragment>
          <div className="user" onClick={logout}>
            {user.username} 
          </div>
          <Taskform/>
        
        <div className='filter'>
          <button
            onClick = {() => setHideCompleted(!hideCompleted)} // changes the isChecked state to true/false 
                                                              //depending onclicking
          >
            {hideCompleted? 'Show All' : 'Hide Completed'}
          </button>
        </div>

        {isLoading && <div className='loading'>loading ...</div>}

        <ul className ='tasks'>
        {tasks.map(task => <Task 
          key= {task._id} 
          task={ task } 
          onCheckboxClick={toggleChecked}
          onDelete={HandleDelete}/>)}
        </ul>
      
      </Fragment>
     
    ) : (
      <LoginForm/>
    )}
    </div>
   </div>
 
)};
