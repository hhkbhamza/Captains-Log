const React = require("react");
const DefaultLayout = require("../layout/Default")

class Show extends React.Component {
  render() {
    const {title, entry, isShipBroken} = this.props.log
    return (
      <DefaultLayout title={`${title} Show Page`}>
        <div>
          <p>The {title} is {entry}.</p>
          {isShipBroken? "It is broken!" : "It is not broken"}
        </div> 
      </DefaultLayout>
    )
  }
}
// We can write javascript code within the curly brackets

module.exports = Show