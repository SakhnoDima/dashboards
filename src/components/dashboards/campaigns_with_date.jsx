import { useEffect, useState, useMemo } from "react";

import Highcharts from "highcharts";
import Dashboards from "@highcharts/dashboards";
import DataGrid from "@highcharts/dashboards/datagrid";
import LayoutModule from "@highcharts/dashboards/modules/layout";
import MathModifier from "@highcharts/dashboards/modules/math-modifier";
import { rootConnectors, rootLayOutCampaigns } from "../../constants";

LayoutModule(Dashboards);
MathModifier(Dashboards);

Dashboards.HighchartsPlugin.custom.connectHighcharts(Highcharts);
Dashboards.DataGridPlugin.custom.connectDataGrid(DataGrid);

Dashboards.PluginHandler.addPlugin(Dashboards.HighchartsPlugin);
Dashboards.PluginHandler.addPlugin(Dashboards.DataGridPlugin);

const dashComponent = {
  renderTo: "main-data-grid",
  connector: {
    id: "main-data-grid-id",
  },
  type: "DataGrid",
  sync: {
    highlight: true,
  },
  dataGridOptions: {
    editable: false,
    columns: {
      "Creation Date": {
        cellFormatter: function () {
          return new Date(this.value).toISOString().substring(0, 10);
        },
      },
      Начало: {
        cellFormatter: function () {
          return new Date(this.value).toISOString().substring(0, 10);
        },
      },
      "Дата окончания отчетности": {
        cellFormatter: function () {
          return new Date(this.value).toISOString().substring(0, 10);
        },
      },

      "Дата начала отчетности": {
        cellFormatter: function () {
          return new Date(this.value).toISOString().substring(0, 10);
        },
      },
    },
  },
};

export const Campaigns_with_date = ({ rootData, widget }) => {
  const [components, setComponents] = useState([]);

  const newComponents = useMemo(() => {
    return [
      dashComponent,
      ...(Object.keys(widget).length !== 0 ? widget.components : []),
    ];
  }, [widget]);

  useEffect(() => {
    if (components !== newComponents) {
      setComponents(newComponents);
    }
  }, [newComponents]);

  useEffect(() => {
    Dashboards.board("container", {
      dataPool: {
        connectors: [
          {
            id: "main-data-grid-id",
            type: "JSON",
            options: {
              firstRowAsNames: false,
              columnNames: [],
              data: rootData.convertedData,
              dataModifier: {},
            },
          },
        ],
      },
      editMode: {
        enabled: true,
        contextMenu: {
          enabled: true,
          items: ["editMode"],
        },
      },
      gui: Object.keys(widget).length ? widget.gui : rootLayOutCampaigns,
      components: newComponents,
    });
  }, [rootData, widget, newComponents]);

  return <div id="container" />;
};