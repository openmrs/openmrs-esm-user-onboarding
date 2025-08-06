![Node.js CI](https://github.com/openmrs/openmrs-esm-template-app/workflows/Node.js%20CI/badge.svg)

New to the Project checkout out [O3 Developer Documentation](https://openmrs.atlassian.net/wiki/x/IABBHg)

# OpenMRS ESM User Onboarding App

This repository contains the user onboarding tutorials for OpenMRS3.

## Running this code

```sh
yarn  # to install dependencies
yarn start  # to run the dev server
```

## Configuring steps



### Auto transition steps
To automatically transition to the next step when an element appears on the screen, you can add the autoTransition property to the step configuration. This property should be an object with the following properties:

 - `autoNextOn`: The selector of the element that should trigger the transition.

Example usage:

```js
{
  target: '',
  title: 'Title',
  data: {
    autoNextOn: '[data-extension-id="clinical-appointments-dashboard"]',
  }
}
```

