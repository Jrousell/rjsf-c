import React, { Component } from 'react';

class DefaultFieldTemplate extends Component {
  constructor(props) {
    super(props)
  }

  render() {

    const { id, label, description, errors, children, conditionalSchema, formData } = this.props

    let lookup = id.replace('root_', '')

    if (formData) {
      Object.keys(conditionalSchema).forEach((key) => {

        // console.log(formData, key, formData["fireFighter"])

        conditionalSchema[key].dependents.forEach((d) => {
            if (formData[key] === "Y") {
              console.log("show" + d)
            } else {
              console.log("hide" + d)
            }
        })
      })  
    }

    return (
      <div>
        <label htmlFor={id}>{label}</label>
        {description}
        {children}
        {errors}
      </div>
    );
  }
}

export default DefaultFieldTemplate;