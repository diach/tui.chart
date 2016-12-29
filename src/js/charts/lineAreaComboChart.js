/**
 * @fileoverview Line and Area Combo chart.
 * @author NHN Ent.
 *         FE Development Lab <dl_javascript@nhnent.com>
 */

'use strict';

var ChartBase = require('./chartBase');
var rawDataHandler = require('../models/data/rawDataHandler');
var axisTypeMixer = require('./axisTypeMixer');
var zoomMixer = require('./zoomMixer');
var addingDynamicDataMixer = require('./addingDynamicDataMixer');
var comboTypeMixer = require('./comboTypeMixer');
var verticalTypeComboMixer = require('./verticalTypeComboMixer');

var LineAreaComboChart = tui.util.defineClass(ChartBase, /** @lends LineAreaComboChart.prototype */ {
    /**
     * className
     * @type {string}
     */
    className: 'tui-combo-chart',
    /**
     * Line and Area Combo chart.
     * @constructs LineAreaComboChart
     * @extends ChartBase
     * @param {Array.<Array>} rawData - raw data
     * @param {object} theme - chart theme
     * @param {object} options - chart options
     */
    init: function(rawData, theme, options) {
        this._initForVerticalTypeCombo(rawData, options);
        this._initForAddingData();

        ChartBase.call(this, {
            rawData: rawData,
            theme: theme,
            options: options,
            hasAxes: true,
            isVertical: true
        });
    },

    /**
     * On change selected legend.
     * @param {Array.<?boolean> | {line: ?Array.<boolean>, column: ?Array.<boolean>}} checkedLegends checked legends
     */
    onChangeCheckedLegends: function(checkedLegends) {
        var zoomedRawData = this.dataProcessor.getZoomedRawData();
        var rawData = rawDataHandler.filterCheckedRawData(zoomedRawData, checkedLegends);
        var chartTypesMap = this._makeChartTypesMap(rawData.series, this.options.yAxis);

        tui.util.extend(this, chartTypesMap);

        this._initForAddingData();
        this._changeCheckedLegends(checkedLegends, rawData, chartTypesMap);
    }
});

tui.util.extend(LineAreaComboChart.prototype,
    axisTypeMixer, zoomMixer, addingDynamicDataMixer, comboTypeMixer, verticalTypeComboMixer);

module.exports = LineAreaComboChart;