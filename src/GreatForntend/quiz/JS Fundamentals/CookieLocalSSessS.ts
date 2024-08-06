// TODO Describe the difference between a cookie sessionStorage and localStorage

//TL;DR
// All of the fallowing are mechanism of storing data on client,
// in this case - in user browser

// localStorage and sessionStorage both implement WEB Storage API Interface

//TODO Cookies
// Suitable for server-client communication, small storage capacity,
// ! can be persistent(постоянные) or session-based,
// ! domain-specific.
//Sent to the server on every request.

//TODO localStorage
// Suitable for long-term storage, data persists even after the browser is closed,
// ! acessible across all tabs and windows of the same origin,
//highest storage capacity among the three

//TODO sessionStorage
// ! Suitable for temporary data within a single page session,
// data is cleared when the tab or
// window is closed, has a higher storage capacity compared to cookie

// Property         Cookie                               localStorage             sessionStorage

// Initiator        client or server(Set-cookie header)   Client                  Client

// Lifespan         As specified                          Until deleted           until tab closed

// Persistance      If exp date is set                    Yes                     No
// across browser
// sessions

//Sent to server   Yes, sent via "Cookie"                 No                       No
// with every      header
// HTTP request

//Total capacity   4kb                                     5MB                      5MB

// Access          Across windows/tabs                     Across windows/tabs       Same tab

// Security        JS cannot access "HttpOnly" cookie      None                     None

// Todo Storage on the web
// Cookies, localStorage, sessionStorage, are useful to store data like tokens themes,
// ersonalized layouts, so that users can have a consistent experience

// They have the following common properties:

// 1. client can modify values (except HttpOnly cookies)
// 2. Key-value based storage
// 3. they are only able store values as strings

// TOdo USE cases for each storage

//Todo Cookie
// 1.Since cookie have a low size, its now advisable to store all client data within. The
// distinguish properties (отличительная черта) about cookies are that cookies are sent
// on every HTTP request so the low max size is a feature that prevents HTTP requests
// from being too large due cookies. Auto expiry is usefull as well

// With that in mind the best kind of data to store within cookies is small pieces of
// data that needs to be transmitted to the server, such as auth tokens, session IDs, analytics
// tracking IDS, GDRP cookie consent, language preferences that are important for auth, and
// !rendering on the server. (didnt know)
// !There values are sometimes sensitive and can benefit from the HttpOnly, Secure,
// ! and Expires/Max-Age
// capabilities that cookie provide

//Todo localStorage and sessionStorage
// Both implement Web Storage API, they have 5 mb total capacity its enought
// they are not automatically sent on HTTP requests. While you can manually
// include values from Web Storage when making AJAX/Fetch requests
// Hence web storages shouldnt be ised to store data that is relied on by the server
// if server-side rendering is being used (typically
// authentication/authorization-related information).
// todo localStorage is most suitable for user preferences data that do not epire(theme, layout)

// todo sessionStorage is most suitable for temporary data, that only needs to be accessible within the current browsing session
// todo such as form data  (useful to preserve data during accidental reloads).

// !Cookies
// Set a cookie for the name/key `auth_token` with an expiry.
document.cookie =
  "auth_token=abc123def; expires=Fri, 31 Dec 2024 23:59:59 GMT; path=/";

// Read all cookies. There's no way to read specific cookies using `document.cookie`.
// You have to parse the string yourself.
console.log(document.cookie); // auth_token=abc123def

// Delete the cookie with the name/key `auth_token` by setting an
// expiry date in the past. The value doesn't matter.
document.cookie = "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";

//! localStorage
// Set a value in localStorage.
localStorage.setItem("key", "value");

// Get a value from localStorage.
console.log(localStorage.getItem("key"));

// Remove a value from localStorage.
localStorage.removeItem("key");

// Clear all data in localStorage.
localStorage.clear();

//! sessionStorage
// Set a value in sessionStorage.
sessionStorage.setItem("key", "value");

// Get a value from sessionStorage.
console.log(sessionStorage.getItem("key"));

// Remove a value from sessionStorage.
sessionStorage.removeItem("key");

// Clear all data in sessionStorage.
sessionStorage.clear();

//Notes
//There are also other client-side storage mechanisms like IndexedDB
// which is more powerful than the above-mentioned technologies but more complicated
// to use.
