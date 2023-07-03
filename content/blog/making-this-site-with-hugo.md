---
title: "Making This Site With Hugo"
date: 2023-06-30T00:59:46-04:00
---

It felt like it was time for a change on my personal site, and I wanted to integrate a blog feature on my site so I could document some of my PhD journey. I also wanted to do it as cheap as possible in true computer scientist fashion. That led me to static site generators (SSG) so that I could continue using my Github Pages site. I have always done my sites in either vanilla html and css or using React, so learning how to use a SSG was a new challenge for me.

### Step 1: Picking an SSG

The first option I looked into was [Jekyll](https://jekyllrb.com/). Some of the online chatter I found made it sound like the community is moving away from Jekyll and towards the faster [Hugo](https://gohugo.io/). The main drawback people mentioned about Hugo was that the syntax was a bit more difficult to pickup compared to Jekyll. For me who knows neither, this is actually a plus in my book. I would rather learn the harder one first, so that if I ever need to migrate, then Jekyll will feel like a breeze.  

Also I liked the Hugo website design much better than the Jekyll one. The only reason I even looked for alternatives to Jekyll in the first place is because I didn't like the site design. 


### Step 2: Install It

I find that installing new stuff is always more difficult than it should be. The Hugo docs give instructions on multiple different ways to install it. Of course I didn't have the right softwares needed to download it because when would it ever be that easy. The docs specify that you need Powershell to run the commands and Windows Powershell doesn't count. So after installing the newest of my 100 versions of Powershell, I was able to install it with choco. The actual install was not bad at all.

### Step 3: Watch Some Tutorials

The Hugo docs linked some Youtube videos from [Giraffe Academy](https://www.youtube.com/@GiraffeAcademy) that explained things very well. He has a [23 video playlist](https://youtu.be/qtIqKaDlqXo) explaining the basics of Hugo. They are very well explained with examples even if they are a little dated now. The comments were good at pointing out any of the syntax that has changed since the videos were created. After watching all of the videos, I felt like I was prepared to make a whole Hugo site.

### Step 4: Get Coding

I was not prepared to make a whole Hugo site.

The tutorials I watched were with the assumption that a theme would be used. This was a problem for me because I wanted to make my own theme and I was unaware of how much of making the site depends on the theme. The videos were still very good at explaining core concepts, but I needed more.

Hugo has a command built in ```hugo new theme THEME_NAME``` that will create a theme skeleton. Everything in the layouts folder can then be copied into the root layout folder for a basic site that runs. There is still a long way to go, but the layouts provided by Hugo give a good starting point by providing the partials and default layouts needed.

From there I needed to figure out how to create static pages that were not part of my blog. The directions for this were hard to find and confusing. Since Hugo is a static site generator, lots of the results were just directions on how to use Hugo rather than how to make a specific type of page. Eventually, I found the solution, and it was a lot easier than I was expecting. In the front matter of the markdown file for the non-blog page, add ```layout: custompage```. Then in ```layouts/_default```, add ```custompage.html``` to create a special layout for any file that is set with the layout custompage. This can be repeated as many times as needed just by changing the layout name and creating a corresponding html file.

From there I copied some of the navigation elements from one of the Hugo themes. One day I will need to change it to a a Hugo Menu, but for now I just want to get my content on the site so that I can start with the CSS. My next step will be to make sure I can get the Github workflow working. 

