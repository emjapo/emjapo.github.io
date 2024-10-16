---
title: "Drawing in Qualtrics"
date: 2024-10-16T13:53:01-04:00
---

Qualtrics is a great tool for conducting surveys, and I have only recently started playing around with making surveys of my own. For a survey I'm working on now, I needed to figure out a way to allow participants to draw on an image to identify points of interest. There are a few built in solutions for the problem that are built into the application such as heatmap and hot spot question types. The hot spot questions defeat the purpose I would need it for since I want to see if participants can determine the areas not choose between predefined regions. The heatmap question probably would work fine for my situation if I just added in additional points for the participants to define the major points of the object they are identifying, but I wanted the lines between points to be visually represented. 

Instead I opted for creating a custom JavaScript interpretation. I've done some projects before with the HTML Canvas object so I figured I could do some custom HTML+JS to create something that would work. I was able to implement a solution that allowed for participants to define vertices, remove unwanted points, and save the data to qualtrics using HTML, JS, and the Qualtrics API. You can see a demo of it below.

<img src="/images/qualtrics-js.gif" alt="Demo of the drawing application showing point being defined on an image and then being removed with udo buttons" style="transform-origin: center;  width:50%; translate: 50%;" />

Here are the step by step directions to recreate this in your own survey:

To start, create a ```Text / Graphic``` question and set the context to ```Text```. You will also need to upload the picture you want to use to your qualtrics media library in order to use it and then get the URL to the image. You can find that link by clicking on the image in your library. 

Then edit the HTML of the question to add in a canvas object with the image you want set as the background and the height and width of the image.

```
<canvas style="background: url('https://link.to.qualtrics.image')" height="512" width="640" id="canvas">
  Your browser does not support the canvas element.
</canvas>
```
Next, go into the question's JavaScript window. The majority of the code will be in the ```addOnload``` function. There are a few different API function options that could probably used instead (and make more sense semantically in some cases) based on the description listed in the documentation. However, these are the only ones I could get to work. There was probably some secret magic code they left out of the documentation to get them to work, but this way works. 

You will need one global variable for the points data and then local variables for the canvas and the canvas context. This is how you will be able to make changes to the canvas object.

```
var points = [];

Qualtrics.SurveyEngine.addOnload(function()
{
	var canvas = document.getElementById("canvas");
        var context = document.getElementById('canvas').getContext('2d');
});
```

Once you have the objects from the DOM, you will need to add an event listener to the canvas to make it interactive. We are going to use the mouse down event to watch for left clicks from the user. That event listener will then need to call a function to get the canvas coordinates. The canvas coordinate system uses the top left corner as (0,0), so subtracting location of the top left corner from the X,Y coordinates of the click event will give use the coordinates we need. Those points can then be pushed on to the array.


```
/* Get the mouse position on the canvas when clicked */
function getMousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    return {x: x, y: y};
}

/* Add event listener on the canvas to know when points are added */
canvas.addEventListener("mousedown", function (e) {

    points.push(getMousePosition(canvas, e));

});
```

Now to draw on the canvas. The canvas object has some built in functions that allow you to draw on it using the context. We are going to use ```beginPath()```, ```moveTo()```, ```lineTo()```, ```stroke()```, and ```closePath()``` to draw lines on the canvas. To draw the line, we first begin the path and then loop through the points in the array moving to the current point and drawing the line to the next point for each iteration. We can then close the path. 

Every time the user clicks the canvas though, these points will be redrawn on top of the old ones. To help clean this up we can reset the canvas context at the beginning of the function. Additionally, since we need two points to draw a line, we will make sure to only call the function only if there are two points.

```
/* function to draw the lines between the points in the array */
function drawPath() {

    /* reset the canvas to remove all of the previously drawn lines */
    context.reset();

    context.beginPath();
    for (var i = 0; i < points.length - 1; i++) {
        context.moveTo(points[i]['x'], points[i]['y']);
        context.lineTo(points[i + 1]['x'], points[i + 1]['y']);
        context.stroke();
    }
    context.closePath();
}

canvas.addEventListener("mousedown", function (e) {

    points.push(getMousePosition(canvas, e));

    /* if there are two or more lines, we can draw a line */
    if (points.length > 1) {
        drawPath();
    }
}); 
```

With that addition, we end up with pretty good drawing capabilities. There is then the problem of if the user makes a mistake. Luckily we can just add some buttons to the HTML to let us undo mistakes.

```
<div>
 	<button id="undo1" type="button">Undo Drawing</button> 
 	<button id="undo2" type="button">Undo Last Point</button> 
</div>
```

We can then add some JavaScript to make these buttons functional. For the Undo Drawing button, we just assign an empty array to the points array and then call the ```drawPath``` function to reset the canvas.

```
undo1.addEventListener("mousedown", function (e) {
    points = [];
    drawPath();
});
```

We now do a similar thing with the Undo Last Point button except we just remove the last item in the array rather than getting rid of the whole thing.

```
undo2.addEventListener("mousedown", function (e) {
    points.splice(-1);
    drawPath();
});	
```

We are now on the last step: embedding the data. To embed the data from the JavaScript in the survey, you first need to create an embedded data field in the Survey Flow. The field needs ```__js_``` as a prefix or else it won't be captured from the JavaScript. The prefix should not be used in the JavaScript though. Additionally, the data needs to be a string, so we can use the stringify function to get the data ready to send.

So your survey flow should look like this:

<img src="/images/embedded-data.png" alt="Qualtrics survey flow dashboard showing a field called __js_points" style="transform-origin: center;  width:50%; translate: 50%;" />

And your code should look like this:

```
Qualtrics.SurveyEngine.addOnUnload(function()
{
	/* Embed the points data in the survey */
	Qualtrics.SurveyEngine.setJSEmbeddedData("points",  JSON.stringify(points));
	
});
```

And there you go, a drawing question fully integrated with Qualtrics. The full Javascript code should look something like this:

```
var points = [];

Qualtrics.SurveyEngine.addOnload(function()
{
	var canvas = document.getElementById("canvas");
        var context = document.getElementById('canvas').getContext('2d');
	var undo1 = document.getElementById("undo1");
	var undo2 = document.getElementById("undo2");
	

    /* Get the mouse position on the canvas when clicked */
    function getMousePosition(canvas, event) {
        let rect = canvas.getBoundingClientRect();
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;

        return {x: x, y: y};
    }

    /* function to draw the lines between the points in the array */
    function drawPath() {

        /* reset the canvas to remove all of the previously drawn lines */
        context.reset();

        context.beginPath();
        for (var i = 0; i < points.length - 1; i++) {
            context.moveTo(points[i]['x'], points[i]['y']);
            context.lineTo(points[i + 1]['x'], points[i + 1]['y']);
            context.stroke();
        }
        context.closePath();
    }
	

    /* Add event listener on the canvas to know when points are added */
    canvas.addEventListener("mousedown", function (e) {

        points.push(getMousePosition(canvas, e));

        /* if there are two or more lines, we can draw a line */
        if (points.length > 1) {
            drawPath();
        }
    }); 
	
    /* Add event listener for the Undo Drawing button */
	undo1.addEventListener("mousedown", function (e) {
		points = [];
		drawPath();
	});
	
    /* Add event listener for the Undo Last Point button */
	undo2.addEventListener("mousedown", function (e) {
		points.splice(-1);
		drawPath();
	});	
	
});


Qualtrics.SurveyEngine.addOnUnload(function()
{
	/* Embed the points data in the survey */
	Qualtrics.SurveyEngine.setJSEmbeddedData("points",  JSON.stringify(points));
	
});
```

It still needs a way to verify that points have been added before it lets the participant move on, but for now it is a good starting point. Hope this helped!