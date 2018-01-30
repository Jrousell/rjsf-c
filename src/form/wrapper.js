import React, { Component } from 'react'

const FieldWrapper = (args) => Comp => {
  return class extends Component {
    constructor(props) {
      super(props);
    }
    render() {
      return <Comp {...this.props} {...args}/>
    }
  }
}

export default FieldWrapper
