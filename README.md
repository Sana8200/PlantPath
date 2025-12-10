## Project Leafkeeper (plant care and health)

### Short description of your project

LeafKeeper is an app to help you take care of your plants. When you create an account on LeafKeeper you can start tracking your home plants, they can be stored in collections based on which room they are in your home. You can also make wishlists for plants you want to aquire and discover new favorites in the discover page. Plants in your collections and plants you find by searching for them will have care instructions, how much water they need, the temperature they thrive in, how much sunlight, how much pruning they need and much more details about the plant. For everyone that forgets to water your plants, LeafKeeper will give you reminders such that your plants never die again.

### What you have done

We have so far set up the login and user functionality with storage in firebase There is a login and a signup view. We also have the skeleton of the model and calls to the houseplants2 API. You can also switch between tabs in the app but so far the different tabs are just stumps. We also have the navigation between pages of the app.

### What you still plan to do

We are planning to populate the model with real data, right now we are using just one API example. We will also add styling to all pages of the app. We only have the skeletons of each page when logged in to the app currently so we will add all the content. We also need to add the reminder functionality and make the tabs from the top bar work. We will use another API to replace the pictures from the houseplants2 API since they are not the best. We will also add the search functionality. We plan to add a feature for commenting on and liking plants such that other users can discover plants and get tips for handling them. We also need to add the reminder functionality.

### Your project file structure (short description/purpose of each file)

In the folder reactjs we have all the presenters as well as the root. We mount the app in index with the help of ReactRoot which uses all of the presenters needed. In the folder views we are keeping all of the views. We also have some files for the firebase configuration. In the api folder we have code for making api calls and resolving promises. The leafKeeperModel.js is our main model of the app which keeps track of the state of our app.
