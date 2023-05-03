# social-network-api

## Description

This API is built for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list. The API is built using Node.js, Express.js, MongoDB, and Mongoose ODM.

## Installation

1. Clone the repository to your local machine
2. Navigate to the root directory of the project
3. Install dependencies by running `npm install`
4. Start the server by running ` npm start`

## Usage

Once the server is running, you can use a tool like Insomnia to test the API routes. Here are the available routes

## Users

- ` GET /api/users` - Get all users
- ` GET /api/users/:userId` - Get single user by ID
- ` POST /api/users` - Create a new user
- ` PUT /api/users/:userID` - Update a user by ID
- ` DELETE /api/users/:userId` - Delete a users by ID

## Thoughts

- `GET /api/thoughts` - Get all thoughts
- `GET /api/thoughts/:thoughtId` - Get single thought by ID
- `POST /api/thoughts` - Create a new thought
- `PUT /api/thoughts/:thoughtId` - Update a thought by ID
- `DELETE /api/thoughts/:thoughtId` - Delete a thought by Id

## Reactions

- `POST /api/thoughts/:thoughtId/reactions` - Add a reaction to a thought
- `DELETE /api/thoughts/:thoughtId/reactions/:reactionId` - Remove a reaction from a thought

## Friends

- `POST /api/users/:userId/friends/:friendId` - Add a friend to a user's friend list
- `DELETE /api/users/:userId/friends/:friendId` - Remove a friend from a user's friend list

## Walkthrough Video

![WalkThrough video](./video/Social%20Network%20Api%20mongodb_mongoose.gif)
