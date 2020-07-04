# Task Manager

Backend for a task manager app with JWT authentication

Most of the source code is part of [The Complete Node.js Developer Course](https://www.udemy.com/the-complete-nodejs-developer-course-2) by [Andrew Mead](https://github.com/andrewjmead)

## Resource Endpoints

-   Authorization
    -   Create user - `POST /users`
    -   Login user - `POST /users/login`
-   User actions \*
    -   Logout user - `POST /users/logout`
    -   Logout all users - `POST /users/logoutAll`
    -   Read profile - `GET /users/me`
    -   Update user - `PATCH /users/me`
    -   Delete user - `DELETE /users/me`
-   Task management \*
    -   Create task - `POST /tasks`
    -   Read tasks - `GET /tasks`
        -   completed - `Boolean`
        -   sortBy - `<field_name>:asc|desc`
        -   limit - `Number`
        -   skip - `Number`
    -   Read task - `GET /tasks/:id`
    -   Update task - `PATCH /tasks/:id`
    -   Delete task - `DELETE /tasks/:id`

\* - Requires a valid JWT token as an HTTP request header (`Authorization: Bearer <jwt_token>`), which is sent from the authorization endpoints in the response body.

### Example API Call (Create user)

---

Creates a new user in the database.

-   **Endpoint**

    `/users`

-   **Method:**

    `POST`

-   **Data Params**

    **Required:**

    -   `name=[type:String]`
    -   `email=[type:String]` - Must be unique in the users collection
    -   `password=[type:String]` - Minimum length is 7, and cannot contain the word: _password_

    **Optional:**

    `age=[type:Number]` - Defaults to 0

-   **Success Response:**

    -   **Code:** 201 Created <br />
    -   **Data:** <br />
        ```
        {
         {
        6,
        ",
        ",
        ",
        ",
        ",
         1
        },
        g"
        	}
        ```

-   **Error Response:**

    -   **Code:** 400 Bad Request <br />
