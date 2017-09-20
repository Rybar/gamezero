custom retro-constraints graphics engine for making pixel art games.

This is NOT another fantasy console.  

You ever make a game using the canvas API and wish it wasn't anti-aliased? Sure there's rendering-crisp/pixelated, but that just ensures that pixel-art you bring in from outside your game is never rendered with interpolation. It doesn't make the drawing API draw without anti-aliasing.  

You want rotated bitmaps with that old-school crunchy look? You want to use indexed-color palette effects in your game easily? Or maybe you've seen all the fun pico-8 dev's are having, those beautiful aliased lines, pixelated circles, fun pixel buffer tricks, and want a way to do the same stuff in html5.

This little engine provides an pico-8 like drawing API and indexed-color framebuffer.

There is no built-in code-editor, no LUA, just plain javascript and a single canvas hooked up to an 8bit array buffer.
