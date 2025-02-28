# Hackathon2025

The app includes user authentication functionality with email and password, as well as an admin dashboard accessible only to authenticated users.

## Features

- User authentication with email and password
- Sign up and sign in pages
- Protected admin dashboard
- Firebase integration for authentication and data storage
- Responsive design with Tailwind CSS

## Prerequisites

Before you begin, make sure you have the following installed on your machine:

- Node.js (v14 or later)
- npm (v6 or later)

## Getting Started

1. Clone the repository:

   ```
   git clone https://github.com/Harmandeepsinghteja/hackathon2025.git
   ```

2. Navigate to the project directory:

   ```
   cd hackathon2025
   ```

3. Install the dependencies:

   ```
   npm install
   ```

4. Create a new Firebase project and enable the Authentication and Firestore Database services.

5. Copy the Firebase configuration object from the Firebase console and replace the placeholders in `src/firebase/config.js`.

6. Start the development server:

   ```
   npm run dev
   ```

7. Open your browser and visit `http://localhost:3000` to see the application.

## Project Structure

- `src/app/`: Contains the Next.js pages and layout components.
- `src/context/`: Includes the AuthContext for managing user authentication state.
- `src/firebase/`: Contains Firebase configuration and utility functions for authentication and data operations.

## Deployment

To deploy the application, you can follow the official Next.js deployment guides for your preferred hosting platform, such as Vercel, Netlify, or Firebase Hosting.

## Contributing

Contributions are welcome! If you find any issues or want to add new features, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Firebase](https://firebase.google.com/)
- [Tailwind CSS](https://tailwindcss.com/)
