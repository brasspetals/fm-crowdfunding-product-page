# Frontend Mentor - Crowdfunding Product Page

![Design preview for the Crowdfunding product page coding challenge](./images/desktop-preview.jpg)

## Overview

### The Challenge

Users should be able to:

- View the optimal layout depending on their device's screen size
- See hover states for interactive elements
- Make a selection of which pledge to make
- See an updated progress bar and total money raised based on their pledge total after confirming a pledge
- See the number of total backers increment by one after confirming a pledge
- Toggle whether or not the product is bookmarked

### Links

- Solution URL: [https://www.frontendmentor.io/solutions/crowdfunding-product-page-scss-js-grid-css-animations-aNn8LKBbQ](https://www.frontendmentor.io/solutions/crowdfunding-product-page-scss-js-grid-css-animations-aNn8LKBbQ)
- Live Site URL: [https://fm-crowdfunding-product-page.vercel.app/](https://fm-crowdfunding-product-page.vercel.app/)

## My process

### Built with

- Mobile-first workflow
- SCSS
- CSS Grid
- Keyframes animations
- Javascript

### Additions & Deviations

Additions:

- Hover states for bookmark button
- The "Select Reward" buttons on the main page will open the selection modal with the corresponding reward pre-selected and centered on the screen.
- "Total left" of selected reward (if applicable) decrements by one on both the main page and selection modal after submitting a pledge
- Modal animations

Deviations:

- The desktop bookmark button interaction is a bit different than the design - it toggles, with the svg sliding to the opposite side. I wanted to experiment and have a bit of fun. Hopefully, I haven’t created an accessibility nightmare. 🙈
- The slider may be “fuller” than the design as it’s accurate to the percentage backed.

### What I learned

This one was a _huge_ learning experience. What I thought would be a quick project featuring a nice, simple design turned into a bit more than I bargained for! 😅

Some new things I found really useful:

- `toLocalString()` for converting numbers to strings _with appropriate commas_
- `e.PreventDefault()` used to stop the page from refreshing on form submit (and resetting all the variables). In a "real world" scenario I wouldn't need this as I imagine I'd be working with a database. Still handy!
- `scrollIntoView()` and `block: center` to have the modal pre-scrolled to the selected reward when opened

My learning experience wasn't limited to JS, however, as I got to utilitze some HTML and CSS features I hadn't used before:

- `picture` element to easily switch between hero images. I'd previously used `srcset`, but `picture` was perfect in this case
- `filter` property for “unavailable” pledge styling
- `:disabled` attribute selector for “unavailable” button styling
- `transition-delay` property for desktop bookmark button "toggle" transition
- `:focus-within` selector for number input label styling and in conjunction with "selected" pledge styling
- [Custom data attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*) to make some JS element selection easier.

### Resources

- [How to add an event listener to multiple elements in JavaScript](https://flaviocopes.com/how-to-add-event-listener-multiple-elements-javascript/)
- [Pure CSS Custom Styled Radio Buttons](https://moderncss.dev/pure-css-custom-styled-radio-buttons/)
- [Bootstrap's "Scrolling long content" modal demo](https://getbootstrap.com/docs/4.3/components/modal/#scrolling-long-content) - referenced for selection modal functionality
- [Google's free Web Accessilibilty Course on Udacity](https://www.udacity.com/course/web-accessibility--ud891)
