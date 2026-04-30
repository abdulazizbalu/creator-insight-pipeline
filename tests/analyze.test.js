const test = require("node:test");
const assert = require("node:assert/strict");
const { analyzePosts, engagementRate } = require("../src/analyze");

test("engagementRate combines saves and shares", () => {
  assert.equal(engagementRate({ views: 1000, saves: 50, shares: 25 }), 7.5);
});

test("analyzePosts returns a recommendation", () => {
  const result = analyzePosts([
    { title: "A", topic: "ai", views: 1000, saves: 100, shares: 20 },
    { title: "B", topic: "media", views: 2000, saves: 20, shares: 10 }
  ]);

  assert.equal(result.totalViews, 3000);
  assert.match(result.recommendation, /ai/);
});

