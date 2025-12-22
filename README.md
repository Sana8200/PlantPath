# 🌿 PlantPath

**PlantPath** is a personal web application project I am building to help plant enthusiasts discover, track, and manage their houseplant collections.

This project was developed to practice and demonstrate advanced **React** patterns, specifically the **Model-View-Presenter (MVP)** architecture, along with **MobX** for state management and **Firebase** for real-time data persistence.

> 🚧 **Status:** This project is currently in active development. I am constantly working on improving the features and UI.

## ✨ Key Features

### 🪴 Personal Plant Management
* **Custom Collections:** Users can create and manage their own collections (e.g., "Bedroom Plants").
* **Smart Watering Tracker:** Calculates specific watering schedules for each plant.
* **Visual Alerts:** Color-coded badges instantly show if a plant is "Thirsty" (Urgent), needs water "Soon," or is "OK."

### 🔍 Discovery & Data
* **Search Functionality:** Integrated search for finding plants by common or Latin names.
* **Care Instructions:** Detailed views showing light requirements, watering intervals, and pruning tips.
* **Trending Section:** Displays popular plants based on user interactions.

### 🗣️ Interaction
* **Rating System:** A custom 1-10 rating logic that calculates average scores dynamically.
* **Comments:** A section for users to leave notes or feedback on specific plant species.

## 🛠️ Tech Stack

I chose this stack to ensure a scalable and maintainable codebase:

* **Frontend:** React.js, Vite
* **State Management:** MobX (Reactive state)
* **Architecture:** Model-View-Presenter (MVP)
* **Styling:** CSS3 (with Custom Properties for theming)
* **Backend:** Firebase (Firestore & Authentication)

## 🚀 How to Run Locally

If you want to check out the code or run it on your machine:

1.  **Clone the repo**
    ```bash
    git clone [https://github.com/yourusername/leafkeeper.git](https://github.com/yourusername/leafkeeper.git)
    cd leafkeeper
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Firebase Setup**
    * You will need a `src/firebaseConfig.js` file with your own Firebase credentials to run the backend features.

4.  **Start the server**
    ```bash
    npm run dev
    ```

## 🗺️ Future Roadmap

I am actively working on this project. Here are some of the features I plan to implement next:

* [ ] **Refining the Rating Algorithm:** Improving how average scores are calculated and stored.
* [ ] **Enhanced Dark Mode:** Polishing the visual theme toggles for better accessibility.
* [ ] **User Profiles:** Allowing users to customize their profile and view public collections.
* [ ] **Photo Uploads:** Allowing users to upload photos of their own plants.

## 👤 Author

**Sana Monhaseri**

**Part of group project for Interaction-Porgramming-Dynamic-Web course at KTH**

This is a personal project created for educational purposes and portfolio demonstration. Feel free to reach out if you have questions about the code!
