export const dataHandler = data => {
  const {
    busAndSubwayPathOptionList,
    busPathOptionList,
    taxiInfo,
    subwayPathOptionList
  } = data;

  let sub, busNSub, bus;
  const defaultSub = subwayPathOptionList.routeList[0];
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
};
