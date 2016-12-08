tui.util.defineNamespace("fedoc.content", {});
fedoc.content["tooltips_tooltipTemplate.js.html"] = "      <div id=\"main\" class=\"main\">\n\n\n\n    \n    <section>\n        <article>\n            <pre class=\"prettyprint source linenums\"><code>/**\n * @fileoverview This is templates of tooltip.\n * @author NHN Ent.\n *         FE Development Lab &lt;dl_javascript@nhnent.com>\n */\n\n'use strict';\n\nvar templateMaker = require('../helpers/templateMaker');\n\nvar htmls = {\n    HTML_DEFAULT_TEMPLATE: '&lt;div class=\"tui-chart-default-tooltip\">' +\n        '&lt;div class=\"{{ categoryVisible }}\">{{ category }}&lt;/div>' +\n        '&lt;div>' +\n            '&lt;span>{{ legend }}&lt;/span>' +\n            '&lt;span>{{ label }}&lt;/span>' +\n            '&lt;span>{{ suffix }}&lt;/span>' +\n        '&lt;/div>' +\n    '&lt;/div>',\n    HTML_COORDINATE_TYPE_CHART_TEMPLATE: '&lt;div class=\"tui-chart-default-tooltip\">' +\n        '&lt;div>{{ category }}&lt;/div>' +\n        '&lt;div>' +\n            '&lt;span>{{ legend }}&lt;/span>' +\n            '&lt;span>{{ label }}&lt;/span>' +\n        '&lt;/div>{{ valueTypes }}' +\n    '&lt;/div>',\n    HTML_GROUP: '&lt;div class=\"tui-chart-default-tooltip tui-chart-group-tooltip\">' +\n        '&lt;div>{{ category }}&lt;/div>' +\n        '{{ items }}' +\n    '&lt;/div>',\n    HTML_GROUP_ITEM: '&lt;div>' +\n        '&lt;div class=\"tui-chart-legend-rect {{ chartType }}\" style=\"{{ cssText }}\">&lt;/div>' +\n        '&amp;nbsp;&lt;span>{{ legend }}&lt;/span>:&amp;nbsp;&lt;span>{{ value }}&lt;/span>' +\n        '&lt;span>{{ suffix }}&lt;/span>' +\n    '&lt;/div>',\n    GROUP_CSS_TEXT: 'background-color:{{ color }}',\n    HTML_MAP_CHART_DEFAULT_TEMPLATE: '&lt;div class=\"tui-chart-default-tooltip\">' +\n        '&lt;div>{{ name }}: {{ value }}{{ suffix }}&lt;/div>' +\n    '&lt;/div>'\n};\n\nmodule.exports = {\n    tplDefault: templateMaker.template(htmls.HTML_DEFAULT_TEMPLATE),\n    tplCoordinatetypeChart: templateMaker.template(htmls.HTML_COORDINATE_TYPE_CHART_TEMPLATE),\n    tplGroup: templateMaker.template(htmls.HTML_GROUP),\n    tplGroupItem: templateMaker.template(htmls.HTML_GROUP_ITEM),\n    tplGroupCssText: templateMaker.template(htmls.GROUP_CSS_TEXT),\n    tplMapChartDefault: templateMaker.template(htmls.HTML_MAP_CHART_DEFAULT_TEMPLATE)\n};\n</code></pre>\n        </article>\n    </section>\n\n\n\n</div>\n\n"