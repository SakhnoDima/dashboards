import { useEffect, useState } from "react";
import { Campaigns_with_date } from "../dashboards/campaigns_with_date";
import { WidgetCreator } from "../form/campaigns_with_date_form";
import { TestWidgetDashboard } from "../dashboards/test_dashboard.jsx";

import { parser } from "../../services/parser";
import { loadedColumns } from "./../../constants/index.js";
import { Commands } from "../commands/commands.jsx";
import Dashboards from "@highcharts/dashboards";
import TestWidget from "../widgets/test_widget.jsx";
import KpiWidget from  "../widgets/kpi_widget.jsx";

export const Chart = () => {
  const [loading, setLoading] = useState(false);
  const [inputData, setInputData] = useState({});
  const [widgets, setWidget] = useState({components: [KpiWidget]});

  useEffect(() => {
    setInputData(parser(loadedColumns));
  }, []);

  return (
    <>
      {/*<Commands*/}
      {/*  setWidget={setWidget}*/}
      {/*  setLoading={setLoading}*/}
      {/*  loading={loading}*/}
      {/*/>*/}
      {/*<WidgetCreator*/}
      {/*  setWidget={setWidget}*/}
      {/*  loading={loading}*/}
      {/*  setLoading={setLoading}*/}
      {/*/>*/}
      <Campaigns_with_date rootData={inputData} widget={widgets} />
        {/*<TestWidget />*/}
    </>
  );
};

// Create ascending column chart use "Creation Date" and "Daily Budget"
