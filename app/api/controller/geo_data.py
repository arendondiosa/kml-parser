import json
import kml2geojson
import os


def kml_to_geojson(kml_file):

    try:
        filename = "some_test"
        kml_file.save("/tmp/{}.kml".format(filename))

        kml2geojson.main.convert("/tmp/{}.kml".format(filename), "/tmp/")

        with open("/tmp/{}.geojson".format(filename), "r") as file:
            kml_to_json = file.read().replace("\n", "")
            kml_to_json = json.loads(kml_to_json)

        os.remove("/tmp/{}.kml".format(filename))
        os.remove("/tmp/{}.geojson".format(filename))
    except:
        kml_to_json = {}

    return kml_to_json
