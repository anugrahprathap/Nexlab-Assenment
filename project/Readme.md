
### A platform where users can earn points for completing tasks, primarily related to downloading and using mobile apps.

## Features

### Admin Facing

Admin users can manage the platform's functionality, primarily involving adding Android apps and setting the number of points users can earn by downloading them.

- [x] Admin users can log in and manage the platform.
- [x] Admins can add Android apps to the platform.
- [x] Admin views the list of users who have uploaded screenshots.
- [x] Admin reviews and verifies user screenshots to confirm task completion.
- [x] Admin can reject or approve task completion.
- [x] Admins can set the number of points users earn for downloading each app.

### User Facing

Regular users can engage with the platform to earn points, monitor their progress, and provide proof of task completion.

- [x] Users can sign up and log in to the platform.
- [x] Users have a personal profile with their name and other details.
- [x] Users can view their earned points.
- [x] Users can upload a screenshot as proof of task completion.




## Tech Stack

- Frontend: React, Bootstrap
- Backend: Django
- Authentication and Session Management: JWT Token
- Deployment: Frontend (Netlify), Backend (Vercel)

## Installation and Setup

Follow the instructions below to set up your development environment:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-app.git
   ```

2. Frontend Setup:
   - Navigate to the frontend directory.
   - Install the dependencies:

     ```bash
     cd frontend
     npm install
     ```

   - Start the development server:

     ```bash
     npm start
     ```

3. Backend Setup:
   - Navigate to the backend directory.
   - Create a virtual environment (recommended) and activate it.

   - Install the required packages:

     ```bash
     pip install -r requirements.txt
     ```

   - Run migrations:

     ```bash
     python manage.py migrate
     ```

   - Start the Django development server:

     ```bash
     python manage.py runserver
     ```

Your app should now be running, and you can access the frontend at [http://localhost:3000](http://localhost:3000) and the backend at [http://localhost:8000](http://localhost:8000).

