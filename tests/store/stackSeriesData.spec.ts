import stackSeriesData from '@src/store/stackSeriesData';

import { BarChartOptions } from '@t/options';
import { ChartState } from '@t/store/store';
import Store from '@src/store/store';

const data = [
  { name: 'han', data: [1, 2, 3] },
  { name: 'cho', data: [4, 5, 6] },
];

describe('StackSeriesData Store', () => {
  describe('initialize', () => {
    it('should be initialized with default values, if the stack option is true only', () => {
      const state = {
        series: { bar: { data } },
        stackSeries: {},
      } as ChartState<BarChartOptions>;

      stackSeriesData.initialize!(state, { series: { stack: true } });

      expect(state.stackSeries.bar!.stack).toEqual({
        type: 'normal',
        connector: false,
      });
    });

    it('should reset the connector to default value, if the connector is true only', () => {
      const state = {
        series: { bar: { data } },
        stackSeries: {},
      } as ChartState<BarChartOptions>;

      stackSeriesData.initialize!(state, {
        series: { stack: { type: 'normal', connector: true } },
      });

      expect(state.stackSeries.bar!.stack).toEqual({
        type: 'normal',
        connector: {
          type: 'solid',
          color: 'rgba(51, 85, 139, 0.3)',
          width: 1,
        },
      });
    });

    it('should be extended from the connector default, if the connector type is object', () => {
      const state = {
        series: { bar: { data } },
        stackSeries: {},
        options: {
          series: {},
        },
      } as ChartState<BarChartOptions>;

      stackSeriesData.initialize!(state, {
        series: {
          stack: {
            type: 'percent',
            connector: { type: 'dashed', color: '#ff0000' },
          },
        },
      });

      expect(state.stackSeries.bar!.stack).toEqual({
        type: 'percent',
        connector: { type: 'dashed', color: '#ff0000', width: 1 },
      });
    });
  });

  describe('setStackSeriesData', () => {
    it('should be made data for the stack', () => {
      const state = {
        series: { bar: { data } },
        stackSeries: {
          bar: {
            stack: {
              type: 'normal',
              connector: {
                type: 'solid',
                color: 'rgba(51, 85, 139, 0,3)',
                width: 1,
              },
            },
          },
        },
        options: {
          series: {
            stack: true,
          },
        },
      } as ChartState<BarChartOptions>;

      const store = { state } as Store<BarChartOptions>;
      stackSeriesData.action!.setStackSeriesData(store);

      expect(state.stackSeries.bar!.stackData).toEqual([
        {
          values: [1, 4],
          sum: 5,
        },
        {
          values: [2, 5],
          sum: 7,
        },
        {
          values: [3, 6],
          sum: 9,
        },
      ]);
    });

    it('shoule be make data for the stack group data, when data using the stack group is entered', () => {
      const state = {
        series: {
          bar: {
            data: [
              {
                name: 'test1',
                data: [1, 2, 3],
                stackGroup: 'A',
              },
              {
                name: 'test2',
                data: [2, 4, 6],
                stackGroup: 'B',
              },
              {
                name: 'test3',
                data: [3, 4, 5],
                stackGroup: 'A',
              },
              {
                name: 'test4',
                data: [4, 1, 1],
                stackGroup: 'B',
              },
            ],
          },
        },
        stackSeries: {
          bar: {
            stack: {
              type: 'normal',
              connector: {
                type: 'solid',
                color: 'rgba(51, 85, 139, 0,3)',
                width: 1,
              },
            },
          },
        },
        options: {
          series: {
            stack: true,
          },
        },
      } as ChartState<BarChartOptions>;

      const store = { state } as Store<BarChartOptions>;
      stackSeriesData.action!.setStackSeriesData(store);

      expect(state.stackSeries.bar!.stackData).toEqual({
        A: [
          { values: [1, 3], sum: 4 },
          { values: [2, 4], sum: 6 },
          { values: [3, 5], sum: 8 },
        ],
        B: [
          { values: [2, 4], sum: 6 },
          { values: [4, 1], sum: 5 },
          { values: [6, 1], sum: 7 },
        ],
      });
    });
  });
});