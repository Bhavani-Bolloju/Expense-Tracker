# Expense Tracker 🧾
**An expense tracker built with vanilla JS to master DOM manipulation, state management, and dynamic UIs.** 

[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/) [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

<img width="1920" height="970" alt="Expense-Tracker-01-01-2026_03_02_PM" src="https://github.com/user-attachments/assets/a362a356-06ec-4c73-bcfa-82fa5b719d2b" />

## 🚀 Quick Start

```
git clone https://github.com/Bhavani-Bolloju/Expense-Tracker.git
cd expense-tracker
npm install
npm run dev 
```

**Live Demo:** https://keen-chimera-661bf9.netlify.app/

### ✨ Features

✅ Add/Edit/Delete expenses with form validation

✅ Multi-select + bulk delete (Cmd/Ctrl + click)

✅ Search by keyword, filter by category

✅ Sort by date/amount, pagination (50/page)

✅ Responsive table with serial numbers across pages

✅ Keyboard-navigable (Tab/Escape/Ctrl+A)

### 🛠 Tech Stack & Architecture

```
📁 src/
├── render.js     # DOM/UI manipulation
├── expense.js    # Core business logic
├── events.js     # Event delegation hub
└── utils/        # TableStateManager, Pagination

```
- Vanilla JS + Vite (no frameworks—pure DOM mastery)

- Event delegation for dynamic content

- Global state → Filter/Sort/Search → Paginate → Render

### 🧠 Challenges Solved
#### Dynamic forms in tables:

HTML tables do not allow `<form>` inside `<tr>`
<br/>
**Solution** - External form element + form attribute on inputs/buttons. Edit mode uses the same pattern. 

#### State sync issue:

Initial: Paginate → Filter/Sort per page = chaos on delete/navigate.
**Fixed**: Global state → Apply Filter/Sort/Search → Paginate. Clean flow.

#### Row numbers across pages:
Adding/removing expenses or navigating pages messed up row order numbers.  
**Fixed:** `Pagination class` properties + dedicated calc function.  


#### Perfectionism trap:
**Initial (Broken):** Get page items → Apply filter/sort/search per page → Delete → Fetch/reprocess new page items → Render. Chaos on deletes/navigates.  

**Fixed:** Global state → Filter/sort/search ALL items → Get current page → Render. Deletes auto-shift next items in. 10x simpler. 

### 💡 Key Learnings
- Form attribute associates inputs with form element anywhere (not just children!)
- Form attribute associated buttons bypass event delegation (DOM order wins)
- Event delegation = perfect for dynamic lists (delete/edit/sort)

### 🤝 Contributing

1. Fork → Clone → npm install
2. Add feature → raise PR
3. Issues? Open one!

### 📄 License
MIT © [Your Name] 2025

















