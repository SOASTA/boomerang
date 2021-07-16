var CACHE_NAME = "17-sw-cache";
var urlsToCache = ["/pages/11-restiming/support/sm-image.jpg"];

self.addEventListener("install", function(event){
	event.waitUntil(
		caches.open(CACHE_NAME)
			.then(function(cache) {
				console.log("Opened cache");
				return cache.addAll(urlsToCache);
			})
	);
});

function handleSwImage(event) {
	if (event && event.request.method === "GET" && event.request.url.includes("sm-image")) {
		return caches.match(event.request).then(function(response) {
			// cache hit, return response
			if (response) {
				console.log("Cache hit for request");
				return response;
			}

			console.log("Cache Miss");
			// Cache miss, request from the network and cache the results as well

			var result = fetch(event.request).then(function(r) {
				// check if we got a valid response.
				if (!r || !(r.status === 200 || r.status === 204) || r.type !== "basic") {
					console.log("Invalid response");
					return r;
				}

				// clone the response so that we have one copy to be consumed by the cache
				// while the other copy can be returned by to be consumed by the browser.
				var resultCopy = r.clone();

				console.log("Putting requested object in cache: " + event.request);

				// put a copy of the response in our cache for future requests.
				caches.open(CACHE_NAME).then(function(cache) {
					cache.put(event.request, resultCopy);
				});

				// Now return the other response stream to be consumed by the browser.
				return r;
			});
			return result;
		});
	}
	else {
		console.log("Not intercepting: " + event.request.url);
		return fetch(event.request);
	}
}

self.addEventListener("fetch", function(event){
	console.log("Got fetch: " + event);
	event.respondWith(
		handleSwImage(event)
	);
});
