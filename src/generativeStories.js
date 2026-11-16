import feature from './openai-feature.json';

// Origin, motivation, metrics, and agent workflow supplied by Kasturi on November 12, 2026.
// Implementation narratives also draw on LoadersBento.jsx and ChartsBento.jsx.
// Metrics are owner-reported; installs are not a count of unique people.
export const generativeStories = {
  "loaders": {
    "title": "Generative Loaders",
    "intro": "Bringing more play to AI interfaces through an open-source library of text, activity, and image loaders.",
    "details": [
      [
        "Role",
        "Design & engineering"
      ],
      [
        "Project",
        "Independent"
      ],
      [
        "Built with",
        "React & Codex"
      ],
      [
        "Distribution",
        "Open source · npm"
      ]
    ],
    "website": "https://generativeloaders.com",
    "repo": "https://github.com/kasturikhanke/generative-loaders",
    "video": "/previews/loaders-film.mp4",
    "poster": "/previews/loaders-film.jpg",
    "context": "I kept seeing AI tools use the same loading patterns everywhere. I wanted to encourage people to be more creative and bring more play into their work. Loading felt like a small but overlooked opportunity: even a moment of waiting could have some personality.",
    "sections": [
      {
        "id": "play",
        "title": "Make room for play",
        "paragraphs": [
          "I explored ideas drawn from games, including Pac-Man-inspired movement and snakes. These were small experiments in making a familiar waiting state feel more expressive. The goal was to give designers and developers more starting points for their own products.",
          "The work grew from Progress Narrative, an early prototype for showing what an agent was doing, into a set of components for different moments of waiting. Text, activity, and images each gave me a different way to explore that idea."
        ]
      },
      {
        "id": "streaming",
        "title": "Streaming text",
        "paragraphs": [
          "I wanted words to arrive with personality without interrupting reading. I kept the existing response still and animated only the newly arriving text.",
          "Developers can switch between effects while keeping the same streaming behavior. The design decision is how new words appear, not whether earlier text stays readable."
        ],
        "loaderDemo": "text"
      },
      {
        "id": "activity",
        "title": "Inline activity",
        "paragraphs": [
          "I made compact loaders for moments when no response is ready yet. They fit beside a status message or inside a button, adding character without replacing the explanation of what is happening.",
          "They share controls for speed, color, and pausing with the text effects, while serving a different part of the wait."
        ],
        "loaderDemo": "activity"
      },
      {
        "id": "completion",
        "title": "Image completion",
        "paragraphs": [
          "I chose a few image-loading experiments to develop into a starting collection people could adapt. Each needed to work both during the wait and when the image was ready.",
          "I refined the timing and movement of the reveals. For Shutter, that meant aligning moving panels with the finished image. The gallery simulates completion so the whole interaction can be replayed."
        ],
        "loaderDemo": "image"
      },
      {
        "id": "shipping",
        "title": "Try it out",
        "paragraphs": [
          "Send the example prompt to see the loaders in a conversation. Draft an email, then generate an image to try the text, activity, and image effects together."
        ],
        "loaderDemo": "chat"
      }
    ],
    "outcome": "The library is now used beyond my own experiments. Open-sourcing it made the work available to anyone who wants to bring more play into an interface. OpenAI Developers also featured the story of building Generative Loaders with Codex.",
    "feature": {
      "href": feature.post,
      "label": "Watch the OpenAI Developers feature"
    },
    "metrics": [
      [
        "190k+",
        "Installs"
      ],
      [
        "60,000",
        "Monthly active users"
      ]
    ]
  },
  "charts": {
    "title": "Generative Charts",
    "intro": "Three visual identities for charts, built into an open-source React library and maintained with a four-agent Codex workflow.",
    "details": [
      [
        "Role",
        "Design & engineering"
      ],
      [
        "Project",
        "Independent"
      ],
      [
        "Launch",
        "September 2026"
      ],
      [
        "Distribution",
        "Open source · npm"
      ]
    ],
    "website": "https://generativecharts.com",
    "repo": "https://github.com/kasturikhanke/generativecharts",
    "video": "/previews/charts-film.mp4",
    "poster": "/previews/charts-film.jpg",
    "context": "I was tired of seeing plain, repetitive charts on my timeline. Shadcn was the alternative I kept coming across, but I wanted to explore other directions. Brands put care into how their websites look and feel; I wanted charts to have that same range of expression.",
    "sections": [
      {
        "id": "themes",
        "title": "Three visual identities",
        "paragraphs": [
          "I developed three visual identities so developers could choose a direction that fits their product’s character. Each needed a consistent approach to line, weight, surface, and color across the library.",
          "The challenge was to carry those identities into charts. When the experiments first became components, they began to look too similar. I worked back through the marks, labels, outlines, and surfaces so the distinction would survive across different chart types."
        ],
        "themes": [
          {
            "id": "mono-editorial",
            "name": "Mono Editorial",
            "description": "Black and white. Simple lines and deliberate weights let structure and typography carry the identity."
          },
          {
            "id": "airform",
            "name": "Airform",
            "description": "Inspired by the expressive branding of Gen Z websites: a softer, more dimensional direction translated into data."
          },
          {
            "id": "neon-instruments",
            "name": "Neon Instruments",
            "description": "Clean structure with a controlled use of color. A precise, vivid direction that keeps the chart easy to read."
          }
        ]
      },
      {
        "id": "restraint",
        "title": "Visual hierarchy",
        "paragraphs": [
          "Mono Editorial relies on line weight, patterns, and label placement to separate data without color.",
          "I removed extra borders and backgrounds from the gallery, preview, and chart layers. The chart and its labels should establish the hierarchy without competing frames."
        ],
        "alt": "Animated bar chart in Mono Editorial",
        "caption": "Mono Editorial bar chart from the product gallery.",
        "video": "/previews/case-studies/charts-mono.mp4",
        "videoWidth": 1818,
        "videoHeight": 1680,
        "poster": "/previews/case-studies/charts-mono.jpg"
      },
      {
        "id": "defaults",
        "title": "Useful defaults",
        "paragraphs": [
          "I wanted developers to add data and get a usable chart without adjusting every margin, label, or color.",
          "I built in related-value tooltips, keyboard and touch support, and responsive label spacing. The choices developers make can stay focused on the chart type and visual theme."
        ],
        "alt": "A line chart animating in Neon Instruments",
        "caption": "A line chart from the product gallery; data is illustrative.",
        "video": "/previews/case-studies/charts-lines.mp4",
        "videoWidth": 1818,
        "videoHeight": 1680,
        "poster": "/previews/case-studies/charts-lines.jpg"
      },
      {
        "id": "missing-data",
        "title": "Missing data",
        "paragraphs": [
          "The first version treated missing measurements as zero. That could make a line drop even when there was no measurement to support it. I changed the default to leave a gap and made filling it with zero an explicit option.",
          "A measured zero and an absent measurement tell different stories. Preserving that distinction became part of the component’s behavior, so an attractive chart would not quietly introduce a misleading claim."
        ],
        "missingData": true
      },
      {
        "id": "shipping",
        "title": "Shipping the system",
        "paragraphs": [
          "I designed, built, and launched Generative Charts independently in September 2026. I published the React package alongside a gallery for trying the charts and documentation for using them in other projects.",
          "Release work included browser, unit, and installation checks with React 18 and 19, alongside reviews across themes, light and dark modes, and screen sizes. That extended the work from visual exploration into the behavior and integration details a reusable library needs."
        ]
      },
      {
        "id": "agents",
        "title": "Ongoing research",
        "paragraphs": [
          "I set up four agents so I would not have to restart the research and maintenance work every day. Each morning, I get a survey of chart types the library is missing and which ones could be implemented next.",
          "Codex handles the ongoing research and maintenance without me having to ask each time. My role is to review and approve the work. The project has moved from a one-time build to an automated workflow with my approval as the decision point."
        ]
      }
    ],
    "metrics": [
      [
        "700",
        "npm installs"
      ]
    ],
    "outcome": "I shipped three distinct themes across eighteen chart families, covering many of the charts people use in everyday products. The React package, gallery, and documentation make those directions available to other developers; the ongoing agent workflow helps me identify what to build and maintain next."
  }
};
