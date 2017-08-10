/* written by ZytherXYZ
 www.zyther.xyz | www.findmoviesources.com
 */

angular.module('fms.controllers', [])

.controller("cSearchResult", function(
        $scope, $http, $uibModal, Search, Browse, $state, $stateParams, $rootScope
    ){
    $scope.noRes = "";

    $scope.genreOutput = {};
    $scope.sortOutput = {};
    $scope.genreFilter = genres;
    $scope.sortFilters = sortFilters;



    function searchFor(term){
        $scope.items = loadingItem;
        $scope.detailFlag = false;
        $scope.searchTerm = term;
        searchTerm = term;
        $rootScope.$broadcast("searchTrigger");
        Search.Search($http, term, function(d){
            searchItems = d;
            $scope.detailFlag = true;
            $scope.items = d;
            if (d === noResults){
                $rootScope.$broadcast("noSearch");
                $scope.noRes = "No Results!";
            } else {
                $scope.noRes = "";
            }
        });
    }

    function goToBrowse(){
        $state.go("search.term", {
            term: "**browse",
            genres: "none",
            types: "tv,mv",
            order: "1",
            page: 1});
    }
    function runSort(){
        var tSort = $scope.sortOutput.selected;
        sortFilters.forEach(function(filter){
            if (tSort === filter.id){
                $scope.sortBrowseBy = filter.filter;
                $scope.reverse = filter.reverse;
            }
        });

    }

    function browseFor(){
        $scope.items = loadingItem;
        $scope.detailFlag = false;
        $scope.browseFlag = true;
        searchTerm = "";
        $rootScope.$broadcast("searchTrigger");
        var bGenres = $stateParams.genres;
        var bOrder = $stateParams.order;
        var bTypes = $stateParams.types;

        // genre validation
        if (bGenres !== "none"){
            if (bGenres.indexOf(",") > - 1 || typeof(parseInt(bGenres)) === "number" ) {
                try {
                    var bCount = 0;
                    var aGenres = bGenres.split(",");
                    $scope.genreOutput.selected = [];
                    aGenres.forEach(function(g){
                        var gg = parseInt(g);
                        if (bCount >= 0) {
                            if (gg > 0 && gg < genres.length && !(isNaN(gg)))  {
                                $scope.genreOutput.selected.push(gg);
                            } else {
                                bCount = -1;
                                goToBrowse();
                            }
                        }
                    });
                } catch (ex) {
                    console.log("cannot parse genres");
                    console.error(ex);
                    goToBrowse();
                }
            } else {
                goToBrowse();
            }
        } else { bGenres = null; }
        // end genre validation


        // type validation
        //console.dir(bTypes);
        if (bTypes.indexOf(",") > -1) {
            bTypes = bTypes.split(",");
        }
        switch (typeof(bTypes)){
            case "object":
                var bTCount = 0;
                bTypes.forEach(function(bT){
                    if (bTCount >= 0) {
                        if (bT !== "tv" && bT !== "mv") {
                            console.log("could not parse types");
                            bTCount = -1;
                            goToBrowse();
                        } else {
                                $scope.showFilter = "(✔) TV Shows";
                                $scope.movieFilter = "(✔) Movies";
                                $scope.filterShows = true;
                                $scope.filterMovies = true;
                        }
                    }
                });
                break;
            case "string":
                switch (bTypes){
                    case "tv":
                        $scope.showFilter = "(✔) TV Shows";
                        $scope.movieFilter = "(✘) Movies";
                        $scope.filterShows = true;
                        $scope.filterMovies = false;
                        break;
                    case "mv":
                        $scope.showFilter = "(✘) TV Shows";
                        $scope.movieFilter = "(✔) Movies";
                        $scope.filterShows = false;
                        $scope.filterMovies = true;
                        break;
                    default:
                        console.log("could not parse types");
                        goToBrowse();
                        break;
                } break;
            default:
                console.log("could not parse types");
                goToBrowse();
                break;
        }
        //end type validation

        //begin order validation
        try {
            var nOrder = parseInt(bOrder);
            if (nOrder > 0 && nOrder <= sortFilters.length) {
                $scope.sortOutput.selected = nOrder;
                $scope.sortOrderName = sortFilters[nOrder - 1].name;

            } else {
                console.log("cannot parse order");
                goToBrowse();
            }
        } catch (ex){
            console.log("cannot parse order");
            goToBrowse();
        }
        //end order validation

        if (bGenres !== null) {
            bGenres = bGenres.split(",");
        }

        Browse.Browse($http, {
            genres: bGenres,
            types: bTypes,
            order: bOrder
        }, function(d){
            searchItems = d;
            $scope.detailFlag = true;
            $scope.items = d;
            $scope.reverse = true;
            runSort();
            if (d === noResults){
                $rootScope.$broadcast("noBrowse");
                $scope.noRes = "No Results!";
            } else {
                $scope.noRes = "";
            }
            $scope.$apply();


        });
    }

    switch ($stateParams.term) {
        case null:
        case "":
        case " ":
            $scope.navSearch = "";
            break;
        case "**browse":
            // console.dir($stateParams);
            if  ((typeof($stateParams.genres)   === "undefined") ||
                (typeof($stateParams.types)     === "undefined") ||
                (typeof($stateParams.order)     === "undefined")) {
                    goToBrowse();
                    break;
            } else {
                browseFor();
                break;
            }
        default:
            //console.log(searchItems);
            searchFor($stateParams.term);
            break;
    }

    $scope.saveFilters = function(fM, fS){

        var sGenres, sOrder, sTypes;
        sOrder = $scope.sortOutput.selected;

        if (typeof($scope.genreOutput.selected) === "undefined" || $scope.genreOutput.selected === []){
            sGenres = "none";
        } else {
            //console.dir($scope.genreOutput.selected);
            sGenres = $scope.genreOutput.selected.join(",");
        }

        if ((fM === true && fS === true) ||
            (fM === false && fS === false)){
            sTypes = "tv,mv";
        }

        if (fM === true && fS === false){
            sTypes = "mv";
        }
        if (fM === false && fS === true){
            sTypes = "tv";
        }

        $state.go("search.term", {
            term: "**browse",
            genres: sGenres,
            types: sTypes,
            order: sOrder,
            page: 1},
            {reload: true});
    };

    $scope.resetFilters = function(){
        goToBrowse();
    };




    $scope.mF = function(s){
            if (s === true) {
                $scope.movieFilter = "(✔) Movies";
            } else {
                $scope.movieFilter = "(✘) Movies";
            }
    };
    $scope.sF = function(s){
        if (s === true){
            $scope.showFilter = "(✔) TV Shows"
        } else {
            $scope.showFilter = "(✘) TV Shows"
        }
    };


    $scope.openM = function(imdb) {
        var iTitle, iType, iImg, iDesc, iYear, iIMDB, iRating;
        searchItems.forEach(function (e) {
            if (imdb === e.imdb) {
                console.log("we have a match");
                iTitle = e.title,
                    iType = e.type,
                    iImg = e.img,
                    iDesc = e.overview,
                    iYear = e.yeartext,
                    iIMDB = e.imdb,
                    iRating = e.ratingtext;
            }
        });
        if (iType === "TV Show") {
            var iiType = "tv";
        } else if (iType === "Movie") {
            var iiType = "mv";
        }

        $uibModal.open({
            templateUrl: 'searchModal.html',
            size: 'lg',
            controller: 'cModal',
            controllerAs: '$ctrl',
            resolve: {
                data: {
                    title: iTitle,
                    type: iType,
                    type2: iiType,
                    img: iImg,
                    desc: iDesc,
                    imdb: iIMDB,
                    yeartext: iYear,
                    sources: "<p>Loading Sources...</p>",
                    ratingtext: iRating
                }
            }
        });
    }
})

.controller("cSearch", function($scope, $http, $uibModal, Search, $state, $stateParams){
    //console.log("fire");
    switch ($stateParams.term){
        case "**browse":
            $scope.notBrowsing = false;
            break;
        default:
            $scope.notBrowsing = true;
            break;
    }

})

.controller("cModal", function($scope, $uibModalInstance, $sce, $http, data, getSources, $rootScope){
    var $ctrl = this;
    $scope.item = data;
    sourcesFor = data.title + " " + data.imdb;
    $rootScope.$broadcast("getSources");

    $scope.sourceHTML = $sce.trustAsHtml(data.sources);

    getSources.guide($http, data.type2, data.imdb, function(d){
        if (d.result){
            if (d.result === "false"){
                $rootScope.$broadcast("noSources")
            }
        }

        $scope.sourceHTML = $sce.trustAsHtml(d.data);
    });

    $ctrl.close = function() {
        $uibModalInstance.dismiss('cancel');
    };
})


.controller("cAbout", function ($scope){


})

.controller("cNav", function($scope, $state, $http, Search, $rootScope) {
    $scope.isNavCollapsed = true;

    $scope.clearSearch = function() {
        $scope.navSearch = "";
    };

    $scope.iSearch = function(e) {
        e.preventDefault();
        var tSearch = $scope.navSearch;
        if (typeof(tSearch !== "undefined")) {
            switch (tSearch) {
                case null:
                    //TODO null
                    break;
                case "":
                    //TODO ""
                    break;
                case "**browse":
                    $state.go("search.term",
                        {term: tSearch,
                            genres: "none",
                            types: ["tv", "mv"],
                            order: 1,
                            page: 1},
                        {reload: true}
                    );
                    break;
                default:
                    $state.go("search.term",
                        {term: tSearch,
                            genres: null,
                            types: null,
                            order: null,
                            page: null},
                        {reload: true});
                    break;
            }
        } else {
            //TODO if undefined
            // searchItems = null;
        }
    };

    $rootScope.$on("searchTrigger", function(){
        //console.log("triggered");
        $scope.navSearch = searchTerm;
    });

});
