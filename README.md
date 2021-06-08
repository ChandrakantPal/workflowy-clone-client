# Workflowy clone

This is a MERNG Project i.e. (MERN + GraphQL)

This Projects uses a GraphQL endpoint.

This is the [Server Repo](https://github.com/ChandrakantPal/workflowy-clone-server)

This is a simple Workflowy clone and it replicates workflowy’s main feature i.e., Nested Tasks and Sub-Tasks.

The Data Entity of Task looks like the folliwing

```
const Task = {
  id: '123',
  body: 'Do Workout',
  username: 'Chandrakant Pal',
  isDone: true | false,
  createdAt: '2021-06-08T11:03:25.323Z',
  // used to fetch / filter top level
  isRoot: true | false,

  // subTasks will have isRoot false
  subTasks: ['id1', 'id2', 'id3'],
};
```

Subtasks are also task entities so they also follow the same structure.

On the Client once User Authentication is done the user will be redirected to the Home page, on the home page all the Root tasks are fetched.
For Task with subtasks an expansion button is provided and on clicking on this button the subTasks array (array of subTasksIds) is sent to a query resolver which fetches all the tasks from Database whose ids are present in that array and returns them.

There are other resolvers as well that are used for creating a task and subtask, deleting a task, marking a task as completed and Editing a Task.

## Tech Stack

**Client:** React, TypeScript, Apollo-Client, TailwindCSS

**Server:** Node, Apollo-Server, GraphQL, MongoDB

---

#### In the above task, if you also had to incorporate images/media of any kind with each of the tasks on the interface, what would you add to your current approach, you can discuss briefly

Well then I’d just have to add an imageUrl field in the task entity and may use services like S3 bucket or firebase storage to store the uploaded images and write a mutation resolver to upload and store the image then generate a url and update the imageUrl field.

---

#### If you are using GraphQL and Redux on your front end, how would you manage the state for such a use case, since both of them come with their own state management libraries. How would you handle the same

I’d use GraphQL for all the side effects in whichever component I have to do a side effect and use Redux as a store and update the store whenever needed after a particular side effect or any action that required state manipulation.
I have done something similiar in my [ChatQL Project](https://github.com/ChandrakantPal/ChatQL-React-Node-GraphQL).

## Authors

- [@ChandrakantPal](https://github.com/ChandrakantPal)
