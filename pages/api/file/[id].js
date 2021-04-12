import nc from "next-connect";
import cors from "cors";
import fs from "fs";
import path from "path";

import { kml } from "@tmcw/togeojson";
import { DOMParser } from "xmldom";

const handler = nc()
  .use(cors())
  .get(async (req, res) => {
    try {
      const dirRelativeToPublicFolder = "files";
      const filename = req.query.id;

      const dir = path.resolve("./public", dirRelativeToPublicFolder);
      const filenames = fs.readdirSync(dir);

      if (filenames.includes(filename)) {
        const fileRoute = path.join("/", dirRelativeToPublicFolder, filename);

        const kmlFile = new DOMParser().parseFromString(
          fs.readFileSync('./public' + fileRoute, "utf8")
        );

        const geoJsonGenerated = kml.kml(kmlFile)

        console.log(geoJsonGenerated);
      
        res.status(200).json({ files: fileRoute });
      } else {
        res.status(404).json({});
      }
    } catch (e) {
      res.status(500).json({});
    }
  });

export default handler;
