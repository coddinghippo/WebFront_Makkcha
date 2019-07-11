import React, {Component} from "react"
import { useData } from "../contexts";

class MainView extends Component {

    componentDidMount() {
        const cachedLocation = JSON.parse(localStorage.getItem("endLocation"));
    if (cachedLocation) {
      const { endX, endY } = cachedLocation.endLocation;
      window.navigator.geolocation.getCurrentPosition(pos => {
        const startX = pos.coords.longitude;
        const startY = pos.coords.latitude;
        this.props.actions.setPos({ endX, endY, startX, startY });
        this.setState({ currentPos: { endX, endY, startX, startY } });
      });
    }
    }

    render() {

        return()
    }
}

export default useData(MainView)