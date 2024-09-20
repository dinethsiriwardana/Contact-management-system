# Contact Management API

This is a simple Node.js application developed Express and MongoDB to manage contact information. It provides endpoints to add, retrieve, update, and delete contacts.

## Features

- Add a contact
- Retrieve all contacts
- Retrieve a contact by name or phone number
- Update a contact's details by name or phone number
- Delete a contact

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Docker

## Prerequisites

To run this project, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/contact-management-api.git
   cd contact-management-api

   ```

2. Install dependencies:
   npm install

3. Start MongoDB (if it's not already running):
   mongod

4. Run the application:
   node app.js

5. The server will be running at http://localhost:3000.

<br>

### API Endpoints

#### Add a Contact

URL: `/adddata`
Method: `POST`
Body:

```json
{
  "name": "John Doe",
  "contact": "1234567890"
}
```

#### Get All Contacts

URL: `/showdata`
Method: `GET`

#### Get Contact by Name

URL: `/showdata/:name`
Method: `GET`

#### Get Contact by Phone Number

URL: `/showdatacon/:contact`
Method: `GET`

#### Update Contact by Name

URL: `/updatedata/:name`
Method: `PUT`

```json
{
  "contact": "0987654321"
}
```

#### Update Contact by Phone Number

URL: `/updatedatabycon/:contact`
Method: `PUT`

```json
{
  "name": "Jane Doe"
}
```

#### Delete Contact by Name

URL: `/deletedata/:name`
Method: `DELETE`
