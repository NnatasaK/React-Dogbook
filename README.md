# React-Dogbook
Background: A web application with React intended to be used as an admin tool for dog daycare staff to know which dogs are in the daycare and which of them are friends.

# Backend (server folder)
* technologies used: Node.js, express and MongoDB as a database
* models: User model - name, nickname, age, description, presence, friends list
* Routes:
         User route:
                    - GET all Users
                    - GET User by Id
                    - POST to create New User
                    - PATCH to Edit the User
                    - DELETE to delete the User
                    - DELETE to delete a Friend from Friends List
          Search route:
                    - GET to search for user by name
                    
# Frontend
* main technology used: React
# Components
HomePage:
-renders UsersList Component and static image

UsersList: 
- renders Search Component 
- lists last 10 created Users by their nicknames
- all Users that are currently present are highlighted in green color
- next to every User nickname there is an option to remove that User
- there is a button for creating new User
  
Form: 
- functional component that renders form to be used inside Edit and Create components to prevent repetition
- recieves props for name, nickname, age, description, current friends, new friend seletion, removing friend, submit
  
UserForm:
- custom useState hook that returns object with state variables and their functions that other Components can use
  
CreateUser:
- component for creating a new user
- uses useState hook to manage users information
- fetches existing users
- handles friend selection, removing friends, highlights present friends and leads to friend profile when clicked on it
- submits and renders a form
- link that navigates back to home page
  
EditUser:
- contains same structure as CreateUser component with exception of first fetching the user data and populating the form fields so user can see what needs to be edited
- submit is handled trough a different route
  
UserProfile:
- renders a profile of a specific user
- shows profile photo fetched from an external API that generates random image
- shows user information
- handles user presence with Boolen state variable
- options to delete user, edit user, delete friends from a friends list
- highlights present friends and leads to friend profile when clicked on it


           
