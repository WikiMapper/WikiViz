WikiViz
=======

**WikiViz: Graph Visualization of Wikipedia Article Titles and their Embedded Links.**

Visualize and explore a graph of the embedded links within a Wikipedia article. The initial Wikipedia article title is the central node and titles of embedded links appear as child nodes distributed around the central node. Click on child nodes to reveal their embedded links and continue to grow your graph of article titles!

This project is in its early stages and will continue to grow with new features. If something is not working or you would like a new feature, please use the issues page.

## Demo

<a href="http://tinypic.com?ref=5xzqe" target="_blank"><img src="http://i59.tinypic.com/5xzqe.png" border="0" alt="Image and video hosting by TinyPic"></a>
Click for a demo: <a href="http://pure-wildwood-3935.herokuapp.com/#/" target="_blank">WikiViz</a>.

## Installation

You can simply fork and clone (or download) WikiViz into your local directory:

```
  $ git clone https://github.com/WikiMapper/WikiViz.git
```

## Usage

Install all dependencies:

```
  $ npm install
```

Then, fire up the node server:

```
  $ node app/app.js
```

Go ahead and enter a URL and clik on articles nodes for further exploration.

Code base: https://github.com/WikiMapper/WikiViz
  - Front end: see wikiviz-client folder for angular/D3
  - Back end: app folder / app.js for basic server
  - App / scraper / scape.js for scraper that extracts links from a given wikipedia page
  - App / scraper / getRelatedWords.js for NLP processing of each page (not currently disabled to improve speed)

## Tech Stack

<table>
<tr>
<td>Angular</td>
<td>D3</td>
</tr>

<tr>
<td>Node.js</td>
<td>Express</td>
</tr>

<tr>
<td>Heroku</td>
<td>Alchemy API (NLP)</td>
</tr>
</table>

## Options

We'll be adding more features; that said, if you'd like a feature or have any questions, let us know via a pull request.
