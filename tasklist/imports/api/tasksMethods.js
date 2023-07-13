import {check} from 'meteor/check';
import { TasksCollection } from '../db/TasksCollection';

Meteor.methods({
    'tasks.insert'(text){
        check(text, String);

        if(!this.userId){
            throw new Meteor.Error('Not Authorized.');
        }

        TasksCollection.insert({
            text,
            createdAt: new Date,
            userId: this.userId,
        })
    },

    'task.remove'(taskId){
        check(taskId, String);
        
        if(!this.userId){
            throw new Meteor.Error('Not Authorized.')
        }
        
        const task = TasksCollection.findOne({_id: taskId, userId: this.userId});
        if(!task){
            throw new Meteor.Error('Acess denied.');
        }

        TasksCollection.remove(taskId)
    },

    'task.setIsChecked'(taskId, isChecked){
        check(taskId, String);
        check(isChecked, Boolean);
        
        if(!this.userId){
            throw new Meteor.Error('Not Authorized.')
        }

        const task = TasksCollection.findOne({_id: taskId, userId: this.userId});
        if(!task){
            throw new Meteor.Error('Access denied.');
        }
        
        TasksCollection.update(taskId, {
            $set : {
                isChecked
            }
        });
    }
});