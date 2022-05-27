from ..config import Config
from geopy.geocoders import GoogleV3

API_KEY = Config.GOOGLE_MAPS_API_KEY
geo_service = GoogleV3(api_key=API_KEY)

city_types = ['locality', 'political']
neighbourhood_types = ['neighborhood', 'political']
county_types = ['administrative_area_level_2', 'political']
state_types = ['administrative_area_level_1', 'political']
country_types =  ['country', 'political']
postal_code_types = ['postal_code']

## Wrapper class for location data, you can build one but you probably
## actually want to use either EstateLocationData.from_string,
## EstateLocationData.from_structured or EstateLocationData.reverse
class EstateLocationData():
    def __init__(
        self,
        lat=None,
        lon=None,
        address=None,
        city=None,
        state=None,
        country=None,
        postal_code=None,
    ):
        self.latitude = lat
        self.longitude = lon
        self.address = address
        self.city= city
        self.state = state
        self.country = country
        self.postal_code = postal_code

    @staticmethod
    def parse_raw(data):
        rawgoogledata = data.get("address_components");
        print(rawgoogledata)
        city = [comp.get("long_name") for comp in rawgoogledata if comp.get("types") == city_types]
        if not city:
            city = [comp.get("long_name") for comp in rawgoogledata if comp.get("types") == neighbourhood_types]
        if not city:
            city = [comp.get("long_name") for comp in rawgoogledata if comp.get("types") == county_types]
        if not city:
            raise ValueError("Something is wrong with the location returned: couldn't extract city");
        state = [comp.get("long_name") for comp in rawgoogledata if comp.get("types") == state_types]
        country = [comp.get("long_name") for comp in rawgoogledata if comp.get("types") == country_types]
        code = [comp.get("long_name") for comp in rawgoogledata if comp.get("types") == postal_code_types]
        return {
            "city": city.pop(),
            "state": state.pop(),
            "country": country.pop(),
            "postal_code": code.pop(),
        }

    @staticmethod
    def build(geocoder_results):
        data = EstateLocationData.parse_raw(geocoder_results.raw)
        return EstateLocationData(
            lat=geocoder_results.latitude,
            lon=geocoder_results.longitude,
            address=geocoder_results.address,
            city=data.get("city", None),
            state=data.get("state", None),
            country=data.get("country", None),
            postal_code=data.get("postal_code", None)
    )

    @staticmethod
    def from_string(blob):
        results = geo_service.geocode(blob, exactly_one=True)
        return EstateLocationData.build(results)

    @staticmethod
    def from_structured(dct):
        query = f"{dct.get('houseNumber')} {dct.get('street')} {dct.get('city')} {dct.get('state')} {dct.get('postalCode')} {dct.get('country')}"
        results =  geo_service.geocode(query, exactly_one=True)
        data = EstateLocationData.parse_raw(results.raw)
        return EstateLocationData.build(results)

    @staticmethod
    def reverse(lat, lon):
        results =  geo_service.reverse((lat, lon), exactly_one=True)
        data = EstateLocationData.parse_raw(results.raw)
        return EstateLocationData.build(results)


# test_str = "20 W 34th St New York 10001"
# test2_str = "350 fifth avenue new york city"
# test2_dict = {"houseNumber": "20", "street": "W 34th St", "city": "new york city", "postalCode": "10001"}
# test3_lat = 37.755205
# test3_lon = -122.451298

# test = EstateLocationData.from_string(test_str)
# print(test.__dict__)

# test = EstateLocationData.from_string(test2_str)
# print(test.__dict__)

# test = EstateLocationData.from_structured(test2_dict)
# print(test.__dict__)

# test = EstateLocationData.reverse(test3_lat, test3_lon)
# print(test.__dict__)

# test = EstateLocationData.reverse(35.7099552,139.8104001)
# print(test.__dict__)
