✨ Feature Overview
---------------------------------
=> Product Listing: View all products in a responsive table.
=> Add/Edit/Delete Products: Manage product information directly from the dashboard.
=> Pagination: Custom-built pagination from scratch for smooth navigation through products.
=> Search & Debouncing: Optimized search functionality with debouncing to reduce unnecessary renders.
=> State Management: Initially handled through props, later optimized using Redux for global state management.
=>Responsive Design: Fully responsive layout using Tailwind CSS.

⚡ Optimizations
--------------------------------
=> Redux for state management: Replaced complex prop drilling with Redux to handle global product state efficiently.
=> Debouncing: Implemented for search input to reduce frequent state updates and improve performance.
=> Pagination: Built custom pagination logic to handle large datasets without performance issues.
=> Tailwind CSS: Utility-first approach ensures minimal CSS overhead and faster rendering.
=> Lazy Loading: Implemented lazy loading for components and product lists to improve initial load time and overall app performance.

⏱ Time Tracking (per feature)
----------------------------------------
=> Project setup & folder structure	---  1 hour
=> Product listing & UI design	 ---     2 hours
=> Add/Edit/Delete product functionality ---   2 hours
=> Pagination (custom-built) ---  2 hours
=> Debounced search	---  1 hour
=> Lazy loading --- 30 min
=> Tailwind CSS styling & responsive design	---  1 hour
=> responsive table ----- 1 hour



🛠 Challenges & Solutions
-----------------------------------
=> Challenge: Managing complex state across multiple components using props
Solution: Integrated Redux for centralized state management, reducing prop drilling and improving code maintainability.
=> Challenge: Implementing search without causing frequent re-renders
Solution: Implemented debouncing to delay search state updates until the user stops typing.
=> Challenge: Pagination for a large dataset without using third-party libraries
Solution: Built a custom pagination component from scratch using vanilla JavaScript logic and React state.

📂 Tech Stack
----------------------------------
=> Frontend: React, Vanilla JavaScript, Tailwind CSS
=> Styling: Tailwind CSS
=> Tooling: npm, VS Code, Github, Vercel