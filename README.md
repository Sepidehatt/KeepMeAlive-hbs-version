# Keep Me Alive

## The problem

- After 60 days of inactivity, MongoAtlas pauses a cluster (ie. the db does not work anymore)

- MongoAtlas sends multiple emails with a warning but, from time to time we see projects of former students not working anymore (ie. if nobody goes to the site and does any operation that makes a query to the DataBase).

- This is actually quite a pitty. Having worked as freelance and for a couple of digital agencies (ie. projects that usually have a limited lifespan), for me it was very frustrating to be back to the job market, collect your list of top projects and then see that some of them are not online anymore sob

## The solution

- An app where users can add their projects. The app will keep them alive.

- Online version: https://keep.fly.dev/

### How the app keeps a project alive?

- Sends an http request to an endpoint that makes an operation with the database.

---

If you're an IronHack student (using the `ironlauncher` package) you can follow the example below:

1. In the `index.routes.js` you can add the following lines of code:

```javascript
const YourModel = require('../models/YourModel.model')

router.get('/keep-alive', (req, res, next) => {
  YourModel.find()
    .then(() => {
      res.status(200).json({ message: 'It worked' });
    })
    .catch(() => {
      res.status(500).json({ message: "It didn't work" });
    });
});
```

- `YourModel` should be one of your models ex.: `Recipes.model.js`

- You shouldn't return the data that you receive from the database, it's not needed.

2. Go to [Keep me Alive](https://keep.fly.dev/)

3. Register an account

4. Submit the backend link that do one request to the DB and doesn't return any information aside from the `.json({ message: 'It worked' || "It didn't work' })`

---

**DON'T:**

```javascript
const YourModel = require('../models/YourModel.model')

router.get('/keep-alive', (req, res, next) => {
  YourModel.find()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch();
});
```

- Don't use the `User` if possible because that would be a security risk for your project

**DON'T:**

```javascript
const User = require('../models/User.model')

router.get('/keep-alive', (req, res, next) => {
  User.find()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch();
});
```

---

A project by:

[Felipe Leite Mantovani's GitHub](https://github.com/F-Mantovani) <br/>
[Sepideh Attar's GitHub](https://github.com/Sepidehatt)
