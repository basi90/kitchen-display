# Kitchen Display System

## Description
This React application serves as a dynamic kitchen display system, designed to streamline the process of managing and displaying orders in a restaurant setting. The system fetches order data from an external API, organizes it by table, and allows for interactive navigation through multiple pages of orders.

## Technologies Used
- **React**: Utilized for building the user interface with component-based architecture.
- **FontAwesome**: For icons used across the application.
- **CSS**: For styling components.

## Component Overviews

### App Component
- Root component that orchestrates data fetching, pagination, and state management.

### Table Component
- Renders `OrderTable` components based on processed data and manages pagination.

### OrderTable Component
- Displays details for each table, manages order status and interaction for highlighting and updating orders.

### Order Component
- Displays individual order items, focusing on reusability and data presentation.

### Navbar Component
- Provides real-time updates, navigation controls, and user interface elements like logo and interaction buttons.

## General Observations Across Components
- Each part of the application is broken down into manageable components, following best practices for maintainability and scalability.
- Effective use of React's useState and useEffect hooks to manage state and side effects.
- Consistent use of CSS for styling, ensuring responsive design and user-friendly interfaces.

## Features

- **Data Fetching**: Automatically fetches orders from `https://staging.smartendr.be/app/api_get_orders` with specified parameters.
- **Pagination**: Supports navigation through pages of orders, allowing users to view specific subsets of order data.
- **Real-Time Updates**: Includes a real-time clock and dynamically updates the order display.
- **Responsive Design**: Ensures that the application is usable on a variety of devices and screen sizes.

## Usage

Navigate through the app using the pagination controls at the bottom of the display. Each page shows up to 8 orders, organized by table. The navbar shows the current time and page information.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Installation
To get this project running locally, follow these steps:

```bash
# Clone the repository
git clone https://github.com/yourrepo/kitchen-display.git

# Go into the project directory
cd kitchen-display

# Install dependencies
npm install

# Start the development server
npm start
