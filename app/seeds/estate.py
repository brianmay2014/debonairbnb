from ..models import db, Estate

estates = [
    {
        "address": "19 skyline dr bolton landing ny 12814",
        "owner_id": 1,
        "title": "Highlands Castle",
        "nightly_rate": 8295,
        "type_id": 1,
        "description": "Poised on a graceful mountaintop overlooking majestic Lake George, your castle awaits... From the moment you arrive, you'll sense the tranquility that surrounds this enchanting property and you’ll be captivated by the most spectacular view in the world! The intrigue and allure of the castle are matched only by the breathtaking vista",
    },
    {
        "address": "1803 travis dr leander tx 78645",
        "owner_id": 2,
        "title": "Lago Castille",
        "nightly_rate": 5491,
        "type_id": 1,
        "description": "The Above Lago Castille an estate of gorgeous French Provencal architecture with touches of Mediterranean is stunning from the front gates down to the private dock. The home sits amongst unrivaled landscaping and unmatched views. of Lake Travis.",
    },
    {
        "address": "2115 Stevens Ave, Minneapolis, MN 55404",
        "owner_id": 3,
        "title": "Historic Chateau",
        "nightly_rate": 2000,
        "type_id": 2,
        "description": "This beautiful chateau built in 1903 for Alfred F. Pillsbury and his wife, Eleanor, is the perfect setting for a romantic wedding. With it's majestic curved staircase, wainscot wall treatments and large rooms, it forms a memorable backdrop for a wedding. The main fireplace mantel has served as the special place for many happy couples to recite their vows.",
    },
    {

        "address": "6445 Monte Rd, San Luis Obispo, CA 93401",
        "owner_id": 4,
        "title": "Chateau Noland",
        "nightly_rate": 1217,
        "type_id": 2,
        "description": "Chateau Noland is located half way between LA and SF a stone's throw from the world famous Highway 1 and US 101. We are minutes from several beaches, bike trails, world famous wine tasting, and the idyllic downtown San Luis Obispo. The property boasts incredible views of the Avila Valley and the surrounding oak-covered hills. The architecture of the main house (the 'Castle'), Carriage House, and surrounding grounds will make you feel as if you have been transported to France's Loire Valley.",
    },
    {
        "address": "3780 Taylor Mtn Dr, Island Park, ID 83429",
        "owner_id": 1,
        "title": "Pelican Point",
        "nightly_rate": 1428,
        "type_id": 3,
        "description": "Pelican Point Executive Lodge: 35 min scenic drive to Yellowstone. 150 feet of Lake Frontage on a Private Sandy Beach, Gated Community, 7600 sq. ft., Six Bedrooms+office, with Private Bathrooms & King beds, Ample Gathering Areas, Theater Room, a Dream Kitchen with Adjacent Butler's Pantry, Professional Landscaping, Private Dock, Decks, Patio, 4 Fireplaces, Unique Fire Pit, Lake Views from Every Room. Connected is an exquisite suite with kitchenette & bath. As Superhosts, We Ensure a Great Stay.",
    },
    {
        "address": "10922 Corbly Gulch Rd, Belgrade, MT 59714",
        "owner_id": 2,
        "title": "Bozeman Overlook",
        "nightly_rate": 790,
        "type_id": 3,
        "description": "Don’t miss the opportunity to stay at this unique cabin getaway! This private and cozy home books up fast with the unparalleled 360 views and outstanding accommodations on 100 acres featuring premium bedding, extensive new renovations, and comfortable entertainment space. The home is perfect for an intimate getaway or group gathering! Ideal location for access to trails minutes away, 15 mins to the outskirts of Bozeman, and surrounded by local event venues.",
    },
    {
        "address": "3582 White Mountain Hwy, North Conway, NH 03860",
        "owner_id": 3,
        "title": "The 1785 Inn",
        "nightly_rate": 1530,
        "type_id": 4,
        "description": "Exclusive use of the the charming, landmark 'The 1785 Inn' with 12 comfortable guest rooms, 5+ acres, AMAZING views of Mt. Washington, private pool, hot tub, fire pit, cozy Pub, 2 dining rooms, commercial kitchen in one of the best locations. 10 rooms with private bath, 3 living rooms, game room, hiking trials that access a sandy beach on the Saco River. Rare opportunity. RATES can vary depending on your group size, dates & may require Min stay.",
    },
    {
        "address": "70 Foxwood Cir, Mt Kisco, NY 10579",
        "owner_id": 4,
        "title": "Foxwood Historic Home",
        "nightly_rate": 2940,
        "type_id": 4,
        "description": "The house is a beautiful 10 acre home located in Bedford Corners with 8 Bedrooms. It’s perfect for gatherings. Located minutes from downtown Mount Kisco. Pick up any of our provided rackets and play a set of tennis. Take a jump into our pool and cool off on a hot summer day. Enjoy our Eero mesh integrated WiFi system throughout the house with speeds up to 300 Mbps. Featured on a few TV shows, if you are looking for a quiet, secluded place north of New York, you have found your place. NO WEDDINGS",
    },
    {
        "address": "38, Clark Island, MI 49015",
        "owner_id": 1,
        "title": "Nou'veau riche Paradise Island",
        "nightly_rate": 2940,
        "type_id": 5,
        "description": "Take a trip to Paradise Island and feel the fantasy of renting a island right here in Michigan its only Island rental. This will bring memories of a lifetime for your group that will top none of the past rentals. Upon arrival you will can see the special character of this exquisite estate and all it has to offer with fire and water! Rest and relax a getaway for the mind body and soul with options for experiences and getaways with our experience concierge app that gives you options for all!",
    },
    {
        "address": "3, Spruce Island, ME 04681",
        "owner_id": 2,
        "title": "Private Island",
        "nightly_rate": 1080,
        "type_id": 5,
        "description": "Children and infants are counted as adults for determining rate. The rates quoted by this Airbnb system do not include a charge for infants and for numbers of guests above 16. Therefore after reserving this property through Airbnb, guest must pay additional fees for any infants and numbers of guests above 16 ($350 per person per night).",
    },
    {
        "address": "4089 SW Chesapeak Ave, Portland, OR 97239",
        "owner_id": 3,
        "title": "Manor in SW Portland",
        "nightly_rate": 825,
        "type_id": 6,
        "description": "Beautiful Manor with lots of character. Spend your vacation surrounded by the hills of Southwest Portland minutes away from Downtown Portland. Built in 2002, recently Fully remodeled, huge vaulted ceilings. 5 minutes away from downtown Portland. Seven Large Bedrooms w/ 3+full baths. 2 fireplaces, beautiful marble tile work, Hardwood floors, unusual custom finish work. Territorial Portland views, brick exterior, lovely stair case, craftsman finished ceilings, 2 Jacuzzis and a Hot Tub.",
    },
    {
        "address": "451 N Skyview St, Flagstaff, AZ 86004",
        "owner_id": 4,
        "title": "The Northern Arizona Manor",
        "nightly_rate": 1100,
        "type_id": 6,
        "description": "Great Estate The Manor in Northern Arizona, This is a one of a kind property. Great place to relax and enjoy your family.",
    },
    {
        "address": "1804 Ocean Ave, Brigantine, NJ 08203",
        "owner_id": 1,
        "title": "Mediterranean Mansion by the Sea",
        "nightly_rate": 2000,
        "type_id": 7,
        "description": "Location, location, location!! This 6500 SF luxury Mediterranean-style beach mansion is located in the heart of the prestigious 'A-zone' of Brigantine and is literally a few steps from the pristine Brigantine beach. Located on a double lot just 3 homes from the ocean, this huge mansion boasts direct, unobstructed ocean views.",
    },
    {
        "address": "1700 Jumper Rd, Plains, PA 18702",
        "owner_id": 2,
        "title": "Luxury Mansion",
        "nightly_rate": 3829,
        "type_id": 7,
        "description": "This mansion is surrounded by 174 acres of lush green surroundings, giving privacy and space for your special moments. This 1600 sq. ft property features 8 bedrooms and 9.5 bathrooms. This luxury villa can easily accommodate 40 guests, providing enough privacy. The space also has many amenities and facilities that are easily accessible to the guests.",
    },
    {
        "address": "169 Three Oaks Ln, Langley, KY 41645",
        "owner_id": 3,
        "title": "Bluegrass Palace",
        "nightly_rate": 1380,
        "type_id": 8,
        "description": "There is a special place, nestled amidst the rolling hills of Kentucky bluegrass, where 29,000 square feet of unmitigated luxury welcomes you. Where the private gates open to a 9 acre idyllic paradise all your own. Where a splendid southern grandeur unfolds inside four levels of 12 bedroom suites & a ballroom, 2 modern kitchens, 15 spacious bathrooms, a performance stage, a movie theatre & an indoor pool.",
    },
    {
        "address": "7400 Park Rd 4 S, Burnet, TX 78611",
        "owner_id": 4,
        "title": "Bavarian Palace",
        "nightly_rate": 2550,
        "type_id": 8,
        "description": "Falkenstein Palace awaits! Just minutes from several Highland Lakes and conveniently located 45 minutes NW of Austin, TX, resides a ​14,000 square foot Bavarian inspired castle where you can be a King or a Queen for the night. Whether it's the majestic scenic view of 3 counties from the balcony, the oversized living areas, or the 113 acres of State Park worthy hiking on site.",
    },
    {
        "address": "42 Wilderness Dr, Newry, ME 04261",
        "owner_id": 1,
        "title": "The Glen Villa",
        "nightly_rate": 1402,
        "type_id": 9,
        "description": "The Glen Villa at Sunday River is the ultimate Luxury Estate. Sleeps 26 in 9 Bedrooms! Endless amenities & entertainment options include a Movie Theater, Pool, Arcade, Sauna, Spa, 3 Kitchens, 4 Bars, Rec Room w/ Basketball, Ping Pong, Pinball, Air Hockey, Shuffleboard, Sauna, Billiards Room, 2 Hot Tubs, 2 Steam Rooms, Volleyball, Treehouse playground,",
    },
    {
        "address": "5269 N River Rd, Paso Robles, CA 93446",
        "owner_id": 2,
        "title": "Spanish Villa",
        "nightly_rate": 1300,
        "type_id": 9,
        "description": "Luxury awaits you at this brand new custom home in the heart of wine country. This home is extremely custom and was featured on the cover of Home Design Central Coast. The open floor plan is exceptional for entertaining with a large great room which features beams from the mid 1800s as well as a large kitchen and bar area. ",
    },
    {
        "address": "38039 Dawson Gap Ln, Purcellville, VA 20132",
        "owner_id": 3,
        "title": "Private Wine Country Mansion",
        "nightly_rate": 1371,
        "type_id": 10,
        "description": "This house offers so much space for your family and friends to enjoy. The best news is its affordable to all. Great for a special get away for a romantic weekend with the 1200s/f master bedroom which includes a gym w/TV and shower. From the second you step in the stunning grand foyer you will appreciate the quality of this amazing all white brick 10,000 home.",
    },
    {
        "address": "2260 Spring Mountain Rd, St Helena, CA 94574",
        "owner_id": 4,
        "title": "St. Helena House",
        "nightly_rate": 1493,
        "type_id": 10,
        "description": "This delightful 125-year-old farmhouse, overlooking a vineyard, sits on two acres. Recently renovated, the house is 3,000 square feet and can comfortably sleep 6-8 people in three spacious bedrooms. Two bedrooms are furnished with queen beds and the third with a king and a view of the vineyards.",
    }


]

def seed_estates():
    seeder = [Estate.seed(estate) for estate in estates]
    db.session.add_all(seeder)
    db.session.commit()

def undo_estates():
    db.session.execute('TRUNCATE estates RESTART IDENTITY CASCADE;')
    db.session.commit()
