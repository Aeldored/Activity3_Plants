# 🌿 Plant Catalog Management System

A modern, responsive web application for managing plant catalog data with a beautiful garden-themed interface.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Usage Guide](#usage-guide)
- [API Reference](#api-reference)
- [Customization](#customization)
- [Browser Support](#browser-support)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## 🌟 Overview

The Plant Catalog Management System is a full-featured web application designed for managing plant inventory data. It provides an intuitive interface for viewing, adding, updating, and deleting plant records with real-time search functionality and duplicate prevention.

### Key Highlights
- **Garden-themed Design**: Beautiful nature-inspired UI with smooth animations
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile devices
- **Real-time Search**: Instant filtering across all plant data fields
- **Data Validation**: Comprehensive form validation with visual feedback
- **Duplicate Prevention**: Automatic detection and prevention of duplicate entries
- **XML Data Integration**: Loads initial data from XML and supports dynamic updates

## ✨ Features

### Core Functionality
- **Plant Data Management**
  - Add new plants with comprehensive details
  - Update existing plant information
  - Delete plants with confirmation
  - View plant catalog in sortable table format

- **Search & Filter**
  - Real-time search across all fields
  - Instant results with highlighting
  - Search by name, zone, light requirements, etc.

- **Data Validation**
  - Required field validation
  - Price format validation
  - Duplicate detection
  - Visual feedback for form states

- **User Experience**
  - Smooth animations and transitions
  - Toast notifications for user feedback
  - Responsive design for all devices
  - Accessibility features

### Advanced Features
- **Duplicate Management**: Manual cleanup tool for removing duplicate entries
- **Dynamic Zone Population**: Zone dropdown populated from actual data
- **Form Auto-population**: Click any table row to edit that plant
- **Floating Action Buttons**: Quick access to common actions
- **Enhanced Notifications**: Beautiful animated toast messages

## 🛠 Technologies Used

### Frontend
- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with CSS custom properties
  - Flexbox for layout management
  - CSS Grid for precise alignment
  - Custom animations and transitions
  - Responsive design with media queries
- **JavaScript (ES6+)**: Interactive functionality
  - Fetch API for data handling
  - DOM manipulation
  - Event handling
  - Local storage integration

### Frameworks & Libraries
- **Bootstrap 5.1.3**: Component framework and responsive grid
- **Custom CSS Variables**: Design system for consistency

### Data Sources
- **XML**: Initial plant catalog data
- **JSON**: Runtime data format for API communication

## 📁 Project Structure

```
Activity3_Plants/
├── index.html              # Main application file
├── script.js               # JavaScript functionality
├── plant_catalog.xml       # Initial plant data
├── backend.php             # Server-side data handling
├── README.md               # This documentation
└── assets/                 # (Optional) Additional resources
```

### File Descriptions

#### `index.html`
- Complete single-page application
- Embedded CSS styles for the garden theme
- Responsive layout structure
- Form elements and table structure

#### `script.js`
- Plant data management functions
- Search and filter functionality
- Form validation and submission
- Notification system
- XML data parsing

#### `plant_catalog.xml`
- Initial plant database
- Sample plant records with all required fields
- Used for bootstrapping the application

## 🚀 Installation & Setup

### Prerequisites
- Web server (Apache, Nginx, or built-in server)
- Modern web browser
- PHP support (for backend.php functionality)

### Quick Start

1. **Download/Clone the project**
   ```bash
   git clone [repository-url]
   cd Activity3_Plants
   ```

2. **Set up web server**
   ```bash
   # Using Python's built-in server
   python -m http.server 8000
   
   # Or using PHP's built-in server
   php -S localhost:8000
   
   # Or place in your web server's document root
   # e.g., /var/www/html/ or C:\xampp\htdocs\
   ```

3. **Access the application**
   - Open your browser
   - Navigate to `http://localhost:8000` (or your server's URL)
   - The application should load with sample plant data

### Configuration Options

#### CSS Custom Properties
You can customize the appearance by modifying CSS variables in `index.html`:

```css
:root {
    /* Color Palette */
    --primary-green: #667c5c;
    --secondary-green: #85a378;
    --tertiary-green: #a8c69b;
    
    /* Spacing Scale */
    --spacing-xs: 0.25rem;
    --spacing-sm: 0.5rem;
    --spacing-md: 0.75rem;
    
    /* Typography */
    --font-xs: 0.75rem;
    --font-sm: 0.85rem;
    --font-md: 0.95rem;
}
```

## 📖 Usage Guide

### Adding a New Plant

1. **Fill out the form fields**:
   - **Common Name**: Popular name (e.g., "Rose")
   - **Botanical Name**: Scientific name (e.g., "Rosa rubiginosa")
   - **Zone**: Hardiness zone (populated from existing data)
   - **Light**: Light requirements (Full Sun, Partial Sun, etc.)
   - **Price**: Numeric value in dollars
   - **Availability**: Current stock status

2. **Click "Add Plant"**
   - Form validation runs automatically
   - Duplicate checking prevents duplicates
   - Success notification appears
   - Form clears automatically

### Editing a Plant

1. **Click on any table row** to select a plant
2. **Form auto-populates** with plant data
3. **Modify desired fields**
4. **Click "Update"** to save changes
5. **Confirmation notification** appears

### Deleting a Plant

1. **Select a plant** by clicking its table row
2. **Click "Delete"** button
3. **Confirm deletion** in the popup dialog
4. **Plant is removed** from catalog

### Searching Plants

- **Type in the search box** at the top of the catalog
- **Results filter automatically** as you type
- **Search across all fields**: name, zone, light, price, etc.
- **Clear search** to view all plants

### Managing Duplicates

- **Click the cleanup button** (🧹) in the catalog header
- **Automatic detection** of plants with identical names
- **Bulk removal** with confirmation
- **Summary notification** shows results

## 🔧 API Reference

### Core Functions

#### Data Management
```javascript
// Load plant data from XML or backend
loadPlantsData()

// Parse XML document into plant objects
parseXMLData(xmlDoc)

// Save current plant data to backend
savePlantsData()
```

#### Plant Operations
```javascript
// Add new plant to catalog
addPlant()

// Update selected plant
updatePlant()

// Delete selected plant
deletePlant()

// Select plant for editing
selectPlant(index)
```

#### Search & Filter
```javascript
// Filter table based on search term
filterPlantsTable(searchTerm)

// Remove duplicate entries
removeDuplicates()

// Manual duplicate cleanup
manualRemoveDuplicates()
```

#### Form Handling
```javascript
// Get form data as object
getFormData()

// Validate form data
validateForm(data, isUpdate)

// Clear form fields
clearForm()

// Set dropdown values
setSelectValue(elementId, value)
```

#### UI Functions
```javascript
// Display notification to user
showNotification(message, type)

// Populate zone dropdown from data
populateZoneDropdown()

// Render plants table
displayPlantsTable()
```

### Data Structure

#### Plant Object
```javascript
{
    id: 1,                           // Unique identifier
    common: "Bloodroot",             // Common name
    botanical: "Sanguinaria canadensis", // Scientific name
    zone: "4",                       // Hardiness zone
    light: "Mostly Shady",           // Light requirements
    price: "$2.44",                  // Price with currency
    availability: "031599"           // Availability code
}
```

### Event Handlers

#### Form Events
- `submit`: Form submission with validation
- `input`: Real-time search filtering
- `click`: Row selection and button actions
- `focus`: Enhanced form field interactions

#### Keyboard Support
- `Enter`: Submit forms or confirm actions
- `Escape`: Clear search or cancel operations
- `Tab`: Keyboard navigation through form fields

## 🎨 Customization

### Theming

#### Color Schemes
Modify the CSS custom properties to change the color scheme:

```css
/* Example: Blue theme */
:root {
    --primary-green: #2c5282;
    --secondary-green: #3182ce;
    --tertiary-green: #4299e1;
    --accent-green: #2b6cb0;
}
```

#### Typography
Adjust font sizes and weights:

```css
:root {
    --font-xs: 0.75rem;
    --font-sm: 0.875rem;
    --font-md: 1rem;
    --font-lg: 1.125rem;
    --font-xl: 1.5rem;
}
```

### Layout Modifications

#### Adding New Fields
1. **Update the HTML form** in `index.html`
2. **Add CSS styling** for new form elements
3. **Modify JavaScript functions**:
   - `getFormData()`
   - `validateForm()`
   - `selectPlant()`
   - `displayPlantsTable()`

#### Custom Validation
Add custom validation rules in `validateForm()`:

```javascript
// Example: Email validation
if (data.email && !isValidEmail(data.email)) {
    showNotification('Please enter a valid email address.', 'error');
    return false;
}
```

### Advanced Customization

#### Animation Timing
Modify transition speeds:

```css
:root {
    --transition-fast: 0.1s ease;
    --transition-normal: 0.2s ease;
    --transition-slow: 0.4s ease;
}
```

#### Responsive Breakpoints
Customize responsive behavior:

```css
/* Custom tablet breakpoint */
@media (max-width: 900px) {
    .container-fluid {
        padding: 0.75rem;
    }
}
```

## 🌐 Browser Support

### Supported Browsers
- **Chrome**: 60+ ✅
- **Firefox**: 55+ ✅
- **Safari**: 12+ ✅
- **Edge**: 79+ ✅
- **Opera**: 47+ ✅

### Required Features
- CSS Custom Properties
- Flexbox
- ES6+ JavaScript features
- Fetch API
- DOM manipulation methods

### Polyfill Options
For older browser support, consider adding:
- CSS Custom Properties polyfill
- Fetch API polyfill
- ES6 features polyfill

## 🔍 Troubleshooting

### Common Issues

#### Data Not Loading
**Problem**: Plant catalog appears empty
**Solutions**:
1. Check console for JavaScript errors
2. Verify `plant_catalog.xml` file exists
3. Ensure web server is running
4. Check file permissions

#### Search Not Working
**Problem**: Search input doesn't filter results
**Solutions**:
1. Check JavaScript console for errors
2. Verify search input element has correct ID
3. Ensure `filterPlantsTable()` function is loaded

#### Form Validation Issues
**Problem**: Form submits without validation
**Solutions**:
1. Check `validateForm()` function implementation
2. Verify all required fields have `required` attribute
3. Ensure form submission calls validation

#### Styling Issues
**Problem**: Layout appears broken
**Solutions**:
1. Check for CSS syntax errors
2. Verify Bootstrap CSS is loading
3. Clear browser cache
4. Check responsive design settings

### Debug Mode
Enable debug mode by adding to console:

```javascript
// Enable detailed logging
localStorage.setItem('debug', 'true');

// View current plants data
console.log('Plants Data:', plantsData);

// Check form validation
console.log('Form Data:', getFormData());
```

### Performance Optimization

#### Large Datasets
For catalogs with 1000+ plants:
1. Implement pagination
2. Add virtual scrolling
3. Optimize search algorithms
4. Consider server-side filtering

#### Mobile Performance
- Reduce animation complexity on mobile
- Implement touch-friendly interactions
- Optimize image sizes if added
- Use CSS `will-change` for animated elements

## 🤝 Contributing

### Development Setup

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/new-feature
   ```
3. **Make changes and test thoroughly**
4. **Follow coding standards**:
   - Use consistent indentation (2 spaces)
   - Add comments for complex logic
   - Follow semantic naming conventions
5. **Submit a pull request**

### Coding Standards

#### JavaScript
- Use `const` and `let` instead of `var`
- Add JSDoc comments for functions
- Use descriptive variable names
- Handle errors gracefully

#### CSS
- Use CSS custom properties for values used multiple times
- Follow BEM naming convention for new classes
- Group related properties together
- Add comments for complex selectors

#### HTML
- Use semantic HTML elements
- Include proper accessibility attributes
- Validate markup
- Keep structure clean and organized

### Testing Guidelines

#### Manual Testing Checklist
- [ ] All CRUD operations work correctly
- [ ] Search functionality filters properly
- [ ] Form validation prevents invalid submissions
- [ ] Responsive design works on all devices
- [ ] Notifications appear and disappear correctly
- [ ] Duplicate prevention functions properly

#### Browser Testing
Test in multiple browsers:
- [ ] Chrome (latest 2 versions)
- [ ] Firefox (latest 2 versions)
- [ ] Safari (latest 2 versions)
- [ ] Edge (latest 2 versions)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Support

For questions, issues, or contributions:
- Create an issue in the repository
- Contact the development team
- Check the troubleshooting section above

---

**Happy Gardening! 🌱**