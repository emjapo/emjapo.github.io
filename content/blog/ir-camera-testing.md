---
title: "IR Camera Testing"
date: 2023-07-06T11:40:40-04:00
---

One of my main responsibilities so far since I started grad school has been to get six Flir Boson IR cameras to work simultaneously. This is just one of the sensors we are using for our smart room project, and so far it has been the most difficult to deal with. Between corresponding with the vendors and the complete lack of documentation on actually using them, the cameras have been a major headache. The bigger the headache though, the better it feels when there is finally a breakthrough.

First, some background into the camera struggles.

We wanted radiometric cameras so that we could pick up participants' temperatures unobtrusively. However, we did not receive radiometrically calibrated cameras. The supplier was very good about doing what they could to rectify the situation though. They calibrated our cameras for us and provided an SDK for us to use to get temperature values. While this theoretically solved our problem, it made it where we were not able to use any of Flir's radiometric GUI applications. Since we had six cameras, the GUI would not have been much help to us anyway.

From there we had to figure out how to integrate the Boson SDK into our application. The directions on how to use the Boson SDK were very vague, confusing, and practically non-existent for Windows. Eventually, we figured out how to build the SDK, but on Linux. This required us to have to request for a new version of the radiometric SDK and switch development platforms for the camera and all of the other sensors we are going to use. Eventually after months of disappointment, we were able to get temperature from the cameras. 

The next step was testing that the temperatures we were getting were accurate. I set up a makeshift blackbody to test the cameras. Surprisingly, the best thing to use for this is just a cardboard box. Cardboard is a great insulator which makes it ideal for testing IR cameras. If I wanted it to be very accurate, then I would have needed to adjust the dimensions of the box to create a true black body. For our purposes, the box the cameras came in was good enough.

<img src="/images/cam-blackbody.jpeg" alt="6 cameras facing one direction in a cardboard box" style="transform-origin: center;  width:50%; translate: 50%;" />

There was still a major issue that I had yet to tackle. Getting one camera to record images - easy. Getting one cameras to record images and temperatures - easy. Getting six cameras to record images - easy. Getting six cameras to record images and temperatures - impossible. 

The Boson SDK is written in C which means it isn't object oriented, and therefore opening more than one camera would cause it to crash. To get around this, we wrote a C++ wrapper for the SDK that allowed for camera objects. C++ is what the rest of our code was already in, so this method was more practical than switching to the Python version of the SDK. The speed of C++ compared to Python was also a contributing factor to the decision. After that, a few more classes were added to help streamline the setup and functionality of each camera. Now, we are able to start up each camera on a different thread with separate writing threads which allows for us to capture at 30 FPS with six cameras on one computer.

<div style="display: flex; justify-content: space-between;">
    <img src="/images/irCam-setclose.jpg" alt="cameras in different directions are pointing at 3 plastic yellow cups on a table" style="width:40%; " />
    <img src="/images/ircam-setupfar.jpg" alt="cameras in on tripods and racks are pointing at 3 plastic yellow cups on a table while lots of cords litter the ground" style="width:50%;" />
</div>

Our first of the big tests is the cup test. The setup for this is shown in the pictures above. The three cups filled with either hot water, cold water, or room temperature water, but obviously this is not visible to the naked eye. However, the IR camera will able to easily show which is which. The cameras will record at 2 FPS until all of the water reaches room temperature which we are guessing will take around 5 hours. Hopefully, the hard drive doesn't run out of storage before then :)






