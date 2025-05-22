---
title: "Modeling Ports"
date: 2022-12-09T15:22:50-04:00
---

<h3 class="course-description">IDS 6145: Simulation Techniques</h3>
<img src="/images/teaserimage.PNG" alt="" style="margin-top:2%;" />

For the final project for SimTech, my group compared the performance of three different port models created in AnyLogic under different conditions. This project evaluated the impact of quay cranes speed on in-port transportation and storage networks by comparing container throughput at three US shipping ports. The goal was to model varying quay cranes speeds to identify the most efficient operation of berth side cranes while maintaining safe and cost-efficient operations. Because the process of unloading and loading shipping containers involves a series of interdependent processes, this model focused on measures directly linked to crane operations, which includes crane speed, number of cranes and container throughput (i.e., rate of unloading cranes and the number leaving port). These variables were compared across the Tampa, Savannah and Los Angeles ports.

![](/images/ports.png)

One of our findings was that the containers in storage and containers serviced are complementary metrics that correlate with the time to unload a ship. The number of containers in storage increased as the time to unload a ship decreased. Conversely, the number of containers serviced decreased as the time to unload a ship decreased.

![](/images/servicedbytrucks.png)
