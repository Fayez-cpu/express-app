Use app.use(). Don’t specify a route, just pass in a callback and serve the JSON and the 404.

But remember, the order is important! 
Where should this go if it is to pick up any routes which haven’t already been handled?