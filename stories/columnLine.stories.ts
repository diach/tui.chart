import ColumnLineChart from '@src/charts/columnLineChart';
import { ColumnLineChartOptions } from '@t/options';
import { deepMergedCopy, range } from '@src/helpers/utils';
import { temperatureAverageData } from './data';
import '@src/css/chart.css';

export default {
  title: 'chart.ColumnLine',
};

const defaultOptions: ColumnLineChartOptions = {
  chart: {
    width: 1000,
    height: 500,
    title: '24-hr Average Temperature',
  },
  yAxis: { title: 'Temperature (Celsius)' },
  xAxis: { title: 'Month' },
};

function createChart(data, customOptions: ColumnLineChartOptions = {}) {
  const el = document.createElement('div');
  const options = deepMergedCopy(defaultOptions, customOptions);

  el.style.outline = '1px solid red';
  el.style.width = options.chart?.width === 'auto' ? '90vw' : `${options.chart?.width}px`;
  el.style.height = options.chart?.height === 'auto' ? '90vh' : `${options.chart?.height}px`;

  const chart = new ColumnLineChart({
    el,
    data,
    options,
  });

  return { el, chart };
}
export const basic = () => {
  const { el } = createChart(temperatureAverageData);

  return el;
};

export const liveUpdate = () => {
  const data = {
    categories: ['1', '2', '3', '4', '5'],
    series: {
      column: [
        {
          name: 'A',
          data: [10, 17, 22, 10, 40],
        },
        {
          name: 'B',
          data: [9.9, 16.0, 21.2, 24.2, 23.2],
        },
        {
          name: 'C',
          data: [18.3, 15.2, 12.8, 11.8, 13.0],
        },
        {
          name: 'D',
          data: [4.4, 12.2, 16.3, 18.5, 16.7],
        },
      ],
      line: [
        {
          name: 'E',
          data: [11, 40.1, 24.8, 30.7, 19.5],
        },
      ],
    },
  };

  const { el, chart } = createChart(data, {
    series: {
      shift: true,
    },
  });

  let idx = 6;
  const intervalId = setInterval(() => {
    const randomData = range(0, 4).map(() => Math.round(Math.random() * 100));
    chart.addData(randomData, idx.toString(), 'column');
    chart.addData([randomData[0]], idx.toString(), 'line');
    if (idx === 20) {
      clearInterval(intervalId);
    }
    idx += 1;
  }, 2500);

  return el;
};

export const selectableGrouped = () => {
  const { el } = createChart(temperatureAverageData, {
    series: {
      selectable: true,
    },
  });

  return el;
};

export const selectablePoint = () => {
  const { el } = createChart(temperatureAverageData, {
    series: {
      selectable: true,
      eventDetectType: 'point',
    },
  });

  return el;
};

// @TODO: need to remove. comment for beta test
// export const dataLabels = () => {
//   const { el } = createChart(temperatureAverageData, {
//     series: {
//       column: {
//         dataLabels: {
//           visible: false,
//         },
//       },
//       line: {
//         dataLabels: {
//           visible: true,
//         },
//       },
//     },
//   });
//
//   return el;
// };

export const secondaryYAxis = () => {
  const { el } = createChart(temperatureAverageData, {
    yAxis: [
      {
        title: 'Temperature (Celsius)',
        chartType: 'column',
      },
      {
        title: 'Average',
        chartType: 'line',
      },
    ],
  });

  return el;
};
export const responsive = () => {
  const { el } = createChart(temperatureAverageData, {
    chart: {
      title: '24-hr Average Temperature',
      width: 800,
      height: 'auto',
    },
    yAxis: [{ title: 'Temperature (Celsius)' }, { title: 'Average' }],
    xAxis: { title: 'Month' },
  });

  return el;
};
