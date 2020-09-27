# ShellHacks
Hate Map for Shell Hacks

![](./DevpostImages/Full.PNG)

**Inspiration**  
We suffer harassment all the time and anyone attacks you when you give your opinion, the people who know the attacker to discredit the things you share and apparently everyone is against you, however there are only two or three people who have a lot of weight in social networks

**What it does**  
First we extract all tweets with tweepy, then we pass it to azure content moderator to determine the intent of the tweet, if the content is strong and hateful we analyze the profile of the person with ibm personality insight and the natural processing of ibm, we use cloudant, flask and NLP, once we did this we placed it on a map to track the impact their tweets have on other people
