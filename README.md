# Handling long running tasks with browser based store & forward & SignalR
## Finnish MS Techdays 2013

This project demonstrates how to use browser based store & forward in a scenario of 
batch operation done from the UI: user selects multiple items and commits one action, 
but item handling at server might take a long time. SignalR is used to notify user 
about the progress.

Technologies used:

- [ASP.NET MVC](http://www.asp.net/mvc) for server side routing and views
- [Knockout.js](http://knockoutjs.com/) for client side MVVM pattern
- [Sammy.js](http://sammyjs.org/) for client side routing
- [SignalR](http://signalr.net) [hubs](https://github.com/SignalR/SignalR/wiki/Hubs) for moving messages from browser to server, and for acknowledging messages received at server.
- [Twitter bootstrap](http://twitter.github.com/bootstrap/) for easy demo layout
- [Typescript](http://www.typescriptlang.org) for easy JavaScript module creation.

To run the demo, open project in Visual Studio and run it. Open developer tools console to view additional JavaScript console.log() output.

-----
### What should I look for?
Meaningful code can be found from

- Hubs/LongRunningTaskHub.cs: SignalR hub with artificial delay for better demo effect
- Scripts/Things/ThingListViewModel.ts: Wiring up long running operations
- Scripts/JSBus: Bus implementation
- Views/Home/_MyTasks.cshtml: Client side rendering for the list
- Scripts/routes.js: Client side routing with Sammy.js
