# 🌿 PlantPath

PlantPath is a web app that helps plant lovers discover, track and manage their houseplants. You can search for plants, save them into your own collections and keep track of when each one needs water.

We built it as our group project in the course [DH2642 Interaction Programming and the Dynamic Web](https://www.kth.se/student/kurser/kurs/DH2642) at KTH, between December 2025 and January 2026. The main goal was to practise the **Model-View-Presenter (MVP)** architecture in **React**, with **MobX** for state management and **Firebase** for login and saving data.

**Live demo:** https://plantpath-bac3f.web.app

> [!NOTE]
> The project is finished and we're no longer working on it. Our subscription to the plant API has ended, so search doesn't return any results anymore. You can still create an account and look around, and the screenshots below show how the app looked when everything worked.

![Collections page with watering status for each plant](docs/screenshots/collections.jpg)

## Features

- **Search** for houseplants by common or Latin name, using the [House Plants API](https://rapidapi.com/mnai01/api/house-plants2)
- **Plant details** with watering, light and pruning info. The API gives light as lux ranges, so we turn that into plain text like "thrives in medium sun 🌤️"
- **Collections** that you name yourself, like "Bedroom" or "Living Room"
- **Watering tracker**: each plant gets a watering interval, and a coloured badge shows whether it needs water today, soon, or is fine
- **Ratings and comments**: rate a plant from 1 to 10 and leave comments that other users can read
- **Trending plants** on the search page, based on how often people add them to their collections
- **Accounts** with sign up, login and password reset. You can also browse without an account.

## Screenshots

| Start page | Login |
| :---: | :---: |
| <img src="docs/screenshots/start.jpg" alt="Start page" width="420"> | <img src="docs/screenshots/login.jpg" alt="Login page" width="420"> |
| **Search and trending** | **Plant details** |
| <img src="docs/screenshots/search.jpg" alt="Search page with trending plants" width="420"> | <img src="docs/screenshots/details.jpg" alt="Plant details with rating and comments" width="420"> |

## How it's built

The app follows the MVP pattern we learned in the course:

- **Model** (`src/model/`): MobX classes that hold the app's state and logic. `PlantPathModel` has the user's collections and watering history, `MetaDataModel` has the things shared between users (ratings, comments and trending scores), and `Plant` wraps the data from the API and works out the watering interval and light conditions.
- **Presenters** (`src/reactjs/`): MobX `observer` components that read from the model and pass data and callbacks to the views.
- **Views** (`src/views/`): simple React components that show what they get through props and tell the presenter when the user does something.

When you log in, your data is loaded from Firestore into the model. After that, MobX reactions save every change back to the database automatically.

**Tech:** React 19, Vite, MobX, React Router and Firebase (Authentication, Firestore and Hosting).

## Running it locally

You'll need Node.js 20.19 or newer, a Firebase project with Email/Password login and Firestore turned on, and a RapidAPI key for the House Plants API.

```bash
git clone https://github.com/Sana8200/PlantPath.git
cd PlantPath
npm install
cp .env.example .env
npm run dev
```

Fill in your own Firebase config and API key in `.env` before you start. The app runs at http://localhost:8080.

## Credits

Plant data and images come from the [House Plants API](https://rapidapi.com/mnai01/api/house-plants2) (images © [Tropicopia](https://www.tropicopia.com/)).

## License

The code is source-available for viewing only. See [LICENSE](LICENSE.md) for details.
