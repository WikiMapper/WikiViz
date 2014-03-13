WikiViz
=======

Graph Visualization of Wikipedia Articles and their Embedded Links

Deployed at: http://pure-wildwood-3935.herokuapp.com/#/

Description: Visualize and explore a graph of the embedded links within a Wikipedia article. The initial Wikipedia article title is the central node and titles of embedded links appear as children nodes distributed around the central node. Using NLP, our algorithm compares the content of the initial article and content of its embedded links - embedded links with similar content appear larger and closer to the intial article title (PENDING).

Screenshots: (PENDING)

Tech stack: Angular/D3, Node.js deployed to Heroku, Alchemy API (for NLP). Database storage with Postgres not yet completed.

Code base: https://github.com/WikiMapper/WikiViz
  - Front end: see wikiviz-client folder for angular/D3
  - Back end: app folder / app.js for basic server
    - app / scraper / scape.js for scraper that extracts links from a given wikipedia page
    - app / scraper / getRelatedWords.js for NLP processing of each page
