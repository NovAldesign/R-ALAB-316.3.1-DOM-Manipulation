// Menu data structure
var menuLinks = [
  { text: 'about', href: '/about' },
  {
    text: 'catalog', href: '#', subLinks: [
      { text: 'all', href: '/catalog/all' },
      { text: 'top selling', href: '/catalog/top' },
      { text: 'search', href: '/catalog/search' },
    ]
  },
  {
    text: 'orders', href: '#', subLinks: [
      { text: 'new', href: '/orders/new' },
      { text: 'pending', href: '/orders/pending' },
      { text: 'history', href: '/orders/history' },
    ]
  },
  {
    text: 'account', href: '#', subLinks: [
      { text: 'profile', href: '/account/profile' },
      { text: 'sign out', href: '/account/signout' },
    ]
  },
];

// Part 1 -------------------------------------------------
// 1.   Select and cache the <main> element in a variable named mainEl.
let mainEl = document.querySelector("main");

// 2.   Set the background color of mainEl to the value stored in the --main-bg CSS custom property.
// Hint: Assign a string that uses the CSS var() function like this: 'var(--main-bg)'.
mainEl.style.backgroundColor = "var(--main-bg)";

// 3.   Set the content of mainEl to <h1>DOM Manipulation</h1>. There are a variety of ways to do this; pick whichever one that you think works best in this situation.
mainEl.innerHTML = `<h1>DOM Manipulation</h1>`;

// 4.   Add a class of flex-ctr to mainEl.
// Hint: Use the Element.classList API.
mainEl.classList.add("flex-ctr");

// Part 2 -------------------------------------------------
// 1.   Select and cache the <nav id="top-menu"> element in a variable named topMenuEl.
const topMenuEl = document.getElementById("top-menu");

// 2.   Set the height of the topMenuEl element to be 100%.
topMenuEl.style.height = "100%";

// 3.   Set the background color of topMenuEl to the value stored in the --top-menu-bg CSS custom property.
topMenuEl.style.backgroundColor = "var(--top-menu-bg)";

// 4.   Add a class of flex-around to topMenuEl.
topMenuEl.classList.add("flex-around");
// console.log(topMenuEl);

// Part 3 -----------------------------------------------
// 1.   Iterate over the entire menuLinks array and for each "link" object:
for (let link of menuLinks) {
  // 2.   Create an <a> element.
  let anchor = document.createElement('A');

  // 3.   On the new element, add an href attribute with its value set to the href property of the "link" object.
  anchor.setAttribute("href", link.href);

  // 4.   Set the new element's content to the value of the text property of the "link" object.
  anchor.textContent = link.text;

  // 5.   Append the new element to the topMenuEl element.
  topMenuEl.appendChild(anchor);
}
//1. Select and cache the <nav id="sub-menu"> element in a variable named subMenuEl
const subMenuEl = document.getElementById('sub-menu');

//2. Set the height subMenuEl element to be "100%" 
subMenuEl.style.height = '100%';

//3. Set the background color of subMenuEl to the value stored in the --sub-menu-bg CSS custom property
subMenuEl.style.backgroundColor = ('--sub-menu-bg');

//4. Add the class of flex-around to the subMenuEl element
subMenuEl.classList.add("flex-around");

//1. Set the CSS position property of subMenuEl to the value of absolute.
subMenuEl.style.position = 'absolute';

//2. Set the CSS top property of subMenuEl to the value of 0.
subMenuEl.style.top = '0';

// 1. Select and cache the all of the <a> elements inside of topMenuEl in a variable named topMenuLinks.
const topMenuLinks = topMenuEl.querySelectorAll('a');

// 2. Attach a delegated 'click' event listener to topMenuEl.
// The first line of code of the event listener function should call the event object's preventDefault() method.
// The second line of code of the function should immediately return if the element clicked was not an <a> element.
// Log the content of the <a> to verify the handler is working.
topMenuEl.addEventListener('click', function (event) {
  event.preventDefault();

  if (event.target.tagName !== 'A') return;
  console.log(event.target.textContent);

  // Check if the clicked link already has 'active' class
  if (event.target.classList.contains('active')) {
    // If active, remove it
    event.target.classList.remove('active');
  } else {
    // If not active, first remove 'active' from ALL links
    topMenuLinks.forEach(link => {
      link.classList.remove('active');
    });

    // Then add 'active' to the clicked link
    event.target.classList.add('active');
  }
});

// Part 5  -------------------------------------------------
// Within the event listener, if the clicked <a> element does not yet have a class of "active" (it was inactive when clicked):
// If the clicked <a> element's "link" object within menuLinks has a subLinks property (all do, except for the "link" object for ABOUT), set the CSS top property of subMenuEl to 100%.
// Otherwise, set the CSS top property of subMenuEl to 0.
// Hint: Caching the "link" object will come in handy for passing its subLinks array later.
topMenuEl.addEventListener('click', function (event) {
  event.preventDefault();
  if (event.target.tagName !== 'A') return;
  console.log(event.target.textContent);

  // remove active from all links
  topMenuLinks.forEach(link => {
    link.classList.remove('active');
  });

  // toggle active on clicked link
  if (!event.target.classList.contains('active')) {
    event.target.classList.add('active');

    // find the corresponding link object in menuLinks array
    const linkText = event.target.textContent;
    const linkObject = menuLinks.find(link => link.text === linkText);

    // show or hide submenu based on whether subLinks exist
    if (linkObject && linkObject.subLinks) {
      //show submenu
      subMenuEl.style.top = '100%';

      // build submenu content
      buildSubmenu(linkObject.subLinks);
    } else {
      //hide submenu
      subMenuEl.style.top = '0';
    }

  } else {
    evt.target.classList.remove('active');
    // hide submenu when deactivating
    subMenuEl.style.top = '0';
  });
