import express from "express";
import morgan from "morgan";
import got from "got";
import { htmlToText } from "html-to-text";

import { techs, jobTitles } from "./mock";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("short"));

app.get('/', (req, res) => {
  res.send('Hello there! 🥩🍔')
})

app.post("/skill", async (req, res) => {
  const titleTagRegexp = /<title[^>]*>(.*)<\/title>/;

  const html = await got(req.body.url, { resolveBodyOnly: true });
  const text = htmlToText(html, {
    wordwrap: 130,
  }).toLowerCase();

  const matchedTech = [];
  const matchedJobTitle = [];

  for (const tech of techs) {
    if (text.indexOf(tech.toLowerCase()) !== -1) {
      matchedTech.push(tech);
    }
  }

  const matched = html.match(titleTagRegexp);
  let jobTitleFromSite = "";

  for (const jobTitle of jobTitles) {
    if (
      matched &&
      matched[1].toLowerCase().indexOf(jobTitle.toLowerCase()) !== -1
    ) {
      jobTitleFromSite = jobTitle;
    }

    if (text.indexOf(jobTitle.toLowerCase()) !== -1) {
      matchedJobTitle.push(jobTitle);
    }
  }

  res.status(200).json({
    matched: {
      tech: matchedTech,
      job: matchedJobTitle,
      title: jobTitleFromSite,
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT} 🍕🍕`);
});
