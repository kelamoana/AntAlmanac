import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import PropTypes from "prop-types";
import Rechart from './rechart'

const styles = () => ({
  multiline: {
    whiteSpace: "pre"
  }
});

class GraphRenderPane extends Component {
  _isMounted = false;

    state = { 
      open: false, 
      graph: null 
    };

    componentWillUnmount() {
      this._isMounted = false;
    }

  componentDidMount() {
    this._isMounted = true;

    if (this.props.length < 4) {
      this.setState({ open: true }, () => {
        this.fetchGraph(
          this.props.quarter,
          this.props.year,
          this.props.section.classCode
        );
      });
    }
  }

  componentDidUpdate(prevProps, prevState, prevContext) {

    if ((prevProps.year !== this.props.year || prevProps.quarter !== this.props.quarter) && this.props.length < 4) {
      this.setState({ open: true }, () => {
        this.fetchGraph(
          this.props.quarter,
          this.props.year,
          this.props.section.classCode
        );
      });
    }
  }

  handleOpen = () => {
    this.setState({ open: !this.state.open }, () => {
      if (this.state.open && this.state.graph === null)
        this.fetchGraph(
          this.props.quarter,
          this.props.year,
          this.props.section.classCode
        );
    });
  };

  fetchGraph = async (quarter, year, code) => {
    const url = `https://almanac-graphs.herokuapp.com/${quarter + year}/${code}`
    console.log(url)
    const resp = await fetch(url, { signal: this.signal });
    if(resp.status === 200){
      const raw_data = await resp.json();
      if (this._isMounted) {
      this.setState({ graph: raw_data });
      }
    }
    else
    this.setState({ graph: null });
  }

  render() {
    //console.log(this.state)
    //console.log(this.props)
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <th>Type</th>
              <th>Instructors</th>
              <th>Times</th>
              <th>Places</th>
              <th>Max Cap</th>
            </tr>
            <tr>
              <td className={this.props.classes.multiline}>
                {`${this.props.section.classType}
       Section: ${this.props.section.sectionCode}
       Units: ${this.props.section.units}`}
              </td>
              <td className={this.props.classes.multiline}>
                {this.props.section.instructors.join("\n")}
              </td>
              <td className={this.props.classes.multiline}>
                {this.props.section.meetings
                  .map(meeting => meeting[0])
                  .join("\n")}
              </td>
              <td className={this.props.classes.multiline}>
                {this.props.section.meetings
                  .map(meeting => meeting[1])
                  .join("\n")}
              </td>
              <td>{this.props.section.maxCapacity}</td>
            </tr>
          </tbody>
        </table>
        {
          <div>
            <Button variant="contained" onClick={() => this.handleOpen()}>
              OPEN/CLOSE
       </Button>
            {this.state.open ? (
              <Rechart rawData={this.state.graph} />
            ) : null}
          </div>
        }
      </div>
    );
  }
}




GraphRenderPane.propTypes = {
  section: PropTypes.shape({
    meetings: PropTypes.array,
    classCode: PropTypes.string,
    classType: PropTypes.string,
    sectionCode: PropTypes.string,
    units: PropTypes.string,
    instructors: PropTypes.array,
    numCurrentlyEnrolled: PropTypes.string,
    maxCapacity: PropTypes.string,
    numOnWaitlist: PropTypes.string,
    numNewOnlyReserved: PropTypes.string,
    restrictions: PropTypes.string,
    status: PropTypes.string
  }),
  length: PropTypes.number,
  quarter: PropTypes.string,
  year: PropTypes.string
};

export default withStyles(styles)(GraphRenderPane);