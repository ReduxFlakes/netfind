const markdownIt = require("markdown-it");
const markdownItAttrs = require("markdown-it-attrs");
const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets/");
  eleventyConfig.addPassthroughCopy("src/css/");
  eleventyConfig.addWatchTarget("src/css");
  const md = markdownIt({ html: true, linkify: true });
  md.use(markdownItAttrs);
  eleventyConfig.setLibrary("md", md);
  eleventyConfig.addFilter("asPostDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat("LLL dd yyyy");

    // other config likely here
  });
  return {
    dir: {
      input: "src",
      includes: "_includes",
      layouts: "layouts",
      output: "_site",
      data: "data",
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
  };
};
