<template>
  <div v-html="rawHtml"></div>
</template>

<script>
import axios from "axios";
import hljs from "highlight.js";
import MarkdownIt from "markdown-it";
// import mkuml from 'markdown-it-plantuml'
import emoji from "markdown-it-emoji";
import taskLists from "markdown-it-task-lists";
import footnote from "markdown-it-footnote";
import markdownItAnchor from "markdown-it-anchor";
import markdownItToc from "markdown-it-toc-done-right";
import markdownDeflist from "markdown-it-deflist";

import "@/assets/styles/markdown.css";
import "@/assets/styles/highlight.css";

export default {
  props: {
    url: String,
  },
  data() {
    return {
      rawHtml: "",
      rawMd: "",
    };
  },
  computed: {
    compiledHtml: function () {
      return this.rawHtml;
    },
  },
  created() {
    return axios({
      method: "get",
      url: this.url,
    })
      .then((result) => {
        this.renderHtml(result.data);
      })
      .catch((error) => {
        console.error("Error getting post content");
        console.error(error);
      });
  },
  methods: {
    renderHtml(toRenderMd) {
      let md = new MarkdownIt({
        html: true,
        xhtmlOut: true,
        breaks: false,
        langPrefix: "language-",
        linkify: true,
        typographer: true,
        quotes: "“”‘’",
        highlight: function (str, lang) {
          if (lang && hljs.getLanguage(lang)) {
            try {
              return `<pre class="hljs"><code>${
                hljs.highlight(lang, str, true).value
              }</code></pre>`;
            } catch (__) {
              console.log(__);
            }
          }
          const d = document.createElement("div");
          d.appendChild(document.createTextNode(str));
          const escaped = d.innerHTML;
          return `<pre class="hljs"><code>${escaped}</code></pre>`;
        },
      });

      md.use(emoji)
        .use(taskLists)
        .use(markdownDeflist)
        .use(footnote)
        .use(markdownItAnchor, {
          permalink: true,
          permalinkBefore: true,
          permalinkSymbol:
            '<svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>',
          permalinkClass: "anchor",
        })
        .use(markdownItToc, {
          listType: "ul",
        });

      let html = md.render(toRenderMd);
      this.rawHtml = html;
    },
  },
};
</script>
