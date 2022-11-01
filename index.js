const rwClient = require("./twitterClient.js"); //twitter client
const CronJob = require("cron").CronJob; // package for automating job
var axios = require('axios') // package for making requests


// method for tweeting
const tweet = async () => {
    // get random joke from api
    axios("https://official-joke-api.appspot.com/random_joke").then(Response => {
        // return data
	return [Response.data.setup, Response.data.punchline];
}).then(async ([setup, punch]) => {
    try{
        
        // tweet
        await rwClient.v2.tweet(setup + " " + punch)
    } catch (e) {
        console.error(e)
    }
});
}

// automate program to post every three hours
const job = new CronJob("0 */3 * * *", ()=>{
    tweet();
    var current = new Date();
    console.log(`New tweet posted at ${current}` )
})


// start the job
job.start();

/*
axios("https://official-joke-api.appspot.com/random_joke").then(Response => {
	return [Response.data.setup, Response.data.punchline];
}).then(async ([setup, punch]) => {
    try{
        
        await rwClient.v2.tweet(setup + " " + punch)
    } catch (e) {
        console.error(e)
    }
}); */


