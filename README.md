# mern-littleSecrets
Little Secrets is web app where you can save all your personal secrets (posts) and create a shared page (called Secret), where you and your friends can all share secrets (posts)!

[Demo](https://www.youtube.com/watch?v=AtMSDQVVmAk)

## Features
- Create and update user data
- Personal homepage where user can share private posts
- Delete private posts
- Create Secrets (shared pages) protected by password, where multiple users with access can share posts

## Technologies Used

- **Frontend**: Vite, React.js, React Icons/Router/Dom, Axios
- **Backend**: Node.js, Express.js, Mongoose, Bcrypt 

## Technical notes
- Implemented robust register and login logic, with custom constrains on register, password encryption with bcrypt and JWT creation on login

- Fully implemented JWT both for authentication of users when they login,
and for authorization of access to certain data (personal and shared posts, list of existing secrets) and certain pages (update user page).

- DB designed in an efficent way, both personal and shared posts use the same post model, this can happen because of a validator function within the post model.

- Built with a RESTful API and MVC architecture in mind

- Responsive design

## Instructions

1. Clone the repository

2. Install dependencies:
For backend (from root):
```console
npm install
```
        
For frontend (from root):
```console
cd frontend
npm install
```

3. Setup environment variables:
- `PORT`: The port on which the backend server will run.
- `MONGO_URL`: The connection string for your MongoDB database.
- `JWT_SECRET`: A secret key for signing JSON Web Tokens.

4. Start the application:
    -Backend server(from root):
    ```console
    cd backend
    node server.js (runs server.js with node) 
    ```
    OR
    ```console
    npm run dev  (runs server.js with nodemon trougth a script)
    ```

    -Frontend server(from root):
    ```console
    npm run dev
    ```

5. Open your browser on http://localhost:5173 (default vite port)