# Workflowy Clone

This is a simple Workflowy clone that replicates some of its features like Nested Tasks and Sub-Tasks.

## Stack

**Client:** React, TypeScript, Apollo-Client, TailwindCSS

**Server:** Node, Apollo-Server, GraphQL, MongoDB. ([Server Repo](https://github.com/ChandrakantPal/workflowy-clone-server))

## Task Entity Design

```javascript
const Task = {
  id: '123',
  body: 'Do Workout',
  username: 'Chandrakant Pal',
  isDone: true | false,
  createdAt: '2021-06-08T11:03:25.323Z',

  // used to fetch / filter top level
  isRoot: true | false,

  // ids of subTasks that are Task entities aswell.
  // these will have isRoot = false.
  subTasks: ['id1', 'id2', 'id3'],
}
```

---

- The user is first authenticated and then redirected to the home page.
- Root tasks are fetched on the home page.
- Tasks with subtasks are expandable. When clicked, the subTasks ids are sent to a query resolver which fetches all the corresponding tasks.
- Several other resolvers are available for
  - creating a task and subtask
  - deleting a task
  - marking a task as completed
  - editing a task

## Q&A

> In the above task, if you also had to incorporate images/media of any kind with each of the tasks on the interface, what would you add to your current approach, you can discuss briefly.

An `imageUrl` field would need to be added in the Task entity which may in turn use services like S3 bucket or firebase storage to store the uploaded images. A mutation resolver to upload and store the image then generate a URL and update the imageUrl field can be used to achieve this.

> If you are using GraphQL and Redux on your front end, how would you manage the state for such a use case, since both of them come with their own state management libraries. How would you handle the same?

I’d use GraphQL for all the side effects in whichever component I have to do a side effect and use Redux as a store and update the store whenever needed after a particular side effect or any action that required state manipulation. I have done something similiar in my [ChatQL Project](https://github.com/ChandrakantPal/ChatQL-React-Node-GraphQL).
