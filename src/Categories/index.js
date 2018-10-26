import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadCategories, setCategory } from './actions'
import { Link } from 'react-router-dom'

class PostSort extends Component {


  componentDidMount() {
    this.props.loadCats()
  }

  setCat = catName => {
     this.props.changeCat(catName)
  }

  render() {

    const { categories, currentCategory } = this.props

    return <React.Fragment>
      <ul>
        {
         categories.map(cat => (
           <li key={cat.path}>
              <Link
                onClick={this.setCat.bind(this, cat.name)}
                to={`/${cat.path}`}
                className={ `category ${currentCategory === cat.name ? 'current' : ''}`}>
                {cat.name}
              </Link>
           </li>
          ))
        }
      </ul>
    </React.Fragment>
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
    currentCategory: state.currentCategory
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeCat: (category) => dispatch(setCategory(category)),
    loadCats: () => dispatch(loadCategories())
  }
}

export default  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PostSort)

