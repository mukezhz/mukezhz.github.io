import type { Site, Metadata, Socials } from "@types";

export const SITE: Site = {
  NAME: "Mukezhz",
  EMAIL: "mukezhz@duck.com",
  NUM_POSTS_ON_HOMEPAGE: 3,
  NUM_WORKS_ON_HOMEPAGE: 2,
  NUM_PROJECTS_ON_HOMEPAGE: 3,
};

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION: "Mukesh Kumar Chaudhary | Software Engineer from Nepal🇳🇵. Exploring the technology.",
};

export const BLOG: Metadata = {
  TITLE: "Blog",
  DESCRIPTION: "Mukesh Kumar Chaudhary | A collection of articles on topics I am passionate about.",
};

export const WORK: Metadata = {
  TITLE: "Work",
  DESCRIPTION: "Mukesh Kumar Chaudhary Work | Where I have worked and what I have done.",
};

export const PROJECTS: Metadata = {
  TITLE: "Projects",
  DESCRIPTION: "Mukesh Kumar Chaudhary Projects | A collection of my projects, with links to repositories and demos.",
};

export const SOCIALS: Socials = [
  { 
    NAME: "twitter-x",
    HREF: "https://x.com/mukezhz",
  },
  { 
    NAME: "github",
    HREF: "https://github.com/mukezhz"
  },
  { 
    NAME: "linkedin",
    HREF: "https://linkedin.com/in/mukezhz",
  },
  { 
    NAME: "telegram",
    HREF: "https://telegram.dog/mukezhz",
  }
];
