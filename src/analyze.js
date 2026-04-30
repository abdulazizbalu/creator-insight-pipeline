const SAMPLE_POSTS = [
  { title: "AI workflows for students", topic: "ai productivity", views: 12500, saves: 730, shares: 180 },
  { title: "Prompt engineering mistakes", topic: "prompting", views: 18100, saves: 1400, shares: 420 },
  { title: "Behind the scenes setup", topic: "creator stack", views: 5900, saves: 210, shares: 60 }
];

function engagementRate(post) {
  const views = Math.max(Number(post.views || 0), 1);
  const engagements = Number(post.saves || 0) + Number(post.shares || 0);
  return Number(((engagements / views) * 100).toFixed(2));
}

function analyzePosts(posts) {
  const enriched = posts.map((post) => ({
    ...post,
    engagementRate: engagementRate(post)
  }));

  const topPost = [...enriched].sort((a, b) => b.engagementRate - a.engagementRate)[0];
  const topicScores = enriched.reduce((acc, post) => {
    acc[post.topic] = (acc[post.topic] || 0) + post.engagementRate;
    return acc;
  }, {});

  const bestTopic = Object.entries(topicScores).sort((a, b) => b[1] - a[1])[0]?.[0] || "unknown";

  return {
    totalViews: enriched.reduce((sum, post) => sum + Number(post.views || 0), 0),
    averageEngagementRate: Number((enriched.reduce((sum, post) => sum + post.engagementRate, 0) / enriched.length).toFixed(2)),
    topPost,
    recommendation: `Double down on ${bestTopic}; it has the strongest save/share signal.`
  };
}

if (require.main === module) {
  console.log(JSON.stringify(analyzePosts(SAMPLE_POSTS), null, 2));
}

module.exports = { engagementRate, analyzePosts };

