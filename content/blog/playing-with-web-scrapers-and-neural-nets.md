---
title: "Playing With Web Scrapers and Neural Nets"
date: 2023-12-08T01:26:09-05:00
---

If you are interested in learning about neural networks, [TensorFlow Playground](https://playground.tensorflow.org/) is a great resource for helping build intuition about how they work. The interface is user friendly and allows for lots of customizations. I really can't recommend it enough especially if you are just starting to dip your toes into machine learning. Changing hyperparameters, datasets, network shapes, and activations and seeing how those impact performance in just a few seconds can do wonders for demystifying neural networks.

After playing around with the site for bit, I decided to do some comparisons between some different configurations. Changing all of the settings, running the models, and recording data is all well and good, but getting a bot to do all the dirty work is a lot better. Luckily, TensorFlow Playground makes this very easy to do by exposing all of the settings in the URL. This simplifies the actions needed to be performed by the bot by doing string manipulation of the URL.

Step one is to install a web scraper and driver. I chose Selenium with the recommended Chrome driver since it seemed relatively easy to install and use with Python. Installation of Selenium is easy with pip.

```
pip install selenium
```

Then the Chrome driver can be downloaded on the [downloads page](https://sites.google.com/chromium.org/driver/downloads?authuser=0). ChromeDriver 114.0.5735.90 seems to work fine for Chrome versions 114 and above.

#### Trouble shooting

When I was trying to set up my own environment, I kept getting a weird issue anytime I tried to run any of the starter scripts provided by Selenium. Even the simplest example would result in the driver loading a blank page with "Data;" as the URL. There are a few reasons this could happen such as the driver not being found or the version not being compatible with the version of Chrome.

For me, the issue was that I was trying to run the scripts on a WPA2 network, and it was getting blocked by the firewall. Running the script on my home network fixed this issue.

### Building the Web Scraper Logic

First things first, import the necessary packages. In addition to the packages I already discussed, I also included `time` and `csv` so that way I can time each trial to make sure no trials last longer than 30 seconds and so the data can be stored to a CSV.

```
import time
from selenium import webdriver
import csv
```

The first part of the code is the function that contains the logic for manipulating the URL.

```
# Update the url values to change the setting on the TensorFlow Playground page.
# The url that is passed in must be from https://playground.tensorflow.org/

def update_url_values(
        url, dataset=None,
        problem=None,
        learning_rate=None,
        quality=None,
        activation=None,
        networkShape=None,
        x=None,
        y=None,
        xTimesY=None,
        xSquared=None,
        ySquared=None,
        cosX=None,
        sinX=None,
        cosY=None,
        sinY=None,
        batchSize=None):
```

There are a lot of arguments here, but this includes every setting available on TensorFlow Playground so that this functions can be reused for most possible configuration.

The next part parses the URL. The URL is split in to 2 parts: the base/domain and the parameters/page path. The parameter are them parsed to create a dictionary of values that can be changed easily.

```
    # Parse the URL
    url_parts = url.split('#')

    # Extract the base URL and parameters
    base_url = url_parts[0]
    params = url_parts[1] if len(url_parts) > 1 else ''

    # Split parameters into key-value pairs
    param_pairs = params.split('&')

    # Create a dictionary to store key-value pairs
    param_dict = {}
    for pair in param_pairs:
        key, value = pair.split('=')
        param_dict[key] = value
```

Here the passed in arguments are used to change the key value pairs. I simplified the quality settings to 3 different conditions that control the percent of training data and noise. These can easily be split out with the same logic of the other settings for more granular control if that is desired.

```
    # Update 'dataset' and 'problem' values
    if dataset is not None and problem is not None:
        if problem == 'regression':
            param_dict['regDataset'] = dataset
        else:
            param_dict['dataset'] = dataset
        param_dict['problem'] = problem

    # change learning rate if it was passed in
    if learning_rate is not None:
        param_dict['learningRate'] = learning_rate

    # change the quality conditions if it is passed in
    if quality is not None:
        if quality == 'Q-BEST':
            param_dict['percTrainData'] = '90'
            param_dict['noise'] = '0'
        elif quality == 'Q-WORST':
            param_dict['percTrainData'] = '10'
            param_dict['noise'] = '50'
        else:
            param_dict['percTrainData'] = '70'
            param_dict['noise'] = '20'

    # change activation if passed in
    if activation is not None:
        param_dict['activation'] = activation

    # this is a list of numbers representing how many neurons are in each layer.
    # There is a max of 6 layers and 8 neurons for each layer.
    if networkShape is not None:
        param_dict['networkShape'] = networkShape

    # this is a list of the different input options. Inputs must be 'true' or 'false'
    if x is not None:
        param_dict['x'] = x
    if y is not None:
        param_dict['y'] = y
    if xTimesY is not None:
        param_dict['xTimesY'] = xTimesY
    if xSquared is not None:
        param_dict['xSquared'] = xSquared
    if ySquared is not None:
        param_dict['ySquared'] = ySquared
    if cosX is not None:
        param_dict['cosX'] = cosX
    if sinX is not None:
        param_dict['sinX'] = sinX
    if cosY is not None:
        param_dict['cosY'] = cosY
    if sinY is not None:
        param_dict['sinY'] = sinY

    # change batch size if applicable
    if batchSize is not None:
        param_dict['batchSize'] = batchSize

    # Construct the updated URL
    updated_url = base_url + '#' + '&'.join([f"{key}={value}" for key, value in param_dict.items()])

    return updated_url
```

The next function contains the the logic of the web scraper and the subsequently saving the data. It also has lots of arguments, but many of them are repetitions of arguments from the last function because I chose to abstract the previous function from the main code by having this function call `update_url_values()`.

The driver is used to open the updated URL, and then press play. Once the trial has reached a training loss less than .005, stayed stable for a significant amount of time, or lasted for 30 seconds. These were my conditions for "success" or at least conditions to stop the trial.

The web scraper is then used to get the values for training loss and test loss before saving that data to a CSV file. 

The xpath for any given element can typically be found by opening the inspector panel in the browser, right clicking on the element in the HTML, and copying the xpath. This will allow you to reference different elements on the page using the web scraper. 

```
# this will run the driver that will open the passed in url and runs the model on TensorFlow Playground.
# All of the inputs are here so that they will be passed in to the url and then saved to the csv
def getAndSaveData(
        url,
        csvwriter,
        model,
        quality,
        problem,
        learning_rate=None,
        activation=None,
        networkShape=None,
        x=None,
        y=None,
        xTimesY=None,
        xSquared=None,
        ySquared=None,
        cosX=None,
        sinX=None,
        cosY=None,
        sinY=None,
        batchSize=None):

    driver = webdriver.Chrome()  # to open the browser

    # get the url for the problem
    if problem == 'reg-plane' or problem == 'reg-gauss':
        url = update_url_values(
            url,
            problem,
            'regression',
            learning_rate,
            quality,
            activation,
            networkShape,
            x,
            y,
            xTimesY,
            xSquared,
            ySquared,
            cosX,
            sinX,
            cosY,
            sinY,
            batchSize)
    else:
        url = update_url_values(
            url,
            problem,
            'classification',
            learning_rate,
            quality,
            activation,
            networkShape,
            x,
            y,
            xTimesY,
            xSquared,
            ySquared,
            cosX,
            sinX,
            cosY,
            sinY,
            batchSize)

    driver.get(url)

    rows = [model, problem, quality, learning_rate, activation, networkShape, x, y, xTimesY, xSquared, ySquared, cosX, sinX, cosY, sinY, batchSize, '', '']

    t_end = time.time() + 30
    loss = 1.0
    t_start = time.time()
    time_to_completion = 30
    # click play
    driver.find_element('xpath','//*[@id="play-pause-button"]').click()
    while time.time() < t_end:

        # get the data
        loss = float(driver.find_element('xpath', '//*[@id="loss-train"]').text)
        print("loss", loss)
        time.sleep(1)
        loss2 = float(driver.find_element('xpath', '//*[@id="loss-train"]').text)
        print('loss2', loss2)
        if (loss == loss2 and round(time.time()) % 3 == 0) or loss2 < .005:
            time_to_completion = time.time() - t_start
            # rows.append(str(time_to_completion))
            break
        time.sleep(1)
    rows.append(str(time_to_completion))

    # get traingin loss
    rows.append(driver.find_element('xpath', '//*[@id="loss-train"]').text)
    # get test loss
    rows.append(driver.find_element('xpath', '//*[@id="loss-test"]').text)

    # writing to csv file
    print(rows)
    # writing the data rows
    csvwriter.writerow(rows)

    driver.quit()
```

Now here comes the part of the code that is more customized to my specifications. I used 3 different configurations that are somewhat arbitrary settings. Feel free to customize and tweak this.

My configurations are:

<div class="nested-lists">
    <ul>
        <li>MYENG:
            <ul>
                <li>x2, x1x2, sin(x1), sin(x2)</li>
                <li>5, 2, 2</li>
                <li>activation linear</li>
            </ul>
        </li>
        <li>DEEP:
            <ul>
                <li>x1, x2 input</li>
                <li>sigmoid activation</li>
                <li>3, 3</li>
            </ul>
        </li>
        <li>MYBEST:
            <ul>
                <li>x1, x2 input</li>
                <li>sigmoid activation</li>
                <li>5, 3</li>
                <li>batch size 12</li>
            </ul>
        </li>
    </ul>
</div>

I looped through the problems, model configurations, and the qualities to have one trial for each combination.

```
# list of fields that will be the csv headers
fields = ['model', 'problem', 'quality', 'learning_rate', 'activation', 'networkShape', 'x', 'y', 'xTimesY', 'xSquared', 'ySquared', 'cosX', 'sinX', 'cosY', 'sinY', 'batchSize', 'outcome', 'overfit?', 'time', 'L_train', 'L_test']

# list of model types
models = ['MYENG', 'DEEP', 'MYBEST']

# list of problems
problems = ['gauss', 'xor', 'circle', 'spiral', 'reg-plane', 'reg-gauss']

# list of qualities
qualities = ['Q-BEST', 'Q-WORST', 'Q-OK']

# name of csv file
filename = "mlModelsTrials.csv"

# starting url
url = 'https://playground.tensorflow.org/#activation=tanh&batchSize=10&dataset=circle&regDataset=reg-plane&learningRate=0.03&regularizationRate=0&noise=0&networkShape=4,2&seed=0.76341&showTestData=false&discretize=false&percTrainData=50&x=true&y=true&xTimesY=false&xSquared=false&ySquared=false&cosX=false&sinX=false&cosY=false&sinY=false&collectStats=false&problem=classification&initZero=false&hideText=false'


# all the operations happen here
with open(filename, 'w') as csvfile:
    # creating a csv writer object
    csvwriter = csv.writer(csvfile)

    # writing the fields
    csvwriter.writerow(fields)

    for model in models:
        if model == 'MYENG':
            activation='linear'
            networkShape='5,2,2'
            x='false'
            y='true'
            xTimesY='true'
            xSquared='false'
            ySquared='false'
            cosX='false'
            sinX='true'
            cosY='false'
            sinY='true'
            batchSize='10'
        elif model == 'DEEP':
            activation='sigmoid'
            networkShape='3,3'
            x='true'
            y='true'
            xTimesY='false'
            xSquared='false'
            ySquared='false'
            cosX='false'
            sinX='false'
            cosY='false'
            sinY='false'
            batchSize='10'
        elif model == 'MYBEST':
            activation='relu'
            networkShape='5,3'
            x='true'
            y='true'
            xTimesY='false'
            xSquared='false'
            ySquared='false'
            cosX='false'
            sinX='false'
            cosY='false'
            sinY='false'
            batchSize='12'
        for quality in qualities:
            for problem in problems:
                url = update_url_values(url, problem, 'classification')
                getAndSaveData(
                    url,
                    csvwriter,
                    model,
                    quality,
                    problem,
                    '0.01',
                    activation,
                    networkShape,
                    x,
                    y,
                    xTimesY,
                    xSquared,
                    ySquared,
                    cosX,
                    sinX,
                    cosY,
                    sinY,
                    batchSize)
```

That's the gist of the web scraper code I wrote for automating TensorFlow Playground. In a future update, I'll discuss my results. For now I'll leave you to try it out for yourself and see what models and performances you can get from it with your own personal tweaks and updates. 