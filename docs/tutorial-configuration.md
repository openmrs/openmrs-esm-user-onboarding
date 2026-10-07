# Configuring Tutorials with JSON

## Overview

Tutorials are step-by-step walkthroughs that guide users through key 
features of OpenMRS. Each tutorial consists of a title, description, 
and a series of steps that highlight specific UI elements.

## Configuration Structure

Tutorials are configured using the following JSON structure in your 
`config-schema.ts` file:
```json
{
  "tutorialData": [
    {
      "title": "Basic Navigation Tutorial",
      "description": "Learn how to navigate the key features of OpenMRS",
      "steps": [
        {
          "target": "[data-tutorial-target='search-patient-icon']",
          "content": "Click here to search for an existing patient"
        },
        {
          "target": "[data-tutorial-target='add-patient']",
          "content": "Click here to register a new patient"
        },
        {
          "target": "[data-tutorial-target='user-settings']",
          "content": "Click here to access your account settings"
        }
      ]
    }
  ]
}
```

## Fields

### Tutorial Fields
| Field | Type | Description |
|-------|------|-------------|
| title | string | The name of the tutorial shown in the modal |
| description | string | Brief description shown below the title |
| steps | array | List of steps in the tutorial |

### Step Fields
| Field | Type | Description |
|-------|------|-------------|
| target | string | CSS selector of the element to highlight |
| content | string | Text shown to the user for this step |
| data | object | Optional - used for autoNextOn feature |

## Available Tutorial Targets

These are the currently available `data-tutorial-target` values 
that can be used in tutorial steps:

| Target | Element | Location |
|--------|---------|----------|
| `search-patient-icon` | Search patient button | Home page header |
| `add-patient` | Add patient button | Home page header |
| `user-settings` | My Account button | Home page header |
| `patient-lists-table` | Patient lists table | Patient lists page |
| `all-patient-lists` | All patient lists tab | Patient lists page |
| `patient-list-form` | Patient list form | Patient lists page |
| `floating-search-results` | Search results dropdown | Home page |
| `patient-search-bar` | Patient search bar | Home page |
| `close-search-icon` | Close search button | Home page |

## Adding Tutorial Targets to New Components

To make a UI element targetable by a tutorial step, add the 
`data-tutorial-target` attribute to the element:
```tsx
<Button data-tutorial-target="my-element">
  Click Me
</Button>
```

## Keyboard Navigation

Users can navigate tutorial steps using keyboard shortcuts:
- **Right Arrow** — Move to the next step
- **Left Arrow** — Move to the previous step

## Auto Next Feature

Steps can automatically advance when a specific element appears 
on screen. This is useful when clicking an element causes a new 
element to appear:
```json
{
  "target": "[data-tutorial-target='search-patient-icon']",
  "content": "Click here to search for a patient",
  "data": {
    "autoNextOn": "[data-tutorial-target='floating-search-results']"
  }
}
```

## Notes

- Tutorials always start from the home page
- If the user is not on the home page, they will be automatically redirected
- Steps will wait for their target element to appear before displaying
- Keyboard navigation is supported using left and right arrow keys