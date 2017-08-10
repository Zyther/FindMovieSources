/* written by ZytherXYZ
 www.zyther.xyz | www.findmoviesources.com
 */

var searchItems, searchTerm, sourcesFor;
var someItem = [{
    item: {
        title: "Thanks for using Find Movie Sources.",
        img: "assets/img/film.png",
        year: "Above",
        overview: "Input must be two or more characters",
        rating: "Movie or TV Show",
        type: "Search for a",
        imdb: "N/A",
        link: false,
        popularity: 0
    }
}];
var loadingItem = [{
    item: {
        title: "Loading... This shouldn't take long.",
        img: "assets/img/film.png",
        year: "Loading...",
        overview: "Loading...",
        rating: "Loading...",
        type: "Loading",
        imdb: "N/A",
        link: false,
        popularity: 0
    }
}];
var noResults = [{
    item: {
        title: "No Results.",
        year: "No Results.",
        img: "assets/img/film.png",
        overview: "Input must be two or more characters",
        imdb: "N/A",
        link: false,
        popularity: 0
    }
}];

var errorSearch = [{
    item: {
        title: "There was an error searching.",
        desc: "Error.",
        year: "Error",
        img: "assets/img/film.png",
        imdb: "N/A",
        link: false,
        popularity: 0
    }
}];
var sortFilters = [
    { id: 1, name: "Popularity, Desc" ,     filter: "popularity",   reverse: true},
    { id: 2, name: "Popularity, Asc",       filter: "popularity",   reverse: false},
    { id: 3, name: "Vote Average, Desc",    filter: "vote_average", reverse: true},
    { id: 4, name: "Vote Average, Asc",     filter: "vote_average", reverse: false}
];


var genres = [ {
    id: 1,
    name: "Action & Adventure",
    tvids: [10759],
    mvids: [28, 12]
},
{
    id: 2,
    name: "Animation",
    tvids: [16],
    mvids: [16]
},
{
    id: 3,
    name: "Comedy",
    tvids:[35],
    mvids:[35]
},
{
    id: 4,
        name: "Crime",
    tvids:[80],
    mvids:[80]
},
{
    id: 5,
        name: "Documentary",
    tvids:[99],
    mvids:[99]
},
{
    id: 6,
        name: "Drama",
    tvids:[18],
    mvids:[18]
},
{
    id: 7,
        name: "Family",
    tvids:[10751],
    mvids:[10751]
},
{
    id: 8,
        name: "Kids TV",
    tvids: [10762],
    mvids: [10762],
    note: "added 10762 to mvids"
},
{
    id: 9,
        name: "History",
    tvids: [36],
    mvids: [36],
    notes: "added 36 to tvids"
},
{
    id: 10,
        name: "Horror",
    tvids: [27],
    mvids: [27],
    note: "added 27 to tvids"
},
{
    id: 11,
        name: "Music",
    tvids: [10402],
    mvids: [10402],
    note: "added 10402 to tvids"
},
{
    id: 12,
        name: "Mystery",
    tvids: [9648],
    mvids: [9648]
},
{
    id: 13,
        name: "News",
    tvids: [10763],
    mvids: [10763],
    note: "added 10763 to mmvids"
},
{
    id: 14,
        name: "Reality",
    tvids: [10764],
    mvids: [10764],
    note: "added 10764 to mvids"
},
{
    id: 15,
        name: "Romance",
    tvids: [10749],
    mvids: [10749],
    note: "added 10749 to tvids"
},
{
    id: 16,
        name: "Sci-Fi & Fantasy",
    tvids: [10765],
    mvids: [14,878]
},
{
    id: 17,
        name: "Soap",
    tvids: [10766],
    mvids: [10766],
    note: "10746 to mvids"
},
{
    id: 18,
        name: "Talk",
    tvids: [10767],
    mvids: [10767],
    note: "added 10767 to mvids"
},
{
    id: 19,
        name: "Thriller",
    tvids: [53],
    mvids: [53],
    note: "added 53 to tvids"
},
{
    id: 20,
        name: "TV Movie",
    tvids: [10770],
    mvids: [10770],
    note: "added 10770 to tvids"
},
{
    id: 21,
        name: "War & Politics",
    tvids: [10768],
    mvids: [10752]
},
{
    id: 22,
        name: "Western",
    tvids: [37],
    mvids: [37]
}
];
