Neumorphism 
------------
basic
```css
box-shadow: 20px 20px 50px #00d2c6, 
            -30px -30px 60px #00ffff;
```
with variable
```css
box-shadow: var(--h1) var(--v1) var(--blur1) var(--color-dark), 
            var(--h2) var(--v2) var(--blur2) var(--color-light);
```

<table class="has-fixed-layout"><thead><tr><th>Light Source</th><th>Positive Values</th><th>Negative Values</th></tr></thead><tbody><tr><td><strong>Top Left</strong></td><td><code>--h1,&nbsp;--v1</code></td><td><code>--h2,&nbsp;--v2</code></td></tr><tr><td><strong>Top Right</strong></td><td><code>--h2,&nbsp;--v1</code></td><td><code>--h1,&nbsp;--v2</code></td></tr><tr><td><strong>Bottom Left</strong></td><td><code>--h1,&nbsp;--v2</code></td><td><code>--h2,&nbsp;--v1</code></td></tr><tr><td><strong>Bottom Right</strong></td><td><code>--h2,&nbsp;--v2</code></td><td><code>--h1,&nbsp;--v1</code></td></tr></tbody></table>

light source as the top left and only toggle the inset option to see the difference.  
[css top left instet vs regular shadow](//codepen.io/anon/embed/xxGYbwR?height=400&amp;theme-id=1&amp;slug-hash=xxGYbwR&amp;default-tab=result)

<iframe style="width: 100%; height: 40em;" class="codepen" src="//codepen.io/anon/embed/xxGYbwR?height=400&amp;theme-id=1&amp;slug-hash=xxGYbwR&amp;default-tab=result"/>
 
Background colors
* **Convex surface variation:**  The surface curves outwards where the gradient’s lighter section is aligned with the shadow’s lighter section, and the gradient’s darker section is aligned to the shadow’s darker section.
* **Concave surface variation**:  The surface curves inward where the gradient’s lighter section is aligned to the shadow’s darker section, and the gradient’s darker section is aligned to the shadow’s lighter section.

```css
.element {
  background: linear-gradient(var(--bg-angle), var(--bg-start), var(--bg-end));
  box-shadow: var(--h1) var(--v1) var(--color-dark), 
              var(--h2) var(--v2) var(--color-light);
}
```

<iframe src="//codepen.io/anon/embed/dyoJEvr?height=400&theme-id=1&slug-hash=dyoJEvr&default-tab=result" style="width: 100%; height: 40em;"></iframe>    

Neumorphism in practice

<iframe src="//codepen.io/anon/embed/YzXppRK?height=600&theme-id=1&slug-hash=YzXppRK&default-tab=result" style="width: 100%; height: 40em;"></iframe> 