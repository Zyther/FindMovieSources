/* written by ZytherXYZ
 www.zyther.xyz | www.findmoviesources.com
 */

angular.module('fms', ['ngSanitize', 'ui.bootstrap', 'ui.router','ui.select', 'fms.services', 'fms.controllers'])
.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise("/s/**browse");
    $stateProvider
        .state('search', {
            url: '/s',
            views: {
                main: {
                    templateUrl: 'app/templates/search.html',
                    controller: 'cSearch'
                }
            }
        })
        .state('search.term', {
            url: '/:term?genres?types?order?page',
            views: {
                results : {
                    templateUrl: 'app/templates/searchResults.html',
                    controller: 'cSearchResult'
                }
            }
        })
        .state('about', {
            url:'/about',
            views: {
                main : {
                    templateUrl: 'app/templates/about.html',
                    controller: 'cAbout'
                }
            }
        })
})
.filter('propsFilter', function() {
    return function(items, props) {
        var out = [];
        if (angular.isArray(items)) {
            var keys = Object.keys(props);
            items.forEach(function(item) {
                var itemMatches = false;
                for (var i = 0; i < keys.length; i++) {
                    var prop = keys[i];
                    var text = props[prop].toLowerCase();
                    if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                        itemMatches = true;
                        break;
                    }
                }
                if (itemMatches) {
                    out.push(item);
                }
            });
        } else {
            // Let the output be the input untouched
            out = items;
        }

        return out;
    };
})
.run(['$rootScope', '$location', '$window', '$stateParams', function($rootScope, $location, $window, $stateParams) {
    $rootScope
        .$on('$stateChangeSuccess',
            function (event) {
                if (!$window.ga)
                    return;
                $window.ga('send', 'pageview', {page: $location.path()});
                if ($stateParams){
                    if ($stateParams.term === "**browse"){
                        $window.ga('send', 'event', 'browse', 'browse', JSON.stringify($stateParams));
                    } else {
                        $window.ga('send', 'event', 'search', 'search', $stateParams.term);
                    }
                }
        });
    $rootScope
        .$on("getSources", function (event) {
            if (!window.ga) return;
            $window.ga("send", "event", "search", "sources", sourcesFor);
        });
    $rootScope
        .$on("noSources", function (event) {
            if (!window.ga) return;
            $window.ga("send", "event", "nodata", "sources", sourcesFor);
        });
    $rootScope
        .$on("noSearch", function (event) {
            if (!window.ga) return;
            $window.ga("send", "event", "nodata", "search", searchTerm);
        });
    $rootScope
        .$on("noBrowse", function (event) {
            if (!window.ga) return;
            $window.ga("send", "event", "nodata", "browse", JSON.stringify($stateParams));
        });
}]);