//* In React
// While Using the style attribute, use JS object instead of CSS string, it prevents XSS security holes
// In React 16.9 Avoid using javascript URLS, whenever its allowed, like: 
const companyProfile = {
  website: "javascript: alert('Your website is hacked')",
};
// It will log a warning
<a href={companyProfile.website}>More details</a>;

//* General JS Security best practices:

//! 1 Outdated dependencies.
// Outdated libraries can expose applications to security bulnerabilities.
// Keeping everything up to date helps to avoid known issues that have already been fixed.
//? How to avoid:
// 1. use package manager like npm, it helps to manage and update libraries.
// 2. regular checks: Run npm outdated to see which pachages are outdated.
// 3. update regularly: Use npm update to upgrade packages to the latest versions
// 4. Automate security updates: Tools like npm audit identify and suggest fixes for security vulnerabilities.

//! Simple security headers
// Security headers tell the browser how to behave when handling site content, which helps prevent some types
// of attacks like //!cross-site scripting(XSS) and data injection
//? How to implement:
// We can use Content Security Policy (CSP), a srcurity header that helps stop unauthorized scripts from 
// running on our site, which can prevent many attacks.
// Add to the <head> section of your HTML following meta tag
<meta http-equiv="Content-Security-Policy" content="script-src 'self';" /> 
// can be customized to add allowed script sources:
//<meta http-equiv="Content-Security-Policy" content="script-src 'self' localhost:* https://js.stripe.com https://maps.googleapis.com/" />

// ? It also can be added via backend header

// * Sanitize User Input.
// User input can be dangerous if not handled correctly. Malicious users might try to input
// data that could harm other users or your site.

//! We should always treat input data as untrusted,
// cleaning the data comming from suers to make sure its safe before using it in application

//? Solve:
// When updating the web page with user input, use textContend instead of innerHTML to avoid executing 
// harmful scripts

// * TOP 10 Front-end security Risks and Best practices to prevent them:
//? Attacks
// 1. Cross-site scripting (XSS) attacks
// 2. DoS (denial of service) attacks
//? Best practices to prevent them
// 3. Preventing cross-site request forgery
// 4. Using CSP
// 5. Using Modern Frameworks
// 6. Auditing of 3rd-party libraries
// 7. Incorporating security from the start
// 8. Avoiding IFrames where possible
// 9. Restricting available Feature Policy
// 10. Ensuring CDN-pulled libraries undergo subresource integrity check

// * 1 Preventing Cross-site scriptins XSS atacks
// XSS atacks are one of the largest and most dangerous forms of attack.
// They are crafted in such a way that they inject code into web app, which ends up performing malicious actions
// when accessed by an end user.

// CSS attacks are drawn to a lack of sanitization in a web application input and output, which can lead
// to a variety of attacks.

// 1. Clickjacking attacks
// One of the largest type of CSS attack, they are simply performed by replacing legitimate parts of web page
// with similar looking dangerous elements. Like Checkout buttons could be replaced with redirecting buttons,
// download buttons can be replaced with malware download buttons and more

// 2. Geolocation stealing
// With XSS attack an attacker can inject JS library which execute on the client side logging the user IP address
// . geolocation and other personal details. 

//3. Crypromining.
// Withcode injected by an XSS, cryptomining can be performed in end users device as well.

//* Protection against CSS attacks can be achieved by the proper sanitization of inputs made into our web app
//* as well as by filtering inputs correctly. For example limiting mobike numbers to digits only, or not 
//* allowing special characters in names can yield a substantial benefit by preventing most injection attacks
// * on our web app

// * 2 DOS (denial of service attacks)
// DoS attacks and DDoS attacks on web apps are common. They are also difficult to deal with, as they use
// a swarm of compromised systems to make requests to our web app (используют множество скомпроментированных систем для отправки реквестов)

// DoS attacks wich originate from a single system or small number of them can be tackled by simply blocking
// the end system IP

// DDoS attacks on the other hand are more difficult to block. Because they originated from hundreds or thousands
// of systems at the same time.

// Employing rate limiting or servcies like CloudFlare or hardware based solutions can prevent them by fuiltering 
// such attacks before they reach destination

// * 3 Preventing cross - site request forgery (CSRF)
// CSRF attacks are aimed at tricking users into submitting forms which end up performing a different action
// from the one user wishes to perform (заставить юзера отправлять формы которые выполняют действие отличное от желаемого)

//? prevent
// by using token like sha256 which is generated on every page load and passedto a form via http headers
// upon the submission of any form
// if the token is missing or mismatched the action is not performed

// * 4 Using Content Security Policy CSP
// Is an effective form of XSS attack prevention. It calls for an HTTP flag which informs browser about
// the sources that can be trusted and inclided as IFrame within web application.

// Any source or URL not mentioned within the CSP flag is discarded and will not be included or rendered within 
// an iFrame on our web app When combined with //! X-Frame-Options
// it provides a solid defence agains XSS atacks in general
//? x-frame-options: DENY

// * 5 Using Modern Frameworks
// Often, web application front ends are built using commonly abailable frameworks. These frameworks make up
// the core of web app front end. And any kind of security vulnerability within this framework can lead to
// a compromise of web app as whole

// Using modern and frequently updated frameworks can help boost our web app security. These frameworks
// frequently include built-in authentication handlers and other security features that help standartize the 
// security practices 

//* 6 Auditing of 3rd party libraries
// ... (mentioned above)

// * 7... incorporating security from start

// * 8. Avoiding iFrames where possible
// While iFrames make development process easier by allowing to incorporate/load other pages/feames in exising view,
// iFrames usage is often used without appropriate X-Frame-Options. Unfortunately, this allows for clickjacking
// attacks and the compromise of web app 

// iFrames based attacks: play videos open malicious forms which looks legitimate, trick users into downloading
// malicious contend, etc

// * 9 Restricting available Feature Policy
// By default, web app can access or request any feature from enduser device - while this may be a nice-to-have
// during development stage, if left enabled it can lead to attackers exploiting our web app and using
// these unrestricted feature flags/policies to ask end users device to enable certain feature that appear
// legitimately offered by web app itself.

//! using the Feature-Policy HTTP header 
// is ideal for preventing such requests from originating from our web applciation.

// For example, setting the following Feature-Policy will alert the end users web browsers to not enable these
// features, even if requested by our web app:

//? "Feature-Policy": camera 'none'; microphone 'none';

// * 10 Ensuring CDN-pulled libraries undergo subresource integrity checks(проверка целостности библиотек из стороннего ЦДН)
//Also critical is checking whether libraries loaded via 3rd-party CDNs are intact and untouched. 


// if these libraries are compromised via MITM attacks, or if the CDN itself is compromised, its possible to load bad
// code into web app on the user side. EG:

//<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">

// The above code loads Bootstrap but includes an integrity parameter with a checksum, which can be verified by our browser.
// This ensures that if the CDN is compromised and the CSS file is modified, intefrity checksum will not match and the file will not render
// in user web browser



