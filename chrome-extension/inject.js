/*global chrome:false */

chrome.extension.sendMessage({}, function(response) {

	var readyStateCheckInterval = setInterval(function() {

		if (document.readyState === 'complete') {

			clearInterval(readyStateCheckInterval);

			var docFrag = document.createDocumentFragment(),
				deps    = [
					{
						// CookieMaster CSS
						type:  'link',
						url:   'build/cookiemaster.css',
						async: true
					},
					{
						// Google Chart CSS
						type:  'link',
						url:   'lib/ui+en.css',
						async: true
					},
					{
						// Google Charts API
						type:  'script',
						url:   'lib/jsapi.js',
						async: false
					},
					{
						// Core Chart API
						type:  'script',
						url:   'lib/corechart.js',
						async: false
					},
					{
						// jQuery
						type:  'script',
						url:   'lib/jquery-2.1.0.min.js',
						async: false
					},
					{
						// External CookieMaster methods
						type:  'script',
						url:   'build/external-methods.js',
						async: false
					},
					{
						// CookieMaster methods
						type:  'script',
						url:   'build/cookiemaster.js',
						async: false
					}
				],
				dep, el, i;

			/**
			 * Create an element for each dependency and
			 * append to a document fragment
			 */
			for(i = 0; i < deps.length; i++) {

				dep = deps[i];
				el  = document.createElement(dep.type);

				if(dep.type === 'link') {
					el.rel  = 'stylesheet';
					el.href = dep.url;
				} else if(dep.type === 'script') {
					el.src = dep.url;
				}

				el.async = dep.async;
				docFrag.appendChild(el);

			}

			/**
			 * Append fragment to DOM
			 */
			document.head.appendChild(docFrag);

		}

	}, 10);

});