/**
 * Created by ryan on 3/2/17.
 */
/*global ENGINE*/
//todo: factor in global glitch variables
//todo: modify glitch render to glitch both directions on both axes
ENGINE.txt = {
    textLine: function (opt) {
        //
    
        var textLength = opt.text.length,
            charWidth = 5;
            charHeight = 5;
        for (var i = 0; i < textLength; i++) {
            var letter = Assets.letters[( opt.text.charAt(i) )] || Assets.letters['unknown'];
            for (var y = 0; y < size; y++) {
                //var g = (Math.random() > opt.glitchChance) * opt.glitchFactor;
                for (var x = 0; x < size; x++) {
                    if (letter[y][x] === 1) {
                    
                        //if(g)
                        opt.ctx.fillRect(opt.x + ( x * opt.scale ) + gx + ( ( size * opt.scale ) + opt.hspacing ) * i, opt.y + (y * opt.scale) + gy, opt.scale, opt.scale);
                    }
                }
            }
        }
    },


    text: function (opt) {
        var size = 5,
            letterSize = size * opt.scale,
            lines = opt.text.split('\n'),
            linesCopy = lines.slice(0),
            lineCount = lines.length,
            longestLine = linesCopy.sort(function (a, b) {
                return b.length - a.length;
            })[0],
            textWidth = ( longestLine.length * letterSize ) + ( ( longestLine.length - 1 ) * opt.hspacing ),
            textHeight = ( lineCount * letterSize ) + ( ( lineCount - 1 ) * opt.vspacing );

        var sx = opt.x,
            sy = opt.y,
            ex = opt.x + textWidth,
            ey = opt.y + textHeight;

        if (opt.halign == 'center') {
            sx = opt.x - textWidth / 2;
            ex = opt.x + textWidth / 2;
        } else if (opt.halign == 'right') {
            sx = opt.x - textWidth;
            ex = opt.x;
        }

        if (opt.valign == 'center') {
            sy = opt.y - textHeight / 2;
            ey = opt.y + textHeight / 2;
        } else if (opt.valign == 'bottom') {
            sy = opt.y - textHeight;
            ey = opt.y;
        }

        var cx = sx + textWidth / 2,
            cy = sy + textHeight / 2;

        if (opt.render) {
            for (var i = 0; i < lineCount; i++) {
                var line = lines[i],
                    lineWidth = ( line.length * letterSize ) + ( ( line.length - 1 ) * opt.hspacing ),
                    x = opt.x,
                    y = opt.y + ( letterSize + opt.vspacing ) * i;

                if (opt.halign == 'center') {
                    x = opt.x - lineWidth / 2;
                } else if (opt.halign == 'right') {
                    x = opt.x - lineWidth;
                }

                if (opt.valign == 'center') {
                    y = y - textHeight / 2;
                } else if (opt.valign == 'bottom') {
                    y = y - textHeight;
                }

                if (opt.snap) {
                    x = Math.floor(x);
                    y = Math.floor(y);
                }

                this.textLine({
                    ctx: opt.ctx,
                    x: x,
                    y: y,
                    text: line,
                    hspacing: opt.hspacing || 0,
                    scale: opt.scale || 1,
                    glitch: opt.glitch
                });
            }
        }

        return {
            sx: sx,
            sy: sy,
            cx: cx,
            cy: cy,
            ex: ex,
            ey: ey,
            width: textWidth,
            height: textHeight
        }
    }
};
