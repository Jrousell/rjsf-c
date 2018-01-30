import React, { Component } from 'react'
import Form from 'react-jsonschema-form'
import StandardField from './fields/StandardField'
import DefaultFieldTemplate from './templates/DefaultFieldTemplate'
import * as evaluate from 'static-eval'
import { parse } from 'esprima'

import FieldWrapper from './wrapper'
import data from './data'

class FormContainer extends Component {

  formData = {} 

  constructor(props) {
    super(props)
    this.fields = {
      StandardField: StandardField
    }
  }

  onChange = (form) => {
    Object.assign(this.formData, form.formData)
  }

  render() {

    return (
      <Form 
        formData={this.formData}
        schema={data.schema}
        uiSchema={data.uiSchema}
        fields={this.fields}
        liveValidate={false}
        FieldTemplate={FieldWrapper({
          formData: this.formData,
          conditionalSchema: data.conditionalSchema
        })(DefaultFieldTemplate)}
        onChange={this.onChange}
        onBlur={this.onChange}
      />
    )
  }
}

export default FormContainer;