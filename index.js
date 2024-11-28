/**
 * Copyright 2017 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Search developers.google.com/web for articles tagged
 * "Headless Chrome" and scrape results from the results page.
 */

"use strict";
const puppeteer = require("puppeteer");
(async () => {
  try {
    const browser = await puppeteer.launch({
      defaultViewport: null,
      ignoreHTTPSErrors: true,
      slowMo: 100,
      headless: false,
      // devtools: true
    });

    const [page] = await browser.pages();
    const sessionId =
      // `3abd347c205f9f68e1b1392a0f74e187`
      // `67d605fd9bbf315494f786f9f5bc2581`
      "a31e16de73eeb36b0adc024fec1899a9";

    await page.setCookie({
      name: `sessionid`,
      value: sessionId,
      domain: ".tiktok.com",
      path: "/",
      expires: -1,
      size: sessionId.length,
      httpOnly: false,
      secure: true,
      session: false,
      sameSite: "None",
      sameParty: false,
      sourceScheme: "Secure",
      sourcePort: 443,
    });
    await page.goto(
      `https://www.tiktok.com/creator#/upload?scene=creator_center`
    );

    const file_input = `[type="file"]`;
    await page.waitForSelector(file_input);
    const fileInput = await page.$(file_input);
    await fileInput.uploadFile(`video4.mov`);

    const post_button = `#root > div > div > div > div.jsx-275507257.container-v2.form-panel.flow-opt-v1 > div > div.jsx-2090025323.form-v2.flow-opt-v1.reverse > div.jsx-2090025323.button-group > button.TUXButton.TUXButton--default.TUXButton--large.TUXButton--primary`;
    await delay(5000);
    for (let i = 0; i < 10; i++) {
      await delay(1000);
      await click(page, post_button);
    }
    // await browser.close()
  } catch (e) {
    console.error(e);
  }
})();

const click = async function (page, selector) {
  await page.waitForSelector(selector);
  console.log("found", selector);
  await page.hover(selector);
  console.log("hovered", selector);
  await page.$eval(selector, (btn) => {
    btn.scrollIntoView();
  });
  await page.click(selector);
};

const type = async function (page, selector, letters) {
  await page.waitForSelector(selector);
  await page.hover(selector);
  await page.focus(selector);
  await page.keyboard.type(letters);
};

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
const random = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
