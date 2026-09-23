# Sandboxing Experiment

*Assignment for week of September 22, 2026*
Nathanael Jenkins

Tried making some minor changes to the site using `pi` inside a `nono` sandbox (using the `mit-parley` profile).

The agent attempted to create a new directory in `/Users/nathanaeljenkins/Library/Preferences/astro` during `npm run build`, which was not allowed:
```
 $ npm run build (timeout 120s)                                                                                                                                                                                                                                                                                             
                                                                                                                                                                                                                                                                                                                            
 > 16s897-portfolio@1.0.0 build                                                                                                                                                                                                                                                                                             
 > astro build                                                                                                                                                                                                                                                                                                              
                                                                                                                                                                                                                                                                                                                            
 EPERM: operation not permitted, mkdir '/Users/nathanaeljenkins/Library/Preferences/astro'                                                                                                                                                                                                                                  
   Location:                                                                                                                                                                                                                                                                                                                
     /Users/nathanaeljenkins/Desktop/MIT/PhD/16.S897/nathanaelj/node_modules/@astrojs/telemetry/dist/config.js:57:8                                                                                                                                                                                                         
   Stack trace:                                                                                                                                                                                                                                                                                                             
     at Object.mkdirSync (node:fs:1734:26)                                                                                                                                                                                                                                                                                  
     at get store (file:///Users/nathanaeljenkins/Desktop/MIT/PhD/16.S897/nathanaelj/node_modules/@astrojs/telemetry/dist/config.js:39:10)                                                                                                                                                                                  
     at AstroTelemetry.getConfigWithFallback (file:///Users/nathanaeljenkins/Desktop/MIT/PhD/16.S897/nathanaelj/node_modules/@astrojs/telemetry/dist/index.js:38:38)                                                                                                                                                        
     at get isDisabled (file:///Users/nathanaeljenkins/Desktop/MIT/PhD/16.S897/nathanaelj/node_modules/@astrojs/telemetry/dist/index.js:67:17)                                                                                                                                                                              
     at notify (file:///Users/nathanaeljenkins/Desktop/MIT/PhD/16.S897/nathanaelj/node_modules/astro/dist/cli/telemetry/index.js:5:19)                                                                                                                                                                                      
                                                                                                                                                                                                                                                                                                                            
                                                                                                                                                                                                                                                                                                                            
 Command exited with code 1  
```

`nono why` explained the reason for this (the path was not in the current working directory):
```
>>> nono why --path '/Users/nathanaeljenkins/Library/Preferences/astro'   
DENIED
  Reason: path_not_granted
  Details: Path is not covered by any capability: /Users/nathanaeljenkins/Library/Preferences/astro
  Suggested fix: --read /Users/nathanaeljenkins/Library/Preferences/astro
```

Since I was running `npm run dev` live, I did not feel a need for the agent to verify changes using `npm run build`. I left this disabled, and may add instructions for future agents to avoid this call.