import React, { PureComponent } from 'react'

export default class Sorter extends PureComponent {


  updateSort = ({target}) => {
     this.props.func(target.value)
  }

  render() {
    return (
        <div className="sorter">
            <label htmlFor="sorter">Sort</label>
            <select id="sorter" onChange={this.updateSort} defaultValue='voteScore'>
                <option value="voteScore">Rate</option>
                <option value="timestamp">Date</option>
            </select>
        </div>
    )

  }

}
