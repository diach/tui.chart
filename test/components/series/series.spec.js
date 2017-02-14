/**
 * @fileoverview test series
 * @author NHN Ent.
 *         FE Development Lab <dl_javascript@nhnent.com>
 */

'use strict';

var Series = require('../../../src/js/components/series/series');
var chartConst = require('../../../src/js/const');
var dom = require('../../../src/js/helpers/domHandler');
var renderUtil = require('../../../src/js/helpers/renderUtil');

describe('Series', function() {
    var series;

    beforeEach(function() {
        series = new Series({
            chartType: 'bar',
            tooltipPrefix: 'tooltip-prefix-',
            theme: {
                label: {
                    fontFamily: 'Verdana',
                    fontSize: 11,
                    fontWeight: 'normal'
                },
                colors: ['blue']
            },
            options: {},
            eventBus: new tui.util.CustomEvents()
        });
    });

    describe('_getLimitDistanceFromZeroPoint()', function() {
        it('min, max 사이에 0점이 존재하는 경우에 0점으로 부터 limit min, max까지의 거리를 구합니다.', function() {
            var result = series._getLimitDistanceFromZeroPoint(100, {
                min: -20,
                max: 80
            });
            expect(result).toEqual({
                toMax: 80,
                toMin: 20
            });
        });

        it('min, max 모두 0보다 큰 경우에는 toMax는 size를, toMin은 0을 반환합니다.', function() {
            var result = series._getLimitDistanceFromZeroPoint(100, {
                min: 20,
                max: 80
            });
            expect(result).toEqual({
                toMax: 100,
                toMin: 0
            });
        });

        it('min, max 모두 음수인 경우에는 toMax, toMin 모두 0을 반환합니다.', function() {
            var result = series._getLimitDistanceFromZeroPoint(100, {
                min: -80,
                max: -20
            });
            expect(result).toEqual({
                toMax: 0,
                toMin: 0
            });
        });
    });

    describe('renderBounds()', function() {
        it('series 영역 너비, 높이, 위치를 렌더링 합니다.', function() {
            var seriesContainer = dom.create('DIV');

            spyOn(renderUtil, 'isOldBrowser').and.returnValue(false);

            series._renderPosition(seriesContainer, {
                top: 20,
                left: 20
            });

            expect(seriesContainer.style.top).toBe('20px');
            expect(seriesContainer.style.left).toBe('20px');
        });
    });

    describe('_makeSeriesLabelHtml()', function() {
        it('position, value 정보를 받아 series레이블이 표현될 html을 생성합니다.', function() {
            var result = series._makeSeriesLabelHtml({
                left: 10,
                top: 10
            }, 'label1', 0);

            expect(result).toBe('<div class="tui-chart-series-label"' +
                ' style="left:10px;top:10px;font-family:Verdana;font-size:11px;font-weight:normal">label1</div>');
        });
    });

    describe('render()', function() {
        it('width=200, height=100의 series 영역을 렌더링합니다.', function() {
            var data = {
                limitMap: {
                    bar: {
                        min: 0,
                        max: 100
                    }
                },
                dimensionMap: {
                    extendedSeries: {
                        width: 220,
                        height: 120
                    }
                },
                positionMap: {
                    extendedSeries: {
                        top: 40,
                        left: 40
                    }
                }
            };
            var eventBus = jasmine.createSpyObj('eventBus', ['fire']);
            var actual, seriesContainer;

            series.hasAxes = true;
            spyOn(renderUtil, 'isOldBrowser').and.returnValue(false);
            series.eventBus = eventBus;

            actual = series.render(data);
            seriesContainer = actual.container;

            expect(seriesContainer.className.indexOf('series-area') > -1).toBe(true);
            expect(seriesContainer.style.width).toBe('220px');
            expect(seriesContainer.style.height).toBe('120px');
            expect(seriesContainer.style.top).toBe('40px');
            expect(seriesContainer.style.left).toBe('40px');
        });
    });

    describe('_findLabelElement()', function() {
        it('대상 엘리먼트가 시리즈 라벨(series label) 엘리먼트이면 대상 엘리먼트를 반환합니다.', function() {
            var elTarget = dom.create('DIV', chartConst.CLASS_NAME_SERIES_LABEL);
            var actual = series._findLabelElement(elTarget);
            var expected = elTarget;

            expect(actual).toBe(expected);
        });
    });
});
