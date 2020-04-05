# [offset-distance](/en-US/docs/Web/CSS/offset-distance) 
######[MDN source](https://developer.mozilla.org/en-US/docs/Web/CSS/offset-distance)  
The **`offset-distance`** CSS property specifies a position along an
[`offset-path`](/en-US/docs/Web/CSS/offset-path "The offset-path CSS property specifies a motion path for an element to follow and defines the element's positioning within the parent container or SVG coordinate system.")
for an element to be placed.

**Note**: Early versions of the spec called this property
`motion-offset`.

## Syntax {#Syntax}

```{.brush: .css .line-numbers .language-css}
/* Default value */
offset-distance: 0;

/* the middle of the offset-path */
offset-distance: 50%;

/* a fixed length positioned along the path */
offset-distance: 40px;
```

`<length-percentage>`
:   A length that specifies how far the element is along the path
    (defined with
    [`offset-path`](/en-US/docs/Web/CSS/offset-path "The offset-path CSS property specifies a motion path for an element to follow and defines the element's positioning within the parent container or SVG coordinate system.")).
:   100% represents the total length of the path (when the `offset-path`
    is defined as a basic shape or `path()`).

### Formal syntax {#Formal_syntax}

```{.syntaxbox}
<length-percentage>where <length-percentage> = <length> | <percentage>
```

## Examples {#Examples}

The motion aspect in CSS Motion Path typically comes from animating the
`offset-distance` property. If you want to animate an element along its
full path, you would define its
[`offset-path`](/en-US/docs/Web/CSS/offset-path "The offset-path CSS property specifies a motion path for an element to follow and defines the element's positioning within the parent container or SVG coordinate system.")
and then set up an animation that takes the `offset-distance` from `0%`
to `100%`.

### HTML {#HTML}

```{.brush: .html .line-numbers .language-html}
<div id="motion-demo"></div>
```

### CSS {#CSS}

```{.brush: .css .line-numbers .language-css}
#motion-demo {
  offset-path: path('M20,20 C20,100 200,0 200,100');
  animation: move 3000ms infinite alternate ease-in-out;
  width: 40px;
  height: 40px;
  background: cyan;
}

@keyframes move {
  0% {
    offset-distance: 0%;
  }
  100% {
    offset-distance: 100%;
  }
}
```

## codepen examples
https://codepen.io/michellebarker/details/VwYOvJG
https://codepen.io/michellebarker/pen/VwYOvJG