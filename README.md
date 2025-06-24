# Personal Website - Lelan Hu

A minimalist personal website built with Jekyll, inspired by zhengdongwang.com.

## Features

- Clean, minimalist design with focus on content
- Blog with Markdown support
- Static pages for About, Writing, and Quotes
- Responsive design for mobile and desktop
- RSS feed support
- SEO optimization with Jekyll SEO tag
- Analytics integration ready

## Structure

```
├── _includes/          # Reusable components
├── _layouts/           # Page templates
├── _posts/             # Blog posts
├── assets/             # CSS, JS, and images
├── pages/              # Static pages
├── _config.yml         # Jekyll configuration
├── Gemfile             # Ruby dependencies
└── index.html          # Homepage
```

## Local Development

### Prerequisites

- Ruby (2.7 or higher)
- Bundler (`gem install bundler`)

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/hulelan/hulelan.github.io.git
   cd hulelan.github.io
   ```

2. Install dependencies:
   ```bash
   bundle install
   ```

3. Run the development server:
   ```bash
   bundle exec jekyll serve
   ```

4. Open http://localhost:4000 in your browser

## Creating Content

### Blog Posts

Create a new file in `_posts/` with the format `YYYY-MM-DD-post-title.md`:

```markdown
---
layout: post
title: "Your Post Title"
date: 2024-03-20
categories: [category1, category2]
excerpt: "A brief description of your post"
---

Your post content here...
```

### Pages

Create new pages in the `pages/` directory with front matter:

```markdown
---
layout: page
title: "Page Title"
permalink: /page-url/
---

Page content here...
```

## Customization

### Navigation

Edit the navigation menu in `_config.yml`:

```yaml
navigation:
  - title: About
    url: /about/
  - title: Blog
    url: /blog/
```

### Analytics

Add your Google Analytics tracking ID in `_config.yml`:

```yaml
google_analytics: UA-XXXXXXXXX-X
```

### Styling

Main stylesheet is located at `assets/css/main.css`. The design uses:
- Google Fonts: Lato (body) and Lusitana (headings)
- Minimal color palette
- Responsive grid layout

## Deployment

### GitHub Pages

1. Push to your repository:
   ```bash
   git add .
   git commit -m "Update site"
   git push origin main
   ```

2. GitHub Pages will automatically build and deploy your site

### Custom Domain

1. Add your domain to the `CNAME` file
2. Configure DNS settings with your domain provider:
   - A records: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
   - CNAME record: www → [username].github.io

## License

This project is open source and available under the MIT License.