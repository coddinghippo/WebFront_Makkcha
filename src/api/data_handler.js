const busLines = {};

export const dataHandler = data => {
  const {
    busAndSubwayPathOptionList,
    busPathOptionList,
    taxiInfo,
    subwayPathOptionList
  } = data;

  // if (subwayPathOptionList) {
  let sub, busNSub, bus;
  const defaultSub = subwayPathOptionList
    ? subwayPathOptionList.routeList[0]
    : null;
  const taxi = taxiInfo;

  function handleSub() {
    const { routeList, walkInfo } = subwayPathOptionList;
    const routes = [];

    for (let idx = 0; idx < routeList.length; idx++) {
      let { pathStationList, distance, price } = subwayPathOptionList.routeList[
        Number(idx)
      ];
      let runTimeArr = [{ type: "도보", time: walkInfo.time * 60 }];

      // store sum of runTime for each line
      let cum = 0;
      pathStationList.map(item => {
        let time = item.runTime;
        let type = item.line;
        if (time !== null) {
          time = parseInt(time.slice(0, 2)) * 60 + parseInt(time.slice(3));
          cum += time;
          return null;
        } else {
          runTimeArr.push({ type, time: cum });
          cum = 0;
          return null;
        }
      });

      runTimeArr.push({
        type: pathStationList[pathStationList.length - 1].line,
        time: cum
      });

      let total = runTimeArr.reduce((a, x) => {
        return a + x.time;
      }, 0);
      total += walkInfo.time;

      routes.push({ runTime: runTimeArr, total, distance, price });
    }
    sub = { ...subwayPathOptionList, routes, walkInfo };
  }

  function handleBusNSub() {
    busNSub = busAndSubwayPathOptionList;
    const { routeList } = busNSub;
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
      const route = [];
      pathList.map(pathItem => {
        let path = {};
        switch (pathItem.type) {
          case "BUS":
            // BUS HANDLING
            path = {};
            path["lines"] = pathItem.routes.map(line => line.name);
            path["type"] = pathItem.routes[0].name;
            path["time"] = pathItem.duration;
            return route.push(path);
          case "SUBWAY":
            // SUBWAY HANDLING
            path = {};
            path["lines"] = pathItem.routes.map(line => line.name);
            path["time"] = pathItem.duration;
            path["type"] = pathItem.routes[0].name;
            return route.push(path);
          default:
            path = {};
            return route.push(path);
          // WALKING HANDLING
        }
      });
      routes.push({ [idx]: route, distance, price, totalTime });
    });
    busNSub = { ...busAndSubwayPathOptionList, routes };
    // console.log(busNSub);
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
  return { taxi, sub, busNSub, bus, defaultSub };
  // } else return null;
};
