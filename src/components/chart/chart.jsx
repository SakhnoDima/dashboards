import { useEffect, useState } from "react";
import { Campaigns_with_date } from "../dashboards/campaigns_with_date";
import { WidgetCreator } from "../form/campaigns_with_date_form";

import { Commands } from "../commands/commands.jsx";

import { instaDataParser, parser } from "../../services/index.js";
import File_reader from "../file_reader/file_reader.jsx";
import Data_reader from "../data_reader/data_reader.jsx";

export const Chart = () => {
  const [loading, setLoading] = useState(false);
  const [inputData, setInputData] = useState({});
  const [widgets, setWidget] = useState({});
  const [fileData, setFileData] = useState([]);

  return (
    <>
      <Data_reader setInputData={setInputData} setLoading={setLoading} />
      <File_reader loading={loading} setFileData={setFileData} />
      <Commands
        setWidget={setWidget}
        setLoading={setLoading}
        loading={loading}
      />
      <WidgetCreator
        setWidget={setWidget}
        loading={loading}
        setLoading={setLoading}
      />
      <Campaigns_with_date rootData={inputData} widget={widgets} />
    </>
  );
};

// Create ascending column chart use "Creation Date" and "Daily Budget"
