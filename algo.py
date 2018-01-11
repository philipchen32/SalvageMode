import requests
import json
import numpy as np
from scipy.optimize import basinhopping
from sklearn.cluster import KMeans
import ortools


headers = {
    'cache-control': "no-cache"
}

def getGeocode(place_name):
    url = "https://maps.googleapis.com/maps/api/geocode/json"

    querystring = {"address":place_name,"key":"AIzaSyANLmKeBWKNKaU2AlmICIgAcYXZD3rkOoI"}

    response = requests.request("GET", url, headers=headers, params=querystring)

    # results = json.loads(response.text)['results']

    res = json.loads(response.text)['results']

    if len(res)==0:
        return None
    else:
        loc= res[0]['geometry']['location']
        return (loc['lat'], loc['lng'])


def geocodeToAddress(geocode_tuple):
    url = "https://maps.googleapis.com/maps/api/geocode/json"

    querystring = {"latlng": placesToParameterStr([geocode_tuple]), "key": "AIzaSyANLmKeBWKNKaU2AlmICIgAcYXZD3rkOoI"}

    response = requests.request("GET", url, headers=headers, params=querystring)

    res = json.loads(response.text)

    if len(res['results'])==0:
        return None
    else:
        return res['results'][0]['formatted_address']


def placesToParameterStr(places):
    place_str = ''

    for place in places:
        if isinstance(place, tuple):
            place_str += repr(place)[1:-1]
        else:
            assert isinstance(place, str)
            place_str += place
        place_str+='|'

    place_str = place_str[:-1]

    return place_str


def getDistanceMatrix(places, mode='walking'):
    assert len(places)>0

    url = "https://maps.googleapis.com/maps/api/distancematrix/json"

    # convert places to query string format
    place_str = placesToParameterStr(places)

    querystring = {"origins":place_str, "destinations": place_str, 'mode':mode,
                   "key": "AIzaSyBF5USpbnp49vKoLIcO6o3FPi3LLMgr3UU"}

    response = requests.request("GET", url, headers=headers, params=querystring)

    result = json.loads(response.text)

    rows= result['rows']

    distances = np.zeros((len(places),len(places)))
    durations = np.zeros((len(places),len(places)))

    assert len(rows)==len(places)

    for i in range(0,len(rows)):
        for j in range(0, len(rows[i]['elements'])):
            distances[i,j]=rows[i]['elements'][j]['distance']['value']

    for i in range(0,len(rows)):
        for j in range(0, len(rows[i]['elements'])):
            durations[i,j]=rows[i]['elements'][j]['duration']['value']

    return distances, durations


def getDistancesOriginsToDestinations(origins, destinations, mode='walking'):

    origs_str = placesToParameterStr(origins)
    dests_str = placesToParameterStr(destinations)

    url = "https://maps.googleapis.com/maps/api/distancematrix/json"

    querystring = {"origins":origs_str, "destinations": dests_str, 'mode':mode,
                   "key": "AIzaSyBF5USpbnp49vKoLIcO6o3FPi3LLMgr3UU"}
    response = requests.request("GET", url, headers=headers, params=querystring)

    result = json.loads(response.text)

    rows = result['rows']

    assert len(rows) == len(origins)

    distances = np.zeros((len(origins), len(destinations)))
    durations = np.zeros((len(origins), len(destinations)))

    for i in range(0,len(rows)):
        for j in range(0, len(rows[i]['elements'])):
            distances[i,j]=rows[i]['elements'][j]['distance']['value']

    for i in range(0,len(rows)):
        for j in range(0, len(rows[i]['elements'])):
            durations[i,j]=rows[i]['elements'][j]['duration']['value']

    return distances, durations


def getCenter(coordinates):

    assert len(coordinates) > 0

    return tuple(np.sum(coordinates, axis=0)/len(coordinates))


def getMinMaxDistance(coordinates):
    assert len(coordinates) > 0

    # coordinates = np.array(coordinates)

    # print(coordinates)

    maxdist = lambda x:max(sum((x-c)**2) for c in coordinates)

    b0l = min(c[0] for c in coordinates)
    b0u = max(c[0] for c in coordinates)
    b1l = min(c[1] for c in coordinates)
    b1u = max(c[1] for c in coordinates)

    bounds = [(b0l, b0u),(b1l,b1u)]

    res = basinhopping(maxdist, np.sum(coordinates, axis=0)/len(coordinates))

    # print (maxdist(res.x))

    return tuple(res.x)


def getMultiPointRoute(orig_coord, pickup_coords, dest_coord):

    url = "https://maps.googleapis.com/maps/api/directions/json"

    querystring = {"origin": placesToParameterStr([orig_coord]), "destination": placesToParameterStr([dest_coord]),
                   "key": "AIzaSyB6yIk20GMPAQybt5Ji6oNocwndG2WFkTo",
                   "waypoints": "optimize:true|"+placesToParameterStr(pickup_coords)}

    response = requests.request("GET", url, headers=headers, params=querystring)

    res = json.loads(response.text)

    return res


def getCarPoolPlan(orig_coords, dest_coord, walktimelimit=600, speeds=None):

    # returning data structure:
    # (1) gather points
    # (2) gather point for each origin
    # (3) walking distance for each origin
    # (4) walking time for each origin
    # (5) total estimated travel time

    n_clusters = 1

    while(True):

        km=KMeans(n_clusters=n_clusters).fit(orig_coords)
        labels = km.labels_

        clusters = [[i for i in range(0, len(orig_coords)) if labels[i]==j] for j in range(0,n_clusters)]

        # now compute gather point
        gatherpoints = [getMinMaxDistance([orig_coords[j] for j in clusters[i]]) for i in range(0, n_clusters)]

        walkdistances, walkdurations = getDistancesOriginsToDestinations(orig_coords, gatherpoints, 'walking')

        # only pick up the distances for their own cluster

        walkdistances = [walkdistances[i, labels[i]] for i in range(0,len(orig_coords))]
        walkdurations = [walkdurations[i, labels[i]] for i in range(0,len(orig_coords))]


        if any(wd>walktimelimit for wd in walkdurations):
            n_clusters +=1
        else:
            break

    # use the multi-point planning API to plan a car trip
    # use the cluster center most faraway from destination as beginning point

    begin_point = max(gatherpoints, key=lambda x:np.sum((np.array(x)-np.array(dest_coord))**2))

    car_route = getMultiPointRoute(begin_point, gatherpoints, dest_coord)

    return gatherpoints, labels, walkdistances, walkdurations, car_route


