This project is a React-based frontend application that fetches and displays artwork data from the Art Institute of Chicago's API using PrimeReact components. It includes features such as pagination, row selection via checkboxes, search-based selection, and loading indicators.

🚀 Built for GrowMeOrganic assignment by Saad Mehmood

📸 Preview
Displays a paginated and searchable data table of artworks with checkboxes, search-based selection, and overlay filter input.

📦 Features
✅ Fetches paginated artwork data from https://api.artic.edu/api/v1/artworks

📃 Display using PrimeReact's powerful DataTable and Paginator

🔄 Pagination and dynamic row update

🔍 Search for a number of rows and auto-select first N rows

✔️ Checkbox selection (individual + "select all")

⚡ Loading spinner using ProgressSpinner

📚 Overlay panel for row filtering

🧠 Persistent checkbox selection using context (CheckContext)

🛠️ Tech Stack
React

PrimeReact (DataTable, Paginator, Checkbox, Button, Spinner, etc.)

Axios for HTTP requests

Tailwind CSS for utility styling

Context API for shared checkbox state

📁 File Structure
bash
Copy
Edit
src/
├── App.tsx              # Main app component
├── context/
│   └── CheckContext.tsx # Shared state for checkbox management
🧪 How It Works
1. 📥 Data Fetching
Artwork data is fetched using Axios from the Art Institute of Chicago API. Pagination is handled via API query params.

2. ✅ Checkbox Management
Checkboxes are rendered in each row with their state managed by CheckContext.

"Select All" toggles all visible checkboxes.

Checkbox state is preserved across pagination.

3. 🔍 Row Selection via Search
An overlay form allows the user to enter a number (N).

The first N rows in the current page will be checked when searched.

🚀 Getting Started
1. Clone the repository
bash
Copy
Edit
git clone https://github.com/your-username/artworks-table-app.git
cd artworks-table-app
2. Install dependencies
bash
Copy
Edit
npm install
# or
yarn
3. Start the dev server
bash
Copy
Edit
npm run dev
# or
yarn dev
App will run on http://localhost:3000

✍️ Author
Saad Mehmood
🌐 LinkedIn
📧 mehmoodsaad347@gmail.com

