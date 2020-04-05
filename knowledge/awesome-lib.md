#HTML manipulation & animation
---------------------------------

##[Splitting](https://splitting.js.org/)  

### CSS Vars for split words &chars! (items,grids,images,too!)

Splitting is a JavaScript microlibrary with a collection of small
[built-in plugins](#plugins) designed to split (section off) an element
in a variety of ways, such as [words](#words), [characters](#chars),
[child nodes](#items), and [more](#plugins)!

The Splitting library does not handle any animation, but it gives you
the elements and tools needed to create animations & transitions with
JavaScript animation libraries or *only CSS!*. Most plugins utilize a
series of `<span>`s populated with CSS variables and data attributes
that empower you to build all kinds of animations, transitions and
interactions.

The general flow is:
1. `Splitting()` is called on a `target` (see: [Basic Usage](#basic-usage))
2. Create `<span>`s to inject into `target`, or query children of`target`
3. Index with CSS variables (`<span class="word" style="--word-index: 0">` )
4. Add the total to the target (`<div data-splitting style="--word-total: 3">` )
5. Return an array of the splits (see: [Returns](#returns))
6. Animate those elements with CSS or JavaScript!
