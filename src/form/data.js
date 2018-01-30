const data = {
  schema: {
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
  },
  uiSchema: {
    firstName: {
      "ui:field": "StandardField"
    },
    lastName: {
      "ui:field": "StandardField"
    },
    fireFighter: {
      "ui:field": "StandardField",
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
  },
  "conditionalSchema": {
    "fireFighter": {
      "dependents": [
        "fireFighterID",
        "fireFighterRank"
      ]
    }
  }
}

export default data