import React, { Component } from 'react';
import Form from 'react-jsonschema-form';
import StandardField from './fields/StandardField';
import DefaultFieldTemplate from './templates/DefaultFieldTemplate';
import * as evaluate from 'static-eval';
import { parse } from 'esprima';

const schema = {
    title: "My Form",
    description: "A Random Form", 
    type: "object", 
    properties: {
        firstName: {
            type: "string", 
            title: "What is your first name"
        }, 
        lastName: {
            type: "string", 
            title: "What is your last name"
        }, 
        fireFighter: {
            type: "string", 
            title: "Are you a firefighter?"
        },
        fireFighterID: {
            type: "string", 
            title: "What is your firefighter ID?"
        }, 
        fireFighterRank: {
            type: "string", 
            title: "What is your fire fighter rank?"
        },
        policeMan: {
            type: "string", 
            title: "Police man?"
        }, 
        policeManID: {
            type: "number", 
            title: "What is your police ID?"
        }, 
        policeManRank: {
            type: "string", 
            title: "What is your police man rank?"
        }
    }
}

const uiSchema = {
    firstName: {
        "ui:field": "StandardField"
    }, 
    lastName: {
        "ui:field": "StandardField"
    }, 
    fireFighter: {
        "ui:field": "StandardField"
    }, 
    fireFighterID: {
        "ui:field": "StandardField"
    }, 
    fireFighterRank: {
        "ui:field": "StandardField"
    },
    policeMan: {
        "ui:field": "StandardField"
    },
    policeManID: {
        "ui:field": "StandardField"
    },
    policeManRank: {
        "ui:field": "StandardField"
    }
}

const validationSchema = {
    "root_fireFighter": {
        expression: "root_fireFighter === 'Yes'", 
        dependents: [
            "root_fireFighterID", 
            "root_fireFighterRank"
        ], 
        result: false
    }, 
    "root_policeMan": {
        expression: "root_policeMan === 'Yes'",
        dependents: [
            "root_policeManID", 
            "root_policeManRank"
        ], 
        result: false
    }
}   

const Wrapper = (Comp) => (validationSchema, formData) => {
    return class extends Component {
        render() {
            return <Comp {...this.props} validationSchema={validationSchema} newFormData={formData} />
        }
    }
}

class FormContainer extends Component {
    constructor(props) {
        super(props);
        this.validate = this.validate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {
            validationSchema: validationSchema, 
            formdata: null
        }
        this.fields = {
            StandardField: StandardField
        };
        this.template = Wrapper(DefaultFieldTemplate)(this.state.validationSchema, this.state.formdata);
    }

    validate(formData, errors) {
        const { validationSchema } = this.state;
        let payload = {};
        for(const [field, valObj] of Object.entries(validationSchema)) {
            let temp = field.replace("root_", "");
            let expression = parse(valObj.expression).body[0].expression;
            let lookup = 'formData.' + temp;
            let payload = {};
            payload[field] = eval(lookup);
            valObj.result = evaluate(expression, payload);
        }
        this.setState({
            validationSchema: validationSchema
        });
        return errors;
    }

    onChange(form) {
        console.log("onChange", form.formData);
        this.state.formdata = form.formData;
    }

    onSubmit({formData}) {
        // this.state.formdata = formData;
        this.setState({
            formdata: formData
        })
        console.log("onSubmit formData", formData);
        this.template = Wrapper(DefaultFieldTemplate)(this.state.validationSchema, formData);
    }

    render() {
        return (
            <Form schema={schema}
                    uiSchema={uiSchema}
                    fields={this.fields}
                    FieldTemplate={this.template}
                    liveValidate={false}
                    validate={this.validate}
                    onSubmit={this.onSubmit} />
        )
    }
}

export default FormContainer;