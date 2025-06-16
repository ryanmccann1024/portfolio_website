// src/data/posts.js
export const posts = [
    {
        slug: "reinforcement-learning-optical-networks",
        title: "How Reinforcement Learning Can Reroute an Optical Backbone in 50 ms",
        date: "2025-05-30",
        author: "Ryan McCann",
        topics: ["Deep Learning", "Optical Networks"],
        cover: "/assets/blog/rl-optical-cover.jpg",
        summary:
            "Deep-RL isn’t just for Atari. Here’s how I cut blocking probability by 35 % on a 64-node elastic optical backbone—without adding new hardware.",
        /* ------------------------------------------------------------------ */
        /*  Everything below renders inside <article dangerouslySetInnerHTML>  */
        /* ------------------------------------------------------------------ */
        content: /* html */ `
<h2 id="why-bother">Why bother?</h2>
<p>
  Telecom backbones still rely on <em>static</em> shortest-path algorithms. They’re fast,
  but when a link fails, thousands of light-paths have to shuffle—often taking
  minutes and dropping packets along the way.  
  <strong>Goal:</strong> re-route in &lt; 50 ms while keeping spectrum fragmentation low.
</p>

<h2 id="system-overview">System overview</h2>
<img
  src="/assets/blog/rl-optical-architecture.jpg"
  alt="RL agent monitors an SDN controller and updates the spectrum allocation table"
  style="margin:2rem auto; display:block; border-radius:0.75rem; box-shadow:0 6px 18px rgba(0,0,0,.15); max-width:100%;"
/>
<p>
  Everything runs on an <abbr title="Software-Defined Networking">SDN</abbr> controller:
</p>
<ul>
  <li><strong>State \(s_t\):</strong> 64×64 adjacency + current spectrum occupancy (≈ 8 k dims)</li>
  <li><strong>Action \(a_t\):</strong> assign a contiguous slice <code>(f, Δf)</code> on a path</li>
  <li><strong>Reward \(r_t\):</strong> <code>+1</code> for accepted demand, <code>−1</code> for block, <code>−λ</code> for fragmentation</li>
</ul>

<h3 id="model">Model</h3>
<pre><code class="language-python">
class ActorCritic(nn.Module):
    def __init__(self, n_fibres, n_nodes):
        super().__init__()
        self.encoder = GCN(in_dim=n_fibres, hidden=128, layers=3)
        self.policy  = nn.Linear(128, n_nodes ** 2 * 32)  # path × slot
        self.value   = nn.Linear(128, 1)

    def forward(self, x):
        z = self.encoder(x)
        return self.policy(z), self.value(z)
</code></pre>
<p class="text-sm text-gray-500 dark:text-gray-400">
  (Full PyTorch code &amp; training script in the repo.)
</p>

<h2 id="results">Results</h2>
<table>
  <thead>
    <tr><th>Metric</th><th>Dijkstra&nbsp;+&nbsp;First-Fit</th><th>Our RL agent</th></tr>
  </thead>
  <tbody>
    <tr><td>Blocking probability&nbsp;↓</td><td>7.8 %</td><td><strong>5.1 %</strong></td></tr>
    <tr><td>Avg search time&nbsp;↓</td><td>4.3 ms</td><td><strong>0.9 ms</strong></td></tr>
    <tr><td>Spectral utilisation&nbsp;↑</td><td>64 %</td><td><strong>71 %</strong></td></tr>
  </tbody>
</table>

<h2 id="deployment-notes">Deployment notes</h2>
<ol>
  <li>The model is a 1.2 MB ONNX—tiny enough for embedded NPU cores.</li>
  <li>Inference served over gRPC; 99-th latency = 1.7 ms on an i7-1260P.</li>
  <li>We keep a bounded replay buffer of the latest 5 000 demands and fine-tune nightly.</li>
</ol>

<blockquote>
  <p><strong>Tip:</strong> Always leave a classical heuristic fallback—you will miss an edge-case at 3 a.m.</p>
</blockquote>

<h2 id="next-steps">Next steps</h2>
<p>
  The obvious path is multi-agent RL so routers co-ordinate instead of relying on a
  central brain. Expecting a 10–15 % extra gain from local traffic heuristics.
</p>

<hr/>

<p class="text-center text-sm text-gray-500 dark:text-gray-400">
  Code &amp; data: <a href="https://github.com/ryanmccann1024/rl-optical" target="_blank">github.com/ryanmccann1024/rl-optical</a>
</p>
`,
    },
    {
        slug: "stub-fpga-toolchain",
        title: "📌 Stub: Automating My FPGA Toolchain (coming soon)",
        date: "2025-06-30",
        author: "Ryan McCann",
        topics: ["FPGA", "Dev-Ops"],
        cover: "/assets/blog/stub.jpg",        // add a placeholder image if you like
        summary: "Work-in-progress notes on scripting Vivado & ModelSim.",
        content: "<p>Draft post placeholder. Stay tuned!</p>",
    },
    {
        slug: "stub-phd-timeblocking",
        title: "📌 Stub: Time-blocking a PhD Semester (coming soon)",
        date: "2025-07-15",
        author: "Ryan McCann",
        topics: ["Productivity"],
        cover: "/assets/blog/stub.jpg",
        summary: "Experiments with 10-minute granularity and Feynman hourglasses.",
        content: "<p>Draft post placeholder. Stay tuned!</p>",
    },
];
