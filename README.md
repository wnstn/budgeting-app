# my goddamn budgeting app

I hate capitalism! I hate money! The concept of property and ownership is rather problematic to me. BUT also we live in a society blah blah blah. So I built a super esoteric budgeting app that does exactly what I need and nothing I don't.

**Features**
* You can define categories and static budget amounts
* You can define up to 2 monthly paydays. Budgets will auto refill on paydates.
* You can spend against the categories! Just hit the spend button and add a transaction.
* You can delete transactions!
* Mobile optimzed! Honestly looks like shit on anything larger.

**Non-features**
* This fucker saves all your data to your device, and your device alone.
* There is no backup.
* There is no connectivity to your bank.
* There is no goddamn tracking.
* You gotta set it up and host it yourself if you wanna modify the categories.

[screenshot of the goddamn app](https://user-images.githubusercontent.com/779882/111620562-44563080-87bd-11eb-8369-ec02e69e7f70.png)



## This uses svelte

Install the dependencies...

```bash
npm install
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000). You should see your app running.

By default, the server will only respond to requests from localhost. To allow connections from other computers, edit the `sirv` commands in package.json to include the option `--host 0.0.0.0`.

If you're using [Visual Studio Code](https://code.visualstudio.com/) we recommend installing the official extension [Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode). If you are using other editors you may need to install a plugin in order to get syntax highlighting and intellisense.

## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```

You can run the newly built app with `npm run start`. This uses [sirv](https://github.com/lukeed/sirv), which is included in your package.json's `dependencies` so that the app will work when you deploy to platforms like [Heroku](https://heroku.com).

## Deploying to the web

I use Netlify. It was simple. Go create a new project, point it at your repo, make sure the build command is `npm run build` and then serving directory is `public`. Hit it on your phone, save it as a web app, and boom.
