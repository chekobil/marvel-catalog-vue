## Development
Clone the repo in your local environment and run the next command to install all the dependencies

```npm install```

then run the next command to start the development server, by default it starts on localhost:5173

```npm run dev```

## Test mode

The test mode runs the application in a mode where every request is intercepted and the data is returned from JSON static files.

```npm run dev:test```

### Deploy to Vercel/Surge/Netlify

This is an SPA that manages routing on the client side, if you start the application at a route other than the root /, the server needs to know how to deal with that path. 
Vercel recommends to add a rewrite rule in a vercel.json file, but it does not work
Vite recommends the same, but the rewrite rule is slightly different, but it does not work either.

Then it comes surge.sh to the rescue, they recommend to add a 200.html file into the root of the project, as a fallback: *Now, when a request for a URL comes in where you don’t have a static HTML page, it will reach your 200 page instead, allowing you to use your client-side router*

And the same approach works perfectly in Vercel, but instead of using a 200.html file, Vercel server responds with 404.html file where there is no HTML page.

The postbuild script crashes in Netlify, so forget about Netlify.