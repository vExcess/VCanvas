(() => {
    const min = Math.min,
          max = Math.max,
          round = Math.round,
          ceil = Math.ceil,
          sin = Math.sin,
          cos = Math.cos;
    
    const Base64 = {
        digits: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        btoa: function(str) {
            let digits = this.digits,
                i, out = "";
            str = str.toString();
            for (i = 0; i < str.length; i += 3) {
                const groupsOfSix = [undefined, undefined, undefined, undefined];
                groupsOfSix[0] = str.charCodeAt(i) >> 2;
                groupsOfSix[1] = (str.charCodeAt(i) & 0x03) << 4;
                if (str.length > i + 1) {
                    groupsOfSix[1] |= str.charCodeAt(i + 1) >> 4;
                    groupsOfSix[2] = (str.charCodeAt(i + 1) & 0x0f) << 2;
                }
                if (str.length > i + 2) {
                    groupsOfSix[2] |= str.charCodeAt(i + 2) >> 6;
                    groupsOfSix[3] = str.charCodeAt(i + 2) & 0x3f;
                }
                for (let j = 0; j < groupsOfSix.length; j++) {
                    if (typeof groupsOfSix[j] === "undefined") {
                        out += "=";
                    } else {
                        var index = groupsOfSix[j];
                        if (index >= 0 && index < 64) {
                            out += digits[index];
                        } else {
                            out += undefined;
                        }
                    }
                }
            }
            return out;
        },
        atob: function(str) {
            let digits = this.digits,
                a, b, c, x, y, v,
                result = [],
                out = "";
            for (var i = 0; i < str.length; result.push(a, b, c)) {
                x = digits.indexOf(str[i++]);
                y = digits.indexOf(str[i++]);
                a = x << 2 | y >> 4;
                x = digits.indexOf(str[i++]);
                b = (y & 0x0f) << 4 | x >> 2;
                y = digits.indexOf(str[i++]);
                c = (x & 3) << 6 | y;
            }
            for (let i = 0; i < result.length; i++) {
                v = result[i];
                if (v >= 0) {
                    out += String.fromCharCode(v);
                }
            }
            return out;
        },
        encode: function(input) {
            let digits = this.digits,
                output = "",
                chr1, chr2, chr3, enc1, enc2, enc3, enc4,
                i = 0;
            input = this._utf8_encode(input.toString());
            while (i < input.length) {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
                output = output + digits[enc1] + digits[enc2] + digits[enc3] + digits[enc4];
            }
            return output;
        },
        decode: function(input) {
            let digits = this.digits,
                output = "",
                chr1, chr2, chr3,
                enc1, enc2, enc3, enc4,
                i = 0;
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            while (i < input.length) {
                enc1 = digits.indexOf(input.charAt(i++));
                enc2 = digits.indexOf(input.charAt(i++));
                enc3 = digits.indexOf(input.charAt(i++));
                enc4 = digits.indexOf(input.charAt(i++));
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
                output = output + String.fromCharCode(chr1);
                if (enc3 !== 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 !== 64) {
                    output = output + String.fromCharCode(chr3);
                }
            }
            output = this._utf8_decode(output);
            return output;
        },
        _utf8_encode: function(string) {
            string = string.replace(/\r\n/g, "\n");
            let utftext = "", c;
            for (let n = 0; n < string.length; n++) {
                c = string.charCodeAt(n);
                if (c < 128) {
                    utftext += String.fromCharCode(c);
                } else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192) + String.fromCharCode((c & 63) | 128);
                } else {
                    utftext += String.fromCharCode((c >> 12) | 224) + String.fromCharCode(((c >> 6) & 63) | 128) + String.fromCharCode((c & 63) | 128);
                }
            }
            return utftext;
        },
        _utf8_decode: function(utftext) {
            let string = "",
                i = 0,
                c = 0,
                c1 = 0,
                c2 = 0,
                c3 = 0;
            while (i < utftext.length) {
                c = utftext.charCodeAt(i);
                if (c < 128) {
                    string += String.fromCharCode(c);
                    i++;
                } else if ((c > 191) && (c < 224)) {
                    c2 = utftext.charCodeAt(i + 1);
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2;
                } else {
                    c2 = utftext.charCodeAt(i + 1);
                    c3 = utftext.charCodeAt(i + 2);
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3;
                }
            }
            return string;
        },
        b64ToArrayBuffer: function(base64) {
            let binary_string = this.atob(base64),
                len = binary_string.length,
                bytes = new Uint8Array(len);
            for (let i = 0; i < len; i++) {
                bytes[i] = binary_string.charCodeAt(i);
            }
            return bytes.buffer;
        }
    };
    
    function getLineLineIntersect(x1, y1, x2, y2, x3, y3, x4, y4) {
        // Check if none of the lines are of length 0
        if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
            return false;
        }
        
        let a = y4 - y3,
            b = x2 - x1,
            c = x4 - x3,
            d = y2 - y1,
            e = y1 - y3,
            f = x1 - x3,
            denominator = (a * b - c * d);
        
        // Lines are parallel
        if (denominator === 0) {
            return false;
        }
        
        let ua = (c * e - a * f) / denominator,
            ub = (b * e - d * f) / denominator;
        
        // is the intersection along the segments
        if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
            return false;
        }
        
        // Return a object with the x and y coordinates of the intersection
        return [
            x1 + ua * b,
            y1 + ua * d
        ];
    }
    
    function point_triangleColl(px, py, tx1, ty1, tx2, ty2, tx3, ty3) {
        // Credit: Larry Serflaton
        let tx1_3 = tx1 - tx3,
            tx3_2 = tx3 - tx2,
            ty2_3 = ty2 - ty3,
            ty3_1 = ty3 - ty1,
            px_x3 = px - tx3,
            py_y3 = py - ty3,
            denom = ty2_3 * tx1_3 + tx3_2 * (ty1 - ty3),
            a = (ty2_3 * px_x3 + tx3_2 * py_y3) / denom,
            b = (ty3_1 * px_x3 + tx1_3 * py_y3) / denom,
            c = 1 - a - b;
        return a > 0 && b > 0 && c > 0 && c < 1 && b < 1 && a < 1;
    }
    
    function renderLine(x1, y1, x2, y2, imgData, clr, strokeWeight, lineCap) {
        if (strokeWeight === 1) {
            x1 = round(x1);
            y1 = round(y1);
            x2 = round(x2);
            y2 = round(y2);
            
            let redC = clr[0],
                greenC = clr[1],
                blueC = clr[2],
                alphaC = clr[3],
                p = imgData.data,
                WIDTH = imgData.width,
                dx = Math.abs(x2 - x1),
                dy = Math.abs(y2 - y1),
                sx = (x1 < x2) ? 1 : -1,
                sy = (y1 < y2) ? 1 : -1,
                err = dx - dy,
                e2,
                idx;
            
            while (true) {
                if (x1 >= 0 && x1 < WIDTH) {
                    idx = ((x1|0) + (y1|0) * WIDTH) << 2;
                    p[idx] = redC;
                    p[idx + 1] = greenC;
                    p[idx + 2] = blueC;
                    p[idx + 3] = alphaC;
                }
            
                if (x1 === x2 && y1 === y2) {
                    break;
                }
        
                e2 = 2 * err;
                if (e2 > -dy) {
                    err -= dy;
                    x1 += sx;
                }
                if (e2 < dx) {
                    err += dx;
                    y1 += sy;
                }
            }
        } else {
            let dx = x1 - x2,
                dy = y1 - y2,
                len = Math.sqrt(dx * dx + dy * dy),
                halfSW = strokeWeight / 2,
                xo = (y1 - y2) / len * halfSW,
                yo = (x1 - x2) / len * halfSW;
            
            if (lineCap === "butt" || lineCap === "round") {
                renderPolygon(
                    [
                        x1 + xo, y1 - yo,
                        x2 + xo, y2 - yo,
                        x2 - xo, y2 + yo,
                        x1 - xo, y1 + yo
                    ],
                    imgData,
                    clr
                );
                
                if (lineCap === "round") {
                    renderEllipse(imgData, x1, y1, strokeWeight, strokeWeight, clr);
                    renderEllipse(imgData, x2, y2, strokeWeight, strokeWeight, clr);
                }
            } else if (lineCap === "square") {
                let dir = Math.atan2(y2 - y1, x2 - x1),
                    xShift = cos(dir) * halfSW,
                    yShift = sin(dir) * halfSW;
                
                renderPolygon(
                    [
                        x1 + xo - xShift, y1 - yo - yShift,
                        x2 + xo + xShift, y2 - yo + yShift,
                        x2 - xo + xShift, y2 + yo + yShift,
                        x1 - xo - xShift, y1 + yo - yShift
                    ],
                    imgData,
                    clr
                );
            }
        }
    }
    
    function renderRectangle(x, y, w, h, imgData, clr) {
        let p = imgData.data,
            clrR = clr[0],
            clrG = clr[1],
            clrB = clr[2],
            clrA = clr[3],
            WIDTH = imgData.width,
            HEIGHT = imgData.height,
            yStart = round(max(y, 0)),
            xStart = round(max(x, 0)),
            yStop = round(min(y + h, HEIGHT)),
            xStop = round(min(x + w, WIDTH)),
            yy, xx, idx;
        for (yy = yStart; yy < yStop; yy++) {
            idx = (xStart + yy * WIDTH) << 2;
            for (xx = xStart; xx < xStop; xx++) {
                p[idx] = clrR;
                p[idx + 1] = clrG;
                p[idx + 2] = clrB;
                p[idx + 3] = clrA;
                idx += 4;
            }
        }
    }

    function renderTriangle(imgData, x1, y1, x2, y2, x3, y3, clr, stroke, strokeWeight) {
        x1 = Math.round(x1);
        y1 = Math.round(y1);
        x2 = Math.round(x2);
        y2 = Math.round(y2);
        x3 = Math.round(x3);
        y3 = Math.round(y3);

        let p = imgData.data,
            WIDTH = imgData.width,
            HEIGHT = imgData.height,
            minx = max(0, min(x1, x2, x3)),
            maxx = min(WIDTH, max(x1, x2, x3)),
            miny = max(0, min(y1, y2, y3)),
            maxy = min(HEIGHT, max(y1, y2, y3)),
            redC = clr[0],
            greenC = clr[1],
            blueC = clr[2],
            alphaC = clr[3],
            w1, w2, idx;

        for (let x = minx; x < maxx; x++) {
            for (let y = miny; y < maxy; y++) {
                w1 = (x1 * (y3 - y1) + (y - y1) * (x3 - x1) - x * (y3 - y1)) / ((y2 - y1) * (x3 - x1) - (x2 - x1) * (y3 - y1));
                w2 = (x1 * (y2 - y1) + (y - y1) * (x2 - x1) - x * (y2 - y1)) / ((y3 - y1) * (x2 - x1) - (x3 - x1) * (y2 - y1));

                if (w1 >= 0 && w2 >= 0 && w1 + w2 <= 1) {
                    idx = (x + y * WIDTH) << 2;
                    p[idx] = redC;
                    p[idx + 1] = greenC;
                    p[idx + 2] = blueC;
                    p[idx + 3] = alphaC;
                }
            }
        }

        if (stroke && stroke[3] > 0 && strokeWeight) {
            renderLine(x1, y1, x2, y2, imgData, stroke, strokeWeight, "round");
            renderLine(x2, y2, x3, y3, imgData, stroke, strokeWeight, "round");
            renderLine(x3, y3, x1, y1, imgData, stroke, strokeWeight, "round");
        }
    }

    function renderQuad(x1, y1, x2, y2, x3, y3, x4, y4, imgData, clr, stroke, strokeWeight) {
        x1 = Math.round(x1);
        y1 = Math.round(y1);
        x2 = Math.round(x2);
        y2 = Math.round(y2);
        x3 = Math.round(x3);
        y3 = Math.round(y3);
        x4 = Math.round(x4);
        y4 = Math.round(y4);

        let type, cavePt, tri1, tri2;
        
        let det = (x3 - x1) * (y4 - y2) - (x4 - x2) * (y3 - y2);
        let touching;
        if (det === 0) {
            touching = false;
        } else {
            let lambda = ((y4 - y2) * (x4 - x1) + (x2 - x4) * (y4 - y2)) / det,
                gamma = ((y2 - y3) * (x4 - x1) + (x3 - x1) * (y4 - y2)) / det;
            touching = (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
        }

        if (touching) {
            type = 1;
        } else {
            type = 2;

            if (point_triangleColl(x1, y1, x2, y2, x3, y3, x4, y4)) {
                cavePt = 0;
            } else if (point_triangleColl(x2, y2, x3, y3, x4, y4, x1, y1)) {
                cavePt = 1;
            } else if (point_triangleColl(x3, y3, x4, y4, x1, y1, x2, y2)) {
                cavePt = 2;
            } else if (point_triangleColl(x4, y4, x1, y1, x2, y2, x3, y3)) {
                cavePt = 3;
            } else {
                type = 3;
            }
        }

        switch (type) {
            case 1:
                tri1 = [x1, y1, x2, y2, x3, y3];
                tri2 = [x1, y1, x3, y3, x4, y4];
                break;
            case 2:
                var oppositePt = cavePt + 2;
                if (oppositePt > 3) {
                    oppositePt %= 4;
                }

                var pts = [0, 1, 2, 3];
                pts.splice(pts.indexOf(cavePt), 1);
                pts.splice(pts.indexOf(oppositePt), 1);

                var vals = [
                    [x1, y1],
                    [x2, y2],
                    [x3, y3],
                    [x4, y4]
                ];

                tri1 = [vals[pts[0]][0], vals[pts[0]][1], vals[cavePt][0], vals[cavePt][1], vals[oppositePt][0], vals[oppositePt][1]];
                tri2 = [vals[pts[1]][0], vals[pts[1]][1], vals[cavePt][0], vals[cavePt][1], vals[oppositePt][0], vals[oppositePt][1]];
                break;
            case 3:
                var intersect = getLineLineIntersect(x1, y1, x2, y2, x3, y3, x4, y4);
                if (intersect) {
                    tri1 = [intersect[0], intersect[1], x2, y2, x3, y3];
                    tri2 = [intersect[0], intersect[1], x1, y1, x4, y4];
                } else {
                    intersect = getLineLineIntersect(x1, y1, x4, y4, x2, y2, x3, y3);
                    tri1 = [intersect[0], intersect[1], x1, y1, x2, y2];
                    tri2 = [intersect[0], intersect[1], x3, y3, x4, y4];
                }
                break;
        }

        renderTriangle(imgData, tri1[0], tri1[1], tri1[2], tri1[3], tri1[4], tri1[5], clr);
        renderTriangle(imgData, tri2[0], tri2[1], tri2[2], tri2[3], tri2[4], tri2[5], clr);

        if (stroke && stroke[3] > 0 && strokeWeight) {
            renderLine(x1, y1, x2, y2, imgData, stroke, strokeWeight, "round");
            renderLine(x2, y2, x3, y3, imgData, stroke, strokeWeight, "round");
            renderLine(x3, y3, x4, y4, imgData, stroke, strokeWeight, "round");
            renderLine(x4, y4, x1, y1, imgData, stroke, strokeWeight, "round");
        }
    }

    function renderEllipse(imgData, x, y, w, h, clr) {
        x = Math.round(x);
        y = Math.round(y);
        w = Math.round(w / 2);
        h = Math.round(h / 2);

        var n = w;
        var w2 = w * w;
        var h2 = h * h;

        var redC = clr[0];
        var greenC = clr[1];
        var blueC = clr[2];
        var alphaC = clr[3];

        var p = imgData.data;
        var WIDTH = imgData.width;

        var xStop = Math.min(x + w, WIDTH);
        for (var i = Math.max(x - w, 0); i < xStop; i++) {
            if (i >= 0 && i < WIDTH) {
                var idx = (i + y * WIDTH) << 2;
                p[idx] = redC;
                p[idx + 1] = greenC;
                p[idx + 2] = blueC;
                p[idx + 3] = alphaC;
            }
        }

        for (var j = 1; j < h; j++) {
            var ra = y + j;
            var rb = y - j;

            while (w2 * (h2 - j * j) < h2 * n * n && n !== 0) {
                n--;
            }

            xStop = Math.min(x + n, WIDTH);
            for (var i = Math.max(x - n, 0); i < xStop; i++) {
                if (i >= 0 && i < WIDTH) {
                    var idx = (i + ra * WIDTH) << 2;
                    p[idx] = redC;
                    p[idx + 1] = greenC;
                    p[idx + 2] = blueC;
                    p[idx + 3] = 255;
        
                    idx = (i + rb * WIDTH) << 2;
                    p[idx] = redC;
                    p[idx + 1] = greenC;
                    p[idx + 2] = blueC;
                    p[idx + 3] = 255;
                }
            }
        }
    }
    
    const ascendingSortFxn = (a, b) => a - b;
    function renderPolygon(verts, imgData, clr) {
        const MAX_INT = 2147483647;
        let yMin = verts[1],
            yMax = verts[1];
        for (let i = 3; i < verts.length; i += 2) {
            if (verts[i] < yMin) {
                yMin = verts[i];
            } else if (verts[i] > yMax) {
                yMax = verts[i];
            }
        }
        yMin = round(max(0, yMin));
        yMax = round(min(imgData.height, yMax));
        
        let redC = clr[0],
            greenC = clr[1],
            blueC = clr[2],
            alphaC = clr[3],
            WIDTH = imgData.width,
            p = imgData.data,
            intersects, intersectPt;
        for (let i = yMin; i < yMax; i++) {
            intersects = {};
            
            for (let j = 0; j < verts.length; j += 2) {
                intersectPt = getLineLineIntersect(-MAX_INT, i, MAX_INT, i,
                    verts[j], verts[j + 1], verts[(j + 2) % verts.length], verts[(j + 3) % verts.length]
                );
                
                if (intersectPt) {
                    intersects[round(intersectPt[0])] = true;
                }
            }
            
            intersects = Object.keys(intersects);
            intersects.sort(ascendingSortFxn);
            
            let k = 0, idx;
            while (intersects[k + 1]) {
                for (let j = max(intersects[k], 0); j < min(intersects[k + 1], WIDTH); j++) {
                    idx = (j + i * WIDTH) << 2;
                    p[idx] = redC;
                    p[idx + 1] = greenC;
                    p[idx + 2] = blueC;
                    p[idx + 3] = alphaC;
                }
                
                k += 2;
            }
        }
    }
    
    function convolveRGBA(src, out, line, coeff, width, height) {
        // for guassian blur
        // takes src image and writes the blurred and transposed result into out
        var rgba;
        var prev_src_r, prev_src_g, prev_src_b, prev_src_a;
        var curr_src_r, curr_src_g, curr_src_b, curr_src_a;
        var curr_out_r, curr_out_g, curr_out_b, curr_out_a;
        var prev_out_r, prev_out_g, prev_out_b, prev_out_a;
        var prev_prev_out_r, prev_prev_out_g, prev_prev_out_b, prev_prev_out_a;
    
        var src_index, out_index, line_index;
        var i, j;
        var coeff_a0, coeff_a1, coeff_b1, coeff_b2;
    
        for (i = 0; i < height; i++) {
            src_index = i * width;
            out_index = i;
            line_index = 0;
    
            // left to right
            rgba = src[src_index];
    
            prev_src_r = rgba & 0xff;
            prev_src_g = (rgba >> 8) & 0xff;
            prev_src_b = (rgba >> 16) & 0xff;
            prev_src_a = (rgba >> 24) & 0xff;
    
            prev_prev_out_r = prev_src_r * coeff[6];
            prev_prev_out_g = prev_src_g * coeff[6];
            prev_prev_out_b = prev_src_b * coeff[6];
            prev_prev_out_a = prev_src_a * coeff[6];
    
            prev_out_r = prev_prev_out_r;
            prev_out_g = prev_prev_out_g;
            prev_out_b = prev_prev_out_b;
            prev_out_a = prev_prev_out_a;
    
            coeff_a0 = coeff[0];
            coeff_a1 = coeff[1];
            coeff_b1 = coeff[4];
            coeff_b2 = coeff[5];
    
            for (j = 0; j < width; j++) {
                rgba = src[src_index];
                curr_src_r = rgba & 0xff;
                curr_src_g = (rgba >> 8) & 0xff;
                curr_src_b = (rgba >> 16) & 0xff;
                curr_src_a = (rgba >> 24) & 0xff;
    
                curr_out_r = curr_src_r * coeff_a0 + prev_src_r * coeff_a1 + prev_out_r * coeff_b1 + prev_prev_out_r * coeff_b2;
                curr_out_g = curr_src_g * coeff_a0 + prev_src_g * coeff_a1 + prev_out_g * coeff_b1 + prev_prev_out_g * coeff_b2;
                curr_out_b = curr_src_b * coeff_a0 + prev_src_b * coeff_a1 + prev_out_b * coeff_b1 + prev_prev_out_b * coeff_b2;
                curr_out_a = curr_src_a * coeff_a0 + prev_src_a * coeff_a1 + prev_out_a * coeff_b1 + prev_prev_out_a * coeff_b2;
    
                prev_prev_out_r = prev_out_r;
                prev_prev_out_g = prev_out_g;
                prev_prev_out_b = prev_out_b;
                prev_prev_out_a = prev_out_a;
    
                prev_out_r = curr_out_r;
                prev_out_g = curr_out_g;
                prev_out_b = curr_out_b;
                prev_out_a = curr_out_a;
    
                prev_src_r = curr_src_r;
                prev_src_g = curr_src_g;
                prev_src_b = curr_src_b;
                prev_src_a = curr_src_a;
    
                line[line_index] = prev_out_r;
                line[line_index + 1] = prev_out_g;
                line[line_index + 2] = prev_out_b;
                line[line_index + 3] = prev_out_a;
                line_index += 4;
                src_index++;
            }
    
            src_index--;
            line_index -= 4;
            out_index += height * (width - 1);
    
            // right to left
            rgba = src[src_index];
    
            prev_src_r = rgba & 0xff;
            prev_src_g = (rgba >> 8) & 0xff;
            prev_src_b = (rgba >> 16) & 0xff;
            prev_src_a = (rgba >> 24) & 0xff;
    
            prev_prev_out_r = prev_src_r * coeff[7];
            prev_prev_out_g = prev_src_g * coeff[7];
            prev_prev_out_b = prev_src_b * coeff[7];
            prev_prev_out_a = prev_src_a * coeff[7];
    
            prev_out_r = prev_prev_out_r;
            prev_out_g = prev_prev_out_g;
            prev_out_b = prev_prev_out_b;
            prev_out_a = prev_prev_out_a;
    
            curr_src_r = prev_src_r;
            curr_src_g = prev_src_g;
            curr_src_b = prev_src_b;
            curr_src_a = prev_src_a;
    
            coeff_a0 = coeff[2];
            coeff_a1 = coeff[3];
    
            for (j = width - 1; j >= 0; j--) {
                curr_out_r = curr_src_r * coeff_a0 + prev_src_r * coeff_a1 + prev_out_r * coeff_b1 + prev_prev_out_r * coeff_b2;
                curr_out_g = curr_src_g * coeff_a0 + prev_src_g * coeff_a1 + prev_out_g * coeff_b1 + prev_prev_out_g * coeff_b2;
                curr_out_b = curr_src_b * coeff_a0 + prev_src_b * coeff_a1 + prev_out_b * coeff_b1 + prev_prev_out_b * coeff_b2;
                curr_out_a = curr_src_a * coeff_a0 + prev_src_a * coeff_a1 + prev_out_a * coeff_b1 + prev_prev_out_a * coeff_b2;
    
                prev_prev_out_r = prev_out_r;
                prev_prev_out_g = prev_out_g;
                prev_prev_out_b = prev_out_b;
                prev_prev_out_a = prev_out_a;
    
                prev_out_r = curr_out_r;
                prev_out_g = curr_out_g;
                prev_out_b = curr_out_b;
                prev_out_a = curr_out_a;
    
                prev_src_r = curr_src_r;
                prev_src_g = curr_src_g;
                prev_src_b = curr_src_b;
                prev_src_a = curr_src_a;
    
                rgba = src[src_index];
                curr_src_r = rgba & 0xff;
                curr_src_g = (rgba >> 8) & 0xff;
                curr_src_b = (rgba >> 16) & 0xff;
                curr_src_a = (rgba >> 24) & 0xff;
    
                rgba = ((line[line_index] + prev_out_r) << 0) +
                    ((line[line_index + 1] + prev_out_g) << 8) +
                    ((line[line_index + 2] + prev_out_b) << 16) +
                    ((line[line_index + 3] + prev_out_a) << 24);
    
                out[out_index] = rgba;
    
                src_index--;
                line_index -= 4;
                out_index -= height;
            }
        }
    }
    
    function getMatrixesTransform(matrixes) {
        var xOff = 0;
        var yOff = 0;
        var rotate = 0;
        
        for (var i = 0; i < matrixes.length; i++) {
            xOff += matrixes[i].x;
            yOff += matrixes[i].y;
            rotate += matrixes[i].rotate;
        }
        
        return {
            x: xOff,
            y: yOff,
            rotate: rotate
        };
    }
    
    const CSS_COLORS = [
        "black","#000000",
        "silver","#C0C0C0",
        "gray","#808080",
        "white","#FFFFFF",
        "maroon","#800000",
        "red","#FF0000",
        "purple","#800080",
        "fuchsia","#FF00FF",
        "green","#008000",
        "lime","#00FF00",
        "olive","#808000",
        "yellow","#FFFF00",
        "navy","#000080",
        "blue","#0000FF",
        "teal","#008080",
        "aqua","#00FFFF",
        "aliceblue","#f0f8ff",
        "antiquewhite","#faebd7",
        "aqua","#00ffff",
        "aquamarine","#7fffd4",
        "azure","#f0ffff",
        "beige","#f5f5dc",
        "bisque","#ffe4c4",
        "black","#000000",
        "blanchedalmond","#ffebcd",
        "blue","#0000ff",
        "blueviolet","#8a2be2",
        "brown","#a52a2a",
        "burlywood","#deb887",
        "cadetblue","#5f9ea0",
        "chartreuse","#7fff00",
        "chocolate","#d2691e",
        "coral","#ff7f50",
        "cornflowerblue","#6495ed",
        "cornsilk","#fff8dc",
        "crimson","#dc143c",
        "cyan","#00ffff",
        "darkblue","#00008b",
        "darkcyan","#008b8b",
        "darkgoldenrod","#b8860b",
        "darkgray","#a9a9a9",
        "darkgreen","#006400",
        "darkgrey","#a9a9a9",
        "darkkhaki","#bdb76b",
        "darkmagenta","#8b008b",
        "darkolivegreen","#556b2f",
        "darkorange","#ff8c00",
        "darkorchid","#9932cc",
        "darkred","#8b0000",
        "darksalmon","#e9967a",
        "darkseagreen","#8fbc8f",
        "darkslateblue","#483d8b",
        "darkslategray","#2f4f4f",
        "darkslategrey","#2f4f4f",
        "darkturquoise","#00ced1",
        "darkviolet","#9400d3",
        "deeppink","#ff1493",
        "deepskyblue","#00bfff",
        "dimgray","#696969",
        "dimgrey","#696969",
        "dodgerblue","#1e90ff",
        "firebrick","#b22222",
        "floralwhite","#fffaf0",
        "forestgreen","#228b22",
        "fuchsia","#ff00ff",
        "gainsboro","#dcdcdc",
        "ghostwhite","#f8f8ff",
        "gold","#ffd700",
        "goldenrod","#daa520",
        "gray","#808080",
        "green","#008000",
        "greenyellow","#adff2f",
        "grey","#808080",
        "honeydew","#f0fff0",
        "hotpink","#ff69b4",
        "indianred","#cd5c5c",
        "indigo","#4b0082",
        "ivory","#fffff0",
        "khaki","#f0e68c",
        "lavender","#e6e6fa",
        "lavenderblush","#fff0f5",
        "lawngreen","#7cfc00",
        "lemonchiffon","#fffacd",
        "lightblue","#add8e6",
        "lightcoral","#f08080",
        "lightcyan","#e0ffff",
        "lightgoldenrodyellow","#fafad2",
        "lightgray","#d3d3d3",
        "lightgreen","#90ee90",
        "lightgrey","#d3d3d3",
        "lightpink","#ffb6c1",
        "lightsalmon","#ffa07a",
        "lightseagreen","#20b2aa",
        "lightskyblue","#87cefa",
        "lightslategray","#778899",
        "lightslategrey","#778899",
        "lightsteelblue","#b0c4de",
        "lightyellow","#ffffe0",
        "lime","#00ff00",
        "limegreen","#32cd32",
        "linen","#faf0e6",
        "magenta","#ff00ff",
        "maroon","#800000",
        "mediumaquamarine","#66cdaa",
        "mediumblue","#0000cd",
        "mediumorchid","#ba55d3",
        "mediumpurple","#9370db",
        "mediumseagreen","#3cb371",
        "mediumslateblue","#7b68ee",
        "mediumspringgreen","#00fa9a",
        "mediumturquoise","#48d1cc",
        "mediumvioletred","#c71585",
        "midnightblue","#191970",
        "mintcream","#f5fffa",
        "mistyrose","#ffe4e1",
        "moccasin","#ffe4b5",
        "navajowhite","#ffdead",
        "navy","#000080",
        "oldlace","#fdf5e6",
        "olive","#808000",
        "olivedrab","#6b8e23",
        "orange","#ffa500",
        "orangered","#ff4500",
        "orchid","#da70d6",
        "palegoldenrod","#eee8aa",
        "palegreen","#98fb98",
        "paleturquoise","#afeeee",
        "palevioletred","#db7093",
        "papayawhip","#ffefd5",
        "peachpuff","#ffdab9",
        "peru","#cd853f",
        "pink","#ffc0cb",
        "plum","#dda0dd",
        "powderblue","#b0e0e6",
        "purple","#800080",
        "red","#ff0000",
        "rosybrown","#bc8f8f",
        "royalblue","#4169e1",
        "saddlebrown","#8b4513",
        "salmon","#fa8072",
        "sandybrown","#f4a460",
        "seagreen","#2e8b57",
        "seashell","#fff5ee",
        "sienna","#a0522d",
        "silver","#c0c0c0",
        "skyblue","#87ceeb",
        "slateblue","#6a5acd",
        "slategray","#708090",
        "slategrey","#708090",
        "snow","#fffafa",
        "springgreen","#00ff7f",
        "steelblue","#4682b4",
        "tan","#d2b48c",
        "teal","#008080",
        "thistle","#d8bfd8",
        "tomato","#ff6347",
        "turquoise","#40e0d0",
        "violet","#ee82ee",
        "wheat","#f5deb3",
        "white","#ffffff",
        "whitesmoke","#f5f5f5",
        "yellow","#ffff00",
        "yellowgreen","#9acd32"
    ];
    
    function hexToRGBA(hex) {
        let bytes = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => r + r + g + g + b + b).slice(1).match(/.{2}/g);
        for (var i = 0; i < bytes.length; i++) {
            bytes[i] = parseInt(bytes[i], 16);
        }
        return [bytes[0], bytes[1], bytes[2], bytes[3] ?? 255];
    }
    function RGBAToHex(rgba) {
        let hex = "#" + (1 << 24 | rgba[0] << 16 | rgba[1] << 8 | rgba[2]).toString(16).slice(1);
        if (rgba[3] < 255) {
            let ah = (rgba[3]|0).toString(16);
            hex += rgba[3]|0 < 16 ? "0" + ah : ah;
        }
        return hex;
    }
    function stringToRGBA(str) {
        let rgba = [0, 0, 0, 255];
        str = str.toLowerCase();
        try {
            if (str.charAt(0) === '#') {
                rgba = hexToRGBA(str);
            } else if (str.startsWith("rgb")) {
                let i, raw = str.slice(str.indexOf("(") + 1, str.length - 1).split(",");
                for (i = 0; i < raw.length; i++) {
                    rgba[i] = Number(raw[i]) || 0;
                }
                if (raw.length === 3) {
                    rgba[3] = 255;
                }
            } else {
                let idx = CSS_COLORS.indexOf(str);
                if (idx !== -1) {
                    rgba = hexToRGBA(CSS_COLORS[idx + 1]);
                }
            }
        } catch (e) {
            rgba = [0, 0, 0, 255];
        }
        return rgba;
    }

    class VCanvasImageData {
        constructor(a, b, c, d) {
            if (typeof a === "number") {
                this.data = new Uint8ClampedArray(a * b * 4);
                this.width = a;
                this.height = b;
                this.colorSpace = typeof c === "object" && c.colorSpace ? c.colorSpace : "srgb";
            } else if (a instanceof Uint8ClampedArray) {
                this.data = a;
                this.width = b;
                this.height = typeof c === "number" ? c : a.length / 4 / b;
                if (c !== a.length / 4 / b) {
                    throw "Invalid VCanvasImageData arguments";
                }
                this.colorSpace = typeof d === "object" && d.colorSpace ? d.colorSpace : "srgb";
            } else {
                throw "Invalid VCanvasImageData arguments";
            }
        }
    }
    
    function validateTypes(vals, types) {
        for (let i = 0; i < vals.length; i++) {
            let type = Array.isArray(types) ? types[0] : types;
            if (typeof vals[i] !== type || Number.isNaN(vals[i])) {
                return false;
            }
        }
        return true;
    }

    class VCanvasRenderingContext2D  {
        #imgData;
        #fillStyle = [0, 0, 0, 255];
        #strokeStyle = [0, 0, 0, 255];
        #lineWidth = 1;
        #matrixes = [];
        #pen = [undefined, undefined];
        #path = [];
        constructor(canvas) {
            this.canvas = canvas;
            this.direction = "ltr";
            this.filter = "none";
            this.font = "10px sans-serif";
            this.fontKerning = "auto";
            this.globalAlpha = 1;
            this.globalCompositeOperation = "source-over";
            this.imageSmoothingEnabled = true;
            this.imageSmoothingQuality = "low";
            this.lineCap = "butt";
            this.lineDashOffset = 0;
            this.lineJoin = "miter";
            this.miterLimit = 10;
            this.shadowBlur = 0;
            this.shadowColor = "rgba(0, 0, 0, 0)";
            this.shadowOffsetX = 0;
            this.shadowOffsetY = 0;
            this.textAlign = "start";
            this.textBaseline = "alphabetic";
            
            this.#imgData = new VCanvasImageData(canvas.width, canvas.height);
        }

        __getImageData__() {
            return this.#imgData;
        }
        
        get strokeStyle() {
            return RGBAToHex(this.#strokeStyle);
        }
        set strokeStyle(val) {
            this.#strokeStyle = stringToRGBA(val);
        }
        
        get fillStyle() {
            return RGBAToHex(this.#fillStyle);
        }
        set fillStyle(val) {
            this.#fillStyle = stringToRGBA(val);
        }
        
        get lineWidth() {
            return this.#lineWidth;
        }
        set lineWidth(val) {
            this.#lineWidth = Number(val);
        }
        
        arc() {}
        arcTo() {}
        beginPath() {
            this.#path = [];
        }
        bezierCurveTo() {}
        clearRect() {
            var p = this.externals.imageData.data;

            for (var i = 0; i < p.length; i += 4) {
                p[i] = r;
                p[i + 1] = g;
                p[i + 2] = b;
                p[i + 3] = 255;
            }
        }
        clip() {}
        closePath() {
            this.#path = [];
        }
        createConicGradient() {}
        createImageData() {}
        createLinearGradient() {}
        createPattern() {}
        createRadialGradient() {}
        drawFocusIfNeeded() {}
        drawImage() {}
        ellipse() {
            if (h === undefined) { return }
    
            var transform = getMatrixesTransform(this.externals.matrixes);
            
            x = Math.round(x + transform.x);
            y = Math.round(y + transform.y);
        
            renderEllipse(this.externals.imageData, x, y, w, h, this.externals.currentFillColor);
        
            if (this.externals.currentStrokeColor[3] > 0) {
                var p = this.externals.imageData.data;
                var WIDTH = this.externals.imageData.width;
            
                w = w / 2;
                h = h / 2;
                
                var redC = this.externals.currentStrokeColor[0];
                var greenC = this.externals.currentStrokeColor[1];
                var blueC = this.externals.currentStrokeColor[2];
            
                var a = w / 2;
                var b = h / 2;
                var perim = Math.PI * (3 * (a + b) - Math.sqrt((3 * a + b) * (a + 3 * b)));
                var incr = Math.PI * 2 / perim / 3;
            
                for (var i = 0; i < Math.PI * 2; i += incr) {
                    var xPos = ~~(x + Math.cos(i) * w);
                    
                    if (xPos >= 0 && xPos < WIDTH) {
                        var idx = (xPos + ~~(y + Math.sin(i) * h) * WIDTH) << 2;
                
                        p[idx] = redC;
                        p[idx + 1] = greenC;
                        p[idx + 2] = blueC;
                        p[idx + 3] = 255;
                    }
                }
            }
        }
        fill() {
            
        }
        fillRect(x, y, w, h) {
            x = Number(x);
            y = Number(y);
            w = Number(w);
            h = Number(h);
            if (!validateTypes([x, y, w, h], "number")) return;
            
            let transform = getMatrixesTransform(this.#matrixes);
            
            x = Math.round(x + transform.x);
            y = Math.round(y + transform.y);
            w = Math.round(w);
            h = Math.round(h);
            
            renderRectangle(
                x, y, w, h, 
                this.#imgData, this.#fillStyle
            );
        }
        fillText() {
            var f = base64ToArrayBuffer(font_default);
        
            f = opentype.parse(f);
            
            var p = f.getPath(txt, x, y, 22).commands;
            
            for (var i = 0; i < p.length; i++) {
                var com = p[i];
                switch (com.type) {
                    case "M":
                        this.noFill();
                        this.beginShape();
                        this.vertex(com.x, com.y);
                        break;
                    case "L":
                        this.vertex(com.x, com.y);
                        break;
                    case "Z":
                        this.endShape(this.CLOSE);
                        break;
                }
            }
        }
        getContextAttributes() {}
        getImageData() {
            let op = this.#imgData.data,
                imgData = new VCanvasImageData(this.canvas.width, this.canvas.height),
                p = imgData.data,
                i;
            for (i = p.length - 1; i >= 0; i--) {
                p[i] = op[i];
            }
            return imgData;
        }
        getLineDash() {}
        getTransform() {}
        isPointInPath() {}
        isPointInStroke() {}
        lineTo(x, y) {
            x = Number(x);
            y = Number(y);
            if (!validateTypes([x, y], "number")) return;
            this.#path.push(["l", this.#pen[0], this.#pen[1], x, y]);
        }
        measureText() {}
        moveTo(x, y) {
            x = Number(x);
            y = Number(y);
            if (!validateTypes([x, y], "number")) return;
            this.#pen[0] = Number(x);
            this.#pen[1] = Number(y);
        }
        putImageData() {}
        quadraticCurveTo() {}
        rect() {}
        resetTransform() {}
        restore() {}
        rotate() {}
        roundRect() {}
        save() {}
        scale() {}
        setLineDash() {}
        setTransform() {}
        stroke() {
            for (let i = 0; i < this.#path.length; i++) {
                let shp = this.#path[i];
                switch(shp[0]) {
                    case "l": {
                        renderLine(shp[1], shp[2], shp[3], shp[4], this.#imgData. clr, this.#lineWidth, this.lineCap);
                        console.log(shp)
                    }
                }
            }
            
        }
        strokeRect(x, y, w, h) {
            x = Number(x);
            y = Number(y);
            w = Number(w);
            h = Number(h);
            if (!validateTypes([x, y, w, h], "number")) return;
            
            let transform = getMatrixesTransform(this.#matrixes);
            
            x = x + transform.x;
            y = y + transform.y;
            
            let halfSW = this.#lineWidth / 2;
            renderLine(
                x + halfSW, y, x + w - halfSW, y, 
                this.#imgData, this.#strokeStyle, 
                this.#lineWidth, "butt"
            );
            renderLine(
                x + w, y, x + w, y + h, 
                this.#imgData, this.#strokeStyle, 
                this.#lineWidth, "square"
            );
            renderLine(
                x + halfSW, y + h, x + w - halfSW, y + h, 
                this.#imgData, this.#strokeStyle, 
                this.#lineWidth, "butt"
            );
            renderLine(
                x, y, x, y + h, 
                this.#imgData, this.#strokeStyle, 
                this.#lineWidth, "square"
            );
        }
        strokeText() {}
        transform() {}
        translate() {}
    }
    
    class VCanvas {
        static JPEG;
        static PNG;
        
        #context;
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.#context = new VCanvasRenderingContext2D(this);
        }
        
        captureStream() {
            console.error("VCanvas doesn't support canvas.captureStream");
        }
        getContext(contextType, contextAttributes) {
            if (contextType === "2d") {
                return this.#context;
            } else {
                console.error("VCanvas doesn't support " + contextType + " context type");
            }
        }
        toBlob() {}
        toDataURL(type, quality=0.5) {
            const imgData = this.#context.__getImageData__();
            
            type = type.toLowerCase();

            let rawData;
            switch (type) {
                case "image/jpg": case "image/jpeg":  case "image/jfif":
                    rawData = VCanvas.JPEG.encode(imgData, quality * 100);
                    break;
                case "image/png": default:
                    rawData = VCanvas.PNG.encode(imgData);
                    break;
            }

            let binStr = "";
            for (let i = 0; i < rawData.length; i++) {
                binStr += String.fromCharCode(rawData[i]);
            }

            return "data:" + type + ";base64," + Base64.btoa(binStr);
        }
        transferControlToOffScreen() {}
    }
    
    if (typeof window === "undefined") {
        module.exports = VCanvas;
    } else {
        window.VCanvas = VCanvas;
    }
})();
