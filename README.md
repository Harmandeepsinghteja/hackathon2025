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

## Main Branch Rules

1. **Direct Push to Main**:

   - **Do not push directly to the `main` branch**. All changes must go through a pull request (PR) process.

2. **Creating a Feature Branch**:

   - When working on a new feature, bug fix, or improvement, **create a separate branch** off the `main` branch.
   - Name your branch based on the feature or task you are working on (e.g., `feature/login-page`, `bugfix/missing-logo`, etc.).

3. **Creating a Pull Request**:

   - Once you've completed the changes in your feature branch, create a pull request (PR) targeting the `main` branch.
   - Ensure that your PR has a clear title and description explaining what the changes are.
   - Include relevant details about the feature or bug fix, as well as any related issue numbers.

4. **Code Review**:

   - All pull requests should be **reviewed by at least one other team member** before merging.
   - Make sure the code follows the project’s coding standards, and runs correctly after testing.
   - Any issues or suggestions identified during the review process should be addressed before merging.

5. **Merging**:

   - Once the pull request is approved, you can **merge it into the `main` branch**.
   - Ensure that the merge doesn’t introduce any conflicts. If conflicts arise, resolve them before merging.
   - After merging, **delete the feature branch** to keep the repository clean.

6. **Continuous Integration (CI)**:
   - Ensure that all tests pass and the application works as expected on the `main` branch before merging any pull request.

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
