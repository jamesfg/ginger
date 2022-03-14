
# To Start

    1. From this directory run "npm start"

    2. Go to localhost:3000

# Articles


1. Client

    A) Wanted to take advantage of the Author comments returned but did not have time to figure out a good way to put it on the screen.
    
    B) Implement a results per page system instead of the static 10 im using in the client.

2. Server
        
    A) Same as UI, implement some sort of pagination system, rather than a static number.
    
    B) Would have liked some testing to make sure the data was being formatted correctly or to make sure that the UI worked when sent data in a certain way. I had some trouble with the formatting from the api at first and when it switched my UI broke. I also have no checks if anything is missing or malformed.

# Authors

1. Client

    A) Would have liked to have some sort of either client side paging or paging on the server for the cached authors.
    
    B) Maybe added a way to see and query the article Ids since I had them so you could see what papers had been written over the last couple of months

    C) Added a search, either as an API all to the cached paginated authors or to the whole thing on the client side.

2. Server

    A) Optimized the caching. I run it every 24 hours but I restart the whole thing. Ideally I could purge the cached list of old articles and check article Ids and dates for new ones without having to clear and start over.

    B) Optimize the sorting. I am doing it every time I make a call from the client but in theory once the authors are done aggregating for the day they don't need to be sorted anymore. I was trying to avoid doing it on the server api calls because it was slowing everything down. 
    
    C) Find a better way to cache them than a global variable. 
    
    D) Pagination again for the cached authors.

    E) Kept track of more information to display more data options on the author list, like links to articles. 
    
    F) I was keeping track of the formatted publish date rather than the precise publish date. Should have kept both. 

    G) Add testing of formatted data. Same, I have no testing to do anything if anything is missing or malformed. 

