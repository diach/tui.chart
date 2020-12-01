import Component from './component';
import { Categories, ChartState, Options, Series } from '@t/store/store';
import { ExportMenuModels } from '@t/components/exportMenu';
import { isExportMenuVisible, padding } from '@src/store/layout';
import { TitleOption } from '@t/options';
import { execDownload, downloadSpreadSheet } from '@src/helpers/downloader';
import { isString } from '@src/helpers/utils';
import { RectResponderModel } from '@t/components/series';

const EXPORT_MENU_WIDTH = 140;
export const BUTTON_RECT_SIZE = 24;
export interface DataToExport {
  series: Series;
  categories?: Categories;
}

export default class ExportMenu extends Component {
  responders!: RectResponderModel[];

  models: ExportMenuModels = { exportMenuButton: [] };

  opened = false;

  fileName!: string;

  data!: DataToExport;

  chartEl!: HTMLDivElement;

  exportMenuEl!: HTMLDivElement;

  toggleExportMenu = () => {
    this.opened = !this.opened;
    this.models.exportMenuButton[0].opened = this.opened;
    this.eventBus.emit('needDraw');

    if (this.opened) {
      this.chartEl.appendChild(this.exportMenuEl);
    } else {
      this.chartEl.removeChild(this.exportMenuEl);
    }
  };

  getCanvasExportBtnRemoved = () => {
    const canvas = this.chartEl.getElementsByTagName('canvas')[0];
    const ctx = canvas.getContext('2d')!;
    const { x, y, height: h, width: w } = this.rect;
    ctx.fillStyle = '#fff';
    ctx.fillRect(x, y, w, h);

    return canvas;
  };

  onClickExportButton = (ev) => {
    const { id } = ev.target;

    if (id === 'png' || id === 'jpeg') {
      const canvas = this.getCanvasExportBtnRemoved();
      execDownload(this.fileName, id, canvas.toDataURL(`image/${id}`, 1));
    } else {
      downloadSpreadSheet(this.fileName, id, this.data);
    }

    this.toggleExportMenu();
  };

  getExportMenuEl(chartWidth: number) {
    const { top, left } = this.chartEl.getBoundingClientRect();
    const topPosition = top + padding.Y + BUTTON_RECT_SIZE + 5;
    const leftPosition = left + chartWidth - EXPORT_MENU_WIDTH - padding.X;

    const el = document.createElement('div');
    el.onclick = this.onClickExportButton;
    el.innerHTML = `
        <div class="export-menu" style="top: ${topPosition}px; left: ${leftPosition}px;">
          <p class="export-menu-title">Export to</p>
          <div class="export-menu-btn-wrapper">
            <button class="export-menu-btn" id="xls">xls</button>
            <button class="export-menu-btn" id="csv">csv</button>
            <button class="export-menu-btn" id="png">png</button>
            <button class="export-menu-btn" id="jpeg">jpeg</button>
          </div>
        </div>
      `;

    return el;
  }

  initialize({ chartEl }) {
    this.chartEl = chartEl;
    this.type = 'exportMenu';
    this.name = 'exportMenu';
  }

  onClick({ responders }: { responders: RectResponderModel[] }) {
    if (responders.length) {
      this.toggleExportMenu();
    }
  }

  getFileName(title?: string | TitleOption) {
    return isString(title) ? title : title?.text ?? 'tui-chart';
  }

  render({ options, layout, chart, series, categories }: ChartState<Options>) {
    this.isShow = isExportMenuVisible(options);

    if (!this.isShow) {
      return;
    }

    this.data = { series, categories };
    this.fileName = this.getFileName(options?.exportMenu?.filename || chart.title);
    this.exportMenuEl = this.getExportMenuEl(chart.width);
    this.rect = layout.exportMenu;
    this.models.exportMenuButton = [
      {
        type: 'exportMenuButton',
        x: 0,
        y: 0,
        opened: this.opened,
      },
    ];

    this.responders = [
      {
        type: 'rect',
        width: BUTTON_RECT_SIZE,
        height: BUTTON_RECT_SIZE,
        x: this.rect.x,
        y: this.rect.y,
      },
    ];
  }
}