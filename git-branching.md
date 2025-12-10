## Handle git-branching and adding new features

When you want to add a new feature, a new file or solve a bug. Start in main

```cmd
git checkout main
```

Pull the latest remote changes

```cmd
git pull
```

Then checkout a new branch with a name describing what you want to do.

```cmd
git checkout -b "new-feature"
```

Then write the code you need and run all tests to see that everything works correctly. Then commit your changes and add a commit message descirbing what that commit includes. After it is commited you can do

```cmd
git push
```

Then when you go inte github on the browser it should ask you if you want to make a pull request for this branch, click yes and start a pull request. Then wait for someone else in the group to either approve it or ask for changes. If you need to update your pr you can just make more commits into the same branch and your pr will update automatically. When the pr is approved by someone else, you can merge it into main.
