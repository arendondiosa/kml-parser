from flask import Flask, render_template, redirect, url_for, request, jsonify

from app.api.controller.geo_data import kml_to_geojson

app = Flask(__name__)


@app.route("/")
def index():
    return {"ok": True, "data": "Hello World"}


@app.route("/kml", methods=["POST"])
def kml_parser():
    file = request.files["kml-file"]

    kml_to_json_result = kml_to_geojson(file)

    if kml_to_json_result:
        return {"ok": True, "data": kml_to_json_result}
    return {"ok": False}


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3001, debug=True)
