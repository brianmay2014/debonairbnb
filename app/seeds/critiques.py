from ..models import db, Critique
critiques = [
    {id: 1, "user_id": 1, "estate_id": 1, "rating": 4, "comment": "Great estate, very spacious, will let my friends know about the listing"},
    {id: 2, "user_id": 2, "estate_id": 2, "rating": 3, "comment": "Took forever to charter the estate, it's so popular you can see they turned around the cleaning a little faster than they should"},
    {id: 3, "user_id": 3, "estate_id": 3, "rating": 2, "comment": "The bathroom needed to be cleaned, I will not share what I found inside"},
    {id: 4, "user_id": 1, "estate_id": 4, "rating": 3, "comment": "Decent, but my bed at home is more comfortable"},
    {id: 5, "user_id": 2, "estate_id": 5, "rating": 3, "comment": "Not enough olive oil in the kitchen, we have a big family"},
    {id: 6, "user_id": 3, "estate_id": 6, "rating": 4, "comment": "Plenty of space for activities"},
    {id: 7, "user_id": 1, "estate_id": 7, "rating": 5, "comment": "Perfect recreation of my childhood home"},
    {id: 8, "user_id": 2, "estate_id": 8, "rating": 4, "comment": "The freshly baked cookies were a nice touch, enjoyed the stay"},
    {id: 9, "user_id": 3, "estate_id": 9, "rating": 2, "comment": "The bedsheets were not tucked in, two stars."},
    {id: 10, "user_id": 1, "estate_id": 10, "rating": 5, "comment": "Made me feel like I was at my own estate"},
    {id: 11, "user_id": 2, "estate_id": 11, "rating": 3, "comment": "We had a ball, which is technically not a party so it was not against the estate rules, but the owner was still not happy, we hired our own cleaners to clean up afterward, I don't see what the problem was"},
    {id: 12, "user_id": 3, "estate_id": 12, "rating": 4, "comment": "Brought me back to the French countryside"},
    {id: 13, "user_id": 1, "estate_id": 13, "rating": 1, "comment": "Nothing debonair about this place, should be listed on airbnb.com"},
    {id: 14, "user_id": 2, "estate_id": 14, "rating": 4, "comment": "My daughter loved it, we'll be coming back as soon as it's available"},
    {id: 15, "user_id": 3, "estate_id": 15, "rating": 2, "comment": "Would have been nice if be bathtub was 50% bigger, I like my room while I soak"},
    {id: 16, "user_id": 1, "estate_id": 16, "rating": 5, "comment": "The backyard had plenty of room for my hounds to run abound"},
    {id: 17, "user_id": 2, "estate_id": 17, "rating": 1, "comment": "The sewage backed up and left us with a unpleasant Sunday surprise, everything was going so great until the morning we checked out. Cannot erase what we saw for our minds."},
    {id: 18, "user_id": 3, "estate_id": 18, "rating": 3, "comment": "Could've used some outdoor blankets, it got cold as we were sipping wine enjoying the view"},
    {id: 19, "user_id": 1, "estate_id": 19, "rating": 2, "comment": "The estate had a distinct smell. Could not pinpoint what it was or where it was coming from, but it was definitely there."},
    {id: 20, "user_id": 2, "estate_id": 20, "rating": 4, "comment": "I loved looking inside all the closets, so much storage space!"},
    {id: 21, "user_id": 3, "estate_id": 1, "rating": 4, "comment": "Great construction, very solid build"},
    {id: 22, "user_id": 1, "estate_id": 2, "rating": 3, "comment": "The library had me distracted, I barely spent any time in other rooms. Beautiful books though"},
    {id: 23, "user_id": 2, "estate_id": 3, "rating": 5, "comment": "The way the sun filtered in the master bedroom in the morning was perfection"},
    {id: 24, "user_id": 3, "estate_id": 4, "rating": 4, "comment": "I got a lot of my book written due to the relaxing environment, thanks"},
    {id: 25, "user_id": 1, "estate_id": 5, "rating": 2, "comment": "The TV wouldn't turn on, so we missed the world series"},
    {id: 26, "user_id": 2, "estate_id": 6, "rating": 3, "comment": "There is clearly enough room for a bowling alley, still waiting on the owner's response. With the bowling alley I would BE BACK"},
    {id: 27, "user_id": 3, "estate_id": 7, "rating": 4, "comment": "The walkie talkies were a nice touch. Easy to keep in touch while my husband was out grilling and I was relaxing inside"},
    {id: 28, "user_id": 1, "estate_id": 8, "rating": 2, "comment": "Found some dust on the gym equipment"},
    {id: 29, "user_id": 2, "estate_id": 9, "rating": 1, "comment": "All of the spices in the kitchen were expired, by over a year. I'm almost just impressed by how old they are, but we had to go back into town to get cumin"},
    {id: 30, "user_id": 3, "estate_id": 10, "rating": 5, "comment": "Wonderful stay, the estate was immaculate"},
    {id: 31, "user_id": 1, "estate_id": 11, "rating": 2, "comment": "Not enough toilets for the amount of people that can sleep here"},
    {id: 32, "user_id": 2, "estate_id": 12, "rating": 4, "comment": "Love the board game closet, luckily Monopoly didn't get too heated ;)"},
    {id: 33, "user_id": 3, "estate_id": 13, "rating": 3, "comment": "The charter process was kind of annoying, the owner kept saying they were available then cancelling, then available, then cancelling, too many back and forths"},
    {id: 34, "user_id": 1, "estate_id": 14, "rating": 4, "comment": "Had some problems unlocking the estate, in it's remote location service was hard to get, so it took about 2 hours to figure out the instructions given"},
    {id: 35, "user_id": 2, "estate_id": 15, "rating": 2, "comment": "Pillows in the living room a little stiff, as we moved them found a wine stain on the couch"},
    {id: 36, "user_id": 3, "estate_id": 16, "rating": 4, "comment": "Only thing I'd suggest is adding a slide somewhere, really anywhere and then it would be a 5 star estate"},
    {id: 37, "user_id": 1, "estate_id": 17, "rating": 3, "comment": "A little too big, we couldn't hear each other as we yelled at the top of our lungs across the house"},
    {id: 38, "user_id": 2, "estate_id": 18, "rating": 1, "comment": "No hot water, owner wouldn't respond, would give zero starts if I could"},
    {id: 39, "user_id": 3, "estate_id": 19, "rating": 5, "comment": "Will definitely be adding this to our summer vacation rotation"},
    {id: 40, "user_id": 1, "estate_id": 20, "rating": 5, "comment": "I loved it so much I made an offer to buy the house, your move patron, your move."},
]

def seed_critiques():
    seeder = [Critique.seed(critique) for critique in critiques]
    db.session.add_all(seeder)
    db.session.commit()

def undo_critiques():
    db.session.execute('TRUNCATE critiques RESTART IDENTITY CASCADE;')
    db.session.commit()
