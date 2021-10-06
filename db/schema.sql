USE company;
DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS managers;
DROP TABLE IF EXISTS employees;

CREATE TABLE departments (
    id INTEGER AUTO_INCREMENT PRIMARY KEY, 
    dep_name VARCHAR(30) NOT NULL, 
);

CREATE TABLE roles (
    id INTEGER AUTO_INCREMENT PRIMARY KEY, 
    title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    department_id INTEGER,
    FOREIGN KEY (department_id) 
        REFERENCES departments(id) 
        ON DELETE SET NULL
);

CREATE TABLE managers (
    id INTEGER AUTO_INCREMENT PRIMARY KEY, 
    manager_name VARCHAR(70);
    department_managed VARCHAR(30),
    FOREIGN KEY (department_managed)
         REFERENCES departments(dep_name)
         ON DELETE SET NULL
);

CREATE TABLE employees (
    id INTEGER AUTO_INCREMENT PRIMARY KEY, 
    first_name VARCHAR(30) NOT NULL, 
    last_name VARCHAR(30) NOT NULL, 
    role_id INTEGER, 
    manager_id INTEGER, 
    FOREIGN KEY (role_id)
         REFERENCES roles(id) 
         ON DELETE SET NULL,
    FOREIGN KEY(manager_id) 
        REFERENCES managers(id)
        ON DELETE SET NULL;
)