# S-I-R model Epidemic Simulation 
A simulation of S-I-R model. Made with P5.JS and Graph.JS

The outbreak of the novel coronavirus disease (Covid-19) brought considerable turmoil all around the world. This simulation highlight the important of social distancing and simulate the level of the infection is needed to achieve herd immunity. The simulation does not take into account of death rate and vaccination.


[douglaswzs.github.io/SIR-model-simulation/](https://douglaswzs.github.io/SIR-model-simulation/)

## Demo of this project

<img src="/SIRsimulation.gif"/>

<img src="/SIRsnapshot.jpg"/>

## What is SIR model
SIR model is a kind of compartmental model describing the dynamics of infectious disease. You may wonder why it is called the “compartmental model.” The model divides the population into compartments. Each compartment is expected to have the same characteristics. SIR represents the three compartments segmented by the model.

+ **S**usceptible
+ **I**nfectious
+ **R**ecovered

**Susceptible** is a group of people who are vulnerable to exposure with infectious people. They can be patient when the infection happens. The group of **infectious** represents the infected people. They can pass the disease to susceptible people and can be recovered in a specific period. **Recovered** people get immunity so that they are not susceptible to the same illness anymore. SIR model is a framework describing how the number of people in each group can change over time.

<img src="/sir.png"/>

SIR model allows us to describe the number of people in each compartment with the ordinary differential equation. 
**β**
 is a parameter controlling how much the disease can be transmitted through exposure. It is determined by the chance of contact and the probability of disease transmission. 
**γ**
 is a parameter expressing how much the disease can be recovered in a specific period. Once the people are healed, they get immunity.