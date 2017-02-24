tui.util.defineNamespace("fedoc.content", {});
fedoc.content["charts_addingDynamicDataMixer.js.html"] = "      <div id=\"main\" class=\"main\">\n\n\n\n    \n    <section>\n        <article>\n            <pre class=\"prettyprint source linenums\"><code>'use strict';\n\nvar chartConst = require('../const');\n\n/**\n * addingDynamicData is mixer for adding dynamic data.\n * @mixin\n */\nvar addingDynamicDataMixer = {\n    /**\n     * Initialize for adding data.\n     * @private\n     */\n    _initForAddingData: function() {\n        /**\n         * whether lookupping or not\n         * @type {boolean}\n         */\n        this.lookupping = false;\n\n        /**\n         * whether paused or not\n         * @type {boolean}\n         */\n        this.paused = false;\n\n        /**\n         * rendering delay timer id\n         * @type {null}\n         */\n        this.rerenderingDelayTimerId = null;\n\n        /**\n         * added data count\n         * @type {number}\n         */\n        this.addedDataCount = 0;\n\n        /**\n         * checked legends.\n         * @type {null | Array.&lt;?boolean> | {line: ?Array.&lt;boolean>, column: ?Array.&lt;boolean>}}\n         */\n        this.checkedLegends = null;\n    },\n\n    /**\n     * Animate for adding data.\n     * @private\n     */\n    _animateForAddingData: function() {\n        var self = this;\n        var boundsMaker = this.boundsMaker;\n        var dataProcessor = this.dataProcessor;\n        var shiftingOption = !!this.options.series.shifting;\n        var beforeAxesData = boundsMaker.getAxesData();\n\n        this.addedDataCount += 1;\n        this.axisScaleMakerMap = null;\n        boundsMaker.initBoundsData();\n\n        this._render(function() {\n            var xAxisWidth = boundsMaker.getDimension('xAxis').width;\n            var tickCount, tickSize;\n\n            if (dataProcessor.isCoordinateType()) {\n                tickCount = dataProcessor.getValues(self.chartType, 'x').length - 1;\n            } else {\n                tickCount = dataProcessor.getCategoryCount(false) - 1;\n            }\n\n            if (shiftingOption) {\n                tickCount -= 1;\n            }\n\n            tickSize = (xAxisWidth / tickCount);\n\n            self._renderComponents({\n                tickSize: tickSize,\n                shifting: shiftingOption\n            }, 'animateForAddingData');\n        }, beforeAxesData);\n\n        if (shiftingOption) {\n            this.dataProcessor.shiftData();\n        }\n    },\n\n    /**\n     * Rerender for adding data.\n     * @private\n     */\n    _rerenderForAddingData: function() {\n        var self = this;\n\n        if (this.options.series.shifting || this.dataProcessor.isCoordinateType()) {\n            this.boundsMaker.initBoundsData();\n        }\n\n        this.axisScaleMakerMap = null;\n\n        this._render(function(renderingData) {\n            renderingData.animatable = false;\n            self._renderComponents(renderingData, 'rerender');\n        });\n    },\n\n    /**\n     * Check for added data.\n     * @private\n     */\n    _checkForAddedData: function() {\n        var self = this;\n        var added = this.dataProcessor.addDataFromDynamicData();\n\n        if (!added) {\n            this.lookupping = false;\n\n            return;\n        }\n\n        if (this.paused) {\n            return;\n        }\n\n        this.boundsMaker.onAddingDataMode();\n        this._animateForAddingData();\n        this.rerenderingDelayTimerId = setTimeout(function() {\n            self.rerenderingDelayTimerId = null;\n            self.boundsMaker.offAddingDataMode();\n            self._rerenderForAddingData();\n            self._checkForAddedData();\n        }, 400);\n    },\n\n    /**\n     * Pause animation for adding data.\n     * @private\n     */\n    _pauseAnimationForAddingData: function() {\n        this.paused = true;\n        this._initForAutoTickInterval();\n\n        if (this.rerenderingDelayTimerId) {\n            clearTimeout(this.rerenderingDelayTimerId);\n            this.rerenderingDelayTimerId = null;\n\n            if (this.options.series.shifting) {\n                this.dataProcessor.shiftData();\n            }\n        }\n    },\n\n    /**\n     * Restart animation for adding data.\n     * @private\n     */\n    _restartAnimationForAddingData: function() {\n        this.paused = false;\n        this.lookupping = false;\n        this._startLookup();\n    },\n\n    /**\n     * Start lookup.\n     * @private\n     */\n    _startLookup: function() {\n        if (this.lookupping) {\n            return;\n        }\n\n        this.lookupping = true;\n\n        this._checkForAddedData();\n    },\n\n    /**\n     * Add data.\n     * @param {string} category - category\n     * @param {Array} values - values\n     */\n    addData: function(category, values) {\n        if (!values) {\n            values = category;\n            category = null;\n        }\n\n        this.dataProcessor.addDynamicData(category, values);\n        this._startLookup();\n    },\n\n\n    /**\n     * Change checked legend.\n     * @param {Array.&lt;?boolean> | {line: ?Array.&lt;boolean>, column: ?Array.&lt;boolean>}} checkedLegends checked legends\n     * @param {?object} rawData rawData\n     * @param {?object} boundsParams addition params for calculating bounds\n     * @override\n     */\n    _changeCheckedLegends: function(checkedLegends, rawData, boundsParams) {\n        var self = this;\n        var pastPaused = this.paused;\n\n        if (!pastPaused) {\n            this._pauseAnimationForAddingData();\n        }\n\n        this.checkedLegends = checkedLegends;\n        this._rerender(checkedLegends, rawData, boundsParams);\n\n\n        if (!pastPaused) {\n            setTimeout(function() {\n                self._restartAnimationForAddingData();\n            }, chartConst.RERENDER_TIME);\n        }\n    }\n};\n\nmodule.exports = addingDynamicDataMixer;\n</code></pre>\n        </article>\n    </section>\n\n\n\n</div>\n\n"