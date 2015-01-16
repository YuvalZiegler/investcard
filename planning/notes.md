# Prototype

I like to have a visual representation of the UI element before implementing any code. I usually use __Balsamiq__ to quickly sketch a prototype. 

# Tooling

I decided to use Flux architecture with react for the purpose of this demo. This will require a simple build system, i will use __Gulp__ with __Browserify__ to bundle the static assets.

# Dev
#### Flux
##### APPLICATION ARCHITECTURE FOR BUILDING USER INTERFACES

"Flux is the application architecture that Facebook uses for building client-side web applications. It complements React's composable view components by utilizing a unidirectional data flow. It's more of a pattern rather than a formal framework, and you can start using Flux immediately without a lot of new code."

###### Actions
The actions are simple objects containing the new data and an identifying type property.