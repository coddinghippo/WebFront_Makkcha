export const dataHandler = data => {
  const {
    busAndSubwayPathOptionList,
    busPathOptionList,
    taxiInfo,
    subwayPathOptionList,
    pushAllow
  } = data;

  console.log(data);

  let sub, busNSub, bus;
  const defaultSub = subwayPathOptionList
    ? subwayPathOptionList.routeList[0]
    : null;
  const taxi = taxiInfo;

  function handleSub() {
    sub = subwayPathOptionList;
    const { routeList } = sub;
    let subOnly = { subOnlyList: [], lineList: [] };

    if (routeList) {
      let routes = [];
      routeList.sort((a, b) => a.totalTime - b.totalTime);
      let minTime = routeList[0];
      routeList.sort((a, b) => a.transferNum - b.transferNum);
      let minTransferNum = routeList[0];

      let temp = [];
      if (minTime !== minTransferNum) temp.push(minTime);
      temp.push(minTransferNum);

      temp.map((eachRoute, idx) => {
        const { distance, price, pathList } = eachRoute;
        // const route = [];
        const runTime = [];
        let totalTime = 0;

        pathList.map(pathItem => {
          let path = {};
          totalTime += pathItem.duration;
          switch (pathItem.type) {
            case "BUS":
              // BUS HANDLING
              path = {};
              path["icon"] = "fas fa-bus";
              path["lines"] = pathItem.routes.map(line => line.name);
              path["type"] = pathItem.routes[0].name;
              path["time"] = pathItem.duration;
              path["color"] = pathItem.routes[0].type.color;
              return runTime.push(path);
            case "SUBWAY":
              // SUBWAY HANDLING
              path = {};
              path["icon"] = "fas fa-train";
              path["stationName"] = pathItem.displayCode;
              path["lines"] = pathItem.routes.map(line => line.name);
              path["time"] = pathItem.duration;
              path["type"] = pathItem.routes[0].name;
              path["color"] = pathItem.routes[0].type.color;
              if (idx == 0) {
                subOnly = {
                  subOnlyList: [...subOnly.subOnlyList, ...pathItem.stations],
                  lineList: [
                    ...subOnly.lineList,
                    { lineName: path["type"], lineColor: path["color"] }
                  ]
                };
              }
              return runTime.push(path);
            default:
              path = { type: "도보" };
              path["icon"] = "fas fa-walking";
              path["time"] = pathItem.duration;
              path["color"] = "#ccc";
              return runTime.push(path);
            // WALKING HANDLING
          }
        });
        routes.push({ distance, price, totalTime, runTime });
      });
      sub = { ...subwayPathOptionList, routes, subOnly };
      console.log("sub");
      console.log(sub);
    }
  }

  function handleBusNSub() {
    busNSub = busAndSubwayPathOptionList;
    const { routeList } = busNSub;
    if (routeList) {
      let routes = [];
      routeList.sort((a, b) => a.totalTime - b.totalTime);
      let minTime = routeList[0];
      routeList.sort((a, b) => a.transferNum - b.transferNum);
      let minTransferNum = routeList[0];

      let temp = [];
      if (minTime !== minTransferNum) temp.push(minTime);
      temp.push(minTransferNum);

      temp.map((eachRoute, idx) => {
        const { distance, price, totalTime, pathList } = eachRoute;
        // const route = [];
        const runTime = [];
        pathList.map(pathItem => {
          let path = {};

          switch (pathItem.type) {
            case "BUS":
              // BUS HANDLING
              path = {};
              path["icon"] = "fas fa-bus";
              path["lines"] = pathItem.routes.map(line => line.name);
              path["type"] = pathItem.routes[0].name;
              path["time"] = pathItem.duration;
              path["color"] = pathItem.routes[0].type.color;
              return runTime.push(path);
            case "SUBWAY":
              // SUBWAY HANDLING
              path = {};
              path["icon"] = "fas fa-train";
              path["lines"] = pathItem.routes.map(line => line.name);
              path["time"] = pathItem.duration;
              path["type"] = pathItem.routes[0].name;
              path["color"] = pathItem.routes[0].type.color;
              return runTime.push(path);
            default:
              path = { type: "도보" };
              path["icon"] = "fas fa-walking";
              path["time"] = pathItem.duration;
              path["color"] = "#ccc";
              return runTime.push(path);
            // WALKING HANDLING
          }
        });
        routes.push({ distance, price, totalTime, runTime });
      });
      busNSub = { ...busAndSubwayPathOptionList, routes };
    }
  }

  function handleBus() {
    bus = busPathOptionList;
  }

  function main() {
    handleSub();
    handleBusNSub();
    handleBus();
  }

  main();
  return { taxi, sub, busNSub, bus, defaultSub, pushAllow };
};
