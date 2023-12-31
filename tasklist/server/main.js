import { Meteor } from  'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { TasksCollection } from '../imports/db/TasksCollection';
import '/imports/api/tasksMethods';
import '/imports/api/tasksPublications';

const insertTask = (taskText, user) =>{
  TasksCollection.insert({
    text: taskText,
    userId: user._id,
    createdAt: new Date(),
  });
};

const SEED_USERNAME = 'Ayush';
const SEED_PASSWORD = 'password';

Meteor.startup( () => {
  if(!Accounts.findUserByUsername(SEED_USERNAME)){
    Accounts.createUser({
      username:SEED_USERNAME,
      password:SEED_PASSWORD,
    });
  }
  const user = Accounts.findUserByUsername(SEED_USERNAME);
  
  if(TasksCollection.find().count() === 0){
    [
      'First Task',
      'Second Task',
      'Third Task',
      'Fourth Task',
      'Fifth Task',
      'Sixth Task',
      'Seventh Task'
    ].forEach((taskText) => insertTask(taskText,user));
  }
});

//So you are importing the TasksCollection and adding 
//a few tasks on it iterating over an array of strings 
//and for each string calling a function to insert this 
//string as our text field in our task document.