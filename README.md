# CheckIT

CheckIT is a frontend e-commerce website for electronics, built with React.

The project provides a modern shopping experience with a product catalog, search, categories, product pages, shopping cart, favorites, authentication, API integration, and responsive design.

The main purpose of the project is to demonstrate the development of a complete frontend application using modern React technologies and a REST API.

## Features

* Product catalog
* Product search
* Product categories
* Product details pages
* Shopping cart
* Favorites
* User registration and login
* Location selection
* Pagination
* Responsive design
* Mobile navigation
* Modal windows
* API integration
* Client-side routing
* Local data persistence
* UI animations

## Architecture

The project follows a component-based React architecture.

```text
App
|
├── Layout
|   ├── Header
|   ├── Main Content
|   ├── Footer
|   └── MobileBottomNav
|
├── Pages
|   ├── Home
|   ├── ProductPage
|   ├── SearchPage
|   ├── CartPage
|   └── FavoritesPage
|
├── Components
|   ├── Common
|   ├── Layout
|   ├── Products
|   ├── Hero
|   └── Container
|
├── Context
|   ├── ProductsContext
|   ├── CartContext
|   ├── FavoritesContext
|   └── LocationContext
|
├── API
|   └── Products API
|
└── Data
    ├── Categories
    ├── Brands
    └── Mock Data
```

## Project Structure

```text
src/
|
├── api/
|   └── productsApi.js
|
├── components/
|   |
|   ├── common/
|   |   ├── Icons.jsx
|   |   ├── Logo.jsx
|   |   ├── ContactModal.jsx
|   |   ├── ProfileModal.jsx
|   |   ├── Pagination.jsx
|   |   └── SectionHeader.jsx
|   |
|   ├── container/
|   |   └── Container.jsx
|   |
|   ├── hero/
|   |   ├── HeroSection.jsx
|   |   ├── HeroBanner.jsx
|   |   └── CategorySidebar.jsx
|   |
|   ├── layout/
|   |   ├── Header.jsx
|   |   ├── Footer.jsx
|   |   └── MobileBottomNav.jsx
|   |
|   └── products/
|       ├── ProductCard.jsx
|       └── ProductSection.jsx
|
├── context/
|   ├── ProductsContext.jsx
|   ├── CartContext.jsx
|   ├── FavoritesContext.jsx
|   └── LocationContext.jsx
|
├── data/
|   ├── products.js
|   ├── categories.js
|   └── mockData.js
|
├── pages/
|   ├── Home.jsx
|   ├── ProductPage.jsx
|   ├── SearchPage.jsx
|   ├── CartPage.jsx
|   └── FavoritesPage.jsx
|
├── App.jsx
├── main.jsx
└── index.css
```

## Technologies

### Frontend

* React
* JavaScript (ES6+)
* React Router
* Tailwind CSS
* Framer Motion

### Data and API

* REST API
* Fetch API
* JSON
* localStorage

### Development Tools

* Vite
* Git
* GitHub

## API Integration

Product data is retrieved from a REST API.

The frontend uses the Fetch API to send HTTP requests and receive product information in JSON format.

A single product can be requested using its ID:

```text
GET /{id}
```

For example:

```text
GET /1
```

The project currently works with 88 product IDs.

The API layer contains two main functions:

```text
getProducts()
getProductById(id)
```

`getProducts()` loads the product catalog.

`getProductById(id)` loads a specific product.

Multiple requests are handled using `Promise.allSettled()`. This allows the application to process successful requests even if some individual requests fail.

## State Management

React Context is used to manage application-wide state.

### ProductsContext

Responsible for loading and providing product data to the application.

### CartContext

Responsible for:

* Adding products to the cart
* Removing products
* Changing product quantities
* Calculating the total price
* Persisting cart data

### FavoritesContext

Responsible for:

* Adding products to favorites
* Removing products from favorites
* Persisting favorite products

### LocationContext

Responsible for storing and providing the selected location.

## Routing

React Router is used for client-side navigation.

Main routes include:

```text
/
```

Home page.

```text
/search
```

Search page.

```text
/product/:id
```

Dynamic product page.

For example:

```text
/product/15
```

opens the product with ID 15.

The application uses client-side routing, so navigation between pages does not require a complete browser reload.

## Local Storage

The application uses the browser's `localStorage` to persist certain data.

Examples include:

```text
users
user
isLoggedIn
cart
favorites
location
```

This allows application data such as the shopping cart and favorites to remain available after refreshing the page.

## Authentication

The project includes a simple frontend authentication system for demonstration purposes.

Users can:

* Register
* Log in
* Log out

Authentication data is stored in `localStorage`.

This implementation is intended for educational purposes and is not designed for production use.

In a production application, authentication would normally be handled by a backend server and database.

```text
Frontend
    |
    v
Backend API
    |
    v
Database
```

## Component-Based Design

The application is divided into reusable React components.

For example:

```jsx
<ProductCard />
```

is responsible for displaying product information.

```jsx
<Header />
```

contains the main navigation and header functionality.

```jsx
<Footer />
```

contains the website footer.

```jsx
<SectionHeader />
```

provides reusable section headings.

Using reusable components reduces duplicated code and makes the project easier to maintain.

## Responsive Design

The website is designed to work across different screen sizes.

The main responsive layouts include:

* Mobile
* Tablet
* Desktop

Tailwind CSS responsive utilities are used to adapt components and layouts.

The mobile version includes a dedicated bottom navigation bar and mobile-specific modal behavior.

## Animations

Framer Motion is used for selected interface animations.

It is mainly used for:

* Modal animations
* Panel transitions
* Element appearance
* Mobile interface transitions

Example:

```jsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
>
```

## Installation

Clone the repository:

```bash
git clone https://github.com/USERNAME/checkit.git
```

Navigate to the project directory:

```bash
cd checkit
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will be available at the local address provided by Vite.

## Production Build

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Deployment

The project can be deployed to frontend hosting platforms such as Vercel.

The production build is generated using:

```bash
npm run build
```

The generated files are located in:

```text
dist/
```

## Project Goals

The main goal of CheckIT is to demonstrate the development of a complete frontend e-commerce application using React.

The project demonstrates:

* Component-based architecture
* React Hooks
* React Context
* Client-side routing
* REST API integration
* HTTP requests
* JSON data processing
* localStorage
* Search functionality
* Product categories
* Shopping cart
* Favorites
* Authentication
* Responsive design
* Modal windows
* Animations
* Pagination

## Author

Yusuf Heydarli

Computer Science Student
Baku State University

## License

This project was created for educational purposes.
