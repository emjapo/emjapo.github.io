---
title: "Movement in Asymmetric VR Collaboration"
date: 2026-02-27T14:41:27-05:00
---


*The code for the analysis of this study can be found at [emjapo/CWHAP-analysis](https://github.com/emjapo/CWHAP-analysis) on Github which includes additional details about the specific measures and their calculation*

![Gameplay and players](/images/cwhap-teaser-image.png) 

One of the difficulties of of long duration space missions is that the team is disjointed with one part being hands-on in space and the other providing support from mission control on Earth. The disconnect between astronauts and mission control is already considered a significant challenge, and by introducing the extended distance of long duration missions, there is the additional challenge of communication delays. This makes understanding the intricacies of complex collaborative problem solving even more important to understand.

To study this phenomena on Earth, my team chose to replicate the astronaut-mission control dynamics with an asymmetrical VR cooperative puzzle game. Luckily, a friend of mine recently developed a game ([Canaveral, We Have a Problem](https://johnsermarini.itch.io/canaveral-we-have-a-problem))  that fit all of our needs and he was able to modify it to allow us to collect telemetry data for us. [Canaveral, We Have a Problem](https://johnsermarini.itch.io/canaveral-we-have-a-problem) is a couch co-op VR puzzle game where one player uses a VR headset to actively solve puzzles on the surface of a meteor while a mission control operator using a PC provides them information to solve the puzzles. In order to solve the puzzles, players have to work together to develop situational awareness, solve complex problems, and share information.

![CWHAP gameplay](/images/CWHAP-Gameplay.jpg)

For our study, we decided to focus on movement. The theories of embodied cognition and grounded cognition acted as a theoretical foundation to suggest that movement could be used as a proxy to measure cognition since they link movement through environment and cognition (Barsalou, 2008; Gibbs, 2006; Adams, 2010). Additionally, expertise has been shown to influence movement and coordination (Jordan and Dhamala, 2022; Aghazadeh et al., 2023). From an application perspective, measuring team member's movement in real long duration space mission teams would be relatively simple with the use of accelerometers or motion capture systems therefore making it a reasonable path to take to support real teams.

Our study procedure started with a pre-test before the participants completed the task which was then followed up with a post-test. The pre-test measured Big-5 personality (Gosling et al, 2003), video game experience (Williams, 2024), virtual reality usage, and teammate familiarity. The post-test measured team process (Mathieu et al., 2020), performance evaluations, mental workload (Hart, 2006), and perceived usability (Brooke, 1995). During the task we collected screen and audio recordings from both participants, mouse velocity, and positions from the headset and both controllers. 

<div style="display: flex; justify-content: space-around;">
    <img src="/images/participant-1.jpg" alt="One person is standing up and wearing a VR headset and the other person is using a laptop with a mouse at a table" style="width:40%; " />
    <img src="/images/participant-2.jpg" alt="One person is standing up and wearing a VR headset and the other person is using a laptop with a mouse at a table" style="width:40%;" />
</div>

With this study, the main research questions we aimed to address were:
- Does **movement** have a positive correlation with team performance?
- Do the **Big 5 Personality** measures interact with **movement** to predict team performance?
- Does **video game experience** and **jerk** impact team performance?
- How does **modality** impact team performance and individual experiences?

I'll abbreviate the rest of the pilot study and only mention statistically significant findings since I do hope to one day repeat it as a full study and publish those findings.

<div style="display: flex; justify-content: space-around;">
    <img src="/images/vres_movement.png" alt="scatter and line plot with a confidence interval of the negative relationship between emotional stability and head movement" style="width:40%; " />
    <img src="/images/left_hand_success_relationship.png" alt="scatter and line plot of the positive relationship between left hand movement and the amount of tasks completed" style="width:40%;" />
</div>

We were able to run this pilot with 16 participants for a total of 8 teams. For all of our team based analyses, this was not a large enough N to successfully run a linear mixed effects model. However, we did find significance with head movement and Big 5 personality. Multiple linear regression was used to test if the Big Five personality traits significantly predicted head movement. The overall regression was statistically significant (R2 = 0.95, F(5, 2) = 30.52, p = 0.03). Emotional stability significantly predicted movement (β = -0.02, p = 0.009). Conscientiousness (β = -0.005, p = 0.05) was a marginally significant predictor. Therefore, less emotional stability and conscientiousness were correlated with more movement.

We also found significance with left hand movement and task completion. The overall linear regression of left hand movement predicting task completion was statistically significant (R2 = 0.57, (F(1, 6) = 7.895), p = 0.03). Left hand movement was a significant positive predictor of task performance (β = 30.35, p = 0.03). Therefore, more movement of the left hand was correlated with higher performance.


Most importantly, we were able to learn a lot about what did and didn't work with our procedure and get insights into other directions to explore with this project in the future which was ultimately our main goal. If you are interested in learning more about this study or have participants that I would be able to use to run a full version of this study, send me an email at <a href="mailto:eport@clemson.edu">eport@clemson.edu</a> :)




---
Adams, F. (2010). Embodied cognition. Phenomenology and the Cognitive Sciences, 9(4), 619–628. https://doi.org/10.1007/s11097-010-9175-x

Aghazadeh, F., Zheng, B., Tavakoli, M., & Rouhani, H. (2023). Motion Smoothness-Based Assessment of Surgical Expertise: The Importance of Selecting Proper Metrics. Sensors, 23(6), Article 6. https://doi.org/10.3390/s23063146

Barsalou, L. W. (2008). Grounded cognition. Annual Review of Psychology, 59, 617–645. https://doi.org/10.1146/annurev.psych.59.103006.093639

Brooke, J. (1995). SUS: A quick and dirty usability scale. Usability Eval. Ind., 189.

Gibbs, R. W. (2005). Embodiment and Cognitive Science. Cambridge University Press.

Gosling, S. D., Rentfrow, P. J., & Swann, W. B. (2003). A very brief measure of the Big-Five personality domains. Journal of Research in Personality, 37(6), 504–528. https://doi.org/10.1016/S0092-6566(03)00046-1

Hart, S. G. (2006). Nasa-Task Load Index (NASA-TLX); 20 Years Later. Proceedings of the Human Factors and Ergonomics Society Annual Meeting, 50(9), 904–908. https://doi.org/10.1177/154193120605000909

Jordan, T., & Dhamala, M. (2022). Video game players have improved decision-making abilities and enhanced brain activities. Neuroimage: Reports, Volume 2(Issue 3). https://doi.org/10.1016/j.ynirp.2022.100112

Mathieu, J. E., Luciano, M. M., D’Innocenzo, L., Klock, E. A., & LePine, J. A. (2020). The Development and Construct Validity of a Team Processes Survey Measure. Organizational Research Methods, 23(3), 399–431. https://doi.org/10.1177/1094428119840801

Williams, J. L. (2024). Informing a comprehensive player profile model through the development of a Video game experience measure to support theory of mind in artificial social intelligence. (graduate thesis and dissertation). University of Central Florida, Orlando, FL, United States. Available at: https://stars.library.ucf.edu/etd2023/275
