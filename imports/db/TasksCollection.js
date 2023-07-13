import { Mongo } from 'meteor/mongo'

export const TasksCollection = new Mongo.Collection('tasks');

//tasks is name of our collection in the MongoDb database

//TasksCollection is the name we use to represent the collection 'tasks'
//in react 
