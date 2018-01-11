from algo import *

def test_getGeocode():
    print('lat long of 100 broadway, new york, ny:')
    print(getGeocode('100 broadway, new york, ny'))

def test_getDistanceMatrix():

    places = [(40.7080457, -74.01123989999999), '120 E 59th St, New York, NY', '1654 E 50th St, Brooklyn, NY']
    print(getDistanceMatrix(places, 'driving'))


def test_getDistancesOriginsToDestinations():
    origs = ['san diego zoo', 'san diego city college', 'maritime museum of san diego']
    dests = ['san diego international airport']

    print(getDistancesOriginsToDestinations(origs, dests, 'driving'))

def test_getCenter():

    places = ['san diego zoo', 'san diego city college', 'maritime museum of san diego', 'naval base san diego', 'san diego petco park']

    coords = [getGeocode(x) for x in places]

    print(coords)

    print('Center:')

    center = getCenter(coords)

    print(center)

    print(getDistancesOriginsToDestinations(places, [center], 'walking'))

    print('MinMax distance point:')

    minmax = getMinMaxDistance(coords)

    print(minmax)

    print(getDistancesOriginsToDestinations(places, [minmax], 'walking'))



def test_getMinMaxDistance():

    places = ['san diego zoo', 'san diego city college', 'maritime museum of san diego']

    coords = [getGeocode(x) for x in places]

    mm = getMinMaxDistance(coords)

    print(mm)


def test_geocodeToAddress():
    addr = geocodeToAddress((32.74116, -117.11))

    print(addr)

def test_getCarPoolPlan():

    orig_places = ['112 broadway, san diego, ca', '120 broadway, san diego, ca', '140 broadway, san diego, ca', '150 broadway, san diego, ca']
    orig_places += ['2900 boston ave, san diego, ca', '2926 main st, san diego,ca', '1254 S 28th st, san diego, ca']

    orig_coords = [getGeocode(x) for x in orig_places]

    dest_coord = getGeocode('Cottonwood Canyon Healthcare Center')

    res = getCarPoolPlan(orig_coords,dest_coord)

    print(res)

# test_getGeocode()

# test_getDistanceMatrix()

# test_getDistancesOriginsToDestinations()

# test_getCenter()

# test_getCenter()
# test_getCarPoolPlan()

# test_geocodeToAddress()
