<h1>Robot Framework Example using React TypeScript Starterkit</h1>
<hr><p>UI built with react framework and developed using typescript.
Material UI is used for UI Components</p><h2>General Information</h2>
<hr><ul>
<li>Login/Signup modules are ready to use, state is managed using Redux</li>
</ul><h2>Technologies Used</h2>
<hr><ul>
<li>HTML</li>
</ul><ul>
<li>CSS</li>
</ul><ul>
<li>React</li>
</ul><ul>
<li>Typescript</li>
</ul><ul>
<li>Material UI</li>
</ul><h2>Setup</h2>
<hr><p>Requirements:
Node JS &gt;= 18.16.0
npm &gt;= 9.5.1</p><h5>Steps</h5><ul>
<li>Install Dependencies: <code>npm i</code></li>
</ul><ul>
<li>Start App: <code>npm run start</code></li>
</ul>

# APPLICATION SETUP

## Backend Setup

-   Install Python 3.10

-   Clone Front end Git Repository

    ```commandline
    git clone https://github.com/shashank-statusneo/robot-backend.git
    ```

-   Create and activate Virtual Environment

    ```commandline
      python -m venv env
    ```

-   Activate Virtual Environment

    ```commandline
    env\Scripts\activate --windows
    source env\lib\activate -- linux\macos
    ```

-   Install requirements

    ```commandline
    pip install -r requirements.txt
    ```

-   Create a file at root directory path with name **_.env_** with these keys.

```doctest
export FLASK_DEBUG = True
export FLASK_ENV = dev
export FLASK_APP = app.py
export DATABASE_URL=mysql+mysqlconnector://[username]:[password]@[host]:[port]/robot
export SECRET_KEY=[your_secret_key]
```

## Database Setup

-   Install MySQL Server
-   Start MySQL Server
-   Create a main database with name **_robot_**

-   Migrate Database

```commandline
flask db init
flask db migrate -m "migration message"
flask db upgrade
```

If facing error like **Error: Target database is not up-to-date.**
in **flask db migrate** command then run these commands.

```commandline
flask db stamp head
flask db migrate -m "migration message"
flask db upgrade
```

-   Upgrade or Downgrade and particular migration version

```commandline
flask db upgrade 'migration_version'
```

```commandline
flask db downgrade 'migration_version'
```

-   Run Server

```commandline
flask run
```

## UI Setup

-   Install Node JS and NPM
-   Clone Front end Git Repository
    ```commandline
     git clone https://github.com/shashank-statusneo/robot-frontend.git
    ```
-   Install Project Dependencies
    ```commandline
    npm i
    ```
-   Start Server

```commandline
npm run start
```
