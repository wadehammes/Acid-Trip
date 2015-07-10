Acid Trip**
===
This plugin provides a gradient background that follows your mouse movements.

Usage:

Add the JS in the footer before close of the body tag and initialize the plugin:
```
<script async type="text/javascript" src="path/to/jquery"></script>
<script async type="text/javascript" src="acid.min.js"></script>
<script async type="text/javascript">
 $('.acid').acid({
    element           : 'acid', // the element, can be $(this);
    gradient          : 'trip', // the element we apply gradient to
    ratio             : 2.15,   // determins the size of the gradient
    activeClass       : 'on',   // class that applies the transition effect
    elementZ          : 1,      // z-index of the gradient (for placing it)
    overrideJSGradient: false   // set to true if you want to use your own gradient in your css
 });
</script>
```

NOTE: if you update the element, gradient or override the js, you need to make sure to reflect those changes in your CSS file.

...and the CSS to the head:
```
<link rel="stylesheet" href="acid.min.css" />
```

...and then apply the class to the element you want the effect to appear:
```
<main class="site site--content acid">

</main>
```

...and make sure it has a fun background color!

Demo:
Coming soon (but here is a screencast: [Lame Screencast](http://via.wade.today/3s2I463Y2U1l))

** Not a real acid trip obviously.
