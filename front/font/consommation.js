const { Builder, By, until } = require("selenium-webdriver");

(async function runTest() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("http://127.0.0.1:5500/front/gestionenergieUI/index.html");

    // 2. Click button
    const button = await driver.findElement(By.tagName("button"));
    await button.click();

    // 3. Wait for result div
    const resultDiv = await driver.wait(
      until.elementLocated(By.id("result")),
      10000
    );

    // 4. Wait until API finishes loading
    await driver.wait(async () => {
      const text = await resultDiv.getText();
      return text.includes("Consommation") || text.includes("Eau");
    }, 15000);

    // 5. Get final result
    const finalText = await resultDiv.getText();

    console.log("=== RESULT ===");
    console.log(finalText);

    // 6. Simple assertions (manual)
    if (finalText.includes("Aucune donnée")) {
      throw new Error("Test FAILED: data not loaded");
    }

    if (!finalText.includes("Eau") || !finalText.includes("Électricité")) {
      throw new Error("Test FAILED: missing values");
    }

    console.log("✅ TEST PASSED");

  } catch (err) {
    console.error("❌ TEST FAILED");
    console.error(err);
  } finally {
    await driver.quit();
  }
})();