### Temper

## What is Temper
Temper allows storing and quickly copying often used templates.
It also allows declaring variables in ${variable name} notation and modifying these variables from a side menu.
At the moment Temper only stores data in the browser's local storage
A live version of Temper is hosted at https://temperhelper.surge.sh/

## Technologies
Temper is built using React and redux-toolkit. Styling is done only with CSS, with no animations as to make usage as snappy as possible. react-responsive-masonry is used for notes placement

## Usage
### Adding templates
You can add a template using the + button. Any word surrounded by ${} will appear as an editable variable after saving.
![](https://github.com/tcalik/temper/blob/main/addnote.gif)
### Changing variables
Changing variables on the side bar will replace the variable with the new string of your choosing. The variable will be replaced in all templates containing that variable.
![](https://github.com/tcalik/temper/blob/main/editvar.gif)