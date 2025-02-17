# IMDb Clone

## Deployed URL: https://imdb-clone-orpin-theta.vercel.app/
## API Repo: https://github.com/preethiramiah/imdb-clone-api 

Create a IMDB.com like website with basic CRUD and movie listing using Node.js. We would like to have the following entities in the application.

### Relationships
• Actor can act in multiple movies.
• Movie can have multiple actors.
• Movie has only one producer.
• Producer can produce multiple movies.

### Application specifics (minimum requirements)
• Screen to list all movies with Name, Year of release, Producer and all Actors of that movie.
• Screen to ‘add’ a new movie with the necessary fields with existing actors and producers. If the user wants to add new ‘Actors’ and ‘Producers’ while creating the movie which are not present in the database, then he should be able to do so while being on the same screen.
• ‘Listing’ screen should allow user to click on ‘Edit’ and edit all the details of the movie and save it would be a nice to do thing.
• Use Redux/ MobX for State Management.

### Actors 
Name, Gender, DOB, Bio

### Movies
Name, Year of Release, Plot, Poster

### Producers
Name, Gender, DOB, Bio
