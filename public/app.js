const posts = [
  { title: "AI workflows for students", topic: "ai productivity", views: 12500, saves: 730, shares: 180 },
  { title: "Prompt engineering mistakes", topic: "prompting", views: 18100, saves: 1400, shares: 420 },
  { title: "Behind the scenes setup", topic: "creator stack", views: 5900, saves: 210, shares: 60 }
];

function engagement(post) {
  return Number((((post.saves + post.shares) / post.views) * 100).toFixed(2));
}

const enriched = posts.map((post) => ({ ...post, engagement: engagement(post) }));
const top = [...enriched].sort((a, b) => b.engagement - a.engagement)[0];
const totalViews = enriched.reduce((sum, post) => sum + post.views, 0);

document.querySelector("#insight").innerHTML = `
  <article>
    <span>Total views</span>
    <strong>${totalViews.toLocaleString()}</strong>
  </article>
  <article>
    <span>Best signal</span>
    <strong>${top.topic}</strong>
  </article>
  <article>
    <span>Recommendation</span>
    <strong>Double down on ${top.topic}</strong>
  </article>
`;

document.querySelector("#chart").innerHTML = enriched.map((post) => `
  <article>
    <div>
      <strong>${post.title}</strong>
      <span>${post.topic} / ${post.engagement}% engagement</span>
    </div>
    <div class="bar"><i style="width:${Math.min(post.engagement * 8, 100)}%"></i></div>
  </article>
`).join("");
